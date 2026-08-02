#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Renomme (par COPIE) les photos avec le nom de la plante identifié par Pl@ntNet.

Lit le fichier `plantnet_resultats.csv` produit par plantnet_identify.py,
et crée des COPIES renommées dans un sous-dossier `..._nommees/`.

Nom de fichier :  Famille__Espece__IMG-0284.jpg
  - le numéro IMG est conservé à la fin (traçabilité + pas de doublon).
  - score faible  -> préfixe  AVERIFIER__
  - aucune proposition -> préfixe  INCONNU__  (garde juste le numéro)

⚠️  Les ORIGINAUX ne sont jamais modifiés ni déplacés : on ne fait que des copies.
    Les noms d'espèces sont des PROPOSITIONS Pl@ntNet — à valider. La FAMILLE est
    en général plus fiable que l'espèce.

Utilisation :
  python3 plantnet_rename.py "/Volumes/CINEA/plant-patterns_project/Flowers_photos"
Options :
  --seuil N     score minimum (%) pour ne PAS préfixer AVERIFIER (défaut: 50)
  --out CHEMIN  dossier de sortie (défaut: <dossier>_nommees à côté)
  --par-famille  range aussi les copies dans des sous-dossiers par famille
"""

import os, sys, csv, shutil, argparse, unicodedata, re

def slug(s):
    if not s: return ""
    s = unicodedata.normalize("NFD", s).encode("ascii","ignore").decode("ascii")
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-")
    return s

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dossier")
    ap.add_argument("--seuil", type=float, default=50)
    ap.add_argument("--out", default="")
    ap.add_argument("--par-famille", action="store_true")
    a = ap.parse_args()

    folder = os.path.abspath(a.dossier)
    csv_path = os.path.join(folder, "plantnet_resultats.csv")
    if not os.path.exists(csv_path):
        sys.exit(f"❌ Pas de {csv_path}. Lance d'abord plantnet_identify.py.")

    out = a.out or (folder.rstrip("/") + "_nommees")
    os.makedirs(out, exist_ok=True)

    n_ok = n_verif = n_inconnu = n_manque = 0
    with open(csv_path, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            src_name = row.get("fichier","")
            src = os.path.join(folder, src_name)
            if not os.path.exists(src):
                n_manque += 1; continue
            base, ext = os.path.splitext(src_name)
            imgtag = slug(base)  # ex. IMG-0284
            fam = slug(row.get("famille",""))
            esp = slug(row.get("espece","")) or slug(row.get("genre",""))
            try: score = float(row.get("score") or 0)
            except ValueError: score = 0

            if not esp and not fam:
                new = f"INCONNU__{imgtag}{ext}"; sub=""; n_inconnu += 1
            else:
                name_core = "__".join([p for p in (fam, esp) if p]) or imgtag
                if score and score >= a.seuil:
                    new = f"{name_core}__{imgtag}{ext}"; n_ok += 1
                else:
                    new = f"AVERIFIER__{name_core}__{imgtag}{ext}"; n_verif += 1
                sub = fam if a.par_famille and fam else ""

            dst_dir = os.path.join(out, sub) if sub else out
            os.makedirs(dst_dir, exist_ok=True)
            shutil.copy2(src, os.path.join(dst_dir, new))

    print(f"✅ Copies renommées dans : {out}")
    print(f"   {n_ok} nommées (score ≥ {a.seuil:.0f}%) · {n_verif} AVERIFIER · {n_inconnu} INCONNU · {n_manque} introuvables")
    print("   Rappel : noms = propositions Pl@ntNet, à valider. Originaux intacts.")

if __name__ == "__main__":
    main()
