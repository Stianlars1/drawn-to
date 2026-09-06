import * as THREE from '../../vendor/three/three.module.min.js';

export function environment(renderer, palette = 'neutral') {
  const room = new THREE.Scene();
  room.background = new THREE.Color(palette === 'spectral' ? '#050717' : '#1b2028');
  const panels = [
    [-4, 5, 4, 3.4, 7, '#fff9ef', 3.4],
    [4, 2, 3, .7, 6, '#c9e6ff', 2.7],
    [0, 6, -2, 7, 1.8, '#ffffff', 3],
    [-3, -2, -4, 4, 3, palette === 'spectral' ? '#0055ff' : '#aeb5be', 1.3],
    [3, 1, -4, 3.5, 6, palette === 'spectral' ? '#db13b6' : '#e7ecf4', 2.5]
  ];
  if (palette === 'spectral') panels.push([-4, 1, 1, 2.8, 5, '#02e9bf', 2.3]);
  if (palette === 'machined') panels.push(
    [0, 1.7, 6, 8, 3.7, '#dce5ed', 2.1],
    [-1, -2, 5, 7, 1.7, '#a4bbc8', .9],
    [5, 0, 5, .7, 7, '#ffffff', 3]
  );
  for (const [x,y,z,w,h,color,intensity] of panels) {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(w,h), new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide
    }));
    panel.position.set(x,y,z); panel.lookAt(0,0,0); room.add(panel);
  }
  const generator = new THREE.PMREMGenerator(renderer);
  const target = generator.fromScene(room, .015, .1, 25);
  room.traverse(node => {node.geometry?.dispose();node.material?.dispose();});
  generator.dispose();
  return target;
}

export function texture(kind = 'brushed') {
  const width=512, height=256, data=new Uint8Array(width*height*4);
  let seed=3211;
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){
    seed=(seed*1664525+1013904223)>>>0;
    const noise=seed/4294967296;
    const value=kind==='film' ? 128+105*Math.sin(x/width*Math.PI*2)+14*Math.sin(y/height*5)
      : 191+28*Math.sin(y*14.937)+noise*28;
    const i=(y*width+x)*4;data[i]=data[i+1]=data[i+2]=value;data[i+3]=255;
  }
  const map=new THREE.DataTexture(data,width,height);map.needsUpdate=true;
  map.wrapS=map.wrapT=THREE.RepeatWrapping;map.generateMipmaps=true;
  map.minFilter=THREE.LinearMipmapLinearFilter;map.magFilter=THREE.LinearFilter;map.anisotropy=8;
  return map;
}

export function metal(color='#a6adb3', roughness=.28) {
  const map=texture();
  return new THREE.MeshPhysicalMaterial({color,metalness:1,roughness,roughnessMap:map,
    bumpMap:map,bumpScale:.0015,anisotropy:.65,clearcoat:.14});
}

export function lightScene(scene, {shadows=false, warm=false}={}) {
  scene.add(new THREE.HemisphereLight(warm?'#ffe8c3':'#d9e9fb','#222832',.42));
  const key=new THREE.DirectionalLight(warm?'#ffe5ba':'#fff8ed',2.4);
  key.position.set(-3,6,5);key.castShadow=shadows;
  key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-6;key.shadow.camera.right=6;
  key.shadow.camera.top=6;key.shadow.camera.bottom=-6;key.shadow.normalBias=.018;
  key.shadow.bias=-.0001;key.shadow.radius=3;key.shadow.blurSamples=8;
  scene.add(key);
  const fill=new THREE.DirectionalLight('#b9d5fc',.7);fill.position.set(4,1,-2);scene.add(fill);
}

export function ground(scene,y=-1.3,opacity=.18) {
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.ShadowMaterial({opacity}));
  floor.rotation.x=-Math.PI/2;floor.position.y=y;floor.receiveShadow=true;scene.add(floor);
  return floor;
}

export function softSpot(size=4,opacity=.2) {
  const canvas=document.createElement('canvas');canvas.width=canvas.height=256;
  const ctx=canvas.getContext('2d'),g=ctx.createRadialGradient(128,128,2,128,128,125);
  g.addColorStop(0,`rgba(10,17,20,${opacity})`);g.addColorStop(.45,`rgba(10,17,20,${opacity*.42})`);g.addColorStop(1,'rgba(10,17,20,0)');
  ctx.fillStyle=g;ctx.fillRect(0,0,256,256);
  return new THREE.Mesh(new THREE.PlaneGeometry(size,size),new THREE.MeshBasicMaterial({
    map:new THREE.CanvasTexture(canvas),transparent:true,depthWrite:false,toneMapped:false
  }));
}

export function disposeScene(scene) {
  const geometries=new Set(),materials=new Set(),textures=new Set();
  scene.traverse(node=>{
    if(node.geometry)geometries.add(node.geometry);
    for(const material of node.material?(Array.isArray(node.material)?node.material:[node.material]):[])materials.add(material);
    node.shadow?.dispose();
  });
  for(const material of materials)for(const value of Object.values(material))if(value?.isTexture)textures.add(value);
  geometries.forEach(item=>item.dispose());materials.forEach(item=>item.dispose());textures.forEach(item=>item.dispose());
}
