---
name: patterns-feuilles
description: >
  Contexte expert du projet « Patterns des feuilles » de Botapreneurs (William Cinéa) :
  une application web pédagogique et de référence sur les caractères des feuilles
  (Explorateur à filtres + Leçons par pattern). Charger ce skill dès qu'on travaille sur
  cette application, ses données (patterns_data*.json, patterns_lessons.json), le prototype
  HTML, l'ajout/correction de plantes, les familles botaniques, les dimensions (phyllotaxie,
  composition, nervation, marge, forme, particularité), le mode Leçons, les traductions,
  ou le déploiement. Contient le schéma des données, les valeurs autorisées et les règles métier.
---

# Projet « Patterns des feuilles » — Botapreneurs

## But
App web à deux modes :
- **Explorateur** : filtrer une collection de plantes par caractère (famille, nervation,
  phyllotaxie, marge, particularité, forme, composition) + recherche plein-texte.
- **Leçons** : apprendre pattern par pattern (définition + « ce qu'il faut regarder » +
  galerie de plusieurs exemples). Les leçons se génèrent **automatiquement** depuis les données.

Marque **Botapreneurs** (volet éducatif rattachable à **PlantsMastery**). Langue FR (prêt FR/EN/ES).

## Fichiers du dépôt
- `docs/HANDOFF_Claude_Code.md` — rapport complet + feuille de route (lire en premier).
- `data/patterns_data_light.json` — 115 plantes, tags seuls (sans images).
- `data/patterns_data_full.json` — 115 plantes + images base64 (source des images à externaliser).
- `data/patterns_lessons.json` — définitions + « ce qu'il faut regarder » + notes de familles.
- `prototype/Explorateur_et_Lecons_Feuilles.html` — **prototype fonctionnel = source de vérité**
  (JS commenté par sections : EXPLORATEUR, LEÇONS, MODALE ZOOM, TABS).

## Schéma d'une entrée (data/patterns_data_*.json)
`fe` (id stable, ex "FE-01") · `nom` · `fam` (famille ou "À confirmer") · `type` (Simple|Composée) ·
`comp` (composition) · `forme` · `marge` · `nerv` · `phyllo` ("" si non visible) · `part` ("" si aucune) ·
`notion` (note/rôle pédagogique) · `uses` (liste) · `img` (data URL base64, dans _full).

## Valeurs autorisées
- **phyllo** : Opposée, Alterne, Verticillée, Distique, Spiralée
- **comp** : Simple, Composée pennée, Paripennée, Imparipennée, Bipennée, Trifoliolée, Palmée-composée
- **nerv** : Pennée, Palmée, Acrodrome, Parallèle
- **marge** : Entière, Dentée, Serrulée, Crénelée, Lobée, Épineuse
- **forme** : Elliptique/ovale, Lancéolée, Obovale, Cordée, Orbiculaire, Palmatilobée,
  Perforée/lobée, Palmée (éventail), Oblongue, Sagittée, Composée (folioles)
- **part** : Panachée, Feuillage coloré/rouge, Poils (pubescente)/Poils denses, Râpeuse,
  Sores (fougère)/Sores linéaires, Distique (faux-composé), Ponctuations pellucides,
  Vrille (tendrille), Ochréa (gaine), Gaine engainante, Pétiole développé, Rosette,
  Stipule (latex), Nervures blanches, Coriace/glabre, Feuille flottante (peltée),
  Bractées colorées, Succulente à marge épineuse
- **fam** : 30 familles nommées + 52 entrées "À confirmer" (état actuel).

## Règles métier (IMPÉRATIVES)
1. **Exactitude botanique.** Valeur non vérifiée = **"À confirmer"**, jamais supposée.
   "À confirmer" ≠ "absent". Les familles sont **validées par William** (botaniste), pas devinées par l'IA.
2. **Une plante par sujet, pas de doublons** — priorité à la **diversité** (familles, patterns).
3. **Numéros FE stables** : ne jamais renuméroter ; ajouter uniquement à la fin.
4. **Leçons auto** : ajouter une plante = elle apparaît dans les bonnes leçons, sans code en dur.
5. **« Une feuille ne s'apprend pas avec une seule image »** : viser 5-10 exemples par pattern.
6. **Marque Botapreneurs** (avec S). Couleurs verrouillées : Deep Blue `#003366`,
   Botanical Green `#2E7D32`, Lime `#8BC34A`, Action Orange `#F47C20` (**CTA uniquement**),
   Beige `#F8F8F4`. Polices **Poppins** (titres) + **Lato** (corps).

## Feuille de route (voir docs/HANDOFF pour le détail)
1. Externaliser les images base64 → `/public/images/FE-XX.jpg`, remplacer `img` par un chemin.
2. Séparer données/code (`fetch` des JSON).
3. Stack conseillé : Vite + React ou Astro (ou rester vanilla — le prototype est propre).
4. Mode édition (ajout/correction de plantes) ; option **Supabase** si multi-contributeurs.
5. Confirmer les 52 familles "À confirmer" (fiche `Explorateur_Revision_88.xlsx`).
6. Traductions FR/EN/ES (le sélecteur existe, FR actif).
7. Déploiement Netlify/Vercel.

## Démarrage
Recréer les deux vues + la modale zoom à partir du prototype HTML (toute la logique y est).
Charger les données depuis `data/`. Respecter les règles métier ci-dessus.
