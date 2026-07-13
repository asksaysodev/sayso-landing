---
description: Add a new partner/brokerage logo to the landing page social-proof marquees. Processes the raw image (trim, transparent PNG), names it conventionally, sizes it to match the existing logos, and wires it into every logo list.
argument-hint: "[path-to-dropped-logo-image]  (optional — auto-detects a newly added image if omitted)"
---

# Add a Landing Page Logo

Take a raw logo image the user dropped into the repo and get it fully wired into
the site's social-proof sections, matching the exact format, sizing, and style of
the logos already there. The user's mental model is: "I throw the logo in, you do
everything else."

Run all phases in sequence. Only stop to ask the user if something is genuinely
ambiguous (e.g. you cannot tell which brand a logo is, or two images were dropped
and you are unsure which to add).

---

## What "the existing setup" is

- Processed logo assets live in **`public/social-proof/`** as trimmed, transparent
  **RGBA PNGs**, named in **kebab-case** after the brand (e.g. `exp-realty.png`,
  `kw-palo-alto.png`, `maxwell-properties.png`).
- They are rendered in **more than one place**, each with its **own object shape**.
  Always find these by searching, do not assume line numbers:
  ```bash
  git grep -l "social-proof/" -- '*.tsx'
  ```
  The two maintained rotating lists to update are:
  - **`components/landing/HeroWithVideo.tsx`** — homepage hero marquee. Shape:
    `{ name: 'Brand', src: '/social-proof/brand.png' }`
  - **`components/pages/PartnerIntegrationPage/components/PartnerLogoCarousel.tsx`** —
    partner page carousel. Shape: `{ src: '/social-proof/brand.png', alt: 'Brand' }`
  - Do **not** auto-add to `app/export/cta-branding/page.tsx` (a curated subset for a
    marketing export) or `components/landing/CaseStudiesPage.tsx` (specific named case
    studies). Mention them only if the user asks.
- The marquee renders each logo at a **fixed height** (`h-12 md:h-16`, `w-auto`,
  `object-contain`), so consistent visual weight comes from **trimming whitespace**,
  not from resizing. The processing script handles this.

---

## Phase 1 — Locate the dropped image

1. If the user passed a path as `$ARGUMENTS`, use it.
2. Otherwise find newly added images:
   ```bash
   git status --porcelain --untracked-files=all | grep -iE '\.(png|jpe?g|webp)$'
   ```
   Also check the repo root and `public/` for stray images. If exactly one new image
   exists, use it. If several, list them and ask which one(s) to add.
3. **Read the image** (use the Read tool to view it) so you can identify the brand
   and spot anything unusual (a dark/filled-box logo, a photo background, very low
   resolution, etc.).

---

## Phase 2 — Name it conventionally

Pick a kebab-case slug from the brand shown in the logo, consistent with the assets
already in `public/social-proof/`:

- Use the brand's real, correctly spelled name. Example: `harcourts`, `compass`,
  `century-21`.
- Keller Williams variants use the `kw-` prefix, matching `kw-palo-alto`
  (e.g. `kw-executive`, `kw-<office>`).
- Keep it short but unambiguous. `re-max-downtown`, not `remax1`.
- State the chosen slug before processing.

---

## Phase 3 — Process the image

Run the helper script (uses `sharp`, already a project dependency). It flattens onto
white, trims surrounding whitespace, and keys the white background to a transparent
PNG with soft anti-aliased edges, then writes it into `public/social-proof/`:

```bash
node scripts/process-logo.mjs <input-image> <output-slug>
```

Flags:
- `--force` — overwrite an existing asset of the same name.
- `--no-key` — keep an opaque white background (rarely needed; see Phase 4).

The script prints JSON with the output path, dimensions, aspect ratio, and two
**preview strip** paths (all social-proof logos composited on white and on gray).

---

## Phase 4 — Visually verify

**Read both preview images** the script printed (`previewWhite` and `previewGray`):

- On **white** (the real marquee background): the new logo should read cleanly and
  sit at a similar visual weight to the neighbors. This is the source of truth.
- On **gray**: confirms the transparency keyed correctly. Look for **white halos**
  or fringing around edges. If you see halos, the source likely had a colored or
  noisy background, not clean white. Re-run with `--no-key` (keeps it opaque, which
  is fine because the marquee background is white anyway), or ask the user for a
  cleaner source file.

Flag these to the user rather than silently shipping them:
- A **filled-box / dark-background logo** (like the Yvans Cator crest) will show as a
  solid block next to the wordmarks. It is still correctly sized, but note it and
  offer to swap for a transparent/wordmark version if they have one.
- A **near-square or low aspect ratio** logo (the script warns when `aspectRatio < 1.2`)
  renders narrow. Usually fine, just confirm it looks right.
- Obvious **low resolution / blurriness** at marquee height.

---

## Phase 5 — Wire it into the logo lists

Add the new logo to **both** maintained lists (Phase-0 locations), using each file's
own object shape and the correct, well-spelled brand name:

- `HeroWithVideo.tsx`: `{ name: 'Brand Name', src: '/social-proof/<slug>.png' }`
- `PartnerLogoCarousel.tsx`: `{ src: '/social-proof/<slug>.png', alt: 'Brand Name' }`

Placement:
- Append to the end of each array unless the user wants a specific order.
- Keep same-brand logos **non-adjacent** in the loop where it is easy (e.g. don't put
  two Keller Williams logos next to each other).
- Do not touch the marquee duplication logic (`[...logos, ...logos, ...]`) or the
  rendering/styling. Data only.

Follow the repo writing rules for any names/alt text: correct **Sayso** spelling,
**no em dashes**, and use the partner's official brand name.

---

## Phase 6 — Clean up

Delete the original dropped file(s) from wherever they landed so they don't get
committed to the repo root:

```bash
rm -f "<original-dropped-image>"
```

Confirm `git status` shows only: the new `public/social-proof/<slug>.png` and the
edits to the two `.tsx` lists (plus, on the first run, `scripts/process-logo.mjs` and
this command if not yet committed).

---

## Phase 7 — Branch, commit, PR

Follow the repo conventions in `CLAUDE.md`:

1. Work on a branch off `development`, named `feat/add-<brand>-logo`
   (if you are not already on a suitable feature branch — do not branch off another
   active PR branch without asking).
2. Commit with a clear message, e.g.
   `feat: add <Brand> logo to landing page social proof`.
3. Push and open a PR **into `development`** (not `main`). Reviewers: Franco or Lucas.
4. In the PR body, note the new asset, both files updated, and any visual caveat from
   Phase 4 (e.g. "filled-box logo, offered to swap").
5. Give the user the **branch-alias preview URL**
   (`https://sayso-landing-git-<branch>-sayso-web.vercel.app/`) to review, not a
   per-deployment hash URL.

---

## Quick reference

```bash
# 1. process (writes public/social-proof/<slug>.png + preview strips)
node scripts/process-logo.mjs ./dropped-logo.png <slug>
# 2. read the two preview PNGs it prints, verify on white + gray
# 3. add to HeroWithVideo.tsx  -> { name, src }
#    add to PartnerLogoCarousel.tsx -> { src, alt }
# 4. rm the original drop, commit, PR into development
```
