import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturedCollections } from '../components/sections/FeaturedCollections';
import { Specialties } from '../components/sections/Specialties';
import { AboutIntro } from '../components/sections/AboutSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';

// Work first, then who's behind it — the order most photography portfolios follow.
export const HomePage: React.FC = () => (
  <>
    <HeroSection />
    <FeaturedCollections />
    <Specialties />
    <AboutIntro />
    <TestimonialsSection surface />
  </>
);
