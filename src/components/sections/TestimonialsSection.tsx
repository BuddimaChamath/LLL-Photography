import React from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { SmartImage } from '../ui/SmartImage';

const testimonials = [
  {
    quote:
      'Tharun’s artistic vision transformed our special day into a visual masterpiece. Every frame tells our love story beautifully, capturing moments we’ll treasure forever.',
    author: 'Ishara & Inuri',
    role: 'Wedding',
    image: 'https://res.cloudinary.com/dcbjrnh3b/image/upload/v1748539333/inuri_ishara-11_nzwybd.jpg',
  },
  {
    quote:
      'Professional, creative, and incredibly talented. Tharun captured emotions we didn’t even know we were feeling during our most precious moments.',
    author: 'Lithmi & Jehaad',
    role: 'Wedding',
    image: 'https://res.cloudinary.com/dcbjrnh3b/image/upload/v1748541722/Lith_jay02_fhtqfl.jpg',
  },
  {
    quote:
      'Working with Tharun was pure magic. He made me feel comfortable and confident, and the results were beyond my wildest dreams.',
    author: 'Mevina',
    role: 'Portrait Session',
    image: 'https://res.cloudinary.com/dcbjrnh3b/image/upload/v1748542049/mev-main_wqsxrq.jpg',
  },
];

// Swipeable row on phones (native scroll-snap, no JS), three columns on desktop.
export const TestimonialsSection: React.FC<{ surface?: boolean }> = ({ surface = false }) => (
  <section aria-labelledby="testimonials-title" className={`${surface ? 'bg-surface' : ''} py-24 sm:py-32`}>
    <div className="container-site">
      <SectionHeading id="testimonials-title" eyebrow="Kind Words" title="From Couples & Clients" />

      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-10 lg:overflow-visible lg:px-0">
        {testimonials.map((t, i) => (
          <Reveal as="li" key={t.author} delay={i * 110} className="w-[82%] shrink-0 snap-center sm:w-[55%] lg:w-auto">
            <figure>
              <div className="aspect-[4/5] overflow-hidden bg-line/50">
                <SmartImage
                  src={t.image}
                  alt={`${t.author} — ${t.role.toLowerCase()} photographed by Tharun Goutham`}
                  widths={[400, 600, 800]}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 55vw, 82vw"
                  ratio={4 / 5}
                  className="h-full w-full object-cover"
                />
              </div>
              <blockquote className="mt-7 font-serif text-xl font-light italic leading-relaxed sm:text-[22px]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-[11px] uppercase tracking-[0.24em] text-muted">
                {t.author} <span className="mx-1.5">—</span> {t.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);
