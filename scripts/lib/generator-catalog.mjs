import { createHash } from "node:crypto";
import {
  readFileSync,
  readdirSync,
  mkdirSync,
  writeFileSync,
  lstatSync,
} from "node:fs";
import { resolve, join } from "node:path";
import { ROLE_IDS, roleLabel } from "../../site/js/generator/core/state.js";
export const digest = (value) =>
  createHash("sha256")
    .update(
      typeof value === "string" || value instanceof Uint8Array
        ? value
        : JSON.stringify(value),
    )
    .digest("hex");

const validFrameAddress = (frame) =>
  /^[a-z][a-z0-9-]*$/.test(frame.slug || "") &&
  /^[a-f0-9]{64}$/.test(frame.sha256 || "") &&
  frame.path ===
    `assets/generator/scenes/${frame.slug}-${frame.sha256.slice(0, 12)}.jpg`;

export function validateFrames(contracts, manifest, { readBytes } = {}) {
  if (manifest?.schema !== 1 || !Array.isArray(manifest.frames))
    return ["Original source frame manifest has an unsupported format"];
  const errors = [],
    bySlug = new Map(),
    ids = new Set();
  for (const frame of manifest.frames) {
    if (bySlug.has(frame.slug) || ids.has(frame.id))
      errors.push(`${frame.slug}: duplicate original source frame`);
    bySlug.set(frame.slug, frame);
    ids.add(frame.id);
    if (!validFrameAddress(frame)) {
      errors.push(
        `${frame.slug}: original frame must have a content-addressed path and full SHA-256`,
      );
      continue;
    }
    if (readBytes) {
      try {
        if (digest(readBytes("site/" + frame.path)) !== frame.sha256)
          errors.push(`${frame.slug}: original source frame hash mismatch`);
      } catch {
        errors.push(`${frame.slug}: missing original source frame file`);
      }
    }
  }
  for (const scene of contracts) {
    const frame = bySlug.get(scene.slug);
    if (!frame) errors.push(`${scene.slug}: missing original source frame`);
    else if (frame.id !== scene.id)
      errors.push(`${scene.slug}: original frame identity mismatch`);
  }
  return errors;
}

/** Never replace a snapshot, including the unlikely case of a truncated hash collision. */
export function writeFrameSnapshot(output, bytes, metadata) {
  const sha256 = digest(bytes);
  if (!/^[a-z][a-z0-9-]*$/.test(metadata.slug || ""))
    throw new Error("Invalid source frame slug");
  const filename = `${metadata.slug}-${sha256.slice(0, 12)}.jpg`;
  mkdirSync(output, { recursive: true });
  try {
    writeFileSync(join(output, filename), bytes, { flag: "wx" });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    if (digest(readFileSync(join(output, filename))) !== sha256)
      throw new Error(
        `${filename}: immutable source snapshot collision or tampering`,
      );
  }
  return { ...metadata, path: `assets/generator/scenes/${filename}`, sha256 };
}

export function mergeFrameManifest(previous, captured) {
  if (previous?.schema !== 1 || !Array.isArray(previous.frames))
    throw new Error("Original source frame manifest has an unsupported format");
  const frames = new Map(previous.frames.map((frame) => [frame.slug, frame]));
  for (const frame of captured) frames.set(frame.slug, frame);
  return {
    ...previous,
    frames: [...frames.values()].sort((a, b) =>
      a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0,
    ),
  };
}

const canonical = (value) =>
  Array.isArray(value)
    ? value.map(canonical)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map((key) => [key, canonical(value[key])]),
        )
      : value;

export const FRAME_MANIFEST_PATH = "site/assets/generator/scenes/frames.json";
const excludedKnowledgePaths = new Set([
  "skills/drawn-to/references/generator-release.json",
  "skills/drawn-to/references/showcase-styles.json",
]);
export const isKnowledgeSkillResource = (path) =>
  path.startsWith("skills/drawn-to/") &&
  !path.split("/").some((part) => part.startsWith(".")) &&
  !excludedKnowledgePaths.has(path);

/** Validate every path segment before reading a declared repository resource. */
export function assertSourcePath(root, path, { directory = false } = {}) {
  if (
    typeof path !== "string" ||
    !path ||
    path.includes("\\") ||
    path.includes("\0") ||
    path
      .split("/")
      .some((part) => !part || part === "." || part === ".." || part === ".git")
  )
    throw new Error(`unsafe source path: ${path}`);
  if (lstatSync(root).isSymbolicLink())
    throw new Error(`symlink source root: ${root}`);
  let current = resolve(root);
  const parts = path.split("/");
  for (const [index, part] of parts.entries()) {
    current = join(current, part);
    const stat = lstatSync(current);
    if (stat.isSymbolicLink()) throw new Error(`symlink source path: ${path}`);
    const folder = index < parts.length - 1 || directory;
    if (folder ? !stat.isDirectory() : !stat.isFile())
      throw new Error(`unsupported source file type: ${path}`);
  }
  return current;
}

/** Shared authoritative file scope for content fingerprints and immutable-tree verification. */
export function getKnowledgeResourcePaths(root, contracts, manifest) {
  const paths = new Set();
  function collect(folder) {
    assertSourcePath(root, folder, { directory: true });
    for (const entry of readdirSync(resolve(root, folder), {
      withFileTypes: true,
    })) {
      if (entry.name.startsWith(".")) continue;
      const path = folder + "/" + entry.name;
      if (excludedKnowledgePaths.has(path)) continue;
      if (entry.isSymbolicLink())
        throw new Error(`symlink source path: ${path}`);
      if (entry.isDirectory()) collect(path);
      else if (entry.isFile()) paths.add(path);
      else throw new Error(`unsupported source file type: ${path}`);
    }
  }
  collect("skills/drawn-to");
  for (const scene of contracts)
    for (const path of scene.implementation || []) paths.add(path);
  for (const frame of manifest.frames) {
    if (!validFrameAddress(frame))
      throw new Error(`${frame.slug}: invalid original frame address`);
    paths.add("site/" + frame.path);
  }
  return [...paths].sort().map((path) => {
    assertSourcePath(root, path);
    return path;
  });
}

/** Content only; excludes stamp/aggregate circularity, unrelated UI and file timestamps. */
export function computeKnowledgeDigest(root, contracts, manifest) {
  const resources = getKnowledgeResourcePaths(root, contracts, manifest).map(
    (path) => {
      const bytes = readFileSync(resolve(root, path));
      return [
        path,
        digest(
          path.endsWith(".json")
            ? canonical(JSON.parse(bytes.toString("utf8")))
            : bytes,
        ),
      ];
    },
  );
  const frames = manifest.frames
    .map(({ id, slug, path, sha256, viewport, mode, sourceRevision }) => ({
      id,
      slug,
      path,
      sha256,
      viewport,
      mode,
      sourceRevision,
    }))
    .sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  return digest(canonical({ resources, frames }));
}

export function validateContracts(
  contracts,
  { references = new Map(), exists = () => true } = {},
) {
  const errors = [],
    ids = new Set(),
    slugs = new Set();
  for (const scene of contracts) {
    const report = (message) =>
      errors.push(`${scene.slug || scene.id}: ${message}`);
    if (
      scene.schema !== 1 ||
      typeof scene.id !== "string" ||
      !/^[a-z][a-z0-9-]*$/.test(scene.slug || "")
    )
      report("invalid scene identity");
    if (ids.has(scene.id) || slugs.has(scene.slug))
      report("duplicate scene identity");
    ids.add(scene.id);
    slugs.add(scene.slug);
    if (!scene.name?.trim() || !scene.kind?.trim())
      report("missing scene name or kind");
    const props = new Map(),
      roles = new Set();
    for (const p of scene.properties || []) {
      if (!/^[a-z][a-z0-9-]*$/.test(p.id || "") || props.has(p.id))
        report(`invalid/duplicate property ${p.id}`);
      props.set(p.id, p);
      if (!p.label?.trim() || !p.text?.trim())
        report(`${p.id}: missing canonical label/text`);
      if (
        ![...ROLE_IDS, "context"].includes(p.role) ||
        typeof p.selectable !== "boolean"
      )
        report(`${p.id}: invalid role/selectability`);
      if (p.selectable) {
        if (p.role === "context" || roles.has(p.role))
          report(`${p.id}: duplicate or nonselectable role`);
        roles.add(p.role);
      }
      if (!Array.isArray(p.sources))
        report(`${p.id}: sources must be explicit`);
      for (const source of p.sources || []) {
        const doc = references.get(source.id);
        if (!doc) report(`${p.id}: unknown supporting reference ${source.id}`);
        else if (!doc.headings.includes(source.section))
          report(`${p.id}: unknown section ${source.section} in ${source.id}`);
      }
    }
    const assembled = new Set();
    for (const section of ["composition", "surface", "behavior", "checks"]) {
      const members = scene.sections?.[section];
      if (!Array.isArray(members) || !members.length) {
        report(`missing ${section} assembly`);
        continue;
      }
      for (const id of members) {
        if (!props.has(id)) report(`${section}: unknown property ${id}`);
        assembled.add(id);
      }
    }
    for (const id of props.keys())
      if (!assembled.has(id))
        report(`${id}: not included in full-scene contract`);
    for (const source of scene.references || [])
      if (!references.has(source)) report(`unknown scene reference ${source}`);
    for (const path of scene.implementation || [])
      if (!exists(path)) report(`missing implementation ${path}`);
  }
  return errors;
}
export function assembleProfiles(contracts) {
  return {
    schema: 1,
    description:
      "Generated from atomic, maintained scene-contracts. Edit skills/drawn-to/references/scene-contracts/*.json, then run node scripts/build-generator.mjs and node scripts/build-showcase-prompts.mjs.",
    styles: contracts.map((scene) => {
      const properties = new Map(scene.properties.map((p) => [p.id, p]));
      return {
        id: scene.id,
        name: scene.name,
        ...Object.fromEntries(
          ["composition", "surface", "behavior", "checks"].map((section) => [
            section,
            scene.sections[section]
              .map((id) => properties.get(id).text)
              .join(" "),
          ]),
        ),
        references: scene.references,
        implementation: scene.implementation,
        art: scene.art,
      };
    }),
  };
}
export function makeCatalog(
  contracts,
  {
    sourceRevision = null,
    sourcePublished = false,
    knowledgeDigest,
    opening = [],
    frames,
  } = {},
) {
  const properties = {};
  const frameBySlug = new Map(
    (frames?.frames || []).map((frame) => [frame.slug, frame]),
  );
  const scenes = contracts.map((scene) => {
    const frame = frameBySlug.get(scene.slug);
    if (!frame || !validFrameAddress(frame) || frame.id !== scene.id)
      throw new Error(
        `${scene.slug}: missing or invalid original source frame`,
      );
    const defaults = {};
    for (const p of scene.properties.filter((p) => p.selectable)) {
      const id = scene.slug + "::" + p.id;
      defaults[p.role] = id;
      properties[id] = {
        id,
        sceneId: scene.slug,
        role: p.role,
        label: p.label,
        text: p.text,
        path: `references/scene-contracts/${scene.slug}.json`,
        key: p.id,
        sources: p.sources,
      };
    }
    return {
      id: scene.slug,
      legacyId: scene.id,
      name: scene.name,
      shortName: scene.slug
        .split("-")
        .map((word, index) =>
          index === 0 ? word[0].toUpperCase() + word.slice(1) : word,
        )
        .join(" "),
      kind: scene.kind,
      thumbnail: frame.path,
      thumbnailSha256: frame.sha256,
      properties: Object.values(defaults),
      defaults,
      url: `/?still#${scene.slug}`,
    };
  });
  const position = (id) => {
    const n = opening.indexOf(id);
    return n < 0 ? opening.length + contracts.findIndex((s) => s.id === id) : n;
  };
  scenes.sort((a, b) => position(a.legacyId) - position(b.legacyId));
  const content = {
    schema: 1,
    sourceRevision,
    sourcePublished,
    knowledgeDigest,
    roles: ROLE_IDS.map((id) => ({ id, label: roleLabel(id) })),
    scenes,
    properties,
  };
  return { ...content, id: digest(content).slice(0, 20) };
}
