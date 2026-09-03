# Gallery photos go here

One folder per category, matching exactly what's on the site. Add real
photos using this naming convention — the gallery automatically picks
them up, no code or data-file changes needed:

```
gallery/
├── products/            products-1.jpg, products-2.jpg, ... products-6.jpg
├── factory/              factory-1.jpg  ... factory-6.jpg
├── machinery/            machinery-1.jpg ... machinery-6.jpg
├── cnc/                   cnc-1.jpg ... cnc-6.jpg
├── laser-cutting/         laser-cutting-1.jpg ... laser-cutting-6.jpg
├── bending/               bending-1.jpg ... bending-6.jpg
├── fabrication/           fabrication-1.jpg ... fabrication-6.jpg
├── finished-products/     finished-products-1.jpg ... finished-products-6.jpg
├── packaging/             packaging-1.jpg ... packaging-6.jpg
└── dispatch/              dispatch-1.jpg ... dispatch-6.jpg
```

`.jpg` specifically — the gallery looks for exactly that extension.
(If you'd rather use `.png` or `.webp`, that's a one-line change in
`frontend/src/utils/gallery.js`'s `buildGalleryItems()`, not a rewrite.)

## You don't have to fill every slot

Each category reserves 6 slots by default, but you don't need 6 real
photos to get started — add just `products-1.jpg` and leave the rest
empty. Any slot without a real file automatically shows a clean
placeholder tile instead of a broken image, and upgrades to the real
photo the moment you add it. No "unavailable" state to configure.

## Need more than 6 per category?

Change `IMAGES_PER_CATEGORY` in `frontend/src/config/gallery.config.js` —
one number, applies everywhere (grid, lightbox navigation, category
counts) automatically.

## Why there are no photos here yet

No real photos were supplied, so none were invented — stock or
placeholder photography would misrepresent the actual facility and
products. Every category currently shows honest placeholder tiles
(a category icon, clearly not pretending to be a real photo) until real
photos are added — see `GalleryTile.jsx`.
