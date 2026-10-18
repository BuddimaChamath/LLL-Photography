import { findGallery, galleries, galleryPath, type Gallery } from './data/galleries';

export type Route =
  | { name: 'home' }
  | { name: 'portfolio' }
  | { name: 'gallery'; gallery: Gallery }
  | { name: 'about' }
  | { name: 'services' }
  | { name: 'contact' }
  | { name: 'notFound' };

export function matchRoute(pathname: string): Route {
  switch (pathname) {
    case '/':
      return { name: 'home' };
    case '/portfolio':
      return { name: 'portfolio' };
    case '/about':
      return { name: 'about' };
    case '/services':
      return { name: 'services' };
    case '/contact':
      return { name: 'contact' };
  }
  const m = pathname.match(/^\/portfolio\/([^/]+)$/);
  const gallery = m ? findGallery(decodeURIComponent(m[1])) : undefined;
  return gallery ? { name: 'gallery', gallery } : { name: 'notFound' };
}

// Every path written to disk at build time.
export const PRERENDER_PATHS = ['/', '/portfolio', '/about', '/services', '/contact', ...galleries.map((g) => galleryPath(g.slug))];
