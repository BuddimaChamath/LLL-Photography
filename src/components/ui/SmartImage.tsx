import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { cld, cldSrcSet } from '../../lib/cloudinary';

type SmartImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'> & {
  src: string;
  alt: string;
  /** candidate widths for srcset, smallest first */
  widths: number[];
  sizes: string;
  /** crop to this width/height ratio (around the subject) */
  ratio?: number;
  priority?: boolean;
  /** called once the image has loaded — including when it was already cached before hydration */
  onReady?: (img: HTMLImageElement) => void;
};

// Responsive, lazily-loaded Cloudinary image that fades in once decoded.
export function SmartImage({ src, alt, widths, sizes, ratio, priority = false, className = '', onLoad, onReady, ...rest }: SmartImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Already in the browser cache — onLoad may have fired before hydration.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) {
      setLoaded(true);
      onReady?.(ref.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-check when the source changes
  }, [src]);

  const fallback = widths[Math.min(widths.length - 1, Math.floor(widths.length / 2))];

  return (
    <img
      {...rest}
      {...(priority ? { fetchpriority: 'high' } : {})}
      ref={ref}
      src={cld(src, { w: fallback, ratio })}
      srcSet={cldSrcSet(src, widths, { ratio })}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onLoad={(e) => {
        setLoaded(true);
        onReady?.(e.currentTarget);
        onLoad?.(e);
      }}
      onError={() => setLoaded(true)}
      className={`img-fade ${loaded ? 'is-loaded' : ''} ${className}`}
    />
  );
}
