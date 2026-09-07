/** Focused Firefox and WebKit acceptance checks for the Drawn To generator. */
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const playwright = require(
  process.env.PLAYWRIGHT_MODULE ||
    "/Users/stian/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);
const base = new URL(process.argv[2] || "http://127.0.0.1:56505/generator");
const output = resolve(process.argv[3] || ".eval-output/generator-engines");
await mkdir(output, { recursive: true });

const manifest = await (
  await fetch(new URL("/data/generator/index.json", base))
).json();
const catalog = await (
  await fetch(
    new URL(manifest.catalogs[manifest.current].url, new URL("/", base)),
  )
).json();
assert.equal(
  catalog.id,
  manifest.current,
  "Loaded catalog must be the current catalog",
);

const scene = (id) => catalog.scenes.find((item) => item.id === id);
const selected = {
  shape: scene("plasma-study").defaults.shape,
  color: scene("plasma-study").defaults.color,
  graphics: scene("particle-assembly").defaults.graphics,
};
const selectedIds = Object.values(selected).sort();
const openRoles = ["layout", "typography", "motion"];
const report = {
  date: new Date().toISOString(),
  base: base.href,
  catalogId: catalog.id,
  sceneCount: catalog.scenes.length,
  engines: {},
};

function decodeShare(url) {
  return JSON.parse(
    Buffer.from(new URL(url).hash.slice(3), "base64url").toString("utf8"),
  );
}

async function dismiss(page) {
  if (await page.locator("dialog[open]").count()) {
    await page.keyboard.press("Escape");
    await page.locator("dialog").waitFor({ state: "detached" });
  }
}

async function share(page) {
  await page.locator('[data-action="share"]').click();
  const url = await page.locator("#share-url").inputValue();
  const payload = decodeShare(url);
  await dismiss(page);
  return { url, payload };
}

async function rename(page, name) {
  await page.locator('[data-action="rename"]').click();
  await page.locator('dialog input[name="name"]').fill(name);
  await page.getByRole("button", { name: "Save name", exact: true }).click();
  await page.locator("dialog").waitFor({ state: "detached" });
}

async function pick(page, sceneId, role) {
  await page.locator('[data-mode="parts"]').click();
  await page.locator(`.role-filters [data-role="${role}"]`).click();
  await page.locator('input[type="search"]').fill(sceneId);
  await page.locator(`[data-select="${sceneId}"]`).click();
}

async function roleCommand(page, role, command) {
  const row = page.locator(`[data-role-details="${role}"]`);
  if ((await row.getAttribute("open")) === null)
    await row.locator("summary").click();
  await row.locator(`[data-command="${command}"]`).click();
}

async function saveScreenshot(engineReport, page, name) {
  const path = resolve(output, `${engineReport.id}-${name}.png`);
  await page.screenshot({ path, fullPage: false });
  engineReport.screenshots.push(path);
  return path;
}

async function verifyNoOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({
    innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  assert.ok(
    dimensions.scrollWidth <= dimensions.innerWidth,
    `${label} overflows horizontally: ${JSON.stringify(dimensions)}`,
  );
}

async function focusRestored(page, locator) {
  const element = await locator.elementHandle();
  try {
    await page.waitForFunction(
      (trigger) => trigger === document.activeElement,
      element,
      { timeout: 1_000 },
    );
    return true;
  } catch {
    return false;
  } finally {
    await element?.dispose();
  }
}

async function runEngine(id, browserType) {
  const engineReport = {
    id,
    label: id === "webkit" ? "WebKit" : "Firefox",
    checks: [],
    pageErrors: [],
    findings: [],
    screenshots: [],
    clipboard: null,
  };
  report.engines[id] = engineReport;
  const browser = await browserType.launch({ headless: true });
  engineReport.browserVersion = browser.version();
  const contexts = [];

  async function pageAt(viewport, query = "") {
    const context = await browser.newContext({
      viewport,
      reducedMotion: "reduce",
    });
    contexts.push(context);
    const page = await context.newPage();
    page.setDefaultTimeout(12_000);
    page.on("pageerror", (error) =>
      engineReport.pageErrors.push({ url: page.url(), message: error.message }),
    );
    await page.goto(new URL(query || base.href, base).href);
    await page.waitForFunction(
      () => window.__drawnToGenerator?.sceneCount === 70,
    );
    return { context, page };
  }

  async function checkpoint(name, verify) {
    let currentPage;
    try {
      await verify((page) => {
        currentPage = page;
      });
      engineReport.checks.push({ name, status: "passed" });
      console.log(`PASS ${engineReport.label}: ${name}`);
    } catch (error) {
      const screenshot = currentPage
        ? await saveScreenshot(
            engineReport,
            currentPage,
            `failure-${engineReport.checks.length + 1}`,
          ).catch(() => null)
        : null;
      engineReport.checks.push({
        name,
        status: "failed",
        error: error.stack,
        screenshot,
      });
      console.error(`FAIL ${engineReport.label}: ${name}\n${error.stack}`);
    }
  }

  try {
    await checkpoint("desktop core flow", async (track) => {
      const { context, page } = await pageAt(
        { width: 1440, height: 900 },
        "?example=particle-orb",
      );
      track(page);
      assert.equal(
        await page.evaluate(() => window.__drawnToGenerator.catalogId),
        catalog.id,
      );
      assert.match(await page.locator(".library-total").innerText(), /^70/);
      assert.equal(
        await page.locator(".result-count").innerText(),
        "14 sources",
      );
      await verifyNoOverflow(page, "1440x900 desktop");

      const originalId = await page.evaluate(
        () => window.__drawnToGenerator.draftId,
      );
      const example = await share(page);
      assert.equal(example.payload.scope, "graphic");
      assert.equal(example.payload.targets[0].baseScene, null);
      assert.deepEqual(
        Object.values(example.payload.targets[0].choices)
          .flatMap((choice) => choice.propertyIds)
          .sort(),
        selectedIds,
      );
      for (const [role, propertyId] of Object.entries(selected)) {
        assert.equal(example.payload.targets[0].choices[role].mode, "selected");
        assert.deepEqual(example.payload.targets[0].choices[role].propertyIds, [
          propertyId,
        ]);
      }
      for (const role of openRoles) {
        assert.equal(example.payload.targets[0].choices[role].mode, "open");
        assert.match(
          await page
            .locator(`[data-role-details="${role}"] summary`)
            .innerText(),
          /Left open/,
        );
      }

      const promptTrigger = page.locator(
        '.direction-export [data-action="prompt"]',
      );
      await promptTrigger.click();
      const prompt = await page.locator("#direction-prompt").inputValue();
      assert.ok(prompt.includes("references/generator-handoff.md"));
      assert.ok(prompt.includes("CONTINUE THROUGH DRAWN TO"));
      for (const propertyId of selectedIds) {
        const property = catalog.properties[propertyId];
        assert.ok(prompt.includes(propertyId), `Prompt contains ${propertyId}`);
        assert.ok(
          prompt.includes(property.path),
          `Prompt contains ${property.path}`,
        );
        assert.ok(
          prompt.includes(`property key ${JSON.stringify(property.key)}`),
          `Prompt contains the exact key for ${propertyId}`,
        );
      }
      await page.locator("dialog [data-copy]").click();
      await page.waitForFunction(() =>
        Boolean(document.querySelector(".dialog-status")?.textContent.trim()),
      );
      const clipboardStatus = await page.locator(".dialog-status").innerText();
      if (/Could not copy/.test(clipboardStatus)) {
        const fallback = await page
          .locator("#direction-prompt")
          .evaluate((node) => {
            node.focus();
            node.select();
            return {
              readonly: node.readOnly,
              valueLength: node.value.length,
              selectionStart: node.selectionStart,
              selectionEnd: node.selectionEnd,
            };
          });
        assert.equal(fallback.readonly, true);
        assert.equal(fallback.valueLength, prompt.length);
        assert.equal(fallback.selectionStart, 0);
        assert.equal(fallback.selectionEnd, prompt.length);
        engineReport.clipboard = {
          outcome: "denied-or-unavailable",
          uiStatus: clipboardStatus,
          manualFallback: "readonly prompt retained and fully selectable",
        };
      } else {
        assert.match(clipboardStatus, /Prompt copied/);
        engineReport.clipboard = {
          outcome: "ui-reported-success",
          uiStatus: clipboardStatus,
          verification:
            "write-only result; clipboard read permission was not requested",
        };
      }
      await dismiss(page);
      if (!(await focusRestored(page, promptTrigger))) {
        engineReport.findings.push({
          id: "prompt-focus-restoration",
          viewport: "1440x900",
          expected: "focus returns to Review prompt",
          actual: await page.evaluate(() => ({
            tag: document.activeElement?.tagName,
            className: document.activeElement?.className,
          })),
        });
      }

      await page.locator('[data-mode="scene"]').click();
      await page.locator('input[type="search"]').fill("plasma-study");
      const inspectTrigger = page.locator(
        '.source-grid [data-inspect="plasma-study"]',
      );
      await inspectTrigger.click();
      assert.equal(await page.locator("dialog[open]").count(), 1);
      assert.equal(
        await page.locator("dialog").getAttribute("aria-labelledby"),
        "studio-dialog-title",
      );
      assert.equal(
        await page.locator("#studio-dialog-title").innerText(),
        scene("plasma-study").name,
      );
      assert.equal(
        await page
          .locator("dialog")
          .evaluate((node) => node.contains(document.activeElement)),
        true,
      );
      assert.equal(await page.locator("iframe").count(), 0);
      await page.locator("[data-live]").click();
      await page.locator("iframe.live-scene").waitFor();
      assert.equal(await page.locator("iframe").count(), 1);
      await dismiss(page);
      assert.equal(await page.locator("iframe").count(), 0);
      if (!(await focusRestored(page, inspectTrigger))) {
        engineReport.findings.push({
          id: "inspector-focus-restoration",
          viewport: "1440x900",
          expected: "focus returns to the Plasma study inspector trigger",
          actual: await page.evaluate(() => ({
            tag: document.activeElement?.tagName,
            className: document.activeElement?.className,
          })),
        });
      }

      const alternateColor = catalog.scenes.find(
        (item) => item.defaults.color && item.id !== "plasma-study",
      );
      assert.ok(
        alternateColor,
        "Catalog contains an alternate selectable color source",
      );
      await pick(page, alternateColor.id, "color");
      await roleCommand(page, "motion", "exclude");
      const changed = await share(page);
      assert.deepEqual(changed.payload.targets[0].choices.color.propertyIds, [
        alternateColor.defaults.color,
      ]);
      assert.equal(changed.payload.targets[0].choices.motion.mode, "excluded");

      const privateName = `${engineReport.label} private direction 913`;
      const privateContext = `${engineReport.label} private context 427`;
      await rename(page, privateName);
      await page.locator('[data-action="context"]').click();
      await page.locator('textarea[name="product"]').fill(privateContext);
      await page.getByRole("button", { name: /Save context/ }).click();
      await page.locator("dialog").waitFor({ state: "detached" });
      const privateShare = await share(page);
      assert.ok(!JSON.stringify(privateShare.payload).includes(privateName));
      assert.ok(!JSON.stringify(privateShare.payload).includes(privateContext));
      const received = await context.newPage();
      received.on("pageerror", (error) =>
        engineReport.pageErrors.push({
          url: received.url(),
          message: error.message,
        }),
      );
      await received.goto(privateShare.url);
      await received.waitForFunction(
        () => window.__drawnToGenerator?.sceneCount === 70,
      );
      const receivedId = await received.evaluate(
        () => window.__drawnToGenerator.draftId,
      );
      assert.notEqual(receivedId, originalId);
      assert.equal(
        await received.evaluate(() => window.__drawnToGenerator.catalogId),
        catalog.id,
      );
      assert.deepEqual(
        (await share(received)).payload.targets[0].choices,
        privateShare.payload.targets[0].choices,
      );

      await saveScreenshot(engineReport, page, "desktop-1440x900");
      assert.deepEqual(
        engineReport.findings,
        [],
        "Dialog focus must restore to each trigger",
      );
    });

    await checkpoint("mobile navigation and rename", async (track) => {
      const findingsBefore = engineReport.findings.length;
      const { page } = await pageAt(
        { width: 390, height: 844 },
        "?example=particle-orb",
      );
      track(page);
      assert.match(await page.locator(".library-total").innerText(), /^70/);
      assert.equal(
        await page.locator(".result-count").innerText(),
        "14 sources",
      );
      await verifyNoOverflow(page, "390x844 sources");
      const nav = page.getByRole("navigation", { name: "Studio views" });
      for (const name of ["Sources", "Direction", "Prompt"]) {
        assert.equal(
          await nav
            .getByRole("button", { name: new RegExp(`^${name}`) })
            .isVisible(),
          true,
        );
      }
      assert.equal(await page.locator(".source-browser").isVisible(), true);
      assert.equal(
        await page
          .locator('.mobile-studio-nav [data-mobile-view="sources"]')
          .getAttribute("aria-pressed"),
        "true",
      );
      await saveScreenshot(engineReport, page, "mobile-sources-390x844");

      await page
        .locator('.mobile-studio-nav [data-mobile-view="direction"]')
        .click();
      assert.equal(await page.locator(".direction-panel").isVisible(), true);
      assert.equal(
        await page.locator('[data-action="rename"]').isVisible(),
        true,
      );
      const mobileName = `${engineReport.label} mobile direction`;
      await rename(page, mobileName);
      assert.equal(await page.locator(".draft-name").innerText(), mobileName);
      await verifyNoOverflow(page, "390x844 direction");
      await saveScreenshot(engineReport, page, "mobile-direction-390x844");

      const promptTrigger = page.locator(
        '.mobile-studio-nav [data-action="prompt"]',
      );
      await promptTrigger.click();
      const prompt = await page.locator("#direction-prompt").inputValue();
      for (const propertyId of selectedIds)
        assert.ok(prompt.includes(propertyId));
      assert.ok(prompt.includes("references/generator-handoff.md"));
      const dialogBounds = await page.locator("dialog").evaluate((node) => {
        const rect = node.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          viewportWidth: innerWidth,
        };
      });
      assert.ok(dialogBounds.left >= 0, JSON.stringify(dialogBounds));
      assert.ok(
        dialogBounds.right <= dialogBounds.viewportWidth,
        JSON.stringify(dialogBounds),
      );
      await verifyNoOverflow(page, "390x844 prompt");
      await saveScreenshot(engineReport, page, "mobile-prompt-390x844");
      await dismiss(page);
      if (!(await focusRestored(page, promptTrigger))) {
        engineReport.findings.push({
          id: "mobile-prompt-focus-restoration",
          viewport: "390x844",
          expected: "focus returns to the mobile Prompt trigger",
          actual: await page.evaluate(() => ({
            tag: document.activeElement?.tagName,
            className: document.activeElement?.className,
          })),
        });
      }
      await page
        .locator('.mobile-studio-nav [data-mobile-view="sources"]')
        .click();
      assert.equal(await page.locator(".source-browser").isVisible(), true);
      assert.equal(
        engineReport.findings.length,
        findingsBefore,
        "Mobile prompt focus must restore to its trigger",
      );
    });

    await checkpoint("current catalog and no page errors", async () => {
      const current = await (
        await fetch(new URL("/data/generator/index.json", base))
      ).json();
      assert.equal(current.current, catalog.id);
      assert.deepEqual(engineReport.pageErrors, []);
    });
  } finally {
    await Promise.allSettled(contexts.map((context) => context.close()));
    await browser.close();
  }
  engineReport.passed =
    engineReport.checks.every((check) => check.status === "passed") &&
    engineReport.pageErrors.length === 0;
}

for (const [id, browserType] of [
  ["firefox", playwright.firefox],
  ["webkit", playwright.webkit],
]) {
  await runEngine(id, browserType);
}

report.passed = Object.values(report.engines).every((engine) => engine.passed);
const reportPath = resolve(output, "report.json");
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      passed: report.passed,
      catalogId: report.catalogId,
      engines: Object.fromEntries(
        Object.entries(report.engines).map(([id, engine]) => [
          id,
          {
            label: engine.label,
            browserVersion: engine.browserVersion,
            passed: engine.passed,
            checks: engine.checks.map(
              ({ name, status, error, screenshot }) => ({
                name,
                status,
                ...(error ? { error: error.split("\n")[0], screenshot } : {}),
              }),
            ),
            clipboard: engine.clipboard,
            findings: engine.findings,
            pageErrors: engine.pageErrors,
          },
        ]),
      ),
      report: reportPath,
    },
    null,
    2,
  ),
);
if (!report.passed) process.exitCode = 1;
