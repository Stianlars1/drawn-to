import * as THREE from '../../../vendor/three/three.module.min.js';
import {metal,lightScene,softSpot} from '../materials.js';

function ring(inner,outer,z,material){const mesh=new THREE.Mesh(new THREE.RingGeometry(inner,outer,192),material);mesh.position.z=z;return mesh;}
function bladeGeometry(index,value){
  const angle=index/9*Math.PI*2,opening=.17+value*1.08,outer=1.78;
  const p=(r,a)=>new THREE.Vector2(Math.cos(a)*r,Math.sin(a)*r);
  const a=p(outer,angle-.07),b=p(outer,angle+1.02),c=p(opening,angle+1.15),d=p(opening,angle+.42);
  const shape=new THREE.Shape();shape.moveTo(a.x,a.y);shape.absarc(0,0,outer,angle-.07,angle+1.02,false);
  shape.quadraticCurveTo(c.x*.75,c.y*.75,c.x,c.y);shape.lineTo(d.x,d.y);shape.lineTo(a.x,a.y);
  return new THREE.ExtrudeGeometry(shape,{depth:.009,bevelEnabled:true,bevelSegments:2,bevelThickness:.004,bevelSize:.005,curveSegments:32});
}

export function buildScene(scene){
  const camera=new THREE.PerspectiveCamera(35,1,.1,30);camera.position.set(.1,-.55,10);camera.lookAt(0,0,0);
  const group=new THREE.Group();scene.add(group);
  const silver=metal('#aeb5ba',.27),rim=metal('#d8e1e6',.14);
  const black=new THREE.MeshPhysicalMaterial({color:'#141a1d',metalness:.65,roughness:.27});
  const body=new THREE.Mesh(new THREE.CylinderGeometry(2.45,2.45,.36,192,1),silver);body.rotation.x=Math.PI/2;group.add(body);
  const bodyFace=ring(1.71,2.41,.183,silver);group.add(bodyFace);
  const depth=new THREE.Mesh(new THREE.CircleGeometry(1.77,128),new THREE.MeshBasicMaterial({color:'#121c20'}));depth.position.z=.19;group.add(depth);
  for(const [r,t,z,mat] of [[2.43,.025,.175,rim],[2.25,.018,.20,black],[2.18,.009,.205,rim],[1.85,.055,.195,rim],[1.75,.017,.21,black]]){
    const mesh=new THREE.Mesh(new THREE.TorusGeometry(r,t,12,192),mat);mesh.position.z=z;group.add(mesh);
  }
  const fine=new THREE.MeshBasicMaterial({color:'#424b4d',toneMapped:false});
  for(let i=0;i<144;i++){
    const angle=i/144*Math.PI*2,long=i%12===0;
    const tick=new THREE.Mesh(new THREE.PlaneGeometry(long?.013:.007,long?.12:.046),fine);
    tick.position.set(Math.sin(angle)*2.32,Math.cos(angle)*2.32,.212);tick.rotation.z=-angle;group.add(tick);
  }
  for(let i=0;i<6;i++){
    const a=i/6*Math.PI*2+.26;
    const screw=new THREE.Mesh(new THREE.CylinderGeometry(.036,.04,.013,24),rim);screw.rotation.x=Math.PI/2;
    screw.position.set(Math.cos(a)*2.01,Math.sin(a)*2.01,.206);group.add(screw);
    const slot=new THREE.Mesh(new THREE.PlaneGeometry(.042,.008),fine);slot.position.copy(screw.position);slot.position.z=.216;slot.rotation.z=a+.3;group.add(slot);
  }
  const canvas=document.createElement('canvas');canvas.width=canvas.height=1024;const ctx=canvas.getContext('2d');
  ctx.translate(512,512);ctx.fillStyle='#394549';ctx.font='500 18px Inter, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  for(let i=0;i<=10;i++){ctx.save();ctx.rotate((-.42+.84*i/10)*Math.PI*2);ctx.fillText(String(i*10).padStart(2,'0'),0,-437);ctx.restore();}
  const labelMap=new THREE.CanvasTexture(canvas);labelMap.colorSpace=THREE.SRGBColorSpace;
  const labels=new THREE.Mesh(new THREE.PlaneGeometry(4.83,4.83),new THREE.MeshBasicMaterial({map:labelMap,transparent:true,depthWrite:false,toneMapped:false}));labels.position.z=.219;group.add(labels);
  const blades=[];
  for(let i=0;i<9;i++){
    const material=metal(new THREE.Color().setHSL(.55,.07,.28+i*.007),.34);material.metalness=.7;
    const mesh=new THREE.Mesh(bladeGeometry(i,.5),material);mesh.position.z=.226+i*.004;blades.push(mesh);group.add(mesh);
  }
  const indicator=new THREE.Mesh(new THREE.BoxGeometry(.12,.04,.018),new THREE.MeshBasicMaterial({color:'#ed7635',toneMapped:false}));indicator.position.set(0,2.47,.2);group.add(indicator);
  const shadow=softSpot(6.5,.24);shadow.position.set(.06,-.12,-.22);scene.add(shadow);lightScene(scene);
  let previous=.5;
  return{
    camera,
    animated:false,
    resize(width,height){camera.aspect=width/height;camera.position.z=width/height<1?9.6:9.7;camera.lookAt(0,0,0);camera.updateProjectionMatrix();},
    update(time,value,pointer){
      if(Math.abs(previous-value)>.002){blades.forEach((mesh,i)=>{mesh.geometry.dispose();mesh.geometry=bladeGeometry(i,value);});previous=value;}
      group.rotation.y=-.19+pointer.x*.035;group.rotation.x=-.13+pointer.y*.025;
      const angle=(-.42+.84*value)*Math.PI*2;indicator.position.set(Math.sin(angle)*2.47,Math.cos(angle)*2.47,.2);indicator.rotation.z=-angle;
    }
  };
}
