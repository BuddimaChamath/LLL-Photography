import './index.css';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');
if (container) {
  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  );
  // Production pages are prerendered (see scripts/prerender.mjs); the dev server isn't.
  if (container.firstElementChild) hydrateRoot(container, app);
  else createRoot(container).render(app);
}
