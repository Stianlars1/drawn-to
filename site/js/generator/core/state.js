export const ROLE_IDS = Object.freeze([
  "layout",
  "typography",
  "color",
  "shape",
  "graphics",
  "material",
  "light",
  "motion",
  "interaction",
]);
export const SCOPES = Object.freeze([
  "page",
  "section",
  "component",
  "graphic",
]);
export const TARGET_KINDS = Object.freeze([
  "page",
  "section",
  "hero",
  "features",
  "pricing",
  "onboarding",
  "footer",
  "component",
  "graphic",
  "editorial",
]);
export const roleLabel = (role) =>
  ({
    graphics: "Graphic style",
    color: "Color",
    light: "Light",
    typography: "Typography",
    layout: "Layout",
    shape: "Shape",
    material: "Material",
    motion: "Motion",
    interaction: "Interaction",
  })[role] || role;
const uid = () => globalThis.crypto.randomUUID();
const plain = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  Object.getPrototypeOf(value) === Object.prototype;
const targetName = (scope) =>
  ({
    page: "Page defaults",
    section: "Section 1",
    component: "Main component",
    graphic: "Main graphic",
  })[scope] || "Section";
const getScene = (catalog, id) =>
  catalog.scenes.find((s) => s.id === id || s.legacyId === id);
const target = (id, kind, name, baseScene = null) => ({
  id,
  kind,
  name,
  baseScene,
  choices: {},
});

export function createDirection(
  catalog,
  { scope = "graphic", sceneId, example } = {},
) {
  if (!SCOPES.includes(scope)) throw new Error("Choose a supported scope.");
  const scene = sceneId ? getScene(catalog, sceneId) : null;
  if (sceneId && !scene)
    throw new Error("This scene is not in this library version.");
  const targets =
    scope === "page"
      ? [
          target("page", "page", "Page defaults"),
          target("section-" + uid(), "section", "Section 1", scene?.id || null),
        ]
      : [target("main", scope, targetName(scope), scene?.id || null)];
  let state = {
    schema: 1,
    id: uid(),
    catalogId: catalog.id,
    scope,
    name: "Untitled direction",
    targets,
    context: { product: "", platform: "", intent: "" },
    updatedAt: Date.now(),
  };
  if (example === "particle-orb") {
    state = createDirection(catalog, { scope: "graphic" });
    for (const role of ROLE_IDS)
      state.targets[0].choices[role] = { mode: "open", propertyIds: [] };
    for (const [role, sceneId] of [
      ["shape", "plasma-study"],
      ["color", "plasma-study"],
      ["graphics", "particle-assembly"],
    ]) {
      const scene = getScene(catalog, sceneId),
        id = scene?.defaults[role];
      if (!id)
        throw new Error(
          "The particle orb example is unavailable in this library version.",
        );
      state.targets[0].choices[role] = { mode: "selected", propertyIds: [id] };
    }
  }
  return state;
}

export function resolveTarget(catalog, state, targetId) {
  const item = state.targets.find((t) => t.id === targetId);
  if (!item) throw new Error("This part of the direction no longer exists.");
  const parent =
    state.scope === "page" && targetId !== "page"
      ? resolveTarget(catalog, state, "page")
      : null;
  const base = item.baseScene ? getScene(catalog, item.baseScene) : null;
  return ROLE_IDS.map((role) => {
    const choice = item.choices[role];
    if (choice)
      return {
        role,
        mode: choice.mode,
        origin: "explicit",
        propertyIds: [...choice.propertyIds],
      };
    if (base?.defaults[role])
      return {
        role,
        mode: "selected",
        origin: "scene",
        propertyIds: [base.defaults[role]],
      };
    const inherited = parent?.find((r) => r.role === role);
    if (inherited && (inherited.mode !== "open" || inherited.origin !== "none"))
      return {
        ...inherited,
        origin: "page",
        propertyIds: [...inherited.propertyIds],
      };
    return { role, mode: "open", origin: "none", propertyIds: [] };
  });
}

export function reduceDirection(catalog, state, command) {
  const next = structuredClone(state);
  const item = command.targetId
    ? next.targets.find((t) => t.id === command.targetId)
    : null;
  const needsTarget = [
    "base",
    "choose",
    "open",
    "exclude",
    "reset",
    "remove-target",
    "move-target",
    "duplicate-target",
    "target-kind",
  ];
  if (needsTarget.includes(command.type) && !item)
    throw new Error("Choose a part of the direction first.");
  if (
    ["choose", "open", "exclude", "reset"].includes(command.type) &&
    !ROLE_IDS.includes(command.role)
  )
    throw new Error("This property role is not supported.");
  switch (command.type) {
    case "scope": {
      if (!SCOPES.includes(command.scope))
        throw new Error("Choose a supported scope.");
      if (command.scope === next.scope) return state;
      if (next.scope === "page" && next.targets.length > 2)
        throw new Error(
          "This page has several sections. Start a new draft or keep one section before changing scope.",
        );
      if (command.scope === "page") {
        const current = next.targets[0];
        current.id = "section-" + uid();
        current.kind = "section";
        current.name = "Section 1";
        next.targets = [target("page", "page", "Page defaults"), current];
      } else {
        const current = next.targets.find((t) => t.id !== "page");
        const resolved = resolveTarget(catalog, next, current.id);
        current.choices = Object.fromEntries(
          resolved
            .filter((r) => r.origin !== "none")
            .map((r) => [r.role, { mode: r.mode, propertyIds: r.propertyIds }]),
        );
        current.id = "main";
        current.kind = command.scope;
        current.name = targetName(command.scope);
        next.targets = [current];
      }
      next.scope = command.scope;
      break;
    }
    case "base": {
      if (item.id === "page")
        throw new Error(
          "Choose a section for a scene preset. Page defaults can be set one property at a time.",
        );
      const scene = command.sceneId ? getScene(catalog, command.sceneId) : null;
      if (command.sceneId && !scene)
        throw new Error("This scene is not in this library version.");
      item.baseScene = scene?.id || null;
      break;
    }
    case "choose": {
      if (!Object.hasOwn(catalog.properties, command.propertyId))
        throw new Error("This property is not in this library version.");
      const property = catalog.properties[command.propertyId];
      if (property.role !== command.role)
        throw new Error("That source belongs to a different property role.");
      const previous = command.append
        ? resolveTarget(catalog, next, item.id).find(
            (r) => r.role === command.role,
          ).propertyIds
        : [];
      item.choices[command.role] = {
        mode: "selected",
        propertyIds: [...new Set([...previous, property.id])],
      };
      break;
    }
    case "open":
    case "exclude":
      item.choices[command.role] = {
        mode: command.type === "open" ? "open" : "excluded",
        propertyIds: [],
      };
      break;
    case "reset":
      delete item.choices[command.role];
      break;
    case "context": {
      if (
        !["product", "platform", "intent"].includes(command.key) ||
        typeof command.value !== "string"
      )
        throw new Error("This context field is not supported.");
      next.context[command.key] = command.value;
      break;
    }
    case "rename": {
      if (typeof command.value !== "string")
        throw new Error("Enter a name as text.");
      if (command.targetId) {
        if (!item) throw new Error("This section no longer exists.");
        item.name = command.value;
      } else next.name = command.value;
      break;
    }
    case "target-kind": {
      if (
        !item ||
        item.id === "page" ||
        !["page", "section"].includes(next.scope) ||
        !TARGET_KINDS.includes(command.kind) ||
        command.kind === "page"
      )
        throw new Error("Choose a supported section type.");
      const previousKind = item.kind;
      item.kind = command.kind;
      if (new RegExp("^" + previousKind + " \\d+$", "i").test(item.name))
        item.name =
          command.kind[0].toUpperCase() +
          command.kind.slice(1) +
          " " +
          Math.max(1, next.targets.indexOf(item));
      break;
    }
    case "add-target": {
      if (next.scope !== "page")
        throw new Error("Choose Full page to add sections.");
      const kind = command.kind || "section";
      if (!TARGET_KINDS.includes(kind) || kind === "page")
        throw new Error("Choose a supported section type.");
      next.targets.push(
        target(
          "section-" + uid(),
          kind,
          command.name ||
            `${kind[0].toUpperCase() + kind.slice(1)} ${next.targets.length}`,
        ),
      );
      break;
    }
    case "remove-target": {
      if (
        next.scope !== "page" ||
        item.id === "page" ||
        next.targets.length <= 2
      )
        throw new Error("Keep at least one section in the page.");
      next.targets = next.targets.filter((t) => t.id !== item.id);
      break;
    }
    case "move-target": {
      if (item.id === "page" || ![-1, 1].includes(command.delta))
        throw new Error("Choose a section to move.");
      const from = next.targets.indexOf(item),
        to = from + command.delta;
      if (to > 0 && to < next.targets.length)
        [next.targets[from], next.targets[to]] = [
          next.targets[to],
          next.targets[from],
        ];
      break;
    }
    case "duplicate-target": {
      if (next.scope !== "page" || item.id === "page")
        throw new Error("Choose a section to duplicate.");
      const copy = {
        ...structuredClone(item),
        id: "section-" + uid(),
        name: item.name + " copy",
      };
      next.targets.splice(next.targets.indexOf(item) + 1, 0, copy);
      break;
    }
    default:
      throw new Error("This action is not supported.");
  }
  next.updatedAt = Date.now();
  const problems = validateDirection(catalog, next);
  if (problems.length) throw new Error(problems[0].message);
  return next;
}

export function validateDirection(catalog, state) {
  const fail = (message) => [
    { code: "invalid-direction", blocking: true, message },
  ];
  if (!plain(state) || state.schema !== 1)
    return fail("This direction uses an unsupported format.");
  if (state.catalogId !== catalog.id)
    return fail("This direction belongs to a different library version.");
  if (!SCOPES.includes(state.scope))
    return fail("This direction has an invalid scope.");
  if (
    !Array.isArray(state.targets) ||
    !state.targets.length ||
    state.targets.length > 100
  )
    return fail("This direction must contain between 1 and 100 targets.");
  if (
    state.scope === "page" &&
    (state.targets[0]?.id !== "page" || state.targets.length < 2)
  )
    return fail("A page needs page defaults and at least one section.");
  if (
    state.scope !== "page" &&
    (state.targets.length !== 1 || state.targets[0]?.id !== "main")
  )
    return fail("A single surface must have one main target.");
  if (typeof state.name !== "string" || state.name.length > 500)
    return fail("The direction name is too long or invalid.");
  if (
    !plain(state.context) ||
    Object.keys(state.context).some(
      (k) => !["product", "platform", "intent"].includes(k),
    ) ||
    Object.values(state.context).some(
      (v) => typeof v !== "string" || v.length > 50000,
    )
  )
    return fail("Project context must contain supported text fields only.");
  const ids = new Set();
  for (const item of state.targets) {
    if (
      !plain(item) ||
      typeof item.id !== "string" ||
      !/^[a-z][a-z0-9-]{0,80}$/.test(item.id) ||
      ids.has(item.id)
    )
      return fail("The direction contains an invalid or duplicated target.");
    ids.add(item.id);
    if (
      !TARGET_KINDS.includes(item.kind) ||
      typeof item.name !== "string" ||
      item.name.length > 500
    )
      return fail("A section has an invalid type or name.");
    if (
      item.baseScene !== null &&
      !catalog.scenes.some((s) => s.id === item.baseScene)
    )
      return fail("A scene is unavailable in this library version.");
    if (item.id === "page" && (item.baseScene !== null || item.kind !== "page"))
      return fail("Page defaults cannot inherit a whole scene composition.");
    if (!plain(item.choices))
      return fail("Property selections have an invalid format.");
    for (const [role, choice] of Object.entries(item.choices)) {
      if (
        !ROLE_IDS.includes(role) ||
        !plain(choice) ||
        !["selected", "open", "excluded"].includes(choice.mode) ||
        !Array.isArray(choice.propertyIds) ||
        choice.propertyIds.length > 8
      )
        return fail("A property selection is invalid.");
      if (choice.mode === "selected" && !choice.propertyIds.length)
        return fail("Select a property or leave the decision open.");
      if (choice.mode !== "selected" && choice.propertyIds.length)
        return fail("An open or excluded decision cannot include a property.");
      if (new Set(choice.propertyIds).size !== choice.propertyIds.length)
        return fail("A property selection is duplicated.");
      for (const id of choice.propertyIds)
        if (
          typeof id !== "string" ||
          !Object.hasOwn(catalog.properties, id) ||
          catalog.properties[id].role !== role
        )
          return fail("An unknown or mismatched property was included.");
    }
  }
  return [];
}
