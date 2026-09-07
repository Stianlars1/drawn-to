/** Capture original showcase frames for the generator's source library. */
import { createRequire } from "node:module";
import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import {
  writeFrameSnapshot,
  mergeFrameManifest,
} from "./lib/generator-catalog.mjs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const routeContext = {};
runInNewContext(
  await readFile(resolve(root, "site/js/scene-routes.js"), "utf8"),
  routeContext,
);
const styles = JSON.parse(
  await readFile(
    resolve(root, "skills/drawn-to/references/showcase-styles.json"),
    "utf8",
  ),
).styles;
const base =
  process.argv.slice(2).find((argument) => !argument.startsWith("--")) ||
  "http://127.0.0.1:8798/";
const sourceRevision =
  process.argv
    .find((argument) => argument.startsWith("--source-revision="))
    ?.slice(18) || null;
if (sourceRevision && !/^[a-f0-9]{40}$/.test(sourceRevision))
  throw new Error(
    "--source-revision must be the full commit of the served showcase, or omitted when unverified",
  );
const only = process.argv
  .find((a) => a.startsWith("--only="))
  ?.slice(7)
  .split(",");
const output = resolve(root, "site/assets/generator/scenes");
await mkdir(output, { recursive: true });
const manifestPath = resolve(output, "frames.json");
let previous;
try {
  previous = JSON.parse(await readFile(manifestPath, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  previous = {
    schema: 1,
    description:
      "Original Drawn To showcase frames. These depict the individual source scenes, not generated combinations.",
    frames: [],
  };
}
if (only) {
  const slugs = new Set(
    styles.map((style) => routeContext.DrawnToRoutes.slug(style.id)),
  );
  for (const slug of only)
    if (!slugs.has(slug)) throw new Error(`Unknown scene: ${slug}`);
}
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_EXECUTABLE
    ? { executablePath: process.env.CHROME_EXECUTABLE }
    : {}),
});
const report = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  for (const style of styles) {
    const slug = routeContext.DrawnToRoutes.slug(style.id);
    if (only && !only.includes(slug)) continue;
    await page.goto(`${base}?still&t=0&gpu=off#${slug}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForFunction(
      (id) => document.querySelector("#app")?.dataset.mounted === id,
      style.id,
    );
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() =>
      [...document.querySelectorAll("#app img")].every((i) => i.complete),
    );
    const failure = await page
      .locator("[data-render-error],[data-mount-error]")
      .count();
    if (failure) throw new Error(`${slug}: source failed to mount`);
    const bytes = await page.screenshot({
      type: "jpeg",
      quality: 84,
      animations: "disabled",
      scale: "css",
    });
    report.push(
      writeFrameSnapshot(output, bytes, {
        id: style.id,
        slug,
        viewport: [1440, 900],
        mode: "composed source still, GPU poster fallback",
        sourceRevision,
        provenance: sourceRevision
          ? "Captured from a served showcase revision identified by the capture operator; revision is not automatically verified."
          : "Captured from the served showcase; source revision unverified.",
      }),
    );
    console.log(`Captured ${report.length}: ${slug}`);
  }
} finally {
  await browser.close();
}
const temporaryManifest = manifestPath + `.tmp-${process.pid}`;
await writeFile(
  temporaryManifest,
  JSON.stringify(mergeFrameManifest(previous, report), null, 2) + "\n",
);
await rename(temporaryManifest, manifestPath);
