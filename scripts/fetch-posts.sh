#!/bin/bash
# Fetch X post metadata + media via fxtwitter API into references/media/
set -u
BASE="/Users/stian/Documents/claudee/my_taste/references"
META="$BASE/media/_meta"
mkdir -p "$META"

IDS="
2024485283769540850
2017899338953900190
2090070261978578989
2088518889860919565
2090002547410870428
2090030294892269799
2089995658640122065
2090102237548740718
2090249969060151700
2090197565035753820
2089887587586675171
2090113322255622509
2090100203722572286
2090148130914206137
2089714360235225334
2089786517023789189
2089321854582562983
2089970626207318243
2089981554747424955
2089955524007674031
2089734362485096473
2089684516814422257
2089707090969563302
2089749302960615875
2089704858970673447
2089745439624974755
2089706882688753782
2089687103760457768
2089369690078630069
2089617450815963434
2089421643311616127
2089624786213237049
2089627588184653915
2089632076370763821
2089382313649995881
2089426990696685794
2089328910802825606
2089253435665494317
2088853260535034223
2088707061945118946
2088528410025120164
2088541863032836293
2087895823619182608
2088123952136638508
2087815622709403800
"

for id in $IDS; do
  if [ ! -s "$META/$id.json" ]; then
    curl -s --max-time 30 "https://api.fxtwitter.com/i/status/$id" -o "$META/$id.json"
    sleep 1
  fi
done

# Parse + download media
python3 - <<'PYEOF'
import json, os, subprocess, glob

META = "/Users/stian/Documents/claudee/my_taste/references/media/_meta"
MEDIA = "/Users/stian/Documents/claudee/my_taste/references/media"

for path in sorted(glob.glob(f"{META}/*.json")):
    tid = os.path.basename(path)[:-5]
    try:
        d = json.load(open(path))
    except Exception as e:
        print(f"{tid}: JSON parse fail: {e}"); continue
    if d.get("code") != 200:
        print(f"{tid}: API code {d.get('code')} {d.get('message')}"); continue
    t = d["tweet"]
    author = t["author"]["screen_name"]
    slug = f"{author}-{tid}"
    outdir = f"{MEDIA}/{slug}"
    os.makedirs(outdir, exist_ok=True)
    media = (t.get("media") or {}).get("all") or []
    text = t.get("text", "").replace("\n", " ")[:110]
    got = []
    for i, m in enumerate(media, 1):
        mtype = m.get("type")
        url = m.get("url")
        if not url: continue
        if mtype == "photo":
            fn = f"{outdir}/photo_{i}.jpg"
            # request original size
            u = url + ("?name=orig" if "?" not in url else "")
        elif mtype in ("video", "gif"):
            fn = f"{outdir}/video_{i}.mp4"
            u = url
        else:
            continue
        if not os.path.exists(fn) or os.path.getsize(fn) == 0:
            r = subprocess.run(["curl", "-sL", "--max-time", "120", u, "-o", fn])
            if r.returncode != 0 or not os.path.exists(fn) or os.path.getsize(fn) == 0:
                print(f"{slug}: DL FAIL {mtype} {u}")
                continue
        got.append(f"{mtype}{i}:{os.path.getsize(fn)//1024}KB")
    print(f"{slug} | {len(media)} media [{', '.join(got)}] | {text}")
PYEOF
