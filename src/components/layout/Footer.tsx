import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      {/* Google Fonts Import */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Lato:wght@300;400;500&display=swap" 
        rel="stylesheet" 
      />
      
      <footer 
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-12 border-t border-gray-200/50 dark:border-gray-700/50"
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 text-center md:text-left">
              <a href="#" className="flex items-center justify-center md:justify-start mb-4 group">
                <img 
                  src="/assets/logo.png" 
                  alt="LLL - Live Laugh Love" 
                  className="h-14 w-auto object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-500 ease-out"
                />
              </a>
              <p className="mt-4 text-gray-700 dark:text-gray-200 max-w-md leading-relaxed tracking-wide mx-auto md:mx-0">
                Capturing life's precious moments with artistic vision and
                technical excellence. Available for bookings worldwide.
              </p>
              <div className="flex space-x-4 mt-6 justify-center md:justify-start">
                <a 
                  href="#" 
                  className="p-3 rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 ease-out hover:scale-110 backdrop-blur-sm"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-3 rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 ease-out hover:scale-110 backdrop-blur-sm"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-3 rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 ease-out hover:scale-110 backdrop-blur-sm"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-3 rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 ease-out hover:scale-110 backdrop-blur-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 
                className="text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-4"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: '0.5px'
                }}
              >
                Quick Links
              </h3>
              <ul className="space-y-3">
                {['Gallery', 'About', 'Services', 'Freelance', 'Contact'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="relative text-base font-medium tracking-wide text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 ease-out group hover:translate-x-2"
                      style={{ 
                        fontFamily: "'Montserrat', sans-serif",
                        letterSpacing: '0.5px'
                      }}
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-600 to-blue-500 dark:from-teal-400 dark:to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 
                className="text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-4"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: '0.5px'
                }}
              >
                Contact Info
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-700 dark:text-gray-200 tracking-wide leading-relaxed">
                  Battaramulla, Sri Lanka
                </li>
                <li>
                  <a 
                    href="mailto:tharungoutham25@gmail.com"
                    className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 ease-out tracking-wide"
                  >
                    tharungoutham25@gmail.com
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+94755996155"
                    className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 ease-out tracking-wide"
                  >
                    +94 755996155
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
            <p 
              className="text-gray-700 dark:text-gray-200 text-sm text-center tracking-wide"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              © {currentYear} Tharun Goutham Photography. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};