import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react';
import { RouterContext, useRouter, type NavigateOptions, type RouterLocation } from './context';

// A tiny History-API router: real paths (good for SEO and sharing), back/forward
// scroll restoration, and a `url` prop so pages can be rendered at build time.

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

const normalisePath = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';

const parseUrl = (url: string): RouterLocation => {
  const u = new URL(url, 'http://prerender.local');
  return { pathname: normalisePath(u.pathname), search: u.search, hash: u.hash };
};

const currentLocation = (): RouterLocation => ({
  pathname: normalisePath(window.location.pathname),
  search: window.location.search,
  hash: window.location.hash,
});

const newKey = () => Math.random().toString(36).slice(2, 10);

// Scroll positions per history entry, so "back" returns to where you were.
const SCROLL_STORE = 'tg-scroll';
const readPositions = (): Record<string, number> => {
  try {
    return JSON.parse(sessionStorage.getItem(SCROLL_STORE) || '{}');
  } catch {
    return {};
  }
};
const savePosition = () => {
  const key = (window.history.state as { key?: string } | null)?.key;
  if (!key) return;
  try {
    const positions = readPositions();
    positions[key] = window.scrollY;
    sessionStorage.setItem(SCROLL_STORE, JSON.stringify(positions));
  } catch {
    // Storage unavailable — back navigation just won't restore scroll.
  }
};

type ScrollIntent = 'none' | 'top' | 'hash' | 'restore';

export function Router({ url, children }: { url?: string; children: ReactNode }) {
  // On the server `url` is given. In the browser the first render must match the
  // prerendered HTML, which never includes a query string — it's picked up right after.
  const [location, setLocation] = useState<RouterLocation>(() =>
    url !== undefined ? parseUrl(url) : { ...currentLocation(), search: '' }
  );
  const intent = useRef<ScrollIntent>('none');

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const state = window.history.state as { key?: string } | null;
    if (!state?.key) window.history.replaceState({ ...state, key: newKey() }, '');
    setLocation(currentLocation());

    const onPop = () => {
      intent.current = 'restore';
      setLocation(currentLocation());
    };
    window.addEventListener('popstate', onPop);
    window.addEventListener('pagehide', savePosition);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('pagehide', savePosition);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const mode = intent.current;
    intent.current = 'none';
    if (mode === 'top') window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    else if (mode === 'hash' || (mode === 'restore' && location.hash)) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
    }
    if (mode === 'restore') {
      const key = (window.history.state as { key?: string } | null)?.key;
      const saved = key ? readPositions()[key] : undefined;
      if (saved !== undefined) window.scrollTo({ top: saved, behavior: 'instant' as ScrollBehavior });
    }
  }, [location]);

  const navigate = useCallback((to: string, { replace = false, scroll = true, state }: NavigateOptions = {}) => {
    const target = new URL(to, window.location.href);
    if (target.origin !== window.location.origin) {
      window.location.assign(to);
      return;
    }
    savePosition();
    const prevKey = (window.history.state as { key?: string } | null)?.key;
    const entry = { ...state, key: replace && prevKey ? prevKey : newKey() };
    const href = target.pathname + target.search + target.hash;
    if (replace) window.history.replaceState(entry, '', href);
    else window.history.pushState(entry, '', href);
    intent.current = scroll ? (target.hash ? 'hash' : 'top') : 'none';
    setLocation(currentLocation());
  }, []);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  replace?: boolean;
  scroll?: boolean;
};

export function Link({ to, replace, scroll, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  return (
    <a
      {...rest}
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          rest.target ||
          rest.download !== undefined ||
          to.startsWith('#') ||
          /^[a-z]+:/i.test(to)
        ) {
          return;
        }
        e.preventDefault();
        navigate(to, { replace, scroll });
      }}
    />
  );
}
