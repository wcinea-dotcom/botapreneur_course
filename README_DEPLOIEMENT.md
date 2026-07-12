# Botapreneurs — Site de formation "Botany Made Simple"

Site statique prêt à mettre en ligne. Aucun serveur, aucune base de données : **gratuit et sans entretien**.

## Contenu du dossier
- `index.html` — page d'accueil de la formation (les 3 niveaux + le programme)
- `Communaute.html` — page Communauté & Échange
- `Cours_Ch1_Evolution.html` — Chapitre 1
- `Cours_Ch2_Morphologie.html` — Chapitre 2
- `Cours_Ch3_Parties.html` + `Cours_Ch3_*.html` — Chapitre 3 (sommaire + 6 pages d'organes)
- `explorateur_botanique.html` — explorateur des familles
- `Botany_Made_Simple_Course.html` — cours trilingue (version longue)
- `Cours_Ch1_Evolution.docx`, `Glossaire_Botanique_FR_EN_ES.pdf` — ressources à télécharger
- `manifest.webmanifest`, `service-worker.js`, `icon-192.png`, `icon-512.png` — pour l'app installable (PWA)

## Mise en ligne (le plus simple — Netlify Drop)
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose **tout le dossier `botapreneur_course`**.
3. C'est en ligne (adresse en .netlify.app). Terminé.

Pour garder le site et le mettre à jour : crée un compte Netlify gratuit, puis
« Add new site » → « Deploy manually » → glisse le dossier. À chaque mise à jour,
tu re-glisses le dossier.

## Sous-domaine Botapreneurs (optionnel)
Dans Netlify : Site settings → Domain management → Add domain →
`formation.botapreneurs.com`. Puis, chez ton registrar, crée un enregistrement
CNAME de `formation` vers l'adresse Netlify. Le site s'ouvrira sur
`formation.botapreneurs.com`.

## App installable (PWA)
Sur mobile, en ouvrant le site : menu du navigateur → « Ajouter à l'écran d'accueil ».
Le cours s'installe comme une application et fonctionne hors-ligne.

## À personnaliser
- Boutons « Rejoindre » (Communaute.html) : remplace les liens par le vrai lien de
  ton groupe (WhatsApp Community / Facebook / Discord).
- Logo : le texte "Botapreneurs" peut être remplacé par ton logo (`logo-icon.svg`).

© 2026 Botapreneurs · Where Botany Meets Business
