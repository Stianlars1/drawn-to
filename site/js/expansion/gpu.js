(() => {
  const markSvg=(size=48)=>`<svg width="${size}" height="${size}" viewBox="-1.24 -1.34 2.48 2.68" fill="none" aria-hidden="true"><g transform="scale(1,-1)"><path fill="currentColor" fill-rule="evenodd" d="M-.75-1.2H.75Q1.1-1.2 1.1-.85V.85Q1.1 1.2 .75 1.2H-.75Q-1.1 1.2-1.1.85V-.85Q-1.1-1.2-.75-1.2ZM-.53-.39Q-.53-.61-.31-.61H.31Q.53-.61.53-.39V-.07L-.08-.32-.24.08.53.4V.52Q.53.76.29.76H-.29Q-.53.76-.53.52Z"/></g></svg>`;
  function stage(id,extra=''){return `<div class="xp-gpu-host ${extra}" data-model-host><picture class="xp-gpu-picture"><source media="(max-width:720px)" srcset="./assets/expansion/gpu/${id}-mobile.webp"><img class="xp-gpu-poster" src="./assets/expansion/gpu/${id}.webp" alt=""></picture><div class="xp-gpu-loading" aria-hidden="true">${markSvg(112)}</div></div>`;}
  function controls(labels,type){return `<div class="xp-study-controls" role="group" aria-label="${type}">${labels.map(([id,text],i)=>`<button type="button" data-study="${id}" aria-pressed="${i===0}">${text}</button>`).join('')}</div>`;}
  async function mount(root,options,kind,model,material,bg){
    const host=root.querySelector('[data-model-host]');const query=new URLSearchParams(location.search);let dispose=()=>{};
    const pageId=root.classList.value.split(' ').find(name=>name.startsWith('xp-')&&name!=='xp-stage')?.slice(3);
    const usePoster=()=>{
      host.dataset.fallback='true';root.querySelector('[data-motion]')?.setAttribute('hidden','');
      const setPoster=choice=>{
        const suffix=['default','ceramic','gather'].includes(choice)?'':'-'+choice;
        const base='./assets/expansion/gpu/'+pageId+suffix;
        host.querySelector('picture source').srcset=base+'-mobile.webp';
        host.querySelector('.xp-gpu-poster').src=base+'.webp';
      };
      root.querySelectorAll('[data-study]').forEach(button=>button.addEventListener('click',()=>{
        root.querySelectorAll('[data-study]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));setPoster(button.dataset.study);
      },{signal:options.signal}));
    };
    if(query.get('gpu')==='off'||navigator.connection?.saveData){usePoster();return dispose;}
    host.addEventListener('gpu-fallback',usePoster,{signal:options.signal,once:true});
    try{
      const module=kind==='particles'?await import('../graphics/particles.js'):await import('../graphics/three-stage.js');
      if(options.signal.aborted)return dispose;
      dispose=kind==='particles'?await module.mountParticles(host,{...options,forceBackend:query.get('gpu')}):await module.mountThreeStage(host,{...options,model,material,background:bg});
      if(options.signal.aborted){dispose();return()=>{};}
      host.querySelector('.xp-gpu-loading')?.remove();
      root.querySelectorAll('[data-study]').forEach(button=>button.addEventListener('click',()=>{
        root.querySelectorAll('[data-study]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
        if(!host.__stage)return;
        const choice=button.dataset.study;
        if(choice==='release')host.__stage.release();else if(choice==='gather')host.__stage.gather();else host.__stage.setMaterial(choice);
      },{signal:options.signal}));
      const toggle=root.querySelector('[data-motion]');
      toggle?.addEventListener('click',()=>{const paused=toggle.getAttribute('aria-pressed')==='true';toggle.setAttribute('aria-pressed',String(!paused));toggle.textContent=paused?'Pause motion':'Resume motion';host.__stage[paused?'play':'pause']();},{signal:options.signal});
      if(model==='glb')await host.__stage.loadModel('./assets/models/folded-aperture.glb');
      if(query.has('t'))host.__stage.setTime(Number(query.get('t'))||0);
      return dispose;
    }catch(error){dispose();host.querySelectorAll('canvas').forEach(c=>c.remove());host.dataset.renderError=String(error);usePoster();return()=>{};}
  }
  const pages=[
    {id:'glass-identity',order:41,name:'glass identity',reference:'DmitryLepisov-2093247212629139641',theme:{background:'#e9eee9',ink:'#173c35',muted:'#547068',accent:'#207b68'},
      render(){return `<div class="xp-glass-copy"><h1>Recognizable.<br>At every <em>scale.</em></h1><p>One visual idea, from a small signature to an entire world.</p><div class="xp-flat-marks">${markSvg(22)}${markSvg(38)}${markSvg(58)}<span>The same idea.<br>Less detail.</span></div></div>${stage('glass-identity')}<p class="xp-study-caption">The shape stays. The material changes the feeling.</p>`;},
      mount(root,options){return mount(root,options,'three','mark','glass','#e9eee9');}},
    {id:'physical-schedule',order:42,name:'a tangible plan',reference:'nilseller-2093007384465531068',theme:{background:'#141c23',ink:'#e8edef',muted:'#9ba8b2',accent:'#bad8fa'},
      render(){return `<div class="xp-schedule-heading"><h1>Give the work<br>a shape.</h1><p>A direction becomes useful<br>when you can see what comes next.</p></div>${stage('physical-schedule')}<div class="xp-schedule-steps"><span>Discover</span><span>Frame</span><span>Make</span><span>Refine</span></div><button type="button" class="xp-inspect-finish" data-inspect aria-pressed="false">Inspect the finish ↗</button>`;},
      async mount(root,options){
        const cleanup=await mount(root,options,'three','schedule','metal','#141c23');
        if(options.signal.aborted)return cleanup;
        const host=root.querySelector('[data-model-host]'),button=root.querySelector('[data-inspect]');let close=false;
        function apply(){
          button.setAttribute('aria-pressed',String(close));button.textContent=close?'Show the full plan ↙':'Inspect the finish ↗';
          if(host.__stage)host.__stage.setInspection(close);
          else{const base='./assets/expansion/gpu/physical-schedule'+(close?'-detail':'');host.querySelector('picture source').srcset=base+'-mobile.webp';host.querySelector('img').src=base+'.webp';}
        }
        button.addEventListener('click',()=>{close=!close;apply();},{signal:options.signal});host.addEventListener('gpu-fallback',apply,{signal:options.signal});return cleanup;
      }},
    {id:'iridescent-ribbon',order:43,name:'iridescent form',reference:'basit_designs-2095821165306732974',theme:{background:'#efeee9',ink:'#202323',muted:'#6b706c',accent:'#7054ae'},
      render(){return `${stage('iridescent-ribbon')}<div class="xp-ribbon-copy"><h1>More than<br>a colour.</h1><p>A silhouette. A reflection.<br>A material that holds the direction.</p></div><div class="xp-ribbon-note"><span>Form gives colour<br>somewhere to belong.</span><button data-motion type="button" aria-pressed="false">Pause motion</button></div>`;},
      mount(root,options){return mount(root,options,'three','ribbon','ribbon','#efeee9');}},
    {id:'particle-assembly',order:44,name:'a field of references',reference:'krispuckett-2095994089917522241',theme:{background:'#060a0e',ink:'#e4edf4',muted:'#94a6b5',accent:'#add9ef'},
      render(){return `<div class="xp-particle-copy"><h1>Many references.<br>One direction.</h1><p>Bring the pieces together.<br>Keep what makes the whole feel right.</p>${controls([['gather','Gather'],['release','Release']],'Arrange the field')}</div>${stage('particle-assembly')}<p class="xp-particle-note">Individual impressions, finding a shared form.</p>`;},
      mount(root,options){return mount(root,options,'particles');}},
    {id:'material-study',order:45,name:'one form, three materials',reference:'DmitryLepisov-2093247212629139641',theme:{background:'#e8e5df',ink:'#24282b',muted:'#6a6c6d',accent:'#777e87'},
      render(){return `<div class="xp-material-heading"><h1>Same form.<br><em>Different feeling.</em></h1><p>Choose the material.<br>See what the geometry keeps.</p></div>${stage('material-study')}${controls([['ceramic','Ceramic'],['metal','Metal'],['glass','Glass']],'Choose a material')}`;},
      mount(root,options){return mount(root,options,'three','glb','ceramic','#e8e5df');}}
  ];
  window.DrawnToPages=[...(window.DrawnToPages||[]),...pages];
})();
