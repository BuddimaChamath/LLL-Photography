import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { FaqSection, PackagesSection, ProcessSection } from '../components/sections/ServicesSection';

export const ServicesPage: React.FC = () => (
  <>
    <PageHeader
      eyebrow="Investment"
      title="Photography Packages"
      intro="Professional photography packages tailored to your needs. Every package can be adjusted — just ask."
    />
    <PackagesSection />
    <ProcessSection />
    <FaqSection />
  </>
);
