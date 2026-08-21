# my_taste — portable design-taste skill

Owner: Stian. Started 2026-08-20. Origin: refetch.sh landing redesign session
(the Q1-Q25 lock-in process) — this generalizes that process to any project.

## Goal

A portable skill (SKILL.md + references/) that, when invoked with "I want to
build X" (full Next.js site, landing page, hero, feature cards, sub-pages, a
component), asks interactive questions grounded in a reverse-engineered taste
library of ~45 saved X/Twitter design references, and locks a precise
style/tone/direction before any code is written.

## Locked decisions (2026-08-20)

- **Q1 Format**: portable skill (SKILL.md + references/), works in Claude
  Code / Codex CLI / Copilot / Gemini CLI; matrix markdown pasteable into
  ChatGPT as project instructions. Plugin wrapper possible later.
- **Q2 Lock-in style**: multi-select + weighting. Every question allows
  multiple picks with a blend weight (e.g. 70/20/10). Never force excluding
  directions the owner likes (the "I liked all 3" problem from the refetch
  session).
- **Q3 Media**: downloading post media is allowed; stored permanently in
  `references/media/` (metadata in `_meta/*.json`, frames extracted at 2-6fps).
- **Q4 Phasing**: checkpoint after analysis (taste library + matrix) before
  building the skill itself.

## Pipeline

1. **Fetch** (done): all 45 posts via fxtwitter API → `references/media/<author>-<id>/`
   (photos, videos, frames_N/ dirs). 44/45 have media; alaymanguy post is a
   text-only resource tip.
2. **Analyze** (running): workflow `taste-library-analysis` — one agent per
   post → `references/posts/<slug>.md` (layout, card anatomy, type/color,
   graphic language, motion timeline, why-saved, extractable rules) +
   structured summary for the matrix.
3. **Synthesize**: cross-post matrix — style families, axes (mode, radius,
   density, borders, color strategy, illustration language, motion grammar),
   named patterns with reference pointers. CHECKPOINT: owner reviews.
4. **Build skill**: SKILL.md + references/{matrix,families,motion,questions}…
   modeled on the refetch-design skill anatomy (SKILL.md + formula/locks/recipes),
   but generalized: the question flow produces a per-project lock file instead
   of having pre-locked answers.

## Prior art

- `/Users/stian/Larsen Utvikling/prosjekter/Refetch/refetch-website/.claude/skills/refetch-design`
  — anatomy to imitate: SKILL.md (contract) + references read in order +
  output checklist.
- Refetch process learnings: measured values not adjectives; categories as
  blend percentages (80/15/5); one question locks one step; save plan to
  markdown before executing.
- LexnLin (example 1 author) builds "taste-skill" — github.com/Leonxlnx/taste-skill,
  tasteskill.dev. Check before designing the skill.

## Status

- [x] Scoping questions answered (Q1-Q4)
- [x] Fetch all 45 posts + media + frames
- [x] 45 per-post analyses (workflow wf_77977070-c39, 45/45 ok) → `references/posts/`
- [x] `references/_index.json` + `references/matrix.md`
- [x] Synthesis: 5 dimension docs + style families (workflow wf_c85f223d-c50, 5/5 ok)
- [x] Checkpoint 01 approved by owner (analysis + skill design + repo-only install)
      — report artifact: https://claude.ai/code/artifact/c0dc4a55-4998-40d8-a6eb-861c505b820a
- [x] Skill built: `drawn-to/` (SKILL.md + question-flow.md + 6 reference docs + 45 posts)
- [x] Validation: skill-reviewer ("pass with fixes") + 2 dry-runs — both executed
      end-to-end; light run correctly caught the F6×F1 clash
- [x] All validation findings fixed: inheritance rule 5 disambiguated (weighted
      agreement + fork test), slug scheme unified (4/7-digit convention, prefix-glob
      lookup), F1-F8 prefixes in style-families headings, layout grammars A-D
      disambiguated from families, generic clash-resolution + mode-conflict rule,
      F6+F2 pairing added, conditional axes fire at any weight, AX12 copy-voice
      axis, Q0 gains target-path/feature-list/section-inventory/copy-language,
      weights-must-sum-100, dry-run provision
- [x] DONE 2026-08-20. Skill: `drawn-to/` (repo-only install per owner choice)
- [x] Round 2 (owner feedback): discovery.md (repo recon + facts-vs-design-state
      trust model with adopt/keep/scratch question), recipes.md (31 section
      variants, 9 kinds), production-formula.md (harvested from refetch-design:
      7 famous sites measured), AX13-AX15 (page architecture, nav, buttons) +
      Qf delivery phasing, QS section-variant stage, visual-evidence policy
      (media = local ground truth, patterns not templates)
- [x] Round 3: scroll-scrub.md — the refetch hero-stage pattern reverse-engineered
      from the shipped code (registered-property poses, one keyframe track, three
      drivers, sticky-run geometry, svh mobile playbook, fallback ladder); wired
      into AX7, recipes.md hero variant "Scrubbed Product Stage", SKILL.md read-order
- [x] Round 4: illustration-ideation.md — per-feature illustration engine from the
      4 local "loved_these_feature_graphics" images (fit-method verb→metaphor→
      hero+evidence, 15-device catalog w/ construction recipes, QI proposal stage,
      HTML/CSS/SVG build guidance); images archived in references/media/
      local-feature-graphics/, analysis in posts/local-feature-graphics.md
- [x] Ref #46 added: flohoeller-2090388141395849340 (minimal hover interactions,
      vector diagrams) — analyzed frame-by-frame, coverage-checked against the
      skill; 7 gaps patched: brand-hued underglow hover, comet arc, vacant slots,
      arch-merge curves + dark-logo/two-density-graph variants (illustration-
      ideation.md), hover-light grammar addendum (motion-grammar.md)
- [x] Round 5: animation-craft.md — distilled from Emil Kowalski's skills repo
      (animate/RECIPES/STANDARDS/emil-design-eng/apple-design read in full):
      frequency gate + purpose naming, tool ladder, property rules, curve trio
      (--ease-out == corpus easeOutQuint), duration tables, Apple spring doctrine
      (damping/response, velocity handoff, momentum projection, rubber-band),
      interruptibility, @starting-style, clip-path toolkit, blur masking, stagger
      30-80ms, never-ship list, debug protocol; wired into SKILL.md + AX7.
      Source clone in scratchpad (not committed).
- [x] Round 5b: animation-recipes.md — the animate skill's 14 component recipes in
      full form (press, popover, tooltip w/ data-instant, modal+backdrop, drawer,
      toast, accordion, stagger, hold-to-confirm, tab clip-indicator, scroll
      reveal, drag-to-dismiss, blur mask, WAAPI), house-adapted + corpus
      cross-refs; linked from animation-craft §Recipes and SKILL.md.
- [x] Round 6: reviewed ChatGPT's parallel build (/Users/stian/Documents/ChatGPT/
      my-taste). Verdict: strong process shell (tests, validator, honest NOT-READY
      report, runtime boundary), empty taste content (7 abstract recipes, 0 hex/px/ms,
      self-referential SRC evidence, no post analyses). Harvested 4 mechanics into
      ours: firmness field (must-have/prefer/open), revisions-never-erase ledger
      protocol, delivery-depth in Q0, honest-handoff-state checklist item. Open
      items: name collision (their global ~/.claude/skills/drawn-to + ~/.codex/
      skills/drawn-to shadows ours — owner decides), optional library-validator
      script idea worth stealing later.
- [x] Round 7: collision resolved — removed ChatGPT's global symlinks
      (~/.claude/skills/drawn-to, ~/.codex/skills/drawn-to; their repo untouched).
      Matrix extended to 47 rows. Built scripts/validate-library.py (frontmatter,
      citation-slug integrity incl. ambiguity, SKILL read-order files, matrix
      consistency, media presence) — first run: 47 posts, 0 errors, 0 warnings.
      Correction prompt for the Codex build handed to owner.
- [x] Round 8 (live A/B test feedback): owner ran both skills on the Latch brief.
      Ours executed the full flow correctly (discovery caught the owner's own
      scaffold generator + token trust question, weighted blends, QI per feature,
      F7/F8 homeless-lock detection, theme-conflict catch) but interviewed in
      internal nomenclature (AX/C/F/QI codes, slugs) — too technical. Added
      "Question phrasing" section to question-flow.md: plain words first, famous
      anchors over slugs, one decision per question, previews for visual choices,
      conflicts resolved-not-re-asked, batched QI recommendations.
- [x] Round 9: isometric-and-light.md — Marcel Kargul set reverse-engineered (4 new
      refs + local Services/CTA saves + six-hero collage + Chatsheet video): Path A
      isometric objects (blueprint line-art + soft-shaded registers, 2:1 construction
      math, textures, Figma→SVG production route) and Path B structured light (7
      reasons shaped gradients read expensive + CSS/SVG recipes). Wired into
      illustration-ideation (register + 2 devices), AX10, SKILL read-order. Library
      = 51 refs.
- [x] Round 10 (owner feedback from the live test): the "tokens vs families" question
      was the wrong frame. Trust model reworked into THREE layers with different
      defaults — product facts (trusted), infrastructure tokens (ADOPT by default,
      map the direction onto them; owner-authored systems always), design state
      (ask build-on/keep/scratch). Added the token-mapping protocol (ground, accent,
      separation, radii, motion, type → existing tokens; add only missing ones,
      section-scoped, listed in the lock file). Plain-language glossary for the
      interview + "no codes in questions" contract rule (Round 10a).
- [x] Round 11 (publish prep): skill moved to skills/drawn-to/ (skills-CLI discovery
      layout), validator path updated; public README (SVG hero dark/light, proof
      composite, families strip, mermaid flow, constants table, case, credits, rights),
      internal notes moved to docs/repo-notes.md; .gitignore (media excluded), MIT
      LICENSE w/ rights note, CI validate workflow, add-reference issue template,
      assets/ (hero-dark/light.svg, families.svg, proof composite, latch shot).
      Pending owner: git init, create GitHub repo Stianlars1/drawn-to, push, first
      `npx skills add` to seed skills.sh telemetry, launch post.
- [x] Round 12 (owner review of the live site): the Emil distillation had the gate and
      the recipes but not the OPPORTUNITY MAP. Added polish-moments.md — element+verb →
      treatment decision rules (transitions.dev), text-effect families + swap contracts
      (animate-text), the law of the state change (no layout shift / no hard swap / no
      silent success), motion tokens, the polish pass; wired into SKILL step 6 + checklist
      + animation-craft. Site fixed: comet rotation origin (fill-box on a symmetric group),
      stats count-up (once, ease-out 1.1s, tabular, reduced-motion → final), copy button
      (reserved width, text swap + icon swap + success colour + stroke-draw check, quiet revert).
- [x] Named: **Drawn To** (`drawn-to`) — chosen over Tell Me (mechanics vs content:
      the name carries the taste corpus, the differentiator; Tell Me lives on as
      the question-flow voice). npm + GitHub checked free 2026-08-20. Folder,
      SKILL name and all references renamed my-taste → drawn-to.
- [x] Round 13 (site rebuilt THROUGH the skill): owner caught that the landing page was
      built delegated (no interview) and had a plate/caption collision. Re-ran the
      skill's own flow on the site: Q0 brief (convince-first), Q1 five locked directions
      (A narrow dark sharp · B wide light pastel · C paper & print · D dark atmosphere ·
      E Vercel-home), Q2 auto-cycle 5 s always (reduced-motion → manual), Q3 cross-fade
      2 px blur 700 ms via View Transitions, Q4 everything morphs / no switcher. Lock
      file rewritten (R0 = superseded delegated version). docs/index.html rebuilt: one
      content model, per-variant token blocks, HERO.a–e + PAGE.a–e running orders,
      View Transitions engine (`?v=x&still` QA, arrow keys), count-up + copy polish kept
      once-per-session. A–E verified in browser; D light field intensified.
