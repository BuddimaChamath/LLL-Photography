import React from 'react';
import { ArrowUp, Facebook, Instagram, Mail } from 'lucide-react';
import { NAV_LINKS, SITE } from '../../lib/site';
import { Link } from '../../router';
import { Wordmark } from '../ui/Wordmark';
import { TikTokIcon, WhatsAppIcon } from '../ui/icons';

const socialLinks = [
  { label: 'Instagram', href: SITE.socials.instagram, icon: <Instagram className="h-[18px] w-[18px]" strokeWidth={1.5} /> },
  { label: 'Facebook', href: SITE.socials.facebook, icon: <Facebook className="h-[18px] w-[18px]" strokeWidth={1.5} /> },
  { label: 'TikTok', href: SITE.socials.tiktok, icon: <TikTokIcon className="h-4 w-4" /> },
  { label: 'WhatsApp', href: SITE.whatsapp, icon: <WhatsAppIcon className="h-4 w-4" /> },
  { label: 'Email', href: `mailto:${SITE.email}`, icon: <Mail className="h-[18px] w-[18px]" strokeWidth={1.5} /> },
].filter((link) => link.href);

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-site grid gap-12 py-16 text-center sm:py-20 md:grid-cols-12 md:text-left">
        <div className="md:col-span-5">
          <Link to="/" aria-label="Tharun Goutham Photography — home">
            <Wordmark size="md" align="start" className="items-center md:items-start" />
          </Link>
          <p className="mx-auto mt-6 max-w-sm text-[15px] leading-relaxed text-muted md:mx-0">
            Capturing life’s precious moments with an artistic eye and honest storytelling. Based in Sri Lanka,
            available for bookings worldwide.
          </p>
          <ul className="mt-7 flex justify-center gap-2 md:-ml-2.5 md:justify-start">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex p-2.5 text-muted transition-colors hover:text-ink"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-[15px] transition-opacity hover:opacity-60">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-3">
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-ink">
                {SITE.location}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="break-all transition-opacity hover:opacity-60">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phone}`} className="transition-opacity hover:opacity-60">
                {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted sm:flex-row">
          <p suppressHydrationWarning>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 uppercase tracking-[0.2em] hover:text-ink"
          >
            Back to top <ArrowUp size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  );
};
