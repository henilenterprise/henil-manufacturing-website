# Mobile Optimization Audit

**Update**: the floating WhatsApp button described throughout this
document as "bottom-left" was moved to **bottom-right** in a later
change, on direct request. Every structural point below (single
canonical entry point, raised state to avoid `MobileStickyCTA`,
breakpoint-synced transitions) still applies identically — only the
left/right corner changed, via `flex-direction: row-reverse` and
swapping `left`/`right` in `components/FloatingWhatsAppButton.css`.

Tested against 360px, 375px, 390px, 412px, 768px, 1024px, and 1440px.
This sandbox has no browser to actually screenshot at each width (same
constraint noted throughout this project — see the root README), so
"tested" means: every relevant CSS file was read against the real
breakpoints in play at each of the seven widths (this codebase is
mobile-first with `min-width` breakpoints at 640/720/900/960/1024/1080/1280
— see `styles/tokens.css` and the grep summary below), computed by hand
against real content (actual button labels, actual container padding,
actual font sizes) rather than assumed, and cross-checked for the
specific failure modes the brief named: horizontal scroll, overlapping
cards, tiny text, broken animation, cut-off buttons, overflow.

**Breakpoints active at each tested width** (mobile-first `min-width`,
so a width satisfies every breakpoint at or below it):

| Width | Active breakpoints |
|---|---|
| 360 / 375 / 390 / 412px | none — base/mobile styles only |
| 768px | 640, 720 |
| 1024px | 640, 720, 900, 960, 1024 |
| 1440px | 640, 720, 900, 960, 1024, 1080, 1280 |

---

## Fixed this pass

### 🔴 Process animation — active step could scroll off-screen with no visual trace
`FabricationProcessInteractive` ("How It Works") auto-advances through 6
steps every 4 seconds. The step row (`.fab-process__stepper`) is a
`display:flex; overflow-x:auto` container — correct for mobile, since 6
steps at 108px each (648px) don't fit in a 360-412px viewport — but
nothing ever scrolled the newly-active step into view. Left alone on a
phone, the highlighted step would auto-advance rightward every 4
seconds until it scrolled completely out of the visible area, at which
point the section looks static/broken even though the animation is
still running underneath.
**Fixed**: `sections/FabricationProcessInteractive.jsx` now calls
`scrollIntoView({ inline: "center" })` on every step change (auto or
manual), respecting `prefers-reduced-motion` (falls back to instant
`behavior: "auto"` scrolling, matching every other animation in this
codebase's existing discipline around that media query).

### 🔴 Two WhatsApp buttons visible at once on product pages
On `/products/:slug` below 1024px, `FloatingWhatsAppButton` (raised to
avoid the bar below it) and `MobileStickyCTA`'s own embedded WhatsApp
icon were both on screen simultaneously — two bottom-left-ish WhatsApp
entry points at the same time, and the second one was eating width
that "Get a Quote" (the button the brief specifically says must stay
easily accessible) could otherwise use.
**Fixed**: removed the duplicate icon from `MobileStickyCTA` — see
`components/MobileStickyCTA.jsx`. `FloatingWhatsAppButton` remains the
single, consistent WhatsApp entry point everywhere, including product
pages; "Get a Quote" now gets the bar's full width.

### 🟡 Product thumbnail row could distort instead of overflow
`.product-gallery__thumbs` (the small image-picker row on a product
detail page) had no `overflow-x` and no `flex-shrink: 0` — with more
than ~4 images at a 360-412px width, the default `flex-shrink: 1`
would compress each 64×64px thumbnail's *width* while its *height*
stayed fixed, visually squishing square thumbnails into narrow
rectangles rather than either fitting or scrolling.
**Fixed**: applied the same horizontally-scrollable pattern already
proven elsewhere in this codebase (gallery chips, capability tabs) —
`overflow-x: auto` + `flex-shrink: 0` in `components/ProductGallery.css`.

### 🟡 Gallery lightbox caption had no width limit
`.gallery-lightbox__caption` is centered via `left: 50%; transform:
translateX(-50%)` with no `max-width` — a long caption (a product name
plus category) could grow wide enough to extend past a 360px viewport's
edges on both sides equally, since centering doesn't constrain width.
**Fixed**: added `max-width: calc(100vw - 40px)` and `text-align:
center` in `components/GalleryLightbox.css`.

### 🟢 Polish: momentum scrolling + snap on every horizontal scroller
Applied `scroll-snap-type: x proximity` / `scroll-snap-align: start` /
`-webkit-overflow-scrolling: touch` consistently across every
horizontally-scrollable row in the site: the process stepper, gallery
filter chips, products filter chips, and capability tabs. Not a bug
fix — these already worked (contained scrolling, no page-level
overflow) — but this makes them feel native on a touch screen instead
of just technically scrollable, and gives each item a clean resting
position instead of stopping mid-item.

---

## Checked, no issue found

### Navbar
Below 1024px only the brand (logo + wordmark, `white-space: nowrap`)
and the burger button show — links and the desktop CTA are hidden
(`display: none`) until 1024px. Computed by hand at 360px: bar width
`min(1100px, 100vw - 32px)` = 328px, minus 40px padding = 288px content
width; brand (~34px logo + 12px gap + ~155-170px wordmark text at 15px
with 0.05em letter-spacing) + 40px burger ≈ 255-265px — fits with
25-33px to spare. The mobile menu itself is a full-screen panel with
20px links and 52px-min-height touch targets throughout (WhatsApp,
brochure, CTA) — well above the 44px minimum touch-target guideline.
At 1024px+, the desktop bar (links + icon actions + CTA button) is
unchanged from before this audit and was already laid out with
`flex-shrink: 0` on every fixed element.

### Hero
Single-column below 960px (copy stacks above `HeroVisual`), two-column
1.1fr/0.9fr at 960px+. Title uses `clamp(32px, 5.4vw, 56px)` — never
drops below 32px even at 360px. `HeroVisual` is `max-width: 440px;
width: 100%` with `aspect-ratio: 1`, so it scales down cleanly with no
overflow risk at any width, and its internal animations (breathing
scale, laser sweep) are CSS transforms scoped to the SVG's own
coordinate system, not raw viewport pixels, so they scale correctly
with the container rather than breaking at small sizes.

### Products (grid + toolbar)
Grid: 1 column (base) → 2 (640px) → 3 (960px) → 4 (1280px) — so at
exactly 1024px the grid is already 3-column (960px breakpoint is
active), and 1440px is 4-column. No gap or awkward single-column state
at any tested width. Filter chips row already used the scrollable-row
pattern (now also snap-polished, see above); search input is `flex: 1`
and the sort `<select>` is `width: 100%` — neither has a fixed pixel
width that could overflow.

### Quote form
`.quote-step__grid` is single-column below 640px, 2-column at 640px+ —
every field stacks cleanly on a phone. `.quote-step__title` uses
`clamp(20px, 2.6vw, 26px)`, never tiny. The review step's field labels
and values (`.review-row`) use `word-break: break-word` specifically so
a long email address or company name can't force horizontal overflow.
The final submit button and the Back/Next nav buttons are checked
against real label lengths ("Back", "Next") in a `justify-content:
space-between` row — comfortably short, no truncation risk — and the
review screen's submit button is `width: 100%`.

### Drawing upload
The dropzone (`.drawing-upload__dropzone`) has no fixed width, scales
via `padding` and the parent container; the hidden native file input
covers the full dropzone (`inset: 0`) so the entire tap target works,
not just a small icon. Both the dropzone's own file list and
`StepFile`'s "attached to this inquiry" list truncate long filenames
with `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`
inside a `flex: 1` name span next to a `flex-shrink: 0` remove button —
a long filename can never push the remove button off-screen.

### Gallery
Masonry grid via CSS columns: 2 (base) → 3 (640px) → 4 (1080px). At
360px, two columns of roughly 152px each — tight but every image
scales via `width: 100%; height: auto`, no overflow. Lightbox nav
arrows shrink from 48px to 40px and move closer to the edge (16px → 8px)
below 640px specifically so they don't crowd a narrow image; the
toolbar (counter + icon actions) fits comfortably at 360px width by
the same kind of hand-computed check as the navbar above.

### Capabilities
Tabs use the same scrollable-row pattern (now snap-polished). The
detail panel (`.cap-explorer__top`) is single-column below 900px, so
icon/title/description stack vertically with no risk of the icon and
text competing for space at 360-412px.

### WhatsApp button — confirmed it stays bottom-left, and confirmed no
handoff gap
`.floating-whatsapp` is `position: fixed; left: 20px; bottom: 20px`
(→ `28px`/`28px` at 960px+) at every tested width — never moves to the
right or top at any breakpoint. On product pages specifically, it's
raised to `bottom: 120px` below 1024px (to clear `MobileStickyCTA`,
which sits at the true bottom edge there) and drops back to `bottom:
28px` at exactly 1024px — the same breakpoint `MobileStickyCTA` uses to
hide itself and `StickyInquiryPanel` (desktop) uses to appear. All
three transitions happen at the identical `min-width: 1024px` value, so
there's no width at which "Get a Quote" access disappears or the
WhatsApp button is left awkwardly positioned mid-transition.

### Get Quote button — confirmed always reachable
Three separate mechanisms cover every width with no gap between them:
`HeroSection`'s inline button (desktop and mobile alike, part of normal
page flow), `MobileStickyCTA`'s full-width fixed bar below 1024px on
product pages specifically, and `StickyInquiryPanel` (desktop sidebar)
at 1024px+ on the same pages. Verified the exact breakpoint each uses
to show/hide — all `min-width: 1024px`, matching the WhatsApp button
transition above.

### Footer
Single-column (`flex-direction: column`) below 640px, becomes a row
(`justify-content: space-between`) at 640px+. Nav links use `flex-wrap:
wrap` with generous gap, so they reflow naturally rather than
overflowing at any tested width.

### General overflow safety net
`body { overflow-x: hidden }` is already set globally
(`index.css`), and every section-level container goes through
`.container { max-width: var(--content-max); padding-inline:
var(--content-pad) }` where `--content-pad` is `clamp(20px, 5vw, 56px)`
— meaning side padding scales down toward 20px on narrow phones rather
than staying a fixed larger value that would eat into already-tight
content width. No component anywhere in this codebase sets a fixed
pixel `width` wider than what fits inside that padding at 360px (grep-
verified: no bare `width: 3` through `width: 9` hundred-plus px values
outside of intentionally-capped `max-width` contexts like the gallery
lightbox stage or hero visual, both of which are themselves
`width: 100%` with a `max-width` ceiling, not a fixed floor).

### "Overlapping glass cards"
Grep'd every stylesheet for negative-offset positioning
(`margin-top/bottom/left: -…`, `top/bottom/left/right: -…`) — the only
instances found are small (10-12px) decorative badge/underline offsets
on `HeroVisual`'s corner badges, `MainNav`'s active-link underline, and
`ProductsExplorer`'s "Featured" ribbon — none of them span far enough
to overlap adjacent content at any tested width, and all are relative
to their own small parent, not the viewport. No component stacks two
`GlassPanel`/`GlassCard` elements with absolute positioning against
each other anywhere in this codebase.

---

## What "create mobile-specific layouts when necessary" resulted in

Most of this codebase already had that: single-column grids below
640-960px thresholds throughout, a genuinely separate mobile nav
(full-screen panel, not a squeezed desktop bar), and a
phone-only fixed bottom CTA bar (`MobileStickyCTA`) distinct from the
desktop sidebar (`StickyInquiryPanel`) — not a css-hidden version of
the same markup, an actually different component for each. This audit
didn't need to introduce a new mobile-specific layout from scratch;
what it found were gaps in components that already had the right
*structural* approach (scrollable rows, stacking grids) but were
missing a piece of the mobile-specific behavior that structure implies
— scroll-into-view for the auto-advancing stepper, `overflow-x` for the
thumbnail row, a width cap for the centered caption.
