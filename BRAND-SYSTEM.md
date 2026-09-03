# Henil Enterprise — Brand System

Derived directly from the real company brochure
(`Henil-Enterprise-Company-Brochure.pdf`), sampled pixel-by-pixel from
the rendered pages (not eyeballed) so every color below traces back to
the actual printed artwork the company already hands to customers.

## Brochure analysis

**Dominant colors** (sampled from the brochure's rendered pages)
| Role | Hex | Sampled as |
|---|---|---|
| Page background | `#FFFFFF` | Clean white print stock — the dominant color on almost every page. |
| Alternating section tint | `#F6F5F1` | Warm off-white/cream, used on "About", "Materials", and other alternating sections. |
| Illustration fill | `#E1EEEC` | Pale mint, used to fill the acrylic/polycarbonate line-art icons. |
| Brand teal | `#0B6E76` | The single most common saturated color in the file — used for the eyebrow rule under headings, small-caps labels, icon strokes, and the timeline dots. |
| Deep teal (dark sections) | `#083E44` | Full-bleed dark section backgrounds (Capabilities, "Why Henil", "Get in Touch" pages). |
| Heading/body ink | `#23262A` | Near-black, slightly cool — all headline and body copy. |
| Secondary/caption text | `#767B80` | Supporting copy, captions, footnotes. |
| Hairline border | `#E3E4E6` | Card borders and dividers throughout. |

**Contrast**
The brochure is built for a bright, print-shop-clean read: near-white
pages, near-black text, and a single confident teal accent — not a
moody or dramatic palette. That's the opposite direction from a dark
luxury theme, and it's a deliberate signal: this is a working
industrial-fabrication supplier's collateral, not a jewelry or
hospitality brand.

**Shape motif**
The brochure's recurring graphic is a pair of stacked, offset sheets
(an exploded isometric view of two plates — acrylic over polycarbonate)
used on the cover and throughout the "Materials"/"Products" pages. The
new mark borrows that stacked-plate idea in a simplified diamond form.

**Typography**
Bold, modern sans-serif headings (no serif anywhere in the brochure) —
tight, confident, procurement-facing. Small-caps, letter-spaced teal
labels ("SINCE 2007", "TIMELINE", section numbers like "03 / CAPABILITIES")
do the same job the old mono-type eyebrow labels did in the previous
theme, just in the brochure's own voice.

## Resulting website palette

The token system (`frontend/src/styles/tokens.css`) now derives
directly from the sampled values above, holding the teal's hue (~186°)
constant across every shade so nothing in the UI clashes with the real
brochure:

| Token | Hex | Source |
|---|---|---|
| `--color-bg` | `#ffffff` | exact match to brochure page white |
| `--color-surface` | `#f6f5f1` | exact match to brochure's alternating cream section |
| `--color-surface-tint` | `#e1eeec` | exact match to brochure's mint illustration fill |
| `--color-accent` | `#0b6e76` | exact match to brochure teal |
| `--color-accent-bright` | `#12878f` | same hue, brightened for hover/highlight states |
| `--color-accent-deep` | `#083e44` | exact match to brochure's dark full-bleed sections |
| `--color-text-primary` | `#23262a` | exact match to brochure heading/body ink |

Headings switched from a serif display face to a bold sans (`Manrope`/`Inter`)
to match the brochure's typography instead of the earlier luxury-serif
direction.

## Logo

The old two-tone gold-on-black jewelry-style mark didn't match this
palette or the brochure's plain-spoken industrial tone, so it's been
replaced with a new vector mark built for this brand system:

- **`logo-mark.svg`** — a bold teal diamond (echoing the brochure's
  stacked-plate motif) with a solid geometric "H", built from simple
  filled shapes rather than fine linework so it stays crisp and legible
  all the way down to a 16px favicon (the old mark's thin double
  outline blurred at that size — see the retired limitation below).
- **`logo-full.svg`** — the mark plus a site-typeset "HENIL" (bold) /
  "ENTERPRISE" (smaller, letter-spaced) wordmark, in the brochure's ink
  and teal.

Both are real vector files with a transparent background, so they drop
onto any surface in this theme — navbar, footer, loading screen,
favicon — with no background tile or color-matching workaround needed
(the previous flat-JPG source required wrapping every placement in a
`#161616`-matched tile to hide its baked-in background; that workaround
no longer exists in `Logo.css`).

## Usage rules

- Don't recolor, recreate, or redraw the mark by eye — edit the two SVG source files directly if a change is needed, keeping the sampled hex values above.
- Don't stretch — the `Logo` component always renders at a fixed height with `width: auto` to preserve the aspect ratio.
- The mark works on light and dark surfaces alike (it's a solid teal shape, not a light-on-dark cutout), but the wordmark's ink color (`#23262A`) assumes a light background — use `logo-mark` alone on the deep-teal (`--color-accent-deep`) sections rather than `logo-full`.
