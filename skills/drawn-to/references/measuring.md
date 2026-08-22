# Measuring - how to read a value off a capture without inventing it

Why this file exists: on 2026-08-22 an adversarial pass re-measured five
reference analyses and overturned roughly thirty numbers. Not one of them was a
careless reading. All of them came from **six repeatable procedural errors**,
each of which produces a confident, plausible, wrong figure. The corrected
values are in the reference posts; this file is how not to generate the next
batch.

This matters more than it sounds. A wrong number in a reference doc does not
sit quietly - it gets typed into a build, and the build looks subtly off in a
way nobody can name.

---

## The provenance tiers - stamp every value you write

| Tier | Meaning | How to write it |
|---|---|---|
| **A** | Re-measured and confirmed by an independent adversarial pass | Plain absolute values, no hedge |
| **B** | Single measurement, but the capture scale was solved from metadata or a structural invariant, and a sibling reference corroborates the mechanism | Value + slug; safe to build from |
| **C** | Single measurement, scale never solved (video-player capture, unstated DPR) | **Ratios, percentages and FRAME counts only.** Never absolute CSS px. Suffix `(unverified)` |
| **D** | Refuted | Never write it down at all |

A doc that mixes tiers without saying so is worse than a doc with fewer numbers.

---

## The six errors, and the procedure that prevents each

### 1. Quoting CSS px off an unsolved scale

Three of five analyses did this. The fix is to **solve the scale first, from a
structural invariant**, and state the residual:

- a 6-column grid whose gutter-to-card ratio is fixed;
- a container whose width lands on a round `max-width`;
- a known type size, a known icon size, a known border.

Then **sanity-check the solution against round CSS values**. One board's ratios
fit a 1152 px container with a 16 px gap to 0.02 %, while the analyst's derived
1118 px produced gutter 15.40, hub tile 48.61 and radius 13.68 - three numbers
nobody has ever typed. If your solved scale yields values a human would not
author, the scale is wrong, not the designer.

### 2. Not checking what the capture actually is

Two of five captures were **screen recordings of a video player** - player
chrome visible in the first and last frames, a timestamp reading "0:01 / 0:28".
That makes both absolute px and frame rate underivable. One analysis derived
30.07 fps and then produced a 3.75 s revolution, a 1.87 s carousel step, a
610-790 CSS px/s pulse velocity and a 0.28 s pulse interval. The real fps range
was [30.0, 32.3] and every one of those figures was wrong.

**Report motion in FRAMES.** Give fps as a range or not at all.

### 3. Reading hue below the chroma floor

Hue in a 4:2:0 JPEG is noise below **chroma 12**. This single error produced
three separate "multi-stop hue journey" findings; one claimed 109-degree hue
path measured 34 degrees once gated, i.e. an ordinary two-stop ramp in a single
colour family. **Gate every hue reading at C >= 12** and say that you did.

### 4. Measuring grain in a window that has content in it

A 44 x 44 window returning 0.00 on clean ground returned **15.05** slid over a
headline. Windows containing type or UI inflated grain by 12x to 60x across the
pass. **Find the window by a minimum-sigma sliding search first**, then measure,
then state where the window was.

Related and equally important: **never audit grain or banding from a JPEG at
all.** Progressive 4:2:0 with luma AC quantisation steps of 10-15 quantises
grain under about four levels to zero, so a source carrying 1.5 % grain arrives
reading 0.2 sigma. One "49 px banding staircase" turned out to be DCT-grid
locked (edge-phase peak/mean 3.11 against 1.30 for a genuinely fine ramp). Read
the DQT and SOF, and write **"not measurable from this file"**.

### 5. Taking the mean over a glyph instead of the peak inside a stroke

The mean over a glyph includes its antialiased edges and reads about two steps
dark. **Take text ink from the peak inside a thick stroke.** For sub-pixel
strokes, integrate the ink across the AA profile and divide by the scale rather
than sampling the centre.

### 6. Naming a gradient's direction from one axis

Two of three CTA-pill gradients on one sheet were reported horizontal and are
vertical (#9EA3FF -> #5C63F6 over 16 px; #A9ADED -> #6268F4), because the
analyst sampled a horizontal line that happened to run through the label text.
**Sample both axes before naming a direction**, and quote the delta on each.

---

## Two more habits worth the same status

**Write "not measurable from these frames".** Never backfill a plausible
duration, easing or radius into a spec from a still. A gap in a doc is
recoverable; a fabricated value is not, because nothing downstream will question
it.

**Distrust a suspiciously clean derived number.** If a measurement chain ends at
"radius 13.68 px", the chain is wrong somewhere. Real designs are authored in
round numbers and round percentages; measurement noise should show up as a
residual against a round value, not as the value itself.

---

## The read-back, before a value leaves your hands

1. Which tier is this?
2. Was the scale solved, and against what invariant, and what was the residual?
3. Is the capture a screenshot, a video frame, or a recording of a player?
4. If it is a colour claim: gated at C >= 12? sampled on both axes?
5. If it is a grain or banding claim: is the file a JPEG? (then do not make it)
6. If it is a timing claim: frames, or seconds derived from a known fps?
7. Would a designer have typed this number?

Cited from `SKILL.md` § Working rules ("Look before you build") and from
`quality-bar.md` § 4 step 4, where reference comparison happens.
