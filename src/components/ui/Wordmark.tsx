type WordmarkProps = {
  size?: 'sm' | 'md' | 'lg';
  align?: 'center' | 'start';
  className?: string;
};

const NAME_SIZES = {
  sm: 'text-[17px] sm:text-xl',
  md: 'text-xl sm:text-2xl',
  lg: 'text-3xl sm:text-4xl',
};

// Typeset brand name used in place of a logo image.
export function Wordmark({ size = 'sm', align = 'center', className = '' }: WordmarkProps) {
  return (
    <span
      className={`inline-flex flex-col leading-none ${align === 'center' ? 'items-center' : 'items-start'} ${className}`}
    >
      <span className={`font-serif font-normal uppercase tracking-[0.2em] ${NAME_SIZES[size]}`}>
        Tharun Goutham
      </span>
      <span
        className={`mt-1.5 font-sans text-[9px] font-normal uppercase tracking-[0.55em] sm:text-[10px] ${
          align === 'center' ? 'pl-[0.55em]' : ''
        }`}
      >
        Photography
      </span>
    </span>
  );
}
