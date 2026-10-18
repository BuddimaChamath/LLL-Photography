// Single source of truth for business details used across the site.
export const SITE = {
  name: 'Tharun Goutham Photography',
  photographer: 'Tharun Goutham',
  tagline: 'Wedding, portrait & event photographer in Sri Lanka',
  // Public address used for canonical URLs, share links and sitemap.xml. When a custom
  // domain is added, set VITE_SITE_URL in Vercel (or change this default).
  url: (import.meta.env.VITE_SITE_URL || 'https://lll-photography.vercel.app').replace(/\/+$/, ''),
  location: 'Battaramulla, Sri Lanka',
  phone: '+94755996155',
  phoneDisplay: '+94 75 599 6155',
  email: 'tharungoutham25@gmail.com',
  whatsapp: 'https://wa.me/94755996155',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Battaramulla%2C%20Sri%20Lanka',
  brochure: '/assets/pdfs/Vogue by TG.pdf',
  // Add profile URLs to show these icons in the footer.
  socials: {
    instagram: '',
    facebook: '',
    tiktok: '',
  },
};

export const NAV_LINKS = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];
