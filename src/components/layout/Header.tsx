import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Menu, X, Moon, Sun } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [backgroundBrightness, setBackgroundBrightness] = useState('light');
  const {
    isDarkMode,
    toggleTheme
  } = useTheme();

  // Function to analyze background brightness
const analyzeBackgroundBrightness = useCallback(() => {
    const heroImages = document.querySelectorAll('section img');
  
  heroImages.forEach((imgEl) => {
    const img = imgEl as HTMLImageElement;
    if (!img.complete || img.naturalWidth === 0) return;
    if (img.offsetWidth === 0) return; // skip hidden images

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const sampleW = 160;
      const sampleH = 80;
      canvas.width = sampleW;
      canvas.height = sampleH;

      const scaleX = img.naturalWidth / img.offsetWidth;
      const scaleY = img.naturalHeight / img.offsetHeight;

      ctx.drawImage(
        img,
        0, 0, sampleW * scaleX, sampleH * scaleY,
        0, 0, sampleW, sampleH
      );

      const data = ctx.getImageData(0, 0, sampleW, sampleH).data;
      let total = 0;
      for (let i = 0; i < data.length; i += 4) {
        total += (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
      }

      const avg = total / (data.length / 4);
      setBackgroundBrightness(avg > 140 ? 'light' : 'dark');
    } catch (e) {
      setBackgroundBrightness('dark');
    }
  });
}, []);

  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
      setTimeout(analyzeBackgroundBrightness, 100);
    }
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('slideChanged', analyzeBackgroundBrightness); 
  setTimeout(analyzeBackgroundBrightness, 500);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('slideChanged', analyzeBackgroundBrightness); 
  };
}, [analyzeBackgroundBrightness]);

  // Load Google Fonts properly
  useEffect(() => {
    const linkId = 'header-google-fonts-link';
    if (!document.getElementById(linkId)) {
      const linkElement = document.createElement('link');
      linkElement.id = linkId;
      linkElement.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Lato:wght@300;400;500&display=swap';
      linkElement.rel = 'stylesheet';
      document.head.appendChild(linkElement);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Dynamic color classes based on scroll state and background brightness
  const getTextColorClasses = () => {
    if (isScrolled || isMenuOpen) {
      // When scrolled or menu open, use theme-based colors
      return 'text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400';
    } else {
      // When at top, invert based on background brightness
      if (backgroundBrightness === 'light') {
        return 'text-gray-800 hover:text-gray-900';
      } else {
        return 'text-white hover:text-gray-100';
      }
    }
  };

  const getButtonColorClasses = () => {
    if (isScrolled || isMenuOpen) {
      return 'bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80';
    } else {
      if (backgroundBrightness === 'light') {
        return 'bg-white/20 hover:bg-white/30 backdrop-blur-md';
      } else {
        return 'bg-black/20 hover:bg-black/30 backdrop-blur-md';
      }
    }
  };

  const getIconColorClasses = () => {
    if (isScrolled || isMenuOpen) {
      return isDarkMode ? 'text-amber-500' : 'text-slate-600';
    } else {
      if (backgroundBrightness === 'light') {
        return 'text-gray-700';
      } else {
        return 'text-white';
      }
    }
  };

  const getMenuIconColorClasses = () => {
    if (isScrolled || isMenuOpen) {
      return 'text-gray-700 dark:text-gray-200';
    } else {
      if (backgroundBrightness === 'light') {
        return 'text-gray-800';
      } else {
        return 'text-white';
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled || isMenuOpen
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/5 py-3' 
          : 'bg-transparent py-6'
      }`}
      style={{ 
        fontFamily: "'Lato', sans-serif",
        maxWidth: '100vw',
        boxSizing: 'border-box'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center flex-shrink-0 space-x-1 xs:space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
            <a href="#" className="flex items-center group flex-shrink-0">
              <img 
                src="/assets/logo.png" 
                alt="LLL - Live Laugh Love" 
                className={`transition-all duration-500 ease-out ${
                  isScrolled ? 'h-8 sm:h-10' : 'h-12 sm:h-16'
                } w-auto object-contain filter brightness-110 group-hover:brightness-125 max-w-full ${
                  !isScrolled && !isMenuOpen && backgroundBrightness === 'dark' 
                    ? 'drop-shadow-lg' 
                    : ''
                }`}
                style={{ 
  maxHeight: isScrolled ? '40px' : '64px',
  filter: isScrolled
    ? 'brightness(1.1)'  // gold on white navbar
    : backgroundBrightness === 'dark'
      ? 'brightness(0) invert(1)'  // white logo on dark photos
      : 'brightness(0)'            // black logo on light photos
}}
              />
            </a>
            {/* <div className="block relative min-w-0 flex-shrink-1">
              <h1 
                className={`font-medium transition-all duration-500 ease-out hover:text-teal-600 dark:hover:text-teal-400 cursor-default whitespace-nowrap overflow-hidden ${
                  isScrolled 
                    ? 'text-xs xs:text-sm sm:text-base md:text-lg' 
                    : 'text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl'
                } ${getTextColorClasses()} ${
                  !isScrolled && !isMenuOpen && backgroundBrightness === 'dark' 
                    ? 'drop-shadow-lg text-shadow-lg' 
                    : ''
                }`}
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: window.innerWidth < 480 ? '0.3px' : window.innerWidth < 768 ? '0.5px' : '1px',
                  fontWeight: '500',
                  textShadow: !isScrolled && !isMenuOpen && backgroundBrightness === 'dark' 
                    ? '0 2px 4px rgba(0,0,0,0.5)' 
                    : 'none'
                }}
              >
                THARUN GOUTHAM
              </h1>
            </div> */}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-10 flex-shrink-0">
            {['Gallery', 'About', 'Services', 'Testimonials', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className={`relative text-sm lg:text-base font-medium tracking-wide transition-all duration-300 ease-out group whitespace-nowrap ${
                  getTextColorClasses()
                } ${
                  !isScrolled && !isMenuOpen && backgroundBrightness === 'dark' 
                    ? 'drop-shadow-md' 
                    : ''
                }`}
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: '0.5px',
                  textShadow: !isScrolled && !isMenuOpen && backgroundBrightness === 'dark' 
                    ? '0 1px 3px rgba(0,0,0,0.5)' 
                    : 'none'
                }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <button 
              onClick={toggleTheme} 
              className={`p-2 sm:p-3 rounded-full transition-all duration-300 ease-out hover:scale-110 backdrop-blur-sm flex-shrink-0 ${
                getButtonColorClasses()
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? 
                <Sun className={`w-4 h-4 sm:w-5 sm:h-5 ${getIconColorClasses()}`} /> : 
                <Moon className={`w-4 h-4 sm:w-5 sm:h-5 ${getIconColorClasses()}`} />
              }
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 sm:p-3 rounded-lg transition-all duration-300 ease-out hover:scale-110 backdrop-blur-sm flex-shrink-0 ${
                getButtonColorClasses()
              }`}
              onClick={toggleMenu} 
              aria-label="Toggle menu"
            >
              {isMenuOpen ? 
                <X className={`w-5 h-5 sm:w-6 sm:h-6 ${getMenuIconColorClasses()}`} /> : 
                <Menu className={`w-5 h-5 sm:w-6 sm:h-6 ${getMenuIconColorClasses()}`} />
              }
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-6 pb-4 space-y-4 border-t border-gray-200/50 dark:border-gray-700/50 mt-4 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg shadow-lg">
            {['Gallery', 'About', 'Services', 'Testimonials', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="block text-lg font-medium tracking-wide text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 ease-out hover:translate-x-2 hover:scale-105 py-2 w-full px-4"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: '0.5px'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};