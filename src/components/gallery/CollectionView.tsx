import React, { useMemo, useState } from 'react';
import type { Photo } from '../../data/galleries';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { SmartImage } from '../ui/SmartImage';

// Masonry tile: holds a 4:5 placeholder until the real aspect ratio is known, so
// lazy loading doesn't see dozens of zero-height images and fetch them all at once.
const Tile: React.FC<{ photo: Photo; index: number; href: string; onOpen: (i: number) => void }> = ({ photo, index, href, onOpen }) => {
  const [ratio, setRatio] = useState<number | null>(null);
  return (
    <a
      href={href}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onOpen(index);
      }}
      className="group relative mb-2 block w-full overflow-hidden bg-line/50 sm:mb-3"
      style={{ aspectRatio: ratio ?? 0.8 }}
      aria-label={`View photo ${index + 1}: ${photo.alt}`}
    >
      <SmartImage
        src={photo.url}
        alt={photo.alt}
        widths={[400, 640, 900, 1200]}
        sizes="(min-width: 1024px) 31vw, 48vw"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        onReady={(img) => {
          if (img.naturalWidth && img.naturalHeight) setRatio(img.naturalWidth / img.naturalHeight);
        }}
      />
    </a>
  );
};

type GalleryMasonryProps = {
  photos: Photo[];
  photoHref: (index: number) => string;
  onOpen: (index: number) => void;
};

export const GalleryMasonry: React.FC<GalleryMasonryProps> = ({ photos, photoHref, onOpen }) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const columnCount = isDesktop ? 3 : 2;

  // Distribute left-to-right so the reading order follows the original sequence.
  const columns = useMemo(() => {
    const cols: { photo: Photo; index: number }[][] = Array.from({ length: columnCount }, () => []);
    photos.forEach((p, index) => cols[index % columnCount].push({ photo: p, index }));
    return cols;
  }, [photos, columnCount]);

  return (
    <div className="flex gap-2 sm:gap-3">
      {columns.map((col, c) => (
        <div key={c} className="min-w-0 flex-1">
          {col.map(({ photo, index }) => (
            <Tile key={photo.url} photo={photo} index={index} href={photoHref(index)} onOpen={onOpen} />
          ))}
        </div>
      ))}
    </div>
  );
};
