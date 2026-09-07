import { createDirection, validateDirection } from "./state.js";
export const MAX_SHARE_URL = 8000;
export const MAX_IMPORT_BYTES = 2 * 1024 * 1024;
const encode = (text) => {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 8192)
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
};
const decode = (text) =>
  new TextDecoder("utf-8", { fatal: true }).decode(
    Uint8Array.from(atob(text.replaceAll("-", "+").replaceAll("_", "/")), (c) =>
      c.charCodeAt(0),
    ),
  );
export function directionPayload(
  catalog,
  state,
  { includeContext = false } = {},
) {
  const invalid = validateDirection(catalog, state);
  if (invalid.length) throw new Error(invalid[0].message);
  const targets = state.targets.map((t, i) => ({
    id: t.id,
    kind: t.kind,
    baseScene: t.baseScene,
    choices: Object.fromEntries(
      Object.entries(t.choices).map(([role, choice]) => [
        role,
        { mode: choice.mode, propertyIds: [...choice.propertyIds] },
      ]),
    ),
    ...(includeContext ? { name: t.name } : {}),
  }));
  return {
    format: "drawn-to-direction",
    schema: 1,
    catalogId: catalog.id,
    scope: state.scope,
    targets,
    ...(includeContext
      ? { name: state.name, context: structuredClone(state.context) }
      : {}),
  };
}
export function encodeDirection(catalog, state, options = {}) {
  return encode(JSON.stringify(directionPayload(catalog, state, options)));
}
export function readPayload(input, { json = false } = {}) {
  if (typeof input !== "string" || (input.length > MAX_IMPORT_BYTES || (json && new TextEncoder().encode(input).byteLength > MAX_IMPORT_BYTES)))
    throw new Error("This direction exceeds the import size limit.");
  try {
    const payload = JSON.parse(json ? input : decode(input));
    if (
      !payload ||
      payload.format !== "drawn-to-direction" ||
      payload.schema !== 1
    )
      throw new Error("format");
    if (
      typeof payload.catalogId !== "string" ||
      !/^[a-zA-Z0-9-]{1,80}$/.test(payload.catalogId)
    )
      throw new Error("catalog");
    return payload;
  } catch {
    throw new Error(
      "This is not a valid Drawn To direction format. Keep the original file or link and try a supported version.",
    );
  }
}
export function restorePayload(catalog, payload) {
  if (payload.catalogId !== catalog.id)
    throw new Error(
      "This direction requires a different library catalog version.",
    );
  const allowed = [
    "format",
    "schema",
    "catalogId",
    "scope",
    "targets",
    "name",
    "context",
  ];
  if (Object.keys(payload).some((k) => !allowed.includes(k)))
    throw new Error("The direction contains unsupported fields.");
  if (!Array.isArray(payload.targets))
    throw new Error("The direction has invalid targets.");
  const state = createDirection(catalog, { scope: payload.scope });
  state.name = payload.name ?? "Shared direction";
  state.context = payload.context ?? { product: "", platform: "", intent: "" };
  state.targets = payload.targets.map((t, i) => {
    if (
      !t ||
      typeof t !== "object" ||
      Array.isArray(t) ||
      Object.keys(t).some(
        (k) => !["id", "kind", "baseScene", "choices", "name"].includes(k),
      )
    )
      throw new Error("A target has an invalid format.");
    const name =
      t.name ??
      (t.id === "page"
        ? "Page defaults"
        : state.scope === "page"
          ? `${t.kind[0].toUpperCase() + t.kind.slice(1)} ${i}`
          : {
              graphic: "Main graphic",
              component: "Main component",
              section: "Section 1",
            }[state.scope]);
    return {
      id: t.id,
      kind: t.kind,
      name,
      baseScene: t.baseScene,
      choices: t.choices,
    };
  });
  const invalid = validateDirection(catalog, state);
  if (invalid.length) throw new Error(invalid[0].message);
  return state;
}
export function decodeDirection(catalog, input, options = {}) {
  return restorePayload(catalog, readPayload(input, options));
}
export function createShare(
  catalog,
  state,
  {
    includeContext = false,
    baseURL = globalThis.location?.href ||
      "https://drawn-to.vercel.app/generator",
  } = {},
) {
  const url = new URL(baseURL);
  url.search = "";
  url.hash = "d=" + encodeDirection(catalog, state, { includeContext });
  return {
    url: url.href,
    tooLong: url.href.length > MAX_SHARE_URL,
    sharedFields: includeContext
      ? [
          "Visual selections",
          "Page structure",
          "Library version",
          ...["name", "targets", "context"]
            .filter((k) => JSON.stringify(state[k] || "").length > 2)
            .map(
              (k) =>
                ({
                  name: "Direction name",
                  targets: "Custom section names",
                  context: "Project context",
                })[k],
            ),
        ]
      : ["Visual selections", "Page structure", "Library version"],
  };
}
export function exportDirection(catalog, state, options = {}) {
  return (
    JSON.stringify(directionPayload(catalog, state, options), null, 2) + "\n"
  );
}
