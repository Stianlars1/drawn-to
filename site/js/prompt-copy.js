/* One exporter shared by all scene headers. Text is loaded only on request. */
(() => {
  const cache=new Map();
  const dialog=document.createElement('dialog');
  dialog.className='style-dialog';
  dialog.setAttribute('aria-labelledby','style-dialog-title');
  dialog.innerHTML=`<form method="dialog" class="style-dialog-heading"><div><span class="style-kicker">TAKE THE DIRECTION WITH YOU</span><h2 id="style-dialog-title"></h2></div><button class="style-close" aria-label="Close prompt" value="close">×</button></form><p class="style-intro">The composition, materials, effects and source code behind this scene. Paste it into your coding agent.</p><textarea class="style-text" aria-label="Style prompt" readonly spellcheck="false"></textarea><div class="style-dialog-footer"><span role="status" aria-live="polite"></span><button type="button" class="style-copy-dialog">Copy prompt</button></div>`;
  document.body.append(dialog);
  const area=dialog.querySelector('textarea'),status=dialog.querySelector('[role=status]'),copyButton=dialog.querySelector('.style-copy-dialog');
  let currentId=null,request=0,returnFocus=null;
  const entry=id=>window.DrawnToPromptIndex[id];
  async function load(id){
    if(!entry(id))throw new Error('Unknown scene');
    if(cache.has(id))return cache.get(id);
    const response=await fetch(entry(id).url);
    if(!response.ok)throw new Error('Prompt unavailable');
    const text=await response.text();
    if(!text.startsWith('Use this visual direction:'))throw new Error('Invalid prompt response');
    cache.set(id,text);return text;
  }
  function stopCycle(){document.dispatchEvent(new Event('drawnto:prompt-open'));}
  async function preview(id,trigger,message=''){
    const token=++request;currentId=id;returnFocus=trigger;
    stopCycle();
    dialog.querySelector('h2').textContent=entry(id)?.name||'Style prompt';
    area.value='Loading this scene’s prompt…';copyButton.disabled=true;status.textContent='';
    if(!dialog.open)dialog.showModal();
    try{
      const text=await load(id);if(token!==request||!dialog.open)return;
      area.value=text;copyButton.disabled=false;status.textContent=message;
      if(message){area.focus();area.select();}
    }catch{if(token===request&&dialog.open){area.value='';status.textContent='Could not load this prompt. Close and try again.';}}
  }
  async function copy(id,trigger){
    if(trigger.dataset.busy)return;
    trigger.dataset.busy='true';stopCycle();
    const label=trigger.dataset.copyLabel||trigger.textContent;trigger.dataset.copyLabel=label;
    clearTimeout(trigger.copyReset);trigger.textContent='Loading…';
    try{
      const text=await load(id);
      if(!navigator.clipboard)throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      if(trigger.isConnected){trigger.textContent='Copied';trigger.dataset.copied='true';document.querySelector('#live').textContent=`${entry(id).name} prompt copied.`;}
    }catch{if(trigger.isConnected)await preview(id,trigger,'Automatic copy is unavailable. Select and copy the text below.');}
    finally{delete trigger.dataset.busy;trigger.copyReset=setTimeout(()=>{if(trigger.isConnected){trigger.textContent=label;delete trigger.dataset.copied;}},1700);}
  }
  document.addEventListener('click',event=>{
    const trigger=event.target.closest('[data-style-copy],[data-style-preview]');if(!trigger)return;
    const id=document.documentElement.dataset.variant;
    if(trigger.hasAttribute('data-style-copy'))copy(id,trigger);else preview(id,trigger);
  });
  copyButton.addEventListener('click',async()=>{
    const id=currentId;
    try{await navigator.clipboard.writeText(area.value);if(dialog.open&&id===currentId)status.textContent='Copied. Ready for your coding agent.';}
    catch{status.textContent='Select and copy the text manually.';area.focus();area.select();}
  });
  dialog.addEventListener('close',()=>{request++;returnFocus?.isConnected&&returnFocus.focus();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  window.DrawnToStylePrompts={copy,preview};
})();
