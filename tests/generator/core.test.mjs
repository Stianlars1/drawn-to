import test from "node:test";
import assert from "node:assert/strict";
import { catalog, roles } from "./fixture.mjs";
const load = async (path) => {
  try {
    return await import(path);
  } catch (e) {
    if (e.code === "ERR_MODULE_NOT_FOUND") return {};
    throw e;
  }
};
const state = await load("../../site/js/generator/core/state.js");
const prompt = await load("../../site/js/generator/core/prompt.js");
const codec = await load("../../site/js/generator/core/codec.js");
function start(options = {}) {
  assert.equal(
    typeof state.createDirection,
    "function",
    "direction state is not implemented",
  );
  return state.createDirection(catalog, options);
}
function row(s, role, targetId = "main") {
  return state.resolveTarget(catalog, s, targetId).find((r) => r.role === role);
}
function command(s, c) {
  return state.reduceDirection(catalog, s, c);
}

test("particle-orb fixture selects exactly shape, color and particle construction", () => {
  const s = start({ scope: "graphic", example: "particle-orb" });
  const rows = state.resolveTarget(catalog, s, "main");
  assert.deepEqual(
    rows
      .filter((r) => r.mode === "selected")
      .flatMap((r) => r.propertyIds)
      .sort(),
    [
      "particle-assembly::graphics",
      "plasma-study::color",
      "plasma-study::shape",
    ],
  );
  for (const role of ["layout", "typography", "motion"])
    assert.equal(row(s, role).mode, "open");
});
test("explicit open masks inherited motion; reset restores the scene choice", () => {
  const original = start({ sceneId: "plasma-study" });
  const opened = command(original, {
    type: "open",
    targetId: "main",
    role: "motion",
  });
  assert.equal(row(opened, "motion").mode, "open");
  assert.equal(row(original, "motion").mode, "selected");
  const restored = command(opened, {
    type: "reset",
    targetId: "main",
    role: "motion",
  });
  assert.equal(row(restored, "motion").origin, "scene");
});
test("changing the base preserves explicit source choices and open decisions", () => {
  let s = start({ sceneId: "plasma-study" });
  s = command(s, {
    type: "choose",
    targetId: "main",
    role: "graphics",
    propertyId: "particle-assembly::graphics",
  });
  s = command(s, { type: "open", targetId: "main", role: "motion" });
  s = command(s, { type: "base", targetId: "main", sceneId: "auric-orbit" });
  assert.deepEqual(row(s, "graphics").propertyIds, [
    "particle-assembly::graphics",
  ]);
  assert.deepEqual(row(s, "shape").propertyIds, ["auric-orbit::shape"]);
  assert.equal(row(s, "motion").mode, "open");
});
test("page defaults inherit into sections and local open masks them", () => {
  let s = start({ scope: "page" });
  s = command(s, {
    type: "choose",
    targetId: "page",
    role: "typography",
    propertyId: "plasma-study::typography",
  });
  const section = s.targets.find((t) => t.id !== "page");
  assert.equal(row(s, "typography", section.id).origin, "page");
  s = command(s, { type: "open", targetId: section.id, role: "typography" });
  assert.equal(row(s, "typography", section.id).mode, "open");
  assert.equal(row(s, "typography", "page").mode, "selected");
});
test("page section reorder and duplication preserve their choices", () => {
  let s = start({ scope: "page", sceneId: "plasma-study" });
  const first = s.targets[1];
  s = command(s, { type: "duplicate-target", targetId: first.id });
  assert.equal(s.targets.length, 3);
  const copy = s.targets[2];
  assert.notEqual(copy.id, first.id);
  assert.deepEqual(
    state.resolveTarget(catalog, s, copy.id).map((r) => r.propertyIds),
    state.resolveTarget(catalog, s, first.id).map((r) => r.propertyIds),
  );
  s = command(s, { type: "move-target", targetId: copy.id, delta: -1 });
  assert.equal(s.targets[1].id, copy.id);
  assert.throws(
    () => command(s, { type: "scope", scope: "graphic" }),
    /section/i,
  );
});
test("a source cannot be inserted into a different property role", () => {
  const s = start();
  assert.throws(
    () =>
      command(s, {
        type: "choose",
        targetId: "main",
        role: "motion",
        propertyId: "plasma-study::color",
      }),
    /property|role/i,
  );
});
test("unresolved multiple influences retain both source identities", () => {
  let s = start();
  s = command(s, {
    type: "choose",
    targetId: "main",
    role: "color",
    propertyId: "plasma-study::color",
  });
  s = command(s, {
    type: "choose",
    targetId: "main",
    role: "color",
    propertyId: "particle-assembly::color",
    append: true,
  });
  assert.equal(row(s, "color").propertyIds.length, 2);
  const output = prompt.compilePrompt(catalog, s);
  assert.ok(output.issues.some((i) => i.code === "multiple-influences"));
  assert.match(output.text, /ask|resolve/i);
  assert.ok(output.text.includes("plasma-study::color"));
  assert.ok(output.text.includes("particle-assembly::color"));
});
test("compiler invokes the skill and exact contracts without exporting appearance prose", () => {
  const s = start({ example: "particle-orb" });
  assert.equal(
    typeof prompt.compilePrompt,
    "function",
    "compiler is not implemented",
  );
  const out = prompt.compilePrompt(catalog, s);
  assert.match(out.text, /Use the Drawn To skill\/plugin/);
  assert.match(out.text, /generator-handoff.md/);
  assert.match(out.text, /references\/scene-contracts\/plasma-study.json/);
  assert.match(out.text, /krispuckett-2095994089917522241/);
  assert.match(out.text, /Graphic language/);
  assert.ok(!out.text.includes("APPEARANCE_SENTINEL"));
  assert.ok(!out.text.includes("particle-assembly::motion"));
  assert.match(out.text, /existing project/i);
  assert.match(out.text, /motion/i);
  assert.equal(out.text, prompt.compilePrompt(catalog, s).text);
});
test("manual and preset paths with identical resolved choices compile identically", () => {
  const manual = start({ example: "particle-orb" });
  let preset = start({ sceneId: "plasma-study" });
  for (const role of roles)
    preset = command(preset, { type: "open", targetId: "main", role });
  for (const [role, id] of [
    ["shape", "plasma-study::shape"],
    ["color", "plasma-study::color"],
    ["graphics", "particle-assembly::graphics"],
  ])
    preset = command(preset, {
      type: "choose",
      targetId: "main",
      role,
      propertyId: id,
    });
  assert.equal(
    prompt.compilePrompt(catalog, manual).text,
    prompt.compilePrompt(catalog, preset).text,
  );
});
test("unpublished source revisions never pretend public fallback links exist", () => {
  const s = start({ example: "particle-orb" });
  const out = prompt.compilePrompt({ ...catalog, sourcePublished: false }, s);
  assert.match(out.text, /unpublished|not yet published/i);
  assert.ok(!out.text.includes("/blob/" + catalog.sourceRevision));
});
test("share codec strips all authored text but preserves exact structural choices", () => {
  let s = start({ scope: "page", sceneId: "plasma-study" });
  s = command(s, { type: "rename", value: "Secret customer" });
  s = command(s, {
    type: "rename",
    targetId: s.targets[1].id,
    value: "Private campaign",
  });
  s = command(s, {
    type: "context",
    key: "intent",
    value: "Confidential launch",
  });
  assert.equal(
    typeof codec.encodeDirection,
    "function",
    "codec is not implemented",
  );
  const encoded = codec.encodeDirection(catalog, s);
  const decoded = codec.decodeDirection(catalog, encoded);
  assert.ok(!JSON.stringify(decoded).includes("Secret"));
  assert.ok(!JSON.stringify(decoded).includes("Private"));
  assert.ok(!JSON.stringify(decoded).includes("Confidential"));
  assert.deepEqual(
    decoded.targets.map((t) => t.choices),
    s.targets.map((t) => t.choices),
  );
  assert.equal(decoded.targets[1].baseScene, s.targets[1].baseScene);
  const privateRoundTrip = codec.decodeDirection(
    catalog,
    codec.encodeDirection(catalog, s, { includeContext: true }),
  );
  assert.equal(privateRoundTrip.context.intent, "Confidential launch");
  assert.equal(privateRoundTrip.targets[1].name, "Private campaign");
});
test("unicode context survives an explicitly opted-in share round trip", () => {
  const s = command(start(), {
    type: "context",
    key: "intent",
    value: "Blåbær 🪐 日本語",
  });
  assert.equal(
    codec.decodeDirection(
      catalog,
      codec.encodeDirection(catalog, s, { includeContext: true }),
    ).context.intent,
    "Blåbær 🪐 日本語",
  );
});
test("malformed, oversized, mismatched and unknown-property imports fail explicitly", () => {
  const s = start({ example: "particle-orb" });
  const encoded = codec.encodeDirection(catalog, s);
  assert.throws(
    () => codec.decodeDirection(catalog, "not a direction"),
    /invalid|read|format/i,
  );
  assert.throws(
    () => codec.decodeDirection({ ...catalog, id: "other" }, encoded),
    /catalog|library|version/i,
  );
  assert.throws(
    () => codec.decodeDirection(catalog, "a".repeat(codec.MAX_IMPORT_BYTES + 1)),
    /large|size|limit/i,
  );
  const bad = structuredClone(s);
  bad.targets[0].choices.shape.propertyIds = ["__proto__"];
  assert.ok(state.validateDirection(catalog, bad).length > 0);
  assert.throws(() => codec.encodeDirection(catalog, bad), /property|invalid/i);
});

test("a pricing section keeps its purpose in a context-free share and skill handoff", () => {
  let s = start({ scope: "page" });
  const id = s.targets[1].id;
  s = command(s, { type: "target-kind", targetId: id, kind: "pricing" });
  s = command(s, {
    type: "choose",
    targetId: id,
    role: "layout",
    propertyId: "plasma-study::layout",
  });
  const restored = codec.decodeDirection(
    catalog,
    codec.encodeDirection(catalog, s),
  );
  assert.equal(restored.targets[1].kind, "pricing");
  assert.match(restored.targets[1].name, /Pricing/);
  assert.match(
    prompt.compilePrompt(catalog, restored).text,
    /references\/recipes.md.*Pricing/,
  );
});

test('the largest supported multilingual page can use the downloadable-file recovery path',async()=>{
 const {readFile}=await import('node:fs/promises');
 const manifest=JSON.parse(await readFile('site/data/generator/index.json','utf8'));
 const actual=JSON.parse(await readFile('site/'+manifest.catalogs[manifest.current].url,'utf8'));
 const s=state.createDirection(actual,{scope:'page'});
 s.context={product:'界'.repeat(50000),platform:'界'.repeat(50000),intent:'界'.repeat(50000)};
 const choices=Object.fromEntries(roles.map(role=>[role,{mode:'selected',propertyIds:Object.values(actual.properties).filter(p=>p.role===role).sort((a,b)=>b.id.length-a.id.length).slice(0,8).map(p=>p.id)}]));
 s.targets=[s.targets[0],...Array.from({length:99},(_,i)=>({id:'section-'+i,kind:'section',name:'界'.repeat(500),baseScene:null,choices}))];
 const file=codec.exportDirection(actual,s,{includeContext:true});
 assert.ok(new TextEncoder().encode(file).byteLength<=codec.MAX_IMPORT_BYTES,'A supported draft export must fit the file importer byte budget');
 assert.deepEqual(codec.decodeDirection(actual,file,{json:true}).targets,s.targets);
});
