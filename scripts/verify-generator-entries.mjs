/** Check the actual source links and header layout on every showcase scene. */
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:56505/';
const output=process.argv[3]||'.eval-output/generator-entries.json';
const manifest=JSON.parse(await readFile('site/data/generator/index.json','utf8'));
const catalog=JSON.parse(await readFile('site/'+manifest.catalogs[manifest.current].url,'utf8'));
const browser=await chromium.launch({headless:true,...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE}:{})});
const report={date:new Date().toISOString(),catalog:catalog.id,headers:[],entryCases:[],errors:[]};
try{
 const context=await browser.newContext({reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',error=>report.errors.push(error.message));
 for(const [width,height] of [[1440,900],[1280,720],[390,844]]){
  await page.setViewportSize({width,height});
  for(const scene of catalog.scenes){
   await page.goto(new URL(`?v=${encodeURIComponent(scene.legacyId)}&still&gpu=off`,base).href);
   await page.waitForFunction(id=>document.querySelector('#app')?.dataset.mounted===id,scene.legacyId);
   await page.evaluate(()=>document.fonts.ready);
   const entry=page.locator('[data-generator-entry]');assert.equal(await entry.count(),1,scene.id);
   const url=new URL(await entry.getAttribute('href'),base);assert.equal(url.pathname,'/generator');assert.equal(url.searchParams.get('scene'),scene.id);assert.equal(url.searchParams.get('scope'),'section');
   const bounds=await page.evaluate(()=>{const a=document.querySelector('.scene-actions').getBoundingClientRect(),b=document.querySelector('.brand,.xp-brand').getBoundingClientRect(),l=document.querySelector('[data-generator-entry]').getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth,overlap:b.right>a.left,inside:l.left>=0&&l.right<=innerWidth&&l.top>=0&&l.bottom<=innerHeight};});
   assert.deepEqual(bounds,{overflow:false,overlap:false,inside:true},`${scene.id} ${width}`);
  }
  report.headers.push({width,height,scenes:catalog.scenes.length});console.log(`PASS all ${catalog.scenes.length} entry links at ${width}x${height}`);
 }
 for(const alias of ['a','A','plasma-study']){
  const scene=catalog.scenes.find(s=>s.legacyId===alias||s.id===alias);
  await page.goto(new URL(`?still&gpu=off#${alias}`,base).href);
  await page.waitForFunction(id=>document.querySelector('#app')?.dataset.mounted===id,scene.legacyId);
  await page.locator('[data-generator-entry]').click();await page.waitForFunction(()=>window.__drawnToGenerator);
  assert.equal(await page.locator('[data-scope]').inputValue(),'section');
  assert.equal(await page.locator('.base-selected strong').innerText(),scene.name);
  report.entryCases.push({alias,scene:scene.id});
 }
 assert.deepEqual(report.errors,[]);
}finally{await browser.close();await mkdir(dirname(output),{recursive:true});await writeFile(output,JSON.stringify(report,null,2)+'\n');}
console.log('PASS distinct case-sensitive aliases and actual scene-to-generator navigation');
