import {readFileSync,writeFileSync,mkdirSync,existsSync,readdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFileSync(resolve(root,path),'utf8');
const routeContext={};runInNewContext(read('site/js/scene-routes.js'),routeContext);
const canonicalSlug=routeContext.DrawnToRoutes.slug;
const profiles=JSON.parse(read('skills/drawn-to/references/showcase-styles.json')).styles;
const ids=[...'abcdefghijklmnopqrstuvwxyzABCD',...readdirSync(resolve(root,'site/js/expansion')).filter(x=>x.endsWith('.js')).flatMap(file=>[...read('site/js/expansion/'+file).matchAll(/\bid:\s*['"]([^'"]+)['"]\s*,\s*order:/g)].map(match=>match[1]))];
if(!ids.length||new Set(ids).size!==ids.length||profiles.length!==ids.length||new Set(profiles.map(x=>x.id)).size!==profiles.length||profiles.some(x=>!ids.includes(x.id)))throw Error('Every registered scene needs exactly one style profile.');
const repo='https://github.com/Stianlars1/drawn-to';
const source=path=>`${repo}/blob/main/${path}`;
if(new Set(profiles.map(p=>canonicalSlug(p.id))).size!==profiles.length)throw Error('Canonical scene URLs must be unique.');
const registry={};
const check=process.argv.includes('--check');
let changed=0;
function emit(path,text){if(existsSync(resolve(root,path))&&read(path)===text)return;changed++;if(!check)writeFileSync(resolve(root,path),text);}
mkdirSync(resolve(root,'site/prompts'),{recursive:true});
for(const [index,p] of profiles.entries()){
 for(const field of ['name','composition','surface','behavior','checks'])if(!p[field]?.trim())throw Error(`${p.id}: missing ${field}`);
 const docs=p.references.map(slug=>`skills/drawn-to/references/posts/${slug}.md`);
 for(const file of [...p.implementation,...docs])if(!existsSync(resolve(root,file)))throw Error(`${p.id}: missing source ${file}`);
 const file=`${String(index+1).padStart(2,'0')}-${p.id.toLowerCase()}.txt`;
 registry[p.id]={name:p.name,url:`./prompts/${file}`};
 const text=`Use this visual direction: ${p.name}\n\nI chose this specific Drawn To scene: https://drawn-to.vercel.app/?still#${canonicalSlug(p.id)}\nReproduce its visual character, composition, level of detail and signature effect in my project. Preserve the qualities below when adapting the subject and copy. Build the selected surface; the multi-scene showcase navigation is not part of my product.\n\nStart by inspecting the live scene and the implementation links below. If a resource is unavailable, say which one; do not silently replace the effect with a generic approximation. Use the Drawn To skill if installed, or read ${source('skills/drawn-to/SKILL.md')}. Follow its relevant linked guidance.\n\nCOMPOSITION\n${p.composition}\n\nMATERIAL, LIGHT, TYPE AND TONE\n${p.surface}\n\nBEHAVIOR\n${p.behavior}\n\nASSET AND IMPLEMENTATION REQUIREMENTS\n${p.art||'Inspect the source construction before selecting a renderer. Keep the distinctive geometry, material and detail in the final output. Use semantic HTML for reading and controls; use SVG, CSS, a detailed original image or real 3D according to what the effect actually needs.'}\nThe rendering techniques described here are those used in our showcase, not claims about the original reference author. Reuse compatible licensed showcase code when fidelity benefits; retain required notices. Create original or licensed brand artwork rather than lifting third-party reference art.\n\nCALIBRATION SOURCES\n${docs.length?docs.map(path=>'- Transferable reference vocabulary: '+source(path)).join('\n'):'- This is an original/synthesized Drawn To study. No single historical source attribution is asserted.'}\n${p.implementation.map(path=>'- Actual showcase implementation: '+source(path)).join('\n')}\n\nBEFORE YOU BUILD\nRead the existing project and use facts and approvals already available. Ask only for missing decisions that would change the result: where this surface belongs, what product/content/action it serves, whether to retain the pictured subject or adapt it, and any platform or asset constraints. Treat this chosen look and level of craft as established; do not restart a broad style-selection interview. Keep implementation choices open until the actual effect and project constraints are understood.\n\nACCEPTANCE\n${p.checks}\nRender and visually inspect at 1440x900, 1280x720 and 390x844, plus the actual target size. Compare the output to the selected scene at both whole-composition and close-up scale. Check hierarchy, silhouette, density of detail, material roughness/thickness, reflection shape, light direction, contact shadow and crop wherever relevant. A neat page with matching colors alone is not enough. Test all controls and motion extremes, keyboard/touch, reduced motion and relevant fallback states. Preserve content and evidence on mobile; recompose or allow controlled reading space instead of hiding them. Stop timers/rendering when hidden or unmounted, avoid needless per-frame CPU work and measure performance before making claims. Report what still differs and refine the substantive gaps before calling it finished.\n`;
 emit('site/prompts/'+file,text);
}
emit('site/js/prompt-index.js','/* Generated by scripts/build-showcase-prompts.mjs. */\nwindow.DrawnToPromptIndex = '+JSON.stringify(registry)+';\n');
if(check&&changed){console.error(`${changed} generated prompt files differ. Run node scripts/build-showcase-prompts.mjs.`);process.exitCode=1;}else console.log(`${profiles.length} scene prompts ${check?'verified':'generated'}; ${changed} changed files.`);
