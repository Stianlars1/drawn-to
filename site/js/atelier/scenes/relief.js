import * as THREE from '../../../vendor/three/three.module.min.js';
import {lightScene,ground,texture} from '../materials.js';

function fin(index,value){
  const vertices=[],indices=[],uvs=[],steps=90;
  const profile=[[-.055,-.08],[.055,-.08],[.055,.08],[-.055,.08]];
  for(let side=0;side<4;side++)for(let i=0;i<=steps;i++){
    const y=(i/steps-.5)*3.8;
    const z=Math.sin(y*1.9+index*.13)*(.24+value*.65)+.22*Math.cos(y*.7-index*.1);
    vertices.push((index-17.5)*.145+profile[side][0],y,z+profile[side][1]);
    uvs.push(side/3,i/steps);
  }
  for(let side=0;side<4;side++)for(let i=0;i<steps;i++){
    const a=side*(steps+1)+i,b=((side+1)%4)*(steps+1)+i;indices.push(a,a+1,b,a+1,b+1,b);
  }
  indices.push(0,steps+1,(steps+1)*2,0,(steps+1)*2,(steps+1)*3);
  const end=steps;indices.push(end,end+(steps+1)*2,end+steps+1,end,end+(steps+1)*3,end+(steps+1)*2);
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}

export function buildScene(scene){
  const camera=new THREE.PerspectiveCamera(35,1,.1,40);camera.position.set(5,3.5,9.6);camera.lookAt(0,0,0);
  const group=new THREE.Group();scene.add(group);const pieces=[];const brush=texture();
  const material=new THREE.MeshPhysicalMaterial({color:'#2d61c9',metalness:.52,roughness:.22,
    clearcoat:.8,clearcoatRoughness:.14,roughnessMap:brush,side:THREE.DoubleSide,envMapIntensity:1});
  for(let i=0;i<36;i++){const mesh=new THREE.Mesh(fin(i,.5),material);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);pieces.push(mesh);}
  group.rotation.set(-.22,-.28,-.12);group.position.y=.15;group.scale.setScalar(1.14);
  lightScene(scene,{shadows:true});ground(scene,-2.5,.15);let previous=.5;
  return{
    camera,
    resize(width,height){camera.aspect=width/height;camera.position.set(5,3.5,width/height<1?15:9.6);camera.lookAt(0,0,0);camera.updateProjectionMatrix();},
    update(time,value,pointer){
      if(Math.abs(value-previous)>.002){pieces.forEach((mesh,i)=>{mesh.geometry.dispose();mesh.geometry=fin(i,value);});previous=value;}
      group.rotation.y=-.28+Math.sin(time*.19)*.055+pointer.x*.045;
    }
  };
}
