#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pl@ntNet — pré-identification des photos (nom scientifique + genre + famille).

Ce que ça fait :
  - parcourt un dossier de photos (.jpg/.jpeg),
  - envoie chaque photo à l'API Pl@ntNet,
  - écrit un tableau (CSV + JSON) : fichier -> famille / genre / espèce probables + score,
    avec les 3 meilleures propositions.

⚠️  Ce sont des PROPOSITIONS automatiques, pas des identifications validées.
    C'est William (botaniste) qui confirme. Une proposition faible reste « à vérifier ».

Prérequis :
  - une clé API Pl@ntNet (gratuite) : créer un compte sur https://my.plantnet.org
    puis Paramètres -> "API key". Quota gratuit ~ quelques centaines/jour.
  - la commande `curl` (déjà présente sur macOS).

Utilisation :
  export PLANTNET_API_KEY="ta_cle"
  python3 plantnet_identify.py "/Volumes/CINEA/plant-patterns_project/Flowers_photos" --organ flower
  python3 plantnet_identify.py "/dossier/feuilles" --organ leaf --limit 50

Options :
  --organ   flower | leaf | fruit | bark | auto     (indice d'organe, défaut: auto)
  --limit   N        n'traiter que les N premières photos (test)
  --out     chemin   fichier CSV de sortie (défaut: plantnet_resultats.csv à côté des photos)
  --sleep   secondes  pause entre deux appels (défaut: 1.2, pour respecter le quota)

Le script REPREND où il s'est arrêté : les photos déjà dans le CSV ne sont pas renvoyées.
Il ne modifie ni ne déplace aucune photo d'origine.
"""

import os, sys, csv, json, time, argparse, subprocess

API_URL = "https://my-api.plantnet.org/v2/identify/all"

def identify(path, api_key, organ, nb=3):
    """Appelle Pl@ntNet via curl. Renvoie (results|None, erreur|None)."""
    url = f"{API_URL}?api-key={api_key}&nb-results={nb}&lang=fr"
    cmd = ["curl", "-s", "-S", "--http1.1", "--retry", "2", "--max-time", "45",
           "-X", "POST", url,
           "-F", f"images=@{path}",
           "-F", f"organs={organ}"]
    try:
        out = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    except subprocess.TimeoutExpired:
        return None, "timeout"
    if not out.stdout.strip():
        return None, f"vide (stderr: {out.stderr.strip()[:120]})"
    try:
        data = json.loads(out.stdout)
    except json.JSONDecodeError:
        return None, "reponse non-JSON: " + out.stdout.strip()[:120]
    if "results" not in data:
        # message d'erreur de l'API (quota, cle invalide, organe, etc.)
        return None, data.get("message", str(data))[:160]
    return data["results"], None

def top_rows(results, nb=3):
    rows = []
    for r in results[:nb]:
        sp = r.get("species", {})
        rows.append({
            "famille": (sp.get("family") or {}).get("scientificNameWithoutAuthor", ""),
            "genre":   (sp.get("genus")  or {}).get("scientificNameWithoutAuthor", ""),
            "espece":  sp.get("scientificNameWithoutAuthor", ""),
            "noms_communs": ", ".join(sp.get("commonNames", [])[:2]),
            "score":   round(float(r.get("score", 0)) * 100, 1),  # en %
        })
    return rows

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dossier")
    ap.add_argument("--organ", default="auto", choices=["flower","leaf","fruit","bark","auto"])
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--out", default="")
    ap.add_argument("--sleep", type=float, default=1.2)
    a = ap.parse_args()

    key = os.environ.get("PLANTNET_API_KEY", "").strip()
    if not key:
        sys.exit("❌ Manque PLANTNET_API_KEY. Fais :  export PLANTNET_API_KEY=\"ta_cle\"  (voir https://my.plantnet.org)")

    folder = os.path.abspath(a.dossier)
    if not os.path.isdir(folder):
        sys.exit(f"❌ Dossier introuvable : {folder}")

    out_csv = a.out or os.path.join(folder, "plantnet_resultats.csv")
    out_json = os.path.splitext(out_csv)[0] + ".json"

    # reprise : on ne saute QUE les photos déjà identifiées avec succès
    # (les lignes en erreur seront réessayées)
    done = set()
    if os.path.exists(out_csv):
        with open(out_csv, encoding="utf-8") as f:
            for row in csv.DictReader(f):
                if (row.get("statut") or "").startswith("à valider"):
                    done.add(row.get("fichier"))

    # liste des photos (ignore les fichiers macOS ._ et non-jpg)
    imgs = sorted(x for x in os.listdir(folder)
                  if x.lower().endswith((".jpg", ".jpeg"))
                  and not x.startswith("._"))
    todo = [x for x in imgs if x not in done]
    if a.limit:
        todo = todo[:a.limit]

    print(f"📷 {len(imgs)} photos · {len(done)} déjà faites · {len(todo)} à traiter · organe={a.organ}")
    if not todo:
        print("Rien à faire."); return

    new_header = not os.path.exists(out_csv)
    all_json = []
    if os.path.exists(out_json):
        try: all_json = json.load(open(out_json, encoding="utf-8"))
        except Exception: all_json = []

    with open(out_csv, "a", newline="", encoding="utf-8") as f:
        cols = ["fichier","famille","genre","espece","noms_communs","score",
                "alt2_famille","alt2_espece","alt2_score",
                "alt3_famille","alt3_espece","alt3_score","statut"]
        w = csv.DictWriter(f, fieldnames=cols)
        if new_header: w.writeheader()

        for i, name in enumerate(todo, 1):
            path = os.path.join(folder, name)
            results, err = identify(path, key, a.organ)
            if err:
                print(f"  [{i}/{len(todo)}] {name} → ⚠️ {err}")
                # si quota atteint, on s'arrête proprement (reprise plus tard)
                if "quota" in err.lower() or "limit" in err.lower() or "429" in err:
                    print("⛔ Quota Pl@ntNet atteint — relance le script demain, il reprendra ici.")
                    break
                w.writerow({"fichier": name, "statut": "erreur: "+err})
                f.flush()
                time.sleep(a.sleep); continue

            tops = top_rows(results)
            best = tops[0] if tops else {}
            row = {
                "fichier": name,
                "famille": best.get("famille",""), "genre": best.get("genre",""),
                "espece": best.get("espece",""), "noms_communs": best.get("noms_communs",""),
                "score": best.get("score",""),
                "alt2_famille": tops[1]["famille"] if len(tops)>1 else "",
                "alt2_espece":  tops[1]["espece"]  if len(tops)>1 else "",
                "alt2_score":   tops[1]["score"]   if len(tops)>1 else "",
                "alt3_famille": tops[2]["famille"] if len(tops)>2 else "",
                "alt3_espece":  tops[2]["espece"]  if len(tops)>2 else "",
                "alt3_score":   tops[2]["score"]   if len(tops)>2 else "",
                "statut": "à valider" if best.get("score",0) else "aucune proposition",
            }
            w.writerow(row); f.flush()
            all_json.append({"fichier": name, "organe": a.organ, "propositions": tops})
            json.dump(all_json, open(out_json,"w",encoding="utf-8"), ensure_ascii=False, indent=1)
            sc = f'{best.get("score","?")}%' if best else "?"
            print(f"  [{i}/{len(todo)}] {name} → {best.get('famille','?')} / {best.get('espece','?')} ({sc})")
            time.sleep(a.sleep)

    print(f"\n✅ Terminé. Résultats :\n   {out_csv}\n   {out_json}")
    print("   Rappel : ce sont des PROPOSITIONS à valider avant classement.")

if __name__ == "__main__":
    main()
