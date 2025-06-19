import { useEffect, useState } from 'react';

interface HeroSectionProps {
  imagesPreloaded?: boolean; // Optional prop to indicate images are already preloaded
}

export const HeroSection: React.FC<HeroSectionProps> = ({ imagesPreloaded = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLandscape, setIsLandscape] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(imagesPreloaded);
  const [scrollY, setScrollY] = useState(0);

  // Image collections for different orientations
  const slideCollections = {
    landscape: [
      {
        src: "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493248/lan1_zamlol.jpg", 
        alt: 'Landscape photography 1',
      },
      {
        src: "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493254/lan2_wlyqke.jpg",
        alt: 'Landscape photography 2'
      },
      {
        src: "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493256/lan3_eytfi3.jpg",
        alt: 'Landscape photography 3'
      },
      {
        src: "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493251/lan4_fvmbii.jpg",
        alt: 'Landscape photography 4'
      }
    ],
    portrait: [
      {
        src: "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493233/port1_j62u4z.jpg", 
        alt: 'Portrait photography 1',
      },
      {
        src: "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493239/port2_kwap94.jpg",
        alt: 'Portrait photography 2'
      },
      {
        src: "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493252/port3_gkcg0s.jpg",
        alt: 'Portrait photography 3'
      },
      {
        src: "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493255/port4_lcraob.jpg",
        alt: 'Portrait photography 4'
      }
    ]
  };

  // Get current image collection based on screen orientation
  const currentCollection = isLandscape ? slideCollections.landscape : slideCollections.portrait;

  // Enhanced scroll-triggered animation system with disappear effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only preload images if they haven't been preloaded already
  useEffect(() => {
    if (imagesPreloaded) {
      setImagesLoaded(true);
      return;
    }

    const preloadImages = async () => {
      const loadPromises = currentCollection.map((image) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load ${image.src}`));
          img.src = image.src;
        });
      });

      try {
        await Promise.all(loadPromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true); // Still show component even if some images fail
      }
    };

    preloadImages();
  }, [currentCollection, imagesPreloaded]);

  // Detect screen orientation and size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsLandscape(width >= 768 || width > height);
      setCurrentSlide(0); // Reset slide when orientation changes
      
      // Only reset image loading if images weren't preloaded
      if (!imagesPreloaded) {
        setImagesLoaded(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [imagesPreloaded]);

  // Auto-advance slideshow
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentCollection.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentCollection.length, imagesLoaded]);

  // Content animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Calculate enhanced scroll-based transformations for disappear effect
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const scrollRatio = Math.min(scrollY / windowHeight, 1);
  
  const scrollTransform = {
    // Content fades out more aggressively
    opacity: Math.max(0, 1 - scrollRatio * 1.5),
    // Scale down as user scrolls
    scale: Math.max(0.7, 1 - scrollRatio * 0.4),
    // Move content up and away
    translateY: scrollRatio * 100,
    // Add blur effect for depth
    blur: scrollRatio * 15,
    // Background moves slower (parallax effect)
    backgroundTranslateY: scrollRatio * 50,
    // Background scales differently
    backgroundScale: Math.max(0.8, 1 - scrollRatio * 0.2),
    // Add rotation for dynamic effect
    rotate: scrollRatio * 5,
    // Brightness adjustment
    brightness: Math.max(0.3, 1 - scrollRatio * 0.7)
  };

  return (
    <>
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slideshow with enhanced scroll effects */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `scale(${scrollTransform.backgroundScale}) translateY(${scrollTransform.backgroundTranslateY}px)`,
            filter: `blur(${scrollTransform.blur}px) brightness(${scrollTransform.brightness})`,
            transition: 'none'
          }}
        >
          {currentCollection.map((image, index) => (
            <div
              key={`${isLandscape ? 'landscape' : 'portrait'}-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: 'translateZ(0)', // Hardware acceleration
                willChange: 'opacity'
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                style={{
                  imageRendering: 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden', // Prevent flickering
                  WebkitBackfaceVisibility: 'hidden'
                }}
                loading={index === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          ))}
          
          {/* Enhanced overlay with scroll-based opacity */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40"
            style={{
              opacity: Math.max(0.5, 1 - scrollRatio * 0.3)
            }}
          />
        </div>

        {/* Slide Indicators with scroll effects */}
        <div 
          className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3"
          style={{
            opacity: scrollTransform.opacity,
            transform: `translateX(-50%) translateY(${scrollTransform.translateY * 0.3}px) scale(${Math.max(0.5, 1 - scrollRatio * 0.5)})`
          }}
        >
          {currentCollection.map((_, index) => (
            <button
              key={`indicator-${isLandscape ? 'landscape' : 'portrait'}-${index}`}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full border transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 hover:bg-white/70 hover:border-teal-500/50 hover:scale-110 ${
                index === currentSlide 
                  ? 'bg-teal-500 border-teal-500 shadow-lg shadow-teal-500/40 scale-110' 
                  : 'bg-white/40 border-white/30'
              }`}
              aria-label={`Go to slide ${index + 1} of ${currentCollection.length}`}
            />
          ))}
        </div>

        {/* Content with enhanced scroll disappear effects */}
        <div 
          className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{
            opacity: scrollTransform.opacity,
            transform: `translateY(${isVisible ? scrollTransform.translateY : 40}px) scale(${scrollTransform.scale}) rotate(${scrollTransform.rotate}deg)`,
            filter: `blur(${Math.min(scrollTransform.blur * 0.3, 3)}px)`
          }}
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white drop-shadow-2xl">
            Your Friendly
            <br />
            Photographer
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 text-gray-100 drop-shadow-lg max-w-2xl mx-auto">
            Capturing Stories Through the Lens
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center w-full max-w-sm sm:max-w-none mx-auto px-4"
            style={{
              opacity: Math.max(0, scrollTransform.opacity - 0.2),
              transform: `scale(${Math.max(0.8, scrollTransform.scale)})`
            }}
          >
            <a 
              href="#contact" 
              className="text-white rounded-full py-3 sm:py-4 px-6 sm:px-8 focus:outline-none focus:ring-2 focus:ring-white/50 inline-block text-center w-full sm:w-auto sm:min-w-[160px] no-underline uppercase text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 border transform hover:scale-105"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                userSelect: 'none',
                fontFamily: 'Montserrat, system-ui, sans-serif',
                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(20, 184, 166, 0.2) 100%)',
                borderColor: 'rgba(20, 184, 166, 0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(20, 184, 166, 0.3) 100%)';
                e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.6)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(20, 184, 166, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(20, 184, 166, 0.2) 100%)';
                e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.4)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              Book a Shoot
            </a>
            
            <a 
              href="#services" 
              className="text-white rounded-full py-3 sm:py-4 px-6 sm:px-8 focus:outline-none focus:ring-2 focus:ring-white/50 inline-block text-center w-full sm:w-auto sm:min-w-[160px] no-underline uppercase text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 border transform hover:scale-105"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                userSelect: 'none',
                fontFamily: 'Montserrat, system-ui, sans-serif',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(20, 184, 166, 0.1) 50%, rgba(255, 255, 255, 0.1) 100%)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(20, 184, 166, 0.15) 50%, rgba(255, 255, 255, 0.15) 100%)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(20, 184, 166, 0.1) 50%, rgba(255, 255, 255, 0.1) 100%)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              View Services
            </a>
          </div>
        </div>

        {/* Loading indicator with scroll effects - only show if images aren't preloaded */}
        {!imagesLoaded && !imagesPreloaded && (
          <div 
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-30"
            style={{
              opacity: Math.max(0.5, 1 - scrollRatio * 0.5)
            }}
          >
            <div className="text-white text-lg font-light">Loading...</div>
          </div>
        )}
      </section>
    </>
  );
};

export default HeroSection;