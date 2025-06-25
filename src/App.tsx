import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { GallerySection } from './components/sections/GallerySection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { FreelancerSection } from './components/sections/FreelancerSection';
import { ContactSection } from './components/sections/ContactSection';
import { ThemeProvider } from './contexts/ThemeContext';
import { WebsitePreloader } from './components/sections/WebsitePreloader';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Define the images that need to be preloaded (same as in HeroSection)
  const imagesToPreload = [
    // Landscape images
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493248/lan1_zamlol.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493254/lan2_wlyqke.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493256/lan3_eytfi3.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493251/lan4_fvmbii.jpg",
    // Portrait images
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493233/port1_j62u4z.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493239/port2_kwap94.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493252/port3_gkcg0s.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493255/port4_lcraob.jpg"
  ];

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  return (
    <ThemeProvider>
      {/* Show preloader while loading */}
      {isLoading && (
        <WebsitePreloader 
          onLoadingComplete={handleLoadingComplete}
          imageUrls={imagesToPreload}
        />
      )}
      
      {/* Main content - only show after loading is complete */}
      <div 
        className={`min-h-screen flex flex-col transition-all duration-500 dark:bg-gray-900 bg-white ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          visibility: showContent ? 'visible' : 'hidden' 
        }}
      >
        <Header />
        <main className="flex-grow">
          <HeroSection />
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