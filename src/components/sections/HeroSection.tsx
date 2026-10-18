import React, { useEffect, useRef, useState } from 'react';
import { cld, cldSrcSet } from '../../lib/cloudinary';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { HERO_LANDSCAPE_WIDTHS, HERO_PORTRAIT_MEDIA, HERO_PORTRAIT_WIDTHS, HERO_SLIDES } from '../../content/hero';
import { Link } from '../../router';

const SLIDES = HERO_SLIDES;
const SLIDE_MS = 6000;

export const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  // Only slides that have been reached (plus the next one) are mounted, so the
  // first paint downloads a single image.
  const [mounted, setMounted] = useState(1);
  const reducedMotion = usePrefersReducedMotion();
  const ready = mounted > 1;

  useEffect(() => {
    if (!ready || reducedMotion) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [ready, reducedMotion]);

  useEffect(() => {
    if (current > 0) setMounted((m) => Math.max(m, Math.min(SLIDES.length, current + 2)));
  }, [current]);

  const firstImg = useRef<HTMLImageElement>(null);
  const firstLoaded = () => setMounted((m) => Math.max(m, 2));

  // In prerendered HTML the first image can finish before React attaches onLoad.
  useEffect(() => {
    if (firstImg.current?.complete) setMounted((m) => Math.max(m, 2));
  }, []);

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex h-screen min-h-[560px] items-center justify-center overflow-hidden bg-neutral-900 text-white"
      style={{ height: '100svh' }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.slice(0, mounted).map((slide, i) => (
          <picture
            key={slide.landscape}
            className={`absolute inset-0 block transition-opacity duration-[1600ms] ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source media={HERO_PORTRAIT_MEDIA} srcSet={cldSrcSet(slide.portrait, HERO_PORTRAIT_WIDTHS)} sizes="100vw" />
            <img
              {...(i === 0 ? { fetchpriority: 'high' } : {})}
              ref={i === 0 ? firstImg : undefined}
              src={cld(slide.landscape, { w: 1920 })}
              srcSet={cldSrcSet(slide.landscape, HERO_LANDSCAPE_WIDTHS)}
              sizes="100vw"
              alt=""
              className="h-full w-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding={i === 0 ? 'sync' : 'async'}
              draggable={false}
              onLoad={i === 0 ? firstLoaded : undefined}
              onError={i === 0 ? firstLoaded : undefined}
            />
          </picture>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      </div>

      <div className="relative z-10 px-4 text-center">
        <p className="animate-[heroIn_1.2s_ease_both] text-[11px] uppercase tracking-[0.32em] text-white/85 sm:tracking-[0.4em]">
          Wedding · Portrait · Events<span className="hidden sm:inline"> — Sri Lanka</span>
        </p>
        <h1 className="mt-6 animate-[heroIn_1.2s_0.15s_ease_both] font-serif text-[2.75rem] font-light leading-[1.05] sm:text-6xl lg:text-7xl">
          Capturing stories
          <br />
          <em className="font-light">through the lens</em>
        </h1>
        <div className="mt-10 flex animate-[heroIn_1.2s_0.3s_ease_both] flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link to="/portfolio" className="btn w-56 bg-white text-neutral-900 hover:bg-white/85 sm:w-auto">
            View Portfolio
          </Link>
          <Link to="/contact" className="btn w-56 border border-white/60 text-white hover:border-white sm:w-auto">
            Book a Session
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setMounted((m) => Math.max(m, Math.min(SLIDES.length, i + 2)));
              setCurrent(i);
            }}
            className="group py-3"
            aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
            aria-current={i === current}
          >
            <span
              className={`block h-px transition-all duration-500 ${
                i === current ? 'w-10 bg-white' : 'w-5 bg-white/45 group-hover:bg-white/80'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};
