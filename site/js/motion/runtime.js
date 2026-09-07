import * as THREE from "../../vendor/three/three.module.min.js";
import { environment, disposeScene } from "../atelier/materials.js";
const builders = {
  "auric-orbit": () => import("./scenes/auric.js"),
  "plasma-study": () => import("./scenes/plasma.js"),
  "camera-obscura": () => import("./scenes/camera.js"),
  "cloud-chamber": () => import("./scenes/cloud.js"),
  "phosphor-field": () => import("./scenes/phosphor.js"),
  "silver-tide": () => import("./scenes/tide.js"),
  "morph-study": () => import("./scenes/morph.js"),
};
export async function mountMotion(
  host,
  { kind, signal, still = false, reducedMotion = false } = {},
) {
  const module = await builders[kind]();
  await document.fonts.ready;
  if (signal.aborted) return () => {};
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(
    new URLSearchParams(location.search).has("capture")
      ? 1
      : Math.min(devicePixelRatio || 1, kind === "camera-obscura" ? 2 : 1.5),
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0, 0);
  renderer.domElement.className = "mo-canvas";
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.append(renderer.domElement);
  const scene = new THREE.Scene();
  let env, subject;
  try {
    if (module.physical) {
      env = environment(renderer, module.palette || "machined");
      scene.environment = env.texture;
    }
    subject = await module.buildScene(scene, renderer);
  } catch (error) {
    disposeScene(scene);
    env?.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    throw error;
  }
  let disposed = false,
    raf = 0,
    last = 0,
    time = 0,
    value = 0.5,
    mode = 0,
    visible = true,
    paused = still || reducedMotion;
  const pointer = new THREE.Vector2(),
    media = matchMedia("(prefers-reduced-motion:reduce)"),
    connection = navigator.connection;
  const state = {
    kind,
    backend: "webgl2",
    frames: 0,
    value,
    mode,
    time,
    disposed: false,
    cpuMs: 0,
  };
  host.__motionState = state;
  function paint() {
    if (disposed) return;
    const begin = performance.now();
    subject.update?.(time, value, mode, pointer, {
      immediate: paused || media.matches,
    });
    renderer.render(scene, subject.camera);
    state.frames++;
    state.time = time;
    state.cpuMs = performance.now() - begin;
  }
  function eligible() {
    return (
      !disposed &&
      !paused &&
      !media.matches &&
      !connection?.saveData &&
      !document.hidden &&
      visible &&
      (subject.animated !== false || subject.needsFrame?.())
    );
  }
  function tick(now) {
    raf = 0;
    time += last ? Math.min((now - last) / 1000, 0.08) : 0;
    last = now;
    paint();
    if (eligible()) raf = requestAnimationFrame(tick);
  }
  function reconcile() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
    if (!document.hidden) paint();
    if (eligible()) raf = requestAnimationFrame(tick);
  }
  function resize() {
    if (disposed) return;
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    subject.resize(width, height);
    paint();
  }
  const off = [];
  const on = (target, event, fn) => {
    target?.addEventListener(event, fn);
    off.push(() => target?.removeEventListener(event, fn));
  };
  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(host);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    reconcile();
  });
  observer.observe(host);
  on(document, "visibilitychange", reconcile);
  on(media, "change", reconcile);
  on(connection, "change", reconcile);
  on(host, "pointermove", (event) => {
    if (media.matches || !matchMedia("(pointer:fine)").matches) return;
    const r = host.getBoundingClientRect();
    pointer.set(
      ((event.clientX - r.left) / r.width) * 2 - 1,
      1 - ((event.clientY - r.top) / r.height) * 2,
    );
    if (!raf) paint();
  });
  on(host, "pointerleave", () => {
    pointer.set(0, 0);
    if (!raf) paint();
  });
  host.__motion = {
    setValue(next) {
      value = Math.max(0, Math.min(1, next));
      state.value = value;
      reconcile();
    },
    setMode(next) {
      mode = next;
      state.mode = mode;
      reconcile();
    },
    play() {
      paused = false;
      reconcile();
    },
    pause() {
      paused = true;
      reconcile();
    },
    setTime(next) {
      paused = true;
      time = next;
      reconcile();
    },
    snapshot() {
      paint();
      return renderer.domElement.toDataURL("image/png");
    },
  };
  function cleanup() {
    if (disposed) return;
    disposed = true;
    state.disposed = true;
    cancelAnimationFrame(raf);
    off.forEach((fn) => fn());
    sizeObserver.disconnect();
    observer.disconnect();
    subject.dispose?.();
    disposeScene(scene);
    env?.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    delete host.__motion;
  }
  on(renderer.domElement, "webglcontextlost", (event) => {
    event.preventDefault();
    if (!disposed) {
      cleanup();
      host.dispatchEvent(new CustomEvent("motion-fallback"));
    }
  });
  signal.addEventListener("abort", cleanup, { once: true });
  if (signal.aborted) {
    cleanup();
    return cleanup;
  }
  resize();
  host.dataset.ready = "true";
  reconcile();
  return cleanup;
}
