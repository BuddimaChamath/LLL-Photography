import { createElement, useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';

// One shared observer for every revealed element — cheaper than a scroll listener per section.
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function observeOnce(el: Element, onVisible: () => void) {
  if (typeof IntersectionObserver === 'undefined') {
    onVisible();
    return () => undefined;
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callbacks.get(entry.target)?.();
          callbacks.delete(entry.target);
          observer?.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );
  }
  callbacks.set(el, onVisible);
  observer.observe(el);
  return () => {
    callbacks.delete(el);
    observer?.unobserve(el);
  };
}

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'p' | 'h2' | 'h3' | 'li' | 'article' | 'figure' | 'header';
  delay?: number;
  children?: ReactNode;
};

export function Reveal({ as = 'div', delay = 0, className = '', style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    return observeOnce(ref.current, () => setVisible(true));
  }, []);

  return createElement(
    as,
    {
      ...rest,
      ref,
      className: `reveal ${visible ? 'is-visible' : ''} ${className}`,
      style: delay ? { ...style, transitionDelay: `${delay}ms` } : style,
    },
    children
  );
}
