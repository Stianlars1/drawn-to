import * as THREE from "../../../vendor/three/three.module.min.js";
import { metal, lightScene, ground } from "../../atelier/materials.js";
export const physical = true;
export const palette = "machined";
function roundedBox(w, h, d, r, material) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: d,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
    steps: 1,
    curveSegments: 12,
  });
  geo.translate(0, 0, -d / 2);
  return new THREE.Mesh(geo, material);
}
function cylinder(radius, depth, mat, open = false) {
  const m = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, depth, 96, 1, open),
    mat,
  );
  m.rotation.x = Math.PI / 2;
  return m;
}
function label(text, w = 0.75, h = 0.13, color = "#d0c8a8") {
  const c = document.createElement("canvas");
  c.width = 768;
  c.height = 128;
  const ctx = c.getContext("2d");
  ctx.fillStyle = color;
  ctx.font = '500 52px "Geist Mono", monospace';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 384, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
}
export function buildScene(scene, renderer) {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.set(4.6, 2.5, 7.3);
  camera.lookAt(0, 0, 0.25);
  const matte = new THREE.MeshPhysicalMaterial({
    color: "#242c2c",
    metalness: 0.34,
    roughness: 0.52,
  });
  const silver = metal("#89928c", 0.36),
    blackMetal = metal("#333b3c", 0.44),
    gold = metal("#af8550", 0.3),
    red = new THREE.MeshStandardMaterial({ color: "#a63e25", roughness: 0.45 });
  const dark = new THREE.MeshStandardMaterial({
    color: "#090e10",
    roughness: 0.8,
  });
  const green = new THREE.MeshStandardMaterial({
    color: "#214f48",
    roughness: 0.5,
    metalness: 0.22,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: "#b1d8c9",
    transmission: 0.93,
    roughness: 0.018,
    thickness: 0.35,
    ior: 1.51,
    metalness: 0,
    clearcoat: 1,
    attenuationColor: "#559a85",
    attenuationDistance: 3,
  });
  const all = new THREE.Group();
  scene.add(all);
  const body = new THREE.Group();
  all.add(body);
  const shell = roundedBox(2.4, 1.66, 0.78, 0.2, matte);
  body.add(shell);
  const front = roundedBox(2.26, 1.51, 0.035, 0.13, silver);
  front.position.z = 0.405;
  body.add(front);
  const plate = roundedBox(2.15, 1.39, 0.03, 0.11, matte);
  plate.position.z = 0.435;
  body.add(plate);
  const grip = roundedBox(0.46, 1.44, 0.29, 0.15, dark);
  grip.position.set(0.99, -0.015, 0.59);
  body.add(grip);
  const leatherGeo = new THREE.BoxGeometry(0.025, 0.023, 0.018);
  const leather = new THREE.InstancedMesh(leatherGeo, blackMetal, 500);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 500; i++) {
    dummy.position.set(
      0.86 + (i % 10) * 0.027,
      -0.6 + Math.floor(i / 10) * 0.025,
      0.747 + Math.sin(i * 3.74) * 0.005,
    );
    dummy.rotation.z = i * 0.41;
    dummy.updateMatrix();
    leather.setMatrixAt(i, dummy.matrix);
  }
  body.add(leather);
  const bolts = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.028, 0.028, 0.016, 12),
    silver,
    24,
  );
  for (let i = 0; i < 24; i++) {
    let x, y;
    if (i < 12) {
      x = -1.02 + (i % 6) * 0.4;
      y = i < 6 ? 0.65 : -0.65;
    } else {
      x = i < 18 ? -1.08 : 1.08;
      y = -0.53 + (i % 6) * 0.21;
    }
    dummy.position.set(x, y, 0.465);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.updateMatrix();
    bolts.setMatrixAt(i, dummy.matrix);
  }
  body.add(bolts);
  const top = roundedBox(1.08, 0.2, 0.63, 0.06, blackMetal);
  top.position.set(-0.17, 0.89, 0);
  body.add(top);
  const finder = roundedBox(0.56, 0.25, 0.4, 0.035, matte);
  finder.position.set(-0.2, 1.01, 0);
  body.add(finder);
  const finderGlass = roundedBox(0.4, 0.14, 0.02, 0.015, glass);
  finderGlass.position.set(-0.2, 1.015, 0.215);
  body.add(finderGlass);
  for (const [x, r] of [
    [-0.88, 0.22],
    [0.83, 0.2],
  ]) {
    const knob = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, 0.15, 64),
      blackMetal,
    );
    knob.position.set(x, 0.93, 0.03);
    body.add(knob);
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(r - 0.025, 0.01, 6, 64),
      silver,
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.set(x, 1.015, 0.03);
    body.add(rim);
  }
  const button = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.09, 0.045, 40),
    silver,
  );
  button.position.set(0.83, 1.04, 0.03);
  body.add(button);
  const branding = label("FIELD / 01", 0.74, 0.12);
  branding.position.set(0.25, 0.56, 0.462);
  body.add(branding);
  const sub = label("OPTICAL INSTRUMENT", 0.77, 0.06, "#7b8581");
  sub.position.set(0.14, -0.56, 0.463);
  body.add(sub);
  const accent = new THREE.Mesh(new THREE.CircleGeometry(0.052, 32), red);
  accent.position.set(-0.85, 0.44, 0.475);
  body.add(accent);
  const internals = new THREE.Group();
  all.add(internals);
  const pcb = roundedBox(1.65, 1.14, 0.035, 0.05, green);
  pcb.position.z = -0.25;
  internals.add(pcb);
  for (let i = 0; i < 42; i++) {
    const chip = new THREE.Mesh(
      new THREE.BoxGeometry(0.08 + (i % 3) * 0.022, 0.036, 0.07),
      i % 4 ? blackMetal : silver,
    );
    chip.position.set(
      -0.72 + (i % 7) * 0.23,
      -0.48 + Math.floor(i / 7) * 0.185,
      -0.205,
    );
    internals.add(chip);
  }
  for (let i = 0; i < 16; i++) {
    const trace = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.003, 0.004),
      gold,
    );
    trace.position.set(0, -0.44 + i * 0.057, -0.187);
    internals.add(trace);
  }
  const back = roundedBox(2.25, 1.5, 0.065, 0.14, matte);
  back.position.z = -0.46;
  all.add(back);
  const screen = roundedBox(1.58, 1.02, 0.026, 0.05, dark);
  screen.position.set(-0.1, 0, -0.51);
  all.add(screen);
  const lens = new THREE.Group();
  lens.position.x = -0.24;
  all.add(lens);
  const rings = [];
  const specs = [
    [0.66, 0.12, 0.58, silver],
    [0.62, 0.13, 0.76, blackMetal],
    [0.68, 0.17, 0.96, blackMetal],
    [0.65, 0.27, 1.22, blackMetal],
    [0.69, 0.13, 1.43, gold],
    [0.67, 0.24, 1.64, blackMetal],
    [0.7, 0.035, 1.79, silver],
  ];
  for (const [radius, depth, z, mat] of specs) {
    const ring = cylinder(radius, depth, mat, true);
    ring.position.z = z;
    ring.userData.home = z;
    lens.add(ring);
    rings.push(ring);
    const lip = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.008, 6, 128),
      mat === gold ? gold : silver,
    );
    lip.position.z = z + depth / 2;
    lens.add(lip);
    lip.userData.home = lip.position.z;
    rings.push(lip);
  }
  const ribs = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.018, 0.06, 0.32),
    silver,
    160,
  );
  for (let i = 0; i < 160; i++) {
    const a = (i / 160) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * 0.679, Math.sin(a) * 0.679, 1.14);
    dummy.rotation.set(0, 0, a - Math.PI / 2);
    dummy.updateMatrix();
    ribs.setMatrixAt(i, dummy.matrix);
  }
  lens.add(ribs);
  const iris = new THREE.Group();
  iris.position.z = 1.25;
  lens.add(iris);
  for (let i = 0; i < 9; i++) {
    const leaf = new THREE.Mesh(new THREE.CircleGeometry(0.27, 3), blackMetal);
    const a = (i / 9) * Math.PI * 2;
    leaf.position.set(Math.cos(a) * 0.22, Math.sin(a) * 0.22, i * 0.0007);
    leaf.rotation.z = a;
    iris.add(leaf);
  }
  const optic = cylinder(0.625, 0.055, glass);
  optic.position.z = 1.78;
  lens.add(optic);
  const optic2 = new THREE.Mesh(new THREE.SphereGeometry(0.61, 96, 64), glass);
  optic2.scale.z = 0.1;
  optic2.position.z = 1.77;
  lens.add(optic2);
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const tick = new THREE.Mesh(
      new THREE.PlaneGeometry(0.006, i % 3 ? 0.02 : 0.035),
      gold,
    );
    tick.position.set(Math.cos(a) * 0.73, Math.sin(a) * 0.73, 1.81);
    tick.rotation.z = a - Math.PI / 2;
    lens.add(tick);
  }
  const designation = label("35 / 1.8", 0.5, 0.085);
  designation.position.set(0, -0.5, 1.844);
  lens.add(designation);
  lightScene(scene, { shadows: true });
  ground(scene, -0.865, 0.14);
  all.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  let portrait = false,
    actualExplode = 0,
    targetExplode = 0;
  return {
    camera,
    animated: false,
    needsFrame: () => Math.abs(actualExplode - targetExplode) > 0.001,
    resize(w, h) {
      portrait = w < 640;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
    update(t, value, mode, pointer, { immediate }) {
      targetExplode = mode === 1 ? value : mode === 2 ? 0.25 + value * 0.66 : 0;
      actualExplode = immediate
        ? targetExplode
        : THREE.MathUtils.lerp(actualExplode, targetExplode, 0.2);
      if (Math.abs(actualExplode - targetExplode) < 0.001)
        actualExplode = targetExplode;
      const explode = actualExplode;
      const distance = 1 + explode * (portrait ? 0.46 : 0.28);
      camera.position.set(
        (portrait ? 5.4 : 4.7) * distance,
        (portrait ? 3.0 : 2.65) * distance,
        (portrait ? 10 : 7.5) * distance,
      );
      camera.lookAt(0, 0, 0.28 + explode * 0.6);
      all.rotation.set(pointer.y * 0.055, -0.15 + pointer.x * 0.17, 0);
      lens.position.z = explode * 1.3;
      body.position.z = 0;
      back.position.z = -0.46 - explode * 1.25;
      screen.position.z = -0.51 - explode * 1.25;
      internals.position.z = -explode * 0.65;
      body.visible = mode !== 2;
      rings.forEach(
        (ring, i) =>
          (ring.position.z =
            ring.userData.home + explode * (i / specs.length) * 0.35),
      );
      ribs.position.z = explode * 0.3;
      optic.position.z = 1.78 + explode * 0.6;
      optic2.position.z = 1.77 + explode * 0.6;
      designation.position.z = 1.844 + explode * 0.6;
    },
  };
}
