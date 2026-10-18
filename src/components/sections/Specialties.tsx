import React from 'react';
import { CATEGORY_LABELS, CATEGORY_SLUGS, galleries, type Category } from '../../data/galleries';
import { Link } from '../../router';
import { SmartImage } from '../ui/SmartImage';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const SPECIALTIES: Category[] = ['weddings', 'engagements', 'birthday shoots', 'convocation'];

// One tile per category, using a frame from inside a collection (not its cover) so the
// home page doesn't repeat the same images.
const tiles = SPECIALTIES.map((category) => {
  const inCategory = galleries.filter((g) => g.categories.includes(category));
  const source = inCategory[inCategory.length > 1 ? 1 : 0];
  return {
    category,
    count: inCategory.length,
    image: source.photos[Math.min(2, source.photos.length - 1)],
  };
});

export const Specialties: React.FC = () => (
  <section aria-labelledby="specialties-title" className="bg-surface py-24 sm:py-32">
    <div className="container-site">
      <SectionHeading id="specialties-title" eyebrow="What I Photograph" title="Moments Worth Keeping" />
      <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {tiles.map(({ category, count, image }, i) => (
          <Reveal as="li" key={category} delay={i * 90}>
            <Link to={`/portfolio?category=${CATEGORY_SLUGS[category]}`} className="group relative block aspect-[3/4] overflow-hidden bg-line/50">
              <SmartImage
                src={image.url}
                alt={image.alt}
                widths={[300, 450, 600, 800]}
                sizes="(min-width: 1024px) 23vw, 48vw"
                ratio={3 / 4}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                <span className="block font-serif text-2xl font-light sm:text-3xl">{CATEGORY_LABELS[category]}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.24em] text-white/80 sm:text-[11px]">
                  {count} {count === 1 ? 'collection' : 'collections'}
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);
