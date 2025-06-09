import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { MenuIcon, XIcon, MoonIcon, SunIcon } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isDarkMode,
    toggleTheme
  } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <img 
                src="/assets/logo.png" 
                alt="LLL - Live Laugh Love" 
                className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-14'} w-auto object-contain`}
              />
            </a>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#gallery" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Gallery
            </a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Services
            </a>
            <a href="#freelance" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Freelance
            </a>
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-2" aria-label="Toggle theme">
              {isDarkMode ? <SunIcon className="w-5 h-5 text-gray-300" /> : <MoonIcon className="w-5 h-5 text-gray-700" />}
            </button>
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <XIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" /> : <MenuIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-3 space-y-3">
            <a href="#gallery" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Gallery
            </a>
            <a href="#about" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a href="#services" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Services
            </a>
            <a href="#freelance" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Freelance
            </a>
            <a href="#contact" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};