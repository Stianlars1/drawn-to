/** Controlled delayed I/O against the real generator, with no production test hooks. */
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    "/Users/stian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);
const base = new URL(process.argv[2] || "http://127.0.0.1:56505/generator");
const output = resolve(process.argv[3] || ".eval-output/generator-races");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.CHROME_EXECUTABLE ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const report = {
  date: new Date().toISOString(),
  browser: browser.version(),
  base: base.href,
  checks: [],
  errors: [],
};
const manifest = await (
  await fetch(new URL("/data/generator/index.json", base))
).json();
const originalCatalog = await (
  await fetch(
    new URL(manifest.catalogs[manifest.current].url, new URL("/", base)),
  )
).json();
report.catalogId = originalCatalog.id;
const { id: originalCatalogId, ...changedContent } =
  structuredClone(originalCatalog);
const changedShape = changedContent.scenes.find(
  (scene) => scene.id === "plasma-study",
).defaults.shape;
changedContent.properties[changedShape].text +=
  " Updated migration-test shape evidence.";
const changedCatalog = {
  id: createHash("sha256")
    .update(JSON.stringify(changedContent))
    .digest("hex")
    .slice(0, 20),
  ...changedContent,
};
const changedURL = `data/generator/catalogs/${changedCatalog.id}.json`;
async function fixture({ older = false } = {}) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await context.addInitScript(() => {
    const original = File.prototype.text;
    window.pendingReads = [];
    File.prototype.text = function () {
      if (this.name.startsWith("slow"))
        return new Promise((resolve, reject) => {
          window.pendingReads.push(() =>
            original.call(this).then(resolve, reject),
          );
        });
      return original.call(this);
    };
    window.copiedURLs = [];
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: (text) =>
          new Promise((resolve) => {
            window.copiedURLs.push(text);
            window.releaseCopy = resolve;
          }),
      },
    });
  });
  let releaseCatalog,
    catalogRequested = false;
  const catalogGate = new Promise((resolve) => {
    releaseCatalog = resolve;
  });
  await context.route("**/data/generator/index.json", (route) =>
    route.fulfill({
      json: {
        ...manifest,
        current: older ? changedCatalog.id : manifest.current,
        catalogs: {
          ...manifest.catalogs,
          [changedCatalog.id]: { url: changedURL },
        },
      },
    }),
  );
  await context.route(`**/${changedURL}`, async (route) => {
    catalogRequested = true;
    await catalogGate;
    await route.fulfill({ json: changedCatalog });
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => report.errors.push(error.message));
  page.setDefaultTimeout(8000);
  const url = new URL(base);
  if (older)
    url.hash =
      "d=" +
      Buffer.from(
        JSON.stringify({
          format: "drawn-to-direction",
          schema: 1,
          catalogId: originalCatalogId,
          scope: "graphic",
          targets: [
            {
              id: "main",
              kind: "graphic",
              baseScene: "plasma-study",
              choices: {},
            },
          ],
        }),
      ).toString("base64url");
  await page.goto(url.href);
  await page.waitForFunction(() => window.__drawnToGenerator);
  return {
    context,
    page,
    releaseCatalog,
    catalogRequested: () => catalogRequested,
  };
}
async function dismiss(page) {
  await page.keyboard.press("Escape");
  await page.locator("dialog[open]").waitFor({ state: "detached" });
}
async function payload(page) {
  await page.locator('[data-action="share"]').click();
  const url = await page.locator("#share-url").inputValue();
  await dismiss(page);
  return JSON.parse(
    Buffer.from(new URL(url).hash.slice(3), "base64url").toString(),
  );
}
async function beginImport(page, data, filename = "slow.json") {
  await page.locator('[data-action="drafts"]').click();
  await page.locator("[data-file]").setInputFiles({
    name: filename,
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(data)),
  });
  if (filename.startsWith("slow"))
    await page.waitForFunction(() => window.pendingReads.length);
}
async function waitForCatalog(setup) {
  const deadline = Date.now() + 8000;
  while (!setup.catalogRequested() && Date.now() < deadline)
    await new Promise((resolve) => setTimeout(resolve, 10));
  assert.ok(setup.catalogRequested(), "Expected the delayed catalog request");
}
async function drain(page) {
  await page.evaluate(async () => {
    await window.pendingReads.shift()();
  });
  // Browser event continuation + catalog read/validation must have time to settle.
  await page.waitForTimeout(250);
}
async function run(name, fn, options) {
  const setup = await fixture(options);
  const { context, page } = setup;
  try {
    await fn(page, setup);
    report.checks.push({ name, passed: true });
    console.log("PASS " + name);
  } catch (error) {
    await page.screenshot({
      path: resolve(output, `failure-${report.checks.length}.png`),
    });
    report.checks.push({ name, passed: false, error: error.stack });
    console.error("FAIL " + name + ": " + error.message);
  } finally {
    await context.close();
  }
}
try {
  await run(
    "delayed import cannot replace a newly created direction or close its dialog",
    async (page) => {
      const originalId = await page.evaluate(
        () => window.__drawnToGenerator.draftId,
      );
      const data = { ...(await payload(page)), name: "Stale import" };
      await beginImport(page, data);
      await page.locator("[data-new]").click();
      await page
        .getByRole("button", { name: "Create direction", exact: false })
        .click();
      const latestId = await page.evaluate(
        () => window.__drawnToGenerator.draftId,
      );
      assert.notEqual(latestId, originalId);
      await page.locator('[data-action="share"]').click();
      await drain(page);
      assert.equal(
        await page.evaluate(() => window.__drawnToGenerator.draftId),
        latestId,
      );
      assert.equal(await page.locator("#share-url").count(), 1);
      await dismiss(page);
      await page.locator('[data-action="drafts"]').click();
      assert.equal(
        await page.locator(`[data-draft="${originalId}"]`).count(),
        1,
      );
      assert.equal(await page.locator(`[data-draft="${latestId}"]`).count(), 1);
    },
  );
  await run("newer import wins over an older delayed import", async (page) => {
    const data = await payload(page);
    await beginImport(page, { ...data, name: "Stale import" });
    await page.locator("[data-file]").setInputFiles({
      name: "newer.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ ...data, name: "Newest import" })),
    });
    await page
      .getByRole("button", { name: "Newest import", exact: true })
      .waitFor();
    const latestId = await page.evaluate(
      () => window.__drawnToGenerator.draftId,
    );
    await drain(page);
    assert.equal(
      await page.evaluate(() => window.__drawnToGenerator.draftId),
      latestId,
    );
    assert.equal(
      await page.locator(".draft-name").innerText(),
      "Newest import",
    );
  });
  await run(
    "ordinary edit cancels pending import and preserves its saved draft",
    async (page) => {
      const originalId = await page.evaluate(
        () => window.__drawnToGenerator.draftId,
      );
      await beginImport(page, {
        ...(await payload(page)),
        name: "Stale import",
      });
      await dismiss(page);
      await page.locator('[data-action="rename"]').click();
      await page.locator('dialog input[name="name"]').fill("Latest edit");
      await page
        .getByRole("button", { name: "Save name", exact: true })
        .click();
      await drain(page);
      assert.equal(
        await page.evaluate(() => window.__drawnToGenerator.draftId),
        originalId,
      );
      assert.equal(
        await page.locator(".draft-name").innerText(),
        "Latest edit",
      );
    },
  );
  await run("opening a local draft supersedes pending import", async (page) => {
    const originalId = await page.evaluate(
      () => window.__drawnToGenerator.draftId,
    );
    await beginImport(page, { ...(await payload(page)), name: "Stale import" });
    await page.locator(`[data-draft="${originalId}"]`).click();
    await page.locator("dialog[open]").waitFor({ state: "detached" });
    await drain(page);
    assert.equal(
      await page.evaluate(() => window.__drawnToGenerator.draftId),
      originalId,
    );
    assert.notEqual(
      await page.locator(".draft-name").innerText(),
      "Stale import",
    );
  });
  await run(
    "delayed import catalog lookup cannot replace a later edit",
    async (page, setup) => {
      const originalId = await page.evaluate(
        () => window.__drawnToGenerator.draftId,
      );
      await beginImport(
        page,
        {
          ...(await payload(page)),
          catalogId: changedCatalog.id,
          name: "Stale catalog import",
        },
        "catalog.json",
      );
      await waitForCatalog(setup);
      await dismiss(page);
      await page.locator('[data-action="rename"]').click();
      await page
        .locator('dialog input[name="name"]')
        .fill("Edited during catalog lookup");
      await page
        .getByRole("button", { name: "Save name", exact: true })
        .click();
      setup.releaseCatalog();
      await page.waitForTimeout(250);
      assert.equal(
        await page.evaluate(() => window.__drawnToGenerator.draftId),
        originalId,
      );
      assert.equal(
        await page.locator(".draft-name").innerText(),
        "Edited during catalog lookup",
      );
    },
  );
  await run(
    "delayed update review cannot open over a newly created direction",
    async (page, setup) => {
      await page
        .getByRole("button", { name: "Review update", exact: true })
        .click();
      await waitForCatalog(setup);
      await page.locator('[data-action="new"]').click();
      await page
        .getByRole("button", { name: "Create direction", exact: false })
        .click();
      const latestId = await page.evaluate(
        () => window.__drawnToGenerator.draftId,
      );
      setup.releaseCatalog();
      await page.waitForTimeout(250);
      assert.equal(
        await page.evaluate(() => window.__drawnToGenerator.draftId),
        latestId,
      );
      assert.equal(await page.locator("dialog[open]").count(), 0);
    },
    { older: true },
  );
  await run(
    "migration review visibly discloses inherited same-ID contract changes",
    async (page, setup) => {
      const originalId = await page.evaluate(
        () => window.__drawnToGenerator.draftId,
      );
      setup.releaseCatalog();
      await page
        .getByRole("button", { name: "Review update", exact: true })
        .click();
      await page
        .getByRole("dialog", { name: "Review library update" })
        .waitFor();
      assert.match(
        await page.locator("dialog ul").innerText(),
        /shape contract or supporting source evidence has changed/,
      );
      await page
        .getByRole("button", { name: "Create updated copy", exact: true })
        .click();
      await page.waitForFunction(
        (id) => window.__drawnToGenerator.catalogId === id,
        changedCatalog.id,
      );
      assert.notEqual(
        await page.evaluate(() => window.__drawnToGenerator.draftId),
        originalId,
      );
      await page.locator('[data-action="drafts"]').click();
      assert.equal(
        await page.locator(`[data-draft="${originalId}"]`).count(),
        1,
      );
    },
    { older: true },
  );
  await run(
    "pending clipboard freezes privacy options; oversize guard survives completion",
    async (page) => {
      await page.locator('[data-action="context"]').click();
      await page
        .locator('textarea[name="intent"]')
        .fill("PRIVATE CONTEXT ".repeat(800));
      await page
        .getByRole("button", { name: "Save context", exact: false })
        .click();
      await page.locator('[data-action="share"]').click();
      const preview = await page.locator("#share-url").inputValue();
      await page.locator("dialog [data-copy]").click();
      assert.equal(await page.locator("[data-context]").isDisabled(), true);
      await page.locator("[data-context]").evaluate((node) => node.click());
      assert.equal(await page.locator("[data-context]").isChecked(), false);
      assert.equal(await page.locator("#share-url").inputValue(), preview);
      await page.evaluate(() => window.releaseCopy());
      await page
        .getByRole("button", { name: "Link copied", exact: true })
        .waitFor();
      assert.deepEqual(await page.evaluate(() => window.copiedURLs), [preview]);
      await page.locator("[data-context]").check();
      assert.equal(await page.locator("dialog [data-copy]").isDisabled(), true);
      assert.doesNotMatch(
        await page.locator("dialog [data-copy]").innerText(),
        /copied/i,
      );
      assert.match(await page.locator(".dialog-status").innerText(), /limit/i);
      await page.locator("dialog [data-copy]").evaluate((node) => {
        node.disabled = false;
        node.click();
      });
      assert.equal(
        await page.evaluate(() => window.copiedURLs.length),
        1,
        "handler must guard oversize even if button is enabled",
      );
    },
  );
  await run(
    "late clipboard completion does not write into a replacement dialog",
    async (page) => {
      await page.locator('[data-action="share"]').click();
      await page.locator("dialog [data-copy]").click();
      await dismiss(page);
      await page.locator('[data-action="context"]').click();
      await page.evaluate(() => window.releaseCopy());
      await page.waitForTimeout(50);
      assert.equal(await page.locator(".dialog-status").innerText(), "");
      assert.equal(
        await page.locator('dialog textarea[name="intent"]').count(),
        1,
      );
    },
  );
} finally {
  await browser.close();
  await writeFile(
    resolve(output, "report.json"),
    JSON.stringify(report, null, 2),
  );
}
if (report.errors.length || report.checks.some((check) => !check.passed))
  process.exitCode = 1;
