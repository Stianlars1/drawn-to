export const escapeHTML = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
export const roles = [
  ["layout", "Layout"],
  ["typography", "Typography"],
  ["color", "Color"],
  ["shape", "Shape"],
  ["graphics", "Graphic style"],
  ["material", "Material"],
  ["light", "Light"],
  ["motion", "Motion"],
  ["interaction", "Interaction"],
];
export const roleName = (role) =>
  roles.find((item) => item[0] === role)?.[1] || role;
export const scopes = [
  ["page", "Full page"],
  ["section", "Section"],
  ["component", "Component"],
  ["graphic", "Graphic"],
];
export const icon = (name) => {
  const paths = {
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="M6 6l12 12M6 18L18 6"/>',
    check: '<path d="m5 12 4 4 10-10"/>',
    undo: '<path d="m8 5-4 4 4 4M4 9h9a6 6 0 0 1 0 12"/>',
    redo: '<path d="m16 5 4 4-4 4M20 9h-9a6 6 0 0 0 0 12"/>',
    share: '<path d="M12 15V3m-4 4 4-4 4 4M5 12v8h14v-8"/>',
    inspect: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  };
  return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
};
export function preserveFocus(container, render) {
  const active = document.activeElement;
  const key = container.contains(active) ? active.dataset.focus : null;
  render();
  if (key) {
    const replacement = Array.from(
      container.querySelectorAll("[data-focus]"),
    ).find((el) => el.dataset.focus === key && !el.disabled);
    if (replacement) {
      const menu = replacement.closest(".target-menu");
      if (menu) menu.open = true;
      replacement.focus({ preventScroll: true });
    } else
      container
        .querySelector(
          ".target-select[aria-pressed=true], [data-scope], button",
        )
        ?.focus({ preventScroll: true });
  }
}
export const sourceImage = (scene, className = "") =>
  `<img class="${className}" src="${escapeHTML(scene.thumbnail)}" alt="" loading="lazy" decoding="async" width="720" height="450">`;
