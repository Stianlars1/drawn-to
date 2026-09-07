import * as THREE from "../../vendor/three/three.module.min.js";

/** A visible, opaque reference plane for actual transmission, not an overlay on the glass. */
export function opticalBench(background) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1536;
  const context = canvas.getContext("2d");
  context.fillStyle = background;
  context.fillRect(0, 0, 1536, 1536);
  const wash = context.createRadialGradient(1060, 680, 10, 1060, 680, 530);
  wash.addColorStop(0, "#b4c6b9");
  wash.addColorStop(0.42, "#d3dcd1");
  wash.addColorStop(1, background);
  context.fillStyle = wash;
  context.fillRect(0, 0, 1536, 1536);
  context.fillStyle = "#263e34";
  context.font = '400 500px "Instrument Serif", Georgia, serif';
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("form.", 745, 880);
  context.strokeStyle = "#738879";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(370, 1110);
  context.lineTo(1190, 1110);
  context.stroke();
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  const material = new THREE.MeshBasicMaterial({ map, toneMapped: false });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(4.9, 4.9), material);
  plane.position.set(0.1, -0.06, -1.2);
  return plane;
}
