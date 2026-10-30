// Adaptación local del control exterior del widget oficial. No modifica el
// script remoto, no accede al iframe de pagos y no añade datos del mapa al iframe.
(()=>{
 function ready(){
  const button=document.getElementById('bmc-wbtn'),frame=document.getElementById('bmc-iframe');
  if(!button||!frame||button.dataset.dsReady)return;
  button.dataset.dsReady='true';
  const layer=frame.parentElement,close=document.getElementById('bmc-close-btn'),message=button.nextElementSibling,root=document.getElementById('mapa-page');
  let opened=false,restoreFocus=null,rootWasInert=false,previousOverflow='';
  layer.dataset.dsBmcLayer='true';
  if(message&&message.tagName==='DIV')message.dataset.dsBmcMessage='true';
  button.setAttribute('role','button');button.tabIndex=0;
  button.setAttribute('aria-label','Invítame a un café');button.setAttribute('aria-controls','bmc-iframe');button.setAttribute('aria-expanded','false');
  if(close){close.setAttribute('role','button');close.tabIndex=0;close.setAttribute('aria-label','Cerrar café');}
  layer.setAttribute('role','dialog');layer.setAttribute('aria-label','Apoyar DigitalSynapse');
  frame.setAttribute('title','Invítame a un café · DigitalSynapse');frame.tabIndex=0;
  function sync(){
   const expanded=frame.style.transform==='scale(1)';
   button.setAttribute('aria-expanded',String(expanded));layer.dataset.dsOpen=String(expanded);
   if(close)close.style.visibility=expanded?'visible':'hidden';
   layer.setAttribute('aria-hidden',String(!expanded));
   layer.inert=!expanded;
   avoidControls();
   if(expanded===opened)return;
   opened=expanded;
   if(expanded){
    restoreFocus=document.activeElement;rootWasInert=root?.inert||false;
    if(root)root.inert=true;
    previousOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';
    button.tabIndex=-1;layer.setAttribute('aria-modal','true');(close||frame).focus();
   }else{
    if(root)root.inert=rootWasInert;
    document.documentElement.style.overflow=previousOverflow;
    button.tabIndex=0;layer.removeAttribute('aria-modal');
    if(restoreFocus?.isConnected)restoreFocus.focus();
   }
  }
  function keyboard(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();event.currentTarget.click();}}
  button.addEventListener('keydown',keyboard);close?.addEventListener('keydown',keyboard);
  close?.addEventListener('click',()=>button.focus());
  button.addEventListener('click',sync);layer.addEventListener('click',sync);
  // El iframe conserva su navegación interna. Al regresar al documento padre,
  // el foco queda en los controles del diálogo y nunca en el aula de detrás.
  document.addEventListener('focusin',event=>{if(opened&&!layer.contains(event.target))(close||frame).focus();});
  close?.addEventListener('keydown',event=>{if(event.key==='Tab'&&event.shiftKey){event.preventDefault();frame.focus();}});
  new MutationObserver(sync).observe(frame,{attributes:true,attributeFilter:['style']});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){layer.click();button.focus();}});
  // El flotante se oculta temporalmente si coincide con un control del mapa.
  function avoidControls(){
   const r=button.getBoundingClientRect();
   const covered=frame.style.transform!=='scale(1)'&&Array.from(document.querySelectorAll('#mapa-page a,#mapa-page button,#mapa-page input')).some(el=>{
    const t=el.getBoundingClientRect();
    return t.width&&t.height&&r.left<t.right&&r.right>t.left&&r.top<t.bottom&&r.bottom>t.top;
   });
   button.style.visibility=covered?'hidden':'visible';
   if(message)message.style.display=covered?'none':'';
  }
  let scheduled=false;
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;avoidControls()});}
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  document.addEventListener('focusin',schedule);
  sync();avoidControls();
 }
 // Los scripts defer se ejecutan con readyState=interactive antes del evento.
 // Se escucha siempre; ready() también cubre una carga posterior al evento.
 window.addEventListener('DOMContentLoaded',ready,{once:true});
 ready();
})();
