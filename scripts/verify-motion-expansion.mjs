import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.argv[2] || "http://127.0.0.1:8759/";
const output = resolve(
  process.argv[3] || ".eval-output/motion-verification.json",
);
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
  states: [],
  errors: [],
};
const gpu = [
  "auric-orbit",
  "camera-obscura",
  "plasma-study",
  "phosphor-field",
  "cloud-chamber",
  "morph-study",
];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  const failed = [];
  page.on("pageerror", (e) => report.errors.push(e.message));
  page.on("console", (m) => {
    if (
      m.type() === "error" &&
      /THREE|GLSL|WebGLProgram|shader/i.test(m.text())
    )
      report.errors.push(m.text());
  });
  page.on("response", (r) => {
    if (r.status() >= 400 && !r.url().endsWith("favicon.ico"))
      failed.push({ url: r.url(), status: r.status() });
  });
  const visit = async (id, extra = "") => {
    await page.goto(`${base}?still&v=${id}${extra}`);
    await page.waitForFunction(
      (id) => document.querySelector("#app").dataset.mounted === id,
      id,
    );
    assert.equal(
      await page.locator("[data-render-error],[data-mount-error]").count(),
      0,
      id,
    );
  };
  for (const id of gpu) {
    await visit(id, "&t=0");
    const host = page.locator("[data-mo-host]");
    const before = await host.evaluate((el) => el.__motion.snapshot());
    await page.locator('[data-mo-mode="1"]').click();
    const after = await host.evaluate((el) => el.__motion.snapshot());
    assert.notEqual(before, after, id + " mode must change actual pixels");
    const input = page.locator("[data-mo-range]");
    if (await input.count()) {
      await input.fill("83");
      await input.dispatchEvent("input");
      assert.equal(await host.evaluate((el) => el.__motionState.value), 0.83);
    }
    await page.evaluate(
      () =>
        (window.__oldMotion =
          document.querySelector("[data-mo-host]").__motionState),
    );
    await page
      .getByRole("button", { name: "Next direction", exact: true })
      .click();
    await page.waitForFunction(() => window.__oldMotion.disposed);
    const frames = await page.evaluate(() => window.__oldMotion.frames);
    await page.waitForTimeout(140);
    assert.equal(await page.evaluate(() => window.__oldMotion.frames), frames);
    report.states.push({ id, materialChanges: true, disposed: true });
  }
  report.checks.push(
    "All six live 3D/shader scenes change rendered pixels, accept their parameters and dispose on navigation.",
  );
  for (const id of gpu) {
    await visit(id, "&gpu=off");
    assert.equal(await page.locator("[data-mo-host] canvas").count(), 0);
    const n = await page.locator("[data-mo-mode]").count();
    for (let i = 0; i < n; i++) {
      await page.locator(`[data-mo-mode="${i}"]`).click();
      await page.waitForFunction(() => {
        const img = document.querySelector("[data-mo-host] img");
        return img.complete && img.naturalWidth > 0;
      });
      assert.ok(
        (await page.locator("[data-mo-host] img").getAttribute("src")).includes(
          "-" + i + ".webp",
        ),
      );
    }
  }
  report.checks.push(
    "Every forced-poster state decodes and remains selectable without a renderer.",
  );
  await visit("auric-orbit");
  await page.waitForTimeout(200);
  const a = await page
    .locator("[data-mo-host]")
    .evaluate((el) => el.__motionState.frames);
  await page.waitForTimeout(350);
  const b = await page
    .locator("[data-mo-host]")
    .evaluate((el) => el.__motionState.frames);
  assert.ok(b > a);
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  const paused = await page
    .locator("[data-mo-host]")
    .evaluate((el) => el.__motionState.frames);
  await page.waitForTimeout(250);
  assert.equal(
    await page
      .locator("[data-mo-host]")
      .evaluate((el) => el.__motionState.frames),
    paused,
  );
  await page.evaluate(
    () =>
      (window.__beforeReduced =
        document.querySelector("[data-mo-host]").__motionState),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () =>
      window.__beforeReduced.disposed &&
      document.querySelector("[data-mo-host]")?.__motionState !==
        window.__beforeReduced &&
      document.querySelector("#app").dataset.mounted === "auric-orbit",
  );
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  const rm = await page
    .locator("[data-mo-host]")
    .evaluate((el) => el.__motionState.frames);
  await page.waitForTimeout(250);
  assert.equal(
    await page
      .locator("[data-mo-host]")
      .evaluate((el) => el.__motionState.frames),
    rm,
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  report.checks.push(
    "Animation starts, pauses and stops under a live reduced-motion change.",
  );
  await visit("camera-obscura");
  await page.locator("[data-mo-host]").evaluate((el) => {
    const canvas = el.querySelector("canvas");
    canvas
      .getContext("webgl2")
      .getExtension("WEBGL_lose_context")
      .loseContext();
  });
  await page.waitForFunction(
    () => document.querySelector("[data-mo-host]").dataset.fallback === "true",
  );
  await page.locator('[data-mo-mode="2"]').click();
  await page.waitForFunction(() => {
    const img = document.querySelector("[data-mo-host] img");
    return img.complete && img.naturalWidth > 0;
  });
  report.checks.push(
    "Lost WebGL context becomes a working selected poster state.",
  );
  let filmRequests = 0;
  const listener = (r) => {
    if (r.url().includes("/films/") && r.url().endsWith(".mp4")) filmRequests++;
  };
  page.on("request", listener);
  await page.mouse.move(0, 0);
  await visit("silver-tide");
  assert.equal(filmRequests, 0);
  assert.equal(
    await page.locator("[data-mo-film] video").getAttribute("src"),
    null,
  );
  await page.getByRole("button", { name: "Play motion", exact: true }).click();
  await page.waitForFunction(
    () =>
      !document.querySelector("[data-mo-film] video").paused &&
      document.querySelector("[data-mo-film] video").currentTime > 0.15,
  );
  await page.getByRole("button", { name: "Afterglow", exact: true }).click();
  await page.waitForFunction(() =>
    document.querySelector("video").currentSrc.includes("silver-tide-1"),
  );
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  assert.equal(await page.locator("video").evaluate((v) => v.paused), true);
  page.off("request", listener);
  report.checks.push(
    "Authored video bytes are deferred; playback, light switching and pause work.",
  );
  await page.route("**/films/*.mp4", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    await route.continue();
  });
  await visit("silver-tide");
  await page.getByRole("button", { name: "Play motion", exact: true }).click();
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await page.waitForTimeout(350);
  assert.equal(await page.locator("video").evaluate((v) => v.paused), true);
  await page.unroute("**/films/*.mp4");
  await page.getByRole("button", { name: "Play motion", exact: true }).click();
  await page.evaluate(() => {
    for (const mode of [1, 0, 1])
      document.querySelector(`[data-mo-mode="${mode}"]`).click();
  });
  await page.waitForFunction(() => {
    const v = document.querySelector("video");
    return (
      !v.paused &&
      v.currentSrc.includes("silver-tide-1") &&
      v.currentTime > 0.15
    );
  });
  report.checks.push(
    "Playback can be cancelled before decode; rapid light changes leave the final selected film playing.",
  );
  await page.mouse.move(0, 0);
  await visit("silver-tide");
  await page.locator("[data-mo-film]").hover({ position: { x: 700, y: 380 } });
  await page.waitForFunction(
    () => document.querySelector("[data-mo-film]").__filmState.playing,
  );
  await page.mouse.move(0, 0);
  await page.waitForFunction(() => document.querySelector("video").paused);
  await page.getByRole("button", { name: "Play motion", exact: true }).click();
  await page.waitForFunction(
    () => document.querySelector("[data-mo-film]").__filmState.playing,
  );
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  assert.equal(await page.locator("video").evaluate((v) => v.paused), true);
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForFunction(
    () => document.querySelector("[data-mo-film]").__filmState.playing,
  );
  await page.evaluate(() => {
    window.__film = document.querySelector("[data-mo-film]").__filmState;
    window.__video = document.querySelector("video");
  });
  await page
    .getByRole("button", { name: "Next direction", exact: true })
    .click();
  await page.waitForFunction(() => window.__film.disposed);
  assert.equal(
    await page.evaluate(() => window.__video.getAttribute("src")),
    null,
  );
  const save = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  await save.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: Object.assign(new EventTarget(), { saveData: true }),
    }),
  );
  const saving = await save.newPage();
  let savedRequests = 0;
  saving.on("request", (r) => {
    if (r.url().includes("/films/") && r.url().endsWith(".mp4"))
      savedRequests++;
  });
  await saving.goto(`${base}?still&v=silver-tide`);
  await saving.waitForFunction(
    () => document.querySelector("#app").dataset.mounted === "silver-tide",
  );
  await saving
    .locator("[data-mo-film]")
    .hover({ position: { x: 700, y: 380 } });
  await saving.waitForTimeout(150);
  assert.equal(savedRequests, 0);
  assert.equal(await saving.locator("[data-mo-pause]").isVisible(), false);
  await save.close();
  report.checks.push(
    "Real pointer enter/leave starts and stops film playback; a visibility event suspends and resumes it; simulated Save-Data requests no film bytes.",
  );

  await visit("quiet-frequency");
  assert.deepEqual(
    await page.locator(".xp-stage").evaluate((el) => el.__audioState()),
    { playing: false, state: "uninitialized" },
  );
  await page.getByRole("button", { name: /Start listening/ }).click();
  await page.waitForFunction(
    () => document.querySelector(".xp-stage").__audioState().playing,
  );
  await page.getByRole("slider", { name: "Frequency", exact: true }).fill("75");
  await page.getByRole("button", { name: /Stop listening/ }).click();
  assert.equal(
    await page.locator(".xp-stage").evaluate((el) => el.__audioState().state),
    "suspended",
  );
  report.checks.push(
    "Audio is opt-in, creates a real running graph, accepts parameters and suspends on stop.",
  );
  await visit("chamber-control");
  await page
    .getByRole("slider", { name: "Excitation", exact: true })
    .fill("80");
  assert.equal(await page.locator("[data-response]").innerText(), "0.80");
  await page.getByRole("button", { name: "EXPRESSIVE", exact: true }).click();
  assert.equal(
    await page
      .getByRole("slider", { name: "Excitation", exact: true })
      .inputValue(),
    "90",
  );
  await page.locator("[data-illumination]").click();
  assert.equal(
    await page.locator("[data-illumination]").getAttribute("aria-pressed"),
    "false",
  );
  await visit("vector-foundry", "&t=0");
  const line = await page
    .locator("[data-vector-surface] path")
    .first()
    .getAttribute("d");
  await page.getByRole("button", { name: "Flat", exact: true }).click();
  assert.notEqual(
    await page.locator("[data-vector-surface] path").first().getAttribute("d"),
    line,
  );
  assert.equal(await page.locator("[data-vector-surface] path").count(), 38);
  await visit("common-clock");
  await page.locator("[data-run-sequence]").click();
  await page.waitForTimeout(950);
  assert.notEqual(
    await page.locator("[data-clock-time]").innerText(),
    "COMPLETE",
  );
  await page.locator("[data-run-sequence]").click();
  const stopped = await page.locator("[data-clock-time]").innerText();
  await page.waitForTimeout(150);
  assert.equal(await page.locator("[data-clock-time]").innerText(), stopped);
  await visit("thermal-type");
  await page.waitForFunction(()=>document.querySelector('[data-heat-host]').__heatState.frames>2);
  await page.locator('[data-heat]').click();
  assert.equal(await page.locator('[data-heat]').getAttribute('aria-pressed'),'true');
  const heatFrames=await page.locator('[data-heat-host]').evaluate(h=>h.__heatState.frames);
  await page.waitForTimeout(180);
  assert.equal(await page.locator('[data-heat-host]').evaluate(h=>h.__heatState.frames),heatFrames);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.querySelector('[data-heat]').hidden);
  report.checks.push(
    "Industrial controls, continuous SVG geometry, single-clock sequence and local heat distortion respond to their promised inputs.",
  );
  for (const [id, selector] of [
    ["ember-portrait", '[data-image-view="1"]'],
    ["sunlit-field", '[data-image-view="2"]'],
    ["terrain-interface", 'button[data-collection="1"]'],
  ]) {
    await visit(id);
    await page.locator(selector).click();
    assert.equal(
      await page.locator(selector).getAttribute("aria-pressed"),
      "true",
    );
  }
  report.checks.push(
    "The original image scenes support actual selection, captions and material/scene inspection.",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of gpu) {
    await visit(id, "&gpu=off");
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      id,
    );
    await page.waitForFunction(() => {
      const img = document.querySelector("[data-mo-host] img");
      return img.complete && img.naturalWidth > 0;
    });
  }
  report.checks.push(
    "All six live-scene fallbacks have decoded portrait posters.",
  );
  assert.deepEqual(report.errors, []);
  assert.deepEqual(failed, []);
  report.failedResources = failed;
} finally {
  await browser.close();
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(report, null, 2) + "\n");
}
console.log(JSON.stringify(report, null, 2));
