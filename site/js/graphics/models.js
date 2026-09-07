import * as THREE from "../../vendor/three/three.module.min.js";
import { RoundedBoxGeometry } from "../../vendor/three/addons/geometries/RoundedBoxGeometry.js";

function roundPath(path, x, y, w, h, r) {
  path.moveTo(x + r, y);
  path.lineTo(x + w - r, y);
  path.quadraticCurveTo(x + w, y, x + w, y + r);
  path.lineTo(x + w, y + h - r);
  path.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  path.lineTo(x + r, y + h);
  path.quadraticCurveTo(x, y + h, x, y + h - r);
  path.lineTo(x, y + r);
  path.quadraticCurveTo(x, y, x + r, y);
}

function smoothSharedNormals(geometry, flatEnds = false) {
  const positions = geometry.attributes.position,
    normals = geometry.attributes.normal,
    groups = new Map();
  for (let i = 0; i < positions.count; i++) {
    const key = `${Math.round(positions.getX(i) * 1e5)},${Math.round(positions.getY(i) * 1e5)},${Math.round(positions.getZ(i) * 1e5)}`;
    let group = groups.get(key);
    if (!group) {
      group = { indices: [], normal: new THREE.Vector3() };
      groups.set(key, group);
    }
    group.indices.push(i);
    group.normal.add(
      new THREE.Vector3(normals.getX(i), normals.getY(i), normals.getZ(i)),
    );
  }
  for (const { indices, normal } of groups.values()) {
    normal.normalize();
    for (const index of indices)
      normals.setXYZ(index, normal.x, normal.y, normal.z);
  }
  if (flatEnds) {
    geometry.computeBoundingBox();
    const { min, max } = geometry.boundingBox;
    for (let i = 0; i < positions.count; i++) {
      if (Math.abs(positions.getZ(i) - max.z) < 1e-5)
        normals.setXYZ(i, 0, 0, 1);
      if (Math.abs(positions.getZ(i) - min.z) < 1e-5)
        normals.setXYZ(i, 0, 0, -1);
    }
  }
  normals.needsUpdate = true;
}

export function foldMark(material) {
  const shape = new THREE.Shape();
  roundPath(shape, -1.1, -1.2, 2.2, 2.4, 0.35);
  const hole = new THREE.Path();
  hole.moveTo(-0.53, -0.39);
  hole.quadraticCurveTo(-0.53, -0.61, -0.31, -0.61);
  hole.lineTo(0.31, -0.61);
  hole.quadraticCurveTo(0.53, -0.61, 0.53, -0.39);
  hole.lineTo(0.53, -0.07);
  hole.lineTo(-0.08, -0.32);
  hole.lineTo(-0.24, 0.08);
  hole.lineTo(0.53, 0.4);
  hole.lineTo(0.53, 0.52);
  hole.quadraticCurveTo(0.53, 0.76, 0.29, 0.76);
  hole.lineTo(-0.29, 0.76);
  hole.quadraticCurveTo(-0.53, 0.76, -0.53, 0.52);
  hole.lineTo(-0.53, -0.39);
  shape.holes.push(hole);
  let geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.3,
    bevelEnabled: true,
    bevelSegments: 10,
    steps: 1,
    bevelSize: 0.075,
    bevelThickness: 0.095,
    curveSegments: 48,
  });
  geometry.center();
  smoothSharedNormals(geometry, true);
  const group = new THREE.Group();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  group.rotation.set(0.12, -0.48, -0.15);
  group.userData.original = "Drawn To folded aperture, original geometry";
  return group;
}

export function ribbon(material) {
  const vertices = [],
    uvs = [],
    indices = [],
    steps = 256,
    widthSteps = 12;
  const centers = [],
    dirs = [],
    normals = [];
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const center = new THREE.Vector3(
      1.65 * Math.cos(a),
      0.85 * Math.sin(a),
      0.64 * Math.sin(2 * a),
    );
    const tangent = new THREE.Vector3(
      -1.65 * Math.sin(a),
      0.85 * Math.cos(a),
      1.28 * Math.cos(2 * a),
    ).normalize();
    const normal = new THREE.Vector3()
      .crossVectors(tangent, new THREE.Vector3(0, 0, 1))
      .normalize();
    const binormal = new THREE.Vector3()
      .crossVectors(tangent, normal)
      .normalize();
    const twist = 1.03 * Math.sin(a) + 0.64 * Math.cos(2 * a);
    const side = normal
      .multiplyScalar(Math.cos(twist))
      .addScaledVector(binormal, Math.sin(twist))
      .normalize();
    centers.push(center);
    dirs.push(side);
    normals.push(new THREE.Vector3().crossVectors(tangent, side).normalize());
  }
  for (let layer = 0; layer < 2; layer++)
    for (let i = 0; i <= steps; i++)
      for (let j = 0; j <= widthSteps; j++) {
        const a = (i / steps) * Math.PI * 2;
        const width = 0.35 + 0.15 * Math.sin(a - 0.5),
          v = (j / widthSteps - 0.5) * 2;
        const p = centers[i]
          .clone()
          .addScaledVector(dirs[i], v * width)
          .addScaledVector(
            normals[i],
            (layer ? -0.014 : 0.014) + 0.022 * (1 - v * v),
          );
        vertices.push(p.x, p.y, p.z);
        uvs.push(i / steps, j / widthSteps);
      }
  const row = widthSteps + 1,
    layerSize = (steps + 1) * row;
  for (let layer = 0; layer < 2; layer++)
    for (let i = 0; i < steps; i++)
      for (let j = 0; j < widthSteps; j++) {
        const a = layer * layerSize + i * row + j,
          b = a + row;
        if (layer) indices.push(a, a + 1, b, b, a + 1, b + 1);
        else indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
  for (let i = 0; i < steps; i++)
    for (const j of [0, widthSteps]) {
      const a = i * row + j,
        b = (i + 1) * row + j;
      if (j === 0)
        indices.push(a, a + layerSize, b, b, a + layerSize, b + layerSize);
      else indices.push(a, b, a + layerSize, b, b + layerSize, a + layerSize);
    }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  smoothSharedNormals(geometry);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.rotation.set(0.28, -0.22, 0.5);
  const group = new THREE.Group();
  group.add(mesh);
  return group;
}

function labelTexture(text, color, size = 56) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 512, 128);
  ctx.font = `600 ${size}px Arial`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, 12, 65);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}
function floorLabel(text, x, y, z, width, color = "#f4f8fb", size = 60) {
  const texture = labelTexture(text, color, size);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(width, width / 4),
    material,
  );
  label.rotation.x = -Math.PI / 2;
  label.position.set(x, y, z);
  return label;
}
function machinedTexture() {
  const data = new Uint8Array(256 * 256 * 4);
  let seed = 129;
  for (let y = 0; y < 256; y++)
    for (let x = 0; x < 256; x++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const value =
        198 + Math.sin(y * 9.12) * 24 + (seed / 4294967296 - 0.5) * 15;
      const i = (y * 256 + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = value;
      data[i + 3] = 255;
    }
  const texture = new THREE.DataTexture(data, 256, 256);
  texture.needsUpdate = true;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 4);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  return texture;
}

function satinTexture() {
  const width = 512,
    height = 96,
    data = new Uint8Array(width * height * 4);
  let seed = 9467;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let y = 0; y < height; y++) {
    const row = 225 + random() * 22;
    for (let x = 0; x < width; x++) {
      const value = row + (random() - 0.5) * 22,
        i = (y * width + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = value;
      data[i + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, width, height);
  texture.needsUpdate = true;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  return texture;
}

function brushedCap(length, material) {
  const widthSteps = 40,
    depthSteps = 12,
    vertices = [],
    uvs = [],
    indices = [];
  for (let row = 0; row <= depthSteps; row++) {
    const z = (row / depthSteps - 0.5) * 0.396;
    const corner = Math.max(0, Math.abs(z) - (0.198 - 0.062));
    const halfWidth =
      length / 2 - 0.062 + Math.sqrt(Math.max(0, 0.062 ** 2 - corner ** 2));
    for (let column = 0; column <= widthSteps; column++) {
      const u = column / widthSteps;
      vertices.push((u * 2 - 1) * halfWidth, 0.009 * (1 - (z / 0.198) ** 2), z);
      uvs.push(u, row / depthSteps);
      if (row < depthSteps && column < widthSteps) {
        const a = row * (widthSteps + 1) + column,
          b = a + widthSteps + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

export function schedule() {
  const group = new THREE.Group(),
    grain = machinedTexture(),
    satin = satinTexture();
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: "#24313a",
    roughness: 0.64,
    metalness: 1,
    envMapIntensity: 0.38,
    roughnessMap: grain,
    bumpMap: grain,
    bumpScale: 0.001,
  });
  const slab = new THREE.Mesh(
    new RoundedBoxGeometry(6.35, 0.16, 3.55, 5, 0.075),
    baseMaterial,
  );
  slab.position.y = -0.75;
  slab.receiveShadow = true;
  slab.castShadow = true;
  group.add(slab);
  const barMaterial = new THREE.MeshPhysicalMaterial({
    color: "#536068",
    metalness: 1,
    roughness: 0.24,
    envMapIntensity: 0.9,
  });
  const faceMaterial = new THREE.MeshPhysicalMaterial({
    color: "#8b9aa4",
    metalness: 1,
    envMapIntensity: 0.65,
    roughness: 0.44,
    roughnessMap: satin,
    bumpMap: satin,
    bumpScale: 0.00015,
    anisotropy: 0.8,
    clearcoat: 0,
  });
  const rows = [
    ["Discover", 1.9, -0.79],
    ["Frame", 2.4, -0.22],
    ["Make", 2.98, 0.19],
    ["Refine", 1.91, 1.09],
  ];
  rows.forEach(([text, length, x], i) => {
    const z = -0.85 + i * 0.7;
    const barOutline = new THREE.Shape();
    roundPath(barOutline, -length / 2, -0.215, length, 0.43, 0.07);
    const barGeometry = new THREE.ExtrudeGeometry(barOutline, {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.005,
      bevelThickness: 0.005,
      curveSegments: 20,
    });
    barGeometry.center();
    smoothSharedNormals(barGeometry, true);
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.rotation.x = -Math.PI / 2;
    bar.userData.essential = true;
    bar.position.set(x, -0.565, z);
    bar.castShadow = true;
    bar.receiveShadow = true;
    group.add(bar);
    const capShape = new THREE.Shape();
    roundPath(capShape, -(length - 0.03) / 2, -0.2, length - 0.03, 0.4, 0.065);
    const capGeometry = new THREE.ExtrudeGeometry(capShape, {
      depth: 0.014,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.003,
      bevelThickness: 0.003,
      curveSegments: 16,
    });
    capGeometry.center();
    smoothSharedNormals(capGeometry, true);
    const face = new THREE.Mesh(capGeometry, faceMaterial);
    face.rotation.x = -Math.PI / 2;
    face.position.set(x, -0.485, z);
    face.receiveShadow = true;
    group.add(face);
    const crown = brushedCap(length - 0.031, faceMaterial);
    crown.position.set(x, -0.473, z);
    crown.receiveShadow = true;
    group.add(crown);
    const lightColor = i === 2 ? "#ffc36b" : "#99d2ff";
    const socket = new THREE.Mesh(
      new RoundedBoxGeometry(0.073, 0.009, 0.27, 3, 0.004),
      barMaterial,
    );
    socket.position.set(x - length / 2 + 0.16, -0.462, z);
    group.add(socket);
    const led = new THREE.Mesh(
      new RoundedBoxGeometry(0.043, 0.018, 0.24, 3, 0.014),
      new THREE.MeshBasicMaterial({ color: lightColor, toneMapped: false }),
    );
    led.position.set(x - length / 2 + 0.16, -0.457, z);
    group.add(led);
    const spill = new THREE.PointLight(lightColor, 0.003, 0.28, 2);
    spill.position.set(x - length / 2 + 0.16, -0.405, z);
    group.add(spill);
    group.add(floorLabel(text, x - length / 2 + 1.0, -0.458, z, 1.53));
    group.add(
      floorLabel(
        String(i + 1).padStart(2, "0"),
        -2.57,
        -0.659,
        z,
        0.66,
        "#8d9ea9",
        60,
      ),
    );
  });
  ["Week 01", "Week 02", "Week 03", "Week 04"].forEach((text, i) =>
    group.add(
      floorLabel(text, -1.21 + i * 1.17, -0.659, -1.48, 0.96, "#a4b3bc", 52),
    ),
  );
  const gridMaterial = new THREE.LineBasicMaterial({
    color: "#728897",
    transparent: true,
    opacity: 0.22,
  });
  for (let x = -1.76; x <= 2.96; x += 1.17) {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, -0.66, -1.27),
      new THREE.Vector3(x, -0.66, 1.58),
    ]);
    group.add(new THREE.Line(g, gridMaterial));
  }
  for (let z = -1.2; z <= 1.6; z += 0.7) {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.97, -0.66, z),
      new THREE.Vector3(2.97, -0.66, z),
    ]);
    group.add(new THREE.Line(g, gridMaterial));
  }
  group.rotation.y = -0.08;
  return group;
}
