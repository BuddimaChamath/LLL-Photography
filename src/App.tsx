import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { GallerySection } from './components/sections/GallerySection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { FreelancerSection } from './components/sections/FreelancerSection';
import { ContactSection } from './components/sections/ContactSection';
import { ThemeProvider } from './contexts/ThemeContext';

export function App() {

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-gray-900 bg-white">
        <Header />
        <main className="flex-grow">
          <HeroSection/>
          <GallerySection />
          <AboutSection />
          <ServicesSection />
          <FreelancerSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}