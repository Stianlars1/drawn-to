import * as THREE from "../../../vendor/three/three.module.min.js";
import { noiseGLSL } from "../shader.js";
import { lightScene } from "../../atelier/materials.js";
export const physical = true;
export async function buildScene(scene, renderer) {
  const camera = new THREE.OrthographicCamera(-1.5, 1.5, 1, -1, 0.1, 20);
  camera.position.z = 5;
  const map = await new THREE.TextureLoader().loadAsync(
    "./assets/motion/cloud-chamber.webp",
  );
  map.colorSpace = THREE.SRGBColorSpace;
  const reflected = map.clone();
  reflected.mapping = THREE.EquirectangularReflectionMapping;
  reflected.needsUpdate = true;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const localEnvironment = pmrem.fromEquirectangular(reflected);
  pmrem.dispose();
  reflected.dispose();
  scene.environment = localEnvironment.texture;
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map, toneMapped: false }),
  );
  plate.position.z = -0.5;
  scene.add(plate);
  const glass = new THREE.MeshPhysicalMaterial({
    color: "#eefcfc",
    roughness: 0.018,
    transmission: 1,
    thickness: 0.52,
    ior: 1.46,
    dispersion: 0.023,
    clearcoat: 1,
    envMapIntensity: 0.8,
  });
  const object = new THREE.Group();
  scene.add(object);
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), glass);
  object.add(sphere);
  const clouds = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    uniforms: { t: { value: 0 } },
    vertexShader:
      "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader: `varying vec2 vUv;uniform float t;${noiseGLSL}void main(){vec2 p=vUv-.5;float field=fbm(vec3(p*5.5,t*.045));float density=smoothstep(.47,.66,field+sin(p.y*7.)*.075);float edge=1.-smoothstep(.37,.49,length(p));vec3 color=mix(vec3(.59,.74,.77),vec3(1.,.96,.82),smoothstep(.45,.70,field));gl_FragColor=vec4(color,density*edge*.72);}`,
  });
  const interior = new THREE.Mesh(new THREE.CircleGeometry(0.89, 64), clouds);
  interior.position.z = -0.1;
  object.add(interior);
  const brass = new THREE.MeshPhysicalMaterial({
    color: "#c9b48b",
    metalness: 1,
    roughness: 0.2,
  });
  const rings = [];
  for (let i = 0; i < 2; i++) {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(1.07, 0.012, 8, 160),
      brass,
    );
    r.rotation.set(0.2 + i * 0.9, 0.6 + i * 0.6, 0.3);
    object.add(r);
    rings.push(r);
  }
  lightScene(scene, { warm: true });
  let imageWidth = 3;
  return {
    camera,
    resize(w, h) {
      const aspect = w / h;
      camera.left = -aspect;
      camera.right = aspect;
      camera.position.x = aspect < 0.8 ? 0.75 : 0;
      camera.lookAt(camera.position.x, 0, 0);
      camera.updateProjectionMatrix();
      imageWidth = Math.max(2 * aspect, 3);
      const ih = imageWidth / 1.5;
      plate.scale.set(imageWidth, ih, 1);
      object.position.set((0.765 - 0.5) * imageWidth, (0.5 - 0.465) * ih, 0.12);
      object.scale.setScalar(imageWidth * 0.086);
    },
    update(t, value, mode, pointer) {
      clouds.uniforms.t.value = t;
      rings.forEach((r, i) => {
        r.rotation.y = 0.4 + t * 0.13 * (i ? -0.6 : 1) + pointer.x * 0.1;
        r.rotation.z = 0.2 + i * 0.7 + value * 0.7;
      });
      sphere.scale.setScalar(1 + (mode === 1 ? 0.07 : mode === 2 ? -0.07 : 0));
      glass.attenuationColor.set(
        mode === 1 ? "#d9aa72" : mode === 2 ? "#71b7c8" : "#d3ebeb",
      );
      glass.attenuationDistance = 2.8;
    },
    dispose() {
      localEnvironment.dispose();
    },
  };
}
