import * as THREE from '../../../vendor/three/three.module.min.js';
import {lightScene,softSpot} from '../materials.js';

export function buildScene(scene) {
  const camera=new THREE.OrthographicCamera(-5,5,3,-3,.1,30);camera.position.z=12;
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=8;
  const page=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map,toneMapped:false}));
  page.position.z=-.55;scene.add(page);
  const glass=new THREE.MeshPhysicalMaterial({color:'#ffffff',metalness:0,roughness:.015,
    transmission:1,thickness:1.25,ior:1.48,dispersion:.028,clearcoat:1,clearcoatRoughness:.06,
    attenuationColor:'#b6e6e7',attenuationDistance:16,envMapIntensity:.85});
  const lens=new THREE.Mesh(new THREE.SphereGeometry(1.42,128,80),glass);
  lens.scale.set(1.08,.97,.44);lens.position.z=.32;scene.add(lens);
  const shadow=softSpot(3.8,.16);shadow.position.z=-.52;scene.add(shadow);
  lightScene(scene);
  let portrait=false,viewHeight=6;
  function drawType(aspect){
    canvas.width=aspect<1?1200:2200;canvas.height=Math.round(canvas.width/aspect);
    ctx.fillStyle='#f5f5f0';ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle='#deded5';ctx.lineWidth=1;
    for(const y of [.21,.49,.77]){ctx.beginPath();ctx.moveTo(55,canvas.height*y);ctx.lineTo(canvas.width-55,canvas.height*y);ctx.stroke();}
    ctx.fillStyle='#20231f';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.font=`600 ${Math.min(canvas.width*.264,canvas.height*.385)}px Inter, sans-serif`;
    ctx.letterSpacing=`${-canvas.width*.013}px`;
    ctx.fillText('LOOK',canvas.width*.49,canvas.height*(portrait?.36:.29));
    ctx.fillText('AGAIN.',canvas.width*.49,canvas.height*(portrait?.60:.70));
    ctx.letterSpacing='0px';ctx.font=`400 ${canvas.width*(portrait?.025:.0105)}px "Geist Mono", monospace`;ctx.textAlign='left';
    ctx.fillStyle='#787e70';ctx.fillText('A DIFFERENT WAY OF SEEING',58,canvas.height*.085);
    ctx.textAlign='right';ctx.fillText('DRAWN TO / PERCEPTION',canvas.width-58,canvas.height*.90);
    ctx.fillStyle='#dbed69';ctx.fillRect(canvas.width*.83,canvas.height*.08,canvas.width*.07,canvas.width*.014);
    map.needsUpdate=true;
  }
  return {
    camera,
    animated:false,
    resize(width,height){const aspect=width/height;portrait=aspect<1;viewHeight=9.7/aspect;
      camera.left=-4.85;camera.right=4.85;camera.top=viewHeight/2;camera.bottom=-viewHeight/2;camera.updateProjectionMatrix();
      page.scale.set(9.7,viewHeight,1);drawType(aspect);lens.scale.set(portrait?1.1:1.08,portrait?1.08:.97,.44);
    },
    update(time,value,pointer){
      lens.position.x=(value-.5)*5.7;lens.position.y=(portrait?-viewHeight*.08:.12)+pointer.y*(portrait?1.7:.75);
      lens.rotation.z=-.1+pointer.x*.035;
      shadow.position.set(lens.position.x+.11,lens.position.y-.13,-.52);
    }
  };
}
