import React from 'react';
import { Link } from '../../router';
import { SITE } from '../../lib/site';
import { SmartImage } from '../ui/SmartImage';
import { Reveal } from '../ui/Reveal';
import { WhatsAppIcon } from '../ui/icons';

const BACKDROP = 'https://res.cloudinary.com/dcbjrnh3b/image/upload/v1751130666/lan2_nauavk.jpg';

// Closing call to action shown above the footer on every page except Contact.
export const CtaBand: React.FC = () => (
  <section aria-labelledby="cta-title" className="relative overflow-hidden bg-neutral-900 text-white">
    <SmartImage
      src={BACKDROP}
      alt=""
      widths={[750, 1200, 1800, 2400]}
      sizes="100vw"
      className="absolute inset-0 h-full w-full object-cover opacity-45"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
    <Reveal className="container-site relative py-24 text-center sm:py-32">
      <p className="text-[11px] uppercase tracking-[0.32em] text-white/80">Let’s work together</p>
      <h2 id="cta-title" className="mx-auto mt-5 max-w-2xl font-serif text-4xl font-light leading-[1.1] sm:text-6xl">
        Ready to tell your story?
      </h2>
      <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/80">
        Tell me about your plans — I’ll get back to you as soon as possible.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <Link to="/contact" className="btn w-60 bg-white text-neutral-900 hover:bg-white/85 sm:w-auto">
          Get in Touch
        </Link>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn w-60 border border-white/60 text-white hover:border-white sm:w-auto"
        >
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </Reveal>
  </section>
);
