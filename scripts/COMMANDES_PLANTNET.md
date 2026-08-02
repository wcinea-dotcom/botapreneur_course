# Commandes Pl@ntNet — prêtes à coller (Terminal)

**Comment ça marche :**
- Ouvre le Terminal (Cmd+Espace → « Terminal »).
- Colle **d'abord la ligne de la clé** (une seule fois par session Terminal), puis la commande de l'organe.
- Quota gratuit ≈ **500 photos/jour** (toutes commandes confondues). Quand ça s'arrête, **recolle la même commande le lendemain** → ça reprend tout seul là où c'était.
- Ça ne touche jamais tes originaux. Résultat = `plantnet_resultats.csv` dans chaque dossier.
- Quand un dossier est fini, **envoie-moi son `plantnet_resultats.csv`** → je classe par famille.

---

## 0. La clé (à coller en premier, une fois)
```bash
export PLANTNET_API_KEY="2b10ZDmEaSLJS3a9w5lhjVJE7u"
```

## 1. FLEURS — continuer (il en reste ~594 sur 1094)
```bash
python3 ~/Desktop/botapreneur_course/scripts/plantnet_identify.py "/Volumes/CINEA/plant-patterns_project/Flowers_photos" --organ flower
```

## 2. FEUILLES (100 photos)
```bash
python3 ~/Desktop/botapreneur_course/scripts/plantnet_identify.py "/Volumes/CINEA/plant-patterns_project/Photos-feuille/1.Patterns" --organ leaf
```

## 3. FRUITS (1337 photos → plusieurs jours)
```bash
python3 ~/Desktop/botapreneur_course/scripts/plantnet_identify.py "/Volumes/CINEA/plant-patterns_project/Photos-fruits" --organ fruit
```

---

## Astuce : tester d'abord sur 10 photos
Ajoute `--limit 10` à la fin d'une commande pour un test rapide avant de tout lancer.

## Plus tard (autres organes disponibles sur le disque)
- Tiges : `Photo_tiges` → `--organ auto`
- Racines : `Photos_Racines` (ou `racines`) → `--organ auto`
- Graines : `Photos-seeds` → `--organ auto`

## Renommer les photos avec le nom de la plante (à faire quand un dossier est identifié)
```bash
python3 ~/Desktop/botapreneur_course/scripts/plantnet_rename.py "/Volumes/CINEA/plant-patterns_project/Photos-fruits"
```
(remplace le chemin par le dossier voulu ; ajoute `--par-famille` pour ranger en sous-dossiers par famille)

---
🔒 Ta clé Pl@ntNet est dans ce fichier — garde-le pour toi. Tu peux la régénérer sur my.plantnet.org si besoin.
