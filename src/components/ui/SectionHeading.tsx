import { Reveal } from './Reveal';

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  align?: 'center' | 'start';
};

export function SectionHeading({ id, eyebrow, title, intro, align = 'center' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <header className={`mb-14 sm:mb-20 ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}`}>
      <Reveal as="p" className="eyebrow">
        {eyebrow}
      </Reveal>
      <Reveal as="h2" id={id} delay={80} className="mt-4 font-serif text-4xl font-light leading-[1.1] sm:text-5xl">
        {title}
      </Reveal>
      {intro && (
        <Reveal as="p" delay={160} className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
          {intro}
        </Reveal>
      )}
    </header>
  );
}
