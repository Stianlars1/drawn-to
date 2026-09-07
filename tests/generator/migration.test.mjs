import test from "node:test";
import assert from "node:assert/strict";
import { catalog } from "./fixture.mjs";
import {
  createDirection,
  resolveTarget,
  validateDirection,
} from "../../site/js/generator/core/state.js";
import { migrateDirection } from "../../site/js/generator/core/migration.js";

const fresh = () => ({ ...structuredClone(catalog), id: "fixture-v2" });
const selected = (id) => ({ mode: "selected", propertyIds: [id] });

test("migration reports changed explicit and inherited same-ID contracts and evidence", () => {
  const state = createDirection(catalog, { sceneId: "plasma-study" });
  state.targets[0].choices.graphics = selected("particle-assembly::graphics");
  const next = fresh();
  next.properties["plasma-study::shape"].text = "Changed silhouette";
  next.properties["particle-assembly::graphics"].sources[0].section =
    "Different evidence";
  next.scenes.find((s) => s.id === "plasma-study").thumbnailSha256 =
    "changed-frame";
  const before = structuredClone(state);
  const result = migrateDirection(catalog, next, state);
  assert.match(result.changes.join("\n"), /Main graphic:.*shape.*contract/i);
  assert.match(result.changes.join("\n"), /Main graphic:.*graphics.*contract/i);
  assert.match(result.changes.join("\n"), /source.frame.*plasma.study/i);
  assert.deepEqual(state, before);
  assert.equal(
    result.state.id,
    state.id,
    "copy identity is assigned by the caller",
  );
  assert.deepEqual(validateDirection(next, result.state), []);
});

test("explicit open and excluded roles mask changed inherited defaults and contracts", () => {
  const state = createDirection(catalog, { sceneId: "plasma-study" });
  state.targets[0].choices.shape = { mode: "open", propertyIds: [] };
  state.targets[0].choices.color = { mode: "excluded", propertyIds: [] };
  const next = fresh();
  next.properties["plasma-study::shape"].text = "Masked change";
  next.scenes[0].defaults.color = "particle-assembly::color";
  const { state: copy, changes } = migrateDirection(catalog, next, state);
  assert.equal(changes.length, 0);
  assert.deepEqual(copy.targets[0].choices, state.targets[0].choices);
});

test("missing or role-incompatible explicit and inherited references become explicitly open", () => {
  for (const explicit of [false, true]) {
    for (const missing of [false, true]) {
      const state = createDirection(catalog, { sceneId: "plasma-study" });
      if (explicit)
        state.targets[0].choices.shape = selected("plasma-study::shape");
      const next = fresh();
      if (missing) delete next.properties["plasma-study::shape"];
      else next.properties["plasma-study::shape"].role = "color";
      const result = migrateDirection(catalog, next, state);
      assert.deepEqual(result.state.targets[0].choices.shape, {
        mode: "open",
        propertyIds: [],
      });
      assert.match(
        result.changes.join("\n"),
        /shape.*unavailable|shape.*incompatible/i,
      );
      assert.deepEqual(validateDirection(next, result.state), []);
    }
  }
});

test("page defaults are compared through inheritance and masks are preserved", () => {
  const state = createDirection(catalog, { scope: "page" });
  state.targets[0].choices.shape = selected("plasma-study::shape");
  const next = fresh();
  next.properties["plasma-study::shape"].text = "Changed inherited shape";
  const result = migrateDirection(catalog, next, state);
  assert.match(result.changes.join("\n"), /Page defaults:.*shape.*contract/i);
  assert.match(result.changes.join("\n"), /Section 1:.*shape.*contract/i);
  state.targets[1].choices.shape = { mode: "excluded", propertyIds: [] };
  assert.doesNotMatch(
    migrateDirection(catalog, next, state).changes.join("\n"),
    /Section 1:.*shape/i,
  );
});

test("removed scene does not silently fall back to unrelated page references", () => {
  const state = createDirection(catalog, {
    scope: "page",
    sceneId: "plasma-study",
  });
  state.targets[0].choices.color = selected("particle-assembly::color");
  const next = fresh();
  next.scenes = next.scenes.filter((s) => s.id !== "plasma-study");
  const result = migrateDirection(catalog, next, state);
  assert.equal(result.state.targets[1].baseScene, null);
  assert.equal(
    resolveTarget(next, result.state, state.targets[1].id).find(
      (r) => r.role === "color",
    ).mode,
    "open",
  );
  assert.match(result.changes.join("\n"), /color.*left open/i);
});

test("changed resolved default IDs and global source version are disclosed", () => {
  const state = createDirection(catalog, { sceneId: "plasma-study" });
  const next = fresh();
  next.scenes[0].defaults.color = "particle-assembly::color";
  next.sourceRevision = "new-source-revision";
  const result = migrateDirection(catalog, next, state);
  assert.match(result.changes.join("\n"), /color.*selection.*changed/i);
  assert.match(result.changes.join("\n"), /source version/i);
});

test("changed frame evidence is disclosed even when an inherited property ID also changes", () => {
  const state = createDirection(catalog, { sceneId: "plasma-study" });
  const next = fresh();
  const oldId = next.scenes[0].defaults.shape;
  const newId = "plasma-study::new-shape";
  next.properties[newId] = {
    ...next.properties[oldId],
    id: newId,
    key: "new-shape",
  };
  next.scenes[0].defaults.shape = newId;
  next.scenes[0].thumbnailSha256 = "new-frame";
  const result = migrateDirection(catalog, next, state);
  assert.match(result.changes.join("\n"), /shape selection has changed/);
  assert.match(result.changes.join("\n"), /source-frame evidence/);
  assert.deepEqual(result, migrateDirection(catalog, next, state));
});

test("fully masked scenes do not disclose unused frame or property changes", () => {
  const state = createDirection(catalog, { sceneId: "plasma-study" });
  for (const role of catalog.roles)
    state.targets[0].choices[role.id] = { mode: "open", propertyIds: [] };
  const next = fresh();
  next.scenes[0].thumbnailSha256 = "unused-frame";
  next.properties["plasma-study::shape"].text = "Unused contract";
  assert.deepEqual(migrateDirection(catalog, next, state).changes, []);
});
