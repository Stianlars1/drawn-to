/** Rebuild the new studio scenes' real desktop/mobile fallback frames. */
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.argv[2]||'http://127.0.0.1:8757/';
const repo=fileURLToPath(new URL('../',import.meta.url));
const scratch=join(repo,'.eval-output','studio-posters');
const output=join(repo,'site','assets','atelier','posters');
await mkdir(scratch,{recursive:true});await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE}:{})});
const records=[];
try{
  const context=await browser.newContext({deviceScaleFactor:1});
  const page=await context.newPage();
  for(const [width,height,suffix] of [[1440,900,''],[390,844,'-mobile']]){
    await page.setViewportSize({width,height});
    for(const id of ['optical-type','woven-spectrum','aperture-control','chromatic-relief']){
      await page.goto(`${base}?v=${id}&still&t=0`);
      await page.waitForFunction(id=>document.querySelector('#app').dataset.mounted===id,id);
      for(const [index,value] of [0,.5,1].entries()){
        const data=await page.locator('[data-studio-host]').evaluate((host,value)=>{
          if(!host.__studio)throw new Error(host.dataset.renderError||'No studio renderer');
          host.__studio.setValue(value);return host.__studio.setTime(0);
        },value);
        if(!data.startsWith('data:image/png;base64,'))throw new Error('Invalid studio frame');
        const name=`${id}-${index}${suffix}`;
        await writeFile(join(scratch,name+'.png'),Buffer.from(data.split(',')[1],'base64'));
        records.push({name,id,value,width,height});
      }
    }
  }
  await context.close();
}finally{await browser.close();}

// Encoding only: scene pixels and transparency are retained, not edited.
execFileSync(process.env.PYTHON_BIN||'python3',['-c',
  `from pathlib import Path
from PIL import Image
import sys
for source in Path(sys.argv[1]).glob('*.png'):
    image=Image.open(source).convert('RGBA')
    destination=Path(sys.argv[2])/(source.stem+'.webp')
    temporary=destination.with_name(destination.stem+'.writing.webp')
    image.save(temporary,lossless=True,exact=True,method=6)
    assert image.tobytes()==Image.open(temporary).convert('RGBA').tobytes()
    temporary.replace(destination)
`,scratch,output],{stdio:'inherit'});
await writeFile(join(output,'frames.json'),JSON.stringify(records,null,2)+'\n');
console.log(`Exported ${records.length} lossless studio poster states.`);
