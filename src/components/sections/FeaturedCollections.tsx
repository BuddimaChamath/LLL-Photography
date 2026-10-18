import React from 'react';
import { ArrowRight } from 'lucide-react';
import { featuredGalleries } from '../../data/galleries';
import { Link } from '../../router';
import { CollectionCard } from '../gallery/CollectionCard';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export const FeaturedCollections: React.FC = () => (
  <section aria-labelledby="featured-title" className="py-24 sm:py-32">
    <div className="container-site">
      <SectionHeading
        id="featured-title"
        eyebrow="Portfolio"
        title="Recent Collections"
        intro="Weddings, celebrations and portraits — each collection is a story told from beginning to end."
      />
      <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {featuredGalleries.map((gallery, i) => (
          <Reveal as="li" key={gallery.slug} delay={(i % 3) * 90}>
            <CollectionCard gallery={gallery} />
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-16 text-center sm:mt-20">
        <Link to="/portfolio" className="btn-outline">
          View all collections <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </Reveal>
    </div>
  </section>
);
