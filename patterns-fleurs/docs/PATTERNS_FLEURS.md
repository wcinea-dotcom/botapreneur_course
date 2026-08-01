# Patterns des fleurs — Botapreneurs
## Dimensions & valeurs autorisées (à valider par William)

Document jumeau de « Patterns des feuilles ». Il définit **les caractères (patterns) de la fleur**
qui serviront de **filtres** (mode Explorateur) et de **leçons** (une leçon par valeur).
Même logique que les feuilles : **chaque dimension = sa propre catégorie**, chaque valeur = son propre
ensemble d'exemples.

> **Règle d'or (identique aux feuilles) :** exactitude botanique avant tout.
> Une valeur non vérifiée = **« À confirmer »**, jamais supposée. « À confirmer » ≠ « absent ».
> Les déterminations sont **validées par William** (botaniste), pas devinées par l'IA.
> Termes et définitions repris de la base trilingue *Plant Mastery* (organe **Fleurs**, 165 termes).

---

## A. Dimensions retenues — 20 dimensions actives (validé)

### 1. Symétrie florale · `sym`
- **Actinomorphe (régulière)** — symétrie radiale, divisible en plusieurs plans semblables.
- **Zygomorphe (irrégulière)** — symétrie bilatérale, un seul plan de symétrie.
- **Asymétrique** — aucun plan de symétrie.

### 2. Sexualité de la fleur · `sexe`
- **Bisexuée (parfaite)** — étamines **et** carpelles présents.
- **Unisexuée mâle (staminée)** — étamines seules.
- **Unisexuée femelle (pistillée)** — carpelles seuls.

### 3. Périanthe (organisation) · `perianthe`
- **Complète** — calice + corolle + androcée + gynécée.
- **Sépales + pétales différenciés** — calice et corolle distincts.
- **Tépales (périgone)** — sépales et pétales se ressemblent (non différenciés).
- **Apétale** — sans pétales.
- **Asépale** — sans sépales.
- **Achlamydée (nue)** — sans périanthe.

### 4. Mérosité (nombre de pièces) · `mero`
- **Trimère (×3)** — pièces par 3 (typique des monocotylédones).
- **Tétramère (×4)** — pièces par 4.
- **Pentamère (×5)** — pièces par 5.
- **Indéfinie / polymère** — pièces nombreuses ou variables.

### 5. Calice — cohésion des sépales · `calice`
- **Dialysépale** — sépales **libres**.
- **Gamosépale** — sépales **soudés**.

### 6. Corolle — cohésion des pétales · `corolle`
- **Dialypétale** — pétales libres, séparés.
- **Gamopétale** — pétales soudés entre eux.
- **Apétale** — pas de pétales.

### 7. Forme de la corolle · `forme`
- **Tubulaire** · **Campanulée** · **Infundibuliforme** (entonnoir) · **Rotacée** (en roue) ·
  **Hypocratériforme** (tube long + limbe plat) · **Urcéolée** (en grelot) · **Bilabiée** (2 lèvres) ·
  **Papilionacée** (type pois) · **Ligulée** (en languette) · **Éperonnée** (à éperon).

### 8. Androcée — cohésion des étamines · `androcee`
- **Étamines libres** — non soudées.
- **Monadelphe** — filets soudés en **un** groupe.
- **Diadelphe** — filets soudés en **deux** groupes.
- **Polyadelphe** — filets soudés en **plusieurs** groupes.
- **Syngénèse (synanthérée)** — anthères soudées en tube (Asteraceae).
- **Épipétale** — étamines attachées à la corolle / aux pétales.

### 9. Androcée — nombre & arrangement · `etam_nb`
- **Définies** (nombre fixe, ≤ 2× les pétales) · **Indéfinies** (nombreuses) ·
  **Didynames** (4 : 2 longues + 2 courtes) · **Tétradynames** (6 : 4 longues + 2 courtes).

### 10. Attache de l'anthère · `anthere`
- **Basifixe** — attachée au filet par sa base.
- **Dorsifixe** — attachée par le dos.
- **Versatile** — attachée près du centre, mobile.

### 11. Position de l'ovaire · `ovaire`
- **Supère (fleur hypogyne)** — ovaire au-dessus de l'insertion des autres pièces.
- **Infère (fleur épigyne)** — ovaire sous l'insertion des autres pièces.
- **Semi-infère (périgyne)** — ovaire partiellement inséré dans le réceptacle.

### 12. Carpelles · `carpelle`
- **Apocarpe** — carpelles séparés.
- **Syncarpe** — carpelles soudés.
- **Unicarpellé** — un seul carpelle.

### 13. Placentation · `placenta`
- **Axile** — ovules sur l'axe central (cloisons présentes).
- **Pariétale** — ovules sur la paroi de l'ovaire.
- **Centrale libre** — ovules sur une colonne centrale sans cloisons.
- **Basale** — ovules à la base de la loge.
- **Apicale** — ovules au sommet de la loge.
- **Marginale** — ovules le long de la marge d'un carpelle unique.

### 14. Bractées · `bractee`
- **Absente** · **Présente** · **Spathe** (grande bractée engainante) ·
  **Involucre** (couronne de bractées, ex. capitule) · **Bractées pétaloïdes / colorées** ·
  **Glumes** (bractées des graminées).

### 15. Inflorescence · `inflo`
- **Solitaire** · **Grappe** · **Épi** · **Panicule** · **Cyme** · **Ombelle** ·
  **Corymbe** · **Capitule** · **Spadice** · **Chaton**.

### 16. Préfloraison / estivation · `prefl`
Disposition des pièces dans le bouton :
- **Valvaire** (bords qui se touchent sans recouvrement) · **Imbriquée** (pièces se recouvrant) ·
  **Tordue (contortée)** (chaque pièce recouvre la suivante d'un même côté) · **Quinconciale**
  (2 externes, 2 internes, 1 mixte).

### 17. Loges de l'ovaire · `loges`
- **Uniloculaire** (1 loge) · **Biloculaire** (2 loges) · **Pluriloculaire** (3+ loges).
  *Souvent visible seulement sur une coupe de l'ovaire.*

### 18. Couleur dominante · `couleur`
- **Blanc** · **Jaune** · **Rouge** · **Rose** · **Violet/Bleu** · **Vert** · **Orange** · **Bicolore**.
  *Caractère pratique (tri des photos), non taxonomique.*

### 19. Nectaire / éperon · `nectaire`
- **Présent** · **Absent**. Indice du mode de pollinisation, souvent visible en photo.

### 20. Particularité florale · `part`
Caractère remarquable non couvert par les autres dimensions (liste ouverte, enrichie au fil des photos) :
- **Sépales accrescents / persistants** (calice qui grossit / reste après la floraison) ·
  **Ligules (capitule d'Astéracée)** · **Pappus** (aigrette de soies) · **Éperon** ·
  **Colonne staminale** (Malvaceae) · **Labelle** (Orchidaceae, Zingiberaceae) ·
  **Spathe colorée** (Araceae) · **Involucre coloré** · **Bractées pétaloïdes** ·
  **Pièces contortées** (Apocynaceae) · **Fleur résupinée**.
- `""` si aucune particularité notable.

---

## C. Schéma d'une entrée (futur `data/fleurs_data.json`)

Même modèle que les feuilles (id stable `FL-01`, `img` = chemin de fichier) :

```json
{
  "fl": "FL-01",
  "nom": "Hibiscus (Malvaceae)",
  "fam": "Malvaceae",
  "sym": "Actinomorphe",
  "sexe": "Bisexuée",
  "perianthe": "Sépales + pétales différenciés",
  "mero": "Pentamère",
  "calice": "Gamosépale",
  "corolle": "Dialypétale",
  "forme": "Campanulée",
  "androcee": "Monadelphe",
  "etam_nb": "Indéfinies",
  "anthere": "Dorsifixe",
  "ovaire": "Supère",
  "carpelle": "Syncarpe",
  "placenta": "Axile",
  "bractee": "Présente",
  "inflo": "Solitaire",
  "prefl": "Tordue (contortée)",
  "loges": "Pluriloculaire",
  "couleur": "Rouge",
  "nectaire": "Présent",
  "part": "Colonne staminale",
  "notion": "Colonne staminale (monadelphe) très visible — signature des Malvaceae.",
  "uses": ["Formation", "Article"],
  "img": "images/FL-01.jpg"
}
```

Champ vide `""` = caractère non visible / non renseigné. Valeur incertaine = `"À confirmer"`.

---

## D. Règles métier (identiques aux feuilles)
1. **Exactitude botanique** — valeur non vérifiée = « À confirmer ». Familles validées par William.
2. **Diversité** — une fleur par sujet, pas de doublons ; viser la variété des familles et des patterns.
3. **Numéros FL stables** — ne jamais renuméroter ; ajouter à la fin.
4. **Leçons automatiques** — ajouter une fleur = elle apparaît dans les bonnes leçons, sans code en dur.
5. **Plusieurs exemples par pattern** — viser 5-10 fleurs par valeur (« une fleur ne s'apprend pas
   avec une seule image »).
6. **Marque Botapreneurs** — mêmes couleurs (Deep Blue, Botanical Green, Lime, Action Orange = CTA
   uniquement, Beige) et polices (Poppins + Lato).

---

## E. État & suite
- [x] **20 dimensions actives** validées par William (15 cœur + 4 optionnelles : préfloraison, loges,
  couleur, nectaire + « Particularité florale » `part`).
- Vocabulaire dicté par William : « gam-hôpital » = **gamopétale** (pétales soudés) ;
  « gam au sépale » = **gamosépale** (sépales soudés).
- Curation en cours **photo par photo** : William donne un n° + observations → fiche FL remplie,
  reste = « À confirmer ». Fiches déjà saisies : FL-01 (216), FL-02 (284), FL-03 (489/490 Moringa),
  FL-04 (617). Photos sources : `/Volumes/CINEA/plant-patterns_project/Flowers_photos/`.
- [ ] Ordre pédagogique des leçons (proposé : Symétrie → Périanthe → Calice/Corolle → Forme →
  Androcée → Gynécée → Placentation → Inflorescence → Familles).
- [ ] **Prochaine étape : William fournit les photos** → je remplis `data/fleurs_data.json` +
  je construis l'app (réutilise le moteur des feuilles : Explorateur + Leçons + zoom).
