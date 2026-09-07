import { ROLE_IDS, SCOPES, TARGET_KINDS } from "./state.js";

export const DRAFT_STORAGE_PREFIX = "drawn-to:draft:v1:";
const RECOVERY_PREFIX = "recovery:";
const MAX_RECORD_LENGTH = 512_000;
const token = (value) =>
  typeof value === "string" && /^[a-zA-Z0-9-]{1,80}$/.test(value);
const plain = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  Object.getPrototypeOf(value) === Object.prototype;
const fields = (value, allowed) =>
  plain(value) && Object.keys(value).every((key) => allowed.includes(key));
const text = (value, limit) =>
  typeof value === "string" && value.length <= limit;
const timestamp = (value) => Number.isSafeInteger(value) && value >= 0;
const reference = (value) =>
  typeof value === "string" &&
  /^[a-z0-9-]+::[a-z0-9-]+$/.test(value) &&
  value.length <= 200;
const unavailable =
  "Local saving is unavailable. Copy or download your direction to keep this version.";

// Drafts can belong to an older catalog. Validate their data shape here; the
// catalog loader validates the actual scene/property bindings before use.
function validState(state) {
  if (
    !fields(state, [
      "schema",
      "id",
      "catalogId",
      "scope",
      "name",
      "targets",
      "context",
      "updatedAt",
    ]) ||
    state.schema !== 1 ||
    !token(state.id) ||
    !token(state.catalogId) ||
    !SCOPES.includes(state.scope) ||
    !text(state.name, 500) ||
    !timestamp(state.updatedAt)
  )
    return false;
  if (
    !fields(state.context, ["product", "platform", "intent"]) ||
    !Object.values(state.context).every((value) => text(value, 50_000))
  )
    return false;
  if (
    !Array.isArray(state.targets) ||
    state.targets.length < 1 ||
    state.targets.length > 100
  )
    return false;
  if (
    state.scope === "page"
      ? state.targets.length < 2 || state.targets[0]?.id !== "page"
      : state.targets.length !== 1 || state.targets[0]?.id !== "main"
  )
    return false;
  const ids = new Set();
  for (const target of state.targets) {
    if (
      !fields(target, ["id", "kind", "name", "baseScene", "choices"]) ||
      typeof target.id !== "string" ||
      !/^[a-z][a-z0-9-]{0,80}$/.test(target.id) ||
      ids.has(target.id) ||
      !TARGET_KINDS.includes(target.kind) ||
      !text(target.name, 500)
    )
      return false;
    ids.add(target.id);
    if (target.baseScene !== null && !token(target.baseScene)) return false;
    if (
      target.id === "page" &&
      (target.kind !== "page" || target.baseScene !== null)
    )
      return false;
    if (!plain(target.choices)) return false;
    for (const [role, choice] of Object.entries(target.choices)) {
      if (
        !ROLE_IDS.includes(role) ||
        !fields(choice, ["mode", "propertyIds"]) ||
        !["selected", "open", "excluded"].includes(choice.mode) ||
        !Array.isArray(choice.propertyIds) ||
        choice.propertyIds.length > 8
      )
        return false;
      if (
        choice.mode === "selected"
          ? !choice.propertyIds.length
          : choice.propertyIds.length
      )
        return false;
      if (
        !choice.propertyIds.every(reference) ||
        new Set(choice.propertyIds).size !== choice.propertyIds.length
      )
        return false;
    }
  }
  return true;
}

const recordKey = (id, revision) => DRAFT_STORAGE_PREFIX + id + ":" + revision;
function readRecord(key, raw) {
  if (typeof raw !== "string" || raw.length > MAX_RECORD_LENGTH) return null;
  try {
    const record = JSON.parse(raw);
    if (
      !fields(record, [
        "schema",
        "id",
        "revision",
        "parent",
        "savedAt",
        "state",
      ]) ||
      record.schema !== 1 ||
      !token(record.id) ||
      !token(record.revision) ||
      (record.parent !== null && !token(record.parent)) ||
      record.parent === record.revision ||
      !timestamp(record.savedAt) ||
      !validState(record.state) ||
      record.id !== record.state.id ||
      key !== recordKey(record.id, record.revision)
    )
      return null;
    return { ...record, key, length: raw.length };
  } catch {
    return null;
  }
}
const heads = (records) => {
  const parents = new Set(
    records
      .filter((record) => record.parent)
      .map((record) => record.id + ":" + record.parent),
  );
  return records.filter(
    (record) => !parents.has(record.id + ":" + record.revision),
  );
};

export function createDraftStore(storage, options = {}) {
  const maxRecords =
    Number.isSafeInteger(options.maxRecords) && options.maxRecords > 0
      ? options.maxRecords
      : 50;
  const maxTotalLength =
    Number.isSafeInteger(options.maxTotalLength) && options.maxTotalLength > 0
      ? options.maxTotalLength
      : 2_000_000;
  const seen = new Map();
  function readAll() {
    if (!storage) throw new Error(unavailable);
    const keys = [];
    for (let i = 0, length = storage.length; i < length; i++) {
      const key = storage.key(i);
      if (typeof key === "string" && key.startsWith(DRAFT_STORAGE_PREFIX))
        keys.push(key);
    }
    return [...new Set(keys)]
      .map((key) => readRecord(key, storage.getItem(key)))
      .filter(Boolean);
  }
  function prune(records) {
    const current = new Set(heads(records).map((record) => record.key));
    for (const record of records)
      if (!current.has(record.key)) {
        try {
          storage.removeItem(record.key);
        } catch {
          /* The new revision is already saved; cleanup can retry later. */
        }
      }
  }
  function save(input) {
    try {
      if (!validState(input))
        return {
          saved: false,
          message:
            "This draft has an invalid format. Copy or download your direction before reloading.",
        };
      const state = JSON.parse(JSON.stringify(input));
      let records = readAll();
      prune(records);
      records = readAll();
      const current = heads(records),
        parent = seen.get(state.id) ?? null;
      const previous = records.find(
        (record) => record.id === state.id && record.revision === parent,
      );
      if (
        previous &&
        current.filter((record) => record.id === state.id).length === 1 &&
        JSON.stringify(previous.state) === JSON.stringify(state)
      )
        return { saved: true, revision: parent };
      const revision = globalThis.crypto.randomUUID();
      const record = {
        schema: 1,
        id: state.id,
        revision,
        parent,
        savedAt: Date.now(),
        state,
      };
      const raw = JSON.stringify(record);
      const retained = records.filter(
        (item) => !(item.id === state.id && item.revision === parent),
      );
      if (
        raw.length > MAX_RECORD_LENGTH ||
        retained.length + 1 > maxRecords ||
        retained.reduce((sum, item) => sum + item.length, raw.length) >
          maxTotalLength
      )
        return {
          saved: false,
          message:
            "Local draft storage is full. Copy or download this direction to keep your changes.",
        };
      const key = recordKey(state.id, revision);
      storage.setItem(key, raw);
      if (storage.getItem(key) !== raw)
        return { saved: false, message: unavailable };
      seen.set(state.id, revision);
      let conflict = current.some(
        (item) => item.id === state.id && item.revision !== parent,
      );
      try {
        const after = readAll();
        conflict =
          conflict ||
          heads(after).filter((item) => item.id === state.id).length > 1;
        prune(after);
      } catch {
        /* A verified write remains saved if subsequent reading or cleanup fails. */
      }
      return {
        saved: true,
        revision,
        ...(conflict
          ? {
              conflict: true,
              message:
                "Both tabs’ versions are saved as recovery copies in Recent drafts. Open a recovery copy to continue separately.",
            }
          : {}),
      };
    } catch {
      return { saved: false, message: unavailable };
    }
  }
  function list() {
    try {
      const current = heads(readAll());
      const counts = new Map();
      for (const record of current)
        counts.set(record.id, (counts.get(record.id) || 0) + 1);
      return current
        .sort(
          (a, b) =>
            b.savedAt - a.savedAt || b.revision.localeCompare(a.revision),
        )
        .map((record) => {
          const recovered = counts.get(record.id) > 1;
          return {
            id: recovered
              ? RECOVERY_PREFIX + record.id + ":" + record.revision
              : record.id,
            name: record.state.name,
            updatedAt: record.savedAt,
            catalogId: record.state.catalogId,
            revision: record.revision,
            ...(recovered ? { recovered: true, originalId: record.id } : {}),
          };
        });
    } catch {
      return [];
    }
  }
  function load(id) {
    let records;
    try {
      records = readAll();
    } catch {
      throw new Error(
        "Local drafts are unavailable in this browser. You can import a downloaded direction.",
      );
    }
    if (typeof id === "string" && id.startsWith(RECOVERY_PREFIX)) {
      const parts = id.slice(RECOVERY_PREFIX.length).split(":");
      const record =
        parts.length === 2 &&
        records.find(
          (item) => item.id === parts[0] && item.revision === parts[1],
        );
      if (!record)
        throw new Error(
          "This recovery copy is unavailable. Open Recent drafts again.",
        );
      return {
        ...structuredClone(record.state),
        id: globalThis.crypto.randomUUID(),
        updatedAt: Date.now(),
      };
    }
    const current = heads(records.filter((record) => record.id === id));
    if (current.length > 1)
      throw new Error(
        "This draft has conflicting copies. Choose a recovery copy from Recent drafts.",
      );
    if (!current.length)
      throw new Error(
        "This local draft was not found. It may have been removed or browser storage may have been cleared.",
      );
    seen.set(id, current[0].revision);
    return structuredClone(current[0].state);
  }
  function hasExternalChange(id) {
    try {
      const current = heads(readAll().filter((record) => record.id === id));
      const expected = seen.get(id);
      return expected
        ? current.length !== 1 || current[0].revision !== expected
        : current.length > 0;
    } catch {
      return true;
    }
  }
  return { save, list, load, hasExternalChange };
}
