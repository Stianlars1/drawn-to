import { shaderScene } from "../shader.js";
export function buildScene(scene) {
  return shaderScene(
    scene,
    `
void main(){
 vec2 uv=(vUv-.5)*vec2(uAspect,1.);uv.x-=uAspect>1.?uAspect*.16:0.;uv.y+=uAspect>1.?0.:.06;
 float radius=uAspect>1.?.36:.27;vec2 q=uv/radius;float r=length(q);vec3 col=vec3(.923,.923,.882);
 float halo=exp(-pow(max(r-1.,0.)*10.,2.))*.07;col+=halo*vec3(.18,.12,.05);
 if(r<1.){
  float z=sqrt(max(0.,1.-r*r));vec3 pos=vec3(q,z);pos.xz=turn(uTime*.075+uPointer.x*.16)*pos.xz;
  float energy=.16+uValue*.7+uMode*.16;
  vec3 warp=vec3(fbm(pos*2.4+uTime*.09),fbm(pos*3.2-vec3(uTime*.07)),fbm(pos.yzx*2.8));
  float field=fbm(pos*3.8+warp*3.5+vec3(0.,uTime*.09,0.));
  float fil=pow(.5+.5*sin(field*40.+pos.y*2.8),7.);float veil=fbm(pos*7.+warp*2.);
  vec3 deep=vec3(.12,.22,.28),cyan=vec3(.32,.71,.74),pearl=vec3(.98,.89,.65),violet=vec3(.50,.39,.66);
  if(uMode>1.5){cyan=vec3(.82,.42,.32);pearl=vec3(1.,.83,.52);}else if(uMode>.5){cyan=vec3(.38,.5,.82);pearl=vec3(.83,.72,1.);}
  col=mix(deep,cyan,smoothstep(.32,.65,field));col=mix(col,pearl,fil*.78);col=mix(col,violet,smoothstep(.55,.78,veil)*.4);
  float light=clamp(dot(normalize(vec3(-.4,.7,1.)),normalize(vec3(q,z))),0.,1.);
  col*=.38+light*.78;col+=pow(1.-z,3.)*vec3(.52,.81,.82)*.45;
  float sheen=pow(max(0.,dot(normalize(vec3(-.35,.52,.9)),vec3(q,z))),65.);col+=sheen*.8;
  col=mix(col,vec3(.95,.98,.94),pow(max(0.,1.-abs(r-.982)*65.),4.)*.35);
  col+=pow(fil,2.)*energy*.10;
 }
 float grain=(hash31(vec3(gl_FragCoord.xy,uMode))-.5)/255.;gl_FragColor=vec4(col+grain,1.);
}`,
    { background: "#ebebe1" },
  );
}
