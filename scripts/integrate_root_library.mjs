import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.argv[2] || process.cwd();
const familiesPath = path.join(projectRoot, 'fiche-famille/data/familles.json');
const patternsPath = path.join(projectRoot, 'plant-patterns/index.html');

const images = [
  {
    key: 'parthenocissus',
    file: 'vitaceae__parthenocissus-quinquefolia__img-9781.jpg',
    family: 'Vitaceae',
    scientific: 'Parthenocissus quinquefolia',
    name: 'Parthenocissus quinquefolia — racines crampons',
    patterns: ['racine adventive', 'racine aérienne', 'racine crampon', 'tige grimpante', 'accrochage mécanique'],
    lessons: ['root', 'adventitiousRoot', 'aerialRoot', 'climbingRoot'],
    validation: 'PlantNet fort — à confirmer'
  },
  {
    key: 'ficus',
    file: 'moraceae__ficus-aurea__img-1097.jpg',
    family: 'Moraceae',
    scientific: 'Ficus aurea',
    name: 'Ficus aurea — racines aériennes',
    patterns: ['racine adventive', 'racine aérienne', 'racine de soutien', 'racine échasse', 'racine ligneuse'],
    lessons: ['root', 'adventitiousRoot', 'aerialRoot', 'propRoot', 'buttressRoot'],
    validation: 'PlantNet faible — espèce à confirmer'
  },
  {
    key: 'epipremnum',
    file: 'araceae__epipremnum-pinnatum__img-2250.jpg',
    family: 'Araceae',
    scientific: 'Epipremnum pinnatum',
    name: 'Epipremnum pinnatum — racines d’accrochage',
    patterns: ['racine adventive', 'racine aérienne', 'racine crampon', 'plante grimpante', 'Araceae'],
    lessons: ['root', 'adventitiousRoot', 'aerialRoot', 'climbingRoot'],
    validation: 'PlantNet fort — à confirmer'
  },
  {
    key: 'rhizophora',
    file: 'rhizophoraceae__rhizophora-mangle__dsc-0577.jpg',
    family: 'Rhizophoraceae',
    scientific: 'Rhizophora mangle',
    name: 'Rhizophora mangle — racines échasses',
    patterns: ['racine échasse', 'racine de soutien', 'racine aérienne', 'mangrove', 'sol inondé'],
    lessons: ['root', 'aerialRoot', 'propRoot', 'floodRoots'],
    validation: 'PlantNet fort — à confirmer'
  },
  {
    key: 'taxodium',
    file: 'cupressaceae__taxodium-distichum__img-7832.jpg',
    family: 'Cupressaceae',
    scientific: 'Taxodium distichum',
    name: 'Taxodium distichum — pneumatophores',
    patterns: ['pneumatophore', 'racine respiratoire', 'sol humide', 'racine spécialisée', 'échanges gazeux'],
    lessons: ['root', 'pneumatophore', 'floodRoots', 'aquaticRoot'],
    validation: 'PlantNet fort — à confirmer'
  },
  {
    key: 'raphanus',
    file: 'brassicaceae__raphanus-sativus__img-3197.jpg',
    family: 'Brassicaceae',
    scientific: 'Raphanus sativus',
    name: 'Raphanus sativus — racine napiforme',
    patterns: ['racine pivotante', 'racine de réserve', 'racine charnue', 'racine napiforme', 'racine épaissie'],
    lessons: ['root', 'taproot', 'storageRoot', 'fleshyRoot', 'napiformRoot', 'thickenedRoot'],
    validation: 'corrigé morphologiquement — nom cultivé à confirmer'
  },
  {
    key: 'daucus',
    file: 'apiaceae__daucus-carota__img-3199.jpg',
    family: 'Apiaceae',
    scientific: 'Daucus carota',
    name: 'Daucus carota — racine conique',
    patterns: ['racine pivotante', 'racine de réserve', 'racine charnue', 'racine conique', 'racine épaissie'],
    lessons: ['root', 'taproot', 'storageRoot', 'fleshyRoot', 'conicalRoot', 'thickenedRoot'],
    validation: 'PlantNet fort — à confirmer'
  },
  {
    key: 'ipomoea',
    file: 'convolvulaceae__ipomoea-batatas__img-7928.jpg',
    family: 'Convolvulaceae',
    scientific: 'Ipomoea batatas',
    name: 'Ipomoea batatas — racines tubéreuses',
    patterns: ['racine tubéreuse', 'racine de réserve', 'racine charnue', 'racine épaissie', 'multiplication végétative'],
    lessons: ['root', 'storageRoot', 'tuberousRoot', 'fleshyRoot', 'thickenedRoot'],
    validation: 'PlantNet moyen — à confirmer'
  },
  {
    key: 'poaceae',
    file: 'poaceae__sp__img-4702.jpg',
    family: 'Poaceae',
    scientific: 'Poaceae sp.',
    name: 'Poaceae sp. — système fasciculé',
    patterns: ['système fasciculé', 'racines fibreuses', 'racines adventives', 'monocotylédone', 'jeune plantule'],
    lessons: ['root', 'rootSystem', 'fibrousRoot', 'adventitiousRoot', 'filiformRoot'],
    validation: 'famille probable — espèce à confirmer'
  },
  {
    key: 'crotalaria',
    file: 'fabaceae__crotalaria-sp__img-6667.jpg',
    family: 'Fabaceae',
    scientific: 'Crotalaria sp.',
    name: 'Crotalaria sp. — nodosités racinaires',
    patterns: ['nodosité racinaire', 'symbiose racinaire', 'Fabaceae', 'fixation de l’azote à confirmer', 'racine latérale'],
    lessons: ['root', 'rootNodule', 'rootSymbiosis', 'lateralRoot'],
    validation: 'PlantNet faible — genre à confirmer'
  }
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

const data = readJson(familiesPath);
if (!data.organes.includes('Racine')) data.organes.push('Racine');

const byFamily = new Map(data.familles.map(f => [f.fam, f]));
const clearedFamilies = new Set();
for (const item of images) {
  if (!byFamily.has(item.family)) {
    const created = {
      fam: item.family,
      note: 'Famille ajoutée automatiquement pour les patterns de racines; description à compléter.',
      organes: Object.fromEntries(data.organes.map(o => [o, []]))
    };
    data.familles.push(created);
    byFamily.set(item.family, created);
  }
  const family = byFamily.get(item.family);
  if (!family.organes) family.organes = {};
  for (const organ of data.organes) if (!family.organes[organ]) family.organes[organ] = [];
  if (!clearedFamilies.has(item.family)) {
    family.organes.Racine = family.organes.Racine.filter(photo => !String(photo.img || '').includes('root-library-v1/'));
    clearedFamilies.add(item.family);
  }
}

for (const item of images) {
  const family = byFamily.get(item.family);
  family.organes.Racine.push({
    img: `root-library-v1/${item.file}`,
    nom: item.name,
    patterns: [...item.patterns, item.scientific],
    validation: item.validation,
    source: 'Photos_Racines'
  });
}
writeJson(familiesPath, data);

let html = fs.readFileSync(patternsPath, 'utf8');
const base = "const rootLibraryBase='../fiche-famille/root-library-v1/';";
const libraryRows = images.map(item => ` ${item.key}:rootLibraryBase+'${item.file}'`).join(',\n');
const lessonMap = new Map();
for (const item of images) {
  for (const lesson of item.lessons) {
    if (!lessonMap.has(lesson)) lessonMap.set(lesson, []);
    lessonMap.get(lesson).push(`rootLibrary.${item.key}`);
  }
}
const setRows = [...lessonMap.entries()].map(([lesson, refs]) => ` ${lesson}:[${refs.join(',')}]`).join(',\n');
const traitRows = images.map(item => ` [rootLibrary.${item.key}]:${JSON.stringify([item.family, item.scientific, ...item.patterns, item.validation])}`).join(',\n');
const block = `/* ROOT_LIBRARY_V1_START — generated by scripts/integrate_root_library.mjs */\n${base}\nconst rootLibrary={\n${libraryRows}\n};\nconst rootPhotoSets={\n${setRows}\n};\nObject.entries(rootPhotoSets).forEach(([id,photos])=>{if(L[id])L[id].p=photos});\nObject.assign(mediaTraits,{\n${traitRows}\n});\n/* ROOT_LIBRARY_V1_END */`;

if (html.includes('/* ROOT_LIBRARY_V1_START')) {
  html = html.replace(/\/\* ROOT_LIBRARY_V1_START[\s\S]*?ROOT_LIBRARY_V1_END \*\//, block);
} else {
  html = html.replace('/* STEM_LIBRARY_V1_START', `${block}\n/* STEM_LIBRARY_V1_START`);
}

html = html.replace(
  "viewOrgan==='Racine'?'<button data-route=\"taproot\">Système : pivotant</button><button data-route=\"fibrousRoot\">Système : fasciculé</button><button data-route=\"aerialRoot\">Type : aérienne</button><button data-route=\"storageRoot\">Fonction : réserve</button><button data-route=\"mycorrhiza\">Symbiose : mycorhize</button>'",
  "viewOrgan==='Racine'?'<button data-route=\"taproot\">Système : pivotant</button><button data-route=\"fibrousRoot\">Système : fasciculé</button><button data-route=\"aerialRoot\">Type : aérienne</button><button data-route=\"propRoot\">Soutien : échasse</button><button data-route=\"pneumatophore\">Respiration : pneumatophore</button><button data-route=\"storageRoot\">Fonction : réserve</button><button data-route=\"rootNodule\">Symbiose : nodosité</button>'"
);

fs.writeFileSync(patternsPath, html);

console.log(`Root library integrated: ${images.length} photos`);
