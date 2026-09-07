import { shaderScene } from "../shader.js";
export function buildScene(scene) {
  return shaderScene(
    scene,
    `
void main(){
 vec2 p=vUv;vec2 q=p-.5;q=turn(-.10+uPointer.x*.045)*q;q.x*=1.+q.y*.12;p=q+.5;
 float cells=mix(95.,155.,uValue);vec2 grid=vec2(cells*uAspect,cells);vec2 id=floor(p*grid),f=fract(p*grid)-.5;
 vec2 cell=(id+.5)/grid;float x=cell.x, y=cell.y;
 float wave=.47+sin(x*12.+uTime*.9)*.13+sin(x*29.-uTime*1.4)*.033;
 float signal=exp(-abs(y-wave)*90.);float ghost=exp(-abs(y-wave+.014)*28.)*.16;
 if(uMode>.5&&uMode<1.5){float bar=floor(x*19.);float height=.13+.32*(.5+.5*sin(bar*.8+uTime*.7));signal=(1.-smoothstep(.012,.045,abs(fract(x*19.)-.5)))*(1.-smoothstep(height,height+.02,abs(y-.5)));}
 if(uMode>1.5){vec2 v=(cell-vec2(.5))*vec2(uAspect,1.);float radial=length(v);signal=exp(-abs(radial-(.18+.02*sin(atan(v.y,v.x)*9.+uTime)))*90.);}
 float dotMask=1.-smoothstep(.31,.46,length(f*vec2(1.1,.9)));float sub=.72+.28*sin(fract(p.x*grid.x)*6.283);
 vec3 light=mix(vec3(.06,.9,.50),vec3(.20,.64,1.),smoothstep(.2,.8,x));if(uMode>1.5)light=mix(vec3(.84,.10,.55),vec3(.06,.73,1.),x);
 vec3 col=vec3(.015,.027,.032)+dotMask*(.018+signal*1.22+ghost)*light*sub;
 col+=light*(exp(-abs(y-wave)*18.)*.05)*(uMode<.5?1.:0.);
 col*=.60+.40*pow(max(0.,1.-length(q)*.6),2.);gl_FragColor=vec4(col,1.);
}`,
  );
}
