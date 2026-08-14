#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const output = path.join(__dirname, "..", "fiche-famille", "data", "formules-florales.json");
const source = {
  label: "Angiosperm Phylogeny Website — descriptions morphologiques familiales",
  url: "https://www.mobot.org/MOBOT/research/APweb/"
};

// [formule simplifiée, position de l'ovaire, précision pédagogique]
const flowering = {
  "Fabaceae": ["↑ ⚥ K(5) C1+2+(2) A(9)+1 G1", "supère", "Type papilionacé fréquent; la symétrie, la corolle et les étamines varient dans la famille."],
  "Melastomataceae": ["✳ ⚥ K4–5 C4–5 A8–10 G(4–5)", "variable, souvent infère", "Étamines souvent très distinctives, à anthères poricides; nombres variables selon les lignées."],
  "Araceae": ["✳ ⚥/♂♀ P0 ou P4–6 A1–6 G(2–3)", "généralement supère", "Fleurs minuscules portées par un spadice; périanthe absent ou tépaloïde selon les groupes."],
  "Euphorbiaceae": ["✳ ♂/♀ K0–5 C0–5 A1–∞ / G(3)", "supère", "Fleurs généralement unisexuées; formule combinée des fleurs mâles et femelles."],
  "Calophyllaceae": ["✳ ⚥ K4–5 C4–5 A∞ G(2–5)", "supère", "Fleurs régulières, souvent riches en étamines libres ou fasciculées."],
  "Asparagaceae": ["✳ ⚥ P3+3 A3+3 G(3)", "supère ou infère", "Formule générale d'un type fréquent; cette famille au sens large est très variable."],
  "Arecaceae": ["✳ ♂/♀ P3+3 A3–6 G(3)", "supère", "Fleurs souvent unisexuées, trimères, regroupées dans une inflorescence protégée par une spathe."],
  "Costaceae": ["↑ ⚥ K(3) C(3) A1 G(3)", "infère", "Une seule étamine fertile; les staminodes forment un grand labelle."],
  "Asphodelaceae": ["✳ ⚥ P3+3 A3+3 G(3)", "supère", "Type monocotylédone trimère fréquent, notamment chez Aloe."],
  "Asteraceae": ["✳/↑ ⚥/♀ Kpappus C(5) A(5) G(2)", "infère", "Formule d'une fleur individuelle du capitule, pas de l'ensemble du capitule."],
  "Verbenaceae": ["↑ ⚥ K(5) C(5) A4 G(2)", "supère", "Corolle souvent bilabiée et quatre étamines didynames; variations selon les genres."],
  "Moringaceae": ["↑ ⚥ K5 C5 A5+5st G(3)", "supère", "Cinq étamines fertiles alternent généralement avec cinq staminodes."],
  "Apocynaceae": ["✳ ⚥ K(5) C(5) A5 G2", "supère à semi-infère", "Corolle gamopétale souvent contortée; deux ovaires peuvent partager une tête stylaire."],
  "Heliconiaceae": ["↑ ⚥ P3+3 A5+1st G(3)", "infère", "Fleur zygomorphe avec cinq étamines fertiles et un staminode."],
  "Boraginaceae": ["✳ ⚥ K(5) C(5) A5 G(2)", "supère", "Ovaire fréquemment profondément divisé en quatre lobes donnant quatre nucules."],
  "Solanaceae": ["✳ ⚥ K(5) C(5) A5 G(2)", "supère", "Fleur pentamère, corolle soudée et étamines épipétales."],
  "Acanthaceae": ["↑ ⚥ K(4–5) C(5) A2–4 G(2)", "supère", "Corolle généralement zygomorphe; deux ou quatre étamines selon les genres."],
  "Amaryllidaceae": ["✳ ⚥ P3+3 A3+3 G(3)", "infère", "Type trimère à ovaire infère; une couronne peut être présente chez certains genres."],
  "Rubiaceae": ["✳ ⚥ K(4–5) C(4–5) A4–5 G(2)", "infère", "Corolle soudée, étamines épipétales et ovaire généralement infère."],
  "Petiveriaceae": ["✳ ⚥ P4–5 A4–∞ G1", "supère", "Périanthe souvent simple; famille variable, formule à confirmer au niveau du genre."],
  "Bignoniaceae": ["↑ ⚥ K(5) C(5) A4+1st G(2)", "supère", "Corolle tubulaire bilabiée et quatre étamines didynames fréquentes."],
  "Plumbaginaceae": ["✳ ⚥ K(5) C(5) A5 G(5)", "supère", "Fleur pentamère; calice souvent scarieux ou glanduleux."],
  "Myrtaceae": ["✳ ⚥ K4–5 C4–5 A∞ G(2–5)", "infère à semi-infère", "Nombreuses étamines très visibles; position de l'ovaire variable."],
  "Cactaceae": ["✳ ⚥ P∞ A∞ G(3–∞)", "infère", "Nombreux tépales et étamines; ovaire infère entouré d'un hypanthium."],
  "Commelinaceae": ["↑ ⚥ K3 C3 A3+3st G(3)", "supère", "Fleur trimère, souvent zygomorphe, avec étamines fertiles et staminodes."],
  "Primulaceae": ["✳ ⚥ K(5) C(5) A5 G(5)", "supère", "Étamines opposées aux lobes de la corolle chez de nombreux représentants."],
  "Combretaceae": ["✳ ⚥/♂ K4–5 C0–5 A8–10 G(2–5)", "infère", "Fleurs souvent petites; pétales parfois absents et ovaire infère."],
  "Plantaginaceae": ["↑/✳ ⚥ K(4–5) C(4–5) A2–4 G(2)", "supère", "Famille très variable; formule d'un type gamopétale fréquent."],
  "Vitaceae": ["✳ ⚥/♂♀ K5 C5 A5 G(2)", "supère", "Petits pétales souvent caducs ensemble en capuchon chez Vitis."],
  "Polygonaceae": ["✳ ⚥/♂♀ P3+3 A6–9 G(3)", "supère", "Périanthe tépaloïde et ovaire uniloculaire typiquement trigone."],
  "Nymphaeaceae": ["✳ ⚥ K4–6 C∞ A∞ G(3–∞)", "variable", "Nombreuses pièces florales souvent disposées en spirale; grande variation familiale."],
  "Piperaceae": ["✳ ⚥/♂♀ P0 A1–10 G(2–5)", "supère", "Fleurs minuscules sans périanthe, groupées en épis denses."],
  "Lamiaceae": ["↑ ⚥ K(5) C(5) A4 ou 2 G(2)", "supère", "Corolle bilabiée et ovaire profondément quadrilobé fréquents."],
  "Pedaliaceae": ["↑ ⚥ K(5) C(5) A4+1st G(2)", "supère", "Corolle bilabiée et quatre étamines didynames fréquentes."],
  "Poaceae": ["↑ ⚥/♂♀ P2lod A3 G(2)", "supère", "Formule d'une fleur individuelle: périanthe réduit à des lodicules, dans un épillet."],
  "Lecythidaceae": ["✳/↑ ⚥ K4–6 C4–6 A∞ G(2–6)", "infère à semi-infère", "Androcée souvent très développé et asymétrique; variations importantes."],
  "Ochnaceae": ["✳ ⚥ K5 C5 A5–∞ G(3–5)", "supère", "Étamines parfois nombreuses ou groupées; gynécée variable."],
  "Bromeliaceae": ["✳ ⚥ K3 C3 A3+3 G(3)", "supère ou infère", "Fleur trimère; position de l'ovaire variable entre sous-familles."],
  "Moraceae": ["✳ ♂/♀ P0–4 A1–4 / G(2)", "variable", "Fleurs minuscules souvent unisexuées et apetales, réunies en inflorescences denses."],
  "Gesneriaceae": ["↑ ⚥ K(5) C(5) A2–4 G(2)", "supère ou infère", "Corolle zygomorphe et gamopétale; ovaire variable selon les lignées."],
  "Alismataceae": ["✳ ⚥/♂♀ K3 C3 A6–∞ G∞", "supère", "Nombreuses étamines et nombreux carpelles libres fréquents."],
  "Sapindaceae": ["✳/↑ ⚥/♂ K4–5 C4–5 A8 G(3)", "supère", "Fleurs souvent fonctionnellement unisexuées, avec disque nectarifère."],
  "Orchidaceae": ["↑ ⚥ P3+3 A1–2 G(3)", "infère", "Un pétale forme le labelle; étamines et style sont réunis en colonne."],
  "Caricaceae": ["✳ ♂/♀ K5 C(5) A10 / G(5)", "supère", "Formule combinée des fleurs mâles et femelles, généralement portées séparément."],
  "Zygophyllaceae": ["✳ ⚥ K5 C5 A10 G(5)", "supère", "Fleur pentamère régulière, souvent dix étamines."],
  "Zingiberaceae": ["↑ ⚥ K(3) C(3) A1 G(3)", "infère", "Une étamine fertile et des staminodes pétaloïdes forment le labelle."],
  "Araliaceae": ["✳ ⚥/♂♀ K5 C5 A5 G(2–5)", "infère", "Petites fleurs régulières souvent réunies en ombelles."],
  "Urticaceae": ["✳ ♂/♀ P4–5 A4–5 / G1", "supère", "Fleurs petites, généralement unisexuées; étamines parfois infléchies dans le bouton."],
  "Rosaceae": ["✳ ⚥ K5 C5 A∞ G1–∞", "variable", "Formule générale seulement: le nombre de carpelles et la position de l'ovaire varient fortement."],
  "Ericaceae": ["✳ ⚥ K(4–5) C(4–5) A8–10 G(4–5)", "supère ou infère", "Corolle souvent urcéolée; anthères fréquemment poricides."],
  "Clusiaceae": ["✳ ⚥/♂♀ K2–6 C4–6 A∞ G(2–∞)", "supère", "Nombreuses étamines, parfois fasciculées; sexualité et nombres variables."],
  "Dilleniaceae": ["✳ ⚥ K5 C5 A∞ G1–∞", "supère", "Nombreuses étamines et carpelles souvent libres."],
  "Nyctaginaceae": ["✳ ⚥ P(5) A1–∞ G1", "supère", "Corolle absente: le périanthe pétaloïde est formé de sépales soudés."],
  "Begoniaceae": ["✳/↑ ♂/♀ P2–5 A∞ / G(2–3)", "infère", "Fleurs unisexuées; formule combinée mâle/femelle, souvent asymétrique."],
  "Musaceae": ["↑ ⚥/♂ P3+3 A5 G(3)", "infère", "Fleur zygomorphe avec cinq étamines fertiles; certaines fleurs sont mâles."],
  "Rutaceae": ["✳ ⚥ K4–5 C4–5 A8–10 ou ∞ G(4–5)", "supère", "Fleurs régulières avec disque nectarifère; nombres variables."],
  "Phyllanthaceae": ["✳ ♂/♀ K3–6 C0 A3–∞ / G(3)", "supère", "Fleurs généralement unisexuées et sans pétales."],
  "Dioscoreaceae": ["✳ ♂/♀ P3+3 A6 / G(3)", "infère", "Fleurs unisexuées, petites et trimères."],
  "Cucurbitaceae": ["✳ ♂/♀ K(5) C(5) A(5) / G(3)", "infère", "Formule combinée des fleurs mâles et femelles; ovaire infère chez la fleur femelle."],
  "Oxalidaceae": ["✳ ⚥ K5 C5 A5+5 G(5)", "supère", "Fleur pentamère avec deux verticilles de cinq étamines."],
  "Anacardiaceae": ["✳ ⚥/♂♀ K5 C5 A5–10 G(3)", "supère", "Petites fleurs souvent unisexuées; un seul carpelle peut être fertile."],
  "Sapotaceae": ["✳ ⚥ K(4–8) C(4–8) A4–8+st G(4–8)", "supère", "Étamine opposée à chaque lobe de corolle, souvent accompagnée de staminodes."],
  "Lauraceae": ["✳ ⚥/♂♀ P3+3 A3+3+3(+3st) G1", "supère", "Tépales en deux verticilles; anthères s'ouvrant par valves."],
  "Ebenaceae": ["✳ ♂/♀ K(3–7) C(3–7) A4–∞ / G(2–8)", "supère", "Fleurs souvent unisexuées, à corolle soudée et persistante."],
  "Actinidiaceae": ["✳ ⚥/♂♀ K5 C5 A∞ G(3–∞)", "supère", "Nombreuses étamines et nombreux carpelles soudés fréquents."],
  "Apiaceae": ["✳ ⚥ K5 C5 A5 G(2)", "infère", "Petites fleurs pentamères en ombelles, avec ovaire infère bicarpellé."],
  "Aquifoliaceae": ["✳ ♂/♀ K4–6 C4–6 A4–6 / G(4–6)", "supère", "Fleurs souvent unisexuées, régulières et petites."],
  "Brassicaceae": ["✳ ⚥ K2+2 C4 A2+4 G(2)", "supère", "Quatre pétales en croix et six étamines tétradynames."],
  "Burseraceae": ["✳ ⚥/♂♀ K3–5 C3–5 A6–10 G(2–5)", "supère", "Fleurs petites avec disque nectarifère; nombres variables."],
  "Capparaceae": ["✳/↑ ⚥ K4 C4 A6–∞ G(2)", "supère", "Nombreuses étamines et gynophore fréquents."],
  "Caprifoliaceae": ["✳/↑ ⚥ K(4–5) C(4–5) A4–5 G(2–5)", "infère", "Corolle souvent zygomorphe; ovaire généralement infère."],
  "Casuarinaceae": ["✳ ♂/♀ P0–2 A1 / G(2)", "infère", "Fleurs fortement réduites, unisexuées, regroupées en épis ou cônes."],
  "Celastraceae": ["✳ ⚥/♂♀ K4–5 C4–5 A4–5 G(2–5)", "supère", "Fleurs petites avec disque nectarifère bien développé."],
  "Chrysobalanaceae": ["✳/↑ ⚥ K5 C5 A5–∞ G1–3", "supère", "Réceptacle souvent creusé et étamines parfois disposées d'un seul côté."],
  "Cornaceae": ["✳ ⚥ K4 C4 A4 G(2)", "infère", "Fleur régulière tétramère à ovaire infère."],
  "Cunoniaceae": ["✳ ⚥ K4–5 C4–5 A8–∞ G(2–5)", "variable", "Fleurs régulières souvent riches en étamines; ovaire variable."],
  "Elaeagnaceae": ["✳ ⚥/♂ P(2–4) A4–8 G1", "supère dans l'hypanthium", "Pétales absents; périanthe sépaloïde souvent pétaloïde."],
  "Elaeocarpaceae": ["✳ ⚥ K4–5 C4–5 A∞ G(2–5)", "supère", "Nombreuses étamines, souvent à anthères poricides ou apiculées."],
  "Fagaceae": ["✳ ♂/♀ P4–7 A4–∞ / G(3)", "infère", "Fleurs unisexuées et réduites; fleur femelle entourée d'une cupule."],
  "Goodeniaceae": ["↑ ⚥ K5 C(5) A5 G(2)", "infère", "Corolle fendue et indusium collecteur de pollen caractéristiques."],
  "Grossulariaceae": ["✳ ⚥ K(4–5) C4–5 A4–5 G(2)", "infère", "Fleur régulière à hypanthium et ovaire infère."],
  "Lythraceae": ["✳ ⚥ K4–6 C4–6 A4–∞ G(2–6)", "supère, dans l'hypanthium", "Fleur périgyne; nombre d'étamines variable."],
  "Malpighiaceae": ["✳/↑ ⚥ K5 C5 A10 G(3)", "supère", "Sépales souvent glanduleux et pétales onguiculés."],
  "Meliaceae": ["✳ ⚥/♂♀ K4–5 C4–5 A(8–10) G(2–5)", "supère", "Filets souvent soudés en tube staminal."],
  "Nyssaceae": ["✳ ⚥/♂♀ K5 C5 A5–10 G(1–2)", "infère", "Fleurs petites, parfois unisexuées; ovaire infère."],
  "Oleaceae": ["✳ ⚥/♂♀ K(4) C(4) A2 G(2)", "supère", "Deux étamines seulement, insérées sur une corolle généralement tétramère."],
  "Pandanaceae": ["✳ ♂/♀ P0 A∞ / G∞", "supère", "Fleurs unisexuées sans périanthe, groupées en inflorescences denses."],
  "Passifloraceae": ["✳ ⚥ K5 C5 A5 G(3)", "supère", "Couronne filamenteuse et androgynophore fréquents chez Passiflora."],
  "Pentaphylacaceae": ["✳ ⚥/♂♀ K5 C5 A5–∞ G(2–5)", "supère", "Formule familiale variable; à préciser au niveau du genre."],
  "Phytolaccaceae": ["✳ ⚥ K4–5 C0 A5–∞ G5–∞", "supère", "Pétales absents; carpelles soudés ou libres selon les genres."],
  "Proteaceae": ["✳/↑ ⚥ P4 A4 G1", "supère", "Quatre tépales portant chacun une étamine; un seul carpelle."],
  "Rhamnaceae": ["✳ ⚥/♂ K4–5 C4–5 A4–5 G(2–4)", "supère à infère", "Étamines opposées aux pétales et disque nectarifère bien développé."],
  "Rhizophoraceae": ["✳ ⚥ K4–5 C4–5 A8–∞ G(2–6)", "infère à semi-infère", "Pétales souvent frangés et ovaire généralement infère."],
  "Salicaceae": ["✳ ♂/♀ P0 A2–∞ / G(2–4)", "supère", "Fleurs unisexuées sans périanthe, souvent réunies en chatons."],
  "Schisandraceae": ["✳ ⚥/♂♀ P5–∞ A5–∞ G∞", "supère", "Nombreuses pièces libres souvent disposées en spirale."],
  "Thymelaeaceae": ["✳ ⚥/♂♀ P(4–5) C0 A4–10 G(2–5)", "supère", "Pétales absents; calice pétaloïde formant un tube."],
  "Viburnaceae": ["✳ ⚥ K(5) C(5) A5 G(3)", "infère", "Corolle soudée et ovaire infère, souvent une seule loge fertile."],
  "Smilacaceae": ["✳ ♂/♀ P3+3 A6 / G(3)", "supère", "Fleurs unisexuées, petites et trimères."
  ]
};

const nonFlowering = {
  "Fougère (Polypodiopsida)": ["Sores et sporanges", "Les fougères ne produisent pas de fleurs; documenter les sores, sporanges et spores."],
  "Zamiaceae": ["Cônes mâles et femelles", "Gymnosperme sans fleur; documenter microsporophylles, mégasporophylles, ovules et graines."],
  "Cycadaceae": ["Cône mâle et mégasporophylles", "Gymnosperme sans fleur; les ovules sont portés par des mégasporophylles."],
  "Cupressaceae": ["Cônes polliniques et ovulifères", "Conifère sans fleur; documenter les écailles des cônes et les graines nues."],
  "Pinaceae": ["Cônes polliniques et ovulifères", "Conifère sans fleur; documenter les écailles ovulifères, ovules et graines ailées."
  ]
};

function token(formula, letter) {
  const match = formula.match(new RegExp(`${letter}[^\\s/]*`));
  return match ? match[0] : "variable";
}

function makeFormula(family, entry) {
  const [formula, ovary, note] = entry;
  const symmetry = formula.startsWith("↑") ? "Zygomorphe ou à symétrie bilatérale" : formula.startsWith("✳/↑") || formula.startsWith("↑/✳") ? "Variable: actinomorphe ou zygomorphe" : "Généralement actinomorphe";
  const sexualityToken = formula.split(" ")[1] || "variable";
  const k = token(formula, "K");
  const p = token(formula, "P");
  const c = token(formula, "C");
  const a = token(formula, "A");
  const g = token(formula, "G");
  const perianth = p !== "variable" ? ["P", "Tépales / périanthe", `Périanthe codé ${p}.`] : [c, "Pétales / corolle", `Corolle codée ${c}.`];
  return {
    formule: formula,
    portee: "Formule simplifiée d’un type fréquent dans la famille; variations possibles selon le genre et l’espèce.",
    explication: note,
    statut: "synthèse pédagogique à valider au niveau du taxon observé",
    parties: [
      {symbole: formula.split(" ")[0], nom: "Symétrie", valeur: symmetry, vue: "Fleur entière strictement de face."},
      {symbole: sexualityToken, nom: "Sexualité", valeur: "⚥ = bisexuée; ♂/♀ = fleurs mâles et femelles séparées; combinaison = état variable.", vue: "Dissection centrale montrant les organes reproducteurs."},
      {symbole: k, nom: "Sépales / calice", valeur: `Calice codé ${k}. Les parenthèses indiquent généralement une soudure.`, vue: "Dessous de la fleur et calice isolé."},
      {symbole: perianth[0], nom: perianth[1], valeur: perianth[2], vue: "Pièces du périanthe isolées et disposées par verticille."},
      {symbole: a, nom: "Étamines / androcée", valeur: `Androcée codé ${a}.`, vue: "Étamines isolées, avec filet et anthère visibles."},
      {symbole: g, nom: "Carpelles / gynécée", valeur: `Gynécée codé ${g}.`, vue: "Pistil isolé et coupe transversale de l’ovaire."},
      {symbole: "G", nom: "Position de l’ovaire", valeur: `Ovaire ${ovary}.`, vue: "Coupe longitudinale montrant l’insertion du périanthe par rapport à l’ovaire."}
    ],
    source
  };
}

function makeNonFlowering([structure, note]) {
  return {
    formule: "NON APPLICABLE — GROUPE SANS FLEURS",
    portee: "Ce taxon ne produit pas de fleurs; on décrit ses structures reproductrices homologues pertinentes.",
    explication: note,
    statut: "non applicable",
    parties: [
      {symbole: "—", nom: "Fleur", valeur: "Absente.", vue: "Port général de l’organe reproducteur."},
      {symbole: "◎", nom: "Structure reproductrice", valeur: structure, vue: "Vue entière puis détail des unités fertiles."},
      {symbole: "n/2n", nom: "Propagules", valeur: "Documenter spores ou graines selon le groupe.", vue: "Macro des spores ou graines avec une échelle."}
    ],
    source: {
      label: "Angiosperm Phylogeny Website — Seed plants and land plants",
      url: "https://www.mobot.org/MOBOT/research/APweb/"
    }
  };
}

const formules = {};
for (const [family, entry] of Object.entries(flowering)) formules[family] = makeFormula(family, entry);
for (const [family, entry] of Object.entries(nonFlowering)) formules[family] = makeNonFlowering(entry);

// Rutaceae : formule familiale distincte de l'état observé chez l'espèce photographiée.
// Les photographies de Murraya paniculata documentent concrètement chaque élément.
formules.Rutaceae = {
  formule: "✳ ⚥ K4–5 C4–5 A8–10(–∞) G(2–5)",
  formuleIllustree: "Murraya paniculata : ✳ ⚥ K5 C5 A10 G(2) — ovaire supère",
  portee: "Formule familiale synthétique : les nombres varient selon les genres. Les photographies montrent l'état observé chez Murraya paniculata.",
  explication: "Fleurs généralement actinomorphes et bisexuées, à 4 ou 5 sépales et pétales libres, avec un disque nectarifère bien développé. L'androcée compte souvent 8 à 10 étamines, parfois davantage; le gynécée syncarpe porte un ovaire supère.",
  statut: "Formule familiale généralisée; identification photographique de Murraya paniculata à confirmer par un spécimen documenté.",
  parties: [
    {symbole: "✳", nom: "Symétrie", valeur: "Actinomorphe : plusieurs plans de symétrie autour du centre.", image: "fleurs/rutaceae/Murraya-paniculata_IMG_7625_vue-frontale.JPG", legende: "Vue frontale montrant la symétrie radiale.", vue: "Fleur entière strictement de face."},
    {symbole: "⚥", nom: "Sexualité", valeur: "Fleur bisexuée : étamines et gynécée réunis dans la même fleur.", image: "fleurs/rutaceae/Murraya-paniculata_IMG_7630_androcee-gynecee.JPG", legende: "Étamines entourant le gynécée central.", vue: "Centre floral avec organes reproducteurs visibles."},
    {symbole: "K4–5", nom: "Sépales / calice", valeur: "Calice à 4 ou 5 petits sépales, libres ou partiellement unis selon le genre.", image: "fleurs/rutaceae/Murraya-paniculata_IMG_7656_vue-laterale-calice.JPG", legende: "Vue latérale de la base florale et du calice.", vue: "Dessous de la fleur et calice isolé."},
    {symbole: "C4–5", nom: "Pétales / corolle", valeur: "Corolle à 4 ou 5 pétales libres; 5 pétales chez l'espèce photographiée.", image: "fleurs/rutaceae/Murraya-paniculata_IMG_7672_petales-libres.JPG", legende: "Pétales séparés montrant une corolle dialypétale.", vue: "Pétales isolés et disposés en verticille."},
    {symbole: "A8–10(–∞)", nom: "Étamines / androcée", valeur: "Souvent 8 à 10 étamines, parfois plus nombreuses; 10 chez Murraya paniculata.", image: "fleurs/rutaceae/Murraya-paniculata_IMG_7683_dissection-florale.JPG", legende: "Dissection montrant les filets et les anthères.", vue: "Étamines isolées avec filet et anthère visibles."},
    {symbole: "G(2–5)", nom: "Carpelles / gynécée", valeur: "Gynécée syncarpe, généralement formé de 2 à 5 carpelles; bicarpellé chez l'espèce illustrée.", image: "fleurs/rutaceae/Murraya-paniculata_IMG_7705_pistil-etamines.JPG", legende: "Pistil central entouré par les étamines.", vue: "Pistil isolé et coupe transversale de l'ovaire."},
    {symbole: "G", nom: "Position de l'ovaire", valeur: "Ovaire supère, associé à un disque nectarifère intrastaminal caractéristique.", image: "fleurs/rutaceae/Murraya-paniculata_IMG_7673_pieces-florales.JPG", legende: "Pièces florales disséquées; la position supère reste à confirmer par une coupe longitudinale.", vue: "Coupe longitudinale montrant l'insertion des pièces florales."}
  ],
  source: {
    label: "Kew Plants of the World Online — Murraya paniculata (Rutaceae)",
    url: "https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A774441-1/general-information"
  }
};

fs.writeFileSync(output, JSON.stringify({
  version: "2026-08-14",
  avertissement: "Formules pédagogiques simplifiées. Toujours vérifier les variations au niveau du genre et de l’espèce avant une identification.",
  formules
}, null, 2) + "\n");

console.log(`Écrit ${Object.keys(formules).length} formules dans ${output}`);
