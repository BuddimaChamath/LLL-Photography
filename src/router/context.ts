import { createContext, useContext } from 'react';

export type RouterLocation = { pathname: string; search: string; hash: string };
export type NavigateOptions = { replace?: boolean; scroll?: boolean; state?: Record<string, unknown> };
type RouterValue = {
  location: RouterLocation;
  navigate: (to: string, options?: NavigateOptions) => void;
};

export const RouterContext = createContext<RouterValue | null>(null);

export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used inside <Router>');
  return ctx;
}

export function useSearchParam(name: string): string | null {
  const { location } = useRouter();
  return new URLSearchParams(location.search).get(name);
}
