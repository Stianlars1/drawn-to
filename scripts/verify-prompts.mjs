/** Real browser coverage for exported styles and the original scene repairs. */
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:8758/';
const reportPath=process.argv[3]||'.eval-output/prompts.json';
const browser=await chromium.launch({headless:true,...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE}:{})});
const report={date:new Date().toISOString(),browser:browser.version(),copies:[],viewports:[],checks:[]};
try{
 const context=await browser.newContext({viewport:{width:1440,height:900},permissions:['clipboard-read','clipboard-write'],reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const visit=async id=>{await page.goto(`${base}?v=${id}&still&gpu=off`);await page.waitForFunction(id=>document.querySelector('#app').dataset.mounted===id,id);};
 await visit('a');const ids=await page.evaluate(()=>[...ORDER]);assert.equal(ids.length,55);
 const copied=new Set();
 for(const id of ids){
  await visit(id);const button=page.locator('.scene-prompt-actions [data-style-copy]');
  assert.equal(await button.count(),1,id);
  await button.click();await page.waitForFunction(()=>document.querySelector('.scene-prompt-actions [data-style-copy]').dataset.copied==='true');
  const actual=await page.evaluate(()=>navigator.clipboard.readText());
  const url=await page.evaluate(id=>window.DrawnToPromptIndex[id].url,id);
  const expected=await (await context.request.get(new URL(url,base).href)).text();assert.equal(actual,expected,id);assert.ok(actual.includes('?still#'+id),id);assert.ok(actual.length>2000,id);assert.ok(!copied.has(actual));copied.add(actual);
  report.copies.push({id,characters:actual.length});
 }
 await page.locator('.scene-prompt-actions [data-style-copy]').click();
 await page.waitForTimeout(1800);
 assert.equal(await page.locator('.scene-prompt-actions [data-style-copy]').innerText(),'Copy this prompt');
 report.checks.push('All 55 header actions write their unique complete prompt to the real browser clipboard.');
 for(const [width,height]of [[1440,900],[1280,720],[390,844]]){
  await page.setViewportSize({width,height});
  for(const id of ids){await visit(id);const result=await page.evaluate(()=>{
    const elements=[...document.querySelectorAll('.scene-actions,.brand,.xp-brand')];
    const bounds=elements.map(x=>x.getBoundingClientRect());
    const actions=document.querySelector('.scene-actions').getBoundingClientRect(),brand=document.querySelector('.brand,.xp-brand').getBoundingClientRect();
    return {overflow:document.documentElement.scrollWidth>innerWidth,contained:bounds.every(r=>r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight),overlap:brand.right>actions.left};
   });assert.deepEqual(result,{overflow:false,contained:true,overlap:false},`${id} ${width}`);}
  report.viewports.push({width,height,routes:ids.length});
 }
 report.checks.push('Prompt headers fit all 55 scenes at desktop, short desktop and phone sizes.');
 await visit('optical-type');await page.locator('[data-style-preview]').click();
 const initial=await page.locator('.style-text').inputValue();await page.waitForFunction(()=>document.querySelector('.style-text').value.includes('IOR 1.48'));
 const text=await page.locator('.style-text').inputValue();assert.ok(text.includes('CanvasTexture'));assert.ok(text.includes('scenes/optical.js'));
 await page.locator('.style-text').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>document.documentElement.dataset.variant),'optical-type');
 await page.keyboard.press('Escape');assert.equal(await page.locator('.style-dialog').evaluate(x=>x.open),false);assert.equal(await page.locator('[data-style-preview]').evaluate(x=>x===document.activeElement),true);
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied')}}}));
 await page.locator('.scene-prompt-actions [data-style-copy]').click();await page.waitForFunction(()=>document.querySelector('.style-dialog').open&&!document.querySelector('.style-copy-dialog').disabled);
 assert.equal(await page.locator('.style-text').inputValue(),text);assert.match(await page.locator('.style-dialog [role=status]').innerText(),/Select and copy/);await page.keyboard.press('Escape');
 report.checks.push('Prompt preview contains the optical construction, traps reading keys, restores focus, and offers complete text when copying is denied.');
 await page.route('**/prompts/**',route=>route.fulfill({status:503,body:'Unavailable'}));await visit('paper-theatre');await page.locator('.scene-prompt-actions [data-style-copy]').click();await page.waitForFunction(()=>document.querySelector('.style-dialog [role=status]').textContent.includes('Could not load'));assert.equal(await page.locator('.style-copy-dialog').isDisabled(),true);await page.keyboard.press('Escape');await page.unroute('**/prompts/**');
 report.checks.push('Prompt loading failure is recoverable and never reports success.');
 for(const [id,selector,count]of [['j','.cell .fig',3],['k','.peb',3],['s','.slip',3],['v','.no i',10],['q','.legacy-detail',4],['D','.sk .row',8]]){
  await visit(id);assert.equal(await page.locator(selector).count(),count);
  const bounds=await page.locator(selector).evaluateAll(elements=>elements.map(el=>{const r=el.getBoundingClientRect();const header=document.querySelector('.top').getBoundingClientRect();const footer=document.querySelector('.bottom').getBoundingClientRect();return {visible:r.width>0&&r.height>0,inStage:r.top>=header.bottom-1&&r.bottom<=footer.top+1};}));
  assert.ok(bounds.every(x=>x.visible&&x.inStage),`${id} content preservation ${JSON.stringify(bounds)}`);
 }
 await page.setViewportSize({width:1280,height:720});await visit('l');
 const ledger=await page.evaluate(()=>({last:document.querySelector('.rows .r:last-child').getBoundingClientRect().bottom,band:document.querySelector('.band').getBoundingClientRect().top}));
 assert.ok(ledger.last<=ledger.band,'The print band must not overprint the last ledger rows.');
 await page.setViewportSize({width:390,height:844});
 report.checks.push('All old feature diagrams, third cards, ten ledger rows and all theme rows remain inside the mobile reading stage.');
 await visit('z');const cell=page.locator('.mx button').first();await cell.focus();await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>document.documentElement.dataset.variant),'z');assert.equal(await page.locator('#mxt').innerText(),'documented vocabulary');await page.locator('.mx [data-row="5"][data-column="3"]').click();assert.match(await page.locator('#mxp').innerText(),/coexist/);assert.equal(await page.locator('.mx button[aria-label]').count(),56);
 await visit('D');for(let i=0;i<4;i++){await page.locator(`[data-mode="${i}"]`).click();assert.equal(await page.locator(`.sk .row[data-m="${i}"].on`).count(),2);}
 await visit('p');await page.locator('[data-step="5"]').click();assert.equal(await page.locator('.panel h3').innerText(),'Build');await page.locator('[data-step="0"]').click();assert.equal(await page.locator('.panel h3').innerText(),'Discover');
 await visit('x');await page.locator('[data-stop="3"]').click();assert.equal(await page.locator('[data-stop="3"]').getAttribute('aria-pressed'),'true');
 report.checks.push('Matrix keyboard/tap, all dual-theme highlights, chapter selection and rotary controls work.');
 assert.deepEqual(errors,[]);report.checks.push('No page runtime errors.');
}finally{await browser.close();await mkdir(dirname(resolve(reportPath)),{recursive:true});await writeFile(reportPath,JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify(report,null,2));
