/** Derive the full-scene compatibility view and versioned UI catalog from skill-owned atomic contracts. */
import {
  readFileSync,
  readdirSync,
  existsSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import {
  computeKnowledgeDigest,
  validateFrames,
  validateContracts,
  assembleProfiles,
  makeCatalog,
} from "./lib/generator-catalog.mjs";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const folder = "skills/drawn-to/references/scene-contracts";
const contracts = readdirSync(resolve(root, folder))
  .filter((x) => x.endsWith(".json"))
  .sort()
  .map((name) => JSON.parse(read(folder + "/" + name)));
const original = JSON.parse(
  read("skills/drawn-to/references/showcase-styles.json"),
).styles.map((s) => s.id);
const registered = [
  ..."abcdefghijklmnopqrstuvwxyzABCD",
  ...readdirSync(resolve(root, "site/js/expansion"))
    .filter((x) => x.endsWith(".js"))
    .flatMap((file) =>
      [
        ...read("site/js/expansion/" + file).matchAll(
          /\bid:\s*['"]([^'"]+)['"]\s*,\s*order:/g,
        ),
      ].map((m) => m[1]),
    ),
];
if (
  contracts.length !== registered.length ||
  contracts.some((s) => !registered.includes(s.id))
)
  throw new Error(
    `Expected ${registered.length} canonical scene contracts; found ${contracts.length}.`,
  );
contracts.sort((a, b) => original.indexOf(a.id) - original.indexOf(b.id));
const references = new Map(
  readdirSync(resolve(root, "skills/drawn-to/references/posts"))
    .filter((x) => x.endsWith(".md"))
    .map((file) => {
      const body = read("skills/drawn-to/references/posts/" + file);
      return [
        file.slice(0, -3),
        {
          body,
          headings: [...body.matchAll(/^#{1,6}\s+(.+)$/gm)].map((m) => m[1]),
        },
      ];
    }),
);
const frames = JSON.parse(read("site/assets/generator/scenes/frames.json"));
const errors = validateContracts(contracts, {
  references,
  exists: (path) => existsSync(resolve(root, path)),
});
errors.push(
  ...validateFrames(contracts, frames, {
    readBytes: (path) => readFileSync(resolve(root, path)),
  }),
);
const routes = {};
runInNewContext(read("site/js/scene-routes.js"), routes);
for (const scene of contracts)
  if (routes.DrawnToRoutes.slug(scene.id) !== scene.slug)
    errors.push(`${scene.id}: mismatched canonical route`);
if (errors.length) throw new Error(errors.join("\n"));
const knowledgeDigest = computeKnowledgeDigest(root, contracts, frames);
const release = JSON.parse(
  read("skills/drawn-to/references/generator-release.json"),
);
if (
  release.published &&
  (!/^[a-f0-9]{40}$/.test(release.revision || "") ||
    release.knowledgeDigest !== knowledgeDigest)
)
  throw new Error(
    "Published generator source stamp does not match the current skill knowledge. Re-stamp its actual published source revision or mark the local revision unpublished.",
  );
const order = { window: {} };
runInNewContext(read("site/js/catalog-order.js"), order);
const catalog = makeCatalog(contracts, {
  sourceRevision: release.revision,
  sourcePublished: release.published,
  knowledgeDigest,
  opening: order.window.DrawnToOpening,
  frames,
});
const check = process.argv.includes("--check");
let changed = 0;
function emit(path, value) {
  const text = JSON.stringify(value, null, 2) + "\n";
  if (existsSync(resolve(root, path)) && read(path) === text) return;
  changed++;
  if (!check) {
    mkdirSync(dirname(resolve(root, path)), { recursive: true });
    writeFileSync(resolve(root, path), text);
  }
}
emit(
  "skills/drawn-to/references/showcase-styles.json",
  assembleProfiles(contracts),
);
emit(`site/data/generator/catalogs/${catalog.id}.json`, catalog);
const manifestPath = "site/data/generator/index.json";
const previous = existsSync(resolve(root, manifestPath))
  ? JSON.parse(read(manifestPath))
  : { catalogs: {} };
const archived = Object.fromEntries(
  Object.entries(previous.catalogs).filter(
    ([id, item]) => item.published || id === catalog.id,
  ),
);
archived[catalog.id] = {
  url: `data/generator/catalogs/${catalog.id}.json`,
  sourceRevision: catalog.sourceRevision,
  published: catalog.sourcePublished,
};
emit(manifestPath, { schema: 1, current: catalog.id, catalogs: archived });
const report = {
  scenes: catalog.scenes.length,
  properties: Object.keys(catalog.properties).length,
  originalOnly: Object.values(catalog.properties).filter(
    (p) => !p.sources.length,
  ).length,
  byRole: Object.fromEntries(
    catalog.roles.map((r) => [
      r.id,
      Object.values(catalog.properties).filter((p) => p.role === r.id).length,
    ]),
  ),
};
if (check && changed) {
  console.error(
    `${changed} generated files differ. Run node scripts/build-generator.mjs.`,
  );
  process.exitCode = 1;
}
console.log(
  JSON.stringify({
    catalog: catalog.id,
    knowledgeDigest,
    ...report,
    changed,
    mode: check ? "check" : "build",
  }),
);
