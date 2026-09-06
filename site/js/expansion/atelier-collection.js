(() => {
  const base='./assets/atelier/';
  const specimens=[
    ['Amber resin','Light held inside. Small bubbles make the volume visible.','Warm / translucent'],
    ['Cobalt porcelain','A fine fluted profile, uneven glaze and a quieter unglazed foot.','Glazed / ribbed'],
    ['Brushed aluminium','A broad satin face meets a bright polished edge.','Directional / reflective'],
    ['Carved stone','A balanced silhouette with a surface that refuses to become smooth.','Porous / tactile'],
    ['Handmade paper','The edge tells the story: fiber, thickness and many individual sheets.','Layered / soft'],
    ['Cast glass','Thickness, air and an open curve give light something to describe.','Clear / curved']
  ];
  const tile=(index,cls='')=>`<span class="at-specimen-crop ${cls}" aria-hidden="true"><span class="at-specimen-photo" style="--column:${index%3};--row:${Math.floor(index/3)}"></span></span>`;
  function inspect(root,{title,description,image,index}){
    const dialog=document.createElement('dialog');dialog.className='at-inspector';dialog.setAttribute('aria-label',title);
    dialog.innerHTML=`<button type="button" class="at-inspector-close" aria-label="Close detail">×</button><div class="at-inspector-image">${index===undefined?`<img src="${image}" alt="${title}">`:tile(index)}</div><div class="at-inspector-copy"><h2>${title}</h2><p>${description}</p><span>An original visual study for Drawn To.</span></div>`;
    root.append(dialog);dialog.querySelector('button').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
    dialog.addEventListener('close',()=>dialog.remove(),{once:true});dialog.showModal();
  }
  const frames=[
    {id:'chrome',name:'A stronger contrast',file:base+'red-chamber.webp',detail:'Polished chrome and velvet describe two very different kinds of light.'},
    {id:'garden',name:'A place to linger',file:base+'night-garden.webp',detail:'Warm glass interiors, dark water and a distant layer of trees.'},
    {id:'paper',name:'A world in paper',file:base+'paper-theatre.webp',detail:'A complete miniature landscape, constructed from one material.'},
    {id:'vessel',name:'Attention, under glass',file:base+'living-terrarium.webp',detail:'A small living world, seen through the material that contains it.'},
    {id:'materials',name:'A material vocabulary',file:base+'specimen-cabinet.webp',detail:'Six distinct surfaces, described by one consistent studio light.'},
    {id:'ink',name:'A quieter impression',file:'./assets/expansion/editorial/garden-panorama.png',detail:'A blue-ink landscape built from lines, density and breathing room.'}
  ];
  const pages=[
    {id:'specimen-cabinet',order:51,series:'atelier',name:'a material vocabulary',reference:'DmitryLepisov-2093247212629139641',theme:{background:'#f2eee5',ink:'#383b31',muted:'#7c7d6d',accent:'#5d7044'},
      render(){return `<div class="at-cabinet-intro"><span class="at-eyebrow">THE MATERIAL LIBRARY</span><h1>A feel for<br><em>what fits.</em></h1><p>Start with a surface.<br>Notice what it makes you feel.</p><div class="at-cabinet-index"><span>06</span><p>original specimens<br>one considered collection</p></div></div><div class="at-cabinet-grid">${specimens.map((item,i)=>`<button type="button" class="at-specimen" data-specimen="${i}" aria-label="Inspect ${item[0]}">${tile(i)}<span class="at-specimen-label"><small>0${i+1}</small><strong>${item[0]}</strong><i>↗</i></span><span class="at-specimen-note">${item[2]}</span></button>`).join('')}</div>`;},
      mount(root,{signal}){root.querySelectorAll('[data-specimen]').forEach(button=>button.addEventListener('click',()=>{const index=Number(button.dataset.specimen),item=specimens[index];inspect(root,{title:item[0],description:item[1],index});},{signal}));}},
    {id:'contact-sheet',order:54,series:'atelier',name:'the things you keep',reference:'LexnLin-2095920966899728661',theme:{background:'#191c1b',ink:'#e9e9df',muted:'#a7ada3',accent:'#d6e698'},
      render(){return `<div class="at-contact-copy"><span class="at-eyebrow">COLLECT. COMPARE. CONSIDER.</span><h1>Keep what<br><em>stays with you.</em></h1><p>A direction starts with noticing.<br>Then choosing what belongs together.</p><div class="at-contact-tools"><span>Move the selected frame</span><div><button type="button" data-frame-move="-1" aria-label="Move selected frame left">←</button><button type="button" data-frame-move="1" aria-label="Move selected frame right">→</button><output data-frame-count>01 / 06</output></div></div></div><button type="button" class="at-contact-main" data-inspect-frame aria-label="Inspect selected frame"><span class="at-film-rail at-film-top" aria-hidden="true"></span><img src="${frames[0].file}" alt="${frames[0].name}"><span class="at-film-rail at-film-bottom" aria-hidden="true"></span></button><div class="at-contact-caption"><span data-frame-title>${frames[0].name}</span><span>Look closer ↗</span></div><div class="at-contact-strip" role="group" aria-label="Choose a frame"></div><p class="at-sr" data-contact-status role="status"></p>`;},
      mount(root,{signal}){
        const order=[...frames];let selected=order[0].id;const strip=root.querySelector('.at-contact-strip');
        function draw(focus=false){const index=order.findIndex(frame=>frame.id===selected),frame=order[index];
          strip.innerHTML=order.map((item,i)=>`<button type="button" class="at-contact-thumb" data-frame="${item.id}" aria-pressed="${item.id===selected}" aria-label="View ${item.name}"><span><img src="${item.file}" alt=""></span><small>${String(i+1).padStart(2,'0')} / ${item.name}</small></button>`).join('');
          const image=root.querySelector('.at-contact-main>img');image.src=frame.file;image.alt=frame.name;
          root.querySelector('[data-frame-title]').textContent=frame.name;root.querySelector('[data-frame-count]').value=String(index+1).padStart(2,'0')+' / 06';
          root.querySelector('[data-frame-move="-1"]').disabled=index===0;root.querySelector('[data-frame-move="1"]').disabled=index===order.length-1;
          root.querySelector('[data-contact-status]').textContent=frame.name+', position '+(index+1)+' of 6.';
          if(focus)strip.querySelector(`[data-frame="${selected}"]`).focus({preventScroll:true});
        }
        strip.addEventListener('click',event=>{const button=event.target.closest('[data-frame]');if(button){selected=button.dataset.frame;draw(true);}},{signal});
        root.querySelectorAll('[data-frame-move]').forEach(button=>button.addEventListener('click',()=>{const index=order.findIndex(frame=>frame.id===selected),next=index+Number(button.dataset.frameMove);if(next<0||next>=order.length)return;[order[index],order[next]]=[order[next],order[index]];draw();},{signal}));
        root.querySelector('[data-inspect-frame]').addEventListener('click',()=>{const frame=order.find(item=>item.id===selected);inspect(root,{title:frame.name,description:frame.detail,image:frame.file});},{signal});draw();
      }}
  ];
  window.DrawnToPages=[...(window.DrawnToPages||[]),...pages];
})();
