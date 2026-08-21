# Prompt for the site rebuild session (paste into a NEW Claude Code session)

Open the session in `/Users/stian/Documents/claudee/my_taste` and paste:

---

/drawn-to

Bygg om landingssiden til Drawn To som ÉN skjerm. Alt er allerede låst - du skal ikke spørre om retning, bare bekrefte briefen, bygge, QA-e og vise meg.

**Repo og mål**
- Repo: /Users/stian/Documents/claudee/my_taste (public: github.com/Stianlars1/drawn-to, GitHub Pages serverer `docs/` fra main → https://stianlars1.github.io/drawn-to/).
- Fil: `docs/index.html` (én statisk fil, HTML/CSS/JS, ingen rammeverk; Google Fonts Inter / Geist Mono / Instrument Serif er ok).
- Lås-fil: `docs/design-locks/2026-08-21-drawn-to-site.md` - les HELE, inkludert "Revision R1" nederst. R1 vinner over eldre linjer. Ikke spør om noe som står der. Spør kun om ting som faktisk er åpne (sannsynligvis ingenting).

**Les før du bygger (i denne rekkefølgen)**
1. `skills/drawn-to/references/quality-bar.md` - the tells, budsjettene, illustrasjons-baren, QA-løkka. Dette er grunnen til at siden bygges om.
2. `skills/drawn-to/references/recipes.md` → "One-Screen Poster".
3. `skills/drawn-to/references/isometric-and-light.md` (beam / ring / slab-oppskrifter) og `illustration-ideation.md` (device-katalog).
4. `skills/drawn-to/references/style-families.md` → F1, F3, F5, F6, F8, og `production-formula.md` (Vercel-register for E).
5. `skills/drawn-to/references/polish-moments.md` (copy-knapp, count-up én gang).
6. SE PÅ RAMMENE før du bygger: `/Users/stian/Documents/claudee/my_taste/references/media/<slug>/` for referansene lås-fila siterer (basit_designs-2017, 0xSero-2090, Triopixels-2089, adriankuleszo-2089253, basit_designs-2089995, devxnuj-2090, marcelkargul-2089371, marcelkargul-2089404, flohoeller-2090, its_sslvr-2088). Åpne 2-3 rammer per referanse (Read på png/jpg) og noter tetthet, strek-kvalitet, lys-form. Bygg mot det du SER, ikke bare mot tekst.

**Hva som skal stå på skjermen (eksakte strenger, identiske i alle fem retninger)**
- Merke øverst venstre: `Drawn To`
- Lenke øverst høyre: `GitHub` → https://github.com/Stianlars1/drawn-to
- H1: `Give your agent taste.` (én linje i alle retninger, `text-wrap: balance`)
- Under-linje: `A measured taste library and a lock-in interview for coding agents.`
- Kommando (kopierbar, reservert bredde, tekst+ikon-swap + grønn suksess, tilbake etter 1600 ms): `npx skills add Stianlars1/drawn-to`
- Retningsetikett nederst venstre (mono, eneste caps på siden): `01 / 05 · narrow dark sharp`, `02 / 05 · wide light pastel`, `03 / 05 · paper & print`, `04 / 05 · dark atmosphere`, `05 / 05 · vercel-home`
- Tre tall som ÉN mono-linje, KUN i A, C og E: `51 references · 12 constants · 8 families`
- Ingenting annet. Ingen eyebrow. Ingen nav-lenker. Ingen "Read the source". Ingen "Install"-knapp. Ingen seksjoner under folden. Ingen scroll.
- ALLTID "-", ALDRI "—" (em dash). Sjekk med grep før du viser meg noe.

**Signatur-visual per retning (låst i R1 - bygg disse, ikke alternativer)**
- A narrow dark sharp (F1 80 + F4 15 + F8 5): "siden måler seg selv" - én stor blueprint-plate: redline av et hero-snitt med målelinjer og EKTE verdier (1120 · 28 · 0.08 · 0 · 44), hårlinjer 1 px rgba(255,255,255,.08), én blå aksent #5B8CFF, mono-etiketter med tabulære tall. Tre detaljnivåer: silhuett · konstruksjonslinjer · verdier.
- B wide light pastel (F6 70 + F3 30): typografisk plakat på pastell-horisont (#E6ECFF→#FBF7FF) med 3 % korn + ÉN myk squircle-flate (r 28, én myk farget skygge `0 24px 48px -12px rgba(50,70,130,.14)`) som bærer kommandoen. Ingen kort, ingen chips, ingen piller.
- C paper & print (F5 70 + F4 30): papir #F3F2EE, hvit mat med 1 px #E3E1DB-ramme som HOLDER FOLDEN med ≥ 48 px luft, serif-H1 (Instrument Serif), gradient-slab #F27BB4→#7A4EC9 ≤ 30 % av maten med halvtone 4 px pitch, crop marks, 2 % korn. Halvparten så mye innhold som før.
- D dark atmosphere (F3 60 + F8 25 + F1 15): ETT LYS - én skrå lysstråle fra øvre høyre (formet gradient: én definert kant, myk falloff, retning) som treffer H1, et støvfelt av prikker som fader ut, korn. INGEN stråler, INGEN ringer, INGEN sentrert blob. Glass-nav-pillen kan bli, men uten lenker.
- E vercel-home (F1-wide 85 + F8 15): #000, H1 LITEN til venstre (40/500, -0.06em), ett lyst objekt i senter = stor tynn ring med én lys bue (komet-highlight), rolig LINEÆR rotasjon (ambient-register, stopper ved reduced-motion), tre mono-linjer til høyre. Ingen trekant.
- Illustrasjons-baren gjelder alle fem: spesifikk · lagdelt · formet lys · én strek · to avstander · ett objekt. Hvis et visual ikke klarer alle seks - ship ingen visual for den retningen og si det.

**Motor (behold, ikke skriv om)**
- View Transitions cross-fade 700 ms, 2 px blur; auto-syklus 5 s alltid; `prefers-reduced-motion` → ingen auto, piltaster/klikk; `?v=a&still` fryser; piltaster ← →; hash bærer state. H1-reveal og count-up kun på første render (C12: hver ny hud ankommer komponert).

**Prosess og levering (lås Q8)**
1. Bygg lokalt. Server: `python3 -m http.server 8765` fra `docs/` (bakgrunn).
2. QA-løkka fra quality-bar.md § 4 for HVER av de fem: render i app-browseren på 1440×900, 1280×720 og 390×844 (bruk resize_window), `?v=a&still` … `?v=e&still`. Gå gjennom "the tells" og budsjettene linje for linje. Sammenlign med rammene du åpnet. Fiks, render på nytt.
3. Vis meg skjermbildene i FULL størrelse (1440×900, alle fem) her i chatten før du pusher. Jeg dømmer på renderen. Et skjermbilde på 800 px teller ikke.
4. Skriv `QA:` og `POLISH:`-linjene inn i lås-fila.
5. Vent på "ok" fra meg → commit (`feat(site): one screen, five locked directions - rebuilt through the skill`) + push. Stopp serveren.
6. Etter push: skjermbilde av hver retning på 1440×900 → `assets/exemplars/<a-e>-<family>.png` (+ kopi i `docs/assets/exemplars/`), lenk dem fra `skills/drawn-to/references/style-families.md` under riktig familie som egne, CC0 eksempel-plater. Egen commit.

**Anti-mål (dette ble underkjent sist - gjenta ingenting av det)**
Eyebrow-labels på hver skjerm · 7-ords H1 som brakk på tre linjer · hero-kort kuttet av folden · smale tekstkolonner som wrappet 5 linjer · trekant-i-ring som "objekt" · conic-striper som "lys" · fem tall · tre CTA-er · em dashes. Testen er: ville en principal design engineer signert skjermen?

**Ikke**
Ikke last andre smak-skills (design-taste-frontend, gpt-taste, frontend-taste) - kun /drawn-to. Ikke gjenåpne låste rader. Ikke legg til seksjoner. Ikke døm fra thumbnails. Ikke rapporter "verifisert" for noe du ikke har sett i full størrelse.

---
