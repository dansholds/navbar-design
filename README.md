# navbar.design

The [navbar.design](https://navbar.design) gallery, rebuilt as a static Next.js site for Vercel. Every URL from the
Framer site is kept 1:1 (same paths, no trailing slashes, same sitemap), so existing links and search rankings carry over.

## Stack

- Next.js (App Router), fully static: every page is prerendered at build time, no server code at runtime.
- Plain CSS modules, Google Fonts (Fragment Mono + Geist) self-hosted by `next/font` at build time.
- Images live in `public/images` and are served through Next.js image optimisation.
- Analytics: the existing Databuddy script in `app/layout.tsx`.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also run by Vercel)
npm run lint
```

## Deploying to Vercel

1. Import the repo in Vercel, framework preset "Next.js", no custom settings needed.
2. Add the environment variable `NEXT_PUBLIC_TALLY_FORM_ID` (see below).
3. Add the domain `navbar.design` and `www.navbar.design` in the Vercel project. Set `navbar.design` as the primary
   domain so `www` redirects to the apex, matching the old setup.
4. Point DNS at Vercel and remove the Framer site once it is live.

## Submissions (Tally)

The `/submit` form is a Tally embed. In Tally, create a form with a "Link" (URL) field and a "Your email" field,
set its *Redirect on completion* to `https://navbar.design/thank-you`, then copy the form ID from the share URL
(`https://tally.so/r/<FORM_ID>`) into `NEXT_PUBLIC_TALLY_FORM_ID` (Vercel env var, or `.env.local` locally).
Without the variable the form is shown greyed out with a "Submissions are currently offline" notice.

## Adding a navbar

Content is plain JSON, no CMS:

1. Add the screenshot to `public/images/navbars/<slug>.png` (16:9, 1920x1080 or larger).
2. Add an entry to the **top** of `content/navbars.json` (the list is newest first; it drives the grids, the
   "Latest Navbars" footer list, related navbars and the next arrow on detail pages):

```json
{
  "slug": "example-site",
  "title": "Example Site",
  "description": "What makes this navbar worth a look.",
  "website": "https://example.com?ref=navbar.design",
  "styles": ["minimalism"],
  "types": ["sticky"],
  "image": "/images/navbars/example-site.png",
  "imageWidth": 1920,
  "imageHeight": 1080,
  "featured": false
}
```

3. Commit and push. Vercel rebuilds and the new page is live at `/navbars/example-site`, in the sitemap, and in
   the relevant `/style/*` and `/type/*` pages.

Valid `styles` and `types` slugs (and their titles/descriptions) are in `content/categories.json`. Set
`"featured": true` on the two entries that should appear in the home page "Featured" section.

The home hero ticker is built from the same list, so new entries appear there automatically.
