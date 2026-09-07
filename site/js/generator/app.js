import { migrateDirection } from "./core/migration.js";
import { mountGenerator } from "./views/workspace.js";
import { createDirection, validateDirection } from "./core/state.js";
import {
  readPayload,
  restorePayload,
  directionPayload,
  createShare,
  exportDirection,
  MAX_IMPORT_BYTES,
} from "./core/codec.js";
import { createDraftStore, DRAFT_STORAGE_PREFIX } from "./core/drafts.js";
import { loadManifest, loadCatalog } from "./core/catalog.js";
let storage = null;
try {
  storage = window.localStorage;
} catch {}
const drafts = createDraftStore(storage);
const memory = new Map(),
  catalogCache = new Map();
let view = null,
  manifest = null,
  activeCatalog = null,
  activeSession = null,
  reviewDialog = null,
  transition = 0,
  transitionLocation = null,
  handledLocation = null;
const activeKey = "drawn-to:active-draft:v1";
const root = document.querySelector("#app");
const remember = (id) => {
  try {
    sessionStorage.setItem(activeKey, id);
  } catch {}
};
function downloadText(text, name) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function catalogFor(id) {
  if (!catalogCache.has(id))
    catalogCache.set(id, await loadCatalog(manifest, id));
  return catalogCache.get(id);
}
function localState(id) {
  if (
    memory.has(id) &&
    (!memory.get(id).saved || !drafts.hasExternalChange(id))
  )
    return structuredClone(memory.get(id).state);
  return drafts.load(id);
}
function recent() {
  const list = new Map(drafts.list().map((item) => [item.id, item]));
  for (const [id, record] of memory) {
    if (!record.saved || !list.has(id))
      list.set(id, {
        id,
        name: record.state.name,
        updatedAt: record.state.updatedAt,
        catalogId: record.state.catalogId,
        transient: !record.saved,
      });
  }
  return [...list.values()].sort((a, b) => b.updatedAt - a.updatedAt);
}
function save(state) {
  memory.set(state.id, { state: structuredClone(state), saved: false });
  remember(state.id);
  const result = drafts.save(state);
  memory.get(state.id).saved = result.saved;
  return result.saved
    ? result
    : {
        ...result,
        message:
          (result.message || "Local saving is unavailable.") +
          " Your drafts remain in Recent drafts for this tab; download them before closing.",
      };
}
function locationKey() {
  return JSON.stringify([location.href, history.state?.draftId || null]);
}
function writeHistory(draftId) {
  const hash = location.hash === "#sources" ? "#sources" : "";
  history.replaceState({ draftId }, "", location.pathname + hash);
  handledLocation = locationKey();
}
function beginTransition() {
  reviewDialog?.close();
  transitionLocation = locationKey();
  return ++transition;
}
function isCurrentTransition(token) {
  return token === transition && transitionLocation === locationKey();
}
async function openState(state, token = beginTransition()) {
  const catalog = await catalogFor(state.catalogId);
  if (!isCurrentTransition(token)) return false;
  const invalid = validateDirection(catalog, state);
  if (invalid.length) throw new Error(invalid[0].message);
  activate(catalog, state);
  return true;
}
function activate(catalog, state) {
  beginTransition();
  view?.destroy();
  const session = {};
  activeSession = session;
  let lastState = state;
  const isActive = () => activeSession === session;
  document.querySelector(".catalog-version-note")?.remove();
  activeCatalog = catalog;
  const services = {
    saveDraft: save,
    loadDrafts: recent,
    openDraft: async (id) => {
      if (!isActive()) return false;
      const token = beginTransition();
      try {
        return await openState(localState(id), token);
      } catch (error) {
        if (isActive() && isCurrentTransition(token)) throw error;
        return false;
      }
    },
    share: (current, options) => ({
      ...createShare(catalog, current, options),
      payload: directionPayload(catalog, current, options),
    }),
    download: (current, options) =>
      downloadText(
        exportDirection(catalog, current, options),
        "drawn-to-direction.json",
      ),
    importFile: async (file) => {
      if (!isActive()) return false;
      const token = beginTransition();
      try {
        if (file.size > MAX_IMPORT_BYTES)
          throw new Error(
            `The direction file exceeds the ${Math.round(MAX_IMPORT_BYTES / 1_000_000)} MB import limit.`,
          );
        const text = await file.text();
        if (!isCurrentTransition(token)) return false;
        const payload = readPayload(text, { json: true });
        const importedCatalog = await catalogFor(payload.catalogId);
        if (!isCurrentTransition(token)) return false;
        const imported = restorePayload(importedCatalog, payload);
        activate(importedCatalog, imported);
        view.notify("Direction imported as a separate local draft.");
        return true;
      } catch (error) {
        if (isActive() && isCurrentTransition(token)) throw error;
        return false;
      }
    },
    copy: async (text) => {
      if (!text) throw new Error("Choose at least one reference first.");
      if (!navigator.clipboard?.writeText)
        throw new Error("Select the text and copy it manually.");
      await navigator.clipboard.writeText(text);
    },
    onState: (current) => {
      if (!isActive()) return;
      // Any accepted edit or New direction supersedes pending navigation.
      if (current !== lastState) beginTransition();
      lastState = current;
      remember(current.id);
      writeHistory(current.id);
      window.__drawnToGenerator = {
        catalogId: catalog.id,
        draftId: current.id,
        sceneCount: catalog.scenes.length,
      };
    },
  };
  view = mountGenerator({ catalog, initialState: state, services });
  document.title = "Direction studio - Drawn To";
  if (catalog.id !== manifest.current) {
    const note = document.createElement("div");
    note.className = "catalog-version-note";
    const text = document.createElement("span");
    text.textContent = "This direction uses its original library snapshot.";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Review update";
    button.addEventListener("click", () => reviewUpdate());
    note.append(text, button);
    root.prepend(note);
  }
}
async function reviewUpdate() {
  const previousView = view,
    previousCatalog = activeCatalog,
    previous = structuredClone(view.getState()),
    trigger = document.activeElement,
    token = beginTransition();
  const isCurrent = () => isCurrentTransition(token) && view === previousView;
  try {
    const current = await catalogFor(manifest.current);
    if (!isCurrent()) return;
    const { state: copy, changes } = migrateDirection(
      previousCatalog,
      current,
      previous,
    );
    copy.id = crypto.randomUUID();
    copy.updatedAt = Date.now();
    const invalid = validateDirection(current, copy);
    if (invalid.length) throw new Error(invalid[0].message);
    const dialog = document.createElement("dialog");
    dialog.className = "studio-dialog";
    const title = document.createElement("h2");
    title.textContent = "Update a copy of this direction";
    const intro = document.createElement("p");
    intro.textContent =
      "The original draft and its reference bindings stay available in Recent drafts. The new copy will use the current skill version.";
    const list = document.createElement("ul");
    for (const message of changes.length
      ? changes
      : [
          "The resolved selections, contracts and source-frame evidence are unchanged. The copy will use the current library snapshot.",
        ]) {
      const li = document.createElement("li");
      li.textContent = message;
      list.append(li);
    }
    const action = document.createElement("button");
    action.className = "primary-button";
    action.type = "button";
    action.textContent = "Create updated copy";
    const cancel = document.createElement("button");
    cancel.className = "secondary-button";
    cancel.type = "button";
    cancel.textContent = "Keep original";
    reviewDialog = dialog;
    dialog.setAttribute("aria-label", "Review library update");
    dialog.append(title, intro, list, cancel, action);
    document.body.append(dialog);
    dialog.addEventListener(
      "close",
      () => {
        dialog.remove();
        if (reviewDialog === dialog) reviewDialog = null;
        if (isCurrent())
          requestAnimationFrame(() => {
            if (trigger?.isConnected && !document.querySelector("dialog[open]"))
              trigger.focus();
          });
      },
      { once: true },
    );
    cancel.addEventListener("click", () => dialog.close());
    action.addEventListener("click", () => {
      if (!isCurrent()) return;
      dialog.close();
      activate(current, copy);
      view.notify(
        "Updated copy created. The original direction is still available.",
      );
    });
    dialog.showModal();
  } catch (error) {
    if (isCurrent()) previousView.notify(error.message);
  }
}
function errorScreen(error, payload = null) {
  beginTransition();
  view?.destroy();
  view = null;
  activeSession = null;
  activeCatalog = null;
  delete window.__drawnToGenerator;
  history.replaceState(null, "", location.href);
  handledLocation = locationKey();
  root.innerHTML =
    '<main class="generator-error"><a href="./">Drawn To ↗</a><p class="eyebrow">YOUR REFERENCES STAY YOURS</p><h1>We could not open this direction.</h1><p class="error-message"></p><div class="error-actions"></div></main>';
  root.querySelector(".error-message").textContent = error.message;
  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "primary-button";
  reset.textContent = "Open the current library";
  reset.addEventListener("click", () => {
    history.replaceState({}, "", location.pathname);
    try {
      sessionStorage.removeItem(activeKey);
    } catch {}
    location.reload();
  });
  root.querySelector(".error-actions").append(reset);
  if (payload) {
    const keep = document.createElement("button");
    keep.type = "button";
    keep.className = "secondary-button";
    keep.textContent = "Download original direction";
    keep.addEventListener("click", () =>
      downloadText(
        JSON.stringify(payload, null, 2),
        "drawn-to-original-direction.json",
      ),
    );
    root.querySelector(".error-actions").append(keep);
  }
}
window.addEventListener("storage", (event) => {
  if (event.key === null || event.key.startsWith(DRAFT_STORAGE_PREFIX))
    if (view && drafts.hasExternalChange(view.getState().id))
      view.notify(
        "This draft changed in another tab. Both versions will be preserved as recovery copies when you save.",
        {persistent:true},
      );
});
const manifestReady = loadManifest().then((loaded) => (manifest = loaded));

async function navigateLocation() {
  const key = locationKey();
  if (key === handledLocation) return;
  handledLocation = key;
  const token = beginTransition(),
    url = new URL(location.href),
    entryDraftId = history.state?.draftId;
  let importedPayload = null;
  try {
    await manifestReady;
    if (!isCurrentTransition(token)) return;
    const encoded = url.hash.startsWith("#d=") ? url.hash.slice(3) : null;
    if (encoded !== null) {
      importedPayload = readPayload(encoded);
      const catalog = await catalogFor(importedPayload.catalogId);
      if (!isCurrentTransition(token)) return;
      activate(catalog, restorePayload(catalog, importedPayload));
      view.notify("Shared direction opened as a separate local draft.");
    } else if (
      view &&
      ((!entryDraftId && url.hash === "#sources") ||
        entryDraftId === view.getState().id)
    ) {
      writeHistory(view.getState().id);
    } else if (
      !entryDraftId &&
      (url.searchParams.has("scene") || url.searchParams.has("example"))
    ) {
      const catalog = await catalogFor(manifest.current);
      if (!isCurrentTransition(token)) return;
      activate(
        catalog,
        createDirection(catalog, {
          scope: url.searchParams.get("scope") || "graphic",
          sceneId: url.searchParams.get("scene") || undefined,
          example: url.searchParams.get("example") || undefined,
        }),
      );
    } else {
      let active = entryDraftId;
      if (!active)
        try {
          active = sessionStorage.getItem(activeKey);
        } catch {}
      let recoveryMessage = null;
      if (active) {
        try {
          if (!(await openState(localState(active), token))) return;
        } catch (error) {
          if (!isCurrentTransition(token)) return;
          if (entryDraftId) throw error;
          recoveryMessage =
            error.message + " The original draft remains in Recent drafts.";
        }
      }
      if (!active || recoveryMessage) {
        const catalog = await catalogFor(manifest.current);
        if (!isCurrentTransition(token)) return;
        activate(catalog, createDirection(catalog));
        if (recoveryMessage) view.notify(recoveryMessage);
      }
    }
    if (url.hash === "#sources") view?.showSources();
  } catch (error) {
    if (isCurrentTransition(token)) errorScreen(error, importedPayload);
  }
}
// Both events may describe the same navigation. The location key prevents a duplicate import.
window.addEventListener("popstate", navigateLocation);
window.addEventListener("hashchange", navigateLocation);
await navigateLocation();
