# Patterns des feuilles — Botapreneurs (dossier de passation)

Prototype d'application web pédagogique sur les caractères des feuilles
(Explorateur à filtres + Leçons par pattern). 115 plantes, 30 familles.

## Contenu
```
.
├── README.md                      ← ce fichier
├── START_PROMPT.md                ← prompt à coller dans Claude Code
├── .claude/skills/patterns-feuilles/SKILL.md   ← skill (contexte projet)
├── docs/HANDOFF_Claude_Code.md    ← rapport complet + feuille de route
├── data/
│   ├── patterns_data_light.json   ← 115 plantes, tags seuls
│   ├── patterns_data_full.json    ← 115 plantes + images (base64)
│   └── patterns_lessons.json      ← définitions des leçons
└── prototype/
    └── Explorateur_et_Lecons_Feuilles.html   ← prototype fonctionnel (source de vérité)
```

## Pour reprendre le développement
1. Dézippe ce dossier et ouvre-le dans Claude Code.
2. Colle le contenu de `START_PROMPT.md`.
3. Claude Code chargera le skill et le rapport, puis proposera un plan.

## Ouvrir le prototype tout de suite
Ouvre `prototype/Explorateur_et_Lecons_Feuilles.html` dans un navigateur (double-clic).
Deux onglets : **Explorateur** (filtres + recherche) et **Leçons** (pédagogie par pattern).
