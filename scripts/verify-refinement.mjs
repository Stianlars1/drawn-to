import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
const require = createRequire(import.meta.url),
  { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.argv[2] || "http://127.0.0.1:8761/",
  output = resolve(process.argv[3] || ".eval-output/refinement.json");
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_EXECUTABLE
    ? { executablePath: process.env.CHROME_EXECUTABLE }
    : {}),
});
const report = {
  date: new Date().toISOString(),
  browser: browser.version(),
  checks: [],
  aliases: [],
  errors: [],
};
try {
  const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    }),
    page = await context.newPage();
  page.on("pageerror", (e) => report.errors.push(e.message));
  const visit = async (id, extra = "") => {
    await page.goto(`${base}?still&v=${id}${extra}`);
    await page.waitForFunction(
      (id) => document.querySelector("#app").dataset.mounted === id,
      id,
    );
  };
  await visit("a");
  const aliases = await page.evaluate(() =>
    Object.entries(DrawnToRoutes.legacy),
  );
  for (const [id, slug] of aliases) {
    for (const query of [`?still#${id}`, `?still&v=${slug}`]) {
      await page.goto(base + query);
      await page.waitForFunction(
        (id) => document.querySelector("#app").dataset.mounted === id,
        id,
      );
      assert.equal(new URL(page.url()).hash, "#" + slug);
      assert.equal(
        await page.evaluate(() => document.documentElement.dataset.variant),
        id,
      );
    }
    report.aliases.push({ id, slug });
  }
  await page.goto(base + "?still&v=a#A");
  await page.waitForFunction(
    () => document.querySelector("#app").dataset.mounted === "A",
  );
  assert.ok(page.url().includes("v=example-run"));
  assert.ok(page.url().endsWith("#example-run"));
  await page.goto(base + "?still#%61");
  await page.waitForFunction(
    () => document.querySelector("#app").dataset.mounted === "a",
  );
  assert.ok(page.url().endsWith("#narrow-dark"));
  report.checks.push(
    "All 30 case-sensitive legacy IDs and descriptive aliases resolve; hash/query conflicts normalize to the hash choice; encoded legacy links resolve.",
  );
  await visit("auric-orbit", "&gpu=off");
  await page
    .getByRole("button", { name: "Next direction", exact: true })
    .click();
  await page.waitForFunction(
    () => document.querySelector("#app").dataset.mounted === "cloud-chamber",
  );
  await page
    .getByRole("button", { name: "Next direction", exact: true })
    .click();
  await page.waitForFunction(
    () => document.querySelector("#app").dataset.mounted === "camera-obscura",
  );
  await page.goBack();
  await page.waitForFunction(
    () => document.querySelector("#app").dataset.mounted === "cloud-chamber",
  );
  await page.goForward();
  await page.waitForFunction(
    () => document.querySelector("#app").dataset.mounted === "camera-obscura",
  );
  report.checks.push(
    "Manual next/previous navigation writes history; browser Back and Forward restore the actual scene.",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.mouse.move(0, 0);
  await visit("thermal-type");
  await page.waitForFunction(
    () => document.querySelector("[data-heat-host]").__heatState.frames > 2,
  );
  const before = await page
    .locator("[data-heat-host]")
    .evaluate((h) => ({ ...h.__heatState }));
  await page.waitForTimeout(400);
  const after = await page
    .locator("[data-heat-host]")
    .evaluate((h) => ({ ...h.__heatState }));
  assert.ok(after.frames > before.frames);
  assert.equal(after.uploads, before.uploads);
  const pixelProof = await page.evaluate(() => {
    const host = document.querySelector("[data-heat-host]"),
      canvas = host.querySelector("canvas"),
      gl = canvas.getContext("webgl2"),
      hostBox = host.getBoundingClientRect(),
      typeBox = document
        .querySelector(".mo-thermal-copy h1")
        .getBoundingClientRect();
    const capture = (t) => {
      host.__heat.setTime(t);
      const pixels = new Uint8Array(canvas.width * canvas.height * 4);
      gl.readPixels(
        0,
        0,
        canvas.width,
        canvas.height,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixels,
      );
      return pixels;
    };
    const a = capture(0.2),
      b = capture(1.2),
      sx = canvas.width / hostBox.width,
      sy = canvas.height / hostBox.height;
    const changed = (x, y, w, h) => {
      let count = 0,
        total = 0;
      for (
        let row = Math.max(0, Math.floor(y * sy));
        row < Math.min(canvas.height, Math.ceil((y + h) * sy));
        row++
      )
        for (
          let col = Math.max(0, Math.floor(x * sx));
          col < Math.min(canvas.width, Math.ceil((x + w) * sx));
          col++
        ) {
          const k = ((canvas.height - 1 - row) * canvas.width + col) * 4;
          total++;
          if (
            Math.abs(a[k] - b[k]) +
              Math.abs(a[k + 1] - b[k + 1]) +
              Math.abs(a[k + 2] - b[k + 2]) >
            5
          )
            count++;
        }
      return { count, total };
    };
    const [x, y] = host.__heatState.origin;
    return {
      headline: changed(
        typeBox.left - hostBox.left,
        typeBox.top - hostBox.top,
        typeBox.width,
        typeBox.height,
      ),
      source: changed(x - 40, y - 40, 80, 80),
      outside: changed(hostBox.width - 80, 20, 50, 50),
    };
  });
  assert.ok(pixelProof.headline.count > pixelProof.headline.total * 0.01);
  assert.ok(pixelProof.source.count > 10);
  assert.equal(pixelProof.outside.count, 0);
  report.heatPixels = pixelProof;
  await page.locator("[data-heat-host]").evaluate((h) => h.__heat.play());
  await page.getByRole("button", { name: "Pause heat", exact: true }).click();
  const stopped = await page
    .locator("[data-heat-host]")
    .evaluate((h) => h.__heatState.frames);
  await page.waitForTimeout(200);
  assert.equal(
    await page
      .locator("[data-heat-host]")
      .evaluate((h) => h.__heatState.frames),
    stopped,
  );
  report.checks.push(
    "Heat advances without hover, changes both source-region and headline pixels, leaves an outside region fixed, caches its texture and pauses.",
  );
  await page
    .locator("[data-heat-host]")
    .evaluate((h) =>
      h
        .querySelector("canvas")
        .getContext("webgl2")
        .getExtension("WEBGL_lose_context")
        .loseContext(),
    );
  await page.waitForFunction(() => !document.querySelector(".mo-heat-ready"));
  assert.equal(
    await page
      .locator(".mo-thermal-copy h1")
      .evaluate((h) => getComputedStyle(h).opacity),
    "1",
  );
  assert.equal(await page.locator("[data-heat]").isVisible(), false);
  await visit("thermal-type", "&gpu=off");
  assert.equal(await page.locator("[data-heat-host] canvas").count(), 0);
  assert.equal(await page.locator("[data-heat]").isVisible(), false);
  await visit("thermal-type");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () => document.querySelector("[data-heat]").hidden,
  );
  await page.waitForTimeout(120);
  const reduced = await page
    .locator("[data-heat-host]")
    .evaluate((h) => h.__heatState.frames);
  await page.waitForTimeout(200);
  assert.equal(
    await page
      .locator("[data-heat-host]")
      .evaluate((h) => h.__heatState.frames),
    reduced,
  );
  report.checks.push(
    "Context loss restores semantic visible text; forced GPU-off and reduced motion retain a composed readable state.",
  );
  for (const [width, height] of [
    [1440, 900],
    [1280, 720],
    [390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    await visit("menu-preview");
    const art = await page.locator(".xi-composed-art").boundingBox();
    assert.ok(art.width > 100 && art.height > 75);
    await page.getByRole("radio", { name: /Feature set/ }).focus();
    assert.equal(await page.locator(".xi-sketch-features").count(), 1);
    await page.keyboard.press("ArrowDown");
    assert.equal(await page.locator(".xi-sketch-onboarding").count(), 1);
    await page.keyboard.press("Escape");
    assert.equal(
      await page
        .locator('[data-ui="menu-trigger"]')
        .getAttribute("aria-expanded"),
      "false",
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
  }
  report.checks.push(
    "The composed illustration keeps real artwork dimensions at all three widths; menu preview, selection and Escape retain keyboard behavior.",
  );
  await page.setViewportSize({width:1440,height:900});
  await visit('physical-schedule','&t=0');
  const full=await page.locator('[data-model-host]').evaluate(h=>h.__stage.setTime(0));
  await page.locator('[data-inspect]').click();
  const detail=await page.locator('[data-model-host]').evaluate(h=>h.__stage.setTime(0));
  assert.notEqual(full,detail);
  await page.locator('[data-model-host]').evaluate(h=>h.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
  await page.waitForFunction(()=>document.querySelector('[data-model-host] img').currentSrc.includes('physical-schedule-detail'));
  await page.waitForFunction(()=>{const i=document.querySelector('[data-model-host] img');return i.complete&&i.naturalWidth>0;});
  await page.locator('[data-inspect]').click();
  assert.equal(await page.locator('[data-inspect]').getAttribute('aria-pressed'),'false');
  await page.waitForFunction(()=>{const i=document.querySelector('[data-model-host] img');return !i.currentSrc.includes('-detail')&&i.complete&&i.naturalWidth>0;});
  await visit('physical-schedule','&gpu=off');await page.locator('[data-inspect]').click();
  await page.waitForFunction(()=>{const i=document.querySelector('[data-model-host] img');return i.currentSrc.includes('-detail')&&i.complete&&i.naturalWidth>0;});
  report.checks.push('The plan inspection changes actual rendered pixels and preserves the selected overview/detail state across context loss and forced-poster rendering.');
  assert.deepEqual(report.errors, []);
} finally {
  await browser.close();
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(report, null, 2) + "\n");
}
console.log(JSON.stringify(report, null, 2));
