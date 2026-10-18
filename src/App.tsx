import { useEffect, useRef } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CtaBand } from './components/sections/CtaBand';
import { ThemeProvider } from './contexts/ThemeContext';
import { Router } from './router';
import { useRouter } from './router/context';
import { matchRoute, type Route } from './routes';
import { applyMeta, getMeta } from './seo/meta';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function renderPage(route: Route) {
  switch (route.name) {
    case 'home':
      return <HomePage />;
    case 'portfolio':
      return <PortfolioPage />;
    case 'gallery':
      return <GalleryPage key={route.gallery.slug} gallery={route.gallery} />;
    case 'about':
      return <AboutPage />;
    case 'services':
      return <ServicesPage />;
    case 'contact':
      return <ContactPage />;
    case 'notFound':
      return <NotFoundPage />;
  }
}

function Shell() {
  const { location } = useRouter();
  const route = matchRoute(location.pathname);
  // Fade pages in after client-side navigation, but not on the first (prerendered) paint.
  const firstPath = useRef(location.pathname);
  const animate = location.pathname !== firstPath.current;
  if (animate) firstPath.current = '';

  useEffect(() => {
    applyMeta(getMeta(matchRoute(location.pathname)));
  }, [location.pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Header overHero={route.name === 'home' || route.name === 'gallery'} />
      <main id="main" key={location.pathname} className={animate ? 'animate-[fadeIn_.45s_ease]' : undefined}>
        {renderPage(route)}
      </main>
      {route.name !== 'contact' && route.name !== 'notFound' && <CtaBand />}
      <Footer />
    </>
  );
}

export function App({ url }: { url?: string }) {
  return (
    <ThemeProvider>
      <Router url={url}>
        <Shell />
      </Router>
    </ThemeProvider>
  );
}
