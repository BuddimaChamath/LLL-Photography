import { altitudeCollection } from '../collections/altitude-collection';
import { piyumiShasithaWedCollection } from '../collections/piyumiShasitha-collection';
import { inuriIsharaWedCollection } from '../collections/inuriIshara-collection';
import { lithmiJehaadWedCollection } from '../collections/lithmiJehaad-collection';
import { erandiHeshanWedCollection } from '../collections/erandiHeshan-collection';
import { pinkyBdayCollection } from '../collections/pinkyBday-collection';
import { diliniRobinEngCollection } from '../collections/diliniRobinEng-collection';
import { mevinaBdayCollection } from '../collections/mevinaBday-collection';
import { dulanjaliBdayCollection } from '../collections/dulanjaliBday-collection';
import { iitConvoCollection } from '../collections/iitConvo-collection';
import { taniaConvoCollection } from '../collections/taniaConvo-collection';
import { aditiBdayCollection } from '../collections/aditiBday-collection';
import { adoraBdayCollection } from '../collections/adoraBday-collection';

export type Category =
  | 'weddings'
  | 'engagements'
  | 'birthday shoots'
  | 'baby shoots'
  | 'convocation'
  | 'events'
  | 'portraits';

export type Photo = { url: string; alt: string };

export type Gallery = {
  id: number;
  slug: string;
  title: string;
  description: string;
  cover: string;
  coverAlt: string;
  categories: Category[];
  photos: Photo[];
};

export const CATEGORY_LABELS: Record<Category, string> = {
  weddings: 'Weddings',
  engagements: 'Engagements',
  'birthday shoots': 'Birthdays',
  'baby shoots': 'Baby',
  convocation: 'Convocation',
  events: 'Events',
  portraits: 'Portraits',
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// Display order in the portfolio.
const collections = [
  altitudeCollection,
  piyumiShasithaWedCollection,
  inuriIsharaWedCollection,
  lithmiJehaadWedCollection,
  erandiHeshanWedCollection,
  pinkyBdayCollection,
  diliniRobinEngCollection,
  mevinaBdayCollection,
  dulanjaliBdayCollection,
  iitConvoCollection,
  taniaConvoCollection,
  aditiBdayCollection,
  adoraBdayCollection,
];

export const galleries: Gallery[] = collections.map((c) => ({
  id: c.id,
  slug: slugify(c.title),
  title: c.title,
  description: c.description,
  cover: c.src,
  coverAlt: c.alt,
  categories: c.category as Category[],
  photos: c.images,
}));

const ORDER = Object.keys(CATEGORY_LABELS) as Category[];
export const usedCategories: Category[] = ORDER.filter((cat) =>
  galleries.some((g) => g.categories.includes(cat))
);

// Short, URL-friendly names for ?category= filters.
export const CATEGORY_SLUGS: Record<Category, string> = {
  weddings: 'weddings',
  engagements: 'engagements',
  'birthday shoots': 'birthdays',
  'baby shoots': 'baby',
  convocation: 'convocation',
  events: 'events',
  portraits: 'portraits',
};

export const categoryFromSlug = (slug: string | null): Category | null =>
  (ORDER.find((c) => CATEGORY_SLUGS[c] === slug) as Category | undefined) ?? null;

export const galleryPath = (slug: string) => `/portfolio/${slug}`;
export const findGallery = (slug: string) => galleries.find((g) => g.slug === slug);

// Hand-picked for the home page.
const FEATURED_SLUGS = [
  'piyumi-and-shasitha-wedding',
  'inuri-and-ishara-wedding',
  'robin-and-dilini-engagement',
  'lithmi-and-jehaad-wedding',
  'mevinas-birthday',
  'erandi-and-heshan-wedding',
];
export const featuredGalleries: Gallery[] = FEATURED_SLUGS.map(findGallery).filter((g): g is Gallery => !!g);

export const categoryLabel = (g: Gallery) => g.categories.map((c) => CATEGORY_LABELS[c]).join(' · ');
