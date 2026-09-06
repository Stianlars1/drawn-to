/** Rebuild the original texture-free GLB from the same geometry as the live study. */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import * as THREE from '../site/vendor/three/three.module.min.js';
import { GLTFExporter } from '../site/vendor/three/addons/exporters/GLTFExporter.js';
import { foldMark } from '../site/js/graphics/models.js';

if (!globalThis.FileReader) {
  globalThis.FileReader = class {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then(result => {
        this.result = result;
        this.onloadend?.();
      }).catch(error => this.onerror?.(error));
    }
  };
}
const model = foldMark(new THREE.MeshStandardMaterial({ color:'#e4dfd1', roughness:.31 }));
const bytes = await new GLTFExporter().parseAsync(model, { binary:true });
const output = fileURLToPath(new URL('../site/assets/models/folded-aperture.glb', import.meta.url));
await writeFile(output, new Uint8Array(bytes));
console.log(`Wrote original GLB (${bytes.byteLength} bytes)`);
