import test from "node:test";
import assert from "node:assert/strict";
import { createDirection } from "../../site/js/generator/core/state.js";
import {
  createDraftStore,
  DRAFT_STORAGE_PREFIX,
} from "../../site/js/generator/core/drafts.js";
import { catalog } from "./fixture.mjs";

class MemoryStorage {
  data = new Map();
  onSet = null;
  get length() {
    return this.data.size;
  }
  key(i) {
    return [...this.data.keys()][i] ?? null;
  }
  getItem(key) {
    return this.data.get(key) ?? null;
  }
  setItem(key, value) {
    this.data.set(key, String(value));
    this.onSet?.(key, value);
  }
  removeItem(key) {
    this.data.delete(key);
  }
}
const direction = (name) => ({ ...createDirection(catalog), name });
const edit = (state, intent) => ({
  ...state,
  context: { ...state.context, intent },
  updatedAt: state.updatedAt + 1,
});

test("separate drafts and private context survive reload without shared mutable state", () => {
  const storage = new MemoryStorage(),
    store = createDraftStore(storage);
  const one = edit(direction("First"), "A private product"),
    two = direction("Second");
  assert.equal(store.save(one).saved, true);
  assert.equal(store.save(two).saved, true);
  const reloaded = createDraftStore(storage);
  assert.equal(reloaded.list().length, 2);
  assert.deepEqual(reloaded.load(one.id), one);
  const copy = reloaded.load(one.id);
  copy.context.intent = "Changed outside store";
  assert.equal(reloaded.load(one.id).context.intent, "A private product");
  assert.equal(reloaded.load(two.id).name, "Second");
});

test("linear autosave is bounded and keeps its latest complete state", () => {
  const storage = new MemoryStorage(),
    store = createDraftStore(storage, { maxRecords: 3 });
  let state = direction("Autosave");
  for (let i = 0; i < 50; i++) {
    state = edit(state, `Version ${i}`);
    assert.equal(store.save(state).saved, true);
  }
  assert.equal(storage.length, 1);
  assert.deepEqual(createDraftStore(storage).load(state.id), state);
});

test("another tab change is detected, and both last states become recoverable new drafts", () => {
  const storage = new MemoryStorage(),
    a = createDraftStore(storage),
    b = createDraftStore(storage),
    state = direction("Original");
  a.save(state);
  b.load(state.id);
  const changed = edit(state, "Tab A");
  a.save(changed);
  assert.equal(b.hasExternalChange(state.id), true);
  const result = b.save(edit(state, "Tab B"));
  assert.equal(result.saved, true);
  assert.equal(result.conflict, true);
  const rows = a.list();
  assert.equal(rows.length, 2);
  assert.ok(rows.every((row) => row.recovered && row.originalId === state.id));
  assert.throws(() => a.load(state.id), /conflict|copies|Recent drafts/i);
  const recovered = rows.map((row) => a.load(row.id));
  assert.deepEqual(recovered.map((x) => x.context.intent).sort(), [
    "Tab A",
    "Tab B",
  ]);
  assert.ok(recovered.every((x) => x.id !== state.id));
  assert.notEqual(recovered[0].id, recovered[1].id);
  a.save(recovered[0]);
  assert.equal(a.list().length, 3);
});

test("interleaved revision writes preserve both states even when both writers initially see one head", () => {
  const storage = new MemoryStorage(),
    a = createDraftStore(storage),
    b = createDraftStore(storage),
    state = direction("Race");
  a.save(state);
  b.load(state.id);
  storage.onSet = () => {
    storage.onSet = null;
    assert.equal(b.save(edit(state, "Nested tab")).saved, true);
  };
  const result = a.save(edit(state, "Outer tab"));
  assert.equal(result.saved, true);
  const rows = createDraftStore(storage).list();
  assert.equal(rows.length, 2);
  assert.deepEqual(
    rows
      .map((row) => createDraftStore(storage).load(row.id).context.intent)
      .sort(),
    ["Nested tab", "Outer tab"],
  );
});

test("a tab saving an existing ID without loading never silently adopts another tab state", () => {
  const storage = new MemoryStorage(),
    a = createDraftStore(storage),
    state = direction("Existing");
  a.save(state);
  const b = createDraftStore(storage);
  assert.equal(b.save(edit(state, "Unloaded writer")).conflict, true);
  assert.equal(b.list().length, 2);
});

test("malformed and oversized local records are ignored as data", () => {
  const storage = new MemoryStorage(),
    store = createDraftStore(storage),
    state = direction("Valid");
  store.save(state);
  const [key, value] = [...storage.data][0];
  const record = JSON.parse(value);
  storage.data.set(key + "-bad-json", "{not json");
  storage.data.set(key + "-oversized", "x".repeat(1_100_000));
  storage.data.set(
    DRAFT_STORAGE_PREFIX + record.id + ":bad-state",
    JSON.stringify({
      ...record,
      revision: "bad-state",
      state: { ...record.state, context: { intent: 5 } },
    }),
  );
  storage.data.set(
    key + "-prototype",
    JSON.stringify({
      ...record,
      state: JSON.parse('{"__proto__":{"polluted":true}}'),
    }),
  );
  assert.equal(store.list().length, 1);
  assert.deepEqual(store.load(state.id), state);
  assert.equal({}.polluted, undefined);
  assert.throws(() => store.load("missing"), /unavailable|not found/i);
  assert.equal(store.save({ ...state, id: "../unsafe" }).saved, false);
});

test("quota and disabled storage never report success or discard existing saved state", () => {
  const storage = new MemoryStorage(),
    store = createDraftStore(storage),
    state = direction("Before quota");
  store.save(state);
  storage.setItem = () => {
    throw new Error("QuotaExceededError");
  };
  const result = store.save(edit(state, "Unsaved"));
  assert.equal(result.saved, false);
  assert.match(result.message, /copy|download/i);
  assert.equal(createDraftStore(storage).load(state.id).context.intent, "");
  const denied = createDraftStore({
    get length() {
      throw new Error("SecurityError");
    },
  });
  assert.equal(denied.save(direction("Denied")).saved, false);
  assert.deepEqual(denied.list(), []);
  assert.throws(() => denied.load(state.id), /unavailable/i);
});

test("capacity retains all existing last states and makes the unsaved result explicit", () => {
  const storage = new MemoryStorage(),
    store = createDraftStore(storage, { maxRecords: 2 });
  const one = direction("One"),
    two = direction("Two");
  store.save(one);
  store.save(two);
  assert.equal(store.save(direction("Three")).saved, false);
  assert.equal(store.list().length, 2);
  assert.equal(store.save(edit(one, "Still editable")).saved, true);
  assert.equal(store.load(one.id).context.intent, "Still editable");
});

test("a pruned parent does not make late writers inherit a newer revision", () => {
  const storage = new MemoryStorage(),
    a = createDraftStore(storage),
    b = createDraftStore(storage),
    state = direction("Pruned parent");
  const first = a.save(state);
  b.load(state.id);
  a.save(edit(state, "Latest A"));
  assert.equal(
    storage.getItem(DRAFT_STORAGE_PREFIX + state.id + ":" + first.revision),
    null,
  );
  b.save(edit(state, "Late B"));
  const rows = a.list();
  assert.equal(rows.length, 2);
  assert.deepEqual(rows.map((row) => a.load(row.id).context.intent).sort(), [
    "Late B",
    "Latest A",
  ]);
});

test("cleanup failure cannot allow unlimited retained history", () => {
  const storage = new MemoryStorage(),
    store = createDraftStore(storage, { maxRecords: 2 });
  storage.removeItem = () => {
    throw new Error("Cleanup denied");
  };
  const state = direction("Retained history");
  const results = Array.from({ length: 20 }, (_, i) =>
    store.save(edit(state, `Change ${i}`)),
  );
  assert.ok(results.some((result) => !result.saved));
  assert.ok(storage.length <= 3);
  assert.equal(store.list().length, 1);
});

test("a total storage budget rejects new records without deleting old drafts", () => {
  const storage = new MemoryStorage(),
    state = direction("Budget"),
    store = createDraftStore(storage);
  store.save(state);
  const size = [...storage.data.values()].reduce(
    (sum, value) => sum + value.length,
    0,
  );
  const bounded = createDraftStore(storage, { maxTotalLength: size + 10 });
  assert.equal(bounded.save(direction("Another")).saved, false);
  assert.deepEqual(bounded.load(state.id), state);
});

test("malformed selections under an otherwise valid storage key are ignored", () => {
  const storage = new MemoryStorage(),
    store = createDraftStore(storage),
    state = direction("Validated");
  store.save(state);
  const [key, raw] = [...storage.data][0],
    record = JSON.parse(raw);
  record.state.targets[0].choices.shape = {
    mode: "open",
    propertyIds: ["plasma-study::shape"],
  };
  storage.data.set(key, JSON.stringify(record));
  assert.deepEqual(store.list(), []);
  assert.throws(() => store.load(state.id), /not found/);
});

test("storage clearing is reported as an external change", () => {
  const storage = new MemoryStorage(),
    store = createDraftStore(storage),
    state = direction("Cleared");
  store.save(state);
  assert.equal(store.hasExternalChange(state.id), false);
  storage.data.clear();
  assert.equal(store.hasExternalChange(state.id), true);
});
