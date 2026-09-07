import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
const require = createRequire(import.meta.url),
  { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.argv[2] || "http://127.0.0.1:8761/",
  output = resolve("site/assets/expansion/gpu"),
  scratch = resolve(".eval-output/refined-posters");
await mkdir(scratch, { recursive: true });
const records = [];
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_EXECUTABLE
    ? { executablePath: process.env.CHROME_EXECUTABLE }
    : {}),
});
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  for (const [width, height, suffix] of [
    [1440, 900, ""],
    [390, 844, "-mobile"],
  ]) {
    await page.setViewportSize({ width, height });
    for (const id of [
      "glass-identity",
      "material-study",
      "physical-schedule",
    ]) {
      await page.goto(`${base}?still&t=0&v=${id}`);
      await page.waitForFunction(
        (id) => document.querySelector("#app").dataset.mounted === id,
        id,
      );
      const modes =
        id === "material-study"
          ? ["ceramic", "metal", "glass"]
          : id === "physical-schedule"
            ? ["overview", "detail"]
            : ["glass"];
      for (const mode of modes) {
        const data = await page.locator("[data-model-host]").evaluate(
          (host, { id, mode }) => {
            if (id === "material-study") host.__stage.setMaterial(mode);
            if (id === "physical-schedule")
              host.__stage.setInspection(mode === "detail");
            return host.__stage.setTime(0);
          },
          { id, mode },
        );
        const stateSuffix =
          id === "material-study" && mode !== "ceramic"
            ? "-" + mode
            : mode === "detail"
              ? "-detail"
              : "";
        const name = id + stateSuffix + suffix;
        await writeFile(
          resolve(scratch, name + ".png"),
          Buffer.from(data.split(",")[1], "base64"),
        );
        records.push({ id, mode, width, height, file: name + ".webp" });
      }
    }
  }
} finally {
  await browser.close();
}
execFileSync(
  "python3",
  [
    "-c",
    `from pathlib import Path
from PIL import Image
import sys
for f in Path(sys.argv[1]).glob('*.png'):
 Image.open(f).save(Path(sys.argv[2])/(f.stem+'.webp'),quality=94,method=6)
`,
    scratch,
    output,
  ],
  { stdio: "inherit" },
);
await writeFile(
  resolve(output, "refined-frames.json"),
  JSON.stringify(records, null, 2) + "\n",
);
console.log(records.length + " matching material/inspection posters exported.");
