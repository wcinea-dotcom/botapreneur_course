/* ==========================================================================
   Botapreneurs — Patterns des feuilles
   Application vanilla (Explorateur + Leçons + Modale zoom).
   Données chargées depuis /data (fetch) — ne rien coder en dur.
   ========================================================================== */

/* Données (remplies par init() après fetch) */
let DATA = [];            // data/patterns.json  (115 plantes)
let DEFS = {};            // lessons.definitions
let DIMS = [];            // lessons.dimensions
let FAMNOTE = {};         // lessons.familles_notes
const GENFAM = "Les caractères foliaires d'une famille sont des tendances documentaires à comparer — jamais une règle absolue. Confirmer avec fleurs et fruits.";

/* ---------- EXPLORATEUR ---------- */
const GROUPS=[["fam","Famille"],["type","Type de feuille"],["comp","Composition"],["part","Particularité"],["nerv","Nervation"],["phyllo","Phyllotaxie"],["forme","Forme du limbe"],["marge","Marge"],["uses","Usage"]];
const sel={}; let Q=""; GROUPS.forEach(g=>sel[g[0]]=new Set());
function vals(k){const m={};DATA.forEach(d=>{let vs=d[k];if(!Array.isArray(vs))vs=[vs];vs.forEach(v=>{if(v)m[v]=(m[v]||0)+1})});return Object.entries(m).sort((a,b)=>b[1]-a[1])}
function buildFacets(){let h="";GROUPS.forEach(([k,label])=>{const vs=vals(k);h+=`<div class="grp" data-k="${k}"><h3>${label}<span class="gc">${vs.length}</span></h3><div class="chips">`;vs.forEach(([v,c])=>{h+=`<span class="chip" data-g="${k}" data-v="${v}">${v}<span class="c">${c}</span></span>`});h+="</div></div>"});
 const a=document.getElementById("facets");a.innerHTML=h;
 a.querySelectorAll(".grp h3").forEach(hh=>hh.onclick=()=>hh.parentElement.classList.toggle("open"));
 a.querySelectorAll(".chip").forEach(ch=>ch.onclick=(e)=>{e.stopPropagation();const g=ch.dataset.g,v=ch.dataset.v;sel[g].has(v)?sel[g].delete(v):sel[g].add(v);renderExpl()})}
function match(d){return GROUPS.every(([k])=>{if(sel[k].size===0)return true;let vs=d[k];if(!Array.isArray(vs))vs=[vs];return [...sel[k]].some(v=>vs.includes(v))})}
function renderExpl(){document.querySelectorAll("#facets .chip").forEach(ch=>ch.classList.toggle("on",sel[ch.dataset.g].has(ch.dataset.v)));
 document.querySelectorAll(".grp").forEach(g=>{if(sel[g.dataset.k]&&sel[g.dataset.k].size>0)g.classList.add("open")});
 const list=DATA.filter(d=>match(d)&&(!Q||[d.nom,d.fam,d.notion,d.forme,d.part,d.type,d.comp,d.nerv,d.marge,d.phyllo].join(" ").toLowerCase().includes(Q)));
 document.getElementById("n").textContent=list.length;
 document.getElementById("grid").innerHTML=list.map(d=>card(d)).join("")}
function card(d){const i=DATA.indexOf(d);return `<div class="card" onclick="openM(${i})"><div class="im"><img loading="lazy" src="${d.img}"></div><div class="bd"><div class="fe">${d.fe}</div><div class="nm">${d.nom}</div><div><span class="tag">${d.type}</span><span class="tag nv">${d.nerv}</span>${d.part?`<span class="tag">${d.part}</span>`:""}</div></div></div>`}
function resetF(){GROUPS.forEach(([k])=>sel[k].clear());Q="";document.getElementById("q").value="";renderExpl()}

/* ---------- LEÇONS ---------- */
function lvals(k){const m={};DATA.forEach(d=>{const v=d[k];if(v)m[v]=(m[v]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1])}
function drawLessons(query=""){const q=query.trim().toLowerCase();let h="";
 DIMS.forEach(([k,label])=>{let items=lvals(k).filter(([v])=>!q||(`${v} ${label}`.toLowerCase().includes(q)));
  if(items.length)h+=`<div class="lgrp"><b>${label}</b>${items.map(([v,c])=>`<button data-k="${k}" data-v="${v}"><span>${v}</span><i>${c}</i></button>`).join("")}</div>`});
 const mnu=document.getElementById("lmenu");mnu.innerHTML=h||'<div style="padding:20px;color:#889">Aucune leçon.</div>';
 mnu.querySelectorAll("button").forEach(b=>b.onclick=()=>showLesson(b.dataset.k,b.dataset.v))}
function showLesson(k,v){
 document.querySelectorAll("#lmenu button").forEach(b=>b.classList.toggle("on",b.dataset.k===k&&b.dataset.v===v));
 const isFam=(k==="fam");const list=DATA.filter(d=>d[k]===v);
 const def=DEFS[v]?DEFS[v][0]:(isFam?(FAMNOTE[v]||GENFAM):"Pattern documenté à partir des exemples ci-dessous.");
 const how=DEFS[v]?DEFS[v][1]:"Comparer plusieurs exemples pour distinguer ce qui reste constant malgré la diversité des plantes.";
 const dimLabel=(DIMS.find(d=>d[0]===k)||[,""])[1];
 const fam=isFam?`<div class="fban"><div><strong>${v}</strong><p><b>PATTERNS FAMILIAUX</b> — ${FAMNOTE[v]||GENFAM}</p></div></div>`:"";
 document.getElementById("lesson").innerHTML=
  `<div class="crumb">${isFam?"FAMILLE BOTANIQUE":dimLabel.toUpperCase()}</div>
   <div class="lhead"><h2>${v}</h2><p class="def">${def}</p>
   <div class="how"><b>CE QU'IL FAUT REGARDER</b><br>${how}</div></div>${fam}
   <div class="lcount"><b>${list.length}</b> exemple(s) à comparer · clique pour agrandir</div>
   <div class="grid">${list.map(d=>card(d)).join("")}</div>
   <p style="color:#7a8590;font-size:11px;margin-top:16px">Une même photo peut documenter plusieurs caractères. « À confirmer » ≠ « absent ».</p>`}

/* ---------- MODALE ZOOM ---------- */
let zoom=1,px=0,py=0,drag=false,sx=0,sy=0;
function applyZoom(){mImg.style.transform=`translate(${px}px,${py}px) scale(${zoom})`;document.getElementById("zlv").textContent=Math.round(zoom*100)+"%";zoomArea.classList.toggle("dragging",drag)}
function setZoom(z){zoom=Math.max(1,Math.min(6,z));if(zoom===1){px=0;py=0}applyZoom()}
function resetZoom(){zoom=1;px=0;py=0;drag=false;applyZoom()}
function openM(i){const d=DATA[i];mImg.src=d.img;document.getElementById("mFe").textContent=d.fe;document.getElementById("mTitle").textContent=d.nom;resetZoom();
 document.getElementById("mGrid").innerHTML=
  `<p><b>FAMILLE</b>${d.fam}</p><p><b>TYPE</b>${d.type}</p><p><b>COMPOSITION</b>${d.comp||"—"}</p>
   <p><b>FORME</b>${d.forme}</p><p><b>MARGE</b>${d.marge}</p><p><b>NERVATION</b>${d.nerv}</p>
   <p><b>PHYLLOTAXIE</b>${d.phyllo||"—"}</p><p><b>PARTICULARITÉ</b>${d.part||"—"}</p><p><b>NOTION</b>${d.notion}</p>`;
 modal.classList.add("open")}
function closeM(){modal.classList.remove("open");resetZoom()}

/* ---------- TABS ---------- */
function switchTab(t){const e=t==="expl";document.getElementById("viewExpl").classList.toggle("hide",!e);document.getElementById("viewLec").classList.toggle("hide",e);
 document.getElementById("tabExpl").classList.toggle("on",e);document.getElementById("tabLec").classList.toggle("on",!e)}

/* ---------- INIT (chargement des données) ---------- */
async function init(){
 try{
  const [pd,ls]=await Promise.all([
   fetch("data/patterns.json").then(r=>{if(!r.ok)throw new Error("patterns.json "+r.status);return r.json()}),
   fetch("data/lessons.json").then(r=>{if(!r.ok)throw new Error("lessons.json "+r.status);return r.json()})
  ]);
  DATA=pd; DEFS=ls.definitions||{}; DIMS=ls.dimensions||[]; FAMNOTE=ls.familles_notes||{};

  // Écouteurs de la modale (les éléments existent maintenant)
  zoomArea.onwheel=e=>{e.preventDefault();setZoom(zoom+(e.deltaY<0?.35:-.35))};
  zoomArea.ondblclick=()=>setZoom(zoom===1?2.5:1);
  zoomArea.onpointerdown=e=>{if(zoom<=1)return;drag=true;sx=e.clientX-px;sy=e.clientY-py;zoomArea.setPointerCapture(e.pointerId);applyZoom()};
  zoomArea.onpointermove=e=>{if(!drag)return;px=e.clientX-sx;py=e.clientY-sy;applyZoom()};
  zoomArea.onpointerup=zoomArea.onpointercancel=()=>{drag=false;applyZoom()};
  modal.onclick=e=>{if(e.target===modal)closeM()};
  document.onkeydown=e=>{if(e.key==="Escape")closeM()};

  // Rendu initial
  buildFacets();renderExpl();document.getElementById("tot").textContent=DATA.length;
  drawLessons();showLesson("phyllo","Opposée");
 }catch(err){
  console.error(err);
  document.getElementById("grid").innerHTML=`<p style="color:#b00">Erreur de chargement des données : ${err.message}. Ouvre l'app via un serveur (pas file://).</p>`;
 }
}
init();
