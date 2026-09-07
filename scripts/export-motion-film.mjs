import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.argv[2] || "http://127.0.0.1:8759/";
const out = resolve(process.argv[3] || "site/assets/motion/films");
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_EXECUTABLE
    ? { executablePath: process.env.CHROME_EXECUTABLE }
    : {}),
});
const records = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
  });
  await page.goto(`${base}?v=silver-tide&still&t=0&capture`);
  await page.waitForFunction(
    () => document.querySelector("[data-mo-host]")?.dataset.ready === "true",
  );
  for (const mode of [0, 1]) {
    const file = `silver-tide-${mode}.mp4`;
    const encoder = spawn(
      "ffmpeg",
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "image2pipe",
        "-framerate",
        "24",
        "-i",
        "pipe:0",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "slow",
        "-crf",
        "26",
        "-maxrate",
        "4M",
        "-bufsize",
        "8M",
        "-pix_fmt",
        "yuv420p",
        "-vf",
        "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        "-movflags",
        "+faststart",
        "-y",
        resolve(out, file),
      ],
      { stdio: ["pipe", "ignore", "inherit"] },
    );
    for (let frame = 0; frame < 384; frame++) {
      const image = await page.evaluate(
        ({ mode, time }) => {
          const api = document.querySelector("[data-mo-host]").__motion;
          api.setMode(mode);
          api.setTime(time);
          return api.snapshot();
        },
        { mode, time: frame / 24 },
      );
      if (!encoder.stdin.write(Buffer.from(image.split(",")[1], "base64")))
        await once(encoder.stdin, "drain");
    }
    encoder.stdin.end();
    const [code] = await once(encoder, "close");
    if (code !== 0) throw Error(`Film encoding failed: ${code}`);
    records.push({
      file,
      mode,
      frames: 384,
      fps: 24,
      duration: 16,
      source: "site/js/motion/scenes/tide.js",
      loop: "Analytic 16-second periodic wave field; final duplicate frame omitted.",
    });
    console.log(file + " encoded");
  }
  await writeFile(
    resolve(out, "provenance.json"),
    JSON.stringify(records, null, 2) + "\n",
  );
} finally {
  await browser.close();
}
