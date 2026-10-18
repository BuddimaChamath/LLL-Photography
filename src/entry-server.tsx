// Build-time renderer used by scripts/prerender.mjs to write one HTML file per page.
/* eslint-disable react-refresh/only-export-components -- never hot-reloaded */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { matchRoute, PRERENDER_PATHS } from './routes';
import { getMeta, renderHead } from './seo/meta';

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <App url={url} />
    </StrictMode>
  );
  const pathname = new URL(url, 'http://prerender.local').pathname;
  return { html, head: renderHead(getMeta(matchRoute(pathname))) };
}

export { PRERENDER_PATHS };
export { SITE } from './lib/site';
