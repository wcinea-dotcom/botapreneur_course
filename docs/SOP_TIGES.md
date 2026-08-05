# SOP — Intégration des photographies de tiges

## Objectif

Relier chaque photographie à trois niveaux sans créer de donnée botanique trompeuse :

1. le taxon photographié ;
2. sa famille botanique ;
3. un ou plusieurs patterns de tige réellement visibles.

## Procédure

1. Vérifier que le fichier est réellement disponible sur le Mac. Un fichier iCloud affichant une taille dans Finder peut être illisible tant qu’il n’est pas téléchargé.
2. Lire le nom sous la forme `Famille__Genre-espece__identifiant.JPG`.
3. Ne jamais publier comme certifié un fichier commençant par `AVERIFIER__`.
4. Examiner la photographie : le nom du fichier ne suffit pas à confirmer que l’organe ou le taxon visible correspond au nom.
5. Décrire d’abord ce qui est visible : port, nœuds, écorce, racines adventives, vrille, cicatrices foliaires, etc.
6. Conserver plusieurs tags lorsqu’une image documente plusieurs caractères.
7. Compresser une copie pour le Web ; ne pas modifier la photographie originale.
8. Ajouter la copie dans `fiche-famille/stem-library-v1/`.
9. Relier l’image à l’organe `Tige` de sa famille dans `fiche-famille/data/familles.json`.
10. Relier la même image aux leçons correspondantes dans `plant-patterns/index.html`.
11. Vérifier localement : chargement des images, compteurs, recherche de famille, zoom et absence d’erreur JavaScript.
12. Publier par branche GitHub et pull request ; Netlify déploie ensuite la branche `main`.

## Règles botaniques

- Une palme est une feuille ; le **stipe** est la tige arborescente du palmier.
- Une tige grimpante n’est pas automatiquement volubile : il faut distinguer enroulement, vrilles, racines d’accrochage et simple appui.
- Une tige rampante doit être observée depuis sa base et le long de plusieurs nœuds.
- La morphologie soutient une identification, mais ne prouve pas seule la parenté ou le nom scientifique.
- Les attributions incertaines restent visibles comme `identification à vérifier`.

## Contrôle anti-répétition des erreurs

- Aucun lien vers une image absente.
- Aucun nom marqué `AVERIFIER__` transformé en identification validée.
- Aucun doublon créé lors d’une seconde exécution du script.
- Aucun déploiement depuis une copie locale plus ancienne que la branche GitHub utilisée par Netlify.
- Aucun écrasement des données déjà publiées : toujours partir de la dernière révision de `main`.
