import assert from 'node:assert/strict';

export async function verifyAtelier({page,visit,base,browser,report}) {
  const studios=['optical-type','woven-spectrum','aperture-control','chromatic-relief'];
  await page.goto(base+'?still');
  await page.waitForFunction(()=>document.querySelector('#app').dataset.mounted==='auric-orbit');
  assert.match(await page.locator('.xp-footer').innerText(),/^01 \/ 70/);
  await page.getByRole('button',{name:'Previous direction',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('#app').dataset.mounted==='D');
  await page.getByRole('button',{name:'Next direction',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('#app').dataset.mounted==='auric-orbit');
  await visit('night-garden');
  await page.getByRole('link',{name:'Drawn To',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('#app').dataset.mounted==='auric-orbit');
  assert.ok(page.url().includes('v=auric-orbit'));
  report.checks.push('The root opens the new mineral scene; home and wraparound follow the curated sequence');

  await page.goto(base+'?v=aperture-control');
  await page.waitForFunction(()=>document.querySelector('#app').dataset.mounted==='aperture-control');
  await page.getByRole('slider',{name:'Openness'}).focus();
  assert.equal(await page.getByRole('button',{name:'Resume the cycle',exact:true}).count(),1);
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.getByRole('slider',{name:'Openness'}).inputValue(),'51');
  await page.waitForTimeout(5250);
  assert.equal(await page.evaluate(()=>document.documentElement.dataset.variant),'aperture-control');
  report.checks.push('Interacting with a demo holds the catalog; a range key changes the scene without navigating');

  for(const id of studios){
    await visit(id,'&t=0');
    const host=page.locator('[data-studio-host]');
    assert.equal(await host.getAttribute('data-backend'),'three-webgl2');
    const before=await host.evaluate(element=>element.__studio.snapshot());
    await page.locator('[data-studio-range]').press('End');
    assert.equal(await host.evaluate(element=>element.__studioState.value),1);
    const after=await host.evaluate(element=>element.__studio.snapshot());
    assert.notEqual(before,after,id+' did not change its rendered pixels');
    await page.evaluate(()=>{window.__previousStudio=document.querySelector('[data-studio-host]').__studioState;idx=ORDER.indexOf('scenic-close');render('scenic-close');});
    await page.waitForFunction(()=>document.querySelector('#app').dataset.mounted==='scenic-close');
    const frame=await page.evaluate(()=>window.__previousStudio.frames);
    await page.waitForTimeout(120);
    assert.equal(await page.evaluate(()=>window.__previousStudio.disposed),true,id);
    assert.equal(await page.evaluate(()=>window.__previousStudio.frames),frame,id);
    assert.equal(await page.locator('canvas').count(),0,id);

    await visit(id,'&gpu=off');
    assert.equal(await page.locator('canvas').count(),0);
    assert.equal(await page.locator('[data-studio-range]').isVisible(),false);
    for(const [index,value] of [0,.5,1].entries()){
      await page.locator(`[data-studio-value="${value}"]`).click();
      const poster=page.locator('.at-poster');await poster.evaluate(image=>image.decode());
      assert.ok((await poster.getAttribute('src')).endsWith(`${id}-${index}.webp`));
    }
  }
  report.checks.push('Four new Three.js scenes change actual pixels, clean up on departure and expose three valid poster states');

  await visit('optical-type');
  await page.locator('canvas').evaluate(canvas=>canvas.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
  await page.waitForFunction(()=>document.querySelector('[data-studio-host]').dataset.fallback==='true');
  assert.equal(await page.locator('canvas').count(),0);
  await page.getByRole('button',{name:'Right',exact:true}).click();
  await page.locator('.at-poster').evaluate(image=>image.decode());
  assert.ok((await page.locator('.at-poster').getAttribute('src')).includes('optical-type-2'));
  report.checks.push('A lost WebGL context releases the scene and retains a working poster interaction');

  await page.evaluate(()=>{for(const id of ['optical-type','aperture-control','woven-spectrum','chromatic-relief','particle-assembly','night-garden']){idx=ORDER.indexOf(id);render(id);}});
  await page.waitForFunction(()=>document.querySelector('#app').dataset.mounted==='night-garden');
  await page.waitForTimeout(250);assert.equal(await page.locator('canvas').count(),0);
  await page.getByRole('button',{name:'Glass & light',exact:true}).click();
  assert.equal(await page.locator('.xp-night-garden').getAttribute('data-view'),'1');
  await visit('paper-theatre');
  await page.locator('[data-chapter="2"]').click();
  assert.match(await page.locator('[data-paper-caption]').innerText(),/bridge/);
  await visit('living-terrarium');
  const position=await page.locator('.at-loupe').evaluate(element=>element.style.backgroundPosition);
  await page.locator('[data-terra="2"]').click();
  assert.notEqual(await page.locator('.at-loupe').evaluate(element=>element.style.backgroundPosition),position);
  await visit('specimen-cabinet');
  await page.getByRole('button',{name:'Inspect Amber resin',exact:true}).click();
  assert.equal(await page.getByRole('dialog',{name:'Amber resin',exact:true}).isVisible(),true);
  await page.keyboard.press('Escape');await page.locator('.at-inspector').waitFor({state:'detached'});
  assert.equal(await page.getByRole('button',{name:'Inspect Amber resin',exact:true}).evaluate(element=>element===document.activeElement),true);
  await visit('contact-sheet');
  const selectedImage=await page.locator('.at-contact-main>img').getAttribute('src');
  await page.getByRole('button',{name:'Move selected frame right',exact:true}).click();
  assert.equal(await page.locator('[data-frame-count]').innerText(),'02 / 06');
  assert.equal(await page.locator('.at-contact-main>img').getAttribute('src'),selectedImage);
  await page.getByRole('button',{name:'View A world in paper',exact:true}).click();
  await page.getByRole('button',{name:'Inspect selected frame',exact:true}).click();
  assert.equal(await page.getByRole('dialog',{name:'A world in paper',exact:true}).isVisible(),true);
  await page.keyboard.press('Escape');await page.locator('.at-inspector').waitFor({state:'detached'});
  await visit('red-chamber');
  await page.locator('[data-red-detail]').click();
  assert.equal(await page.locator('.xp-red-chamber').getAttribute('data-detail'),'true');
  report.checks.push('All six image compositions respond: detail views, chapters, magnifier, modal focus and frame reordering');

  await visit('woven-spectrum');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.querySelector('#app').dataset.mounted==='woven-spectrum');
  await page.waitForTimeout(200);
  const frame=await page.locator('[data-studio-host]').evaluate(element=>element.__studioState.frames);
  await page.waitForTimeout(150);
  assert.equal(await page.locator('[data-studio-host]').evaluate(element=>element.__studioState.frames),frame);
  assert.equal(await page.locator('[data-studio-motion]').isVisible(),false);
  await page.emulateMedia({reducedMotion:'no-preference'});
  report.checks.push('New studio animation stops under live reduced-motion changes');

  const limited=await browser.newContext({viewport:{width:390,height:844}});
  await limited.addInitScript(()=>Object.defineProperty(navigator,'connection',{configurable:true,value:{saveData:true}}));
  const mobile=await limited.newPage();
  for(const id of studios){
    await mobile.goto(`${base}?v=${id}&still`);
    await mobile.waitForFunction(id=>document.querySelector('#app').dataset.mounted===id,id);
    assert.equal(await mobile.locator('canvas').count(),0);
    await mobile.locator('[data-studio-value="1"]').click();
    await mobile.locator('.at-poster').evaluate(image=>image.decode());
    assert.ok((await mobile.locator('.at-poster').evaluate(image=>image.currentSrc)).includes('-2-mobile.webp'));
  }
  await limited.close();
  report.checks.push('All four studio scenes retain mobile Save-Data controls and matching portrait posters');
}
