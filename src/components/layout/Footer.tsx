import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

// Custom TikTok icon component since it's not in lucide-react
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.321 5.562a5.122 5.122 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.849-1.348-2.065-1.348-3.338h-3.064v13.995a3.634 3.634 0 11-3.634-3.634c.211 0 .417.019.621.054V7.551c-.204-.033-.413-.054-.621-.054A7.5 7.5 0 002.195 15a7.5 7.5 0 007.5 7.5 7.5 7.5 0 007.5-7.5V9.266c1.126.663 2.418 1.04 3.805 1.04V6.602c-.85 0-1.656-.242-2.349-.663-.373-.225-.72-.491-1.031-.795-.311-.304-.595-.646-.824-1.019-.139-.227-.253-.465-.329-.708-.08-.257-.133-.521-.133-.798V2h-3.013v.562z"/>
  </svg>
);

// Custom WhatsApp icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

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
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="p-3 rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 ease-out hover:scale-110 backdrop-blur-sm"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5" />
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
                {['Gallery', 'About', 'Services', 'Testimonials', 'Contact'].map((item) => (
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