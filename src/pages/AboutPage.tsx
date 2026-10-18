import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { AboutStory } from '../components/sections/AboutSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';

export const AboutPage: React.FC = () => (
  <>
    <PageHeader eyebrow="About" title="The Story Behind the Lens" />
    <AboutStory />
    <TestimonialsSection surface />
  </>
);
