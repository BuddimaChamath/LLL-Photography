import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating: number;
  delay?: number;
};

const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { 
        threshold, 
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
};

const Testimonial: React.FC<TestimonialProps & { isActive: boolean }> = ({
  quote,
  author,
  role,
  image,
  rating,
  delay = 0,
  isActive
}) => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-700 hover:-translate-y-2 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-95'
      } ${isActive ? 'ring-1 ring-teal-400/50 shadow-lg shadow-teal-500/20' : ''}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      {/* Large Image Section */}
      <div className="relative h-80 sm:h-96 overflow-hidden">
        <img 
          src={image} 
          alt={author} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Floating Quote Icon */}
        <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
          <Quote className="w-5 h-5 text-white" />
        </div>
        
        {/* Rating Stars Overlay */}
        <div className="absolute top-6 left-6 flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-white/40'} transition-all duration-300`}
              style={{
                animationDelay: `${i * 100}ms`,
                animation: isVisible ? `starGlow 3s ease-in-out infinite ${i * 150}ms` : 'none'
              }}
              fill={i < rating ? 'currentColor' : 'none'} 
            />
          ))}
        </div>

        {/* Author Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h4 className="font-bold text-white text-xl mb-1 tracking-wide drop-shadow-lg">
            {author}
          </h4>
          <p className="text-white/90 font-medium text-sm uppercase tracking-wider drop-shadow-md">
            {role}
          </p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-8">
        {/* Rating Stars */}
        <div className="flex items-center mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} transition-all duration-300`}
              style={{
                animationDelay: `${i * 100}ms`,
                animation: isVisible ? `starPulse 2s ease-in-out infinite ${i * 100}ms` : 'none'
              }}
              fill={i < rating ? 'currentColor' : 'none'} 
            />
          ))}
        </div>
        
        {/* Quote Text */}
        <p className="text-gray-600 dark:text-gray-300 italic mb-8 text-lg leading-relaxed font-light">
          "{quote}"
        </p>
      </div>


    </div>
  );
};

const SectionHeader: React.FC = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  return (
    <div 
      ref={ref}
      className={`text-center mb-16 transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="relative mb-8">
        <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white tracking-wide leading-tight">
          Client Testimonials
        </h2>
        <div 
          className={`mt-4 h-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full mx-auto transition-all duration-1000 ${
            isVisible ? 'w-16' : 'w-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        ></div>
      </div>
      
      <p 
        className={`text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: '600ms' }}
      >
        Hear from those who've experienced the magic behind the lens
      </p>
    </div>
  );
};

export const FreelancerSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      quote: "Tharun's artistic vision transformed our special day into a visual masterpiece. Every frame tells our love story beautifully, capturing moments we'll treasure forever.",
      author: "Ishara & Inuri",
      role: "Wedding Couple",
      image: "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1748539333/inuri_ishara-11_nzwybd.jpg",
      rating: 5
    },
    {
      quote: "Professional, creative, and incredibly talented. Tharun captured emotions we didn't even know we were feeling during our most precious moments.",
      author: "Lithmi & Jehaad",
      role: "Wedding Couple",
      image: "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1748541722/Lith_jay02_fhtqfl.jpg",
      rating: 5
    },
    {
      quote: "Working with Tharun was pure magic. He made me feel comfortable and confident, and the results were beyond my wildest dreams.",
      author: "Mevina",
      role: "Portrait Session",
      image: "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1748542049/mev-main_wqsxrq.jpg",
      rating: 5
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || isUserInteracting) return;
    
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isUserInteracting, testimonials.length]);

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsUserInteracting(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    } else if (distance < -minSwipeDistance) {
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }

    setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsUserInteracting(true);
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 4000);
  };

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-teal-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/3 to-teal-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader />

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-10 mb-16">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              {...testimonial}
              delay={index * 300}
              isActive={false}
            />
          ))}
        </div>

        {/* Mobile/Tablet Swipe View */}
        <div className="lg:hidden relative">
          <div 
            className="overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Testimonial
                    {...testimonial}
                    delay={0}
                    isActive={index === currentSlide}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Modern Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 h-3' 
                    : 'w-3 h-3'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-teal-500' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes starPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};