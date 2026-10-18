import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Photo } from '../../data/galleries';
import { cld } from '../../lib/cloudinary';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

type LightboxProps = {
  photos: Photo[];
  index: number;
  title: string;
  onChange: (index: number) => void;
  onClose: () => void;
};

const STEPS = [800, 1200, 1600, 2048, 2560];

// One width for the current screen, so the neighbour preloads hit the same cached URL.
const pickWidth = () => {
  const needed = Math.max(window.innerWidth, window.innerHeight) * Math.min(window.devicePixelRatio || 1, 2);
  return STEPS.find((w) => w >= needed) ?? STEPS[STEPS.length - 1];
};

export const Lightbox: React.FC<LightboxProps> = ({ photos, index, title, onChange, onClose }) => {
  const count = photos.length;
  const [width] = useState(pickWidth);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useLockBodyScroll();

  const src = cld(photos[index].url, { w: width });
  const next = useCallback(() => onChange((index + 1) % count), [index, count, onChange]);
  const prev = useCallback(() => onChange((index - 1 + count) % count), [index, count, onChange]);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, onClose]);

  // Warm the cache for the photos either side.
  useEffect(() => {
    for (const i of [index + 1, index - 1, index + 2]) {
      const img = new Image();
      img.src = cld(photos[(i + count) % count].url, { w: width });
    }
  }, [index, count, photos, width]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title}, photo ${index + 1} of ${count}`}
      className="fixed inset-0 z-[70] flex animate-[fadeIn_.25s_ease] flex-col bg-black text-white"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="flex h-14 shrink-0 items-center justify-between px-4 sm:px-6">
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/70" aria-live="polite">
          {index + 1} / {count}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} className="-mr-2 p-2 text-white/80 hover:text-white" aria-label="Close photo">
          <X size={22} strokeWidth={1.25} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6 sm:px-20">
        {loadedSrc !== src && (
          <div className="absolute h-8 w-8 animate-spin rounded-full border border-white/20 border-t-white/80" aria-hidden="true" />
        )}
        <img
          key={src}
          src={src}
          alt={photos[index].alt}
          onLoad={() => setLoadedSrc(src)}
          onError={() => setLoadedSrc(src)}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
          className={`max-h-full max-w-full select-none object-contain transition-opacity duration-500 ${
            loadedSrc === src ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <button
          type="button"
          onClick={prev}
          className="absolute left-1 top-1/2 hidden -translate-y-1/2 p-3 text-white/60 hover:text-white sm:left-4 sm:block"
          aria-label="Previous photo"
        >
          <ChevronLeft size={34} strokeWidth={1} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-1 top-1/2 hidden -translate-y-1/2 p-3 text-white/60 hover:text-white sm:right-4 sm:block"
          aria-label="Next photo"
        >
          <ChevronRight size={34} strokeWidth={1} />
        </button>
      </div>
    </div>
  );
};
