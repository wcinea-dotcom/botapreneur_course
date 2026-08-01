# Passation → Claude Code
## Application « Patterns des feuilles » — Botapreneurs

Ce document décrit **tout ce qui a été fait**, **où sont les données**, et **ce qui reste à faire** pour transformer le prototype en application fonctionnelle. Destiné à être ouvert dans Claude Code (CLI) pour continuer le développement.

---

## 1. Le projet en une phrase

Une application web **pédagogique et de référence** sur les *patterns* (caractères) des feuilles : l'utilisateur peut **explorer** une collection de plantes en filtrant par caractère (famille, nervation, phyllotaxie, marge, particularité…) et **apprendre** pattern par pattern (définition + « ce qu'il faut regarder » + galerie d'exemples).

- **Marque :** Botapreneurs (public « Plant Enthusiasts »). Volet éducatif rattachable à **PlantsMastery** (marque formation).
- **Langue :** français (structure prête pour FR/EN/ES).
- **Public :** amateurs de plantes, formation, création de contenu botanique.

---

## 2. État actuel (prototype livré)

Un **fichier HTML autonome** fonctionnel, à deux onglets :

- **Explorateur** — 115 plantes, 30 familles nommées. Menu de filtres repliable (Famille, Type, Composition, Particularité, Nervation, Phyllotaxie, Forme, Marge, Usage) + barre de recherche plein-texte. Grille de cartes. Clic → modale avec **zoom/déplacement**.
- **Leçons** — menu vertical groupé par dimension. Pour chaque valeur de pattern : **définition**, encadré **« Ce qu'il faut regarder »**, et **galerie de tous les exemples** correspondants (générée automatiquement depuis les données).

Caractéristiques techniques du prototype :
- 100 % statique, **une seule page HTML**, aucune dépendance (JS/CSS inline).
- Images **encodées en base64** dans le HTML (≈ 5 Mo). ⚠️ À externaliser (voir §6).
- Palette Botapreneurs : Deep Blue `#003366`, Botanical Green `#2E7D32`, Lime `#8BC34A`, Action Orange `#F47C20` (CTA only), Beige `#F8F8F4`. Polices **Poppins** (titres) + **Lato** (corps).
- Rigueur botanique : une valeur non vérifiée reste **« à confirmer »**, jamais supposée.

---

## 3. Où sont les données (chemins exacts)

Tout est dans Google Drive : `My Drive/2026/30_MARKETING/39_Contenu/Plants passionnate/Selection_Feuilles/`

| Élément | Emplacement |
|---|---|
| **App actuelle (prototype)** | `Selection_Feuilles/Explorateur_et_Lecons_Feuilles.html` |
| Ancienne version (Explorateur seul) | `Selection_Feuilles/Explorateur_Patterns_Feuilles.html` |
| **Données structurées (léger, sans images)** | `patterns_data_light.json` — livré avec ce dossier |
| **Données complètes (avec images base64)** | `patterns_data_full.json` — livré avec ce dossier |
| **Contenu des leçons (définitions)** | `patterns_lessons.json` — livré avec ce dossier |
| Fiche de révision botanique (73→ maj) | `Selection_Feuilles/Explorateur_Revision_88.xlsx` |
| **Photos sources — sélection curée** | Dossier local `CINEA/plant-patterns_project/Photos-feuille/1.Patterns/` (~110 fichiers IMG_*.JPG + IMG_0109.DNG + gragrat3.heic) |
| Photos — 250 feuilles sélectionnées | `Selection_Feuilles/photos/` (Drive) |
| Réf. ChatGPT (leçons visuelles) | Local `Downloads/public 2/Plant_Patterns_Lecons_Visuelles.html` + `leaf-library/library.json` + `leaf-library/fe-01..34.jpg` |

Note : les 34 premières entrées (`fe-01`…`fe-34`) proviennent de la banque `leaf-library` de la version ChatGPT ; les suivantes proviennent du dossier `1.Patterns`.

---

## 4. Schéma des données

`patterns_data_*.json` = tableau d'objets. Un objet = une plante/photo :

```json
{
  "fe": "FE-01",                         // identifiant stable
  "nom": "Melastome (Melastomataceae)",  // nom courant / description
  "fam": "Melastomataceae",              // famille (ou "À confirmer")
  "type": "Simple",                       // Simple | Composée
  "comp": "Simple",                       // Composition (voir valeurs §5)
  "forme": "Elliptique/ovale",            // forme du limbe
  "marge": "Serrulée",                    // type de bord
  "nerv": "Acrodrome",                    // nervation
  "phyllo": "Opposée",                    // phyllotaxie ("" si non visible)
  "part": "",                             // particularité ("" si aucune)
  "notion": "Nervation acrodrome…",       // note pédagogique / rôle de la photo
  "uses": ["Formation","Article"],        // usages prévus
  "img": "data:image/jpeg;base64,…"       // vignette (dans le fichier _full)
}
```

`patterns_lessons.json` :
```json
{
  "dimensions": [["phyllo","Phyllotaxie"], ["comp","Structure / Composition"], …],
  "definitions": { "Opposée": ["<définition>", "<ce qu'il faut regarder>"], … },
  "familles_notes": { "Fabaceae": "…", "Melastomataceae": "…", … }
}
```

---

## 5. Dimensions et valeurs (pour les filtres et les leçons)

- **Phyllotaxie** (`phyllo`) : Opposée, Alterne, Verticillée, Distique, Spiralée
- **Composition** (`comp`) : Simple, Composée pennée, Paripennée, Imparipennée, Bipennée, Trifoliolée, Palmée-composée
- **Nervation** (`nerv`) : Pennée, Palmée, Acrodrome, Parallèle
- **Marge** (`marge`) : Entière, Dentée, Serrulée, Crénelée, Lobée, Épineuse
- **Forme du limbe** (`forme`) : Elliptique/ovale, Lancéolée, Obovale, Cordée, Orbiculaire, Palmatilobée, Perforée/lobée, Palmée (éventail), Oblongue, Sagittée, Composée (folioles)
- **Particularité** (`part`) : Panachée, Feuillage coloré/rouge, Poils (pubescente)/Poils denses, Râpeuse, Sores (fougère)/Sores linéaires, Distique (faux-composé), Ponctuations pellucides, Vrille (tendrille), Ochréa (gaine), Gaine engainante, Pétiole développé, Rosette, Stipule (latex), Nervures blanches, Coriace/glabre, Feuille flottante (peltée), Bractées colorées, Succulente à marge épineuse
- **Famille** (`fam`) : 30 familles nommées (Araceae, Araliaceae, Arecaceae, Asparagaceae, Asphodelaceae, Begoniaceae, Calophyllaceae, Clusiaceae, Costaceae, Cucurbitaceae, Cycadaceae, Dilleniaceae, Ericaceae, Euphorbiaceae, Fabaceae, Fougère (Polypodiopsida), Lamiaceae, Melastomataceae, Moraceae, Musaceae, Nyctaginaceae, Nymphaeaceae, Phyllanthaceae, Piperaceae, Polygonaceae, Rutaceae, Urticaceae, Vitaceae, Zamiaceae, Zingiberaceae) + **52 entrées « À confirmer »**

---

## 6. Ce qui reste à faire (feuille de route)

### A. Rendre l'app « propre » (priorité 1)
1. **Externaliser les images** : extraire les base64 de `patterns_data_full.json` vers des fichiers (`/public/images/FE-XX.jpg`) et remplacer `img` par un chemin. Réduit le poids et permet le cache.
2. **Séparer données / code** : `data/patterns.json` + `data/lessons.json` chargés en `fetch()`.
3. **Choisir un stack** (recommandation : **Vite + React** ou **Astro**, ou rester **statique** vanilla si simplicité). Le prototype vanilla est déjà propre — un port React n'est utile que pour la maintenabilité.

### B. Fonctionnalités
4. **Mode édition / ajout** : formulaire pour ajouter une plante (photo + tags) et corriger les familles — aujourd'hui le classement est manuel dans le code. Cf. Supabase ci-dessous.
5. **Confirmer les 52 familles « À confirmer »** (travail botanique de William ; utiliser `Explorateur_Revision_88.xlsx`).
6. **Traductions FR/EN/ES** : le sélecteur existe (FR actif). Externaliser les libellés + définitions par langue.
7. **Améliorer les leçons** : ordre pédagogique (Structure → Simple/Composée → Nervation → Phyllotaxie → Marge → Familles), leçons « comparaison A/B », quiz.
8. **Photos annotées** : superposer flèches + noms (limbe, pétiole, rachis, foliole…) — un pipeline existe côté Cowork (PIL). À porter ou garder comme assets.

### C. Données / base
9. **Base de données filtrable (option)** : **Supabase** recommandé si on veut éditer/rechercher à grande échelle et gérer plusieurs contributeurs. Schéma : table `feuilles` (colonnes = champs §4) + table `familles`. Sinon, le JSON statique suffit pour la lecture seule.

### D. Déploiement
10. **Déployer** sur **Netlify** ou **Vercel** (connecteurs disponibles). Domaine à rattacher à botapreneurs.com si souhaité.
11. Tests + accessibilité (aria, contrastes — la palette est déjà conforme).

---

## 7. Règles métier à respecter (important)

- **Exactitude botanique avant tout.** Une valeur non vérifiée = **« à confirmer »**, jamais supposée. « À confirmer » ≠ « absent ». Les familles sont validées par **William** (botaniste), pas devinées.
- **Une plante par sujet, pas de doublons** — priorité à la **diversité** (familles, patterns).
- **Numéros FE stables** : ne jamais renuméroter ; on ajoute à la fin.
- **Les leçons se remplissent automatiquement** depuis les données : ajouter une plante = elle apparaît dans les bonnes leçons.
- **Une feuille ne s'apprend pas avec une seule image** : chaque pattern doit montrer **plusieurs exemples** (5-10 visés).
- **Marque Botapreneurs** (avec S) ; couleurs et polices verrouillées (§2). Orange = CTA uniquement.

---

## 8. Comment démarrer dans Claude Code

1. Récupérer `Explorateur_et_Lecons_Feuilles.html` (prototype de référence), `patterns_data_full.json`, `patterns_data_light.json`, `patterns_lessons.json`.
2. Extraire les images base64 → `/public/images/`, réécrire `img` en chemins.
3. Scaffolder le projet (Vite + React conseillé) ; recréer les deux vues (Explorateur, Leçons) et la modale zoom à partir du prototype (le HTML contient déjà toute la logique JS commentée par sections : `EXPLORATEUR`, `LEÇONS`, `MODALE ZOOM`, `TABS`).
4. Brancher les traductions et le mode édition.
5. Déployer (Netlify/Vercel).

Le prototype HTML est la **source de vérité fonctionnelle** : tout le comportement souhaité y est déjà (filtres repliables, recherche, leçons auto, zoom, cartes, modale à grille de caractères).
