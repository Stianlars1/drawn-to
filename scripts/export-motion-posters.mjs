import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_EXECUTABLE
    ? { executablePath: process.env.CHROME_EXECUTABLE }
    : {}),
});
const base = process.argv[2] || "http://127.0.0.1:8759/",
  out = resolve(process.argv[3] || ".eval-output/motion-posters");
await mkdir(out, { recursive: true });
const records = [];
const selected = process.argv.slice(4);
const kinds = selected.length
  ? selected
  : [
      "auric-orbit",
      "camera-obscura",
      "plasma-study",
      "phosphor-field",
      "silver-tide",
      "cloud-chamber",
      "morph-study",
    ];
try {
  const page = await browser.newPage();
  for (const [width, height, suffix] of [
    [1440, 900, ""],
    [390, 844, "-mobile"],
  ]) {
    await page.setViewportSize({ width, height });
    for (const id of kinds) {
      await page.goto(`${base}?v=${id}&still&t=0&capture`);
      await page.waitForFunction(
        () =>
          document.querySelector("[data-mo-host]")?.dataset.ready === "true",
      );
      for (let mode = 0; mode < (id === "silver-tide" ? 2 : 3); mode++) {
        const image = await page.evaluate((mode) => {
          const api = document.querySelector("[data-mo-host]").__motion;
          api.setMode(mode);
          api.setTime(0);
          return api.snapshot();
        }, mode);
        const file = id + "-" + mode + suffix + ".png";
        await writeFile(
          resolve(out, file),
          Buffer.from(image.split(",")[1], "base64"),
        );
        records.push({ id, mode, width, height, file });
      }
    }
  }
  await writeFile(
    resolve(out, selected.length ? "manifest-targeted.json" : "manifest.json"),
    JSON.stringify(records, null, 2) + "\n",
  );
} finally {
  await browser.close();
}
console.log(`${records.length} matched posters exported.`);
