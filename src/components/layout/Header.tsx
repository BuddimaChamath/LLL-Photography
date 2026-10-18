import React, { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../../contexts/theme';
import { NAV_LINKS } from '../../lib/site';
import { Link } from '../../router';
import { useRouter } from '../../router/context';
import { Wordmark } from '../ui/Wordmark';

// `overHero`: the page opens with a full-bleed photo, so the bar starts transparent with
// white text and turns solid once scrolled.
export const Header: React.FC<{ overHero: boolean }> = ({ overHero }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { location } = useRouter();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu whenever the page changes.
  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false);
    const close = () => window.innerWidth >= 768 && setIsMenuOpen(false);
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', close);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', close);
    };
  }, [isMenuOpen]);

  const transparent = overHero && !isScrolled && !isMenuOpen;
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,color,border-color] duration-500 ${
          transparent
            ? 'border-transparent text-white'
            : isMenuOpen
              ? 'border-line bg-paper text-ink'
              : 'border-line bg-paper/95 text-ink backdrop-blur-md'
        }`}
      >
        <div className="container-site flex h-16 items-center justify-between sm:h-20">
          <Link to="/" aria-label="Tharun Goutham Photography — home">
            <Wordmark size="sm" />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex gap-8 lg:gap-11">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`border-b pb-1 text-[11px] uppercase tracking-[0.24em] transition-opacity ${
                      isActive(link.href) ? 'border-current opacity-100' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="-mr-2.5 flex items-center">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 opacity-80 transition-opacity hover:opacity-100"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={17} strokeWidth={1.5} /> : <Moon size={17} strokeWidth={1.5} />}
            </button>
            <button
              type="button"
              className="p-2.5 md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-blur would otherwise become the containing
          block for this fixed panel and collapse it to the header's height. */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-x-0 bottom-0 top-16 z-40 animate-[fadeIn_.25s_ease] overflow-y-auto bg-paper md:hidden"
        >
          <ul className="flex min-h-full flex-col items-center justify-center gap-7 py-12">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-serif text-3xl font-light text-ink">
                Home
              </Link>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  to={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`font-serif text-3xl font-light ${isActive(link.href) ? 'italic text-ink' : 'text-ink'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-6">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="btn-solid">
                Book a Session
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
