/** Browser acceptance checks use rendered controls, real exports and isolated drafts. */
import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = new URL(process.argv[2] || "http://127.0.0.1:56505/generator");
const output = resolve(process.argv[3] || ".eval-output/generator-browser");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_EXECUTABLE
    ? { executablePath: process.env.CHROME_EXECUTABLE }
    : {}),
});
const report = {
  date: new Date().toISOString(),
  browser: browser.version(),
  base: base.href,
  checks: [],
  errors: [],
  screenshots: [],
};
let catalog;
const contexts = [];
async function fixture(query = "", options = {}) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    permissions: ["clipboard-read", "clipboard-write"],
    reducedMotion: "reduce",
    ...options,
  });
  contexts.push(context);
  context.on("page", (page) =>
    page.on("pageerror", (error) =>
      report.errors.push({ url: page.url(), message: error.message }),
    ),
  );
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  await page.goto(new URL(query || base.href, base).href);
  await page.waitForFunction(
    () => window.__drawnToGenerator?.sceneCount === 70,
  );
  return { context, page };
}
async function dismiss(page) {
  if (await page.locator("dialog[open]").count()) {
    await page.keyboard.press("Escape");
    await page.locator("dialog").waitFor({ state: "detached" });
  }
}
async function share(page, include = false) {
  await page.locator('[data-action="share"]').click();
  if (include) await page.locator("[data-context]").check();
  const url = await page.locator("#share-url").inputValue();
  const payload = JSON.parse(
    Buffer.from(new URL(url).hash.slice(3), "base64url").toString("utf8"),
  );
  await dismiss(page);
  return { url, payload };
}
async function rename(page, name) {
  await page.locator('[data-action="rename"]').click();
  await page.locator('dialog input[name="name"]').fill(name);
  await page.getByRole("button", { name: "Save name", exact: true }).click();
  await page.locator("dialog[open]").waitFor({ state: "detached" });
}
async function prompt(page) {
  await page.locator('.direction-export [data-action="prompt"]').click();
  return page.locator("#direction-prompt").inputValue();
}
async function roleCommand(page, role, command) {
  const row = page.locator(`[data-role-details="${role}"]`);
  if (!(await row.getAttribute("open").then((value) => value !== null)))
    await row.locator("summary").click();
  await row.locator(`[data-command="${command}"]`).click();
}
async function pick(page, scene, role) {
  await page.locator(`[data-mode="${role ? "parts" : "scene"}"]`).click();
  if (role) await page.locator(`.role-filters [data-role="${role}"]`).click();
  await page.locator('input[type="search"]').fill(scene);
  await page.locator(`[data-select="${scene}"]`).click();
}
async function shot(page, name) {
  const path = resolve(output, name + ".png");
  await page.screenshot({ path, fullPage: false });
  report.screenshots.push(path);
  return path;
}
async function checkpoint(name, fn) {
  let current;
  try {
    await fn((value) => (current = value));
    report.checks.push({ name, status: "passed" });
    console.log("PASS " + name);
  } catch (error) {
    const screenshot = current
      ? await shot(current, "failure-" + report.checks.length).catch(() => null)
      : null;
    report.checks.push({
      name,
      status: "failed",
      error: error.stack,
      screenshot,
    });
    console.error("FAIL " + name + "\n" + error.stack);
  }
}

try {
  const response = await fetch(new URL("/data/generator/index.json", base));
  const manifest = await response.json();
  catalog = await (
    await fetch(
      new URL(manifest.catalogs[manifest.current].url, new URL("/", base)),
    )
  ).json();
  report.catalogId = catalog.id;
  const scene = (id) => catalog.scenes.find((item) => item.id === id);
  const expected = [
    scene("plasma-study").defaults.shape,
    scene("plasma-study").defaults.color,
    scene("particle-assembly").defaults.graphics,
  ].sort();

  await checkpoint(
    "Library boot, actual search and role filters",
    async (track) => {
      const { page } = await fixture();
      track(page);
      assert.equal(await page.locator(".source-tile").count(), 70);
      assert.equal(await page.locator("iframe").count(), 0);
      await page.locator('input[type="search"]').fill("plasma-study");
      assert.equal(await page.locator(".source-tile").count(), 1);
      assert.equal(
        await page.locator(".source-tile h2").innerText(),
        scene("plasma-study").name,
      );
      await page
        .locator('input[type="search"]')
        .fill("no-source-with-this-name");
      assert.equal(await page.locator(".source-tile").count(), 0);
      await page.locator("[data-clear]").click();
      await page.locator('[data-mode="parts"]').click();
      for (const role of ["shape", "typography", "motion"]) {
        await page.locator(`.role-filters [data-role="${role}"]`).click();
        const actual = await page
          .locator("[data-select]")
          .evaluateAll((nodes) => nodes.map((n) => n.dataset.select));
        const supported = catalog.scenes
          .filter((s) =>
            s.properties.some((id) => catalog.properties[id].role === role),
          )
          .map((s) => s.id);
        assert.deepEqual(actual, supported);
      }
    },
  );

  await checkpoint(
    "Accepted particle orb, exact atomic handoff, real clipboard and manual equivalent",
    async (track) => {
      const { page } = await fixture("?example=particle-orb");
      track(page);
      const { payload } = await share(page);
      assert.equal(payload.scope, "graphic");
      assert.equal(payload.targets[0].baseScene, null);
      assert.deepEqual(
        Object.values(payload.targets[0].choices)
          .flatMap((choice) => choice.propertyIds)
          .sort(),
        expected,
      );
      for (const role of ["layout", "typography", "motion"]) {
        assert.equal(payload.targets[0].choices[role].mode, "open");
        assert.match(
          await page
            .locator(`[data-role-details="${role}"] summary`)
            .innerText(),
          /Left open/,
        );
      }
      const text = await prompt(page);
      assert.ok(text.includes("references/generator-handoff.md"));
      for (const id of expected) {
        const property = catalog.properties[id];
        assert.ok(text.includes(id));
        assert.ok(text.includes(property.path));
        assert.ok(
          text.includes("property key " + JSON.stringify(property.key)),
        );
        assert.ok(
          !text.includes(property.text),
          "Appearance prose must remain in the source contract",
        );
      }
      await page.locator("dialog [data-copy]").click();
      assert.equal(
        await page.evaluate(() => navigator.clipboard.readText()),
        text,
      );
      await dismiss(page);
      const { page: manual } = await fixture();
      await pick(manual, "plasma-study", "shape");
      await pick(manual, "plasma-study", "color");
      await pick(manual, "particle-assembly", "graphics");
      for (const role of Object.keys(payload.targets[0].choices).filter(
        (role) => payload.targets[0].choices[role].mode === "open",
      ))
        await roleCommand(manual, role, "open");
      const manualPayload = (await share(manual)).payload;
      assert.deepEqual(
        manualPayload.targets[0].choices,
        payload.targets[0].choices,
      );
      const manualText = await prompt(manual);
      assert.equal(
        manualText.replace(/^Direction name:.*\n/gm, ""),
        text.replace(/^Direction name:.*\n/gm, ""),
      );
      await writeFile(resolve(output, "particle-orb-handoff.txt"), text);
    },
  );

  await checkpoint(
    "Preset changes preserve explicit choices, open and excluded roles; undo and redo",
    async (track) => {
      const { page } = await fixture("?scene=plasma-study");
      track(page);
      await pick(page, "particle-assembly", "graphics");
      await roleCommand(page, "motion", "open");
      await roleCommand(page, "typography", "exclude");
      await pick(page, "auric-orbit");
      const state = (await share(page)).payload;
      assert.equal(state.targets[0].baseScene, "auric-orbit");
      assert.deepEqual(state.targets[0].choices.graphics.propertyIds, [
        scene("particle-assembly").defaults.graphics,
      ]);
      assert.equal(state.targets[0].choices.motion.mode, "open");
      assert.equal(state.targets[0].choices.typography.mode, "excluded");
      await page
        .getByRole("button", { name: "Undo last change", exact: true })
        .click();
      assert.equal(
        (await share(page)).payload.targets[0].baseScene,
        "plasma-study",
      );
      await page.keyboard.press("Control+Shift+z");
      assert.equal(
        (await share(page)).payload.targets[0].baseScene,
        "auric-orbit",
      );
    },
  );

  await checkpoint(
    "Page scope, defaults, independent section choice, add, duplicate, reorder and remove",
    async (track) => {
      const { page } = await fixture();
      track(page);
      await page.locator("[data-scope]").selectOption("page");
      assert.equal(await page.locator(".target-select").count(), 2);
      await page.locator('[data-target="page"]').click();
      await pick(page, "plasma-study", "color");
      await page.locator(".target-select").nth(1).click();
      await page.locator('[data-role-details="color"] summary').click();
      assert.match(
        await page.locator('[data-role-details="color"]').innerText(),
        /From page defaults/,
      );
      await pick(page, "particle-assembly", "graphics");
      await page.locator('[data-action="add-target"]').click();
      assert.equal(await page.locator(".target-select").count(), 3);
      let state = (await share(page)).payload;
      const added = state.targets[2].id;
      assert.deepEqual(state.targets[2].choices, {});
      const targetMenu = () =>
        page
          .locator(".target-item")
          .filter({ has: page.locator(`[data-target="${added}"]`) })
          .locator(".target-menu");
      await targetMenu().locator("summary").click();
      await targetMenu().locator('[data-command="duplicate-target"]').click();
      state = (await share(page)).payload;
      assert.equal(state.targets.length, 4);
      const duplicated = state.targets[3].id;
      const duplicateMenu = () =>
        page
          .locator(".target-item")
          .filter({ has: page.locator(`[data-target="${duplicated}"]`) })
          .locator(".target-menu");
      await duplicateMenu().locator("summary").click();
      await duplicateMenu()
        .locator('[data-command="move-target"][data-delta="-1"]')
        .click();
      state = (await share(page)).payload;
      assert.equal(state.targets[2].id, duplicated);
      await duplicateMenu().locator("summary").click();
      await duplicateMenu().locator('[data-command="remove-target"]').click();
      assert.equal((await share(page)).payload.targets.length, 3);
      assert.equal(
        await page.locator('.target-select[aria-pressed="true"]').count(),
        1,
      );
      await page.locator('[data-action="add-target"]').click();
      assert.equal(await page.locator(".target-select").count(), 4);
    },
  );

  await checkpoint(
    "Private share removes all authored strings; public context, import and reload are separate drafts",
    async (track) => {
      const { context, page } = await fixture("?example=particle-orb");
      track(page);
      const secrets = [
        "PRIVATE direction 981",
        "PRIVATE product 762",
        "PRIVATE platform 415",
        "PRIVATE intent 293",
        "PRIVATE section 854",
      ];
      await rename(page, secrets[0]);
      await page.locator("[data-scope]").selectOption("page");
      const section = page.locator(".target-menu").first();
      await section.locator("summary").click();
      await section.locator('[data-action="rename-target"]').click();
      await page.locator('dialog input[name="name"]').fill(secrets[4]);
      await page
        .getByRole("button", { name: "Save name", exact: true })
        .click();
      await page.locator('[data-action="context"]').click();
      for (const [i, key] of ["product", "platform", "intent"].entries())
        await page.locator(`textarea[name="${key}"]`).fill(secrets[i + 1]);
      await page.getByRole("button", { name: /Save context/ }).click();
      const privateShare = await share(page);
      for (const secret of secrets)
        assert.ok(!JSON.stringify(privateShare.payload).includes(secret));
      const publicShare = await share(page, true);
      for (const secret of secrets)
        assert.ok(JSON.stringify(publicShare.payload).includes(secret));
      const originalId = await page.evaluate(
        () => window.__drawnToGenerator.draftId,
      );
      const imported = await context.newPage();
      await imported.goto(publicShare.url);
      await imported.waitForFunction(
        () => window.__drawnToGenerator?.sceneCount === 70,
      );
      const importedId = await imported.evaluate(
        () => window.__drawnToGenerator.draftId,
      );
      assert.notEqual(importedId, originalId);
      await rename(imported, "Edited shared draft");
      await imported.reload();
      await imported.waitForFunction(
        () => window.__drawnToGenerator?.sceneCount === 70,
      );
      assert.equal(
        await imported.evaluate(() => window.__drawnToGenerator.draftId),
        importedId,
      );
      assert.equal(
        await imported.locator(".draft-name").innerText(),
        "Edited shared draft",
      );
      assert.equal(await page.locator(".draft-name").innerText(), secrets[0]);
      await page.locator('[data-action="share"]').click();
      await page.locator("[data-context]").check();
      const downloadPromise = page.waitForEvent("download");
      await page.locator("[data-download]").click();
      const download = await downloadPromise;
      const jsonPath = resolve(output, "direction-export.json");
      await download.saveAs(jsonPath);
      const exported = JSON.parse(await readFile(jsonPath, "utf8"));
      assert.deepEqual(exported, publicShare.payload);
      await dismiss(page);
      await page.locator('[data-action="drafts"]').click();
      await page.locator("[data-file]").setInputFiles(jsonPath);
      await page.waitForFunction(
        (id) => window.__drawnToGenerator.draftId !== id,
        originalId,
      );
      assert.deepEqual((await share(page, true)).payload, exported);
      for (let i = 0; i < 3; i++) {
        await page.locator('[data-action="drafts"]').click();
        await page.locator(`[data-draft="${originalId}"]`).click();
        await page.waitForFunction(
          (id) => window.__drawnToGenerator.draftId === id,
          originalId,
        );
      }
      const before = await page.locator(".target-select").count();
      await page.locator('[data-action="add-target"]').click();
      assert.equal(
        await page.locator(".target-select").count(),
        before + 1,
        "Remount must not duplicate delegated handlers",
      );
      await page
        .getByRole("button", { name: "Undo last change", exact: true })
        .click();
      assert.equal(await page.locator(".target-select").count(), before);
    },
  );

  await checkpoint(
    "Pricing section purpose survives private sharing and guides the received handoff",
    async (track) => {
      const { context, page } = await fixture("?example=particle-orb");
      track(page);
      await page.locator("[data-scope]").selectOption("page");
      await page.locator(".target-select").nth(1).click();
      const before = (await share(page)).payload.targets[1];
      await page.locator("[data-target-kind]").selectOption("pricing");
      assert.equal(
        await page.locator("[data-target-kind]").inputValue(),
        "pricing",
      );
      const menu = page.locator(".target-menu").first();
      await menu.locator("summary").click();
      await menu.locator('[data-action="rename-target"]').click();
      const privateName = "Private premium tier 881";
      await page.locator('dialog input[name="name"]').fill(privateName);
      await page
        .getByRole("button", { name: "Save name", exact: true })
        .click();
      await page.locator("dialog").waitFor({ state: "detached" });
      const exported = await share(page);
      assert.equal(exported.payload.targets[1].kind, "pricing");
      assert.deepEqual(exported.payload.targets[1].choices, before.choices);
      assert.ok(!JSON.stringify(exported.payload).includes(privateName));
      assert.equal(Object.hasOwn(exported.payload.targets[1], "name"), false);
      const received = await context.newPage();
      await received.goto(exported.url);
      await received.waitForFunction(
        () => window.__drawnToGenerator?.sceneCount === 70,
      );
      await received.locator(".target-select").nth(1).click();
      assert.equal(
        await received.locator("[data-target-kind]").inputValue(),
        "pricing",
      );
      const text = await prompt(received);
      assert.ok(text.includes('references/recipes.md, section "Pricing"'));
      assert.ok(!text.includes(privateName));
      for (const id of expected) assert.ok(text.includes(id));
    },
  );

  await checkpoint(
    "Clipboard denial retains manual prompt; source iframe and keyboard focus are disposed/restored",
    async (track) => {
      const { page } = await fixture("?example=particle-orb");
      track(page);
      await page.evaluate(() =>
        Object.defineProperty(navigator, "clipboard", {
          configurable: true,
          value: {
            writeText: async () => {
              throw Error("Clipboard denied: select and copy manually.");
            },
          },
        }),
      );
      const text = await prompt(page);
      await page.locator("dialog [data-copy]").click();
      assert.match(
        await page.locator(".dialog-status").innerText(),
        /Could not copy/,
      );
      assert.equal(await page.locator("#direction-prompt").inputValue(), text);
      await dismiss(page);
      assert.equal(
        await page
          .locator('.direction-export [data-action="prompt"]')
          .evaluate((node) => node === document.activeElement),
        true,
      );
      await page.locator('[data-mode="scene"]').click();
      await page.locator('input[type="search"]').fill("plasma-study");
      await page.locator('.source-grid [data-inspect="plasma-study"]').click();
      assert.equal(await page.locator("iframe").count(), 0);
      await page.locator("[data-live]").click();
      assert.equal(await page.locator("iframe").count(), 1);
      await dismiss(page);
      assert.equal(await page.locator("iframe").count(), 0);
      assert.equal(
        await page
          .locator('.source-grid [data-inspect="plasma-study"]')
          .evaluate((node) => node === document.activeElement),
        true,
      );
      await page.locator('[data-action="context"]').click();
      await page.locator('textarea[name="product"]').fill("Focus restoration");
      await page.getByRole("button", { name: /Save context/ }).click();
      await page.locator("dialog[open]").waitFor({ state: "detached" });
      await page.waitForFunction(
        () => document.activeElement?.dataset.action === "context",
      );
    },
  );

  await checkpoint(
    "Storage denied keeps old unsaved direction recoverable within this tab",
    async (track) => {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        reducedMotion: "reduce",
      });
      contexts.push(context);
      await context.addInitScript(() => {
        Object.defineProperty(window, "localStorage", {
          configurable: true,
          get() {
            throw new DOMException("Storage denied", "SecurityError");
          },
        });
      });
      const page = await context.newPage();
      track(page);
      page.on("pageerror", (error) =>
        report.errors.push({ url: page.url(), message: error.message }),
      );
      await page.goto(new URL("?example=particle-orb", base).href);
      await page.waitForFunction(
        () => window.__drawnToGenerator?.sceneCount === 70,
      );
      await rename(page, "Unsaved original");
      const id = await page.evaluate(() => window.__drawnToGenerator.draftId);
      assert.match(await page.locator(".save-state").innerText(), /Not saved/);
      await page.locator('[data-action="new"]').click();
      await page.getByRole("button", { name: /Create direction/ }).click();
      assert.notEqual(
        await page.evaluate(() => window.__drawnToGenerator.draftId),
        id,
      );
      await page.locator('[data-action="drafts"]').click();
      assert.match(
        await page.locator(`[data-draft="${id}"]`).innerText(),
        /Unsaved original.*Only in this tab/s,
      );
      await page.locator(`[data-draft="${id}"]`).click();
      await page.waitForFunction(
        (id) => window.__drawnToGenerator.draftId === id,
        id,
      );
      assert.equal(
        await page.locator(".draft-name").innerText(),
        "Unsaved original",
      );
      assert.deepEqual(
        Object.values((await share(page)).payload.targets[0].choices)
          .flatMap((choice) => choice.propertyIds)
          .sort(),
        expected,
      );
    },
  );

  await checkpoint(
    "Real cross-tab conflict keeps both independently edited versions as recovery copies",
    async (track) => {
      const { context, page } = await fixture("?example=particle-orb");
      track(page);
      await rename(page, "Shared local starting point");
      const id = await page.evaluate(() => window.__drawnToGenerator.draftId);
      const other = await context.newPage();
      await other.goto(base.href);
      await other.waitForFunction(
        () => window.__drawnToGenerator?.sceneCount === 70,
      );
      await other.locator('[data-action="drafts"]').click();
      await other.locator(`[data-draft="${id}"]`).click();
      await other.waitForFunction(
        (id) => window.__drawnToGenerator.draftId === id,
        id,
      );
      await rename(page, "Version from first tab");
      await other.waitForFunction(() =>
        document
          .querySelector(".studio-notice")
          .textContent.includes("changed in another tab"),
      );
      await rename(other, "Version from second tab");
      assert.match(
        await other.locator(".save-state").innerText(),
        /Saved recovery copy/,
      );
      await other.locator('[data-action="drafts"]').click();
      const copies = other.locator('[data-draft^="recovery:"]');
      assert.equal(await copies.count(), 2);
      const labels = await copies.allInnerTexts();
      assert.ok(labels.some((text) => text.includes("Version from first tab")));
      assert.ok(
        labels.some((text) => text.includes("Version from second tab")),
      );
      await copies.filter({ hasText: "Version from first tab" }).click();
      await other.waitForFunction(
        (id) => window.__drawnToGenerator.draftId !== id,
        id,
      );
      assert.equal(
        await other.locator(".draft-name").innerText(),
        "Version from first tab",
      );
    },
  );

  await checkpoint(
    "Recent drafts opens a sole newer saved revision instead of stale tab memory",
    async (track) => {
      const { context, page } = await fixture("?example=particle-orb");
      track(page);
      await rename(page, "Original cached revision");
      const id = await page.evaluate(() => window.__drawnToGenerator.draftId);
      const stale = await context.newPage();
      await stale.goto(base.href);
      await stale.waitForFunction(
        () => window.__drawnToGenerator?.sceneCount === 70,
      );
      await stale.locator('[data-action="drafts"]').click();
      await stale.locator(`[data-draft="${id}"]`).click();
      await stale.waitForFunction(
        (id) => window.__drawnToGenerator.draftId === id,
        id,
      );
      assert.equal(
        await stale.locator(".draft-name").innerText(),
        "Original cached revision",
      );
      const alternativeColor = catalog.scenes.find(
        (scene) => scene.defaults.color && scene.id !== "plasma-study",
      );
      assert.ok(
        alternativeColor,
        "Catalog has another selectable color source",
      );
      await rename(page, "Latest saved revision");
      await pick(page, alternativeColor.id, "color");
      const latest = (await share(page, true)).payload;
      await stale.waitForFunction(() =>
        document
          .querySelector(".studio-notice")
          .textContent.includes("changed in another tab"),
      );
      await stale.locator('[data-action="drafts"]').click();
      assert.equal(await stale.locator('[data-draft^="recovery:"]').count(), 0);
      assert.match(
        await stale.locator(`[data-draft="${id}"]`).innerText(),
        /Latest saved revision/,
      );
      await stale.locator(`[data-draft="${id}"]`).click();
      await stale.waitForFunction(
        () =>
          document.querySelector(".draft-name")?.textContent ===
          "Latest saved revision",
      );
      assert.equal(
        await stale.evaluate(() => window.__drawnToGenerator.draftId),
        id,
      );
      assert.deepEqual((await share(stale, true)).payload, latest);
      assert.equal(
        await stale.locator(".save-state").innerText(),
        "Saved locally",
      );
      await stale.locator('[data-action="drafts"]').click();
      assert.equal(await stale.locator('[data-draft^="recovery:"]').count(), 0);
      assert.equal(await stale.locator(`[data-draft="${id}"]`).count(), 1);
      await dismiss(stale);
      await stale.reload();
      await stale.waitForFunction(
        () => window.__drawnToGenerator?.sceneCount === 70,
      );
      assert.equal(
        await stale.evaluate(() => window.__drawnToGenerator.draftId),
        id,
      );
      assert.deepEqual((await share(stale, true)).payload, latest);
    },
  );

  await checkpoint(
    "Malformed and unsupported share recovery, oversize sharing and invalid JSON stay recoverable",
    async (track) => {
      const { context, page } = await fixture("?example=particle-orb");
      track(page);
      const payload = (await share(page)).payload;
      const invalid = await context.newPage();
      await invalid.goto(new URL("#d=malformed", base).href);
      await invalid
        .getByRole("heading", { name: "We could not open this direction." })
        .waitFor();
      await invalid
        .getByRole("button", { name: "Open the current library" })
        .click();
      await invalid.waitForFunction(
        () => window.__drawnToGenerator?.sceneCount === 70,
      );
      const unsupported = { ...payload, catalogId: "unavailable-catalog" };
      await invalid.goto("about:blank");
      await invalid.goto(
        new URL(
          "#d=" +
            Buffer.from(JSON.stringify(unsupported)).toString("base64url"),
          base,
        ).href,
      );
      await invalid
        .getByRole("heading", { name: "We could not open this direction." })
        .waitFor();
      assert.equal(
        await invalid
          .getByRole("button", { name: "Download original direction" })
          .isVisible(),
        true,
      );
      await page.locator('[data-action="context"]').click();
      await page
        .locator('textarea[name="intent"]')
        .fill("Long project context ".repeat(500));
      await page.getByRole("button", { name: /Save context/ }).click();
      await page.locator("dialog").waitFor({ state: "detached" });
      await page.locator('[data-action="share"]').click();
      await page.locator("[data-context]").check();
      assert.match(
        await page.locator("#share-url").inputValue(),
        /too large for a link/,
      );
      assert.equal(await page.locator("dialog [data-copy]").isDisabled(), true);
      assert.equal(await page.locator("[data-download]").isEnabled(), true);
      await dismiss(page);
      const id = await page.evaluate(() => window.__drawnToGenerator.draftId);
      await page.locator('[data-action="drafts"]').click();
      await page
        .locator("[data-file]")
        .setInputFiles({
          name: "invalid.json",
          mimeType: "application/json",
          buffer: Buffer.from("{broken"),
        });
      await page.waitForFunction(() =>
        document
          .querySelector(".dialog-status")
          .textContent.includes("Could not import"),
      );
      assert.equal(
        await page.evaluate(() => window.__drawnToGenerator.draftId),
        id,
      );
    },
  );

  await checkpoint(
    "Desktop, short desktop, phone and 320px reflow with accessible mobile operations",
    async (track) => {
      const { page } = await fixture("?example=particle-orb");
      track(page);
      for (const [width, height] of [
        [1440, 900],
        [1280, 720],
        [390, 844],
        [320, 844],
      ]) {
        await page.setViewportSize({ width, height });
        await page.evaluate(() => window.scrollTo(0, 0));
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${width}px document horizontal overflow`,
        );
        await shot(page, `sources-${width}x${height}`);
        if (width < 600) {
          for (const name of ["Sources", "Direction", "Prompt"])
            assert.equal(
              await page
                .getByRole("navigation", { name: "Studio views" })
                .getByRole("button", { name: new RegExp("^" + name) })
                .isVisible(),
              true,
            );
          assert.equal(
            await page.locator('[data-action="rename"]').isVisible(),
            true,
          );
          await page.locator('[data-mobile-view="direction"]').click();
          assert.equal(
            await page.locator(".direction-panel").isVisible(),
            true,
          );
          await shot(page, `direction-${width}x${height}`);
          await rename(page, "Mobile direction");
          assert.equal(
            await page.locator(".draft-name").innerText(),
            "Mobile direction",
          );
          await page
            .locator('.mobile-studio-nav [data-action="prompt"]')
            .click();
          assert.ok(
            (await page.locator("#direction-prompt").inputValue()).includes(
              "references/generator-handoff.md",
            ),
          );
          assert.ok(
            await page
              .locator("dialog")
              .evaluate(
                (node) => node.getBoundingClientRect().right <= innerWidth,
              ),
          );
          await shot(page, `prompt-${width}x${height}`);
          await dismiss(page);
          await page.locator('[data-mobile-view="sources"]').click();
          assert.equal(await page.locator(".source-browser").isVisible(), true);
        } else {
          const rect = await page.locator(".direction-export").boundingBox();
          assert.ok(
            rect.y + rect.height <= height + 1,
            "Export remains visible in desktop viewport",
          );
        }
      }
      await page.setViewportSize({ width: 640, height: 450 });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        "200% desktop-equivalent CSS viewport reflows",
      );
      await shot(page, "reflow-200percent-equivalent");
    },
  );
  assert.equal(
    (await (await fetch(new URL("/data/generator/index.json", base))).json())
      .current,
    catalog.id,
    "Catalog changed during verification; rerun against the completed build",
  );
  assert.deepEqual(
    report.errors,
    [],
    "No runtime exceptions across verified pages",
  );
} catch (error) {
  report.fatal = error.stack;
} finally {
  await browser.close();
  report.passed =
    report.checks.every((check) => check.status === "passed") &&
    !report.fatal &&
    report.errors.length === 0;
  await writeFile(
    resolve(output, "report.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
}
console.log(
  JSON.stringify(
    {
      passed: report.passed,
      checks: report.checks.map(({ name, status, error, screenshot }) => ({
        name,
        status,
        ...(error ? { error: error.split("\n")[0], screenshot } : {}),
      })),
      errors: report.errors,
      report: resolve(output, "report.json"),
    },
    null,
    2,
  ),
);
if (!report.passed) process.exitCode = 1;
