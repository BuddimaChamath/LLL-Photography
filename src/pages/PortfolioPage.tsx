import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GallerySection } from '../components/sections/GallerySection';

export const PortfolioPage: React.FC = () => (
  <>
    <PageHeader
      eyebrow="Portfolio"
      title="Collections"
      intro="Weddings, engagements, birthdays, convocations and events — each collection told from beginning to end."
    />
    <GallerySection />
  </>
);
