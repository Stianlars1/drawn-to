/* ============================ content model (identical in all nine) ============================ */
const C = {
  cmd: 'npx skills add Stianlars1/drawn-to',
  repo: 'https://github.com/Stianlars1/drawn-to',
  nums: [[window.DrawnToLibrary.total,'references'],[12,'craft defaults'],[8,'starting families']],
  /* each screen argues a DIFFERENT slice of the same true material (recipes.md, One-Screen Catalog) */
  copy: {
    a:['Give your agent taste.','A measured taste library and a lock-in interview for coding agents.'],
    b:['Answered with weights.','Every style question is a blend - 70 / 20 / 10 - never a forced single pick.'],
    c:['Look closely.','A growing library of visual studies, measured details and practical methods.'],
    d:['Every decision, written down.','One lock file per project. Revisions add rows; they never erase them.'],
    e:['Twelve craft defaults.','Eight starting families. A direction chosen for your project.'],
    f:['It reads your repo first.','Discovery runs before any question, so you never explain what the code already says.'],
    g:['One lock file.','Every visual decision serves a row you can point at.'],
    h:['A signal worth noticing.','One small source. A clear next step.'],
    i:['Taste, in one command.',''],
    t:['Give your agent taste.','']
  },
  names: {a:'narrow dark sharp', b:'wide light pastel', c:'paper & print', d:'dark atmosphere', e:'vercel-home',
          f:'ink & air', g:'isometric blueprint', h:'emissive signal', i:'tactile instrument',
          j:'divider-cut trio', k:'pebble trio', l:'print ledger', m:'mosaic gallery', n:'emissive metrics',
          o:'frozen interaction', p:'chapters', q:'outlined bento', r:'instrument hud', s:'paper slips',
          t:'editorial close', u:'proof diptych', v:'the correction ledger', w:'two registers', x:'stop conditions',
          y:'contact sheet', z:'blend matrix', A:'an example run', B:'works with', C:'the measured page', D:'both modes'},
  steps: [['01','Discover','Reads tokens, docs and product truth before a single question.',['1.1 prior lock files','1.2 design tokens','1.3 product source']],
          ['02','Interview','Plain-language questions answered with weights, never forced picks.',['2.1 blend proposal','2.2 axis locks','2.3 section variants']],
          ['03','Lock','Every visual decision serves a row you can point at.',['3.1 firmness per row','3.2 revisions add','3.3 nothing erased']]],
  out: [['Lock file','One markdown ledger per project. Every row carries firmness and consequence.',[['docs/design-locks/','',18,26],['cross-fade · 700 ms','g',56,150]]],
        ['Illustration concepts','Two to four concepts per feature, each with a construction recipe.',[['comet arc · 15°/s','',26,40],['iso 2:1 · rise 52','g',44,138]]],
        ['Animation specs','Curves, durations and stop conditions, read off the frames.',[['blur 12 → 0 · 460 ms','',20,34],['steady carrier · eased response','g',52,142]]]],
  consts: [['01','Quarantine the colour','45/45'],['02','Show the feature','33/45'],['03','Separation ladder','45/45'],
           ['04','Hierarchy by size and gray','35/45'],['05','Two voices, one mono','22/45'],['06','Two motion registers','27/27'],
           ['07','Loops close frame-perfectly','17/27'],['08','Stepped radius families','20/45'],['09','Texture every gradient','11/13'],
           ['10','Microcopy that reconciles','45/45'],['11','Opacity is the attention system','12/45'],['12','Composed at rest','0 against']],
  fams: [['01','Editorial Monochrome',['#0A0C10','#15181D','#8b8e93','#3B82F6'],17],
         ['02','Ink & Air',['#F7F7F7','#FFFFFF','#6B7280','#3770E9'],12],
         ['03','Staged Atmosphere',['#101013','#5ec9d8','#7a6cf0','#e86aa6'],16],
         ['04','Blueprint Sheet',['#050505','#454545','#a9e494','#dcc17e'],11],
         ['05','Paper & Print',['#FFFFFF','#ECECEC','#f27bb4','#7a4ec9'],6],
         ['06','Soft Pastel Stage',['#DBF3FF','#F0F5FE','#77dbff','#2349DA'],6],
         ['07','Tactile Instruments',['#F2F1EE','#1F2326','#FF9C28','#10B981'],8],
         ['08','Emissive Signal',['#08080A','#4D9FFF','#E921B8','#22C55E'],9]],
  pillars: [['Illustration ideation','A concept per feature, never an icon.',['verb picks the metaphor','device catalog','construction recipes'],1],
            ['Scroll-scrub','The pinned product scene.',['poses as registered props','three drivers','fallback ladder'],0],
            ['Animation craft','Doctrine first, then recipes.',['the animate-at-all gate','curve and duration tables','a never-ship list'],0],
            ['Polish moments','Where the small ones live.',['number pop-in','state swap in place','three-channel success'],0]],
  six: [['01','Discover','It reads the repository before it asks anything: prior lock files, design tokens, and the product source that says what the thing actually does.',[['3','places read first'],['0','questions asked yet']]],
        ['02','Brief','"Here is what I found - correct?" Corrections are taken as free facts, and only the gaps become questions.',[['5-8','lines of brief'],['1','batched exchange']]],
        ['03','Blend','Two or three directions from the eight families, answered with weights instead of a single pick. Clashes are named, and the scale-split resolution is offered before anything is built.',[['70','Editorial Monochrome'],['20','Staged Atmosphere'],['10','Blueprint Sheet']]],
        ['04','Lock','One plain-language question per open axis, each recorded the moment it is answered, with a firmness and a consequence.',[['must-have','or prefer, per row'],['0','rows ever deleted']]],
        ['05','Variants','Two or three compositions per section, filtered by the locked blend; for feature work, two to four illustration concepts per feature.',[['varied','section recipes'],['2-4','concepts per feature']]],
        ['06','Build','Every visual change serves a named row. Then the quality bar, the visual check at three sizes, and the polish pass.',[['3','viewports rendered'],['checked','actual output']]]],
  refuse: [['01','essential content clipped on mobile'],['02','a button with no working action'],
           ['03','a number with no stated source'],['04','a diagram that explains nothing'],
           ['05','body copy lost in the background'],['06','glass without thickness or refraction'],
           ['07','light without a coherent direction'],['08','motion that fights the reader'],
           ['09','a fallback that loses the composition'],['10','a claim that the render cannot support']],
  stops: [['01','When the page is hidden',"Stop frame requests and timers while the tab is hidden. Resume deliberately when it becomes visible."],
          ['02','When you take control',"A demonstration yields to a click, touch or keyboard choice. Your selection stays yours."],
          ['03','When motion is reduced',"Honor the system preference. Keep a complete resting composition and immediate working controls."],
          ['04','When nothing is changing',"Static scenes render on demand. Once the response has settled, there is no reason to request another frame."]],
  sheet: 'bl sd fl fl sl bl bl cl hl fd bm il bd fd sb cb cb sl cd cd fl dd rd cl sd rb cl rm cl cd rl dd hm cd fd fl sm fl id fl rb cd cl cd cl fm fd hd sd sl hl fl hm bl bd sd fl',
  fams8: ['Editorial Monochrome','Ink & Air','Staged Atmosphere','Blueprint Sheet','Paper & Print','Soft Pastel Stage','Tactile Instruments','Emissive Signal'],
  pairs: {
    '0-3':['ok','Structure and its annotations','Editorial hierarchy and blueprint linework share an economical vocabulary. Use the drawing to explain something, and let the text remain the reading anchor.'],
    '1-2':['ok','A light page with atmosphere','A quiet light shell gives a richer image room to carry material, light and emotion. Keep its crop and the reading area deliberately composed.'],
    '0-2':['ok','A dark page with a focal scene','Editorial structure can frame smoke, chrome or photography. Match the surrounding values and preserve the asset’s depth.'],
    '5-4':['ok','Softness and print detail','Warm soft surfaces can carry paper grain and printed registration marks. Decide which marks belong to paper and which belong to the interface.'],
    '5-1':['ok','Soft ground, clear reading','Pastel atmosphere and disciplined ink can share one composition. Use contrast and spacing to keep the soft surface useful.'],
    '5-3':['no','Choose the role of each surface','Soft volumes and precise drafting lines can coexist. Give the object its physical surface and the measurements their own annotation layer.'],
    '5-0':['no','Reconcile the separation','A soft object can live in an editorial frame. Make the contact shadow belong to the object, and the hairline belong to the page.'],
    '4-7':['no','Distinguish ink from light','Printed paper and emitted light can share a scene if their sources and boundaries are clear. Judge the composition; a missing archive pairing is not a ban.']
  },
  run: [['p','npx skills add Stianlars1/drawn-to'],
        ['o',`<b>added</b> skills/drawn-to <u>${window.DrawnToLibrary.total} references</u>, 12 craft defaults, 8 starting families`],
        ['sp',''],
        ['p','redesign the pricing section'],
        ['o','<b>reads</b> README.md, docs/, design tokens <u>3 found</u>'],
        ['o','<b>asks</b> "here is what I found - correct?" then only the gaps'],
        ['o','<b>blend</b> Editorial Monochrome 70 &middot; Staged Atmosphere 20 &middot; Blueprint 10'],
        ['o','<b>locks</b> 8 rows <u>docs/design-locks/</u>'],
        ['o','<b>builds</b> 2 compositions, 1 illustration concept per tier'],
        ['sp',''],
        ['o','every visual decision now points at a row']],
  tools: ['Claude Code','Codex','Cursor','Copilot','Gemini','Zed','Windsurf','Cline'],
  sites: [['Vite',1440],['Vercel',1400],['Codex',1376],['Linear',1344],['Resend',1232],['Notion',1229],['Raycast',1204]],
  modes: [['01','Separation','a solid white card and one soft shadow','a hairline at eight per cent, and no shadow at all'],
          ['02','The accent','one saturated blue carries the action','the same blue demoted to a grey, and light carries the action'],
          ['03','Imagery','daylight, so the frame agrees with the page','dusk, matched to the ground, never the same asset dimmed'],
          ['04','Depth','elevation, read as a shadow under the surface','luminance, read as a step up from the ground']],
  rev: [['R0','Delegated round, superseded','A first pass written without the interview. Kept as history, never deleted.'],
        ['R1','One screen, no scroll','Eyebrow labels, a three-line headline and a mat cut by the fold were removed.'],
        ['R2','Four more directions','A transport control, and the cycle grew from five screens to nine.']]
};
const EXTRA_PAGES = (window.DrawnToPages || []).sort((a,b) => a.order-b.order);
Object.assign(C.names, Object.fromEntries(EXTRA_PAGES.map(page => [page.id,page.name])));
const LEGACY_ORDER = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D'];
const chronological = [...LEGACY_ORDER, ...EXTRA_PAGES.map(page => page.id)];
const registered = new Set(chronological);
const opening = window.DrawnToOpening || [];
if (registered.size !== chronological.length || new Set(opening).size !== opening.length || opening.some(id => !registered.has(id))) {
  throw new Error('The curated catalog contains a duplicate or unknown page.');
}
const ORDER = [...opening, ...chronological.filter(id => !opening.includes(id))];
const WITH_NUMS = new Set(['f','t']);   /* three numbers in the bottom bar; c composes its own inside the mat */
const TOTAL = String(ORDER.length).padStart(2,'0');
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
let reduce = motionQuery.matches;

/* ============================ shared blocks ============================ */
const words = (s) => s.split(' ').map((w,i)=>`<span class="w" style="animation-delay:${i*110}ms">${w}</span>`).join(' ');
const H1 = (v,first) => `<h1 class="${first?'first':''}">${words(C.copy[v][0])}</h1>`;
const SUB = (v) => C.copy[v][1] ? `<p class="sub">${C.copy[v][1]}</p>` : '';
const ICONS = `<svg class="i-copy" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5.5" y="5.5" width="8" height="8" rx="1"/><path d="M3 10.5V3.5a1 1 0 0 1 1-1h7"/></svg><svg class="i-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l3 3 6-7"/></svg>`;
const CMD = () => `<span class="cmd"><span class="p">$</span>${C.cmd}<button type="button" class="copy" data-state="idle" aria-label="Copy install command" onclick="copyCmd(this)"><span class="swap"><span class="w1">copy</span><span class="w2">copied</span></span><span class="ico">${ICONS}</span></button></span>`;
/* I - the command IS the instrument: bezel, recessed track, machined cap, lit indicator window */
const CMD_HW = () => `<div class="hw"><div class="track"><button type="button" class="cap" data-state="idle" aria-label="Copy install command" onclick="copyCmd(this)"><span class="p">$</span>${C.cmd}<span class="win" aria-hidden="true"><i></i></span></button></div></div>`;
const STYLE_ACTIONS = () => `<div class="scene-prompt-actions"><button type="button" data-style-copy>Copy this prompt</button><button type="button" data-style-preview aria-label="Preview this style prompt" title="Preview prompt">↗</button></div>`;
const TOP = () => `<div class="top"><a class="brand" href="#${ORDER[0]}">Drawn To</a><div class="scene-actions">${STYLE_ACTIONS()}<a class="gh" href="${C.repo}">GitHub</a></div></div>`;
const NUMS = (cls) => `<span class="${cls||'nums'}">${C.nums.map(([n,l])=>`<b data-count="${n}">${n}</b> ${l}`).join(' &middot; ')}</span>`;
function arrow(d){ return `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`; }
const PREV = () => `<button type="button" class="cb" data-act="prev" aria-label="Previous direction">${arrow('M9.5 3.5 5 8l4.5 4.5')}</button>`;
const NEXT = () => `<button type="button" class="cb" data-act="next" aria-label="Next direction">${arrow('M6.5 3.5 11 8l-4.5 4.5')}</button>`;
const TOGGLE = (p) => `<button type="button" class="cb tog" data-act="toggle" aria-pressed="${p?'true':'false'}" aria-label="${p?'Resume the cycle':'Pause the cycle'}"><span class="ico"><svg class="i-pause" viewBox="0 0 16 16" fill="currentColor"><rect x="4" y="3.5" width="3" height="9" rx="1"/><rect x="9" y="3.5" width="3" height="9" rx="1"/></svg><svg class="i-play" viewBox="0 0 16 16" fill="currentColor"><path d="M5.5 3.6a.6.6 0 0 1 .92-.5l6 4.4a.6.6 0 0 1 0 1l-6 4.4a.6.6 0 0 1-.92-.5z"/></svg></span></button>`;
/* reduced motion never auto-advances, so there is nothing to pause: arrows only */
const CTL = (p) => reduce
  ? `<div class="ctl" role="group" aria-label="Step through the directions">${PREV()}${NEXT()}</div>`
  : `<div class="ctl" role="group" aria-label="Cycle controls" data-paused="${p?1:0}">${PREV()}${TOGGLE(p)}${NEXT()}</div>`;
const BOTTOM = (v) => `<div class="bottom"><span class="label">${String(ORDER.indexOf(v)+1).padStart(2,'0')} / ${TOTAL} &middot; ${C.names[v]}</span>${WITH_NUMS.has(v)?NUMS():''}</div>`;

/* Screen 1 - the corpus as one object. Every lamina is one reference, and its
   colour is that reference's MEASURED ground, in corpus order; the eight whose
   analyses describe the ground in words rather than a hex are drawn as voids.
   The colour is not chosen, it is read. */
const CORELAM = [["bento","light","#f9f9f9"],["section-set","dark","#1A1A1A"],["feature-cards","light","#f7f7f7"],["feature-cards","light",""],["section-set","light","#FAFAFA"],["brand","light","#d9d9d9"],["brand","light","#ffffff"],["component","light","#F2F1EE"],["hero","light","#dbf3ff"],["feature-cards","dark","#202020"],["bento","mixed","#F9FAFC"],["illustration-set","light","#ffffff"],["brand","dark","#dbdbdb"],["feature-cards","dark","#232323"],["section-set","both","#ececec"],["component","both","#e5e6eb"],["component","both",""],["section-set","light","#D9D9D9"],["component","dark","#101012"],["component","dark","#1f2326"],["full-page","light","#F7F7F7"],["dashboard","dark","#131316"],["resource","dark","#101010"],["component","light","#FBFBFB"],["section-set","dark","#101113"],["resource","both","#121212"],["component","light","#fafafa"],["resource","mixed","#09090B"],["component","light","#F7F7F7"],["component","dark","#040607"],["resource","light","#E5E5E5"],["dashboard","dark","#101012"],["hero","mixed","#F3F7F8"],["component","dark","#0F0F0F"],["full-page","dark","#dde1e2"],["feature-cards","light","#FBFBFC"],["section-set","mixed","#ececf0"],["feature-cards","light","#F0F5FE"],["illustration-set","dark","#1f1f1f"],["full-page","light","#ececec"],["resource","both",""],["component","dark","#050408"],["component","light","#f7f6f2"],["component","dark","#151515"],["component","light","#FFFFFF"],["feature-cards","mixed",""],["feature-cards","dark",""],["hero","dark",""],["section-set","dark",""],["section-set","light","#EDEDED"],["hero","light",""],["feature-cards","light","#F3F3F3"]];
const CORE = () => `<svg class="core" viewBox="52 84 470 600" fill="none" aria-label="An earlier sample of measured grounds stacked as one core, read one lamina at a time">
<defs>
  <pattern id="void" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" fill="#0B0E13"/><path d="M0 0V5" stroke="#252A33"/></pattern>
  <linearGradient id="sheen" x1="1" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="hd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset="1" stop-color="#fff" stop-opacity=".06"/></linearGradient>
  <clipPath id="coreclip"><path d="M200.0 120.0 L320.0 180.0 L320.0 596.0 L240.0 636.0 L120.0 576.0 L120.0 160.0 Z"/></clipPath>
  <filter id="soft" x="-60%" y="-40%" width="220%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="bloom" x="-30%" y="-10%" width="160%" height="120%"><feGaussianBlur stdDeviation="5"/></filter>
</defs>
<g class="stack" transform="translate(0 -18)">
<ellipse cx="240" cy="644" rx="104" ry="12" fill="#000" opacity=".6" filter="url(#soft)"/>
<g stroke="#232733" stroke-dasharray="3 5"><path d="M200.0 90.0 V570.0"/><path d="M320.0 150.0 V630.0"/><path d="M240.0 190.0 V670.0"/><path d="M120.0 130.0 V610.0"/></g>
<g>['<polygon fill="#8c8c8c" points="120.0,568.0 240.0,628.0 240.0,636.0 120.0,576.0"/>', '<polygon fill="#d0d0d0" points="240.0,628.0 320.0,588.0 320.0,596.0 240.0,636.0"/>', '<polygon fill="url(#void)" points="120.0,560.0 240.0,620.0 240.0,628.0 120.0,568.0"/>', '<polygon fill="url(#void)" points="240.0,620.0 320.0,580.0 320.0,588.0 240.0,628.0"/>', '<polygon fill="#898989" points="120.0,552.0 240.0,612.0 240.0,620.0 120.0,560.0"/>', '<polygon fill="#cbcbcb" points="240.0,612.0 320.0,572.0 320.0,580.0 240.0,620.0"/>', '<polygon fill="url(#void)" points="120.0,544.0 240.0,604.0 240.0,612.0 120.0,552.0"/>', '<polygon fill="url(#void)" points="240.0,604.0 320.0,564.0 320.0,572.0 240.0,612.0"/>', '<polygon fill="url(#void)" points="120.0,536.0 240.0,596.0 240.0,604.0 120.0,544.0"/>', '<polygon fill="url(#void)" points="240.0,596.0 320.0,556.0 320.0,564.0 240.0,604.0"/>', '<polygon fill="url(#void)" points="120.0,528.0 240.0,588.0 240.0,596.0 120.0,536.0"/>', '<polygon fill="url(#void)" points="240.0,588.0 320.0,548.0 320.0,556.0 240.0,596.0"/>', '<polygon fill="url(#void)" points="120.0,520.0 240.0,580.0 240.0,588.0 120.0,528.0"/>', '<polygon fill="url(#void)" points="240.0,580.0 320.0,540.0 320.0,548.0 240.0,588.0"/>', '<polygon fill="#939393" points="120.0,512.0 240.0,572.0 240.0,580.0 120.0,520.0"/>', '<polygon fill="#dbdbdb" points="240.0,572.0 320.0,532.0 320.0,540.0 240.0,580.0"/>', '<polygon fill="#0c0c0c" points="120.0,504.0 240.0,564.0 240.0,572.0 120.0,512.0"/>', '<polygon fill="#121212" points="240.0,564.0 320.0,524.0 320.0,532.0 240.0,572.0"/>', '<polygon fill="#8f8e8c" points="120.0,496.0 240.0,556.0 240.0,564.0 120.0,504.0"/>', '<polygon fill="#d4d3d0" points="240.0,556.0 320.0,516.0 320.0,524.0 240.0,564.0"/>', '<polygon fill="#020204" points="120.0,488.0 240.0,548.0 240.0,556.0 120.0,496.0"/>', '<polygon fill="#040306" points="240.0,548.0 320.0,508.0 320.0,516.0 240.0,556.0"/>', '<polygon fill="url(#void)" points="120.0,480.0 240.0,540.0 240.0,548.0 120.0,488.0"/>', '<polygon fill="url(#void)" points="240.0,540.0 320.0,500.0 320.0,508.0 240.0,548.0"/>', '<polygon fill="#888888" points="120.0,472.0 240.0,532.0 240.0,540.0 120.0,480.0"/>', '<polygon fill="#cacaca" points="240.0,532.0 320.0,492.0 320.0,500.0 240.0,540.0"/>', '<polygon fill="#111111" points="120.0,464.0 240.0,524.0 240.0,532.0 120.0,472.0"/>', '<polygon fill="#1a1a1a" points="240.0,524.0 320.0,484.0 320.0,492.0 240.0,532.0"/>', '<polygon fill="#8b8e93" points="120.0,456.0 240.0,516.0 240.0,524.0 120.0,464.0"/>', '<polygon fill="#ced2da" points="240.0,516.0 320.0,476.0 320.0,484.0 240.0,524.0"/>', '<polygon fill="#88888b" points="120.0,448.0 240.0,508.0 240.0,516.0 120.0,456.0"/>', '<polygon fill="#cacace" points="240.0,508.0 320.0,468.0 320.0,476.0 240.0,516.0"/>', '<polygon fill="#919192" points="120.0,440.0 240.0,500.0 240.0,508.0 120.0,448.0"/>', '<polygon fill="#d7d7d8" points="240.0,500.0 320.0,460.0 320.0,468.0 240.0,508.0"/>', '<polygon fill="#808283" points="120.0,432.0 240.0,492.0 240.0,500.0 120.0,440.0"/>', '<polygon fill="#bec1c2" points="240.0,492.0 320.0,452.0 320.0,460.0 240.0,500.0"/>', '<polygon fill="#080808" points="120.0,424.0 240.0,484.0 240.0,492.0 120.0,432.0"/>', '<polygon fill="#0c0c0c" points="240.0,484.0 320.0,444.0 320.0,452.0 240.0,492.0"/>', '<polygon fill="#8c8f8f" points="120.0,416.0 240.0,476.0 240.0,484.0 120.0,424.0"/>', '<polygon fill="#d0d4d5" points="240.0,476.0 320.0,436.0 320.0,444.0 240.0,484.0"/>', '<polygon fill="#09090a" points="120.0,408.0 240.0,468.0 240.0,476.0 120.0,416.0"/>', '<polygon fill="#0d0d0f" points="240.0,468.0 320.0,428.0 320.0,436.0 240.0,476.0"/>', '<polygon fill="#848484" points="120.0,400.0 240.0,460.0 240.0,468.0 120.0,408.0"/>', '<polygon fill="#c4c4c4" points="240.0,460.0 320.0,420.0 320.0,428.0 240.0,468.0"/>', '<polygon fill="#020304" points="120.0,392.0 240.0,452.0 240.0,460.0 120.0,400.0"/>', '<polygon fill="#030506" points="240.0,452.0 320.0,412.0 320.0,420.0 240.0,460.0"/>', '<polygon fill="#8f8f8f" points="120.0,384.0 240.0,444.0 240.0,452.0 120.0,392.0"/>', '<polygon fill="#d4d4d4" points="240.0,444.0 320.0,404.0 320.0,412.0 240.0,452.0"/>', '<polygon fill="#050506" points="120.0,376.0 240.0,436.0 240.0,444.0 120.0,384.0"/>', '<polygon fill="#070709" points="240.0,436.0 320.0,396.0 320.0,404.0 240.0,444.0"/>', '<polygon fill="#919191" points="120.0,368.0 240.0,428.0 240.0,436.0 120.0,376.0"/>', '<polygon fill="#d7d7d7" points="240.0,428.0 320.0,388.0 320.0,396.0 240.0,436.0"/>', '<polygon fill="#0a0a0a" points="120.0,360.0 240.0,420.0 240.0,428.0 120.0,368.0"/>', '<polygon fill="#0f0f0f" points="240.0,420.0 320.0,380.0 320.0,388.0 240.0,428.0"/>', '<polygon fill="#09090b" points="120.0,352.0 240.0,412.0 240.0,420.0 120.0,360.0"/>', '<polygon fill="#0d0e10" points="240.0,412.0 320.0,372.0 320.0,380.0 240.0,420.0"/>', '<polygon fill="#919191" points="120.0,344.0 240.0,404.0 240.0,412.0 120.0,352.0"/>', '<polygon fill="#d7d7d7" points="240.0,404.0 320.0,364.0 320.0,372.0 240.0,412.0"/>', '<polygon fill="#090909" points="120.0,336.0 240.0,396.0 240.0,404.0 120.0,344.0"/>', '<polygon fill="#0d0d0d" points="240.0,396.0 320.0,356.0 320.0,364.0 240.0,404.0"/>', '<polygon fill="#0b0b0c" points="120.0,328.0 240.0,388.0 240.0,396.0 120.0,336.0"/>', '<polygon fill="#101012" points="240.0,388.0 320.0,348.0 320.0,356.0 240.0,396.0"/>', '<polygon fill="#8f8f8f" points="120.0,320.0 240.0,380.0 240.0,388.0 120.0,328.0"/>', '<polygon fill="#d4d4d4" points="240.0,380.0 320.0,340.0 320.0,348.0 240.0,388.0"/>', '<polygon fill="#111416" points="120.0,312.0 240.0,372.0 240.0,380.0 120.0,320.0"/>', '<polygon fill="#1a1e20" points="240.0,372.0 320.0,332.0 320.0,340.0 240.0,380.0"/>', '<polygon fill="#09090a" points="120.0,304.0 240.0,364.0 240.0,372.0 120.0,312.0"/>', '<polygon fill="#0d0d0f" points="240.0,364.0 320.0,324.0 320.0,332.0 240.0,372.0"/>', '<polygon fill="#7d7d7d" points="120.0,296.0 240.0,356.0 240.0,364.0 120.0,304.0"/>', '<polygon fill="#bababa" points="240.0,356.0 320.0,316.0 320.0,324.0 240.0,364.0"/>', '<polygon fill="url(#void)" points="120.0,288.0 240.0,348.0 240.0,356.0 120.0,296.0"/>', '<polygon fill="url(#void)" points="240.0,348.0 320.0,308.0 320.0,316.0 240.0,356.0"/>', '<polygon fill="#848588" points="120.0,280.0 240.0,340.0 240.0,348.0 120.0,288.0"/>', '<polygon fill="#c4c5ca" points="240.0,340.0 320.0,300.0 320.0,308.0 240.0,348.0"/>', '<polygon fill="#888888" points="120.0,272.0 240.0,332.0 240.0,340.0 120.0,280.0"/>', '<polygon fill="#cacaca" points="240.0,332.0 320.0,292.0 320.0,300.0 240.0,340.0"/>', '<polygon fill="#141414" points="120.0,264.0 240.0,324.0 240.0,332.0 120.0,272.0"/>', '<polygon fill="#1e1e1e" points="240.0,324.0 320.0,284.0 320.0,292.0 240.0,332.0"/>', '<polygon fill="#7f7f7f" points="120.0,256.0 240.0,316.0 240.0,324.0 120.0,264.0"/>', '<polygon fill="#bcbcbc" points="240.0,316.0 320.0,276.0 320.0,284.0 240.0,324.0"/>', '<polygon fill="#939393" points="120.0,248.0 240.0,308.0 240.0,316.0 120.0,256.0"/>', '<polygon fill="#dbdbdb" points="240.0,308.0 320.0,268.0 320.0,276.0 240.0,316.0"/>', '<polygon fill="#909192" points="120.0,240.0 240.0,300.0 240.0,308.0 120.0,248.0"/>', '<polygon fill="#d6d7d8" points="240.0,300.0 320.0,260.0 320.0,268.0 240.0,308.0"/>', '<polygon fill="#121212" points="120.0,232.0 240.0,292.0 240.0,300.0 120.0,240.0"/>', '<polygon fill="#1b1b1b" points="240.0,292.0 320.0,252.0 320.0,260.0 240.0,300.0"/>', '<polygon fill="#7f8c93" points="120.0,224.0 240.0,284.0 240.0,292.0 120.0,232.0"/>', '<polygon fill="#bcd0db" points="240.0,284.0 320.0,244.0 320.0,252.0 240.0,292.0"/>', '<polygon fill="#8c8b8a" points="120.0,216.0 240.0,276.0 240.0,284.0 120.0,224.0"/>', '<polygon fill="#d0cfcc" points="240.0,276.0 320.0,236.0 320.0,244.0 240.0,284.0"/>', '<polygon fill="#939393" points="120.0,208.0 240.0,268.0 240.0,276.0 120.0,216.0"/>', '<polygon fill="#dbdbdb" points="240.0,268.0 320.0,228.0 320.0,236.0 240.0,276.0"/>', '<polygon fill="#7d7d7d" points="120.0,200.0 240.0,260.0 240.0,268.0 120.0,208.0"/>', '<polygon fill="#bababa" points="240.0,260.0 320.0,220.0 320.0,228.0 240.0,268.0"/>', '<polygon fill="#919191" points="120.0,192.0 240.0,252.0 240.0,260.0 120.0,200.0"/>', '<polygon fill="#d7d7d7" points="240.0,252.0 320.0,212.0 320.0,220.0 240.0,260.0"/>', '<polygon fill="url(#void)" points="120.0,184.0 240.0,244.0 240.0,252.0 120.0,192.0"/>', '<polygon fill="url(#void)" points="240.0,244.0 320.0,204.0 320.0,212.0 240.0,252.0"/>', '<polygon fill="#8f8f8f" points="120.0,176.0 240.0,236.0 240.0,244.0 120.0,184.0"/>', '<polygon fill="#d4d4d4" points="240.0,236.0 320.0,196.0 320.0,204.0 240.0,244.0"/>', '<polygon fill="#0f0f0f" points="120.0,168.0 240.0,228.0 240.0,236.0 120.0,176.0"/>', '<polygon fill="#161616" points="240.0,228.0 320.0,188.0 320.0,196.0 240.0,236.0"/>', '<polygon fill="#909090" points="120.0,160.0 240.0,220.0 240.0,228.0 120.0,168.0"/>', '<polygon fill="#d6d6d6" points="240.0,220.0 320.0,180.0 320.0,188.0 240.0,228.0"/>']</g>
<g stroke-width="2.2" stroke-opacity=".30" filter="url(#bloom)"><path stroke="#ffffff" d="M120.0 568.0 L240.0 628.0 L320.0 588.0"/><path stroke="#ffffff" d="M120.0 552.0 L240.0 612.0 L320.0 572.0"/><path stroke="#ffffff" d="M120.0 512.0 L240.0 572.0 L320.0 532.0"/><path stroke="#1d1d1d" d="M120.0 504.0 L240.0 564.0 L320.0 524.0"/><path stroke="#ffffff" d="M120.0 496.0 L240.0 556.0 L320.0 516.0"/><path stroke="#07050b" d="M120.0 488.0 L240.0 548.0 L320.0 508.0"/><path stroke="#ffffff" d="M120.0 472.0 L240.0 532.0 L320.0 492.0"/><path stroke="#2b2b2b" d="M120.0 464.0 L240.0 524.0 L320.0 484.0"/><path stroke="#ffffff" d="M120.0 456.0 L240.0 516.0 L320.0 476.0"/><path stroke="#ffffff" d="M120.0 448.0 L240.0 508.0 L320.0 468.0"/><path stroke="#ffffff" d="M120.0 440.0 L240.0 500.0 L320.0 460.0"/><path stroke="#ffffff" d="M120.0 432.0 L240.0 492.0 L320.0 452.0"/><path stroke="#151515" d="M120.0 424.0 L240.0 484.0 L320.0 444.0"/><path stroke="#ffffff" d="M120.0 416.0 L240.0 476.0 L320.0 436.0"/><path stroke="#161619" d="M120.0 408.0 L240.0 468.0 L320.0 428.0"/><path stroke="#ffffff" d="M120.0 400.0 L240.0 460.0 L320.0 420.0"/><path stroke="#050809" d="M120.0 392.0 L240.0 452.0 L320.0 412.0"/><path stroke="#ffffff" d="M120.0 384.0 L240.0 444.0 L320.0 404.0"/><path stroke="#0c0c0f" d="M120.0 376.0 L240.0 436.0 L320.0 396.0"/><path stroke="#ffffff" d="M120.0 368.0 L240.0 428.0 L320.0 388.0"/><path stroke="#191919" d="M120.0 360.0 L240.0 420.0 L320.0 380.0"/><path stroke="#16171a" d="M120.0 352.0 L240.0 412.0 L320.0 372.0"/><path stroke="#ffffff" d="M120.0 344.0 L240.0 404.0 L320.0 364.0"/><path stroke="#161616" d="M120.0 336.0 L240.0 396.0 L320.0 356.0"/><path stroke="#1a1a1e" d="M120.0 328.0 L240.0 388.0 L320.0 348.0"/><path stroke="#ffffff" d="M120.0 320.0 L240.0 380.0 L320.0 340.0"/><path stroke="#2b3135" d="M120.0 312.0 L240.0 372.0 L320.0 332.0"/><path stroke="#161619" d="M120.0 304.0 L240.0 364.0 L320.0 324.0"/><path stroke="#ffffff" d="M120.0 296.0 L240.0 356.0 L320.0 316.0"/><path stroke="#ffffff" d="M120.0 280.0 L240.0 340.0 L320.0 300.0"/><path stroke="#ffffff" d="M120.0 272.0 L240.0 332.0 L320.0 292.0"/><path stroke="#313131" d="M120.0 264.0 L240.0 324.0 L320.0 284.0"/><path stroke="#ffffff" d="M120.0 256.0 L240.0 316.0 L320.0 276.0"/><path stroke="#ffffff" d="M120.0 248.0 L240.0 308.0 L320.0 268.0"/><path stroke="#ffffff" d="M120.0 240.0 L240.0 300.0 L320.0 260.0"/><path stroke="#2c2c2c" d="M120.0 232.0 L240.0 292.0 L320.0 252.0"/><path stroke="#ffffff" d="M120.0 224.0 L240.0 284.0 L320.0 244.0"/><path stroke="#ffffff" d="M120.0 216.0 L240.0 276.0 L320.0 236.0"/><path stroke="#ffffff" d="M120.0 208.0 L240.0 268.0 L320.0 228.0"/><path stroke="#ffffff" d="M120.0 200.0 L240.0 260.0 L320.0 220.0"/><path stroke="#ffffff" d="M120.0 192.0 L240.0 252.0 L320.0 212.0"/><path stroke="#ffffff" d="M120.0 176.0 L240.0 236.0 L320.0 196.0"/><path stroke="#242424" d="M120.0 168.0 L240.0 228.0 L320.0 188.0"/><path stroke="#ffffff" d="M120.0 160.0 L240.0 220.0 L320.0 180.0"/></g>
<g stroke-width=".9" stroke-opacity=".62"><path stroke="#ffffff" d="M120.0 568.0 L240.0 628.0 L320.0 588.0"/><path stroke="#ffffff" d="M120.0 552.0 L240.0 612.0 L320.0 572.0"/><path stroke="#ffffff" d="M120.0 512.0 L240.0 572.0 L320.0 532.0"/><path stroke="#1d1d1d" d="M120.0 504.0 L240.0 564.0 L320.0 524.0"/><path stroke="#ffffff" d="M120.0 496.0 L240.0 556.0 L320.0 516.0"/><path stroke="#07050b" d="M120.0 488.0 L240.0 548.0 L320.0 508.0"/><path stroke="#ffffff" d="M120.0 472.0 L240.0 532.0 L320.0 492.0"/><path stroke="#2b2b2b" d="M120.0 464.0 L240.0 524.0 L320.0 484.0"/><path stroke="#ffffff" d="M120.0 456.0 L240.0 516.0 L320.0 476.0"/><path stroke="#ffffff" d="M120.0 448.0 L240.0 508.0 L320.0 468.0"/><path stroke="#ffffff" d="M120.0 440.0 L240.0 500.0 L320.0 460.0"/><path stroke="#ffffff" d="M120.0 432.0 L240.0 492.0 L320.0 452.0"/><path stroke="#151515" d="M120.0 424.0 L240.0 484.0 L320.0 444.0"/><path stroke="#ffffff" d="M120.0 416.0 L240.0 476.0 L320.0 436.0"/><path stroke="#161619" d="M120.0 408.0 L240.0 468.0 L320.0 428.0"/><path stroke="#ffffff" d="M120.0 400.0 L240.0 460.0 L320.0 420.0"/><path stroke="#050809" d="M120.0 392.0 L240.0 452.0 L320.0 412.0"/><path stroke="#ffffff" d="M120.0 384.0 L240.0 444.0 L320.0 404.0"/><path stroke="#0c0c0f" d="M120.0 376.0 L240.0 436.0 L320.0 396.0"/><path stroke="#ffffff" d="M120.0 368.0 L240.0 428.0 L320.0 388.0"/><path stroke="#191919" d="M120.0 360.0 L240.0 420.0 L320.0 380.0"/><path stroke="#16171a" d="M120.0 352.0 L240.0 412.0 L320.0 372.0"/><path stroke="#ffffff" d="M120.0 344.0 L240.0 404.0 L320.0 364.0"/><path stroke="#161616" d="M120.0 336.0 L240.0 396.0 L320.0 356.0"/><path stroke="#1a1a1e" d="M120.0 328.0 L240.0 388.0 L320.0 348.0"/><path stroke="#ffffff" d="M120.0 320.0 L240.0 380.0 L320.0 340.0"/><path stroke="#2b3135" d="M120.0 312.0 L240.0 372.0 L320.0 332.0"/><path stroke="#161619" d="M120.0 304.0 L240.0 364.0 L320.0 324.0"/><path stroke="#ffffff" d="M120.0 296.0 L240.0 356.0 L320.0 316.0"/><path stroke="#ffffff" d="M120.0 280.0 L240.0 340.0 L320.0 300.0"/><path stroke="#ffffff" d="M120.0 272.0 L240.0 332.0 L320.0 292.0"/><path stroke="#313131" d="M120.0 264.0 L240.0 324.0 L320.0 284.0"/><path stroke="#ffffff" d="M120.0 256.0 L240.0 316.0 L320.0 276.0"/><path stroke="#ffffff" d="M120.0 248.0 L240.0 308.0 L320.0 268.0"/><path stroke="#ffffff" d="M120.0 240.0 L240.0 300.0 L320.0 260.0"/><path stroke="#2c2c2c" d="M120.0 232.0 L240.0 292.0 L320.0 252.0"/><path stroke="#ffffff" d="M120.0 224.0 L240.0 284.0 L320.0 244.0"/><path stroke="#ffffff" d="M120.0 216.0 L240.0 276.0 L320.0 236.0"/><path stroke="#ffffff" d="M120.0 208.0 L240.0 268.0 L320.0 228.0"/><path stroke="#ffffff" d="M120.0 200.0 L240.0 260.0 L320.0 220.0"/><path stroke="#ffffff" d="M120.0 192.0 L240.0 252.0 L320.0 212.0"/><path stroke="#ffffff" d="M120.0 176.0 L240.0 236.0 L320.0 196.0"/><path stroke="#242424" d="M120.0 168.0 L240.0 228.0 L320.0 188.0"/><path stroke="#ffffff" d="M120.0 160.0 L240.0 220.0 L320.0 180.0"/></g>
<polygon fill="#F3F3F3" points="200.0,120.0 320.0,180.0 240.0,220.0 120.0,160.0"/>
<polygon fill="url(#sheen)" points="200.0,120.0 320.0,180.0 240.0,220.0 120.0,160.0"/>
<g id="head" clip-path="url(#coreclip)"><polygon fill="url(#hd)" points="120.0,160.0 240.0,220.0 240.0,228.0 120.0,168.0"/><path stroke="#fff" stroke-width="1.4" d="M120.0 160.0 L240.0 220.0 L320.0 180.0"/></g>
<g stroke="#5B8CFF"><path d="M84 160.0h10M84 576.0h10"/><path d="M89 160.0V576.0"/></g>
<text class="v" x="76" y="372" text-anchor="end">52</text>
<g fill="#0A0C10" stroke="#EDEDEE"><rect x="197.0" y="117.0" width="6" height="6"/><rect x="317.0" y="177.0" width="6" height="6"/><rect x="237.0" y="217.0" width="6" height="6"/><rect x="117.0" y="157.0" width="6" height="6"/></g>
</g>
<g class="ro">
  <path id="leader" stroke="#4A5160" d="M320 162 h20 V182 H346"/>
  <text class="k" x="354" y="138">READING</text>
  <text class="k" x="354" y="160">index</text><text class="d" id="r0" x="504" y="160" text-anchor="end">01 / 52</text>
  <text class="k" x="354" y="182">kind</text><text class="d" id="r1" x="504" y="182" text-anchor="end">bento</text>
  <text class="k" x="354" y="204">mode</text><text class="d" id="r2" x="504" y="204" text-anchor="end">light</text>
  <text class="k" x="354" y="226">ground</text><text class="d hot" id="r3" x="504" y="226" text-anchor="end">#f9f9f9</text>
  <rect id="sw" x="354" y="234" width="150" height="5" fill="#f9f9f9" stroke="#3A3F4B" stroke-width=".8"/>
  <path stroke="#242832" d="M354 148.0h150M354 246.0h150"/>
</g>
<text class="lb hot" x="120" y="634">archived study · 52 laminae</text>
<text class="lb dim" x="120" y="650">44 recorded grounds · August 2026</text>
</svg>`;

/* E - one lit object: a thin ring with a single comet arc, linear rotation (ambient register) */
const RING = () => `<svg class="ring" viewBox="0 0 400 400" fill="none" aria-hidden="true">
  <defs>
    <linearGradient id="comet" gradientUnits="userSpaceOnUse" x1="170.5" y1="32.6" x2="370" y2="200">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset=".6" stop-color="#fff" stop-opacity=".55"/>
      <stop offset="1" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
  </defs>
  <circle cx="200" cy="200" r="170" stroke="rgba(255,255,255,.16)"/>
  <g class="spin">
    <path d="M170.5 32.6A170 170 0 0 1 370 200" stroke="url(#comet)" stroke-width="9" opacity=".5" filter="url(#bloom)"/>
    <path d="M170.5 32.6A170 170 0 0 1 370 200" stroke="url(#comet)" stroke-width="1.75" stroke-linecap="round"/>
    <circle cx="370" cy="200" r="10" fill="#fff" opacity=".45" filter="url(#bloom)"/>
    <circle cx="370" cy="200" r="2" fill="#fff"/>
  </g>
</svg>`;

/* G - one isometric object: the five sheets of a lock file, exploded, 2:1 dimetric line-art */
const ISO = () => {
  const W = 300, D = 210, step = 52, cx = 300, cy = 224;
  const px = (x,y) => [x - y, (x + y) / 2];                     /* 2:1 dimetric projection */
  const corners = [[0,0],[W,0],[W,D],[0,D]].map(([x,y]) => px(x,y));
  const at = (p,dy) => `${(cx+p[0]).toFixed(1)},${(dy+p[1]).toFixed(1)}`;
  const sheets = [];
  for (let i = 0; i < 5; i++){
    const top = i === 4, dy = cy - i * step, g = [];
    g.push(`<polygon points="${corners.map(p=>at(p,dy)).join(' ')}" fill="${top?'rgba(255,255,255,.05)':'rgba(255,255,255,.022)'}" stroke="${top?'#8E8E93':'#6E6E72'}" stroke-width="1"/>`);
    if (top) g.push(`<path d="M${at(corners[3],dy).replace(',',' ')}L${at(corners[2],dy).replace(',',' ')}" stroke="#fff" stroke-width="1.4"/>`);
    const bar = (x,y,w,h,fill) => `<polygon points="${[[x,y],[x+w,y],[x+w,y+h],[x,y+h]].map(([a,b])=>at(px(a,b),dy)).join(' ')}" fill="${fill}"/>`;
    g.push(bar(30,34,176,16, top?'rgba(255,255,255,.34)':'rgba(255,255,255,.13)'));   /* the headline */
    g.push(bar(30,64,116,9,  top?'rgba(255,255,255,.16)':'rgba(255,255,255,.07)'));   /* the sub line */
    g.push(bar(30,96,92,26,  top?'rgba(255,255,255,.12)':'rgba(255,255,255,.05)'));   /* the command */
    if (top) g.push(corners.map(p=>`<rect x="${(cx+p[0]-3).toFixed(1)}" y="${(dy+p[1]-3).toFixed(1)}" width="6" height="6" fill="#1A1A1C" stroke="#fff" stroke-width="1"/>`).join(''));
    g.push(`<text class="lb${top?' hot':''}" x="${(cx+corners[1][0]+16).toFixed(1)}" y="${(dy+corners[1][1]+4).toFixed(1)}">0${5-i}</text>`);
    sheets.push(g.join(''));
  }
  const guides = corners.map(p=>`<path d="M${(cx+p[0]).toFixed(1)} ${(cy+p[1]+22).toFixed(1)}V${(cy+p[1]-4*step-18).toFixed(1)}"/>`).join('');
  const grid = [];
  for (let i = -2; i <= 8; i++){
    const a = px(i*60,-80), b = px(i*60,D+150), c = px(-110,i*60), d = px(W+170,i*60);
    grid.push(`<path d="M${(cx+a[0]).toFixed(1)} ${(cy+a[1]).toFixed(1)}L${(cx+b[0]).toFixed(1)} ${(cy+b[1]).toFixed(1)}"/>`);
    grid.push(`<path d="M${(cx+c[0]).toFixed(1)} ${(cy+c[1]).toFixed(1)}L${(cx+d[0]).toFixed(1)} ${(cy+d[1]).toFixed(1)}"/>`);
  }
  const y1 = cy + corners[3][1], y2 = y1 - step, lx = cx + corners[3][0] - 24;
  return `<svg class="iso" viewBox="0 0 660 500" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <g stroke="rgba(255,255,255,.05)" stroke-width="1" stroke-dasharray="1 7">${grid.join('')}</g>
    <g stroke="#3F3F43" stroke-width="1" stroke-dasharray="3 4">${guides}</g>
    ${sheets.join('')}
    <g stroke="#5A5A5E" stroke-width="1">
      <path d="M${lx} ${y1.toFixed(1)}h12M${lx} ${y2.toFixed(1)}h12"/>
      <path d="M${lx+6} ${y1.toFixed(1)}V${y2.toFixed(1)}"/>
    </g>
    <text class="lb" x="${lx-6}" y="${((y1+y2)/2+3).toFixed(1)}" text-anchor="end">52</text>
  </svg>`;
};

/* ============================ twenty screens - one chrome, a different kind per screen ============================ */
const BELT = (n) => {
  const set = n ? C.tools.slice(4).concat(C.tools.slice(0,4)) : C.tools;
  const one = set.map(function(t){ return '<i><b></b>' + t + '</i>'; }).join('') +
    '<i class="q">anything that reads a skill file</i>';
  return '<div class="track"><span class="belt-set">' + one + '</span><span class="belt-set" aria-hidden="true">' + one + '</span></div>';
};

const KNOB = () => {
  const cx=119, cy=119, t=[];
  for (let i=0;i<40;i++){ const a=Math.PI*2*i/40-Math.PI/2, r1=88, r2=(i%10===0)?76:82;
    t.push('<path class="det'+(i===0?' on':'')+'" data-tick="'+i+'" d="M'+(cx+Math.cos(a)*r1).toFixed(1)+' '+(cy+Math.sin(a)*r1).toFixed(1)+'L'+(cx+Math.cos(a)*r2).toFixed(1)+' '+(cy+Math.sin(a)*r2).toFixed(1)+'"/>'); }
  return `<svg viewBox="0 0 238 238" fill="none" aria-hidden="true">
    <g stroke-width="1">${t.join('')}</g>
    <circle class="face" cx="119" cy="119" r="66" stroke-width="1"/>
    <circle cx="119" cy="119" r="60" fill="none" stroke="#EFEDE6"/>
    <path class="ptr" d="M119 119V66"/>
    <circle cx="119" cy="119" r="4" fill="#1F2326"/>
  </svg>`;
};

/* Screen 11 - set table in the lock file. Devices: raked ledger rows / fanned concept
   plates / plotted easing curve. Three arrangements, three depth encodings, one finish. */
const KGLYPH = [
  '<svg viewBox="0 0 34 34" fill="none" stroke="#8FA0C8"><circle cx="17" cy="17" r="12"/><path d="M17 5a12 12 0 0 1 12 12" stroke="#2349DA" stroke-width="1.6"/></svg>',
  '<svg viewBox="0 0 34 34" fill="none" stroke="#8FA0C8"><path d="M17 8l12 6-12 6-12-6z"/><path d="M5 14v6l12 6 12-6v-6"/></svg>',
  '<svg viewBox="0 0 34 34" fill="none" stroke="#8FA0C8"><path d="M28 5L9 29"/><path d="M28 5L17 29" stroke="#C3CBE1"/></svg>',
  '<svg viewBox="0 0 34 34" fill="none" stroke="#8FA0C8"><path d="M6 22a11 11 0 0 1 22 0"/><path d="M17 22l7-7" stroke="#2349DA" stroke-width="1.6"/></svg>'
];
const KFIG = [
  `<svg viewBox="0 0 400 250" role="img" aria-label="Three stacked revisions of one lock file, the newest on top with a single row locked in indigo">
<defs>
<linearGradient id="k1sky" x1=".56" y1="0" x2=".44" y2="1"><stop offset="0" stop-color="#C8D6FB"/><stop offset=".46" stop-color="#DCE5FC"/><stop offset=".88" stop-color="#fff"/></linearGradient>
<pattern id="k1grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0V28M0 28H28" fill="none" stroke="#fff" stroke-opacity=".55"/></pattern>
<linearGradient id="k1fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".78" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="k1gm"><rect width="400" height="250" fill="url(#k1fade)"/></mask>
<filter id="k1sh" x="-15%" y="-25%" width="130%" height="185%"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#283C78" flood-opacity=".18"/></filter>
</defs>
<rect width="400" height="250" fill="url(#k1sky)"/>
<rect width="400" height="250" fill="url(#k1grid)" mask="url(#k1gm)"/>

<g transform="rotate(-3 350 100)">
  <g opacity=".46"><rect x="16" y="20" width="356" height="118" rx="12" fill="#fff" filter="url(#k1sh)"/>
    <text x="350" y="35" font-size="7" fill="#5E6A8A" text-anchor="end">R0 · 7 rows</text></g>
  <g opacity=".72"><rect x="-2" y="42" width="356" height="118" rx="12" fill="#fff" filter="url(#k1sh)"/>
    <text x="332" y="57" font-size="7" fill="#5E6A8A" text-anchor="end">R1 · 11 rows</text></g>
  <g><rect x="-20" y="64" width="356" height="118" rx="12" fill="#fff" filter="url(#k1sh)"/>
    <text x="14" y="79" font-size="8.5" fill="#1B2A50">design-locks/2026-08-21-drawn-to-site.md</text>
    <text x="314" y="79" font-size="7" fill="#939CB6" text-anchor="end">R4 · 17 rows</text>
    <path d="M-20 88.5H336" stroke="#1B2A50" stroke-opacity=".14"/>
    <g font-size="7" fill="#939CB6" letter-spacing=".04em">
      <text x="14" y="100">axis</text><text x="108" y="100">locked value</text><text x="214" y="100">firm</text><text x="250" y="100">consequence</text></g>
    <path d="M-20 107.5H336" stroke="#1B2A50" stroke-opacity=".08"/>
    <rect x="-20" y="144" width="356" height="16" fill="#2349DA" opacity=".07"/>
    <g stroke="#1B2A50" stroke-opacity=".10"><path d="M-20 112.5H336M-20 128.5H336M-20 144.5H336M-20 160.5H336"/></g>

    <text x="14" y="123" font-size="7.5" fill="#5E6A8A">page shape</text><text x="108" y="123" font-size="7.5" fill="#1B2A50">one screen, no scroll</text>
    <text x="250" y="123" font-size="7.5" fill="#5E6A8A">budgets are hard</text>
    <g fill="#5E6A8A"><circle cx="215" cy="120" r="1.9"/><circle cx="222.5" cy="120" r="1.9" fill="none" stroke="#5E6A8A" stroke-width=".8"/></g>

    <text x="14" y="139" font-size="7.5" fill="#5E6A8A">cycle</text><text x="108" y="139" font-size="7.5" fill="#1B2A50">auto, 5 s, always</text>
    <text x="250" y="139" font-size="7.5" fill="#5E6A8A">arrows if reduced</text>
    <g fill="#5E6A8A"><circle cx="215" cy="136" r="1.9"/><circle cx="222.5" cy="136" r="1.9" fill="none" stroke="#5E6A8A" stroke-width=".8"/></g>

    <text x="14" y="155" font-size="7.5" fill="#2349DA">transition</text>

    <text x="108" y="155" font-size="7.5" fill="#2349DA">#2349DA</text>
    <text x="250" y="155" font-size="7.5" fill="#2349DA">no directional wipe</text>
    <g fill="#2349DA"><circle cx="215" cy="152" r="1.9"/><circle cx="222.5" cy="152" r="1.9" fill="none" stroke="#5E6A8A" stroke-width=".8"/></g>


    <text x="14" y="171" font-size="7.5" fill="#5E6A8A">headline</text><text x="108" y="171" font-size="7.5" fill="#1B2A50">four words, one line</text>
    <text x="250" y="171" font-size="7.5" fill="#5E6A8A">same in every skin</text>
    <circle cx="215" cy="168" r="1.9" fill="#5E6A8A"/>
    <g fill="none" stroke="#939CB6"><circle cx="222.5" cy="168" r="1.9" fill="none" stroke="#5E6A8A" stroke-width=".8"/></g>
  </g>
</g>

<g filter="url(#k1sh)"><rect x="228" y="214" width="156" height="26" rx="8" fill="#fff"/></g>
<circle cx="244" cy="227" r="3.2" fill="#1D9847"/>
<text x="254" y="230" font-size="8.5" fill="#1B2A50">0 rows deleted · since R0</text>
</svg>`,
  `<svg viewBox="0 0 452 250" role="img" aria-label="One feature fanning along hairline curves into three concept plates and one empty slot, the picked concept solid and carrying its recipe">
<defs>
<linearGradient id="k2sky" x1=".56" y1="0" x2=".44" y2="1"><stop offset="0" stop-color="#C8D6FB"/><stop offset=".46" stop-color="#DCE5FC"/><stop offset=".88" stop-color="#fff"/></linearGradient>
<pattern id="k2grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0V28M0 28H28" fill="none" stroke="#fff" stroke-opacity=".55"/></pattern>
<linearGradient id="k2fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".78" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="k2gm"><rect width="452" height="250" fill="url(#k2fade)"/></mask>
<filter id="k2sh" x="-15%" y="-25%" width="130%" height="185%"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#283C78" flood-opacity=".18"/></filter>
</defs>
<rect width="452" height="250" fill="url(#k2sky)"/>
<rect width="452" height="250" fill="url(#k2grid)" mask="url(#k2gm)"/>

<path d="M0 108H14" stroke="#1B2A50" stroke-opacity=".18"/>
<g fill="none" stroke="#1B2A50" stroke-opacity=".26">
  <path d="M134 108C196 108 202 47 262 47"/>
  <path d="M134 108C196 108 202 169 262 169"/>
</g>
<path d="M134 108C196 108 202 213 262 213" fill="none" stroke="#1B2A50" stroke-opacity=".16" stroke-dasharray="3 4"/>
<path d="M134 108C196 108 202 113 262 113" fill="none" stroke="#2349DA" stroke-width="1.5"/>
<circle cx="134" cy="108" r="2.2" fill="#5E6A8A"/>

<!-- A -->
<rect x="262" y="30" width="150" height="34" rx="10" fill="#fff" fill-opacity=".55" stroke="#1B2A50" stroke-opacity=".14"/>
<g fill="none" stroke="#939CB6"><path d="M276 54A14 14 0 0 1 290 40"/><path d="M277.1 47.2l-2.7-.8M280.6 42.1l-1.9-2.1M285.9 38.9l-.8-2.7"/></g>
<text x="300" y="50" font-size="8" fill="#939CB6">A · tick arc</text>

<!-- B · picked -->
<g filter="url(#k2sh)"><rect x="262" y="84" width="150" height="58" rx="10" fill="#fff"/></g>
<path d="M264.5 88v50" stroke="#2349DA" stroke-width="2.5" stroke-linecap="round"/>
<rect x="276" y="96" width="18" height="12" rx="2.5" fill="none" stroke="#939CB6"/>
<g fill="#5E6A8A"><rect x="279.4" y="98.4" width="2.2" height="4" rx="1.1"/><rect x="284.4" y="98.4" width="2.2" height="4" rx="1.1"/><rect x="289.4" y="103.4" width="2.2" height="4" rx="1.1"/></g>
<text x="300" y="106" font-size="8.5" fill="#1B2A50">B · bespoke chart</text>
<text x="278" y="124" font-size="7" fill="#939CB6">channels</text>
<path d="M312 121.5h30" stroke="#939CB6" stroke-dasharray=".8 2.6"/>
<text x="346" y="124" font-size="7.5" fill="#1B2A50">03</text>
<text x="278" y="136" font-size="7" fill="#939CB6">weights</text>
<path d="M308 133.5h34" stroke="#939CB6" stroke-dasharray=".8 2.6"/>
<text x="346" y="136" font-size="7.5" fill="#1B2A50">70/20/10</text>

<!-- C -->
<rect x="262" y="152" width="150" height="34" rx="10" fill="#fff" fill-opacity=".55" stroke="#1B2A50" stroke-opacity=".14"/>
<g fill="#939CB6"><circle cx="277" cy="164" r="1.1"/><circle cx="282" cy="164" r="1.1"/><circle cx="287" cy="164" r="1.1"/><circle cx="277" cy="169" r="1.1"/><circle cx="282" cy="169" r="1.1"/><circle cx="287" cy="169" r="1.1"/><circle cx="277" cy="174" r="1.1"/><circle cx="282" cy="174" r="1.1"/><circle cx="287" cy="174" r="1.1"/></g>
<text x="300" y="172" font-size="8" fill="#939CB6">C · comet arc</text>

<!-- D · vacant -->
<rect x="262" y="198" width="150" height="30" rx="10" fill="none" stroke="#1B2A50" stroke-opacity=".16" stroke-dasharray="4 4"/>
<path d="M283 208v10M278 213h10" stroke="#1B2A50" stroke-opacity=".22"/>

<!-- source plate -->
<g filter="url(#k2sh)"><rect x="14" y="74" width="120" height="68" rx="12" fill="#fff"/></g>
<text x="28" y="92" font-size="7" fill="#939CB6" letter-spacing=".04em">feature</text>
<text x="28" y="108" font-size="10" fill="#1B2A50">Interview</text>
<path d="M28 117.5H120" stroke="#1B2A50" stroke-opacity=".12"/>
<text x="28" y="131" font-size="7" fill="#5E6A8A">weighs, never forces</text>

<g filter="url(#k2sh)"><rect x="14" y="200" width="142" height="26" rx="8" fill="#fff"/></g>
<circle cx="30" cy="213" r="3.2" fill="#2349DA"/>
<text x="40" y="216" font-size="8.5" fill="#1B2A50">3 proposed · 1 picked</text>
</svg>`,
  `<svg viewBox="0 0 452 250" role="img" aria-label="An easing curve with its control handles plotted over a millisecond ruler, a playhead reading 115 milliseconds and a settle annotation">
<defs>
<linearGradient id="k3sky" x1=".56" y1="0" x2=".44" y2="1"><stop offset="0" stop-color="#C8D6FB"/><stop offset=".46" stop-color="#DCE5FC"/><stop offset=".88" stop-color="#fff"/></linearGradient>
<pattern id="k3grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0V28M0 28H28" fill="none" stroke="#fff" stroke-opacity=".55"/></pattern>
<linearGradient id="k3fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".78" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="k3gm"><rect width="452" height="250" fill="url(#k3fade)"/></mask>
<filter id="k3sh" x="-15%" y="-25%" width="130%" height="185%"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#283C78" flood-opacity=".18"/></filter>
</defs>
<rect width="452" height="250" fill="url(#k3sky)"/>
<rect width="452" height="250" fill="url(#k3grid)" mask="url(#k3gm)"/>

<g font-size="7" fill="#939CB6" text-anchor="end"><text x="34" y="73">1.0</text><text x="34" y="133">0.5</text><text x="34" y="193">0</text></g>
<g stroke="#1B2A50" stroke-opacity=".07"><path d="M208 190V124M290 190V124"/></g>
<path d="M44 70.5H162" stroke="#1B2A50" stroke-opacity=".14" stroke-dasharray="4 4"/>
<path d="M44 130.5H372" stroke="#1B2A50" stroke-opacity=".10" stroke-dasharray="1 4"/>
<path d="M44 190.5H384" stroke="#1B2A50" stroke-opacity=".26"/>

<path d="M44 190L116.2 70M372 70H162.1" stroke="#1B2A50" stroke-opacity=".32"/>
<rect x="113.7" y="67.5" width="5" height="5" fill="#5E6A8A"/>
<rect x="159.6" y="67.5" width="5" height="5" fill="#5E6A8A"/>
<circle cx="44" cy="190" r="2.8" fill="#fff" stroke="#5E6A8A"/>
<circle cx="372" cy="70" r="2.8" fill="#fff" stroke="#5E6A8A"/>

<path d="M44 190C116.2 70 162.1 70 372 70" fill="none" stroke="#2349DA" stroke-width="1.5" stroke-linecap="round"/>

<path d="M314 70v11" stroke="#1B2A50" stroke-opacity=".3"/>
<text x="314" y="92" font-size="7" fill="#939CB6" text-anchor="middle">settles 378 ms</text>

<path d="M126 56v148" stroke="#1B2A50" stroke-opacity=".28"/>
<path d="M126 98V152H222" fill="none" stroke="#1B2A50" stroke-opacity=".28"/>
<circle cx="126" cy="98" r="3.2" fill="#1B2A50"/>

<path d="M44 204.5H372" stroke="#1B2A50" stroke-opacity=".22"/>
<g stroke="#1B2A50" stroke-opacity=".16"><path d="M60.4 204v4M76.8 204v4M93.2 204v4M109.6 204v4M142.4 204v4M158.8 204v4M175.2 204v4M191.6 204v4M224.4 204v4M240.8 204v4M257.2 204v4M273.6 204v4M306.4 204v4M322.8 204v4M339.2 204v4M355.6 204v4"/></g>
<g stroke="#1B2A50" stroke-opacity=".3"><path d="M44 204v8M126 204v8M208 204v8M290 204v8M372 204v8"/></g>
<g font-size="7" fill="#939CB6" text-anchor="middle"><text x="44" y="222">0</text><text x="126" y="222">115</text><text x="208" y="222">230</text><text x="290" y="222">345</text><text x="372" y="222">460</text></g>
<text x="380" y="222" font-size="7" fill="#939CB6">ms</text>
<text x="44" y="238" font-size="7" fill="#939CB6">read off 28 frames · 60 fps</text>

<g filter="url(#k3sh)"><rect x="16" y="16" width="188" height="26" rx="8" fill="#fff"/></g>
<text x="28" y="32.5" font-size="8" fill="#1B2A50">ease-out · cubic-bezier(.22,1,.36,1)</text>
<g filter="url(#k3sh)"><rect x="222" y="139" width="154" height="26" rx="8" fill="#fff"/></g>
<circle cx="236" cy="152" r="3.2" fill="#1B2A50"/>
<text x="246" y="155" font-size="8" fill="#1B2A50">115 ms · 0.766 · blur 2.8 px</text>
</svg>`
];

/* Screen 10 - set table in the lock file. Three registers, three devices, one finish:
   every stroke 1px, guides #3F3F43, outlines #6E6E72, ONE near-white focal per cell,
   the green marks only the living datum. */
const FIGS = {
  discover: `<svg viewBox="0 0 300 170" fill="none" stroke="#6E6E72" stroke-width="1" vector-effect="non-scaling-stroke" aria-hidden="true"
     font-family="Geist Mono, ui-monospace, Menlo, monospace" letter-spacing=".02em" style="font-variant-numeric:tabular-nums">
 <defs><pattern id="a_discover" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
   <path d="M0 0V6" stroke="#20202A" stroke-width="1"/></pattern></defs>
 <path d="M196.5 16V154" stroke="#3F3F43" stroke-dasharray="2 3"/>
 <path d="M0 134.5H124a16 16 0 0 0 16-16v-18a16 16 0 0 1 16-16h19"/>
 <path d="M0 84.5h175"/>
 <path d="M0 34.5H124a16 16 0 0 1 16 16v18a16 16 0 0 0 16 16h19" stroke="#A9E494"/>
 <rect x="174.5" y="62.5" width="44" height="44" fill="#060608" stroke="none"/>
 <rect x="175" y="63" width="43" height="43" fill="url(#a_discover)" stroke="none"/>
 <path d="M174.5 81.5V62.5h44v44h-44V87.5" stroke="#EDEDF0"/>
 <circle cx="174.5" cy="84.5" r="2" fill="#A9E494" stroke="none"/>
 <rect x="26.5" y="25.5" width="82" height="18" fill="#060608"/>
 <rect x="26.5" y="75.5" width="82" height="18" fill="#060608"/>
 <rect x="26.5" y="125.5" width="82" height="18" fill="#060608"/>
 <circle cx="108.5" cy="34.5" r="1.8" fill="#A9E494" stroke="none"/>
 <text x="33" y="37" font-size="6.5" fill="#6E6E72" stroke="none">design-locks/</text>
 <text x="33" y="87" font-size="6.5" fill="#6E6E72" stroke="none">AGENTS.md</text>
 <text x="33" y="137" font-size="6.5" fill="#6E6E72" stroke="none">src/</text>
 <text x="26.5" y="54" font-size="6" fill="#6E6E72" stroke="none">17 rows</text>
 <text x="26.5" y="104" font-size="6" fill="#6E6E72" stroke="none">0 found</text>
 <text x="26.5" y="154" font-size="6" fill="#6E6E72" stroke="none">69 files</text>
 <path d="M228 84.5h56" stroke="#3F3F43"/>
 <text x="174.5" y="124" font-size="6.5" fill="#6E6E72" stroke="none">read</text>
 <text x="284" y="80" font-size="6" fill="#6E6E72" stroke="none" text-anchor="end">questions asked</text>
 <text x="284" y="96" font-size="12" fill="#6E6E72" stroke="none" text-anchor="end">0</text>
</svg>`,
  interview: `<svg viewBox="0 0 300 170" fill="none" stroke="#3F3F43" stroke-width="1" vector-effect="non-scaling-stroke" aria-hidden="true"
     font-family="Geist Mono, ui-monospace, Menlo, monospace" letter-spacing=".02em" style="font-variant-numeric:tabular-nums">
 <path d="M36.5 22.5h240" stroke-dasharray="2 3"/>
 <path d="M36.5 126.5h240"/>
 <path d="M36.5 126.5h6M36.5 74.5h6M36.5 22.5h6"/>
 <path d="M39.5 116.5h3M39.5 105.5h3M39.5 95.5h3M39.5 84.5h3M39.5 64.5h3M39.5 53.5h3M39.5 43.5h3M39.5 32.5h3"/>
 <text x="33" y="25" font-size="6" fill="#6E6E72" stroke="none" text-anchor="end">100</text>
 <text x="33" y="77" font-size="6" fill="#6E6E72" stroke="none" text-anchor="end">50</text>
 <text x="33" y="129" font-size="6" fill="#6E6E72" stroke="none" text-anchor="end">0</text>
 <path d="M78.5 22.5v104M162.5 22.5v104M246.5 22.5v104"/>
 <rect x="52.5" y="65.5" width="52" height="8" stroke-dasharray="2 2"/>
 <path d="M112.5 53.5v16M109.5 53.5h6M109.5 69.5h6"/>
 <text x="119" y="63.5" font-size="6" fill="#6E6E72" stroke="none">+15</text>
 <rect x="52.5" y="49.5" width="52" height="8" fill="#EDEDF0" stroke="none"/>
 <path d="M62.5 53.5h32" stroke="#060608"/>
 <rect x="136.5" y="101.5" width="52" height="8" fill="#6E6E72" stroke="none"/>
 <path d="M146.5 105.5h32" stroke="#060608"/>
 <rect x="220.5" y="111.5" width="52" height="8" fill="#6E6E72" stroke="none"/>
 <path d="M230.5 115.5h32" stroke="#060608"/>
 <text x="104.5" y="45" font-size="9" fill="#A9E494" stroke="none" text-anchor="end">70</text>
 <text x="188.5" y="97" font-size="9" fill="#6E6E72" stroke="none" text-anchor="end">20</text>
 <text x="272.5" y="107" font-size="9" fill="#6E6E72" stroke="none" text-anchor="end">10</text>
 <text x="78.5" y="139" font-size="6" fill="#6E6E72" stroke="none" text-anchor="middle">Editorial</text>
 <text x="78.5" y="147" font-size="6" fill="#6E6E72" stroke="none" text-anchor="middle">Monochrome</text>
 <text x="162.5" y="139" font-size="6" fill="#6E6E72" stroke="none" text-anchor="middle">Staged</text>
 <text x="162.5" y="147" font-size="6" fill="#6E6E72" stroke="none" text-anchor="middle">Atmosphere</text>
 <text x="246.5" y="139" font-size="6" fill="#6E6E72" stroke="none" text-anchor="middle">Blueprint</text>
 <text x="246.5" y="147" font-size="6" fill="#6E6E72" stroke="none" text-anchor="middle">Sheet</text>
 <text x="36.5" y="163" font-size="6" fill="#6E6E72" stroke="none">blend proposal</text>
 <text x="276" y="163" font-size="6" fill="#6E6E72" stroke="none" text-anchor="end">70 + 20 + 10 = 100</text>
</svg>`,
  lock: `<svg viewBox="0 0 300 170" fill="none" stroke="#3F3F43" stroke-width="1" vector-effect="non-scaling-stroke" aria-hidden="true"
     font-family="Geist Mono, ui-monospace, Menlo, monospace" letter-spacing=".02em" style="font-variant-numeric:tabular-nums">
 <path d="M8.5 30.5h256M8.5 48.5h256M8.5 74.5h256M8.5 100.5h256M8.5 126.5h256"/>
 <path d="M36.5 30.5v96M96.5 30.5v96M182.5 30.5v96"/>
 <path d="M4.5 30.5h8M8.5 26.5v8M260.5 30.5h8M264.5 26.5v8M4.5 126.5h8M8.5 122.5v8M260.5 126.5h8M264.5 122.5v8"/>
 <g stroke="none" font-size="6" fill="#6E6E72">
   <text x="13" y="42">rev</text><text x="41" y="42">axis</text><text x="101" y="42">locked</text><text x="187" y="42">firmness</text>
 </g>
 <g stroke="none" font-size="6.5" fill="#3F3F43">
   <text x="13" y="64">R0</text><text x="41" y="64">cycle</text><text x="101" y="64">auto, 5 s</text><text x="195" y="64">prefer</text>
 </g>
 <rect x="187.5" y="59.5" width="4" height="4"/>
 <g stroke="none" font-size="6.5" fill="#6E6E72">
   <text x="13" y="90">R1</text><text x="41" y="90">transition</text><text x="101" y="90">cross-fade 700 ms</text><text x="195" y="90">must-have</text>
 </g>
 <rect x="187.5" y="85.5" width="4" height="4" fill="#6E6E72" stroke="none"/>
 <g stroke="none" font-size="6.5" fill="#EDEDF0">
   <text x="13" y="116">R2</text><text x="41" y="116">page shape</text><text x="195" y="116">must-have</text>
 </g>
 <text x="101" y="116" font-size="6.5" fill="#A9E494" stroke="none">one screen</text>
 <rect x="187.5" y="111.5" width="4" height="4" fill="#EDEDF0" stroke="none"/>
 <path d="M264.5 113.5h24" stroke="#A9E494"/>
 <circle cx="270.5" cy="113.5" r="1.8" fill="#A9E494" stroke="none"/>
 <path d="M300 101.5h-11.5v8M300 125.5h-11.5v-8"/>
 <text x="8.5" y="141" font-size="6" fill="#6E6E72" stroke="none">5 revisions · 0 removed</text>
</svg>`
};
const GAUGE = () => {
  const on=window.DrawnToLibrary.total, N=Math.max(100,Math.ceil(on/25)*25), cx=300, cy=250, r1=168, r2=196, t=[];
  for(let i=0;i<N;i++){ const a=Math.PI*(1.055 + .89*i/(N-1)), c=Math.cos(a), v=Math.sin(a);
    t.push(`<path class="tk${i<on?' on':''}" d="M${(cx+c*r1).toFixed(1)} ${(cy+v*r1).toFixed(1)}L${(cx+c*r2).toFixed(1)} ${(cy+v*r2).toFixed(1)}" stroke-width="${i<on?2.2:1.4}" stroke-linecap="round"/>`); }
  const ae=Math.PI*(1.055+.89*(on-1)/(N-1));
  return `<svg class="gauge" viewBox="0 0 600 330" fill="none" aria-hidden="true">
    <defs><filter id="gb" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7"/></filter></defs>
    <circle cx="${(cx+Math.cos(ae)*182).toFixed(1)}" cy="${(cy+Math.sin(ae)*182).toFixed(1)}" r="13" fill="rgba(255,180,60,.45)" filter="url(#gb)"/>
    <path d="M98 215A207 207 0 0 1 502 215" stroke="#4a4235" stroke-width="1"/><path d="M144 226A160 160 0 0 1 456 226" stroke="#2d302e" stroke-width="1"/><g>${t.join('')}</g>
    <text class="rd" x="${cx}" y="244" text-anchor="middle">${on}</text>
    <text class="un" x="${cx}" y="270" text-anchor="middle">REFERENCES</text>
    <text class="sp" x="${cx}" y="302" text-anchor="middle">library snapshot · scale 0–${N}</text>
  </svg>`;
};
const SCREEN = {
  a: f => `<i class="atmos" aria-hidden="true"></i><i class="atmos sharp" aria-hidden="true"></i><div class="grain"></div><div class="col">${TOP()}<div class="body"><div class="copyblock">${H1('a',f)}${SUB('a')}${CMD()}</div>${CORE()}</div>${BOTTOM('a')}</div>`,
  b: f => `<div class="grain"></div><div class="col">${TOP()}<div class="body">${H1('b',f)}${SUB('b')}<div class="pebble">${CMD()}</div></div>${BOTTOM('b')}</div>`,
  c: f => `<div class="col">${TOP()}<div class="body"><div class="mat"><i class="cm tl"></i><i class="cm tr"></i><i class="cm bl"></i><i class="cm br"></i><div class="in">${H1('c',f)}${SUB('c')}${CMD()}${NUMS('meta')}</div><div class="slab" aria-hidden="true"><i class="ht"></i><i class="grain"></i></div></div></div>${BOTTOM('c')}</div>`,
  d: f => `<div class="beam" aria-hidden="true"></div><div class="dust" aria-hidden="true"></div><div class="grain"></div><div class="col">${TOP()}<div class="body">${H1('d',f)}${SUB('d')}${CMD()}</div>${BOTTOM('d')}</div>`,
  e: f => `<div class="col">${TOP()}<div class="body"><div>${H1('e',f)}${SUB('e')}${CMD()}</div>${RING()}<div class="lines">${C.nums.map(([n,l])=>`<span><b data-count="${n}">${n}</b> ${l}</span>`).join('')}</div></div>${BOTTOM('e')}</div>`,
  f: f => `<div class="scaffold" aria-hidden="true"><i></i></div><div class="col">${TOP()}<div class="body">${H1('f',f)}${SUB('f')}${CMD()}</div>${BOTTOM('f')}</div>`,
  g: f => `<div class="col">${TOP()}<div class="body"><div>${H1('g',f)}${SUB('g')}${CMD()}</div>${ISO()}</div>${BOTTOM('g')}</div>`,
  h: f => `<div class="grain"></div><div class="col">${TOP()}<div class="body">${H1('h',f)}${SUB('h')}<div class="lit">${CMD()}<i class="fill"></i></div></div>${BOTTOM('h')}</div>`,
  i: f => `<div class="col">${TOP()}<div class="body">${H1('i',f)}${SUB('i')}${CMD_HW()}</div>${BOTTOM('i')}</div>`,

  /* J - feature trio, shared-border FIG plates (0xSero-2090) */
  j: f => `<div class="col">${TOP()}<div class="stage"><h2 class="head${f?' first':''}">How it runs</h2><div class="trio">${C.steps.map(([n,t2,p2,sp],ix)=>`<div class="cell"><span class="n">FIG. ${n}</span><div class="fig">${FIGS[['discover','interview','lock'][ix]]}</div><h3>${t2}</h3><p>${p2}</p><ul class="spec">${sp.map(x=>`<li><b>${x.split(' ')[0]}</b>${x.split(' ').slice(1).join(' ')}</li>`).join('')}</ul></div>`).join('')}</div></div>${BOTTOM('j')}</div>`,

  /* K - feature trio, pebble dissolve with floating fragments (Triopixels-2089) */
  k: f => `<div class="col">${TOP()}<div class="stage"><h2 class="head${f?' first':''}">What it hands you</h2><div class="trio">${C.out.map(function(o,ix){return `<div class="peb"><div class="viz">${KFIG[ix]}</div><div class="txt"><h3>${o[0]}</h3><p>${o[1]}</p></div></div>`;}).join('')}</div></div>${BOTTOM('k')}</div>`,

  /* L - ledger sheet with dotted leaders (basit_designs-2089995, yurygok-2089624) */
  l: f => `<div class="col">${TOP()}<div class="body"><div class="sheet"><div class="hd"><h2>The original twelve</h2><span>historical sample · now scoped by context</span></div><div class="rows">${C.consts.map(([k2,t2,v])=>`<div class="r"><span class="k">${k2}</span><span class="t"><span>${t2}</span><i></i></span><span class="v">${v}</span></div>`).join('')}</div><div class="band" aria-hidden="true"></div></div></div>${BOTTOM('l')}</div>`,

  /* M - gallery of family plates over one processed chroma field (kevserctk-2090) */
  m: f => `<div class="mosaic" aria-hidden="true"></div><div class="grain"></div><div class="col">${TOP()}<div class="stage"><h2 class="head${f?' first':''}">Eight families</h2><div class="plates">${C.fams.map(([id,nm,sw,ct])=>`<div class="pl"><span class="id">${id}</span><div class="sw">${sw.map(c=>`<i style="background:${c}"></i>`).join('')}</div><h3>${nm}</h3><small>starting vocabulary</small></div>`).join('')}</div></div>${BOTTOM('m')}</div>`,

  /* N - metrics, one bespoke chart form invented for this data (yurygok-2089624) */
  n: f => `<div class="col">${TOP()}<div class="stage"><h2 class="head${f?' first':''}">The original family sample</h2><p class="headsub">Historical family membership in the initial sample. Newer references extend the library beyond these groups.</p><div class="plot">${C.fams.map(([,nm,,ct])=>`<span class="fid">${nm}</span><span class="dots">${Array.from({length:ct},()=>'<i></i>').join('')}</span><span class="ct">${ct}</span>`).join('')}</div></div>${BOTTOM('n')}</div>`,

  /* O - one illustrative product fragment, held mid-answer */
  o: f => `<div class="col">${TOP()}<div class="body" style="justify-content:center"><div class="frag"><div class="bar"><span>example · question 3 of 8</span><span>weighted multi-select</span></div><div class="q">Which directions should the blend carry?</div><div class="opts"><div class="op on"><span class="box"></span><span>Editorial Monochrome</span><span class="wt">70</span></div><div class="op on"><span class="box"></span><span>Staged Atmosphere</span><span class="wt">20</span></div><div class="op on"><span class="box"></span><span>Blueprint Sheet</span><span class="wt">10</span></div><div class="op"><span class="box"></span><span>Soft Pastel Stage</span><span class="wt">0</span></div></div><div class="ft"><span>clash check: none</span><span><b>100</b> / 100</span></div></div></div>${BOTTOM('o')}</div>`,

  /* P - chapters: numbered index rail + one panel (piyushsphere-2089714) */
  p: f => `<div class="col">${TOP()}<div class="body"><div class="chap"><div class="rail">${C.six.map(([ix,lb],i)=>`<button type="button" class="st${i===2?' on':''}" data-step="${i}" aria-pressed="${i===2}"><span class="ix">${ix}</span><span class="lb">${lb}</span></button>`).join('')}</div><div class="panel" data-swap="in"><div class="swapzone"><div><h3>${C.six[2][1]}</h3><p>${C.six[2][2]}</p><ul class="spec">${C.six[2][3].map(([k,v])=>`<li><b>${k}</b>${v}</li>`).join('')}</ul></div></div></div></div></div>${BOTTOM('p')}</div>`,

  /* Q - 2x2 outlined bento, one focal and three ghosted (C11) */
  q: f => `<div class="col">${TOP()}<div class="stage"><h2 class="head${f?' first':''}">Beyond the direction</h2><div class="bento">${C.pillars.map(([t2,p2,ml,fo],ix)=>`<div class="bc${fo?' focal':''}">${window.DrawnToLegacyDetail(ix)}<h3>${t2}</h3><p>${p2}</p><ul class="ml">${ml.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}</div></div>${BOTTOM('q')}</div>`,

  /* R - instrument HUD: segmented gauge reading the corpus (recentdesign-2089) */
  r: f => `<div class="col">${TOP()}<div class="body" style="justify-content:center;gap:26px">${GAUGE()}<div class="reads"><span>FAMILIES <b>08</b></span><span>DEFAULTS <b>12</b></span><span>SCENES <b>${TOTAL}</b></span></div></div>${BOTTOM('r')}</div>`,

  /* S - gallery of paper slips: revisions never erase (AlexandruDranga-2090) */
  s: f => `<div class="grain"></div><div class="col">${TOP()}<div class="stage"><h2 class="head${f?' first':''}">Revisions add, never erase</h2><div class="slips">${C.rev.map(([rv,t2,p2])=>`<div class="slip"><i class="cm2 a"></i><i class="cm2 b"></i><span class="rv">${rv}</span><h3>${t2}</h3><p>${p2}</p></div>`).join('')}</div></div>${BOTTOM('s')}</div>`,

  /* 21 - comparison. One frame, one travelling divider: the only variable is the library. */
  u: f => `<div class="col">${TOP()}<div class="body"><h2 class="head${f?' first':''}">Two earlier approaches.</h2><p class="headsub">An archived comparison from the first library experiments. Look at how the second approach gives each feature its own visual evidence.</p><span class="compare-hint">Swipe to compare both treatments →</span><div class="diptych" data-scroll-region tabindex="0" role="region" aria-label="Archived visual comparison"><img src="assets/proof-same-model-same-brief.jpg" alt="Left: a competent anonymous dark bento built without a taste library. Right: the same model with a divider-cut, radius-zero, numbered section carrying instrument illustrations."></div><div class="dcap"><span>earlier treatment</span><span><b>archived example</b></span><span>with reference studies</span></div></div>${BOTTOM('u')}</div>`,

  /* 22 - ledger of refusals. The rule through each line is the device. */
  v: f => `<div class="col">${TOP()}<div class="body"><h2 class="head${f?' first':''}">What the review catches</h2><div class="no">${C.refuse.map(function(r){return '<i><em>'+r[0]+'</em><s>'+r[1]+'</s></i>';}).join('')}</div><p class="nofoot">observable problems · reviewed in the actual render</p></div>${BOTTOM('v')}</div>`,

  /* 23 - metrics. Two runners, and the argument is that one never accelerates. */
  w: f => `<div class="col">${TOP()}<div class="body"><h2 class="head${f?' first':''}">Give motion a purpose.</h2><div class="reg"><div class="a"><div class="lab"><span><b>ambient</b> &middot; the background is alive</span><span>linear &middot; constant velocity &middot; 4 s</span></div><div class="tr">${[1,2,3,4,5,6,7].map(function(i){return '<i class="tk" style="left:'+(i*12.5)+'%"></i>';}).join('')}<i class="dot"></i></div></div><div class="b"><div class="lab"><span><b>interaction</b> &middot; something answered you</span><span>eased traverse &middot; held endpoint &middot; 2.6 s cycle</span></div><div class="tr">${[1,2,3,4,5,6,7].map(function(i){return '<i class="tk" style="left:'+(i*12.5)+'%"></i>';}).join('')}<i class="dot"></i></div></div></div><p class="regfoot">two examples, not two laws · choose the timing that serves the action</p></div>${BOTTOM('w')}</div>`,

  /* 24 - instrument. A rotary with four detents; the reading is the stop condition. */
  x: f => `<div class="col">${TOP()}<div class="body"><div class="knob">${KNOB()}</div><div><h2 class="head${f?' first':''}">When it stops</h2><div class="stops">${C.stops.map(function(st,i){return '<button type="button" data-stop="'+i+'" aria-pressed="'+(i===0)+'"><i>'+st[0]+'</i><span>'+st[1]+'<small>'+st[2]+'</small></span></button>';}).join('')}</div></div></div>${BOTTOM('x')}</div>`,

  /* 25 - gallery. Fifty-one tiles, one per post; the fill is the mode it was read in. */
  y: f => `<div class="col">${TOP()}<div class="body"><h2 class="head${f?' first':''}">An earlier 57-reference snapshot</h2><div class="sheetgrid">${C.sheet.split(' ').map(function(t){return '<span class="t '+t[1]+'"><i style="width:'+({b:14,s:11,f:9,c:7,h:13,i:8,d:12,r:5,l:10}[t[0]]||9)+'px;height:'+({b:4,s:9,f:9,c:4,h:3,i:7,d:8,r:5,l:6}[t[0]]||5)+'px"></i></span>';}).join('')}<i class="scan"></i></div><div class="leg"><span><em style="background:#FFFDF9"></em><b>25</b> light</span><span><em style="background:#26251F;border-color:#26251F"></em><b>21</b> dark</span><span><em style="background:linear-gradient(135deg,#FFFDF9 0 50%,#26251F 50% 100%)"></em><b>5</b> both</span><span><em style="background:#FFFDF9;background-image:repeating-linear-gradient(45deg,#C7C3B7 0 1px,transparent 1px 5px)"></em><b>6</b> mixed</span><span>the mark inside is what the post shows</span></div></div>${BOTTOM('y')}</div>`,

  /* 26 - matrix. Eight families against themselves; the marks are measured co-occurrence. */
  z: f => `<div class="col">${TOP()}<div class="body"><div class="mx"><span></span>${C.fams8.map(function(n){return '<span class="hd"><span>'+n.split(' ')[0]+'</span></span>';}).join('')}${C.fams8.map(function(n,r){return '<span class="rw">'+n+'</span>'+C.fams8.map(function(_,c){
      if (r===c) return '<span class="c self" aria-hidden="true"></span>';
      var k = C.pairs[r+'-'+c] || C.pairs[c+'-'+r];
      return '<button type="button" class="c '+(k?k[0]:'')+'" data-p="'+(k?(C.pairs[r+'-'+c]?r+'-'+c:c+'-'+r):'')+'" data-row="'+r+'" data-column="'+c+'" tabindex="'+(r===0&&c===1?'0':'-1')+'" aria-label="'+n+' with '+C.fams8[c]+'">'+(k&&k[0]==='ok'?'<i></i>':'')+'</button>';
    }).join('');}).join('')}</div><div class="read"><span class="k">EXPLORE A PAIR</span><h3 id="mxh">How two vocabularies meet</h3><p id="mxp">Eight starting families, twenty-eight possible pairs. Some share an established vocabulary; others need a deliberate material or layout decision.</p><span class="tag" id="mxt">5 documented &middot; 3 to reconcile &middot; 20 unassessed</span></div></div>${BOTTOM('z')}</div>`,

  /* 27 - frozen interaction. A real run, one line at a time. */
  A: f => `<div class="col">${TOP()}<div class="body"><div class="term"><div class="bar"><i></i><i></i><i></i><span>an illustrative workflow</span></div><div class="log">${C.run.map(function(l,i){return l[0]==='sp'?'<div class="sp"></div>':'<div class="'+l[0]+'" data-i="'+i+'">'+(l[0]==='p'?'<em>$</em>':'')+l[1]+'</div>';}).join('')}</div></div></div>${BOTTOM('A')}</div>`,

  /* 28 - marquee. Two belts, opposite directions, linear; the last chip is the real claim. */
  B: f => `<div class="col">${TOP()}<div class="body"><h2 class="head${f?' first':''}">It runs wherever the agent reads its skills.</h2><p class="headsub">Portable instructions, visual references and practical recipes. Bring them to an agent that supports skills.</p><div class="belt">${BELT(0)}</div><div class="belt r">${BELT(1)}</div></div>${BOTTOM('B')}</div>`,

  /* 29 - spec sheet. Seven measured containers as dimension chains, longest first. */
  C: f => `<div class="col">${TOP()}<div class="body"><h2 class="head${f?' first':''}">A study in proportion.</h2><p class="headsub">Seven container measurements from the August 2026 archive, viewed at 1440px. Historical observations, not limits for your project.</p><div class="meas">${C.sites.map(function(st){return '<div class="m'+(st[0]==='Vercel'?' hot':'')+'"><span class="s">'+st[0]+'</span><span class="ch"><i style="width:'+(st[1]/1440*100).toFixed(1)+'%"></i></span><span class="v">'+st[1]+'</span></div>';}).join('')}</div><div class="cfoot"><span>shared scale <b>0–1440 px</b></span><span>snapshot <b>August 2026</b></span><span>adapt to <b>content &amp; viewport</b></span></div></div>${BOTTOM('C')}</div>`,

  /* 30 - comparison. Not one skeleton dimmed: two skeletons, each material re-derived. */
  D: f => `<div class="col">${TOP()}<div class="body"><h2 class="head${f?' first':''}">Both modes, re-derived.</h2><div class="pair"><div class="sk lt"><span class="cap">LIGHT</span>${[0,1,2,3].map(function(i){return '<div class="row" data-m="'+i+'"><b style="width:'+[62,48,70,54][i]+'%"></b><b class="'+(i===1?'ac':'')+'" style="width:'+[38,26,44,32][i]+'%"></b></div>';}).join('')}</div><div class="mid">${C.modes.map(function(m,i){return '<button type="button" data-mode="'+i+'" aria-pressed="'+(i===1)+'"><i>'+m[0]+'</i><span>'+m[1]+'</span></button>';}).join('')}</div><div class="sk dk"><span class="cap">DARK</span>${[0,1,2,3].map(function(i){return '<div class="row" data-m="'+i+'"><b style="width:'+[62,48,70,54][i]+'%"></b><b class="'+(i===1?'ac':'')+'" style="width:'+[38,26,44,32][i]+'%"></b></div>';}).join('')}</div></div><p class="dfoot" id="dfoot">${C.modes[1][2]} &nbsp;/&nbsp; ${C.modes[1][3]}</p></div>${BOTTOM('D')}</div>`,

  /* T - the close: one lit line, the anchor statement returns */
  t: f => `<div class="col">${TOP()}<div class="body">${H1('t',f)}${CMD()}</div>${BOTTOM('t')}</div><i class="lit2" aria-hidden="true"></i>`
};

const EXTRA_MAP = new Map(EXTRA_PAGES.map(page => [page.id,page]));
for (const page of EXTRA_PAGES) SCREEN[page.id] = () => {
  const theme=page.theme;
  return `<div class="xp-shell" style="--xp-bg:${theme.background};--xp-ink:${theme.ink};--xp-muted:${theme.muted};--xp-accent:${theme.accent}"><header class="xp-header"><a class="xp-brand" href="#${ORDER[0]}">Drawn To</a><div class="scene-actions">${STYLE_ACTIONS()}<a class="xp-github" href="${C.repo}">GitHub ↗</a></div></header><section class="xp-stage xp-${page.id}">${page.render({command:C.cmd})}</section><footer class="xp-footer">${String(ORDER.indexOf(page.id)+1).padStart(2,'0')} / ${TOTAL} · ${page.name}</footer></div>`;
}
let extraAbort=null, extraCleanup=null, renderGeneration=0;

/* ============================ engine ============================ */
const params = new URLSearchParams(location.search);
const still = params.has('still');
const sceneStill = params.has('poster') || params.has('t');
let paused = still || reduce;
const routes=window.DrawnToRoutes;
let idx = Math.max(0, ORDER.indexOf(routes.resolve((location.hash||'#').slice(1) || params.get('v'))));
let first = true, timer = null;
const app = document.getElementById('app');
const live = document.getElementById('live');
const dock = document.getElementById('chrome');
dock.innerHTML = CTL(paused);

/* per-screen ambient beats. Ambient register only: constant cadence, eased swap,
   nothing that re-stages the screen on arrival (C12), everything stopped under reduced motion. */
let beats = [], beatTimeouts = [];
function stopBeats(){ beats.forEach(clearInterval); beats = []; }
function stopBeatTimeouts(){beatTimeouts.forEach(clearTimeout);beatTimeouts=[];}
const BEAT = {
  a: function(){
    const head=document.getElementById('head'), lead=document.getElementById('leader'),
          sw=document.getElementById('sw'), r=[0,1,2,3].map(function(i){return document.getElementById('r'+i);});
    if (!head || r.some(function(x){return !x;})) return;
    const N=CORELAM.length, H=8;
    var i=0;
    function step(){
      const d=CORELAM[N-1-i], t='translate(0 '+(i*H)+')';
      head.setAttribute('transform',t);
      const y=162+i*H;
      lead.setAttribute('d','M320 '+y+' h20 V182 H346');
      r[0].textContent=String(N-i).padStart(2,'0')+' / '+N;
      r[1].textContent=d[0]; r[2].textContent=d[1];
      r[3].textContent=d[2]||'not recorded';
      sw.setAttribute('fill', d[2]||'#2A2E36');
      i=(i+1)%N;
    }
    step();
    if (reduce) return;
    beats.push(setInterval(step, 240));
  },
  D: function(){
    const btns = document.querySelectorAll('.mid button'), foot = document.getElementById('dfoot');
    if (!btns.length) return;
    function pick(n){
      btns.forEach(function(b,i){ b.setAttribute('aria-pressed', i === n); });
      document.querySelectorAll('.sk .row').forEach(function(r){ r.classList.toggle('on', +r.dataset.m === n); });
      document.querySelectorAll('.sk .row b:nth-child(2)').forEach(function(b,i){ b.classList.toggle('ac', (i % 4) === n); });
      foot.innerHTML = C.modes[n][2] + ' &nbsp;/&nbsp; ' + C.modes[n][3];
    }
    document.querySelector('.mid').addEventListener('click', function(e){
      const b = e.target.closest('button'); if (b) pick(+b.dataset.mode);
    });
    pick(1);
    if (reduce) return;
    var n = 1;
    beats.push(setInterval(function(){ n = (n + 1) % C.modes.length; pick(n); }, 3000));
  },
  z: function(){
    const matrix=document.querySelector('.mx'),cells=[...matrix.querySelectorAll('button')];
    const heading=document.getElementById('mxh'),description=document.getElementById('mxp'),tag=document.getElementById('mxt');
    function show(cell){
      cells.forEach(other=>{other.classList.toggle('on',other===cell);other.tabIndex=other===cell?0:-1;});
      const pair=C.pairs[cell.dataset.p];
      heading.textContent=pair?.[1]||cell.getAttribute('aria-label');
      description.textContent=pair?.[2]||'This pair has no detailed assessment in the early sample. Explore a composition, then judge how the surfaces, type and material work together.';
      tag.textContent=pair?(pair[0]==='ok'?'documented vocabulary':'needs reconciliation'):'not yet assessed';
      tag.className='tag '+(pair?.[0]||'');
    }
    for(const type of ['mouseover','focusin','click'])matrix.addEventListener(type,event=>{const cell=event.target.closest('button');if(cell)show(cell);});
    matrix.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
      const cell=event.target.closest('button');if(!cell)return;event.preventDefault();event.stopPropagation();
      if(event.key==='Home'||event.key==='End'){cells[event.key==='Home'?0:cells.length-1].focus();return;}
      const dx=event.key==='ArrowLeft'?-1:event.key==='ArrowRight'?1:0,dy=event.key==='ArrowUp'?-1:event.key==='ArrowDown'?1:0;
      let row=+cell.dataset.row,column=+cell.dataset.column;
      for(let i=0;i<8;i++){row=(row+dy+8)%8;column=(column+dx+8)%8;const next=matrix.querySelector(`[data-row="${row}"][data-column="${column}"]`);if(next){next.focus();break;}}
    });
  },
  A: function(){
    document.querySelectorAll('.term .log div[data-i]').forEach(line=>line.classList.add('in'));
  },
  x: function(){
    const stops = document.querySelectorAll('.stops button'), ptr = document.querySelector('.knob .ptr'), dets = document.querySelectorAll('.knob .det');
    if (!stops.length || !ptr) return;
    function pick(n){
      stops.forEach(function(b,i){ b.setAttribute('aria-pressed', i === n); });
      ptr.style.transform = 'rotate(' + (n * 90) + 'deg)';
      dets.forEach(function(d,i){ d.classList.toggle('on', i === n * 10); });
    }
    document.querySelector('.stops').addEventListener('click', function(e){
      const b = e.target.closest('button'); if (b) pick(+b.dataset.stop);
    });
    if (reduce) return;
    var n = 0;
    beats.push(setInterval(function(){ n = (n + 1) % stops.length; pick(n); }, 3400));
  },
  p: function(){
    const rail = document.querySelector('.rail'), panel = document.querySelector('.panel');
    if (!rail || !panel) return;
    const zone = panel.querySelector('.swapzone');
    let i = 2;
    function paint(n){
      stopBeatTimeouts();
      i = (n + C.six.length) % C.six.length;
      rail.querySelectorAll('.st').forEach(function(el,k){ el.classList.toggle('on', k === i); el.setAttribute('aria-pressed',String(k===i)); });
      panel.dataset.swap = 'out';
      const commit=()=>{
        const st = C.six[i];
        zone.innerHTML = '<div><h3>' + st[1] + '</h3><p>' + st[2] + '</p><ul class="spec">' +
          st[3].map(function(kv){ return '<li><b>' + kv[0] + '</b>' + kv[1] + '</li>'; }).join('') + '</ul></div>';
        panel.dataset.swap = 'in';
      };
      if(reduce)commit();else beatTimeouts.push(setTimeout(commit,180));
    }
    rail.addEventListener('click', function(e){ const st = e.target.closest('.st'); if (st) paint(+st.dataset.step); });
    rail.addEventListener('keydown', function(e){
      if (e.key !== ' ' && e.key !== 'Enter') return;
      const st = e.target.closest('.st'); if (!st) return;
      e.preventDefault(); e.stopPropagation(); paint(+st.dataset.step);
    });
    if (reduce) return;
    beats.push(setInterval(function(){ paint(i + 1); }, 2200));
  }
};
function render(v){
  const generation=++renderGeneration;
  extraAbort?.abort(); extraCleanup?.(); extraAbort=null; extraCleanup=null;
  stopBeats();stopBeatTimeouts();
  delete app.dataset.mountError;
  delete app.dataset.mounted;
  document.documentElement.dataset.variant = v;
  app.innerHTML = `<main class="screen${EXTRA_MAP.has(v)?' extra-screen':''}">${SCREEN[v](first)}</main>`;
  if (first) countUp();        /* C12: only the first paint animates - every later skin arrives composed */
  first = false;
  if (BEAT[v]) BEAT[v]();
  const extra=EXTRA_MAP.get(v);
  if(!extra?.mount) app.dataset.mounted=v;
  if(extra?.mount){
    extraAbort=new AbortController();
    Promise.resolve(extra.mount(app.querySelector('.xp-stage'),{reducedMotion:reduce,still:sceneStill,signal:extraAbort.signal})).then(cleanup=>{
      if(generation===renderGeneration){ extraCleanup=typeof cleanup==='function'?cleanup:null; app.dataset.mounted=v; }
      else if(typeof cleanup==='function') cleanup();
    }).catch(error=>{if(generation===renderGeneration) app.dataset.mountError=String(error);});
  }
}
function writeSceneUrl(v, mode='replace') {
  const slug=routes.slug(v),url=new URL(location.href);url.hash=slug;
  if(url.searchParams.has('v'))url.searchParams.set('v',slug);
  const target=url.pathname+url.search+url.hash;
  if(target!==location.pathname+location.search+location.hash)history[mode+'State'](null,'',target);
}
function go(v, historyMode='push'){
  const id=routes.resolve(v);if(!registered.has(id))return;
  idx=ORDER.indexOf(id);
  const run=()=>render(id);
  if(document.startViewTransition&&!reduce)document.startViewTransition(run);else run();
  writeSceneUrl(id,historyMode);
}
function next(d, historyMode='push'){idx=(idx+(d||1)+ORDER.length)%ORDER.length;go(ORDER[idx],historyMode);startTimer();}
function startTimer(){stopTimer();if(paused||document.hidden)return;timer=setInterval(()=>next(1,'replace'),5000);}
function stopTimer(){ if (timer){ clearInterval(timer); timer = null; } }
function setPaused(p){
  paused = p; paused ? stopTimer() : startTimer();
  const ctl = document.querySelector('.ctl'); if (!ctl) return;
  ctl.dataset.paused = paused ? 1 : 0;
  const tog = ctl.querySelector('.tog');
  if (tog){ tog.setAttribute('aria-pressed', paused ? 'true' : 'false'); tog.setAttribute('aria-label', paused ? 'Resume the cycle' : 'Pause the cycle'); }
  live.textContent = paused ? 'Cycle paused' : 'Cycle running';
}
async function copyCmd(btn){
  const originalLabel=btn.dataset.copyLabel||btn.getAttribute('aria-label');
  btn.dataset.copyLabel=originalLabel;
  try {
    if(!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(C.cmd);
    if(!btn.isConnected) return;
    btn.dataset.state='done';btn.setAttribute('aria-label',originalLabel);live.textContent='Copied';
  } catch {
    if(!btn.isConnected) return;
    btn.dataset.state='idle';
    btn.setAttribute('aria-label','Copy failed. Try again.');
    const label=btn.querySelector('.w1'); if(label) label.textContent='retry';
    live.textContent='Could not copy. Select the install command to copy it manually.';
  }
  clearTimeout(btn._t);btn._t=setTimeout(()=>{
    btn.dataset.state='idle';btn.setAttribute('aria-label',originalLabel);
    const label=btn.querySelector('.w1');if(label)label.textContent='copy';
  },1600);
}
function countUp(){
  if (reduce) return;
  document.querySelectorAll('[data-count]').forEach(function(el){
    const end = +el.dataset.count, t0 = performance.now(), dur = 1100;
    const tick = function(t){ const p = Math.min(1,(t-t0)/dur), k = 1-Math.pow(1-p,3); el.textContent = Math.round(end*k); if (p<1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
}
dock.addEventListener('click', function(e){
  const b = e.target.closest('.cb'); if (!b) return;
  if (b.dataset.act === 'toggle') setPaused(!paused); else next(b.dataset.act === 'next' ? 1 : -1);
});
function holdForInteraction(event){
  if(event.target.closest('button,input,textarea,select,[contenteditable=true],[data-studio-host]')){if(!paused)setPaused(true);stopBeats();}
}
document.addEventListener('drawnto:prompt-open',()=>{setPaused(true);stopBeats();});
app.addEventListener('pointerdown',holdForInteraction);
app.addEventListener('focusin',holdForInteraction);
addEventListener('keydown', function(e){
  if(document.querySelector('.style-dialog[open]') || e.defaultPrevented || e.target.closest('input,textarea,select,[contenteditable=true],[role=slider],[role=tablist],[role=menu],[data-scroll-region]') || e.target.closest('button,a,[role=button]')) return;
  if (e.key === 'ArrowRight') next(1);
  else if (e.key === 'ArrowLeft') next(-1);
  else if (e.key === ' ' && !e.target.closest('button,a,[role="button"]') && !reduce){ e.preventDefault(); setPaused(!paused); }
});
motionQuery.addEventListener('change',()=>{
  reduce=motionQuery.matches;
  if(reduce) setPaused(true);
  dock.innerHTML=CTL(paused);
  render(ORDER[idx]);
});
document.addEventListener('visibilitychange',()=>{document.documentElement.dataset.hidden=String(document.hidden);if(document.hidden){stopTimer();stopBeats();}else startTimer();});
function restoreSceneFromUrl(){
  const query=new URLSearchParams(location.search);
  const id=routes.resolve(location.hash.slice(1)||query.get('v')||ORDER[0]);
  if(!registered.has(id))return;
  if(id!==ORDER[idx]){idx=ORDER.indexOf(id);render(id);}
  writeSceneUrl(id);startTimer();
}
addEventListener('hashchange',restoreSceneFromUrl);
addEventListener('popstate',restoreSceneFromUrl);
render(ORDER[idx]);
writeSceneUrl(ORDER[idx]);
startTimer();
