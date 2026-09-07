import * as THREE from "../../../vendor/three/three.module.min.js";
import { lightScene, texture } from "../../atelier/materials.js";
import { noiseGLSL } from "../shader.js";
export const physical = true;
export const palette = "machined";
export function buildScene(scene) {
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
  camera.position.set(0, 0.15, 7.2);
  const geometry = new THREE.SphereGeometry(1.65, 192, 128),
    p = geometry.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      y = p.getY(i),
      z = p.getZ(i);
    let d = 0,
      a = 0.095,
      f = 2.1;
    for (let j = 0; j < 5; j++) {
      d +=
        a *
        Math.sin(x * f + Math.sin(z * f * 1.2)) *
        Math.cos(y * f - z * f * 0.4);
      a *= 0.47;
      f *= 2.17;
    }
    const k = 1 + d;
    p.setXYZ(i, x * k, y * k, z * k);
  }
  geometry.computeVertexNormals();
  const rough = texture("brushed");
  rough.repeat.set(9, 7);
  const material = new THREE.MeshPhysicalMaterial({
    color: "#fff",
    metalness: 0.55,
    roughness: 0.44,
    bumpMap: rough,
    bumpScale: 0.018,
    clearcoat: 0.08,
  });
  const uniforms = { heat: { value: 0.5 }, mode: { value: 0 } };
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = "varying vec3 localPoint;\n" + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\nlocalPoint=position;",
    );
    shader.fragmentShader =
      "varying vec3 localPoint;uniform float heat,mode;\n" +
      noiseGLSL +
      shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      `#include <color_fragment>
   float ore=fbm(localPoint*3.3+fbm(localPoint*1.8)*2.);
   float vein=1.-smoothstep(.013,.047,abs(ore-.51));
   float fleck=pow(noise3(localPoint*85.),9.);
   vec3 stone=mix(vec3(.024,.033,.038),vec3(.16,.185,.18),fbm(localPoint*16.));
   vec3 gold=mode>1.5?vec3(.25,.47,.54):vec3(.72,.40,.105);
   diffuseColor.rgb*=mix(stone,gold,clamp(vein+fleck*.8,0.,1.));`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <metalnessmap_fragment>",
      "#include <metalnessmap_fragment>\nmetalnessFactor=mix(.24,.94,vein);",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <emissivemap_fragment>",
      "#include <emissivemap_fragment>\ntotalEmissiveRadiance+=gold*vein*heat*(mode>.5?.52:.10);",
    );
  };
  const object = new THREE.Mesh(geometry, material);
  scene.add(object);
  lightScene(scene, { warm: true });
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.08, 0.008, 8, 220),
    new THREE.MeshBasicMaterial({
      color: "#827660",
      transparent: true,
      opacity: 0.48,
    }),
  );
  ring.rotation.set(1.03, 0.3, -0.36);
  scene.add(ring);
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.21, 0.003, 6, 220),
    new THREE.MeshBasicMaterial({
      color: "#9b967f",
      transparent: true,
      opacity: 0.22,
    }),
  );
  ring2.rotation.set(0.93, 0.25, -0.36);
  scene.add(ring2);
  const positions = [];
  let seed = 887;
  for (let i = 0; i < 150; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const a = (seed / 4294967296) * Math.PI * 2;
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const r = 2.1 + (seed / 4294967296) * 0.6;
    positions.push(Math.cos(a) * r, Math.sin(a) * r * 0.6, Math.sin(a) * 0.8);
  }
  const dust = new THREE.BufferGeometry();
  dust.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  scene.add(
    new THREE.Points(
      dust,
      new THREE.PointsMaterial({
        color: "#cdbd8f",
        size: 0.012,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    ),
  );
  return {
    camera,
    resize(w, h) {
      camera.aspect = w / h;
      camera.position.z = w / h < 0.8 ? 8.5 : 7.5;
      camera.updateProjectionMatrix();
    },
    update(t, value, mode, pointer) {
      object.rotation.set(
        0.15 + pointer.y * 0.07,
        t * 0.045 + pointer.x * 0.12,
        -0.06,
      );
      ring.rotation.z = -0.36 + t * 0.012;
      uniforms.heat.value = value;
      uniforms.mode.value = mode;
    },
  };
}
