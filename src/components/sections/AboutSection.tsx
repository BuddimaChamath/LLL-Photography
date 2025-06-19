import React, { useEffect, useRef, useState } from 'react';
import { Camera, Heart, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Camera,
      title: "Expert Technique",
      description: "Using the latest equipment and advanced techniques"
    },
    {
      icon: Heart,
      title: "Wedding Specialist",
      description: "Capturing magical moments on your special day"
    },
    {
      icon: Users,
      title: "Freelance Professional",
      description: "Flexible services tailored to your unique needs"
    }
  ];

  // Scroll-triggered animation system
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate when section enters viewport
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      
      // Section is visible when it's in viewport
      const isInViewport = sectionTop < windowHeight && sectionBottom > 0;
      setSectionVisible(isInViewport);
      
      // Calculate scroll progress through the section (0 to 1)
      if (isInViewport) {
        const visibleHeight = Math.min(windowHeight, sectionBottom) - Math.max(0, sectionTop);
        const progress = Math.min(1, Math.max(0, visibleHeight / (windowHeight * 0.8)));
        setScrollProgress(progress);
      } else if (sectionTop > windowHeight) {
        setScrollProgress(0);
      } else if (sectionBottom < 0) {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scroll-based transformations
  const imageTransform = {
    opacity: Math.min(1, scrollProgress * 2),
    translateX: Math.max(-48, -48 * (1 - scrollProgress)),
    scale: 0.9 + scrollProgress * 0.1
  };

  const contentTransform = {
    opacity: Math.min(1, Math.max(0, (scrollProgress - 0.1) * 1.5)),
    translateY: Math.max(0, 48 * (1 - scrollProgress))
  };

  const headingTransform = {
    opacity: Math.min(1, Math.max(0, (scrollProgress - 0.2) * 2)),
    translateY: Math.max(0, 32 * (1 - scrollProgress)),
    lineWidth: Math.min(64, 64 * Math.max(0, scrollProgress - 0.4))
  };

  const decorativeCircleTransform = {
    opacity: Math.min(1, Math.max(0, (scrollProgress - 0.3) * 1.5)),
    scale: Math.min(1, Math.max(0, (scrollProgress - 0.3) * 2))
  };

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          {/* Image Section */}
          <div 
            className="relative transition-none"
            style={{
              opacity: imageTransform.opacity,
              transform: `translateX(${imageTransform.translateX}px) scale(${imageTransform.scale})`
            }}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <img 
                src="https://res.cloudinary.com/dcbjrnh3b/image/upload/q_auto,f_auto/cover_lbylpo.jpg" 
                alt="Photographer with camera" 
                className="w-full h-64 sm:h-80 lg:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            {/* Decorative circle with scroll-triggered animation */}
            <div 
              className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 w-32 h-32 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-teal-500/8 rounded-full -z-10 transition-none"
              style={{
                opacity: decorativeCircleTransform.opacity,
                transform: `scale(${decorativeCircleTransform.scale})`
              }}
            />
          </div>

          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8">
            {/* Heading with modern typography */}
            <div 
              className="relative transition-none"
              style={{
                opacity: headingTransform.opacity,
                transform: `translateY(${headingTransform.translateY}px)`
              }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-white tracking-wide leading-tight">
                About Me
              </h2>
              <div 
                className="mt-3 lg:mt-4 h-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full transition-none"
                style={{
                  width: `${headingTransform.lineWidth}px`
                }}
              ></div>
            </div>
            
            {/* Content with improved typography */}
            <div className="space-y-4 lg:space-y-6">
              <p 
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-semibold tracking-wide transition-none"
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollProgress - 0.3) * 2)),
                  transform: `translateY(${Math.max(0, 24 * (1 - Math.max(0, scrollProgress - 0.3)))}px)`
                }}
              >
                Hello! I'm <span className="font-bold text-gray-800 dark:text-gray-200">Tharun Goutham</span>, a professional photographer with over 7
                years of experience capturing life's most precious moments. My
                passion for photography began when I received my first camera as a
                teenager, and it has grown into a lifelong pursuit of visual
                storytelling.
              </p>
              
              <p 
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-semibold tracking-wide transition-none"
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollProgress - 0.4) * 2)),
                  transform: `translateY(${Math.max(0, 24 * (1 - Math.max(0, scrollProgress - 0.4)))}px)`
                }}
              >
                I specialize in portrait, wedding, travel, and event photography,
                bringing a unique perspective and artistic vision to each shoot.
                My philosophy is simple: every photo should tell a story and evoke
                emotion.
              </p>
            </div>

            {/* Features Grid with enhanced styling */}
            <div className="pt-6 lg:pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  
                  // Staggered animation for each feature
                  const featureDelay = 0.2 + (index * 0.1);
                  const rawProgress = Math.max(0, scrollProgress - featureDelay);
                  const featureProgress = Math.min(1, rawProgress * 3);
                  
                  return (
                    <div 
                      key={index} 
                      className="group text-center transition-none"
                      style={{
                        opacity: Math.max(0.1, featureProgress),
                        transform: `translateY(${Math.max(0, 32 * (1 - featureProgress))}px) scale(${0.95 + featureProgress * 0.05})`
                      }}
                    >
                      <div 
                        className="relative mb-6"
                      >
                        {/* Icon container with hover effect and rotating appear effect */}
                        <div 
                          className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1"
                          style={{
                            transform: `scale(${0.8 + featureProgress * 0.2}) rotateY(${(1 - featureProgress) * 180}deg)`
                          }}
                        >
                          <IconComponent className="w-7 h-7 text-teal-600 dark:text-teal-400 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        {/* Subtle accent circle */}
                        <div 
                          className="absolute inset-0 w-16 h-16 mx-auto rounded-2xl bg-teal-500/5 -z-10 group-hover:bg-teal-500/10 transition-colors duration-300"
                          style={{
                            opacity: featureProgress * 0.5
                          }}
                        />
                        
                        {/* Animated ring on hover */}
                        <div 
                          className="absolute inset-0 w-16 h-16 mx-auto rounded-2xl border-2 border-teal-500/0 group-hover:border-teal-500/20 transition-all duration-300 group-hover:scale-125"
                          style={{
                            borderColor: `rgba(20, 184, 166, ${featureProgress * 0.1})`
                          }}
                        />
                      </div>
                      
                      <h3 
                        className="text-lg font-semibold text-gray-900 dark:text-white mb-3 tracking-wide transition-colors duration-300 group-hover:text-teal-600 dark:group-hover:text-teal-400"
                        style={{
                          opacity: Math.min(1, featureProgress * 1.2),
                          transform: `translateY(${Math.max(0, 16 * (1 - featureProgress))}px)`
                        }}
                      >
                        {feature.title}
                      </h3>
                      
                      <p 
                        className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-semibold tracking-wide transition-colors duration-300"
                        style={{
                          opacity: Math.min(1, Math.max(0, featureProgress * 1.2 - 0.2)),
                          transform: `translateY(${Math.max(0, 12 * (1 - featureProgress))}px)`
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;