import * as THREE from "../../vendor/three/three.module.min.js";
export const noiseGLSL = `
float hash31(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash31(i),hash31(i+vec3(1,0,0)),f.x),mix(hash31(i+vec3(0,1,0)),hash31(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash31(i+vec3(0,0,1)),hash31(i+vec3(1,0,1)),f.x),mix(hash31(i+vec3(0,1,1)),hash31(i+vec3(1)),f.x),f.y),f.z);}
float fbm(vec3 p){float n=0.,a=.52;for(int i=0;i<5;i++){n+=noise3(p)*a;p=p*2.03+vec3(3.1,1.7,4.4);a*=.5;}return n;}
mat2 turn(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
`;
export function shaderScene(scene, fragment, { background = "#080b12" } = {}) {
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
  camera.position.z = 1;
  const uniforms = {
    uTime: { value: 0 },
    uValue: { value: 0.5 },
    uMode: { value: 0 },
    uPointer: { value: new THREE.Vector2() },
    uSize: { value: new THREE.Vector2(1440, 900) },
    uAspect: { value: 1.6 },
    uBg: { value: new THREE.Color(background) },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    vertexShader:
      "varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",
    fragmentShader: `precision highp float;varying vec2 vUv;uniform float uTime,uValue,uMode,uAspect;uniform vec2 uPointer,uSize;uniform vec3 uBg;${noiseGLSL}\n${fragment}`,
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
  return {
    camera,
    uniforms,
    resize(w, h) {
      uniforms.uSize.value.set(w, h);
      uniforms.uAspect.value = w / h;
    },
    update(t, v, m, p) {
      uniforms.uTime.value = t;
      uniforms.uValue.value = v;
      uniforms.uMode.value = m;
      uniforms.uPointer.value.copy(p);
    },
  };
}
