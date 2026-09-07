import * as THREE from "../../vendor/three/three.module.min.js";
import { GLTFLoader } from "../../vendor/three/addons/loaders/GLTFLoader.js";
import { foldMark, ribbon, schedule } from "./models.js";
import { opticalBench } from "./optical-bench.js";

const presets = {
  glass: {
    color: "#ffffff",
    metalness: 0,
    roughness: 0.015,
    transmission: 1,
    thickness: 1.1,
    ior: 1.48,
    dispersion: 0.028,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    attenuationColor: "#b6e6e7",
    attenuationDistance: 16,
    envMapIntensity: 0.85,
  },
  ceramic: {
    color: "#e6dfce",
    metalness: 0,
    roughness: 0.57,
    clearcoat: 0.09,
    clearcoatRoughness: 0.16,
    envMapIntensity: 0.7,
  },
  metal: {
    color: "#c4c9c8",
    metalness: 1,
    roughness: 0.32,
    anisotropy: 0.82,
    clearcoat: 0,
    envMapIntensity: 0.95,
  },
  ribbon: {
    color: "#d4cbf0",
    metalness: 1,
    roughness: 0.17,
    iridescence: 1,
    iridescenceIOR: 1.68,
    iridescenceThicknessRange: [120, 680],
    clearcoat: 0.85,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.2,
    side: THREE.DoubleSide,
  },
};

function studioEnvironment(renderer, colored, machined = false) {
  const room = new THREE.Scene();
  room.background = new THREE.Color(colored ? "#30384c" : "#172027");
  const panels = [
    { position: [-4, 1.6, 4], size: [3.5, 7], color: "#fff5e4", intensity: 4 },
    {
      position: [4, 2, 1],
      size: colored ? [5.5, 7] : [1.3, 6],
      color: colored ? "#7151ff" : "#bed9eb",
      intensity: 2.7,
    },
    { position: [0, 6, -2], size: [6, 3], color: "#f4fbff", intensity: 3.5 },
    {
      position: [-3, -1, -5],
      size: colored ? [5, 6] : [3, 4],
      color: colored ? "#08cebc" : "#b5c3ca",
      intensity: colored ? 2.1 : 0.6,
    },
    {
      position: [2, 1, -5],
      size: colored ? [4, 5] : [2.5, 5],
      color: colored ? "#ec327b" : "#ffffff",
      intensity: colored ? 2.8 : 0.7,
    },
  ];
  if (machined)
    panels.splice(
      0,
      panels.length,
      {
        position: [4.5, 5, -6],
        size: [4, 4],
        color: "#f3f6ff",
        intensity: 3.2,
      },
      { position: [-2, 6, 5], size: [5, 4], color: "#e6e9ed", intensity: 1.4 },
      {
        position: [-3, 5, -4],
        size: [5, 0.65],
        color: "#ffffff",
        intensity: 2.5,
      },
      { position: [-5, 2, 4], size: [4, 6], color: "#dbe9f4", intensity: 0.65 },
      { position: [6, 3, 1], size: [1.7, 5], color: "#a4bed3", intensity: 1.2 },
      { position: [0, 8, 0], size: [8, 8], color: "#ffffff", intensity: 0.6 },
    );
  if (!colored && !machined)
    panels.push(
      {
        position: [1.5, 3, 6],
        size: [6.5, 4.5],
        color: "#edf0ed",
        intensity: 1.8,
      },
      {
        position: [-2, -2.8, 5],
        size: [7, 1.7],
        color: "#b1b9b9",
        intensity: 0.65,
      },
    );
  if (colored)
    panels.push({
      position: [0, -3, 5],
      size: [5, 4],
      color: "#38b5ec",
      intensity: 2.0,
    });
  for (const panel of panels) {
    const color = new THREE.Color(panel.color).multiplyScalar(panel.intensity);
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(...panel.size),
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }),
    );
    mesh.position.set(...panel.position);
    mesh.lookAt(0, 0, 0);
    room.add(mesh);
  }
  const pmrem = new THREE.PMREMGenerator(renderer),
    env = pmrem.fromScene(room, 0.035, 0.1, 30);
  room.traverse((node) => {
    node.geometry?.dispose();
    node.material?.dispose();
  });
  pmrem.dispose();
  return env;
}

function softGround(model) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(128, 128, 5, 128, 128, 123);
  gradient.addColorStop(0, "rgba(14,27,27,.26)");
  gradient.addColorStop(0.35, "rgba(14,27,27,.14)");
  gradient.addColorStop(0.7, "rgba(14,27,27,.035)");
  gradient.addColorStop(1, "rgba(14,27,27,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);
  const map = new THREE.CanvasTexture(canvas);
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(
      model === "ribbon" ? 5 : 3.8,
      model === "ribbon" ? 2.4 : 2.5,
    ),
    new THREE.MeshBasicMaterial({
      map,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(0.15, -1.62, 0.05);
  return plane;
}
function finishTexture(kind) {
  const width = 256,
    height = 128,
    data = new Uint8Array(width * height * 4);
  let seed = 7429;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const random = seed / 4294967296;
      const value =
        kind === "film"
          ? 128 +
            95 * Math.sin((x / width) * Math.PI * 2) +
            24 * Math.cos((y / height) * Math.PI * 2)
          : kind === "brushed"
            ? 204 + 27 * Math.sin(y * 19.71) + random * 15
            : 198 + random * 57;
      const offset = (y * width + x) * 4;
      data[offset] = data[offset + 1] = data[offset + 2] = value;
      data[offset + 3] = 255;
    }
  const texture = new THREE.DataTexture(data, width, height);
  texture.needsUpdate = true;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  if (kind !== "film")
    texture.repeat.set(
      kind === "ceramic" ? 1.2 : 5,
      kind === "ceramic" ? 1.2 : 5,
    );
  return texture;
}

function ceramicColor() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 512, 512);
  let seed = 2881;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < 850; i++) {
    ctx.fillStyle = `rgba(112,99,79,${0.08 + random() * 0.14})`;
    ctx.beginPath();
    ctx.arc(
      random() * 512,
      random() * 512,
      0.65 + random() * 1.95,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(0.85, 0.85);
  map.anisotropy = 8;
  return map;
}

function glassNormals() {
  const size = 256,
    data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const u = (x / size) * Math.PI * 2,
        v = (y / size) * Math.PI * 2;
      const dx = 0.15 * Math.cos(u) * Math.sin(v) + 0.04 * Math.cos(3 * u + v);
      const dy = 0.15 * Math.sin(u) * Math.cos(v) + 0.025 * Math.sin(u + 2 * v);
      const normal = new THREE.Vector3(dx, dy, 1).normalize(),
        i = (y * size + x) * 4;
      data[i] = (normal.x * 0.5 + 0.5) * 255;
      data[i + 1] = (normal.y * 0.5 + 0.5) * 255;
      data[i + 2] = (normal.z * 0.5 + 0.5) * 255;
      data[i + 3] = 255;
    }
  const texture = new THREE.DataTexture(data, size, size);
  texture.needsUpdate = true;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = texture.minFilter = THREE.LinearFilter;
  return texture;
}

function focusPass(renderer, camera, background) {
  const target = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    depthBuffer: true,
    samples: 4,
  });
  target.depthTexture = new THREE.DepthTexture(1, 1, THREE.UnsignedIntType);
  const scene = new THREE.Scene(),
    view = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  const focus = new THREE.Vector3(0, -0.47, 0.05)
    .sub(camera.position)
    .dot(direction);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      image: { value: target.texture },
      depth: { value: target.depthTexture },
      resolution: { value: new THREE.Vector2(1, 1) },
      near: { value: camera.near },
      far: { value: camera.far },
      focus: { value: focus },
      backdrop: { value: new THREE.Color(background) },
    },
    vertexShader:
      "varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}",
    fragmentShader: `uniform sampler2D image; uniform sampler2D depth; uniform vec2 resolution; uniform float near; uniform float far; uniform float focus; uniform vec3 backdrop; varying vec2 vUv;
      float distanceAt(vec2 uv){float d=texture2D(depth,uv).x;return (near*far)/(far+(near-far)*d);}
      void main(){if(texture2D(depth,vUv).x>.99999){gl_FragColor=vec4(backdrop,1.0);
        #include <colorspace_fragment>
        return;}
        float distance=distanceAt(vUv);float blur=smoothstep(.65,2.25,abs(distance-focus))*2.2;
        vec3 color=texture2D(image,vUv).rgb; float weight=1.0;
        for(int i=0;i<12;i++){float angle=float(i)*2.39996323;vec2 delta=vec2(cos(angle),sin(angle))*sqrt((float(i)+.5)/12.0)*blur/resolution;
          color+=texture2D(image,vUv+delta).rgb;weight+=1.0;}
        gl_FragColor=vec4(color/weight,1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(quad);
  return {
    resize(width, height) {
      target.setSize(width, height);
      material.uniforms.resolution.value.set(width, height);
    },
    render(subject) {
      renderer.setRenderTarget(target);
      renderer.render(subject, camera);
      renderer.setRenderTarget(null);
      renderer.render(scene, view);
    },
    dispose() {
      target.depthTexture.dispose();
      target.dispose();
      quad.geometry.dispose();
      material.dispose();
    },
  };
}

export async function mountThreeStage(
  host,
  {
    model = "mark",
    material = "glass",
    background = "#edece5",
    signal,
    reducedMotion = false,
    onReady,
  } = {},
) {
  if (!host) return () => {};
  await document.fonts.ready;
  if (signal?.aborted) return () => {};
  let disposed = false,
    frame = 0,
    clock = 0,
    last = 0,
    manual = false,
    inView = false,
    allowMotion = !reducedMotion,
    inspection = false;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(
    Math.min(devicePixelRatio || 1, innerWidth < 720 ? 1.25 : 1.5),
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.domElement.className = "xp-gpu-canvas";
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.append(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(background);
  const camera = new THREE.PerspectiveCamera(
    model === "schedule" ? 29 : 32,
    1,
    0.1,
    50,
  );
  camera.position.set(
    model === "schedule" ? -4.0 : 0,
    model === "schedule" ? 4.4 : 0.65,
    model === "schedule" ? 6.8 : 6.8,
  );
  camera.lookAt(0, model === "schedule" ? -0.64 : -0.03, 0);
  const env = studioEnvironment(
    renderer,
    model === "ribbon",
    model === "schedule",
  );
  scene.environment = env.texture;
  scene.add(
    new THREE.HemisphereLight(
      "#e9eff4",
      "#252b31",
      model === "schedule" ? 0.36 : 0.22,
    ),
  );
  const key = new THREE.DirectionalLight(
    "#fff0d9",
    model === "schedule" ? 1.6 : 1.85,
  );
  key.position.set(
    model === "schedule" ? 3 : -3,
    6,
    model === "schedule" ? -4 : 4,
  );
  key.castShadow = model === "schedule";
  key.shadow.mapSize.set(
    model === "schedule" ? 2048 : 1024,
    model === "schedule" ? 2048 : 1024,
  );
  key.shadow.camera.left = -5;
  key.shadow.camera.right = 5;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -5;
  key.shadow.normalBias = 0.004;
  key.shadow.bias = -0.0001;
  key.shadow.radius = 1.2;
  key.shadow.blurSamples = 6;
  scene.add(key);
  const rim = new THREE.DirectionalLight("#b7d6ff", 0.7);
  rim.position.set(4, 2, -3);
  scene.add(rim);
  const finishes = {
    film: finishTexture("film"),
    brushed: finishTexture("brushed"),
    ceramic: finishTexture("ceramic"),
    ceramicColor: ceramicColor(),
    glass: glassNormals(),
  };
  function makeMaterial(name) {
    const result = new THREE.MeshPhysicalMaterial(
      presets[name] || presets.glass,
    );
    if (name === "ribbon") result.iridescenceThicknessMap = finishes.film;
    if (name === "glass") {
      result.normalMap = finishes.glass;
      result.normalScale.set(0.65, 0.65);
    }
    if (name === "ceramic") {
      result.map = finishes.ceramicColor;
      result.roughnessMap = finishes.ceramic;
      result.bumpMap = finishes.ceramic;
      result.bumpScale = 0.003;
    }
    if (name === "metal") {
      result.roughnessMap = finishes.brushed;
      result.bumpMap = finishes.brushed;
      result.bumpScale = 0.0008;
    }
    return result;
  }
  let activeMaterial = makeMaterial(material);
  let object =
    model === "ribbon"
      ? ribbon(activeMaterial)
      : model === "schedule"
        ? schedule()
        : foldMark(activeMaterial);
  scene.add(object);
  if (model !== "schedule") scene.add(softGround(model));
  if (model === "mark" || model === "glb") scene.add(opticalBench(background));
  const opticalFocus =
    model === "schedule" ? focusPass(renderer, camera, background) : null;
  const baseRotation = object.rotation.clone();
  let hoverX = 0,
    hoverY = 0;
  const media = matchMedia("(prefers-reduced-motion: reduce)"),
    connection = navigator.connection;
  const state = {
    backend: "three-webgl2",
    model,
    material,
    frames: 0,
    renderCpuMs: 0,
    disposed: false,
  };
  host.dataset.backend = state.backend;
  host.__gpuState = state;
  function paint(t = clock) {
    if (disposed) return;
    const amplitude = model === "schedule" ? 0.018 : 0.075;
    object.rotation.y =
      baseRotation.y + Math.sin(t * 0.28) * amplitude + hoverX * 0.08;
    object.rotation.x =
      baseRotation.x + Math.cos(t * 0.23) * amplitude * 0.45 + hoverY * 0.05;
    const start = performance.now();
    opticalFocus ? opticalFocus.render(scene) : renderer.render(scene, camera);
    state.renderCpuMs = performance.now() - start;
    state.frames++;
  }
  function tick(now) {
    frame = 0;
    if (disposed) return;
    clock += last ? Math.min((now - last) / 1000, 0.06) : 0;
    last = now;
    paint();
    if (eligible()) frame = requestAnimationFrame(tick);
  }
  function eligible() {
    return (
      !disposed &&
      inView &&
      !document.hidden &&
      allowMotion &&
      !media.matches &&
      !connection?.saveData &&
      !manual
    );
  }
  function reconcile() {
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    last = 0;
    if (eligible()) frame = requestAnimationFrame(tick);
    else paint(clock);
  }
  function resize() {
    if (disposed) return;
    const r = host.getBoundingClientRect();
    if (!r.width || !r.height) return;
    renderer.setSize(r.width, r.height, false);
    const bufferSize = renderer.getDrawingBufferSize(new THREE.Vector2());
    opticalFocus?.resize(bufferSize.x, bufferSize.y);
    camera.aspect = r.width / r.height;
    camera.zoom = 1;
    camera.updateProjectionMatrix();
    if (model === "schedule" && r.width < 720) {
      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);
      let extent = 0;
      object.traverse((node) => {
        if (!node.userData.essential) return;
        node.geometry.computeBoundingBox();
        const box = node.geometry.boundingBox;
        for (const x of [box.min.x, box.max.x])
          for (const y of [box.min.y, box.max.y])
            for (const z of [box.min.z, box.max.z]) {
              const point = new THREE.Vector3(x, y, z)
                .applyMatrix4(node.matrixWorld)
                .project(camera);
              extent = Math.max(extent, Math.abs(point.x));
            }
      });
      if (extent) camera.zoom = Math.min(1, 0.88 / extent);
      camera.updateProjectionMatrix();
    }
    if (model === "schedule" && inspection) {
      camera.zoom *= 1.55;
      camera.updateProjectionMatrix();
    }
    paint();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  const visibility = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    reconcile();
  });
  visibility.observe(host);
  const listeners = [];
  function listen(target, type, fn) {
    target?.addEventListener(type, fn);
    listeners.push(() => target?.removeEventListener(type, fn));
  }
  listen(document, "visibilitychange", reconcile);
  listen(media, "change", reconcile);
  listen(connection, "change", reconcile);
  listen(host, "pointermove", (event) => {
    if (media.matches || !matchMedia("(pointer:fine)").matches) return;
    const r = host.getBoundingClientRect();
    hoverX = (event.clientX - r.left) / r.width - 0.5;
    hoverY = (event.clientY - r.top) / r.height - 0.5;
    if (!frame) paint();
  });
  listen(host, "pointerleave", () => {
    hoverX = 0;
    hoverY = 0;
    if (!frame) paint();
  });
  const api = {
    setInspection(value) {
      if (model !== "schedule") return;
      inspection = Boolean(value);
      state.inspection = inspection;
      resize();
    },
    setTime(t) {
      manual = true;
      hoverX = 0;
      hoverY = 0;
      clock = t;
      reconcile();
      return renderer.domElement.toDataURL("image/png");
    },
    play() {
      manual = false;
      allowMotion = true;
      reconcile();
    },
    pause() {
      allowMotion = false;
      reconcile();
    },
    setMaterial(name) {
      if (!presets[name] || model === "schedule") return;
      const next = makeMaterial(name);
      object.traverse((node) => {
        if (node.isMesh) node.material = next;
      });
      activeMaterial.dispose();
      activeMaterial = next;
      state.material = name;
      paint();
    },
    async loadModel(url) {
      const loaded = await new GLTFLoader().loadAsync(url);
      if (disposed) {
        disposeObject(loaded.scene);
        return;
      }
      scene.remove(object);
      disposeObject(object, activeMaterial);
      object = loaded.scene;
      scene.add(object);
      object.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          const imported = node.material;
          node.material = activeMaterial;
          if (imported !== activeMaterial) imported.dispose();
        }
      });
      baseRotation.copy(object.rotation);
      paint();
    },
  };
  host.__stage = api;
  function disposeObject(root, preserveMaterial) {
    const geometries = new Set(),
      materials = new Set(),
      textures = new Set();
    root.traverse((node) => {
      if (node.geometry) geometries.add(node.geometry);
      if (node.material)
        (Array.isArray(node.material)
          ? node.material
          : [node.material]
        ).forEach((m) => materials.add(m));
    });
    materials.delete(preserveMaterial);
    materials.forEach((m) =>
      Object.values(m).forEach((v) => {
        if (v?.isTexture) textures.add(v);
      }),
    );
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
  }
  function cleanup() {
    if (disposed) return;
    disposed = true;
    state.disposed = true;
    if (frame) cancelAnimationFrame(frame);
    observer.disconnect();
    visibility.disconnect();
    listeners.forEach((off) => off());
    disposeObject(scene);
    activeMaterial.dispose();
    env.dispose();
    Object.values(finishes).forEach((texture) => texture.dispose());
    key.shadow.dispose();
    opticalFocus?.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    delete host.__stage;
  }
  listen(renderer.domElement, "webglcontextlost", (event) => {
    event.preventDefault();
    if (!disposed) {
      cleanup();
      host.dataset.fallback = "true";
      host.dispatchEvent(new CustomEvent("gpu-fallback", { bubbles: true }));
    }
  });
  signal?.addEventListener("abort", cleanup, { once: true });
  if (signal?.aborted) {
    cleanup();
    return cleanup;
  }
  resize();
  paint(0);
  host.dataset.ready = "true";
  onReady?.(api);
  reconcile();
  return cleanup;
}
