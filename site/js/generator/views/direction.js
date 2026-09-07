import {
  escapeHTML as e,
  scopes,
  roleName,
  icon,
  sourceImage,
  preserveFocus,
} from "./dom.js";
import { resolveTarget } from "../core/state.js";

export function renderDirection(container, { catalog, state, ui }) {
  const target =
    state.targets.find((item) => item.id === ui.targetId) || state.targets[0];
  ui.targetId = target.id;
  const rows = resolveTarget(catalog, state, target.id);
  const selected = rows.filter((row) => row.propertyIds?.length);
  const base = catalog.scenes.find((scene) => scene.id === target.baseScene);
  preserveFocus(container, () => {
    container.innerHTML = `<div class="direction-content"><div class="direction-heading"><div><span class="eyebrow">THE SELECTION</span><h2>Your direction<span class="direction-dot" aria-hidden="true"></span></h2></div><span class="selection-count">${selected.length}<span> chosen</span></span></div>
      <label class="scope-field"><span>Designing a</span><select data-scope data-focus="scope">${scopes.map(([id, label]) => `<option value="${id}" ${state.scope === id ? "selected" : ""}>${label}</option>`).join("")}</select></label>
      ${state.scope === "page" ? `<section class="page-structure" aria-label="Page structure"><div class="section-label"><span>Page structure</span><button type="button" class="text-button" data-action="add-target" data-focus="add-target">${icon("plus")}Add section</button></div><div class="target-list">${state.targets.map((item, index) => `<div class="target-item ${item.id === target.id ? "is-active" : ""}"><button type="button" class="target-select" data-target="${e(item.id)}" data-focus="target-${e(item.id)}" aria-pressed="${item.id === target.id}"><span>${index === 0 ? "◎" : String(index).padStart(2, "0")}</span>${e(index === 0 ? "Page defaults" : item.name)}</button>${index > 0 ? `<details class="target-menu"><summary data-focus="menu-${e(item.id)}" aria-label="Actions for ${e(item.name)}">···</summary><div><button type="button" data-focus="rename-target-${e(item.id)}" data-action="rename-target" data-target-id="${e(item.id)}">Rename</button><button type="button" data-focus="duplicate-target-${e(item.id)}" data-command="duplicate-target" data-target-id="${e(item.id)}">Duplicate</button><button type="button" data-focus="move-target-${e(item.id)}" data-command="move-target" data-delta="-1" data-target-id="${e(item.id)}" ${index === 1 ? "disabled" : ""}>Move up</button><button type="button" data-focus="move-target-${e(item.id)}" data-command="move-target" data-delta="1" data-target-id="${e(item.id)}" ${index === state.targets.length - 1 ? "disabled" : ""}>Move down</button><button type="button" data-focus="remove-target-${e(item.id)}" data-command="remove-target" data-target-id="${e(item.id)}">Remove section</button></div></details>` : ""}</div>`).join("")}</div></section>` : ""}
      ${state.scope === "section" || (state.scope === "page" && target.id !== "page") ? `<label class="scope-field section-kind"><span>Section type</span><select data-target-kind data-target-id="${e(target.id)}" data-focus="section-kind">${["section", "hero", "features", "pricing", "onboarding", "footer", "editorial", "component", "graphic"].map((kind) => `<option value="${kind}" ${target.kind === kind ? "selected" : ""}>${kind[0].toUpperCase() + kind.slice(1)}</option>`).join("")}</select></label>` : ""}
      <div class="base-source"><span class="section-label">${state.scope === "page" && target.id !== "page" ? e(target.name) : "Starting scene"}</span>${base ? `<div class="base-selected"><button type="button" class="base-inspect" data-inspect="${e(base.id)}" aria-label="Inspect ${e(base.name)}">${sourceImage(base)}</button><div><strong>${e(base.name)}</strong><span>Scene defaults</span></div><button type="button" class="text-button" data-action="browse-base">Change</button></div><button type="button" class="text-button remove-base" data-action="clear-base">Remove scene defaults</button>` : `<button type="button" class="empty-base" data-action="browse-base">${icon("plus")}Choose a starting scene <span>Optional</span></button>`}</div>
      <div class="role-selection-list">${rows
        .map((row) => {
          const props = (row.propertyIds || [])
            .map((id) => catalog.properties[id])
            .filter(Boolean);
          const explicit = Boolean(target.choices[row.role]);
          const label =
            row.mode === "excluded"
              ? "Excluded"
              : !props.length
                ? "Left open"
                : explicit
                  ? "Chosen"
                  : row.origin === "page"
                    ? "From page defaults"
                    : "From scene defaults";
          return `<details class="role-selection ${props.length ? "has-source" : ""} ${row.mode === "excluded" ? "is-excluded" : ""}" ${ui.expandedRole === row.role ? "open" : ""} data-role-details="${row.role}"><summary data-focus="summary-${row.role}"><span class="role-name">${e(roleName(row.role))}</span><span class="role-value">${props.length ? props.map((p) => `<span>${e(catalog.scenes.find((s) => s.id === p.sceneId)?.shortName || catalog.scenes.find((s) => s.id === p.sceneId)?.name || p.label)}</span>`).join("") : `<span>${label}</span>`}</span><span class="role-chevron" aria-hidden="true">⌄</span></summary><div class="role-detail"><span class="choice-origin">${label}${props.length > 1 ? " · Multiple sources to resolve" : ""}</span>${props
            .map((p) => {
              const scene = catalog.scenes.find((s) => s.id === p.sceneId);
              return `<button type="button" class="chosen-source-detail" data-inspect="${e(p.sceneId)}" ${scene ? `aria-label="Inspect ${e(scene.name)} for ${e(roleName(row.role))}"` : ""}>${scene ? sourceImage(scene) : ""}<span>${e(p.label)}<small>Inspect source ${icon("arrow")}</small></span></button>`;
            })
            .join(
              "",
            )}<div class="role-actions"><button type="button" data-focus="browse-${row.role}" data-browse-role="${row.role}">${props.length ? "Change" : "Choose"} source</button><button type="button" data-command="open" data-role="${row.role}" data-focus="open-${row.role}">Leave open</button><button type="button" data-command="reset" data-role="${row.role}" data-focus="reset-${row.role}">Reset</button><button type="button" data-command="exclude" data-role="${row.role}" data-focus="exclude-${row.role}">Exclude</button></div></div></details>`;
        })
        .join(
          "",
        )}</div><p class="direction-guidance">Open choices stay open for the skill to explore with you.</p>
      <button type="button" class="context-button" data-focus="context" data-action="context">${icon("plus")}Add project context<span>Optional</span></button>
      </div><div class="direction-export"><p>Open decisions stay with your agent.</p><button type="button" class="primary-button" data-action="prompt">Review prompt ${icon("arrow")}</button><span>Exact sources · Drawn To skill handoff</span></div>`;
  });
}
