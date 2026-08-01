# Prompt de démarrage à coller dans Claude Code

Copie-colle ceci dans Claude Code (dans le dossier dézippé) :

---

Ouvre `docs/HANDOFF_Claude_Code.md` et le skill `.claude/skills/patterns-feuilles/SKILL.md`,
puis charge le contexte du projet « Patterns des feuilles » de Botapreneurs.

Objectif : transformer le prototype `prototype/Explorateur_et_Lecons_Feuilles.html` en une vraie
application maintenable, sans rien perdre du comportement actuel (Explorateur à filtres repliables +
recherche, Leçons auto par pattern, modale avec zoom).

Commence par la feuille de route (HANDOFF §6 et §8) :
1. Extrais les images base64 de `data/patterns_data_full.json` vers `/public/images/FE-XX.jpg`
   et réécris le champ `img` en chemin de fichier.
2. Sépare données et code : charge `data/patterns_data_light.json` (+ images externes) et
   `data/patterns_lessons.json` via fetch.
3. Scaffolde le projet (propose Vite + React, ou justifie un autre choix) et recrée les deux vues
   + la modale zoom à partir du prototype (JS déjà commenté par sections).
4. Respecte les règles métier du skill (exactitude botanique, "À confirmer" ≠ absent,
   familles validées par William, FE stables, leçons auto, couleurs/polices Botapreneurs).

Montre-moi d'abord un plan (arborescence + étapes) avant de coder.
