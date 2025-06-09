import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description Section */}
          <div className="md:col-span-2 text-center md:text-left">
            <a href="#" className="flex items-center justify-center md:justify-start mb-4">
              <img 
                src="/assets/logo.png" 
                alt="LLL - Live Laugh Love" 
                className="h-14 w-auto object-contain"
              />
            </a>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md mx-auto md:mx-0">
              Capturing life's precious moments with artistic vision and
              technical excellence. Available for bookings worldwide.
            </p>
            <div className="flex space-x-4 mt-6 justify-center md:justify-start">
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links Section */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#gallery" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
                >
                  About Me
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#freelance" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
                >
                  Freelance Work
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info Section */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 dark:text-gray-400">
                📍 Battaramulla, Sri Lanka
              </li>
              <li>
                <a 
                  href="mailto:tharungoutham25@gmail.com" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  ✉️ tharungoutham25@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+94755996155" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  📞 +94 755996155
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} Tharun Goutham Photography. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <a 
                href="#" 
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <a 
                href="#" 
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};