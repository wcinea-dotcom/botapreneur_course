import fs from 'node:fs';
import path from 'node:path';

const project = process.argv[2];
if (!project) throw new Error('Usage: node integrate_stem_library.mjs /path/to/project');

const familyFile = path.join(project, 'fiche-famille/data/familles.json');
const patternFile = path.join(project, 'plant-patterns/index.html');
const data = JSON.parse(fs.readFileSync(familyFile, 'utf8'));

const images = [
  { key:'ipomoea', family:'Convolvulaceae', scientific:'Ipomoea pes-caprae', file:'convolvulaceae__ipomoea-pes-caprae__dsc-0043.jpg', validation:'nom fourni', patterns:['tige rampante','tige prostrée','tige herbacée','nœuds visibles'], lessons:['stem','herbaceousStem','prostrateStem','creepingStem'] },
  { key:'toxicodendron', family:'Anacardiaceae', scientific:'Toxicodendron radicans', file:'anacardiaceae__toxicodendron-radicans__img-9780.jpg', validation:'nom fourni', patterns:['tige grimpante','tige ligneuse','racines adventives d’accrochage'], lessons:['stem','woodyStem','climbingStem','adventitiousRootStem'] },
  { key:'cassytha', family:'Lauraceae', scientific:'Cassytha filiformis', file:'lauraceae__cassytha-filiformis__img-8893.jpg', validation:'nom fourni', patterns:['tige volubile','tige filiforme','plante parasite'], lessons:['stem','twiningStem'] },
  { key:'bursera', family:'Burseraceae', scientific:'Bursera simaruba', file:'burseraceae__bursera-simaruba__img-5239.jpg', validation:'nom fourni', patterns:['tige ligneuse','port arborescent','écorce exfoliante','lenticelles visibles'], lessons:['stem','woodyStem','erectStem','arborescentStem','stemBark','stemLenticel'] },
  { key:'epipremnum', family:'Araceae', scientific:'Epipremnum pinnatum', file:'araceae__epipremnum-pinnatum__img-2245.jpg', validation:'nom fourni', patterns:['tige grimpante','racines adventives d’accrochage','nœuds visibles'], lessons:['stem','stemNode','climbingStem','adventitiousRootStem'] },
  { key:'palmRinged', family:'Arecaceae', scientific:'Arecaceae sp.', file:'arecaceae__sp__img-3103.jpg', validation:'identification à vérifier', patterns:['stipe','tige dressée','port arborescent','cicatrices foliaires annelées','identification à vérifier'], lessons:['stem','erectStem','arborescentStem','stipe'] },
  { key:'palmHabit', family:'Arecaceae', scientific:'Arecaceae sp.', file:'arecaceae__sp__img-3162.jpg', validation:'identification à vérifier', patterns:['stipe','tige dressée','port arborescent','identification à vérifier'], lessons:['stem','erectStem','arborescentStem','stipe'] },
  { key:'leptocereus', family:'Cactaceae', scientific:'Leptocereus undulosus', file:'cactaceae__leptocereus-undulosus__img-3281-1.jpg', validation:'nom fourni', patterns:['tige succulente','tige photosynthétique','aréoles','épines portées sur la tige'], lessons:['stem','succulentStem','cladode'] },
  { key:'consolea', family:'Cactaceae', scientific:'Consolea moniliformis', file:'cactaceae__consolea-moniliformis__img-5421.jpg', validation:'nom fourni', patterns:['cladode','tige succulente','tige photosynthétique','aréoles','épines portées sur la tige'], lessons:['stem','succulentStem','cladode'] },
  { key:'ceiba', family:'Malvaceae', scientific:'Ceiba pentandra', file:'malvaceae__ceiba-pentandra__img-8238.jpg', validation:'nom fourni', patterns:['tronc armé','aiguillons','tige ligneuse','écorce verte'], lessons:['stem','woodyStem','erectStem','arborescentStem','prickle'] },
  { key:'hura', family:'Euphorbiaceae', scientific:'Hura crepitans', file:'euphorbiaceae__hura-crepitans__img-2103.jpg', validation:'nom fourni', patterns:['tronc armé','aiguillons','tige ligneuse'], lessons:['stem','woodyStem','erectStem','arborescentStem','prickle'] },
  { key:'acer', family:'Sapindaceae', scientific:'Acer griseum', file:'sapindaceae__acer-griseum__img-1749.jpg', validation:'nom fourni', patterns:['écorce exfoliante','tige ligneuse','port arborescent'], lessons:['stem','woodyStem','erectStem','arborescentStem','stemBark'] },
  { key:'eucalyptus', family:'Myrtaceae', scientific:'Eucalyptus deglupta', file:'myrtaceae__eucalyptus-deglupta__img-6902.jpg', validation:'nom fourni', patterns:['écorce lisse','écorce exfoliante','tige ligneuse','port arborescent'], lessons:['stem','woodyStem','erectStem','arborescentStem','stemBark'] },
  { key:'vitis', family:'Vitaceae', scientific:'Vitis rotundifolia', file:'vitaceae__vitis-rotundifolia__img-9015.jpg', validation:'nom fourni', patterns:['tige grimpante','vrille caulinaire','tige ligneuse','sarment'], lessons:['stem','woodyStem','climbingStem','stemTendril'] },
  { key:'momordica', family:'Cucurbitaceae', scientific:'Momordica charantia', file:'cucurbitaceae__momordica-charantia__img-5412.jpg', validation:'nom fourni', patterns:['tige grimpante','vrille caulinaire','tige herbacée','tige pubescente'], lessons:['stem','herbaceousStem','climbingStem','stemTendril','stemPubescent'] },
  { key:'guaiacum', family:'Zygophyllaceae', scientific:'Guaiacum officinale', file:'zygophyllaceae__guaiacum-officinale__img-6549.jpg', validation:'corrigé par William', patterns:['tige ligneuse','tronc ramifié','écorce en plaques','écorce exfoliante'], lessons:['stem','woodyStem','erectStem','arborescentStem','stemBark'] },
];

if (!data.organes.includes('Tige')) data.organes.push('Tige');
for (const family of data.familles) {
  if (family.organes.Tige) family.organes.Tige = family.organes.Tige.filter(p => !String(p.img || '').startsWith('stem-library-v1/'));
}
for (const item of images) {
  let family = data.familles.find(f => f.fam === item.family);
  if (!family) {
    family = { fam:item.family, note:'Famille ajoutée au catalogue des tiges; signature familiale à compléter après validation botanique.', organes:{} };
    data.familles.push(family);
  }
  family.organes.Tige ??= [];
  family.organes.Tige.push({ img:`stem-library-v1/${item.file}`, nom:item.scientific, patterns:item.patterns, validation:item.validation, source:'Photo_tiges_nommees' });
}
fs.writeFileSync(familyFile, JSON.stringify(data,null,1)+'\n');

let html = fs.readFileSync(patternFile,'utf8');
const marker = 'function drawMenu(query=\'\')';
if (!html.includes(marker)) throw new Error('Plant Patterns marker not found');

const mediaRows = images.map(item => ` [stemLibrary.${item.key}]:${JSON.stringify([item.family,item.scientific,...item.patterns,item.validation === 'corrigé par William' ? 'Identification corrigée par William' : item.validation === 'identification à vérifier' ? 'Identification spécifique à vérifier' : 'Nom fourni — photo examinée'])}`).join(',\n');
const libraryRows = images.map(item => ` ${item.key}:stemLibraryBase+'${item.file}'`).join(',\n');
const lessonMap = new Map();
for (const item of images) for (const lesson of item.lessons) {
  if (!lessonMap.has(lesson)) lessonMap.set(lesson, []);
  lessonMap.get(lesson).push(`stemLibrary.${item.key}`);
}
const setRows = [...lessonMap].map(([lesson, refs]) => ` ${lesson}:[${refs.join(',')}]`).join(',\n');

const block = `
/* STEM_LIBRARY_V1_START — generated by scripts/integrate_stem_library.mjs */
Object.assign(L,{
 stipe:ST('Port et croissance','Stipe','Tige arborescente typique de nombreux palmiers, généralement non ramifiée et sans croissance secondaire comparable à celle d’un tronc ligneux de dicotylédone. Une palme est une feuille; le stipe est la tige qui porte la couronne de palmes.','Rechercher un axe dressé, les cicatrices des anciennes feuilles et l’absence habituelle de vraies branches sur le même stipe.')
});
const stemLibraryBase='../fiche-famille/stem-library-v1/';
const stemLibrary={
${libraryRows}
};
const stemPhotoSets={
${setRows}
};
Object.entries(stemPhotoSets).forEach(([id,photos])=>{if(L[id])L[id].p=photos});
Object.assign(mediaTraits,{
${mediaRows}
});
/* STEM_LIBRARY_V1_END */
`;

const start = '/* STEM_LIBRARY_V1_START';
const end = '/* STEM_LIBRARY_V1_END */';
if (html.includes(start)) {
  const before = html.slice(0,html.indexOf(start)).trimEnd();
  const after = html.slice(html.indexOf(end)+end.length).trimStart();
  html = `${before}\n\n${block.trim()}\n\n${after}`;
} else html = html.replace(marker, '\n'+block.trim()+'\n\n'+marker);

const oldRoutes = "<button data-route=\"stemNode\">Anatomie : nœud</button><button data-route=\"climbingStem\">Port : grimpante</button><button data-route=\"stipe\">Type : stipe</button><button data-route=\"rhizome\">Modification : rhizome</button><button data-route=\"stemThorn\">Défense : épine</button><button data-route=\"oppositeBranching\">Architecture : opposée</button>";
const newRoutes = "<button data-route=\"stemNode\">Anatomie : nœud</button><button data-route=\"climbingStem\">Port : grimpante</button><button data-route=\"stipe\">Type : stipe</button><button data-route=\"succulentStem\">Tige : succulente</button><button data-route=\"stemTendril\">Vrille caulinaire</button><button data-route=\"prickle\">Défense : aiguillon</button>";
html = html.replace(oldRoutes, newRoutes);
fs.writeFileSync(patternFile,html);

console.log(JSON.stringify({families:data.familles.length,organs:data.organes,stemPhotos:images.length},null,2));
