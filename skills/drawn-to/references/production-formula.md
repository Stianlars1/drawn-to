# Production formula — seven famous sites, measured live

Origin: the refetch.sh redesign research (August 2026) — computed values read
off the live pages of Linear, Vercel, Raycast, Resend, Codex, Vite and Notion
at 1440px. This complements the X-reference corpus: the 45 posts are mostly
SECTION-scale craft; this file is PAGE-scale architecture from shipped
production sites. Use it for containers, section air, running order, nav,
buttons, closing CTA and footer — and to sanity-check any full-page build.

## Measured values per site

- **Linear** — bg #08090a; container 1344; sections 128px 0, pre-footer 224.
  H1 64/510/-0.022em lh 1.0; H2 48/510 (grey manifesto H2 #8a8f98); body
  15/400 #8a8f98. Radii 6/12/22; borders rgba(255,255,255,.05-.08); inset
  ring 0 0 0 1px #23252a. Buttons 32px pill 13/510, hero 44px pill. Motion
  .1/.16s cubic-bezier(.25,.46,.45,.94). Numbered chapters "1.0 Intake ->" w/
  mono sub-index; trio with vertical dividers + FIG labels; flat pastel
  testimonial cards; centered 2-line CTA; 5-col footer.
- **Vercel** — bg #000; container 1400; section margin-top 208. H1
  64/400/-0.06em; H2 56/450/-0.06em; body Geist 16; mono feature lists.
  Radii 6/8; borders as box-shadow 0 0 0 1px rings; cards #0a0a0a on black.
  Buttons 32/40 r6/8. Motion .1/.15s cubic-bezier(.4,0,.2,1). Hero: tiny H1
  left, one lit object centre, 3 mono lines right; 2x2 bento r12 outlined.
- **Raycast** — bg #07080a; container 1204 (lg 1280), grid gap 32. H1 64/600
  centered; section heads = 20/500 white+grey line pairs, centered; body 18.
  Radii 12/16; borders rgba(255,255,255,.06-.08); glass = inset 0 1px 0
  rgba(255,255,255,.1) + glow 0 0 40px 20px rgba(255,255,255,.03); red
  light-leaks behind panels. Buttons 36px r8 light #e6e6e6 + 2px dark ring +
  glow. Motion .2/.3s easeOutQuint cubic-bezier(.23,1,.32,1). Product staged
  in a macOS desktop frame; developer section on dotted blueprint grid w/
  FIG_01 + leader lines; full keyboard illustration behind final CTA; 6-col
  footer + newsletter.
- **Resend** — bg #000; container 1232; sections 96px 0, some 1px top rule.
  H1 96 serif (Domaine)/400; H2 56/400/-0.05em centered w/ 3D icon above;
  body Inter 18 #a1a4a5. Radii 16/24; cool-tinted alpha borders (#b0c7d925,
  ~15-20%); no shadows; radial glow + lit top edge behind frames. Buttons
  40px. Motion .15/.2s. Serif closing CTA "Email reimagined."
- **Codex** — bg #000; container 1376; base font 17. H1 64/500/-0.03em
  centered + icon; H3 feature titles 30/500; body 17 white lh 1.65. Radius
  12; borders rgba(255,255,255,.12); pill buttons r40. Aurora hero; zig-zag
  rows (text col + aurora panel w/ floating UI card); 3x2 quote cards #1a1a1a.
- **Vite** — bg #16171d (purple-tinted); max 1440 with a VISIBLE 1px frame
  grid #3b3440 running the full page; radius 0 cells padded 40; sections
  112px 0 with border-top. H1 60/500/-0.05em; body 18 rgba(255,255,255,.7) +
  #867e8e. Isometric dark tiles on grainy purple gradient; hover = tile lifts
  along the iso axis revealing a gradient side face + dashed guide (~0.3s
  ease-out). Mono uppercase labels.
- **Notion (light outlier)** — bg #fff; container ~1229. H1 96/600/-0.048em
  centered + rotating pastel pill word; H2 54/700; radii 12/8; borders
  rgba(0,0,0,.1); pastel card tints; blue CTA r8; scroll-pinned hero.

## The cross-site formula (all seven do this)

1. One container, 1200-1400px, gutters 24-40.
2. Big air: 96-128px section padding or 208px margins; rhythm varies (dense
   bento, then a breathing chapter, then a full-bleed frame).
3. Three type sizes only: H1 60-96, H2 48-56, feature title 20-30; weights
   400-600 (never heavier than 600 on dark); tracking -0.02..-0.06em; lh
   1.0-1.1. Body 15-18 grey (55-65% white), lh 1.5-1.65, 55-65ch.
4. Mono for meta everywhere: numbers, labels, FIG tags, install hints, counts.
5. Borders 1px white-alpha 5-15% (or tinted alpha), often box-shadow rings;
   shadows rare and soft; glass = inset 1px top highlight.
6. Radii 6-8 controls / 12-16 cards / 20-24 device frames; nested radius =
   outer - padding.
7. Motion .1-.2s hover, .3s panels, ease-out; hover changes brightness/
   border/glow, not position (Vite's iso lift is the deliberate exception).
8. Product visuals are real UI, framed once, often bleeding off an edge,
   sometimes staged in its OS.
9. 6-9 sections: hero -> proof/logos -> 2-4 feature chapters -> one
   how-it-works/developer section -> social proof -> centered CTA -> footer.
10. Hero = headline + 1-line sub + 2 buttons (+ mono hint) + ONE signature
    visual (lit object, 3D cube, staged desktop, aurora).
11. Centered closing 2-line CTA + pills; then a structured footer.

## Mapping to the style families

The refetch A/B/C categories map onto the corpus families: A Editorial
Monochrome ≈ F1 (dark) / F2 (light); B Staged Atmosphere ≈ F3; C Blueprint
Sheet ≈ F4. The production sites confirm the same blend law: editorial is the
default page body, staged appears as ONE signature object/moment, blueprint
only where facts are presented.

## Using it for something new (the refetch method, generalized)

1. Name the job of the section: prove, explain, invite, reassure, celebrate.
2. Pick the category/family weight FOR THAT JOB — editorial default; staged
   only for the signature object; blueprint only for measured facts.
3. Take the measurements from the closest reference above (air, radius,
   border alpha, type size/weight/tracking, motion duration/curve) and map
   them onto the project's confirmed tokens. Never introduce a value the
   scale does not have without adding it to the scale.
4. Check against the lock file; if the decision is new, ask one question and
   record the lock.
