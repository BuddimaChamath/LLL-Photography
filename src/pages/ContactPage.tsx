import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { ContactSection } from '../components/sections/ContactSection';

export const ContactPage: React.FC = () => (
  <>
    <PageHeader
      eyebrow="Contact"
      title="Let’s Create Something Beautiful"
      intro="Have a project in mind or want to book a session? Tell me a little about your plans and I’ll get back to you as soon as possible."
    />
    <ContactSection />
  </>
);
