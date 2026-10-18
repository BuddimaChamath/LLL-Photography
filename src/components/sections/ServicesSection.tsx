import React from 'react';
import { ArrowRight, Download, Eye, Plus } from 'lucide-react';
import { FAQS } from '../../content/faqs';
import { PACKAGES, PROCESS } from '../../content/packages';
import { SITE } from '../../lib/site';
import { Link } from '../../router';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { SmartImage } from '../ui/SmartImage';

export const PackagesSection: React.FC = () => (
  <section aria-label="Packages" className="pb-24 sm:pb-32">
    <div className="container-site">
      <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-4">
        {PACKAGES.map((pkg, i) => (
          <Reveal as="li" key={pkg.title} delay={(i % 4) * 90} className="flex flex-col">
            <div className="aspect-[3/2] overflow-hidden bg-line/50">
              <SmartImage
                src={pkg.image}
                alt={`${pkg.title} — sample photograph`}
                widths={[400, 600, 900]}
                sizes="(min-width: 1280px) 23vw, (min-width: 640px) 47vw, 100vw"
                ratio={3 / 2}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-light">{pkg.title}</h2>
            <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-accent">{pkg.price}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{pkg.description}</p>
            <ul className="mt-5 flex-1 space-y-2 border-t border-line pt-5 text-sm text-muted">
              {pkg.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-[0.6em] h-px w-3 shrink-0 bg-muted/60" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to={`/contact?package=${encodeURIComponent(pkg.title)}`} className="text-link mt-7 self-start">
              Enquire <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-20 flex flex-col items-center justify-between gap-6 border-y border-line py-10 text-center md:flex-row md:text-left">
        <div>
          <h2 className="font-serif text-2xl font-light">The complete services brochure</h2>
          <p className="mt-2 text-sm text-muted">Detailed pricing and package information in one PDF.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={SITE.brochure} target="_blank" rel="noopener" className="btn-outline">
            <Eye size={15} strokeWidth={1.5} /> View PDF
          </a>
          <a href={SITE.brochure} download="Tharun Goutham Photography - Packages.pdf" className="btn-solid">
            <Download size={15} strokeWidth={1.5} /> Download
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

export const ProcessSection: React.FC = () => (
  <section aria-labelledby="process-title" className="bg-surface py-24 sm:py-32">
    <div className="container-site">
      <SectionHeading id="process-title" eyebrow="How It Works" title="From First Hello to Final Images" />
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {PROCESS.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 90} className="border-t border-line pt-6">
            <span className="font-serif text-4xl font-light text-accent">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 font-serif text-2xl font-light">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

// Native <details> — accessible and works before JavaScript loads.
export const FaqSection: React.FC = () => (
  <section aria-labelledby="faq-title" className="py-24 sm:py-32">
    <div className="container-site max-w-3xl">
      <SectionHeading id="faq-title" eyebrow="Questions" title="Frequently Asked" />
      <Reveal as="div" className="border-t border-line">
        {FAQS.map((faq) => (
          <details key={faq.question} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-xl font-light sm:text-2xl [&::-webkit-details-marker]:hidden">
              {faq.question}
              <Plus size={18} strokeWidth={1.25} className="shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="-mt-1 pb-6 pr-10 text-[15px] leading-relaxed text-muted">{faq.answer}</p>
          </details>
        ))}
      </Reveal>
      <p className="mt-10 text-center text-[15px] text-muted">
        Still have a question?{' '}
        <Link to="/contact" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
          Ask me directly
        </Link>
        .
      </p>
    </div>
  </section>
);
