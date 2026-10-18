import { galleryPath } from '../data/galleries';
import { cld, cldSrcSet } from '../lib/cloudinary';
import { SITE } from '../lib/site';
import type { Route } from '../routes';
import { FAQS } from '../content/faqs';
import { HERO_SLIDES, HERO_LANDSCAPE_WIDTHS, HERO_PORTRAIT_MEDIA, HERO_PORTRAIT_WIDTHS } from '../content/hero';

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
  /** responsive image preloads — only emitted into prerendered HTML */
  preloads?: { srcset: string; sizes: string; media?: string }[];
};

const shareImage = (url: string) => cld(url, { w: 1200, ratio: 1200 / 630 }).replace('f_auto', 'f_jpg');
const DEFAULT_IMAGE = shareImage(HERO_SLIDES[0].landscape);
const abs = (path: string) => (SITE.url ? SITE.url + path : path);

const breadcrumbs = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    ...(SITE.url ? { item: abs(path) } : {}),
  })),
});

export function getMeta(route: Route): PageMeta {
  const base = { image: DEFAULT_IMAGE, imageAlt: `Photograph by ${SITE.photographer}` };

  switch (route.name) {
    case 'home':
      return {
        ...base,
        title: `${SITE.name} | Wedding & Portrait Photographer in Sri Lanka`,
        description:
          'Tharun Goutham Photography — wedding, engagement, portrait, birthday, convocation and event photographer based in Battaramulla, Sri Lanka. View recent collections and packages, and book your session.',
        path: '/',
        preloads: [
          { srcset: cldSrcSet(HERO_SLIDES[0].landscape, HERO_LANDSCAPE_WIDTHS), sizes: '100vw', media: '(min-width: 768px), (orientation: landscape)' },
          { srcset: cldSrcSet(HERO_SLIDES[0].portrait, HERO_PORTRAIT_WIDTHS), sizes: '100vw', media: HERO_PORTRAIT_MEDIA },
        ],
      };
    case 'portfolio':
      return {
        ...base,
        title: `Portfolio — Weddings, Portraits & Events | ${SITE.name}`,
        description:
          'Browse wedding, engagement, birthday, baby, convocation and event photography collections by Tharun Goutham, photographer in Sri Lanka.',
        path: '/portfolio',
        jsonLd: [breadcrumbs([['Home', '/'], ['Portfolio', '/portfolio']])],
      };
    case 'gallery': {
      const g = route.gallery;
      const path = galleryPath(g.slug);
      return {
        title: `${g.title} | ${SITE.name}`,
        description: g.description,
        path,
        image: shareImage(g.cover),
        imageAlt: g.coverAlt,
        preloads: [{ srcset: cldSrcSet(g.cover, [750, 1200, 1800, 2400]), sizes: '100vw' }],
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: g.title,
            description: g.description,
            ...(SITE.url ? { url: abs(path) } : {}),
            author: { '@type': 'Person', name: SITE.photographer },
            image: g.photos.slice(0, 12).map((p) => ({
              '@type': 'ImageObject',
              contentUrl: cld(p.url, { w: 1600 }),
              name: p.alt,
            })),
          },
          breadcrumbs([['Home', '/'], ['Portfolio', '/portfolio'], [g.title, path]]),
        ],
      };
    }
    case 'about':
      return {
        ...base,
        title: `About Tharun Goutham | ${SITE.name}`,
        description:
          'Meet Tharun Goutham — a Sri Lanka based photographer with over 7 years of experience in wedding, portrait, travel and event photography.',
        path: '/about',
        jsonLd: [breadcrumbs([['Home', '/'], ['About', '/about']])],
      };
    case 'services':
      return {
        ...base,
        title: `Photography Packages & Pricing | ${SITE.name}`,
        description:
          'Engagement, wedding, travel and event photography packages from Rs. 25,000. See what’s included, how booking works, and answers to common questions.',
        path: '/services',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
          breadcrumbs([['Home', '/'], ['Services', '/services']]),
        ],
      };
    case 'contact':
      return {
        ...base,
        title: `Contact & Bookings | ${SITE.name}`,
        description: `Book a wedding, portrait or event shoot with Tharun Goutham. Call ${SITE.phoneDisplay}, WhatsApp, or send an enquiry online.`,
        path: '/contact',
        jsonLd: [breadcrumbs([['Home', '/'], ['Contact', '/contact']])],
      };
    case 'notFound':
      return {
        ...base,
        title: `Page not found | ${SITE.name}`,
        description: 'The page you were looking for could not be found.',
        path: '/404',
        noindex: true,
      };
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Tags for prerendered HTML. Each managed tag carries data-head so the client can update it in place. */
export function renderHead(meta: PageMeta): string {
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta data-head name="description" content="${esc(meta.description)}" />`,
    `<meta data-head name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    `<meta data-head property="og:title" content="${esc(meta.title)}" />`,
    `<meta data-head property="og:description" content="${esc(meta.description)}" />`,
    `<meta data-head property="og:image" content="${esc(meta.image)}" />`,
    `<meta data-head property="og:image:alt" content="${esc(meta.imageAlt)}" />`,
    `<meta data-head name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta data-head name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta data-head name="twitter:image" content="${esc(meta.image)}" />`,
  ];
  if (SITE.url && !meta.noindex) {
    tags.push(`<link data-head rel="canonical" href="${esc(abs(meta.path))}" />`);
    tags.push(`<meta data-head property="og:url" content="${esc(abs(meta.path))}" />`);
  }
  for (const p of meta.preloads ?? []) {
    tags.push(
      `<link rel="preload" as="image" fetchpriority="high" imagesrcset="${esc(p.srcset)}" imagesizes="${p.sizes}"${p.media ? ` media="${p.media}"` : ''} />`
    );
  }
  for (const data of meta.jsonLd ?? []) {
    tags.push(`<script data-head type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`);
  }
  return tags.join('\n    ');
}

/** Keeps head tags in sync after client-side navigation. */
export function applyMeta(meta: PageMeta) {
  document.title = meta.title;
  const set = (selector: string, attr: string, value: string, create: () => HTMLElement) => {
    let el = document.head.querySelector<HTMLElement>(selector);
    if (!el) {
      el = create();
      el.setAttribute('data-head', '');
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };
  const meta_ = (key: 'name' | 'property', name: string, content: string) =>
    set(`meta[${key}="${name}"]`, 'content', content, () => {
      const m = document.createElement('meta');
      m.setAttribute(key, name);
      return m;
    });

  meta_('name', 'description', meta.description);
  meta_('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  meta_('property', 'og:title', meta.title);
  meta_('property', 'og:description', meta.description);
  meta_('property', 'og:image', meta.image);
  meta_('property', 'og:image:alt', meta.imageAlt);
  meta_('name', 'twitter:title', meta.title);
  meta_('name', 'twitter:description', meta.description);
  meta_('name', 'twitter:image', meta.image);
  if (SITE.url) {
    set('link[rel="canonical"]', 'href', abs(meta.path), () => {
      const l = document.createElement('link');
      l.rel = 'canonical';
      return l;
    });
    meta_('property', 'og:url', abs(meta.path));
  }

  document.head.querySelectorAll('script[data-head][type="application/ld+json"]').forEach((s) => s.remove());
  for (const data of meta.jsonLd ?? []) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-head', '');
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }
}
