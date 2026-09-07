import * as THREE from "../../../vendor/three/three.module.min.js";
export function buildScene(scene) {
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.z = 8;
  const count = 4800,
    positions = new Float32Array(count * 3),
    colors = new Float32Array(count * 3),
    targets = [
      new Float32Array(count * 3),
      new Float32Array(count * 3),
      new Float32Array(count * 3),
    ];
  for (let i = 0; i < count; i++) {
    const u = i / count,
      a = i * 0.381966 * Math.PI * 2,
      v = (i % 80) / 79;
    const pts = [
      [
        Math.cos(a) * Math.sqrt(1 - (u * 2 - 1) ** 2) * 1.65,
        (u * 2 - 1) * 1.65,
        Math.sin(a) * Math.sqrt(1 - (u * 2 - 1) ** 2) * 1.65,
      ],
      [
        (u - 0.5) * 4.1,
        Math.sin(u * 11.8) * 0.65 + (v - 0.5) * 1.1,
        Math.cos(v * 5) * 0.35,
      ],
      [
        (0.9 + 0.32 * Math.cos(v * Math.PI * 2)) * Math.cos(u * Math.PI * 2),
        (0.9 + 0.32 * Math.cos(v * Math.PI * 2)) * Math.sin(u * Math.PI * 2),
        0.32 * Math.sin(v * Math.PI * 2),
      ],
    ];
    pts.forEach((p, j) => targets[j].set(p, i * 3));
    colors.set([0.2 + v * 0.22, 0.29 + v * 0.19, 0.26 + v * 0.1], i * 3);
  }
  positions.set(targets[0]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 0.014,
    color: "#244d35",
    vertexColors: false,
    transparent: true,
    opacity: 0.93,
    depthWrite: false,
  });
  const cloud = new THREE.Points(geometry, material);
  scene.add(cloud);
  let previous = 0,
    changedAt = 0,
    from = new Float32Array(positions);
  return {
    camera,
    resize(w, h) {
      camera.aspect = w / h;
      camera.position.z = w < 640 ? 9.5 : 6.7;
      camera.updateProjectionMatrix();
    },
    update(t, value, mode, pointer, { immediate }) {
      const target = targets[mode % 3];
      if (previous !== mode) {
        from.set(positions);
        changedAt = t;
        previous = mode;
      }
      const raw = immediate ? 1 : Math.min(1, (t - changedAt) / 1.05);
      const progress = raw * raw * (3 - 2 * raw);
      for (let i = 0; i < positions.length; i++) {
        const desired = target[i] + Math.sin(i * 2.719) * (1 - value) * 0.1;
        positions[i] = from[i] + (desired - from[i]) * progress;
      }
      geometry.attributes.position.needsUpdate = true;
      cloud.rotation.y = t * 0.045 + pointer.x * 0.12;
      cloud.rotation.x = -0.1 + pointer.y * 0.06;
    },
  };
}
