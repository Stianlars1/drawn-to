(() => {
  const configurations = {
    'optical-type': {label:'Lens position',choices:['Left','Centre','Right']},
    'woven-spectrum': {label:'Tension',choices:['Open','Gathered','Folded']},
    'aperture-control': {label:'Openness',choices:['Narrow','Balanced','Open']},
    'chromatic-relief': {label:'Expression',choices:['Quiet','Flowing','Sculptural']}
  };
  function stage(id){return `<div class="at-studio" data-studio-host><picture><source media="(max-width:720px)" srcset="./assets/atelier/posters/${id}-1-mobile.webp"><img class="at-poster" src="./assets/atelier/posters/${id}-1.webp" alt=""></picture></div>`;}
  function control(id){const c=configurations[id];return `<div class="at-control"><label class="at-continuous"><span>${c.label}</span><output data-studio-readout>50</output><input type="range" min="0" max="100" value="50" aria-label="${c.label}" data-studio-range></label><div class="at-presets" role="group" aria-label="${c.label}">${c.choices.map((name,i)=>`<button type="button" data-studio-value="${i/2}" aria-pressed="${i===1}">${name}</button>`).join('')}</div></div>`;}
  async function mount(root,options,id){
    const host=root.querySelector('[data-studio-host]'),range=root.querySelector('[data-studio-range]');
    let dispose=()=>{},fallback=false,value=.5;
    const buttons=[...root.querySelectorAll('[data-studio-value]')];
    function setValue(next,render=true){
      value=fallback?Math.round(next*2)/2:next;range.value=Math.round(value*100);
      root.querySelector('[data-studio-readout]').value=Math.round(value*100);
      buttons.forEach(button=>button.setAttribute('aria-pressed',String(Math.abs(Number(button.dataset.studioValue)-value)<.015)));
      if(fallback){const n=Math.round(value*2),base=`./assets/atelier/posters/${id}-${n}`;host.querySelector('source').srcset=base+'-mobile.webp';host.querySelector('img').src=base+'.webp';}
      else if(render)host.__studio?.setValue(value);
    }
    function usePoster(){if(options.signal.aborted)return;fallback=true;root.dataset.studioFallback='true';host.dataset.fallback='true';setValue(value);root.querySelector('[data-studio-motion]')?.setAttribute('hidden','');}
    range.addEventListener('input',()=>setValue(Number(range.value)/100),{signal:options.signal});
    buttons.forEach(button=>button.addEventListener('click',()=>setValue(Number(button.dataset.studioValue)),{signal:options.signal}));
    host.addEventListener('studio-value',event=>setValue(event.detail,false),{signal:options.signal});
    host.addEventListener('studio-fallback',usePoster,{signal:options.signal,once:true});
    const toggle=root.querySelector('[data-studio-motion]');let paused=options.still||options.reducedMotion;
    if(toggle){toggle.textContent=paused?'Play motion':'Pause motion';toggle.setAttribute('aria-pressed',String(paused));toggle.addEventListener('click',()=>{paused=!paused;host.__studio?.[paused?'pause':'play']();toggle.textContent=paused?'Play motion':'Pause motion';toggle.setAttribute('aria-pressed',String(paused));},{signal:options.signal});}
    if(new URLSearchParams(location.search).get('gpu')==='off'||navigator.connection?.saveData){usePoster();return dispose;}
    try{
      const {mountStudio}=await import('../atelier/runtime.js');
      if(options.signal.aborted)return dispose;
      dispose=await mountStudio(host,{...options,kind:id});
      if(options.signal.aborted){dispose();return()=>{};}
      host.__studio?.setValue(value);
      if(options.still)host.__studio?.setTime(Number(new URLSearchParams(location.search).get('t'))||0);
      host.__studio?.[paused?'pause':'play']();
      return dispose;
    }catch(error){dispose();host.querySelectorAll('canvas').forEach(canvas=>canvas.remove());host.dataset.renderError=String(error);usePoster();return()=>{};}
  }
  const pages=[
    {id:'optical-type',order:46,series:'atelier',name:'a closer look',reference:'DmitryLepisov-2093247212629139641',theme:{background:'#f5f5f0',ink:'#20231f',muted:'#73776b',accent:'#747b39'},
      render(){return `<h1 class="at-sr">Look again.</h1>${stage('optical-type')}<div class="at-optical-bottom"><p>Good taste starts<br>with a closer look.</p><span class="at-optical-hint">Move the lens.<br>See what changes.</span>${control('optical-type')}</div>`;},mount(root,options){return mount(root,options,'optical-type');}},
    {id:'woven-spectrum',order:47,series:'atelier',name:'woven light',reference:'basit_designs-2095821165306732974',theme:{background:'#080b16',ink:'#e7edf6',muted:'#a0adbf',accent:'#b7bbf2'},
      render(){return `${stage('woven-spectrum')}<div class="at-woven-copy"><span class="at-eyebrow">THE SPACE BETWEEN</span><h1>Light, in a<br>different state.</h1><p>Edges catch it.<br>Folds give it somewhere to go.</p></div><div class="at-woven-controls">${control('woven-spectrum')}<button class="at-motion" type="button" data-studio-motion>Pause motion</button></div>`;},mount(root,options){return mount(root,options,'woven-spectrum');}},
    {id:'aperture-control',order:48,series:'atelier',name:'the right amount',reference:'nilseller-2093007384465531068',theme:{background:'#e9e9e2',ink:'#262c2d',muted:'#697373',accent:'#a74a19'},
      render(){return `<div class="at-aperture-art">${stage('aperture-control')}<span class="at-instrument-caption">OPEN TO POSSIBILITY</span></div><div class="at-aperture-copy"><span class="at-eyebrow">A QUESTION OF FOCUS</span><h1>Let the <br>right things <br>through.</h1><p>More isn't always clearer.<br>Find the opening that feels right.</p>${control('aperture-control')}<span class="at-fine-note">Nine moving leaves. One shared centre.</span></div>`;},mount(root,options){return mount(root,options,'aperture-control');}},
    {id:'chromatic-relief',order:53,series:'atelier',name:'a rhythm in relief',reference:'adriankuleszo-2096048196988580223',theme:{background:'#e9e7df',ink:'#243b77',muted:'#637093',accent:'#315bcc'},
      render(){return `<div class="at-relief-heading"><h1>Forms have <em>rhythm.</em></h1><p>One element.<br>Many ways to make it move.</p></div>${stage('chromatic-relief')}<div class="at-relief-bottom"><span class="at-eyebrow">REPETITION, WITH INTENTION</span>${control('chromatic-relief')}<button class="at-motion" type="button" data-studio-motion>Pause motion</button></div>`;},mount(root,options){return mount(root,options,'chromatic-relief');}}
  ];
  window.DrawnToPages=[...(window.DrawnToPages||[]),...pages];
})();
