// Builds resized, auto-format (AVIF/WebP) Cloudinary URLs so the browser
// only downloads what it needs for the current screen.
const UPLOAD = '/image/upload/';

export type CldOptions = {
  w?: number;
  /** width / height — when set, the image is cropped to this ratio around the subject */
  ratio?: number;
  quality?: 'auto' | 'auto:good' | 'auto:eco';
};

export function cld(url: string, { w, ratio, quality = 'auto' }: CldOptions = {}): string {
  const i = url.indexOf(UPLOAD);
  if (i === -1) return url;

  const base = url.slice(0, i + UPLOAD.length);
  let rest = url.slice(i + UPLOAD.length);

  // Drop any transformation already baked into the stored URL (e.g. "q_auto,f_auto/").
  const first = rest.split('/')[0];
  if (rest.includes('/') && !/^v\d+$/.test(first) && /^[a-z]{1,3}_/.test(first)) {
    rest = rest.slice(first.length + 1);
  }

  const t = ['f_auto', `q_${quality}`];
  if (w && ratio) t.push('c_fill', 'g_auto', `w_${w}`, `h_${Math.round(w / ratio)}`);
  else if (w) t.push('c_limit', `w_${w}`);

  return `${base}${t.join(',')}/${rest}`;
}

export function cldSrcSet(url: string, widths: number[], opts: Omit<CldOptions, 'w'> = {}): string {
  return widths.map((w) => `${cld(url, { ...opts, w })} ${w}w`).join(', ');
}
