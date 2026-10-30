const L={ok:"Verificado",part:"Parcial",none:"Sin datos"};
let fs=null,fz=null;
const esc=s=>String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
function card(c){
 let r="";
 if(c.web)r+=`<div class="row"><span class="lab">Web</span><span class="val"><a href="${esc(c.web)}" target="_blank" rel="noopener">${esc(c.webl||c.web.replace(/^https?:\/\//,""))}</a></span></div>`;
 if(c.web2)r+=`<div class="row"><span class="lab">Web</span><span class="val"><a href="${esc(c.web2)}" target="_blank" rel="noopener">${esc(c.web2l||c.web2)}</a></span></div>`;
 if(c.email)r+=`<div class="row"><span class="lab">Correo</span><span class="val">${esc(c.email)}</span><button class="cp" data-c="${esc(c.email)}">Copiar</button></div>`;
 if(c.tel)r+=`<div class="row"><span class="lab">Tel.</span><span class="val">${esc(c.tel)}</span></div>`;
 return `<article class="card"><div class="top"><h3>${esc(c.n)}</h3><span class="badge b-${c.s}">${L[c.s]}</span></div>${c.loc?`<div class="loc">${esc(c.loc)}</div>`:""}${r}<p class="note">${esc(c.note)}</p></article>`;
}
function render(){
 const norm=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const q=norm(document.getElementById("q").value.trim());
 const list=C.filter(c=>(!fs||c.s===fs)&&(!fz||c.z.includes(fz))&&(!q||norm([c.n,c.loc,c.note,c.email,c.tel].filter(Boolean).join(" ")).includes(q)));
 document.getElementById("grid").innerHTML=list.map(card).join("")||'<p class="note">Ningún centro coincide.</p>';
 document.getElementById("count").textContent=list.length+" de "+C.length+" centros";
}
function sec(a){return a.map(x=>`<article class="card"><span class="tag">${esc(x.tag)}</span><h3>${esc(x.t)}</h3><p class="note">${esc(x.d)}</p>${(x.l||[]).map(l=>`<div class="row"><a href="${esc(l[1])}" target="_blank" rel="noopener">${esc(l[0])}</a></div>`).join("")}</article>`).join("")}
document.getElementById("pub").innerHTML=sec(PUB);
document.getElementById("priv").innerHTML=sec(PRIV);
const nA=C.filter(c=>c.z.includes("A")).length,nV=C.filter(c=>c.z.includes("V")).length,nOk=C.filter(c=>c.s==="ok").length,nC=C.filter(c=>c.email||c.web2||c.s==="ok").length;
[["s1",C.length],["s2",nA],["s3",nV],["s4",nOk],["hn",C.length],["hv",nC]].forEach(([i,v])=>document.getElementById(i).textContent=v);
document.getElementById("q").addEventListener("input",render);
document.querySelectorAll(".chip").forEach(b=>b.addEventListener("click",()=>{
 if(b.dataset.f){const v=b.dataset.f;fs=fs===v?null:v;}
 if(b.dataset.z){const v=b.dataset.z;fz=fz===v?null:v;}
 document.querySelectorAll(".chip").forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.f?x.dataset.f===fs:x.dataset.z===fz)));render();}));
document.addEventListener("click",async e=>{
 const b=e.target.closest(".cp");if(!b)return;
 const status=document.getElementById("copy-status");
 try{
  await navigator.clipboard.writeText(b.dataset.c);
  b.textContent="Copiado";status.textContent="Correo copiado al portapapeles.";
  setTimeout(()=>{if(b.isConnected)b.textContent="Copiar"},1500);
 }catch(_){status.textContent="No se pudo copiar. Selecciona el correo de la ficha y cópialo manualmente.";}
});
render();
