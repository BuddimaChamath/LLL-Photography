import React, { useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CATEGORY_LABELS, CATEGORY_SLUGS, galleries, galleryPath, type Gallery } from '../data/galleries';
import { Link } from '../router';
import { useRouter, useSearchParam } from '../router/context';
import { GalleryMasonry } from '../components/gallery/CollectionView';
import { CollectionCard } from '../components/gallery/CollectionCard';
import { Lightbox } from '../components/gallery/Lightbox';
import { ShareButton } from '../components/gallery/ShareButton';
import { SmartImage } from '../components/ui/SmartImage';
import { Reveal } from '../components/ui/Reveal';

type HistoryState = { fromGallery?: boolean } | null;

export const GalleryPage: React.FC<{ gallery: Gallery }> = ({ gallery }) => {
  const { navigate } = useRouter();
  const path = galleryPath(gallery.slug);
  const photoParam = Number(useSearchParam('photo'));
  const photo = Number.isInteger(photoParam) && photoParam >= 1 && photoParam <= gallery.photos.length ? photoParam - 1 : null;

  const index = galleries.findIndex((g) => g.slug === gallery.slug);
  const prev = galleries[(index - 1 + galleries.length) % galleries.length];
  const next = galleries[(index + 1) % galleries.length];

  const photoHref = useCallback((i: number) => `${path}?photo=${i + 1}`, [path]);
  const openPhoto = (i: number) => navigate(photoHref(i), { scroll: false, state: { fromGallery: true } });
  const showPhoto = useCallback(
    (i: number) => navigate(photoHref(i), { replace: true, scroll: false, state: { fromGallery: true } }),
    [navigate, photoHref]
  );
  // Step back if we opened the photo ourselves; for a shared ?photo= link, just drop the param.
  const closePhoto = useCallback(() => {
    if ((window.history.state as HistoryState)?.fromGallery) window.history.back();
    else navigate(path, { replace: true, scroll: false });
  }, [navigate, path]);

  return (
    <article>
      <header className="relative flex h-[78vh] min-h-[460px] items-end overflow-hidden bg-neutral-900 text-white">
        <SmartImage
          src={gallery.cover}
          alt={gallery.coverAlt}
          widths={[750, 1200, 1800, 2400]}
          sizes="100vw"
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40" />
        <div className="container-site relative pb-12 sm:pb-16">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.3em] text-white/80">
            <Link to="/portfolio" className="hover:text-white">
              Portfolio
            </Link>
            <span className="mx-3" aria-hidden="true">
              /
            </span>
            {gallery.categories.map((c, i) => (
              <React.Fragment key={c}>
                {i > 0 && ' · '}
                <Link to={`/portfolio?category=${CATEGORY_SLUGS[c]}`} className="hover:text-white">
                  {CATEGORY_LABELS[c]}
                </Link>
              </React.Fragment>
            ))}
          </nav>
          <h1 className="mt-4 max-w-4xl font-serif text-[2.6rem] font-light leading-[1.05] sm:text-6xl lg:text-7xl">{gallery.title}</h1>
        </div>
      </header>

      <div className="container-site py-14 sm:py-20">
        <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center sm:mb-20">
          <p className="text-[15px] leading-relaxed text-muted sm:text-base">{gallery.description}</p>
          <div className="mt-6 flex items-center gap-6 text-[11px] uppercase tracking-[0.24em] text-muted">
            <span>{gallery.photos.length} photographs</span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <ShareButton title={gallery.title} className="uppercase tracking-[0.24em] hover:text-ink" />
          </div>
        </div>

        <GalleryMasonry photos={gallery.photos} photoHref={photoHref} onOpen={openPhoto} />

        <Reveal className="mx-auto mt-20 max-w-xl text-center sm:mt-28">
          <p className="eyebrow">Planning something similar?</p>
          <p className="mt-4 font-serif text-3xl font-light leading-snug sm:text-4xl">Let’s tell your story next.</p>
          <Link to="/contact" className="btn-solid mt-8">
            Book a Session
          </Link>
        </Reveal>
      </div>

      <nav aria-label="More collections" className="border-t border-line">
        <div className="container-site py-16 sm:py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-serif text-3xl font-light sm:text-4xl">More collections</h2>
            <Link to="/portfolio" className="text-link shrink-0">
              <ArrowLeft size={13} strokeWidth={1.5} /> All work
            </Link>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
            <CollectionCard gallery={prev} kicker="Previous" sizes="(min-width: 640px) 47vw, 100vw" landscape />
            <CollectionCard gallery={next} kicker="Next" sizes="(min-width: 640px) 47vw, 100vw" landscape />
          </div>
        </div>
      </nav>

      {photo !== null && (
        <Lightbox photos={gallery.photos} index={photo} title={gallery.title} onChange={showPhoto} onClose={closePhoto} />
      )}
    </article>
  );
};
