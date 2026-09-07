/** Browser verification; install Playwright separately. See docs/showcase.md. */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { createRequire } from 'node:module';
import { verifyAtelier } from './verify-atelier.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.argv[2] || 'http://127.0.0.1:8757/';
const reportPath = process.argv[3] || '.eval-output/showcase-verification.json';
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_EXECUTABLE ? { executablePath: process.env.CHROME_EXECUTABLE } : {})
});
const report = { date: new Date().toISOString(), browser: browser.version(), checks: [] };
const gpuPages = ['glass-identity', 'physical-schedule', 'iridescent-ribbon', 'particle-assembly', 'material-study'];

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  const failedResources = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400&&!response.url().endsWith('/favicon.ico'))failedResources.push({url:response.url(),status:response.status()});});
  page.on('console',message=>{if(message.type()==='error'&&/THREE|GLSL|WebGLProgram|shader/i.test(message.text()))errors.push(message.text());});
  const visit = async (id, extra = '') => {
    await page.goto(`${base}?v=${id}&still${extra}`);
    await page.waitForFunction(id => document.querySelector('#app').dataset.mounted === id, id);
    assert.equal(await page.locator('[data-render-error], [data-mount-error]').count(), 0);
  };

  await visit('a');
  const pages = await page.evaluate(() => [...ORDER]);
  assert.equal(pages.length, 70);
  assert.equal(new Set(pages).size,70);
  assert.deepEqual(pages.slice(0,4),['auric-orbit','cloud-chamber','camera-obscura','phosphor-field']);
  for (const id of pages) {
    await visit(id, '&t=0');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, id);
  }
  report.checks.push('All 70 unique routes render without horizontal overflow at 1440x900');

  await visit('action-result');
  await page.locator('#xi-project').focus();
  await page.keyboard.press('ArrowLeft');
  assert.equal(await page.evaluate(() => document.documentElement.dataset.variant), 'action-result');
  await page.locator('#xi-project').fill('Aster House');
  await page.getByRole('button', { name: 'Warm', exact: true }).click();
  assert.equal(await page.locator('[data-ui="project-name"]').innerText(), 'Aster House');
  await page.locator('body').click({ position: { x: 15, y: 15 } });
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.documentElement.dataset.variant === 'glass-identity');
  assert.ok(page.url().includes('v=glass-identity'));
  await page.reload();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.variant), 'glass-identity');
  report.checks.push('Form keys stay local; action preview, catalog navigation and reload preserve state');

  await visit('a');
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true, value: { writeText: async () => { throw Error('denied'); } }
  }));
  await page.locator('.copy').first().click();
  await page.waitForFunction(() => document.querySelector('#live').textContent.includes('Could not copy'));
  assert.notEqual(await page.locator('.copy').first().getAttribute('data-state'), 'done');
  assert.equal(await page.locator('.install-dialog textarea').inputValue(), 'npx skills add Stianlars1/drawn-to');
  await page.keyboard.press('Escape');
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true, value: { writeText: async text => { window.__copied = text; } }
  }));
  await page.locator('.copy').first().click();
  await page.waitForFunction(() => document.querySelector('.copy').dataset.state === 'done');
  assert.match(await page.evaluate(() => window.__copied), /npx skills add/);
  assert.equal(await page.locator('.copy').first().getAttribute('aria-label'),'Copy install command');
  report.checks.push('Clipboard failure and success feedback reflect the actual outcome');

  for (const id of gpuPages) {
    await visit(id);
    await page.evaluate(() => { window.__previousGPU = document.querySelector('[data-model-host]').__gpuState; });
    await page.evaluate(() => { idx = ORDER.indexOf('scenic-close'); render('scenic-close'); });
    await page.waitForFunction(() => document.querySelector('#app').dataset.mounted === 'scenic-close');
    const frame = await page.evaluate(() => window.__previousGPU.frames);
    await page.waitForTimeout(120);
    const state = await page.evaluate(() => window.__previousGPU);
    assert.equal(state.disposed, true, id);
    assert.equal(state.frames, frame, id);
    assert.equal(await page.locator('canvas').count(), 0, id);
  }
  await page.evaluate(() => {
    for (const id of ['glass-identity', 'iridescent-ribbon', 'particle-assembly', 'material-study', 'action-result']) {
      idx = ORDER.indexOf(id); render(id);
    }
  });
  await page.waitForFunction(() => document.querySelector('#app').dataset.mounted === 'action-result');
  await page.waitForTimeout(200);
  assert.equal(await page.locator('canvas').count(), 0);
  report.checks.push('All five GPU scenes stop and dispose; rapid navigation leaves no late canvas');

  await visit('particle-assembly');
  report.particleBackend = await page.locator('[data-model-host]').getAttribute('data-backend');
  if (process.env.EXPECT_WEBGPU === '1') assert.equal(report.particleBackend, 'webgpu');
  await page.getByRole('button', { name: 'Release', exact: true }).click();
  await page.waitForTimeout(600);
  assert.ok(await page.locator('[data-model-host]').evaluate(e => e.__gpuState.progress < .35));
  await visit('particle-assembly', '&gpu=webgl');
  assert.equal(await page.locator('[data-model-host]').getAttribute('data-backend'), 'webgl2');
  report.checks.push('Particle release changes the field; forced WebGL2 backend renders');

  for (const [id, choice, suffix] of [['material-study', 'Glass', 'glass'], ['particle-assembly', 'Release', 'release']]) {
    await visit(id, '&gpu=off');
    assert.equal(await page.locator('canvas').count(), 0);
    await page.getByRole('button', { name: choice, exact: true }).click();
    const poster = page.locator('.xp-gpu-poster');
    await poster.evaluate(image => image.decode());
    assert.ok((await poster.getAttribute('src')).includes(suffix));
  }
  report.checks.push('Poster-only material and particle controls switch to decoded matching stills');

  await visit('iridescent-ribbon');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(250);
  assert.equal(await page.locator('#chrome .tog').count(), 0);
  const frame = await page.locator('[data-model-host]').evaluate(e => e.__gpuState.frames);
  await page.waitForTimeout(150);
  assert.equal(await page.locator('[data-model-host]').evaluate(e => e.__gpuState.frames), frame);
  report.checks.push('Changing reduced motion while the scene is open stops rendering');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await verifyAtelier({page,visit,base,browser,report});
  await context.close();

  const saveContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await saveContext.addInitScript(() => Object.defineProperty(navigator, 'connection', {
    configurable: true, value: { saveData: true }
  }));
  const saved = await saveContext.newPage();
  await saved.goto(`${base}?v=material-study&still`);
  await saved.waitForFunction(() => document.querySelector('#app').dataset.mounted === 'material-study');
  assert.equal(await saved.locator('canvas').count(), 0);
  await saved.getByRole('button', { name: 'Metal', exact: true }).click();
  await saved.locator('.xp-gpu-poster').evaluate(image => image.decode());
  await saveContext.close();
  report.checks.push('Mobile Save-Data uses a usable poster without a renderer');
  assert.deepEqual(errors, []);
  assert.deepEqual(failedResources, []);
  report.errors = errors;
  report.failedResources = failedResources;
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
