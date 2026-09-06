const COUNT=28000;
function pointData(){
  const mask=document.createElement('canvas');mask.width=320;mask.height=240;
  const context=mask.getContext('2d');context.fillStyle='#fff';context.font='700 200px Arial';context.textAlign='center';context.textBaseline='middle';const label=String(window.DrawnToLibrary?.total||85);const fontSize=Math.min(200,290/context.measureText(label).width*200);context.font='700 '+fontSize+'px Arial';context.fillText(label,160,127);
  const pixels=context.getImageData(0,0,320,240).data;
  const data=new Float32Array(COUNT*8);let seed=19;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<COUNT;i++){
    let u,v;do{u=Math.floor(random()*320);v=Math.floor(random()*240);}while(pixels[(v*320+u)*4+3]<128);
    const x=(u/320-.5)*2.8,y=(.5-v/240)*2.1;
    const face=random();const z=face<.4?.3:face<.8?-.3:(random()-.5)*.6;
    const lane=(i%7-3)*.31;const spread=random()<.78?lane+(random()-.5)*.085:(random()-.5)*2.7;
    const k=i*8;data.set([(random()-.5)*5.7,spread,(random()-.5)*2.5,random(),x,y,z,.72+random()*.65],k);
  }return data;
}
const wgsl=`
struct Params {time:f32, progress:f32, width:f32, height:f32, tint:vec4f};
struct Particle {origin:vec4f, destination:vec4f};
@group(0) @binding(0) var<uniform> u:Params;
@group(0) @binding(1) var<storage,read> particles:array<Particle>;
struct Varying {@builtin(position) position:vec4f, @location(0) uv:vec2f, @location(1) brightness:f32, @location(2) warmth:f32};
fn flow(p:vec3f,t:f32)->vec3f{
 let x=fract((p.x+t*.29+2.85)/5.7)*5.7-2.85;
 let y=p.y+.37*sin(x*1.3+t*.24)+.17*sin(x*2.45-p.y*1.4+t*.16);
 let z=p.z+.45*sin(x*.9+p.y*1.6+t*.2);
 return vec3f(x*.93-y*.19,y*.88+x*.16,z);
}
fn project(pos:vec3f,t:f32)->vec2f{
 let angle=.48+sin(t*.13)*.09;
 let p=vec3f(pos.x*cos(angle)+pos.z*sin(angle),pos.y,-pos.x*sin(angle)+pos.z*cos(angle));
 return vec2f(p.x/(u.width/u.height),p.y)*.62/(1.0+p.z*.19);
}
@vertex fn vert(@builtin(vertex_index) vi:u32,@builtin(instance_index) ii:u32)->Varying{
 let corners=array<vec2f,6>(vec2f(-1,-1),vec2f(1,-1),vec2f(-1,1),vec2f(-1,1),vec2f(1,-1),vec2f(1,1));
 let particle=particles[ii];let pos=mix(flow(particle.origin.xyz,u.time),particle.destination.xyz,u.progress);
 let next=mix(flow(particle.origin.xyz,u.time+.055),particle.destination.xyz,u.progress);
 let center=project(pos,u.time);let velocity=(project(next,u.time+.055)-center)*vec2f(u.width,u.height)*.5;
 let axis=normalize(velocity+vec2f(.00001,0));let side=vec2f(-axis.y,axis.x);
 let size=particle.destination.w*(1.15-clamp(pos.z,-1.3,1.3)*.23);
 let trail=size+(1.0-u.progress)*clamp(length(velocity)*1.3,1.0,10.0);
 let corner=corners[vi];var o:Varying;o.position=vec4f(center+(axis*corner.x*trail+side*corner.y*size)*2.0/vec2f(u.width,u.height),0,1);
 o.uv=corner;let focus=exp(-pow(pos.y-.12,2.0)*.45);
 let edge=(1.0-smoothstep(.62,.98,abs(center.x)))*(1.0-smoothstep(.72,.98,abs(center.y)));
 let light=.55+exp(-pow(pos.x-.2,2.0)*1.4-pow(pos.y-.35,2.0)*3.0)*.9;
 o.brightness=(.22+particle.origin.w*.78)*(1.05-clamp(pos.z,-1.5,1.5)*.32)*focus*edge*mix(light,1.0,u.progress);
 o.warmth=clamp((pos.y+pos.x*.22+1.2)/2.4,0.0,1.0);return o;
}
@fragment fn frag(v:Varying)->@location(0) vec4f{
 let a=clamp(exp(-v.uv.x*v.uv.x*1.6-v.uv.y*v.uv.y*3.8)*.82*v.brightness,0.0,.97);
 let color=mix(vec3f(.28,.58,.85),vec3f(.92,.98,1.0),v.warmth);
 return vec4f(color*a,a);
}`;
const glslVert=`#version 300 es
precision highp float;in vec4 aOrigin;in vec4 aTarget;uniform float uTime;uniform float uProgress;uniform vec2 uSize;out vec2 vUv;out float vBrightness;out float vWarmth;
vec3 flow(vec3 p,float t){float x=fract((p.x+t*.29+2.85)/5.7)*5.7-2.85;float y=p.y+.37*sin(x*1.3+t*.24)+.17*sin(x*2.45-p.y*1.4+t*.16);float z=p.z+.45*sin(x*.9+p.y*1.6+t*.2);return vec3(x*.93-y*.19,y*.88+x*.16,z);}
vec2 project(vec3 pos,float t){float angle=.48+sin(t*.13)*.09;vec3 p=vec3(pos.x*cos(angle)+pos.z*sin(angle),pos.y,-pos.x*sin(angle)+pos.z*cos(angle));return vec2(p.x/(uSize.x/uSize.y),p.y)*.62/(1.+p.z*.19);}
void main(){vec2 corners[6]=vec2[6](vec2(-1,-1),vec2(1,-1),vec2(-1,1),vec2(-1,1),vec2(1,-1),vec2(1,1));vec3 p=mix(flow(aOrigin.xyz,uTime),aTarget.xyz,uProgress);vec3 next=mix(flow(aOrigin.xyz,uTime+.055),aTarget.xyz,uProgress);vec2 center=project(p,uTime);vec2 velocity=(project(next,uTime+.055)-center)*uSize*.5;vec2 axis=normalize(velocity+vec2(.00001,0));vec2 side=vec2(-axis.y,axis.x);float size=aTarget.w*(1.15-clamp(p.z,-1.3,1.3)*.23);float trail=size+(1.-uProgress)*clamp(length(velocity)*1.3,1.,10.);vec2 corner=corners[gl_VertexID];gl_Position=vec4(center+(axis*corner.x*trail+side*corner.y*size)*2./uSize,0,1);vUv=corner;float focus=exp(-pow(p.y-.12,2.)*.45);float edge=(1.-smoothstep(.62,.98,abs(center.x)))*(1.-smoothstep(.72,.98,abs(center.y)));float light=.55+exp(-pow(p.x-.2,2.)*1.4-pow(p.y-.35,2.)*3.)*.9;vBrightness=(.22+aOrigin.w*.78)*(1.05-clamp(p.z,-1.5,1.5)*.32)*focus*edge*mix(light,1.,uProgress);vWarmth=clamp((p.y+p.x*.22+1.2)/2.4,0.,1.);}`;
const glslFrag=`#version 300 es
precision highp float;in vec2 vUv;in float vBrightness;in float vWarmth;uniform vec3 uTint;out vec4 color;void main(){float a=clamp(exp(-vUv.x*vUv.x*1.6-vUv.y*vUv.y*3.8)*.82*vBrightness,0.,.97);vec3 c=mix(vec3(.28,.58,.85),vec3(.92,.98,1.),vWarmth);color=vec4(c*a,a);}`;

async function createWebGPU(canvas,data){
 if(!navigator.gpu)throw new Error('WebGPU unavailable');const adapter=await navigator.gpu.requestAdapter();if(!adapter)throw new Error('No WebGPU adapter');const device=await adapter.requestDevice();const context=canvas.getContext('webgpu');if(!context){device.destroy();throw new Error('WebGPU canvas unavailable');}
 let configured=false;try {
 const format=navigator.gpu.getPreferredCanvasFormat();context.configure({device,format,alphaMode:'premultiplied'});configured=true;
 device.pushErrorScope('validation');const module=device.createShaderModule({code:wgsl});const info=await module.getCompilationInfo();const errors=info.messages.filter(message=>message.type==='error');if(errors.length){await device.popErrorScope();throw new Error(errors.map(e=>e.lineNum+': '+e.message).join(' | '));}
 const pipeline=await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'vert'},fragment:{module,entryPoint:'frag',targets:[{format,blend:{color:{srcFactor:'one',dstFactor:'one-minus-src-alpha'},alpha:{srcFactor:'one',dstFactor:'one-minus-src-alpha'}}}]},primitive:{topology:'triangle-list'}});
 const error=await device.popErrorScope();if(error)throw new Error(error.message);
 const buffer=device.createBuffer({size:data.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});device.queue.writeBuffer(buffer,0,data);
 const uniforms=device.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});
 const group=device.createBindGroup({layout:pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:uniforms}},{binding:1,resource:{buffer}}]});
 return {backend:'webgpu',draw(time,progress){device.queue.writeBuffer(uniforms,0,new Float32Array([time,progress,canvas.width,canvas.height,.63,.85,1,1]));const encoder=device.createCommandEncoder();const pass=encoder.beginRenderPass({colorAttachments:[{view:context.getCurrentTexture().createView(),clearValue:{r:.025,g:.038,b:.055,a:1},loadOp:'clear',storeOp:'store'}]});pass.setPipeline(pipeline);pass.setBindGroup(0,group);pass.draw(6,COUNT);pass.end();device.queue.submit([encoder.finish()]);},dispose(){buffer.destroy();uniforms.destroy();context.unconfigure();device.destroy();},device};
 } catch(error) {if(configured)context.unconfigure();device.destroy();throw error;}
}
function createWebGL(canvas,data){
 const gl=canvas.getContext('webgl2',{alpha:false,antialias:true});if(!gl)throw new Error('WebGL2 unavailable');const shaders=[];
 function compile(type,source){const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader));shaders.push(shader);return shader;}
 const program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,glslVert));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,glslFrag));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));
 const vao=gl.createVertexArray();gl.bindVertexArray(vao);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
 for(const [name,offset]of[['aOrigin',0],['aTarget',16]]){const a=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,4,gl.FLOAT,false,32,offset);gl.vertexAttribDivisor(a,1);}
 const loc=Object.fromEntries(['uTime','uProgress','uSize','uTint'].map(k=>[k,gl.getUniformLocation(program,k)]));gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
 return {backend:'webgl2',draw(time,progress){gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(.025,.038,.055,1);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(program);gl.bindVertexArray(vao);gl.uniform1f(loc.uTime,time);gl.uniform1f(loc.uProgress,progress);gl.uniform2f(loc.uSize,canvas.width,canvas.height);gl.uniform3f(loc.uTint,.63,.85,1);gl.drawArraysInstanced(gl.TRIANGLES,0,6,COUNT);},dispose(){gl.deleteBuffer(buffer);gl.deleteVertexArray(vao);shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program);gl.getExtension('WEBGL_lose_context')?.loseContext();}};
}
export async function mountParticles(host,{signal,reducedMotion=false,forceBackend}={}){
 let canvas=document.createElement('canvas');canvas.className='xp-gpu-canvas';canvas.setAttribute('aria-hidden','true');host.append(canvas);const data=pointData();let renderer;
 try{if(forceBackend==='webgl')throw new Error('WebGL selected for validation');renderer=await createWebGPU(canvas,data);}catch(error){host.dataset.webgpuFallback=String(error);canvas.remove();canvas=document.createElement('canvas');canvas.className='xp-gpu-canvas';canvas.setAttribute('aria-hidden','true');host.append(canvas);renderer=createWebGL(canvas,data);}
 let disposed=false,frame=0,time=0,last=0,progress=1,target=1,inView=false,paused=false,manual=false;
 const media=matchMedia('(prefers-reduced-motion:reduce)'),connection=navigator.connection;const state={backend:renderer.backend,particles:COUNT,frames:0,progress:1,disposed:false};host.__gpuState=state;host.dataset.backend=renderer.backend;
 function draw(){if(disposed)return;renderer.draw(time,progress);state.frames++;state.progress=progress;}
 function allowed(){return !disposed&&inView&&!document.hidden&&!reducedMotion&&!media.matches&&!connection?.saveData&&!paused&&!manual;}
 function tick(now){frame=0;const dt=last?Math.min((now-last)/1000,.06):0;last=now;time+=dt;progress+=(target-progress)*(1-Math.exp(-dt*2.4));draw();if(allowed())frame=requestAnimationFrame(tick);}
 function reconcile(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;if(allowed())frame=requestAnimationFrame(tick);else{if(media.matches||reducedMotion)progress=target;draw();}}
 function resize(){const r=host.getBoundingClientRect();const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.max(1,Math.round(r.width*dpr));canvas.height=Math.max(1,Math.round(r.height*dpr));draw();}
 const ro=new ResizeObserver(resize);ro.observe(host);const io=new IntersectionObserver(([e])=>{inView=e.isIntersecting;reconcile();});io.observe(host);const listeners=[];function listen(t,e,fn){t?.addEventListener(e,fn);listeners.push(()=>t?.removeEventListener(e,fn));}
 listen(media,'change',reconcile);listen(connection,'change',reconcile);listen(document,'visibilitychange',reconcile);
 host.__stage={async snapshot(){draw();if(renderer.device)await renderer.device.queue.onSubmittedWorkDone();return canvas.toDataURL('image/png');},gather(){target=1;if(!allowed())progress=target;reconcile();},release(){target=0;if(!allowed())progress=target;reconcile();},setTime(t,p=1){manual=true;time=t;progress=p;target=p;reconcile();},pause(){paused=true;reconcile();},play(){manual=false;paused=false;reconcile();}};
 function cleanup(){if(disposed)return;disposed=true;state.disposed=true;if(frame)cancelAnimationFrame(frame);ro.disconnect();io.disconnect();listeners.forEach(off=>off());renderer.dispose();canvas.remove();delete host.__stage;}
 renderer.device?.lost.then(()=>{if(!disposed){cleanup();host.dataset.fallback='true';host.dispatchEvent(new CustomEvent('gpu-fallback',{bubbles:true}));}});
 signal?.addEventListener('abort',cleanup,{once:true});if(signal?.aborted){cleanup();return cleanup;}resize();host.dataset.ready='true';return cleanup;
}
