import * as THREE from '../../../vendor/three/three.module.min.js';
import {lightScene,texture} from '../materials.js';

function strip(index,count,tension) {
  const vertices=[],indices=[],uvs=[],steps=140,across=4;
  const offset=(index-(count-1)/2)*(.105+tension*.035);
  for(let layer=0;layer<2;layer++)for(let i=0;i<=steps;i++)for(let j=0;j<=across;j++){
    const u=i/steps*2-1, v=(j/across-.5)*2;
    const twist=u*2.0+index*.16;
    const x=u*3.1+offset*.42;
    const y=Math.sin(u*2.8+index*.052)*(1.23+tension*.72)+offset*.88;
    const z=Math.cos(u*3.6+index*.13)*(.65+tension*.4)+offset*.16;
    const halfWidth=.092+.018*Math.cos(u*3);
    vertices.push(x+v*halfWidth*Math.sin(twist)*.35,y+v*halfWidth*Math.cos(twist),z+v*halfWidth*Math.sin(twist)+(layer?.009:-.009));
    uvs.push(i/steps,j/across);
  }
  const row=across+1,layerSize=(steps+1)*row;
  for(let layer=0;layer<2;layer++)for(let i=0;i<steps;i++)for(let j=0;j<across;j++){
    const a=layer*layerSize+i*row+j,b=a+row;
    if(layer)indices.push(a,a+1,b,b,a+1,b+1);else indices.push(a,b,a+1,b,b+1,a+1);
  }
  for(let i=0;i<steps;i++)for(const j of [0,across]){
    const a=i*row+j,b=a+row;indices.push(a,b,a+layerSize,b,b+layerSize,a+layerSize);
  }
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);geometry.computeVertexNormals();
  return geometry;
}

export function buildScene(scene) {
  const camera=new THREE.PerspectiveCamera(34,1,.1,30);camera.position.set(.1,.2,11.5);camera.lookAt(.3,0,0);
  const film=texture('film');
  const material=new THREE.MeshPhysicalMaterial({color:'#b0d4fa',metalness:1,roughness:.14,
    iridescence:1,iridescenceIOR:1.6,iridescenceThicknessRange:[130,660],iridescenceThicknessMap:film,
    clearcoat:.8,clearcoatRoughness:.12,envMapIntensity:1.4,side:THREE.DoubleSide});
  const group=new THREE.Group();scene.add(group);const pieces=[];
  for(let i=0;i<22;i++){const mesh=new THREE.Mesh(strip(i,22,.5),material);pieces.push(mesh);group.add(mesh);}
  group.rotation.set(-.36,-.37,.38);lightScene(scene);let previous=.5,portrait=false;
  return {
    camera,
    resize(width,height){portrait=width/height<1;camera.aspect=width/height;camera.position.z=portrait?16.8:11.5;camera.lookAt(.3,0,0);camera.updateProjectionMatrix();
      group.scale.setScalar(portrait?.91:1);group.position.x=portrait?0:.75;
    },
    update(time,value,pointer){
      if(Math.abs(value-previous)>.002){pieces.forEach((mesh,i)=>{mesh.geometry.dispose();mesh.geometry=strip(i,22,value);});previous=value;}
      group.rotation.y=-.37+Math.sin(time*.18)*.14+pointer.x*.045;
      group.rotation.x=-.36+Math.cos(time*.15)*.06;group.rotation.z=.38+Math.sin(time*.11)*.025;
    }
  };
}
