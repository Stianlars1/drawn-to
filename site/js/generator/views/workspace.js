import {
  createDirection,
  reduceDirection,
  resolveTarget,
} from "../core/state.js";
import { escapeHTML as e, icon, roleName } from "./dom.js";
import { mountBrowser } from "./browser.js";
import { renderDirection } from "./direction.js";
import { createDialogs } from "./dialogs.js";

export function mountGenerator({ catalog, initialState, services }) {
  let state = initialState;
  let browser;
  const past = [],
    future = [];
  const ui = {
    mobileView: "sources",
    mode: state.targets.some((target) => Object.keys(target.choices).length)
      ? "parts"
      : "scene",
    role: "shape",
    search: "",
    kind: "",
    targetId: state.targets[0].id,
    expandedRole: null,
  };
  const app = document.querySelector("#app");
  app.dataset.mobileView = "sources";
  const abort = new AbortController();
  app.innerHTML = `<header class="studio-header"><a class="wordmark" href="./" aria-label="Drawn To showcase">drawn to<span>↗</span></a><span class="header-divider" aria-hidden="true"></span><span class="studio-label">Direction studio</span><div class="draft-control"><button class="draft-name" type="button" data-action="rename" title="Rename direction"></button><span class="save-state" role="status"></span></div><div class="header-actions"><button type="button" class="text-button" data-action="drafts">Recent drafts</button><button type="button" class="secondary-button" data-action="share">${icon("share")}Share<span class="desktop-word"> direction</span></button></div></header>
    <div class="workspace-toolbar"><a href="./" class="back-to-library">↖ Showcase</a><span class="toolbar-note">A reference studio for your next project.</span><div class="history-controls"><button type="button" class="icon-button" data-action="undo" aria-label="Undo last change" title="Undo (⌘/Ctrl Z)">${icon("undo")}</button><button type="button" class="icon-button" data-action="redo" aria-label="Redo last change" title="Redo (⌘/Ctrl Shift Z)">${icon("redo")}</button><span class="toolbar-divider"></span><button type="button" class="text-button" data-action="new">${icon("plus")}New direction</button></div></div>
    <div class="workspace"><main id="sources" class="source-browser" tabindex="-1"></main><aside class="direction-panel" aria-label="Your direction"></aside></div>
    <div class="studio-notice" role="status" hidden><span></span><button type="button" class="icon-button" aria-label="Dismiss notification">${icon("close")}</button></div>
    <nav class="mobile-studio-nav" aria-label="Studio views"><button type="button" data-mobile-view="sources" aria-pressed="true">${icon("grid")}Sources</button><button type="button" data-mobile-view="direction" aria-pressed="false">${icon("plus")}Direction <span data-mobile-count>0</span></button><button type="button" data-action="prompt">${icon("arrow")}Prompt</button></nav>`;
  const panel = app.querySelector(".direction-panel");
  panel.id = "your-direction";
  const notice = app.querySelector(".studio-notice");
  let noticeTimer;
  function notify(message, {persistent=false}={}) {
    clearTimeout(noticeTimer);
    notice.hidden = false;
    notice.querySelector("span").textContent = message;
    if(!persistent)noticeTimer=setTimeout(()=>{notice.hidden=true;},4000);
  }
  notice.querySelector("button").addEventListener("click", () => {
    notice.hidden = true;
  });
  function save() {
    const label = app.querySelector(".save-state");
    try {
      const result = services.saveDraft(state);
      label.textContent = result.conflict
        ? "Saved recovery copy"
        : result.saved
          ? "Saved locally"
          : "Not saved";
      label.classList.toggle("save-failed", !result.saved);
      if (!result.saved || result.conflict)
        notify(
          result.message ||
            (result.conflict
              ? "This draft changed in another tab. Download your direction to keep this version."
              : "Local saving is unavailable. You can still copy or download your direction."),
          {persistent:true},
        );
    } catch (error) {
      label.textContent = "Not saved";
      label.classList.add("save-failed");
      notify(`Local saving is unavailable. ${error.message}`, {persistent:true});
    }
    services.onState?.(state);
  }
  function render() {
    if (!state.targets.some((target) => target.id === ui.targetId))
      ui.targetId =
        state.targets.find((target) => target.id !== "page")?.id ||
        state.targets[0].id;
    app.querySelector(".draft-name").textContent =
      state.name || "Untitled direction";
    app.querySelector('[data-action="undo"]').disabled = !past.length;
    app.querySelector('[data-action="redo"]').disabled = !future.length;
    renderDirection(panel, { catalog, state, ui });
    browser?.refreshSelection();
    const count = panel.querySelector(".selection-count");
    if (count)
      app.querySelector("[data-mobile-count]").textContent =
        count.firstChild.textContent.trim();
  }
  function dispatch(command) {
    try {
      if (
        command.type === "base" &&
        command.targetId === "page" &&
        command.sceneId
      ) {
        ui.targetId = state.targets[1].id;
        command = { ...command, targetId: ui.targetId };
      }
      const next = reduceDirection(catalog, state, command);
      if (next === state) return true;
      past.push(state);
      if (past.length > 60) past.shift();
      future.length = 0;
      state = next;
      if (command.type === "add-target" || command.type === "duplicate-target")
        ui.targetId =
          state.targets.find(
            (t) => !past.at(-1).targets.some((old) => old.id === t.id),
          )?.id || ui.targetId;
      render();
      if (
        ["duplicate-target", "move-target", "remove-target"].includes(
          command.type,
        )
      ) {
        panel.querySelectorAll(".target-menu").forEach((menu) => {
          menu.open = false;
        });
        panel
          .querySelector('.target-select[aria-pressed="true"]')
          ?.focus({ preventScroll: true });
      }
      if (
        ["choose", "base"].includes(command.type) &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        const changed = command.role
          ? panel.querySelector(`[data-role-details="${command.role}"]`)
          : panel.querySelector(".base-source");
        changed?.animate(
          [
            { opacity: 0.55, transform: "translateY(4px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 180, easing: "cubic-bezier(.23,1,.32,1)" },
        );
      }
      save();
      return true;
    } catch (error) {
      notify(
        `${error.message}${command.type === "scope" ? " Create a new direction to use another scope without losing sections." : ""}`,
      );
      render();
      return false;
    }
  }
  function newDirection(options) {
    try {
      save();
      state = createDirection(catalog, options);
      past.length = 0;
      future.length = 0;
      ui.targetId = state.targets[0].id;
      ui.mode = options.example ? "parts" : "scene";
      ui.role = "shape";
      ui.expandedRole = null;
      render();
      browser.render();
      save();
      notify(
        "New direction created. Your previous draft is available in Recent drafts. Download unsaved drafts before closing this tab.",
      );
    } catch (error) {
      notify(error.message);
    }
  }
  const dialogs = createDialogs({
    catalog,
    getState: () => state,
    services,
    dispatch,
    newDirection,
    notify,
  });
  function mobileView(value) {
    ui.mobileView = value;
    app.dataset.mobileView = value;
    app
      .querySelectorAll("[data-mobile-view]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.mobileView === value),
        ),
      );
  }
  function browse(role) {
    mobileView("sources");
    ui.mode = role ? "parts" : "scene";
    if (role) ui.role = role;
    browser.render();
    app
      .querySelector(".source-browser")
      .scrollIntoView({ block: "start", behavior: "instant" });
    const focus = role
      ? app.querySelector(`[data-role="${role}"]`)
      : app.querySelector('[data-mode="scene"]');
    focus?.focus({ preventScroll: true });
  }
  browser = mountBrowser(app.querySelector(".source-browser"), {
    catalog,
    ui,
    selectionState: (sceneId) => {
      const target = state.targets.find((target) => target.id === ui.targetId);
      if (!target) return null;
      if (ui.mode === "scene")
        return target.baseScene === sceneId ? "base" : null;
      const row = resolveTarget(catalog, state, target.id).find(
        (row) => row.role === ui.role,
      );
      return row?.propertyIds.some(
        (id) => catalog.properties[id]?.sceneId === sceneId,
      )
        ? row.origin === "explicit"
          ? "explicit"
          : "inherited"
        : null;
    },
    onInspect: (sceneId, trigger) => {
      dialogs.setTrigger(trigger);
      dialogs.inspect(sceneId, ui.targetId);
    },
    onSelect: (sceneId) => {
      const scene = catalog.scenes.find((s) => s.id === sceneId);
      if (!scene) return;
      if (ui.mode === "scene") {
        if (dispatch({ type: "base", targetId: ui.targetId, sceneId }))
          notify(
            `${scene.name} set as the starting scene. Your explicit choices are kept.`,
          );
      } else {
        const propertyId = scene.properties.find(
          (id) => catalog.properties[id]?.role === ui.role,
        );
        if (
          propertyId &&
          dispatch({
            type: "choose",
            targetId: ui.targetId,
            role: ui.role,
            propertyId,
          })
        ) {
          ui.expandedRole = ui.role;
          render();
          notify(
            `${roleName(ui.role)} from ${scene.name} added to your direction.`,
          );
        }
      }
    },
    onChange: (_, trigger) => {
      dialogs.setTrigger(trigger);
      dialogs.fresh("particle-orb");
    },
  });
  function history(type) {
    const source = type === "undo" ? past : future;
    const destination = type === "undo" ? future : past;
    if (!source.length) return;
    destination.push(state);
    state = source.pop();
    render();
    save();
  }
  app.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      if (button.dataset.mobileView) {
        mobileView(button.dataset.mobileView);
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      if (button.closest(".source-browser")) return;
      dialogs.setTrigger(button);
      const { action, command, targetId, role, browseRole, inspect, target } =
        button.dataset;
      if (inspect) {
        dialogs.inspect(inspect, ui.targetId);
        return;
      }
      if (target) {
        ui.targetId = target;
        ui.expandedRole = null;
        render();
        return;
      }
      if (browseRole) {
        browse(browseRole);
        return;
      }
      if (command) {
        dispatch({
          type: command,
          targetId: targetId || ui.targetId,
          role,
          delta: button.dataset.delta
            ? Number(button.dataset.delta)
            : undefined,
        });
        return;
      }
      const actions = {
        rename: () => dialogs.name(),
        drafts: () => dialogs.drafts(),
        share: () => dialogs.share(),
        prompt: () => dialogs.prompt(),
        context: () => dialogs.context(),
        new: () => dialogs.fresh(),
        undo: () => history("undo"),
        redo: () => history("redo"),
        "browse-base": () => browse(),
        "clear-base": () =>
          dispatch({ type: "base", targetId: ui.targetId, sceneId: null }),
        "add-target": () =>
          dispatch({
            type: "add-target",
            kind: "section",
            name: `Section ${state.targets.length}`,
          }),
        "rename-target": () =>
          dialogs.name({ targetId, title: "Name this section" }),
      };
      actions[action]?.();
    },
    { signal: abort.signal },
  );
  panel.addEventListener("change", (event) => {
    if (event.target.matches("[data-target-kind]"))
      dispatch({
        type: "target-kind",
        targetId: event.target.dataset.targetId,
        kind: event.target.value,
      });
    if (event.target.matches("[data-scope]"))
      dispatch({ type: "scope", scope: event.target.value });
  });
  panel.addEventListener(
    "toggle",
    (event) => {
      if (event.target.matches("[data-role-details]")) {
        if (event.target.open)
          ui.expandedRole = event.target.dataset.roleDetails;
        else if (ui.expandedRole === event.target.dataset.roleDetails)
          ui.expandedRole = null;
      }
    },
    true,
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if (
        document.querySelector("dialog[open]") ||
        event.target.matches('input,textarea,select,[contenteditable="true"]')
      )
        return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        history(event.shiftKey ? "redo" : "undo");
      }
    },
    { signal: abort.signal },
  );
  render();
  save();
  return {
    getState: () => state,
    showSources: () => {
      mobileView("sources");
      app.querySelector("#sources").focus({ preventScroll: true });
      app.querySelector("#sources").scrollIntoView({ block: "start" });
    },
    destroy: () => {
      clearTimeout(noticeTimer);
      abort.abort();
      dialogs.close({ restore: false });
    },
    notify,
  };
}
