import { shaderScene } from "../shader.js";
export function buildScene(scene) {
  return shaderScene(
    scene,
    `
float wave(vec2 p){
 float t=uTime*6.28318530718/16.;float v=0.;float a=.29;float f=.8;
 for(int i=0;i<7;i++){vec2 d=vec2(cos(float(i)*2.13),sin(float(i)*2.13));float q=dot(p,d)*f+t*(1.+mod(float(i),3.));v+=sin(q+sin(dot(p,d)*f*.47+t)*.45)*a;a*=.51;f*=1.94;}
 return v*(.55+uValue*.75);
}
vec3 sky(vec3 rd){float h=max(0.,rd.y);vec3 a=mix(vec3(.26,.34,.39),vec3(.026,.058,.085),pow(h,.4));if(uMode>.5)a=mix(vec3(.78,.45,.20),vec3(.11,.16,.21),pow(h,.35));return a;}
void main(){
 vec2 uv=vUv-.5;vec3 ro=vec3(0.,1.9,3.);vec3 rd=normalize(vec3(uv.x*uAspect,uv.y-.15,-1.3));vec3 col;
 vec3 sun=normalize(vec3(-.22+uPointer.x*.10,.17,-.95));vec3 tint=uMode>.5?vec3(1.,.72,.39):vec3(.83,.95,1.);
 if(rd.y>=-.001){col=sky(rd)*.62;}
 else{
  float distance=-ro.y/rd.y;vec3 p=ro+rd*distance;
  for(int i=0;i<3;i++){distance=(wave(p.xz)-ro.y)/rd.y;p=ro+rd*distance;}
  float e=.015,h=wave(p.xz);vec3 n=normalize(vec3(h-wave(p.xz+vec2(e,0.)),e,h-wave(p.xz+vec2(0.,e))));
  vec3 reflected=reflect(rd,n);float fresnel=.05+.95*pow(1.-max(0.,dot(-rd,n)),5.);
  col=mix(vec3(.009,.045,.052),sky(reflected),fresnel*.9);
  float spec=pow(max(0.,dot(reflected,sun)),180.);float broad=pow(max(0.,dot(reflected,sun)),18.);
  col+=tint*(spec*2.5+broad*.12);col+=vec3(.023,.041,.044)*smoothstep(.04,.18,h);
  float haze=1.-exp(-distance*.018);col=mix(col,sky(vec3(0.,0.,-1.))*.65,haze);
 }
 col*=.9;float grain=(hash31(vec3(gl_FragCoord.xy,1.))-.5)*.006;gl_FragColor=vec4(col+grain,1.);
}`,
  );
}
