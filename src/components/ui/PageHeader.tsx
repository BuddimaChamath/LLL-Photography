import React, { type ReactNode } from 'react';
import { Reveal } from './Reveal';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
};

// Top of every inner page — sits below the fixed header and carries the page's <h1>.
export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, intro }) => (
  <header className="container-site pb-14 pt-32 text-center sm:pb-20 sm:pt-44">
    <Reveal as="p" className="eyebrow">
      {eyebrow}
    </Reveal>
    <Reveal delay={80}>
      <h1 className="mx-auto mt-5 max-w-4xl font-serif text-[2.75rem] font-light leading-[1.05] sm:text-6xl lg:text-7xl">{title}</h1>
    </Reveal>
    {intro && (
      <Reveal as="p" delay={160} className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
        {intro}
      </Reveal>
    )}
  </header>
);
