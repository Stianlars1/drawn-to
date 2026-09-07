import { resolveTarget } from "./state.js";

const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const selectedIds = (row) => (row.mode === "selected" ? row.propertyIds : []);
const scene = (catalog, id) => catalog.scenes.find((item) => item.id === id);
const frame = (item) => item && [item.thumbnail, item.thumbnailSha256];

/** Compare the decisions people actually use, including scene and page inheritance. */
export function migrateDirection(previousCatalog, current, previous) {
  const state = structuredClone(previous);
  state.catalogId = current.id;
  const changes = [];
  if (
    previousCatalog.sourceRevision !== current.sourceRevision ||
    previousCatalog.sourcePublished !== current.sourcePublished
  )
    changes.push(
      "The library source version or publication status has changed; the updated copy will use the current source version.",
    );

  for (const target of state.targets) {
    if (target.baseScene && !scene(current, target.baseScene)) {
      changes.push(
        `The starting scene for ${target.name} is unavailable and will be cleared.`,
      );
      target.baseScene = null;
    }
  }
  // Resolve before opening invalid page defaults, so every affected section is disclosed.
  const candidates = new Map(
    state.targets.map((target) => [
      target.id,
      resolveTarget(current, state, target.id),
    ]),
  );
  for (const target of state.targets) {
    const oldTarget = previous.targets.find((item) => item.id === target.id);
    const oldRows = resolveTarget(previousCatalog, previous, target.id);
    const currentRows = candidates.get(target.id);
    const changedFrames = new Set();
    for (let index = 0; index < oldRows.length; index++) {
      const old = oldRows[index],
        fresh = currentRows[index],
        role = old.role;
      const oldIds = selectedIds(old),
        freshIds = selectedIds(fresh);
      const lostScene =
        old.origin === "scene" && oldTarget.baseScene && !target.baseScene;
      const incompatible = [...oldIds, ...freshIds].some(
        (id) =>
          !Object.hasOwn(current.properties, id) ||
          current.properties[id].role !== role,
      );
      if (lostScene || incompatible) {
        target.choices[role] = { mode: "open", propertyIds: [] };
        changes.push(
          `${target.name}: ${role} has unavailable or role-incompatible references and will be left open.`,
        );
        continue;
      }
      if (old.mode !== fresh.mode || !equal(oldIds, freshIds))
        changes.push(
          `${target.name}: the resolved ${role} selection has changed.`,
        );
      for (const id of oldIds.filter((id) => freshIds.includes(id))) {
        if (!equal(previousCatalog.properties[id], current.properties[id]))
          changes.push(
            `${target.name}: the ${role} contract or supporting source evidence has changed (${id}).`,
          );
      }
      for (const id of new Set([...oldIds, ...freshIds])) {
        const sceneId = (
          current.properties[id] || previousCatalog.properties[id]
        ).sceneId;
        const oldScene = scene(previousCatalog, sceneId),
          freshScene = scene(current, sceneId);
        if (
          oldScene &&
          freshScene &&
          !equal(frame(oldScene), frame(freshScene))
        )
          changedFrames.add(sceneId);
      }
    }
    for (const sceneId of changedFrames)
      changes.push(
        `${target.name}: source-frame evidence for ${scene(current, sceneId)?.name || sceneId} has changed.`,
      );
  }
  return { state, changes };
}
