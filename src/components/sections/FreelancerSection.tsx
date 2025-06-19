import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

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
          // SOA (Scroll On Appear) - show element when it enters viewport
          setIsVisible(true);
        } else {
          // SOD (Scroll On Disappear) - hide element when it leaves viewport
          setIsVisible(false);
        }
      },
      { 
        threshold, 
        rootMargin: '-50px 0px -50px 0px' // More aggressive margins for better control
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
};

const AnimatedElement: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}> = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, isVisible] = useScrollAnimation();

  const getTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(30px)';
      case 'down': return 'translateY(-30px)';
      case 'left': return 'translateX(30px)';
      case 'right': return 'translateX(-30px)';
      default: return 'translateY(30px)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) translateX(0) scale(1)' : `${getTransform()} scale(0.95)`,
        transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${isVisible ? delay : 0}ms`,
      }}
    >
      {children}
    </div>
  );
};

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  image,
  rating,
  delay = 0
}) => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className={`group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-800 hover:-translate-y-1 ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
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
      
      <p className="text-gray-600 dark:text-gray-300 italic mb-8 text-lg leading-relaxed font-light">
        "{quote}"
      </p>
      
      <div className="flex items-center">
        <div className="relative">
          <img 
            src={image} 
            alt={author} 
            className="w-14 h-14 rounded-full object-cover mr-5 ring-2 ring-teal-500/20 group-hover:ring-teal-500/40 transition-all duration-300" 
          />
          <div className="absolute inset-0 w-14 h-14 rounded-full bg-teal-500/10 -z-10 group-hover:bg-teal-500/20 transition-all duration-300"></div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-lg tracking-wide">
            {author}
          </h4>
          <p className="text-gray-500 dark:text-gray-400 font-light">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

const ExperienceCard: React.FC<{
  title: string;
  period: string;
  description: string;
  delay: number;
}> = ({ title, period, description, delay }) => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className={`group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-800 hover:-translate-y-1 ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white text-lg tracking-wide">
          {title}
        </h4>
        <span className="text-sm text-teal-600 dark:text-teal-400 font-medium bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded-full">
          {period}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed">
        {description}
      </p>
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
          Freelance Photography
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
        Available for freelance projects worldwide
      </p>
    </div>
  );
};

const SectionTitle: React.FC<{ 
  children: React.ReactNode; 
  delay?: number; 
  direction?: 'left' | 'right' 
}> = ({ children, delay = 200, direction = 'left' }) => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  return (
    <h3 
      ref={ref}
      className={`text-2xl font-semibold text-gray-900 dark:text-white mb-8 tracking-wide transition-all duration-800 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : direction === 'left' 
            ? 'opacity-0 -translate-x-6' 
            : 'opacity-0 translate-x-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </h3>
  );
};

export const FreelancerSection: React.FC = () => {
  return (
    <section id="freelance" className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionTitle direction="left">
              Professional Experience
            </SectionTitle>
            
            <div className="space-y-6">
              <ExperienceCard
                title="Nadun Badhuge Weddings"
                period="2020 - 2022"
                description="Freelance travel photographer for NB Weddings"
                delay={100}
              />

              <ExperienceCard
                title="Agani Fine Arts"
                period="2018 - 2020"
                description="Freelance travel photographer for Agani Weddings"
                delay={200}
              />

              <ExperienceCard
                title="CameraLK Student"
                period="2017 - 2018"
                description="Complete CameraLK Course"
                delay={300}
              />
            </div>
          </div>

          <div>
            <SectionTitle direction="right">
              Client Testimonials
            </SectionTitle>
            
            <div className="space-y-8">
              <Testimonial 
                quote="Tharun captured our wedding day perfectly. The photos exceeded our expectations and brought tears to our eyes." 
                author="Ishara & Inuri" 
                role="Wedding Clients" 
                image="https://res.cloudinary.com/dcbjrnh3b/image/upload/v1748539333/inuri_ishara-11_nzwybd.jpg" 
                rating={5}
                delay={100}
              />
              
              <Testimonial 
                quote="Working with Tharun on our company event was seamless. The photos perfectly captured our brand's essence." 
                author="Lithmi & Jehaad" 
                role="Wedding Clients" 
                image="https://res.cloudinary.com/dcbjrnh3b/image/upload/v1748541722/Lith_jay02_fhtqfl.jpg" 
                rating={5}
                delay={200}
              />
              
              <Testimonial 
                quote="The portrait session with Tharun was comfortable and fun. The results were absolutely stunning." 
                author="Mevina" 
                role="Birthday Client" 
                image="https://res.cloudinary.com/dcbjrnh3b/image/upload/v1748542049/mev-main_wqsxrq.jpg" 
                rating={5}
                delay={300}
              />
            </div>
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};