# Brochure PDF goes here

Drop the real Henil Enterprise brochure PDF in this folder as:

```
henil-enterprise-brochure.pdf
```

That's it — no code changes needed. Every "Download Brochure" button on
the site, and the `/brochure` page's Open/Download/Preview actions, all
point at this exact path already (`frontend/src/config/brochure.config.js`).

## Using a different filename or hosting it elsewhere

Set `VITE_BROCHURE_URL` in `frontend/.env` to override the path — either
a different local filename, or a full URL if you'd rather host the PDF
elsewhere entirely (e.g. a Supabase Storage public URL). Optionally set
`VITE_BROCHURE_FILENAME` too, to control what filename appears when a
visitor downloads it (defaults to `Henil-Enterprise-Brochure.pdf`
regardless of the actual file's name on disk or at the configured URL).

## Why there's no placeholder PDF in this folder

No real brochure content was supplied, so none was invented here — a
fake placeholder PDF would misrepresent the company. Until a real file
is added, every brochure button on the site correctly detects its
absence and shows a clear "not yet available" state instead of a
broken or misleading download — see `useBrochureAvailability.js`.
