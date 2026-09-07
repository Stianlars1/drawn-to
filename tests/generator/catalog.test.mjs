import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import {
  digest,
  validateContracts,
  validateFrames,
  makeCatalog,
  computeKnowledgeDigest,
  writeFrameSnapshot,
  mergeFrameManifest,
} from "../../scripts/lib/generator-catalog.mjs";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "drawn-catalog-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (path, value) => {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), value);
  };
  const scene = {
    schema: 1,
    id: "x",
    slug: "test-scene",
    name: "Test scene",
    kind: "graphic",
    references: ["reference"],
    implementation: ["site/js/source.js"],
    properties: [
      {
        id: "shape",
        label: "Round silhouette",
        text: "A round form.",
        role: "shape",
        selectable: true,
        sources: [{ id: "reference", section: "Shape & form" }],
      },
    ],
    sections: {
      composition: ["shape"],
      surface: ["shape"],
      behavior: ["shape"],
      checks: ["shape"],
    },
  };
  const bytes = Buffer.from("original screenshot bytes");
  const frame = writeFrameSnapshot(
    join(root, "site/assets/generator/scenes"),
    bytes,
    { id: "x", slug: scene.slug, viewport: [1440, 900], mode: "still" },
  );
  const manifest = { schema: 1, frames: [frame] };
  write("skills/drawn-to/SKILL.md", "Read references/recipes.md");
  write("skills/drawn-to/references/recipes.md", "Original guidance");
  write("skills/drawn-to/references/media/evidence.jpg", "Original media");
  write(
    "skills/drawn-to/references/scene-contracts/test-scene.json",
    JSON.stringify(scene),
  );
  write("site/js/source.js", "original scene implementation");
  const references = new Map([["reference", { headings: ["Shape & form"] }]]);
  return { root, write, scene, bytes, frame, manifest, references };
}

test("contracts reject duplicate/missing properties and require exact source headings", (t) => {
  const { scene, references } = fixture(t);
  assert.deepEqual(validateContracts([scene], { references }), []);
  const duplicate = structuredClone(scene);
  duplicate.properties.push(duplicate.properties[0]);
  assert.match(
    validateContracts([duplicate], { references }).join("\n"),
    /duplicate property shape/,
  );
  const missing = structuredClone(scene);
  missing.properties = [];
  assert.match(
    validateContracts([missing], { references }).join("\n"),
    /unknown property shape/,
  );
  const heading = structuredClone(scene);
  heading.properties[0].sources[0].section = "Shape and form";
  assert.match(
    validateContracts([heading], { references }).join("\n"),
    /unknown section Shape and form/,
  );
});

test("frame manifest rejects missing, duplicate, wrong-path and tampered original frames", (t) => {
  const { root, scene, manifest, write, frame } = fixture(t);
  const check = (value) =>
    validateFrames([scene], value, {
      readBytes: (path) => readFileSync(join(root, path)),
    });
  assert.deepEqual(check(manifest), []);
  assert.match(
    check({ schema: 1, frames: [] }).join("\n"),
    /missing original source frame/,
  );
  assert.match(
    check({ schema: 1, frames: [frame, frame] }).join("\n"),
    /duplicate/,
  );
  assert.match(
    check({
      schema: 1,
      frames: [{ ...frame, path: "assets/generator/scenes/test-scene.jpg" }],
    }).join("\n"),
    /content-addressed/,
  );
  write("site/" + frame.path, "tampered bytes");
  assert.match(check(manifest).join("\n"), /hash mismatch/);
  rmSync(join(root, "site/" + frame.path));
  assert.match(
    check(manifest).join("\n"),
    /missing original source frame file/,
  );
});

test("catalog IDs remain deterministic and pin the original frame when a later capture replaces it", (t) => {
  const { root, scene, frame, manifest, bytes } = fixture(t);
  const options = { knowledgeDigest: "knowledge", frames: manifest };
  const original = makeCatalog([scene], options);
  assert.deepEqual(original, makeCatalog([scene], options));
  const { id, ...content } = original;
  assert.equal(id, digest(content).slice(0, 20));
  const next = writeFrameSnapshot(
    join(root, "site/assets/generator/scenes"),
    Buffer.from("later screenshot"),
    { ...frame, slug: scene.slug },
  );
  const updated = mergeFrameManifest(manifest, [next]);
  assert.notEqual(
    makeCatalog([scene], { ...options, frames: updated }).id,
    original.id,
  );
  assert.equal(original.scenes[0].thumbnail, frame.path);
  assert.deepEqual(
    readFileSync(join(root, "site/" + original.scenes[0].thumbnail)),
    bytes,
  );
  writeFrameSnapshot(join(root, "site/assets/generator/scenes"), bytes, frame);
  assert.deepEqual(readFileSync(join(root, "site/" + frame.path)), bytes);
});

test("partial capture merges preserve unselected frames", (t) => {
  const { frame, manifest } = fixture(t);
  const other = { ...frame, id: "y", slug: "another-scene" };
  const updated = mergeFrameManifest({ ...manifest, frames: [frame, other] }, [
    { ...frame, mode: "new still" },
  ]);
  assert.equal(updated.frames.length, 2);
  assert.deepEqual(
    updated.frames.find((f) => f.id === "y"),
    other,
  );
  assert.equal(updated.frames.find((f) => f.id === "x").mode, "new still");
});

test("knowledge digest covers guides, media, referenced implementations and current frame bytes", (t) => {
  const { root, write, scene, manifest, frame } = fixture(t);
  const value = () => computeKnowledgeDigest(root, [scene], manifest);
  const baseline = value();
  for (const [path, original] of [
    ["skills/drawn-to/references/recipes.md", "Original guidance"],
    ["skills/drawn-to/references/media/evidence.jpg", "Original media"],
    ["site/js/source.js", "original scene implementation"],
    ["site/" + frame.path, "original screenshot bytes"],
  ]) {
    write(path, "Changed authoritative source");
    assert.notEqual(value(), baseline, path);
    write(path, original);
    assert.equal(value(), baseline, path);
  }
});

test("knowledge digest ignores release/aggregate/unrelated UI/history and JSON formatting", (t) => {
  const { root, write, scene, manifest } = fixture(t);
  const value = () => computeKnowledgeDigest(root, [scene], manifest);
  const baseline = value();
  write(
    "skills/drawn-to/references/generator-release.json",
    '{"published": true}',
  );
  write("skills/drawn-to/references/showcase-styles.json", '{"styles": []}');
  write("site/js/generator/views/unrelated.js", "unrelated generator UI");
  write(
    "site/assets/generator/scenes/old-history-000000000000.jpg",
    "historic snapshot",
  );
  write(
    "skills/drawn-to/references/scene-contracts/test-scene.json",
    JSON.stringify(
      Object.fromEntries(Object.entries(scene).reverse()),
      null,
      4,
    ),
  );
  assert.equal(value(), baseline);
});

test("a corrupt historic snapshot is never overwritten by a repeated capture", (t) => {
  const { root, frame, bytes, write } = fixture(t);
  write("site/" + frame.path, "unexpected historic bytes");
  assert.throws(
    () =>
      writeFrameSnapshot(
        join(root, "site/assets/generator/scenes"),
        bytes,
        frame,
      ),
    /collision or tampering/,
  );
  assert.equal(
    readFileSync(join(root, "site/" + frame.path), "utf8"),
    "unexpected historic bytes",
  );
});

test("browser catalog loading verifies its fingerprint and immutable thumbnail binding", async (t) => {
  const { loadCatalog } = await import(
    "../../site/js/generator/core/catalog.js"
  );
  const { scene, manifest: frames } = fixture(t);
  const valid = makeCatalog([scene], { knowledgeDigest: "knowledge", frames });
  let response = valid;
  t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    json: async () => response,
  }));
  const load = (catalog) =>
    loadCatalog(
      {
        current: catalog.id,
        catalogs: {
          [catalog.id]: { url: `data/generator/catalogs/${catalog.id}.json` },
        },
      },
      catalog.id,
      "https://example.test/generator",
    );
  assert.deepEqual(await load(valid), valid);
  response = structuredClone(valid);
  response.scenes[0].thumbnailSha256 = "f".repeat(64);
  await assert.rejects(load(valid), /content fingerprint/);
  const { id: ignored, ...invalidContent } = response;
  response = { ...invalidContent, id: digest(invalidContent).slice(0, 20) };
  await assert.rejects(load(response), /invalid source metadata/);
});
