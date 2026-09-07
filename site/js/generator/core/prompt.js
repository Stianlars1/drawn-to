import { resolveTarget, validateDirection, roleLabel } from "./state.js";
const REPO = "https://github.com/Stianlars1/drawn-to";
const quoted = (value) => JSON.stringify(value);
export function compilePrompt(catalog, state) {
  const invalid = validateDirection(catalog, state);
  if (invalid.length)
    return { text: "", sources: [], open: [], issues: invalid };
  const sources = new Map(),
    open = [],
    issues = [];
  const sourceURL = (path) =>
    catalog.sourcePublished
      ? `${REPO}/blob/${catalog.sourceRevision}/skills/drawn-to/${path}`
      : null;
  const lines = [
    "Use the Drawn To skill/plugin and follow its generator handoff workflow.",
    "",
    "These are deliberate reference selections. Read the exact skill property contracts and their supporting evidence before proposing the direction. Use the skill to discover project context, ask consequential questions and guide implementation.",
    "",
    "SKILL AND LIBRARY VERSION",
    `Generator contract: 1. Catalog: ${catalog.id}.`,
    "Start with SKILL.md and references/generator-handoff.md, relative to the Drawn To skill root.",
  ];
  if (catalog.sourcePublished)
    lines.push(
      `Knowledge source revision: ${catalog.sourceRevision}.`,
      `Skill entry: ${sourceURL("SKILL.md")}`,
      `Receiving workflow: ${sourceURL("references/generator-handoff.md")}`,
      "Use matching installed resources. If the installed skill is outdated or unavailable, read the pinned resources at the links provided; do not silently substitute another version.",
    );
  else
    lines.push(
      "This catalog uses local, unpublished skill contracts. The source revision is not yet published. Use the matching local skill resource files; if they are unavailable, explain which files are needed before relying on those choices.",
    );
  lines.push(
    "",
    "SELECTED SCOPE",
    {
      page: "Full page",
      section: "Section",
      component: "Component",
      graphic: "Graphic",
    }[state.scope],
  );
  if (state.name.trim() && state.name !== "Untitled direction")
    lines.push(`Direction name: ${quoted(state.name)}`);
  for (const item of state.targets) {
    const rows = resolveTarget(catalog, state, item.id);
    lines.push(
      "",
      `TARGET: ${item.name || item.kind}${item.id === "page" ? " (shared page defaults)" : ""}`,
    );
    const structureGuide = {
      hero: "Hero",
      features: "Feature section - grid/cards",
      pricing: "Pricing",
      footer: "Footer",
      onboarding: "Onboarding and configuration",
    }[item.kind];
    if (structureGuide)
      lines.push(
        `For this section's purpose, consult references/recipes.md, section ${quoted(structureGuide)}. Use it to clarify the structure; the visual choices remain those listed below.`,
      );
    for (const row of rows) {
      if (row.mode === "open") {
        open.push({
          targetId: item.id,
          targetLabel: item.name,
          role: row.role,
          label: roleLabel(row.role),
        });
        continue;
      }
      if (row.mode === "excluded") {
        lines.push(
          `- ${roleLabel(row.role)}: explicitly excluded from this transfer.`,
        );
        continue;
      }
      lines.push(
        `- ${roleLabel(row.role)}: ${row.propertyIds.map((id) => "`" + id + "`").join(" + ")}.`,
      );
      for (const id of row.propertyIds) {
        const property = catalog.properties[id],
          scene = catalog.scenes.find((s) => s.id === property.sceneId);
        lines.push(
          `  Read ${property.path}; property key ${quoted(property.key)}. Apply only its ${row.role} role to this target.`,
        );
        if (!sources.has(id))
          sources.set(id, {
            ...property,
            sceneName: scene?.name || property.sceneId,
            url: sourceURL(property.path),
          });
      }
      if (row.propertyIds.length > 1) {
        const message = `Resolve how the selected ${roleLabel(row.role).toLowerCase()} references relate within ${item.name || item.kind}.`;
        issues.push({
          code: "multiple-influences",
          blocking: false,
          targetId: item.id,
          role: row.role,
          message,
        });
        lines.push(
          `  OPEN RELATIONSHIP: ${message} Ask before choosing a dominant source, mixing them or assigning separate layers.`,
        );
      }
    }
    const unanswered = rows
      .filter((r) => r.mode === "open")
      .map((r) => roleLabel(r.role));
    if (unanswered.length)
      lines.push(
        `Left open: ${unanswered.join(", ")}. These do not inherit unselected source decisions.`,
      );
  }
  if (!sources.size)
    issues.push({
      code: "empty-direction",
      blocking: true,
      message:
        "Choose at least one reference property to create an agent prompt.",
    });
  lines.push("", "EXACT REFERENCE RESOURCES");
  const resources = new Map();
  for (const property of sources.values()) {
    lines.push(
      `- ${property.id}: ${property.label}. Original Drawn To scene contract: ${property.path}, property ${quoted(property.key)}.`,
    );
    if (property.url) lines.push(`  ${property.url}`);
    for (const reference of property.sources || []) {
      const path = `references/posts/${reference.id}.md`,
        key = path + "#" + reference.section;
      if (!resources.has(key))
        resources.set(key, {
          path,
          section: reference.section,
          properties: [],
        });
      resources.get(key).properties.push(property.id);
    }
  }
  for (const resource of resources.values()) {
    lines.push(
      `- Supporting library evidence for ${resource.properties.join(", ")}: ${resource.path}, section ${quoted(resource.section)}.`,
    );
    if (sourceURL(resource.path)) lines.push(`  ${sourceURL(resource.path)}`);
  }
  lines.push(
    "",
    "CONTINUE THROUGH DRAWN TO",
    "Inspect the existing project and reuse its established facts, approved design decisions and infrastructure. Ask about missing product purpose, content, placement, assets or platform only when they would change the result.",
    "Treat the selected properties and their source roles as established. Resolve open relationships and consequential unanswered choices before dependent implementation. A selected shape or particle construction does not select the source page layout, colors, subject, interaction or motion unless listed above.",
    "Read the relevant linked media, original-scene construction and skill quality guidance. Distinguish observed reference qualities, original showcase work and proposed adaptation. Use the skill to record the resulting direction and its acceptance checks.",
    "Keep the final design coherent with the selected references and target purpose. Verify the actual rendered composition, detail and meaningful behavior at appropriate desktop and mobile sizes; report material differences honestly.",
  );
  const entries = Object.entries(state.context).filter(([, value]) =>
    value.trim(),
  );
  if (entries.length) {
    lines.push("", "USER-PROVIDED PROJECT CONTEXT");
    for (const [key, value] of entries) lines.push(`${key}: ${quoted(value)}`);
  }
  return {
    text: sources.size ? lines.join("\n") + "\n" : "",
    sources: [...sources.values()],
    open,
    issues,
  };
}
