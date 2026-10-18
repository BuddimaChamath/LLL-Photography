/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public site address, e.g. https://example.com — enables canonical URLs and the sitemap. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
