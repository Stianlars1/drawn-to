import {
  escapeHTML as e,
  roles,
  roleName,
  icon,
  sourceImage,
  preserveFocus,
} from "./dom.js";

export function mountBrowser(
  container,
  { catalog, ui, onInspect, onSelect, onChange, selectionState = () => null },
) {
  container.innerHTML = `<div class="library-heading"><div><p class="eyebrow">THE REFERENCE LIBRARY</p><h1>Find what you’re <em>drawn to.</em></h1></div><span class="library-total">${String(catalog.scenes.length).padStart(2, "0")}<small>original scenes</small></span></div>
    <p class="library-intro">Choose a scene. Keep the parts that speak to you.</p>
    <div class="entry-controls"><div class="segmented" aria-label="Starting approach"><button type="button" data-mode="scene">${icon("grid")}Start with a scene</button><button type="button" data-mode="parts">${icon("plus")}Build from parts</button></div><button type="button" class="text-button example-link" data-example>Try a particle orb ${icon("arrow")}</button></div>
    <div class="role-filters" aria-label="Choose a visual role"></div>
    <div class="library-tools"><label class="search-field">${icon("search")}<span class="sr-only">Search sources</span><input type="search" placeholder="Search the library" autocomplete="off"></label><label class="kind-filter"><span class="sr-only">Filter by scene kind</span><select><option value="">All scenes</option>${[...new Set(catalog.scenes.map((s) => s.kind))].map((kind) => `<option value="${e(kind)}">${e(kind.charAt(0).toUpperCase() + kind.slice(1))}</option>`).join("")}</select></label></div>
    <div class="library-result-line"><p class="result-description"></p><span class="result-count" role="status"></span></div><div class="source-grid"></div><p class="library-footnote">Original showcase previews. Each choice keeps its exact source.</p>`;
  const grid = container.querySelector(".source-grid");
  const filters = container.querySelector(".role-filters");
  function render() {
    container
      .querySelectorAll("[data-mode]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.mode === ui.mode),
        ),
      );
    preserveFocus(filters, () => {
      filters.hidden = ui.mode !== "parts";
      filters.innerHTML = roles
        .map(
          ([role, label]) =>
            `<button type="button" data-role="${role}" data-focus="filter-${role}" aria-pressed="${ui.role === role}">${label}</button>`,
        )
        .join("");
    });
    const query = ui.search.trim().toLowerCase();
    const scenes = catalog.scenes.filter(
      (scene) =>
        (!ui.kind || scene.kind === ui.kind) &&
        (!query ||
          `${scene.id} ${scene.name} ${scene.kind} ${scene.properties.map((id) => catalog.properties[id]?.label || "").join(" ")}`
            .toLowerCase()
            .includes(query)) &&
        (ui.mode !== "parts" ||
          scene.properties.some(
            (id) => catalog.properties[id]?.role === ui.role,
          )),
    );
    container.querySelector(".result-description").textContent =
      ui.mode === "scene"
        ? "A complete starting point, yours to edit."
        : `Choose a source for ${roleName(ui.role).toLowerCase()}.`;
    container.querySelector(".result-count").textContent =
      `${scenes.length} sources`;
    preserveFocus(grid, () => {
      grid.innerHTML = scenes.length
        ? scenes
            .map((scene, index) => {
              const selection = selectionState(scene.id);
              const selectionLabel =
                selection === "base"
                  ? "Starting scene"
                  : selection === "explicit"
                    ? "Selected"
                    : selection === "inherited"
                      ? "From defaults"
                      : "";
              const property = scene.properties
                .map((id) => catalog.properties[id])
                .find((p) => p?.role === ui.role);
              return `<article class="source-tile ${selection ? "has-selection" : ""}"><button class="source-preview" type="button" data-inspect="${e(scene.id)}" data-focus="inspect-${e(scene.id)}" aria-label="Inspect ${e(scene.name)}">${sourceImage(scene)}${selection ? `<span class="source-selection-label">${icon("check")}${selectionLabel}</span>` : ""}<span class="preview-inspect">${icon("inspect")} Inspect source</span></button><div class="source-caption"><div><span class="source-number">${String(index + 1).padStart(2, "0")} / ${e(scene.kind)}</span><h2>${e(scene.name)}</h2></div><button type="button" class="choose-source" ${selection === "explicit" || selection === "base" ? "disabled" : ""} data-select="${e(scene.id)}" data-focus="select-${e(scene.id)}" aria-label="${ui.mode === "scene" ? "Use scene" : `Use ${roleName(ui.role).toLowerCase()}`} from ${e(scene.name)}">${selection === "base" ? "Starting scene" : selection === "explicit" ? "Selected" : selection === "inherited" ? "Keep source" : ui.mode === "scene" ? "Use scene" : `Use ${roleName(ui.role).toLowerCase()}`} ${icon(selection === "base" || selection === "explicit" ? "check" : "plus")}</button></div>${ui.mode === "parts" && property ? `<p class="property-caption">${e(property.label)}</p>` : ""}</article>`;
            })
            .join("")
        : '<div class="empty-library"><h2>No sources found.</h2><p>Try another word, role or scene kind.</p><button type="button" data-clear class="secondary-button">Clear search and kind</button></div>';
    });
  }
  function refreshSelection() {
    for (const tile of grid.querySelectorAll(".source-tile")) {
      const button = tile.querySelector("[data-select]");
      const state = selectionState(button.dataset.select);
      const label =
        state === "base"
          ? "Starting scene"
          : state === "explicit"
            ? "Selected"
            : state === "inherited"
              ? "From defaults"
              : "";
      tile.classList.toggle("has-selection", Boolean(state));
      let badge = tile.querySelector(".source-selection-label");
      if (state && !badge) {
        badge = document.createElement("span");
        badge.className = "source-selection-label";
        tile.querySelector(".source-preview").append(badge);
      }
      if (badge) {
        if (state) badge.innerHTML = icon("check") + label;
        else badge.remove();
      }
      button.disabled = state === "explicit" || state === "base";
      const action =
        state === "base"
          ? "Starting scene"
          : state === "explicit"
            ? "Selected"
            : state === "inherited"
              ? "Keep source"
              : ui.mode === "scene"
                ? "Use scene"
                : `Use ${roleName(ui.role).toLowerCase()}`;
      button.innerHTML =
        action + " " + icon(button.disabled ? "check" : "plus");
      if (button.disabled && document.activeElement === button)
        tile.querySelector(".source-preview").focus({ preventScroll: true });
    }
  }
  container.addEventListener("input", (event) => {
    if (event.target.matches('input[type="search"]')) {
      ui.search = event.target.value;
      render();
    }
  });
  container.addEventListener("change", (event) => {
    if (event.target.matches("select")) {
      ui.kind = event.target.value;
      render();
    }
  });
  container.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.inspect) onInspect(button.dataset.inspect, button);
    else if (button.dataset.select) onSelect(button.dataset.select);
    else if (button.dataset.mode) {
      ui.mode = button.dataset.mode;
      render();
    } else if (button.dataset.role) {
      ui.role = button.dataset.role;
      render();
    } else if (button.hasAttribute("data-example")) onChange("example", button);
    else if (button.hasAttribute("data-clear")) {
      ui.search = "";
      ui.kind = "";
      container.querySelector("input").value = "";
      container.querySelector("select").value = "";
      render();
    }
  });
  render();
  return { render, refreshSelection };
}
