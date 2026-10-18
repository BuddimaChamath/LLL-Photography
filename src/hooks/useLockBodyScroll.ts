import { useEffect } from 'react';

let locks = 0;

// Ref-counted so nested overlays (collection + lightbox) don't unlock early.
export function useLockBodyScroll(active = true) {
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    if (locks++ === 0) root.style.overflow = 'hidden';
    return () => {
      if (--locks === 0) root.style.overflow = '';
    };
  }, [active]);
}
