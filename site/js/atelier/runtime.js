import * as THREE from '../../vendor/three/three.module.min.js';
import {environment,disposeScene} from './materials.js';

const builders={
  'optical-type':()=>import('./scenes/optical.js'),
  'woven-spectrum':()=>import('./scenes/woven.js'),
  'aperture-control':()=>import('./scenes/aperture.js'),
  'chromatic-relief':()=>import('./scenes/relief.js')
};

export async function mountStudio(host,{kind,signal,still=false,reducedMotion=false}={}) {
  const module=await builders[kind]();
  await document.fonts.ready;
  if(signal?.aborted)return()=>{};
  let disposed=false,raf=0,clock=0,last=0,inView=false,paused=still||reducedMotion,value=.5;
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<720?1.25:1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1;renderer.setClearColor(0,0);
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.VSMShadowMap;
  renderer.domElement.setAttribute('aria-hidden','true');renderer.domElement.className='at-canvas';host.append(renderer.domElement);
  const scene=new THREE.Scene();
  const palette=kind==='woven-spectrum'?'spectral':kind==='aperture-control'?'machined':'neutral';
  let env,subject;
  try {env=environment(renderer,palette);scene.environment=env.texture;subject=module.buildScene(scene);}
  catch(error){disposeScene(scene);env?.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();throw error;}
  const state={backend:'three-webgl2',kind,frames:0,value,disposed:false};host.__studioState=state;
  host.dataset.backend=state.backend;
  const media=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
  const pointer=new THREE.Vector2();
  function paint(){if(disposed)return;subject.update?.(clock,value,pointer);renderer.render(scene,subject.camera);state.frames++;}
  function eligible(){return !disposed&&subject.animated!==false&&!paused&&!media.matches&&!connection?.saveData&&!document.hidden&&inView;}
  function tick(now){raf=0;clock+=last?Math.min((now-last)/1000,.06):0;last=now;paint();if(eligible())raf=requestAnimationFrame(tick);}
  function reconcile(){if(raf)cancelAnimationFrame(raf);raf=0;last=0;paint();if(eligible())raf=requestAnimationFrame(tick);}
  function resize(){if(disposed)return;const r=host.getBoundingClientRect();if(!r.width||!r.height)return;
    renderer.setSize(r.width,r.height,false);subject.resize(r.width,r.height);paint();}
  const observer=new ResizeObserver(resize);observer.observe(host);
  const visibility=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;reconcile();});visibility.observe(host);
  const listeners=[];
  function listen(target,type,callback){target?.addEventListener(type,callback);listeners.push(()=>target?.removeEventListener(type,callback));}
  listen(document,'visibilitychange',reconcile);listen(media,'change',reconcile);listen(connection,'change',reconcile);
  listen(host,'pointermove',event=>{
    if(!matchMedia('(pointer:fine)').matches||(media.matches&&kind!=='optical-type'))return;
    const r=host.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,1-(event.clientY-r.top)/r.height*2);
    if(kind==='optical-type'){value=(pointer.x+1)/2;state.value=value;host.dispatchEvent(new CustomEvent('studio-value',{detail:value}));}
    if(!raf)paint();
  });
  listen(host,'pointerleave',()=>{pointer.set(0,0);if(!raf)paint();});
  host.__studio={
    setValue(next){value=THREE.MathUtils.clamp(next,0,1);state.value=value;paint();},
    pause(){paused=true;reconcile();},play(){paused=false;reconcile();},
    setTime(t){paused=true;clock=t;pointer.set(0,0);reconcile();return renderer.domElement.toDataURL('image/png');},
    snapshot(){paint();return renderer.domElement.toDataURL('image/png');}
  };
  function cleanup(){if(disposed)return;disposed=true;state.disposed=true;if(raf)cancelAnimationFrame(raf);
    observer.disconnect();visibility.disconnect();listeners.forEach(off=>off());subject.dispose?.();disposeScene(scene);
    env.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();delete host.__studio;
  }
  listen(renderer.domElement,'webglcontextlost',event=>{event.preventDefault();if(!disposed){cleanup();host.dispatchEvent(new CustomEvent('studio-fallback'));}});
  signal?.addEventListener('abort',cleanup,{once:true});
  if(signal?.aborted){cleanup();return cleanup;}
  resize();host.dataset.ready='true';reconcile();return cleanup;
}
