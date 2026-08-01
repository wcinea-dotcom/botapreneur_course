/* ==========================================================================
   Botapreneurs — Patterns des fleurs
   Application vanilla (Explorateur + Leçons + Modale zoom).
   Jumeau de « Patterns des feuilles ». Données chargées depuis /data (fetch).
   ========================================================================== */

let DATA = [];            // data/fleurs_data.json
let DEFS = {};            // lessons.definitions
let DIMS = [];            // lessons.dimensions
let FAMNOTE = {};         // lessons.familles_notes
const GENFAM = "Les caractères floraux d'une famille sont des tendances documentaires à comparer — jamais une règle absolue. Confirmer avec fruits et graines.";

/* ---------- EXPLORATEUR : dimensions filtrables (les 20 + Famille + Usage) ---------- */
const GROUPS=[
 ["fam","Famille"],["sym","Symétrie"],["sexe","Sexualité"],["perianthe","Périanthe"],
 ["mero","Mérosité"],["calice","Calice"],["corolle","Corolle"],["forme","Forme corolle"],
 ["androcee","Androcée"],["etam_nb","Étamines (nb)"],["anthere","Anthère"],["ovaire","Ovaire"],
 ["carpelle","Carpelles"],["placenta","Placentation"],["bractee","Bractées"],["inflo","Inflorescence"],
 ["prefl","Préfloraison"],["loges","Loges"],["couleur","Couleur"],["nectaire","Nectaire"],
 ["part","Particularité"],["uses","Usage"]
];
const sel={}; let Q=""; GROUPS.forEach(g=>sel[g[0]]=new Set());
function vals(k){const m={};DATA.forEach(d=>{let vs=d[k];if(!Array.isArray(vs))vs=[vs];vs.forEach(v=>{if(v)m[v]=(m[v]||0)+1})});return Object.entries(m).sort((a,b)=>b[1]-a[1])}
function buildFacets(){let h="";GROUPS.forEach(([k,label])=>{const vs=vals(k);if(!vs.length)return;h+=`<div class="grp" data-k="${k}"><h3>${label}<span class="gc">${vs.length}</span></h3><div class="chips">`;vs.forEach(([v,c])=>{h+=`<span class="chip" data-g="${k}" data-v="${v}">${v}<span class="c">${c}</span></span>`});h+="</div></div>"});
 const a=document.getElementById("facets");a.innerHTML=h;
 a.querySelectorAll(".grp h3").forEach(hh=>hh.onclick=()=>hh.parentElement.classList.toggle("open"));
 a.querySelectorAll(".chip").forEach(ch=>ch.onclick=(e)=>{e.stopPropagation();const g=ch.dataset.g,v=ch.dataset.v;sel[g].has(v)?sel[g].delete(v):sel[g].add(v);renderExpl()})}
function match(d){return GROUPS.every(([k])=>{if(sel[k].size===0)return true;let vs=d[k];if(!Array.isArray(vs))vs=[vs];return [...sel[k]].some(v=>vs.includes(v))})}
function renderExpl(){document.querySelectorAll("#facets .chip").forEach(ch=>ch.classList.toggle("on",sel[ch.dataset.g].has(ch.dataset.v)));
 document.querySelectorAll(".grp").forEach(g=>{if(sel[g.dataset.k]&&sel[g.dataset.k].size>0)g.classList.add("open")});
 const list=DATA.filter(d=>match(d)&&(!Q||[d.nom,d.fam,d.notion,d.sym,d.corolle,d.forme,d.part,d.couleur,d.inflo,d.src].join(" ").toLowerCase().includes(Q)));
 document.getElementById("n").textContent=list.length;
 document.getElementById("grid").innerHTML=list.map(d=>card(d)).join("")}
function card(d){const i=DATA.indexOf(d);const t2=d.corolle||d.perianthe||"";return `<div class="card" onclick="openM(${i})"><div class="im"><img loading="lazy" src="${d.img}"></div><div class="bd"><div class="fe">${d.fl}</div><div class="nm">${d.nom}</div><div><span class="tag">${d.sym||"—"}</span>${t2?`<span class="tag nv">${t2}</span>`:""}${d.couleur?`<span class="tag">${d.couleur}</span>`:""}</div></div></div>`}
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
 const how=DEFS[v]?DEFS[v][1]:"Comparer plusieurs exemples pour distinguer ce qui reste constant malgré la diversité des fleurs.";
 const dimLabel=(DIMS.find(d=>d[0]===k)||[,""])[1];
 const fam=isFam?`<div class="fban"><div><strong>${v}</strong><p><b>PATTERNS FAMILIAUX</b> — ${FAMNOTE[v]||GENFAM}</p></div></div>`:"";
 document.getElementById("lesson").innerHTML=
  `<div class="crumb">${isFam?"FAMILLE BOTANIQUE":dimLabel.toUpperCase()}</div>
   <div class="lhead"><h2>${v}</h2><p class="def">${def}</p>
   <div class="how"><b>CE QU'IL FAUT REGARDER</b><br>${how}</div></div>${fam}
   <div class="lcount"><b>${list.length}</b> exemple(s) à comparer · clique pour agrandir</div>
   <div class="grid">${list.map(d=>card(d)).join("")}</div>
   <p style="color:#7a8590;font-size:11px;margin-top:16px">Une même fleur peut documenter plusieurs caractères. « À confirmer » ≠ « absent ».</p>`}

/* ---------- MODALE ZOOM ---------- */
let zoom=1,px=0,py=0,drag=false,sx=0,sy=0;
function applyZoom(){mImg.style.transform=`translate(${px}px,${py}px) scale(${zoom})`;document.getElementById("zlv").textContent=Math.round(zoom*100)+"%";zoomArea.classList.toggle("dragging",drag)}
function setZoom(z){zoom=Math.max(1,Math.min(6,z));if(zoom===1){px=0;py=0}applyZoom()}
function resetZoom(){zoom=1;px=0;py=0;drag=false;applyZoom()}
function row(lab,val){return `<p><b>${lab}</b>${val||"—"}</p>`}
function openM(i){const d=DATA[i];mImg.src=d.img;document.getElementById("mFe").textContent=d.fl;document.getElementById("mTitle").textContent=d.nom;resetZoom();
 document.getElementById("mGrid").innerHTML=
  row("FAMILLE",d.fam)+row("SYMÉTRIE",d.sym)+row("SEXUALITÉ",d.sexe)+row("PÉRIANTHE",d.perianthe)+
  row("MÉROSITÉ",d.mero)+row("CALICE",d.calice)+row("COROLLE",d.corolle)+row("FORME COROLLE",d.forme)+
  row("ANDROCÉE",d.androcee)+row("ÉTAMINES (NB)",d.etam_nb)+row("ANTHÈRE",d.anthere)+row("OVAIRE",d.ovaire)+
  row("CARPELLES",d.carpelle)+row("PLACENTATION",d.placenta)+row("BRACTÉES",d.bractee)+row("INFLORESCENCE",d.inflo)+
  row("PRÉFLORAISON",d.prefl)+row("LOGES",d.loges)+row("COULEUR",d.couleur)+row("NECTAIRE",d.nectaire)+
  row("PARTICULARITÉ",d.part)+row("NOTION",d.notion)+(d.src?row("PHOTO SOURCE",d.src):"");
 modal.classList.add("open")}
function closeM(){modal.classList.remove("open");resetZoom()}

/* ---------- TABS ---------- */
function switchTab(t){const e=t==="expl";document.getElementById("viewExpl").classList.toggle("hide",!e);document.getElementById("viewLec").classList.toggle("hide",e);
 document.getElementById("tabExpl").classList.toggle("on",e);document.getElementById("tabLec").classList.toggle("on",!e)}

/* ---------- INIT ---------- */
async function init(){
 try{
  const [pd,ls]=await Promise.all([
   fetch("data/fleurs_data.json").then(r=>{if(!r.ok)throw new Error("fleurs_data.json "+r.status);return r.json()}),
   fetch("data/fleurs_lessons.json").then(r=>{if(!r.ok)throw new Error("fleurs_lessons.json "+r.status);return r.json()})
  ]);
  DATA=pd; DEFS=ls.definitions||{}; DIMS=ls.dimensions||[]; FAMNOTE=ls.familles_notes||{};
  zoomArea.onwheel=e=>{e.preventDefault();setZoom(zoom+(e.deltaY<0?.35:-.35))};
  zoomArea.ondblclick=()=>setZoom(zoom===1?2.5:1);
  zoomArea.onpointerdown=e=>{if(zoom<=1)return;drag=true;sx=e.clientX-px;sy=e.clientY-py;zoomArea.setPointerCapture(e.pointerId);applyZoom()};
  zoomArea.onpointermove=e=>{if(!drag)return;px=e.clientX-sx;py=e.clientY-sy;applyZoom()};
  zoomArea.onpointerup=zoomArea.onpointercancel=()=>{drag=false;applyZoom()};
  modal.onclick=e=>{if(e.target===modal)closeM()};
  document.onkeydown=e=>{if(e.key==="Escape")closeM()};
  buildFacets();renderExpl();document.getElementById("tot").textContent=DATA.length;
  drawLessons();
  // Leçon d'accueil : premier vrai pattern (on évite d'ouvrir sur « À confirmer »)
  outer: for(const [k] of DIMS){for(const [v] of lvals(k)){if(!/^À confirmer/i.test(v)){showLesson(k,v);break outer}}}
 }catch(err){
  console.error(err);
  document.getElementById("grid").innerHTML=`<p style="color:#b00">Erreur de chargement : ${err.message}. Ouvre l'app via un serveur (pas file://).</p>`;
 }
}
init();
