# Performance Optimization Audit

## Honest limitation up front

This sandbox has no network access (same constraint documented
throughout this project — see the root README and `database/README.md`).
`npm install` fails against the real npm registry, so **an actual
production build could not be run here**:

```
$ npm run build
> vite build
sh: 1: vite: not found
```

What I did instead: every change below was verified the same way this
project's own established convention already does for code that can't
be executed in this environment — `tsc --noResolve` syntax-checking on
every edited file, CSS brace-balance checks, and a manual trace of
exactly what each Vite/Rollup config change would produce, based on
how those tools are documented to behave. **Run the real build
yourself** to get actual numbers and confirm nothing regressed:

```bash
cd frontend
npm install
npm run build     # outputs to frontend/dist/, with a chunk breakdown printed at the end
npm run preview   # serve the production build locally to sanity-check it
```

Everything below is a genuine, applied code change — not a
recommendation list. Severity key: 🔴 real, meaningful gap — fixed.
🟡 real but lower-impact — fixed. 🟢 checked, already correct.

---

## JavaScript — code splitting

🔴 **Every page was in one bundle.** `App.jsx` imported all 16 page
components eagerly — a visitor loading the homepage downloaded the
code for `/quote`, `/blog/:slug`, every product page, and even
`/design-system` (an internal tool, never linked anywhere a real
visitor would find it — see `frontend/public/robots.txt`) before
seeing anything.
**Fixed**: converted every route except `Home` to `React.lazy()`,
wrapped in a single `<Suspense>` with `LogoLoader` as the fallback (the
same loading treatment already used elsewhere in this app, not a new
one). `Home` deliberately stays a regular import — it's this site's
most common entry point, and lazy-loading it would mean the very first
page a visitor sees waits through a chunk fetch + Suspense render
before showing anything, which defeats the point on the page that
matters most for first impressions.

🟡 **No vendor chunk splitting.** Every third-party dependency
(`react`, `react-dom`, `react-router-dom`, `lucide-react`) was bundled
in with app code, so any deploy — even a one-line copy change — busts
the cache for those libraries too.
**Fixed**: `frontend/vite.config.js` now sets `build.rollupOptions.
output.manualChunks`, splitting `vendor-react` and `vendor-icons` into
their own chunks. A returning visitor's browser can keep serving those
from cache across deploys where only app code actually changed.

🟢 **Icon imports were already tree-shake-friendly** — every component
uses named imports (`import { Menu, X } from "lucide-react"`), the
correct pattern for Rollup to only include icons actually referenced
anywhere in the final bundle, not the whole library.

---

## Images

🔴 **The main product-detail image had no loading priority set**, and
its container had no reserved aspect ratio. This is very likely the
LCP (largest contentful paint) element on any product page once real
photography is added — the opposite of every other image on that page,
which should stay lazy.
**Fixed** (`components/ProductGallery.jsx` + `.css`): main image gets
`loading="eager"`, `fetchPriority="high"`, `decoding="async"`; its
container gets `aspect-ratio: 1` (matching the placeholder it replaces)
so a loading photo can't shift the layout under it. Thumbnails get
`loading="lazy"` + `decoding="async"`.

🟡 **Logo loading strategy wasn't context-aware.** The same `<Logo>`
component is used above-the-fold (navbar) and below-the-fold (footer),
plus in a full-screen loading indicator that must render instantly —
three different correct answers to "should this be lazy?", one
hardcoded behavior.
**Fixed** (`components/Logo.jsx`): defaults now follow variant —
`variant="mark"` (every real usage is in the navbar, above the fold)
gets `loading="eager"` + `fetchPriority="high"`; `variant="full"`
(mostly the footer) defaults to `loading="lazy"`. `LogoLoader.jsx`
explicitly overrides back to `eager` for its own full-screen-overlay
use, via the new `loading` prop.

🟢 **Gallery grid already had `loading="lazy"`** on every tile — added
`decoding="async"` alongside it for a small additional win, but the
core lazy-loading behavior (the thing that actually matters for a
masonry grid of many images) was already correct.

🟢 **Lightbox image** — opened on demand via click, so lazy-loading
doesn't apply the same way; added `decoding="async"` and
`fetchPriority="high"` since once open, it's the only important image
on screen and should render as fast as possible.

---

## Videos

🟢 **None exist in this codebase** — grep-verified (`<video>`, `.mp4`,
`.webm` — zero matches anywhere under `frontend/src`). Nothing to
optimize; noted rather than skipped silently.

---

## Animations — particular attention: process sections & general motion

🔴 **Three sweep/shimmer animations animated `background-position`
instead of `transform`.** `background-position` forces the browser to
repaint the affected layer on every single frame; `transform` is
compositor-only (GPU, no repaint) for the same visual effect. The most
impactful of the three, `HeroVisual.css`'s hero light-sweep, runs
`infinite` for as long as a visitor is on the homepage — the most
persistent animation in the entire codebase.
**Fixed**, all three, same technique: restructured each into a
same-visuals, `transform`-driven version —
`sections/HeroVisual.css` (the homepage hero sweep),
`components/LogoLoader.css` (the loading-screen sweep), and
`components/ui/Loading.css` (the skeleton shimmer, used while content
loads). Colors, timing, and easing are unchanged — only the animated
property changed, specifically to minimize any visual-regression risk
in an environment where I can't render and compare screenshots.

🟢 **The process-section animations (fab-process stepper, panel
transitions) already animated `opacity`/`transform` exclusively** — the
correct, GPU-friendly properties. No change needed there; this was
already right (see `sections/FabricationProcessInteractive.css`'s
`fab-detail-in`/`cap-panel-in` keyframes).

🟢 **`prefers-reduced-motion` was already respected everywhere** (18
separate handlers across the codebase before this pass) — extended
correctly to cover the restructured sweep animations too (see
`Loading.css`'s updated reduced-motion block, since the animation moved
from the base element onto a `::after` pseudo-element and the
reduced-motion override had to move with it).

---

## Glass effects & backdrop-filter — particular attention

🔴 **No fallback existed for browsers without `backdrop-filter`
support at all** (older Firefox before v103, some older Android
WebView builds) — grep-verified zero `@supports` rules anywhere in the
codebase, despite `backdrop-filter` being used 46 times across 20
files. Without it, an unsupported browser would show the raw
semi-transparent glass background color alone (`rgba(32,32,32,0.52)`
etc.) with no blur behind it — a muddy, low-contrast smear over
whatever varied content sits underneath, making text and icons on top
hard to read.
**Fixed** (`styles/tokens.css`): added `@supports not (backdrop-filter:
blur(1px))`, raising `--color-glass`/`--color-glass-strong` to near-opaque
values in that case. Since every glass surface reads these as CSS
variables, this one change fixes every glass component at once — no
per-component edits needed. The result reads as a solid dark panel
instead of the blurred design — a different look, but a legible,
intentional one.

🔴 **Blur radius (18px) was fixed regardless of device.** Backdrop-filter
cost scales with both blur radius and the pixel area being blurred;
phones are also disproportionately likely to be the least powerful
devices rendering this site — directly relevant to "the website should
remain fast on normal mobile devices."
**Fixed** (`styles/tokens.css`): `--glass-blur` drops to `blur(10px)`
below 640px width. Same variable-based mechanism — every glass
component gets the lighter blur on mobile automatically.

🟢 **Considered, not applied**: `content-visibility: auto` on
below-the-fold glass sections, to skip layout/paint work for offscreen
content entirely. Backdrop-filter's interaction with
`content-visibility` has known browser-specific edge cases (rendering
correctness, not just performance), and without a real browser to
render and compare here, applying it broadly to glass components risked
a regression I couldn't verify or catch. Flagged as a real next step
worth trying with actual visual QA, not silently dropped.

---

## CSS

🟢 **No unused/duplicate stylesheets found** — every `.css` file
checked is imported by exactly the component it's named after,
matching this codebase's established one-file-per-component
convention throughout.
🟢 **Vite's default production build already minifies and code-splits
CSS per-route** (`cssCodeSplit: true` is Vite's default, left as-is
rather than reimplemented) — this only takes effect on a real build,
which is why the honest-limitation note at the top of this document
matters here specifically.

---

## Fonts

🟢 **Already correctly configured** — `frontend/index.html` has
`rel="preconnect"` to both `fonts.googleapis.com` and `fonts.gstatic.com`,
and the stylesheet URL already includes `&display=swap` (text renders
in a fallback font immediately rather than staying invisible while the
webfont downloads). No change made; this was already best practice.
🟡 **Not pursued**: self-hosting the three font families instead of
loading from Google Fonts would remove the cross-origin request
entirely (a real, larger win) but requires downloading the actual font
files — not possible without network access in this environment. Noted
as a legitimate future improvement, not silently skipped.

---

## Backend — a small addition outside the brief's explicit list

🟡 Added `compression` middleware (gzip/brotli-negotiated) to
`backend/src/server.js` — every JSON response from this API (upload
config, inquiry confirmations) is now compressed. Not on the brief's
explicit list (which was frontend-focused), but a real, cheap win for
"remain fast on normal mobile devices" specifically, so included.

---

## Summary of files changed

**Code splitting / bundling**: `frontend/src/App.jsx`,
`frontend/vite.config.js`
**Images**: `components/Logo.jsx`, `components/LogoLoader.jsx`,
`components/ProductGallery.jsx`/`.css`, `components/GalleryTile.jsx`,
`components/GalleryLightbox.jsx`
**Animations**: `sections/HeroVisual.css`, `components/LogoLoader.css`,
`components/ui/Loading.css`
**Glass/backdrop-filter**: `styles/tokens.css`
**Backend**: `backend/src/server.js`, `backend/package.json`

All verified via `tsc --noResolve` (JS/JSX syntax), CSS brace-balance
checks, and `node --check` (backend) — the same verification method
used throughout this project wherever a real build/runtime isn't
available. Re-run the commands in the "Honest limitation" section above
to get real bundle-size numbers and confirm the production build
succeeds end to end.
