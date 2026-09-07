import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import {
  verifySourceTree,
  stampGeneratorSource,
} from "../../scripts/stamp-generator-source.mjs";
import { writeFrameSnapshot } from "../../scripts/lib/generator-catalog.mjs";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "drawn-source-stamp-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (path, bytes) => {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), bytes);
  };
  const git = (...args) =>
    execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  git("init", "--quiet");
  write("skills/drawn-to/SKILL.md", "Portable skill");
  write("skills/drawn-to/references/generator-handoff.md", "Receiving guide");
  write("skills/drawn-to/references/recipes.md", "Material recipe");
  write("site/js/scene.js", "Original implementation");
  write(
    "skills/drawn-to/references/scene-contracts/test-scene.json",
    JSON.stringify({
      id: "x",
      slug: "test-scene",
      implementation: ["site/js/scene.js"],
    }),
  );
  const frame = writeFrameSnapshot(
    join(root, "site/assets/generator/scenes"),
    Buffer.from("Original source frame"),
    { id: "x", slug: "test-scene" },
  );
  write(
    "site/assets/generator/scenes/frames.json",
    JSON.stringify({ schema: 1, frames: [frame] }),
  );
  write(
    "skills/drawn-to/references/generator-release.json",
    '{"published":false}\n',
  );
  git("add", ".");
  git(
    "-c",
    "user.name=Test",
    "-c",
    "user.email=test@example.test",
    "commit",
    "--quiet",
    "-m",
    "Source fixture",
  );
  const revision = git("rev-parse", "HEAD");
  const publicFetch = async (url, options) => {
    assert.equal(options.credentials, "omit");
    assert.equal(options.redirect, "error");
    const prefix = `https://raw.githubusercontent.com/Stianlars1/drawn-to/${revision}/`;
    assert.ok(url.startsWith(prefix));
    const bytes = readFileSync(join(root, url.slice(prefix.length)));
    return { ok: true, arrayBuffer: async () => bytes };
  };
  return { root, write, git, revision, publicFetch };
}

test("a matching immutable tree and anonymous sources produce the published stamp", async (t) => {
  const { root, revision, publicFetch } = fixture(t);
  const verified = verifySourceTree(root, revision);
  assert.ok(verified.paths.includes("skills/drawn-to/references/recipes.md"));
  const stamp = await stampGeneratorSource(root, revision, {
    fetch: publicFetch,
  });
  assert.equal(stamp.revision, revision);
  assert.equal(stamp.published, true);
  assert.match(stamp.knowledgeDigest, /^[a-f0-9]{64}$/);
  assert.deepEqual(
    JSON.parse(
      readFileSync(
        join(root, "skills/drawn-to/references/generator-release.json"),
      ),
    ),
    stamp,
  );
});

test("untracked authoritative files cannot be stamped against a tree that lacks them", (t) => {
  const { root, revision, write } = fixture(t);
  write(
    "skills/drawn-to/references/untracked-guide.md",
    "Unpublished guidance",
  );
  assert.throws(
    () => verifySourceTree(root, revision),
    /missing from source revision.*untracked-guide/,
  );
});

test("modified guide and implementation bytes are rejected", (t) => {
  const { root, revision, write } = fixture(t);
  write("skills/drawn-to/references/recipes.md", "Modified recipe");
  assert.throws(
    () => verifySourceTree(root, revision),
    /modified source.*recipes/,
  );
  write("skills/drawn-to/references/recipes.md", "Material recipe");
  write("site/js/scene.js", "Modified implementation");
  assert.throws(
    () => verifySourceTree(root, revision),
    /modified source.*scene.js/,
  );
});

test("a deleted portable source and malformed or absent revisions fail", (t) => {
  const { root, revision } = fixture(t);
  assert.throws(() => verifySourceTree(root, "HEAD"), /full 40-character/);
  assert.throws(
    () => verifySourceTree(root, "-".repeat(40)),
    /full 40-character/,
  );
  assert.throws(
    () => verifySourceTree(root, "a".repeat(40)),
    /not an available commit/,
  );
  rmSync(join(root, "skills/drawn-to/references/recipes.md"));
  assert.throws(
    () => verifySourceTree(root, revision),
    /missing locally.*recipes/,
  );
});

test("traversal and symlink source paths are rejected", (t) => {
  const { root, revision, write } = fixture(t);
  const contract = "skills/drawn-to/references/scene-contracts/test-scene.json";
  write(
    contract,
    JSON.stringify({
      id: "x",
      slug: "test-scene",
      implementation: ["../outside.js"],
    }),
  );
  assert.throws(() => verifySourceTree(root, revision), /unsafe source path/);
  write(
    contract,
    JSON.stringify({
      id: "x",
      slug: "test-scene",
      implementation: ["site/js/scene.js"],
    }),
  );
  symlinkSync("recipes.md", join(root, "skills/drawn-to/references/linked.md"));
  assert.throws(() => verifySourceTree(root, revision), /symlink/);
});

test("public verification failures leave the previous stamp untouched", async (t) => {
  const { root, revision } = fixture(t);
  const release = join(
    root,
    "skills/drawn-to/references/generator-release.json",
  );
  const original = readFileSync(release, "utf8");
  await assert.rejects(
    stampGeneratorSource(root, revision, {
      fetch: async () => ({ ok: false, status: 404 }),
    }),
    /public source verification failed/,
  );
  assert.equal(readFileSync(release, "utf8"), original);
  await assert.rejects(
    stampGeneratorSource(root, revision, {
      fetch: async () => ({
        ok: true,
        arrayBuffer: async () => Buffer.from("Wrong public file"),
      }),
    }),
    /public source bytes differ/,
  );
  assert.equal(readFileSync(release, "utf8"), original);
});

test("release/generated output changes are excluded and repository subdirectories are rejected", (t) => {
  const { root, revision, write } = fixture(t);
  const baseline = verifySourceTree(root, revision).knowledgeDigest;
  write(
    "skills/drawn-to/references/generator-release.json",
    '{"published":true}',
  );
  write("skills/drawn-to/references/showcase-styles.json", '{"styles":[]}');
  assert.equal(verifySourceTree(root, revision).knowledgeDigest, baseline);
  assert.throws(
    () => verifySourceTree(join(root, "skills"), revision),
    /repository root/,
  );
});

test("source edits during public verification cannot receive a stale stamp", async (t) => {
  const { root, revision, write, publicFetch } = fixture(t);
  const release = join(
    root,
    "skills/drawn-to/references/generator-release.json",
  );
  const original = readFileSync(release, "utf8");
  await assert.rejects(
    stampGeneratorSource(root, revision, {
      fetch: async (...args) => {
        write("site/js/scene.js", "Edited while awaiting public evidence");
        return publicFetch(...args);
      },
    }),
    /modified source.*scene.js/,
  );
  assert.equal(readFileSync(release, "utf8"), original);
});
