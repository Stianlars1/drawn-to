import { escapeHTML as e, roleName, icon, sourceImage, scopes } from "./dom.js";
import { compilePrompt } from "../core/prompt.js";

export function createDialogs({
  catalog,
  getState,
  services,
  dispatch,
  newDirection,
  notify,
}) {
  let dialog, pendingTrigger;
  const modalState = new WeakMap();
  function setTrigger(element) {
    pendingTrigger = element;
  }
  function open(title, content, { wide = false } = {}) {
    const previousTrigger = dialog ? modalState.get(dialog)?.trigger : null;
    const candidate = pendingTrigger || document.activeElement;
    pendingTrigger = null;
    const trigger =
      candidate?.isConnected &&
      !candidate.closest?.("dialog") &&
      candidate !== document.body
        ? candidate
        : previousTrigger;
    close({ restore: false });
    const focusKey = trigger?.dataset.focus;
    const actionKey = trigger?.dataset.action;
    dialog = document.createElement("dialog");
    dialog.className = `studio-dialog ${wide ? "studio-dialog-wide" : ""}`;
    dialog.innerHTML = `<div class="dialog-header"><h2 id="studio-dialog-title">${e(title)}</h2><button class="icon-button" type="button" data-close aria-label="Close dialog">${icon("close")}</button></div><div class="dialog-body">${content}</div><p class="dialog-status" role="status"></p>`;
    dialog.setAttribute("aria-labelledby", "studio-dialog-title");
    document.body.append(dialog);
    const current = dialog;
    modalState.set(current, { trigger, restore: true });
    current.addEventListener(
      "close",
      () => {
        const restore = modalState.get(current)?.restore && dialog === current;
        current.remove();
        if (dialog === current) dialog = null;
        if (!restore) return;
        requestAnimationFrame(() => {
          if (document.querySelector("dialog[open]")) return;
          const replacement = [
            ...document.querySelectorAll("[data-focus],[data-action]"),
          ].find(
            (node) =>
              (focusKey && node.dataset.focus === focusKey) ||
              (actionKey && node.dataset.action === actionKey),
          );
          const target = trigger?.isConnected ? trigger : replacement;
          const sectionControl = target
            ?.closest(".target-menu")
            ?.closest(".target-item")
            ?.querySelector(".target-select");
          (
            sectionControl ||
            target ||
            document.querySelector(
              ".target-select[aria-pressed=true], .context-button, .draft-name",
            )
          )?.focus({ preventScroll: true });
        });
      },
      { once: true },
    );
    current
      .querySelector("[data-close]")
      .addEventListener("click", () => current.close());
    current.addEventListener("click", (event) => {
      if (event.target === current) {
        const rect = current.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          current.close();
      }
    });
    current.showModal();
    return current;
  }
  function close({ restore = true } = {}) {
    if (dialog?.open) {
      modalState.get(dialog).restore = restore;
      dialog.close();
    }
  }
  async function copy(text, button, label = "Copied", eligible = () => true) {
    const owner = dialog;
    const isCurrent = () =>
      dialog === owner && owner?.open && button.isConnected;
    const previous = button.textContent;
    button.disabled = true;
    try {
      await services.copy(text);
      if (!isCurrent()) return;
      button.textContent = label;
      status(label, owner);
      notify(label);
    } catch (error) {
      if (!isCurrent()) return;
      button.textContent = previous;
      status(
        `Could not copy. ${error.message || "Select the text and copy it manually."}`,
        owner,
      );
    } finally {
      if (isCurrent()) button.disabled = !eligible();
    }
  }
  function status(message, owner = dialog) {
    if (owner === dialog && owner?.open)
      owner.querySelector(".dialog-status").textContent = message;
  }
  function inspect(sceneId, targetId) {
    const scene = catalog.scenes.find((item) => item.id === sceneId);
    if (!scene) return;
    const props = scene.properties
      .map((id) => catalog.properties[id])
      .filter(Boolean);
    const el = open(
      scene.name,
      `<div class="inspector-media">${sourceImage(scene)}<button type="button" class="secondary-button" data-live>Open current live scene ${icon("inspect")}</button></div><p class="inspector-disclosure">Recorded showcase source. This reference is shown independently from your direction.</p><div class="inspector-toolbar"><span class="eyebrow">CHOOSE WHAT TO CARRY OVER</span><button class="secondary-button" type="button" data-base>Use whole scene ${icon("plus")}</button></div><label class="checkbox-field"><input type="checkbox" data-append> Keep an existing choice as another source to discuss</label><div class="source-properties">${props.map((p) => `<section><div><span class="eyebrow">${e(roleName(p.role))}</span><h3>${e(p.label)}</h3><p>${e(p.text)}</p><details class="source-evidence"><summary>Exact source details</summary><code>${e(p.id)}</code><code>${e(p.path)}#${e(p.key)}</code>${p.sources?.length ? `<ul>${p.sources.map((source) => `<li>${e(source.id)} · ${e(source.section)}</li>`).join("")}</ul>` : "<p>Original showcase contract. No external inspiration assigned to this property.</p>"}</details></div><button type="button" class="secondary-button" data-property="${e(p.id)}" data-role="${e(p.role)}">Use for ${e(roleName(p.role).toLowerCase())} ${icon("plus")}</button></section>`).join("")}</div>`,
      { wide: true },
    );
    el.querySelector("[data-live]").addEventListener("click", (event) => {
      const frame = document.createElement("iframe");
      const url = new URL(scene.url, location.href);
      url.searchParams.set("still", "");
      frame.src = url.href;
      frame.title = `${scene.name} original interactive scene`;
      frame.className = "live-scene";
      el.querySelector(".inspector-media").replaceChildren(frame);
      event.currentTarget?.remove();
    });
    el.querySelector("[data-base]").addEventListener("click", () => {
      dispatch({ type: "base", targetId, sceneId });
      close();
    });
    el.querySelectorAll("[data-property]").forEach((button) =>
      button.addEventListener("click", () => {
        if (
          dispatch({
            type: "choose",
            targetId,
            role: button.dataset.role,
            propertyId: button.dataset.property,
            append: el.querySelector("[data-append]").checked || undefined,
          })
        ) {
          button.textContent = "Added to direction";
          status(`${roleName(button.dataset.role)} from ${scene.name} added.`);
        }
      }),
    );
  }
  function prompt() {
    const result = compilePrompt(catalog, getState());
    const issues = result.issues || [];
    const el = open(
      "Your direction, ready to carry over.",
      `<p class="dialog-lead">Paste this into your project’s agent. It asks the Drawn To skill to load your exact references and work through the open decisions with you.</p>${issues.length ? `<div class="notice"><strong>Before you continue</strong><ul>${issues.map((issue) => `<li>${e(typeof issue === "string" ? issue : issue.message || JSON.stringify(issue))}</li>`).join("")}</ul></div>` : ""}<label class="prompt-label" for="direction-prompt">Drawn To skill invocation</label><textarea id="direction-prompt" class="prompt-output" readonly spellcheck="false"></textarea><div class="dialog-actions"><span>Original source contracts stay attached.</span><button type="button" class="primary-button" data-copy>Copy prompt ${icon("arrow")}</button></div>`,
      { wide: true },
    );
    el.querySelector("textarea").value = result.text;
    el.querySelector("[data-copy]").addEventListener("click", (event) => {
      if (!result.text || issues.some((issue) => issue.blocking)) {
        status("Resolve the issues above before copying this handoff.");
        return;
      }
      copy(result.text, event.currentTarget, "Prompt copied");
    });
  }
  function share() {
    const state = getState();
    const el = open(
      "Share this direction",
      `<p class="dialog-lead">Share a separate, editable copy with its original catalog version.</p><div class="share-fields"><span class="eyebrow">INCLUDED BY DEFAULT</span><p>Scope, section order, scene defaults, selected property IDs, open and excluded roles, and catalog version.</p></div><label class="checkbox-field"><input type="checkbox" data-context> Include my project context and custom names</label><div class="context-disclosure" hidden></div><label class="prompt-label" for="share-url">Direction link</label><textarea id="share-url" class="share-url" readonly></textarea><div class="dialog-actions"><button type="button" class="secondary-button" data-download>Download JSON</button><button type="button" class="primary-button" data-copy>Copy link ${icon("share")}</button></div>`,
    );
    let result,
      copying = false,
      includeContext = false;
    const contextToggle = el.querySelector("[data-context]");
    const copyButton = el.querySelector("[data-copy]");
    const copyLabel = copyButton.innerHTML;
    const update = () => {
      if (copying) {
        contextToggle.checked = includeContext;
        return;
      }
      includeContext = contextToggle.checked;
      copyButton.innerHTML = copyLabel;
      result = null;
      const disclosure = el.querySelector(".context-disclosure");
      disclosure.hidden = !includeContext;
      disclosure.textContent = includeContext
        ? JSON.stringify(
            {
              name: state.name,
              targets: state.targets.map((t) => ({ name: t.name })),
              context: state.context,
            },
            null,
            2,
          )
        : "";
      try {
        result = services.share(state, { includeContext });
        el.querySelector("#share-url").value = result.tooLong
          ? "This direction is too large for a link. Download a portable JSON file below."
          : result.url;
        el.querySelector("[data-copy]").disabled = Boolean(result.tooLong);
        let preview = el.querySelector("[data-shared-fields]");
        if (!preview) {
          const details = document.createElement("details");
          details.className = "source-evidence";
          details.innerHTML =
            '<summary>View shared data</summary><pre class="context-disclosure" data-shared-fields></pre>';
          el.querySelector(".share-fields").append(details);
          preview = details.querySelector("pre");
        }
        preview.textContent = JSON.stringify(
          result.payload ?? {
            scope: state.scope,
            catalogId: state.catalogId,
            targets: state.targets.map(({ kind, baseScene, choices }) => ({
              kind,
              baseScene,
              choices,
            })),
          },
          null,
          2,
        );
        status(
          result.tooLong
            ? "Link limit reached. JSON includes the same direction."
            : "",
        );
      } catch (error) {
        status(error.message);
        el.querySelector("[data-copy]").disabled = true;
      }
    };
    el.querySelector("[data-context]").addEventListener("change", update);
    copyButton.addEventListener("click", async () => {
      if (copying || !result || result.tooLong || dialog !== el) return;
      copying = true;
      contextToggle.disabled = true;
      try {
        await copy(result.url, copyButton, "Link copied", () =>
          Boolean(result && !result.tooLong),
        );
      } finally {
        copying = false;
        if (dialog === el && el.open) {
          contextToggle.disabled = false;
          copyButton.disabled = !result || Boolean(result.tooLong);
        }
      }
    });
    el.querySelector("[data-download]").addEventListener("click", () => {
      try {
        services.download(state, {
          includeContext: el.querySelector("[data-context]").checked,
        });
        status("Direction JSON downloaded.");
      } catch (error) {
        status(error.message);
      }
    });
    update();
  }
  function context() {
    const state = getState();
    const el = open(
      "A little context, if you have it.",
      `<p class="dialog-lead">Give the skill a head start. You can leave these open and explore them in your project.</p><form class="context-form">${[
        ["product", "Product or project", "What are you making?"],
        ["platform", "Platform", "For example, a website or macOS app"],
        [
          "intent",
          "What it should do",
          "What should this direction help you achieve?",
        ],
      ]
        .map(
          ([key, label, placeholder]) =>
            `<label>${label}<textarea rows="${key === "intent" ? 3 : 2}" name="${key}" placeholder="${placeholder}">${e(state.context[key] || "")}</textarea></label>`,
        )
        .join(
          "",
        )}<button type="submit" class="primary-button">Save context ${icon("check")}</button></form>`,
    );
    el.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      for (const field of el.querySelectorAll("textarea")) {
        if (
          !dispatch({ type: "context", key: field.name, value: field.value })
        ) {
          status(
            "This context could not be saved. Check the field length and try again.",
          );
          return;
        }
      }
      close();
    });
  }
  function name({ targetId, title = "Name your direction" } = {}) {
    const state = getState();
    const value = targetId
      ? state.targets.find((t) => t.id === targetId)?.name
      : state.name;
    const el = open(
      title,
      `<form class="context-form"><label>Name<input name="name" type="text" value="${e(value)}" required></label><button type="submit" class="primary-button">Save name</button></form>`,
    );
    el.querySelector("input").focus();
    el.querySelector("input").select();
    el.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      if (
        dispatch({
          type: "rename",
          targetId,
          value: el.querySelector("input").value,
        })
      )
        close();
      else status("Use a name of 500 characters or fewer.");
    });
  }
  function drafts() {
    let items = [];
    try {
      items = services.loadDrafts();
    } catch (error) {
      notify(error.message);
    }
    const el = open(
      "Your local studio",
      `<p class="dialog-lead">Saved directions and unsaved drafts from this tab. Download unsaved drafts before closing.</p><div class="recent-drafts">${items.length ? items.map((draft) => `<button type="button" data-draft="${e(draft.id)}"><span>${e(draft.name || "Untitled direction")}${draft.recovered ? " · recovery copy" : ""}<small>${draft.transient ? "Only in this tab · " : ""}${e(new Date(draft.updatedAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" }))}</small></span>${icon("arrow")}</button>`).join("") : "<p>No saved drafts yet.</p>"}</div><div class="dialog-actions"><button type="button" class="secondary-button" data-import>Import direction JSON</button><button type="button" class="primary-button" data-new>New direction ${icon("plus")}</button></div><input type="file" accept=".json,application/json" data-file hidden>`,
    );
    el.querySelectorAll("[data-draft]").forEach((button) =>
      button.addEventListener("click", async () => {
        try {
          const opened = await services.openDraft(button.dataset.draft);
          if (opened && dialog === el) el.close();
        } catch (error) {
          status(error.message, el);
        }
      }),
    );
    el.querySelector("[data-new]").addEventListener("click", fresh);
    el.querySelector("[data-import]").addEventListener("click", () =>
      el.querySelector("[data-file]").click(),
    );
    el.querySelector("[data-file]").addEventListener(
      "change",
      async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        try {
          const opened = await services.importFile(file);
          if (opened && dialog === el) el.close();
        } catch (error) {
          status(`Could not import this direction. ${error.message}`, el);
          if (dialog === el) event.target.value = "";
        }
      },
    );
  }
  function fresh(example) {
    if (example === "particle-orb") {
      const el = open(
        "Try the particle orb direction",
        `<p class="dialog-lead">Start a separate draft with Plasma shape and color, and Particle Assembly graphic construction. Layout, typography and motion stay open.</p><button type="button" class="primary-button" data-create>Create example direction ${icon("arrow")}</button>`,
      );
      el.querySelector("[data-create]").addEventListener("click", () => {
        newDirection({ scope: "graphic", example });
        close();
      });
      return;
    }
    const el = open(
      "Start a new direction",
      `<p class="dialog-lead">Your current draft stays in Recent drafts. What are you designing?</p><form class="context-form"><label>Scope<select name="scope">${scopes.map(([id, label]) => `<option value="${id}" ${id === "graphic" ? "selected" : ""}>${label}</option>`).join("")}</select></label><button class="primary-button" type="submit">Create direction ${icon("arrow")}</button></form>`,
    );
    el.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      newDirection({ scope: el.querySelector("select").value });
      close();
    });
  }
  return {
    inspect,
    prompt,
    share,
    context,
    name,
    drafts,
    fresh,
    close,
    setTrigger,
  };
}
