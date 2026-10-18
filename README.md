# Tharun Goutham Photography

Portfolio site — React + TypeScript + Tailwind, built with Vite and deployed on Vercel.

## Getting Started

1. Run `npm install`
2. Run `npm run dev`

## Build

`npm run build` type-checks, builds the site, then prerenders every page
(`scripts/prerender.mjs`) to static HTML — one file per page and per gallery — so
search engines and link previews see real content and per-page titles/images.

Set `VITE_SITE_URL` (e.g. `https://yourdomain.com`) in Vercel → Settings → Environment
Variables to enable canonical URLs, absolute share links and `sitemap.xml`.

## Adding a gallery

1. Create `src/collections/<name>-collection.ts` (copy an existing one).
2. Add it to the list in `src/data/galleries.ts`.

Its page (`/portfolio/<slug>`) is generated automatically. To feature it on the home
page, add its slug to `FEATURED_SLUGS` in the same file.

## Where things live

- `src/pages/` — one component per page
- `src/content/` — hero slides, packages, FAQ
- `src/lib/site.ts` — contact details and social links
- `src/seo/meta.ts` — per-page titles, descriptions and structured data
