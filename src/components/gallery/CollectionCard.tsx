import React from 'react';
import { categoryLabel, galleryPath, type Gallery } from '../../data/galleries';
import { Link } from '../../router';
import { SmartImage } from '../ui/SmartImage';

type CollectionCardProps = {
  gallery: Gallery;
  sizes?: string;
  /** e.g. "Previous collection" above the title */
  kicker?: string;
  headingLevel?: 'h2' | 'h3';
  landscape?: boolean;
};

export const CollectionCard: React.FC<CollectionCardProps> = ({
  gallery,
  sizes = '(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw',
  kicker,
  headingLevel: Heading = 'h3',
  landscape = false,
}) => (
  <Link to={galleryPath(gallery.slug)} className="group block">
    <div className={`${landscape ? 'aspect-[3/2]' : 'aspect-[4/5]'} overflow-hidden bg-line/50`}>
      <SmartImage
        src={gallery.cover}
        alt={gallery.coverAlt}
        widths={landscape ? [600, 900, 1200, 1600] : [400, 600, 800, 1000]}
        sizes={sizes}
        ratio={landscape ? 3 / 2 : 4 / 5}
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
      />
    </div>
    {kicker && <p className="eyebrow mt-5">{kicker}</p>}
    <Heading className={`${kicker ? 'mt-2' : 'mt-5'} font-serif text-2xl font-light leading-snug transition-opacity group-hover:opacity-70`}>
      {gallery.title}
    </Heading>
    <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-muted">
      {categoryLabel(gallery)} — {gallery.photos.length} photos
    </p>
  </Link>
);
