import React, { useEffect, useState } from 'react';
// import { ChevronDown } from 'lucide-react';

interface SlideImage {

  alt: string;
  src: string,
}

interface SlideCollections {
  landscape: SlideImage[];
  portrait: SlideImage[];
}

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLandscape, setIsLandscape] = useState<boolean>(true);
  
  // Separate collections for different orientations
  const slideCollections: SlideCollections = {
    landscape: [
      {
        src: "/assets/images/lan1.jpg", 
        alt: 'Landscape photography 1',
      },
      {
        src: "/assets/images/lan2.jpg",
        alt: 'Landscape photography 2'
      },
      {
        src: "/assets/images/lan3.jpg",
        alt: 'Landscape photography 3'
      },
      {
        src: "/assets/images/lan4.jpg",
        alt: 'Landscape photography 4'
      }
    ],
    portrait: [
      {
        src: "/assets/images/port1.jpg", 
        alt: 'Landscape photography 1',
      },
      {
        src: "/assets/images/port2.jpg",
        alt: 'Landscape photography 2'
      },
      {
        src: "/assets/images/port3.jpg",
        alt: 'Landscape photography 3'
      },
      {
        src: "/assets/images/port4.jpg",
        alt: 'Landscape photography 4'
      }
    ]
  };

  // Get current image collection based on screen orientation
  const currentCollection = isLandscape ? slideCollections.landscape : slideCollections.portrait;

  // Detect screen orientation and size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Mobile portrait: width < 768px and height > width
      // Tablet/Desktop landscape: width >= 768px or width > height
      setIsLandscape(width >= 768 || width > height);
      
      // Reset slide when orientation changes
      setCurrentSlide(0);
    };

    // Initial check
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentCollection.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentCollection.length]);

  useEffect(() => {
    // Completely disable hover effects on touch devices AND fix viewport issues
    const styleId = 'mobile-touch-fix';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Reset all margins and padding */
        * {
          box-sizing: border-box;
        }
        
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          overflow-x: hidden !important;
        }
        
        #root, .hero-container {
          margin: 0 !important;
          padding: 0 !important;
          width: 100vw !important;
          max-width: 100vw !important;
        }
        
        /* Disable ALL hover effects on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .hero-button:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
            transform: none !important;
          }
          
          .scroll-indicator:hover {
            opacity: 0.75 !important;
          }
        }
        
        /* Enable hover effects only on devices with hover capability */
        @media (hover: hover) and (pointer: fine) {
          .hero-button:hover {
            box-shadow: 0 0 20px rgba(161, 161, 170, 0.4) !important;
            transform: scale(1.05) !important;
          }
          
          .scroll-indicator:hover {
            opacity: 1 !important;
          }
        }
        
        /* Better background image handling */
        .hero-bg {
          background-position: center center;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
        
        /* Slideshow animations */
        .slide-image {
          transition: opacity 1.5s ease-in-out;
        }
        
        .slide-indicators {
          transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
          .hero-bg {
            background-attachment: scroll;
            background-size: cover !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <section 
      className="hero-container relative bg-black overflow-hidden" 
      style={{ 
        margin: 0, 
        padding: 0, 
        width: '100vw',
        height: '100vh',
        minWidth: '100vw',
        maxWidth: '100vw',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'relative'
      }}
    >
      {/* Background Slideshow */}
      <div 
        className="absolute z-0 hero-bg" 
        style={{ 
          width: '100vw', 
          height: '100vh', 
          left: 0, 
          right: 0, 
          top: 0, 
          bottom: 0,
          margin: 0,
          padding: 0,
          inset: 0
        }}
      >
        {currentCollection.map((image, index) => (
          <div
            key={`${isLandscape ? 'landscape' : 'portrait'}-${index}`}
            className={`slide-image absolute w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1500 ${
              index === currentSlide ? 'opacity-70' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              width: '100vw',
              height: '100vh'
            }}
            aria-label={image.alt}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" style={{ width: '100vw', height: '100vh' }}></div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {currentCollection.map((_, index) => (
          <button
            key={`indicator-${isLandscape ? 'landscape' : 'portrait'}-${index}`}
            onClick={() => goToSlide(index)}
            className={`slide-indicators w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
              index === currentSlide 
                ? 'bg-white shadow-lg' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          />
        ))}
      </div>

      {/* Content */}
      <div 
        className="absolute z-10 flex flex-col justify-center items-center text-center"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '1200px',
          padding: '0 1rem'
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter">
          <span className="block">Capturing Moments</span>
          <span className="block mt-2">Creating Memories</span>
        </h1>
        <p className="mt-4 sm:mt-6 max-w-sm sm:max-w-lg mx-auto text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
          Professional photography that tells your unique story
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none">
          <a 
            href="#contact" 
            className="hero-button text-white backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-full py-3 px-6 shadow-lg transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              userSelect: 'none'
            }}
          >
            Book a Shoot
          </a>
          <a 
            href="#services" 
            className="hero-button text-white backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-full py-3 px-6 shadow-lg transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              userSelect: 'none'
            }}
          >
            View Price List
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a 
          href="#gallery" 
          className="scroll-indicator text-white opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-2"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
      </div> */}
    </section>
  );
};