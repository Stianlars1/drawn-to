/** Stamp only source bytes present in an immutable Git tree and anonymously reachable on GitHub. */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  renameSync,
  realpathSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  assertSourcePath,
  computeKnowledgeDigest,
  digest,
  FRAME_MANIFEST_PATH,
  getKnowledgeResourcePaths,
  isKnowledgeSkillResource,
  validateFrames,
} from "./lib/generator-catalog.mjs";

const RELEASE_PATH = "skills/drawn-to/references/generator-release.json";
const PUBLIC_PATHS = [
  "skills/drawn-to/SKILL.md",
  "skills/drawn-to/references/generator-handoff.md",
];
const git = (root, ...args) =>
  execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });

export function verifySourceTree(root, revision) {
  if (typeof revision !== "string" || !/^[a-f0-9]{40}$/.test(revision))
    throw new Error(
      "Source revision must be a full 40-character lowercase hexadecimal commit SHA",
    );
  if (
    realpathSync(git(root, "rev-parse", "--show-toplevel").trim()) !==
    realpathSync(root)
  )
    throw new Error("Source root must be the Git repository root");
  try {
    if (git(root, "cat-file", "-t", revision).trim() !== "commit")
      throw new Error();
  } catch {
    throw new Error(`${revision}: source revision is not an available commit`);
  }
  const folder = "skills/drawn-to/references/scene-contracts";
  assertSourcePath(root, folder, { directory: true });
  const contracts = readdirSync(resolve(root, folder))
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) =>
      JSON.parse(
        readFileSync(assertSourcePath(root, folder + "/" + file), "utf8"),
      ),
    );
  const manifest = JSON.parse(
    readFileSync(assertSourcePath(root, FRAME_MANIFEST_PATH), "utf8"),
  );
  const paths = [
    ...new Set([
      ...getKnowledgeResourcePaths(root, contracts, manifest),
      FRAME_MANIFEST_PATH,
    ]),
  ].sort();
  const frameErrors = validateFrames(contracts, manifest, {
    readBytes: (path) => readFileSync(assertSourcePath(root, path)),
  });
  if (frameErrors.length) throw new Error(frameErrors.join("\n"));
  const tree = new Map(
    git(root, "ls-tree", "-r", "-z", "--full-tree", revision)
      .split("\0")
      .filter(Boolean)
      .map((record) => {
        const tab = record.indexOf("\t");
        const [mode, type, hash] = record.slice(0, tab).split(" ");
        return [record.slice(tab + 1), { mode, type, hash }];
      }),
  );
  const localPaths = new Set(paths);
  for (const path of tree.keys())
    if (isKnowledgeSkillResource(path) && !localPaths.has(path))
      throw new Error(`source file missing locally: ${path}`);
  for (const path of paths) {
    const entry = tree.get(path);
    if (!entry)
      throw new Error(`source file missing from source revision: ${path}`);
    if (entry.type !== "blob" || !["100644", "100755"].includes(entry.mode))
      throw new Error(
        `source revision contains a symlink or unsupported file type: ${path}`,
      );
    const bytes = readFileSync(assertSourcePath(root, path));
    const hash = createHash("sha1")
      .update(`blob ${bytes.length}\0`)
      .update(bytes)
      .digest("hex");
    if (hash !== entry.hash)
      throw new Error(
        `modified source file differs from source revision: ${path}`,
      );
  }
  return {
    paths,
    knowledgeDigest: computeKnowledgeDigest(root, contracts, manifest),
  };
}

export async function stampGeneratorSource(
  root,
  revision,
  { fetch: fetchSource = globalThis.fetch } = {},
) {
  const verified = verifySourceTree(root, revision);
  for (const path of PUBLIC_PATHS) {
    const url = `https://raw.githubusercontent.com/Stianlars1/drawn-to/${revision}/${path}`;
    let response;
    try {
      response = await fetchSource(url, {
        credentials: "omit",
        redirect: "error",
        signal: AbortSignal.timeout(20_000),
      });
    } catch (error) {
      throw new Error(`public source verification failed: ${path}`, {
        cause: error,
      });
    }
    if (!response.ok)
      throw new Error(
        `public source verification failed (${response.status}): ${path}`,
      );
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (digest(bytes) !== digest(readFileSync(assertSourcePath(root, path))))
      throw new Error(
        `public source bytes differ from the verified revision: ${path}`,
      );
  }
  // Recheck after network I/O: source changes while checking must never receive a stale stamp.
  const current = verifySourceTree(root, revision);
  if (current.knowledgeDigest !== verified.knowledgeDigest)
    throw new Error("Authoritative source changed during public verification");
  const releasePath = assertSourcePath(root, RELEASE_PATH);
  const stamp = {
    schema: 1,
    revision,
    published: true,
    knowledgeDigest: current.knowledgeDigest,
  };
  const temporary = releasePath + `.tmp-${process.pid}`;
  writeFileSync(temporary, JSON.stringify(stamp, null, 2) + "\n", {
    flag: "wx",
  });
  renameSync(temporary, releasePath);
  return stamp;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    if (process.argv.length !== 3)
      throw new Error(
        "Usage: node scripts/stamp-generator-source.mjs <full-published-commit-SHA>",
      );
    const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
    console.log(
      JSON.stringify(await stampGeneratorSource(root, process.argv[2])),
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
