import React, { useMemo } from 'react';
import { CATEGORY_LABELS, CATEGORY_SLUGS, categoryFromSlug, galleries, usedCategories, type Category } from '../../data/galleries';
import { Link } from '../../router';
import { useSearchParam } from '../../router/context';
import { CollectionCard } from '../gallery/CollectionCard';
import { Reveal } from '../ui/Reveal';

// All collections with category filters. The filter lives in the URL (?category=weddings)
// so a filtered view can be linked to and survives the back button.
export const GallerySection: React.FC = () => {
  const active: Category | null = categoryFromSlug(useSearchParam('category'));

  const visible = useMemo(
    () => (active ? galleries.filter((g) => g.categories.includes(active)) : galleries),
    [active]
  );

  const filters: { label: string; to: string; current: boolean }[] = [
    { label: 'All', to: '/portfolio', current: !active },
    ...usedCategories.map((c) => ({
      label: CATEGORY_LABELS[c],
      to: `/portfolio?category=${CATEGORY_SLUGS[c]}`,
      current: active === c,
    })),
  ];

  return (
    <section aria-label="Collections" className="pb-24 sm:pb-32">
      <div className="container-site">
        <nav aria-label="Filter collections" className="no-scrollbar -mx-4 mb-12 overflow-x-auto px-4 sm:mx-0 sm:mb-16 sm:px-0">
          <ul className="flex gap-6 sm:flex-wrap sm:justify-center sm:gap-9">
            {filters.map((f) => (
              <li key={f.to} className="shrink-0">
                <Link
                  to={f.to}
                  replace
                  scroll={false}
                  aria-current={f.current ? 'page' : undefined}
                  className={`block border-b pb-1.5 text-[11px] uppercase tracking-[0.24em] transition-colors ${
                    f.current ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'collection' : 'collections'}
        </p>

        <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {visible.map((gallery, i) => (
            <Reveal as="li" key={gallery.slug} delay={(i % 3) * 90}>
              <CollectionCard gallery={gallery} headingLevel="h2" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
