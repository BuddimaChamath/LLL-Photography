import React, { useEffect, useRef, useState } from 'react';
import { User, Heart, MapPin, Calendar, FileText, Download, Eye } from 'lucide-react';

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  features: string[];
  index: number;
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

const getImageForService = (title: string): string => {
  switch (title) {
    case "Engagement Full Package":
      return "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&crop=faces";
    case "Wedding Digital Package":
      return "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop&crop=faces";
    case "Travel Photography":
      return "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&crop=center";
    case "Event Coverage":
      return "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&crop=center";
    default:
      return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop&crop=center";
  }
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  price,
  features,
  index
}) => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-700 hover:-translate-y-2 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-95'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
      }}
    >
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-transparent to-blue-50/30 dark:from-teal-900/20 dark:via-transparent dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={getImageForService(title)} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Floating Icon */}
        <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
          <div className="text-white">
            {icon}
          </div>
        </div>
        
        {/* Floating price tag */}
        <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-full border border-white/30 dark:border-white/20 shadow-xl">
          <span className="text-white font-bold text-sm drop-shadow-lg">{price}</span>
        </div>
        
        {/* Service title overlay */}
        <div className="absolute top-6 left-6">
          <h4 className="font-bold text-white text-lg tracking-wide drop-shadow-lg">
            {title}
          </h4>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="relative p-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-wide mb-4 transition-colors duration-300 group-hover:text-teal-600 dark:group-hover:text-teal-400">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
        
        {/* Features list with enhanced styling */}
        <ul className="space-y-3">
          {features.map((feature, featureIndex) => (
            <li 
              key={featureIndex} 
              className={`flex items-center text-gray-600 dark:text-gray-300 font-light transition-all duration-300 group-hover:translate-x-1 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}
              style={{
                transitionDelay: isVisible ? `${(index * 150) + (featureIndex * 100)}ms` : '0ms'
              }}
            >
              <div className="mr-3 w-5 h-5 flex items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30 transition-transform duration-300 group-hover:scale-110">
                <span className="text-teal-600 dark:text-teal-400 font-bold text-xs">✓</span>
              </div>
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PDFSection: React.FC = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  const handlePDFDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/pdfs/Vogue by TG.pdf';
    link.download = 'Vogue by TG.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePDFView = () => {
    window.open('/assets/pdfs/Vogue by TG.pdf', '_blank');
  };

  return (
    <div 
      ref={ref}
      className={`mt-16 w-full transition-all duration-800 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-6 scale-98'
      }`}
    >
      <div className="max-w-2xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 hover:-translate-y-1">
        {/* Header section */}
        <div 
          className={`flex items-center gap-4 mb-8 transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-4'
          }`}
          style={{ 
            transitionDelay: isVisible ? '150ms' : '0ms'
          }}
        >
          <div className="p-4 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md rounded-2xl transition-transform duration-300 hover:scale-110 shadow-xl border border-white/50 dark:border-gray-600/50">
            <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg tracking-wide">
              Complete Services Brochure
            </h3>
            <p className="text-gray-500 dark:text-gray-400 font-light">
              Download detailed pricing and package information
            </p>
          </div>
        </div>
        
        {/* Buttons section */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-3'
          }`}
          style={{ 
            transitionDelay: isVisible ? '300ms' : '0ms'
          }}
        >
          <button
            onClick={handlePDFView}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md border border-white/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-white/90 dark:hover:bg-gray-600/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Eye className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
            <span>View PDF</span>
          </button>
          <button
            onClick={handlePDFDownload}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-2xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Download className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ServicesHeader: React.FC = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  return (
    <div 
      ref={ref}
      className="text-center mb-16"
    >
      <div 
        className={`relative mb-8 transition-all duration-800 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        }`}
      >
        <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white tracking-wide leading-tight">
          Photography Services
        </h2>
        <div 
          className={`mt-4 h-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full mx-auto transition-all duration-800 ease-out ${
            isVisible ? 'w-16' : 'w-0'
          }`}
          style={{ 
            transitionDelay: isVisible ? '300ms' : '0ms'
          }}
        ></div>
      </div>
      
      <p 
        className={`text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-800 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
        style={{ 
          transitionDelay: isVisible ? '450ms' : '0ms'
        }}
      >
        Professional photography packages tailored to your needs
      </p>
    </div>
  );
};

const ServicesGrid: React.FC = () => {
  const services = [
    {
      icon: <User className="w-8 h-8" />,
      title: "Engagement Full Package",
      description: "Professional Engagement photography package for reasonable price",
      price: "Rs. 85,000/-",
      features: [
        '8 Hour Coverage',
        '200 High Resolution Edited Images',
        '8x20 Magazine Album',
        'One 16x24 Enlargement'
      ]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Wedding Digital Package",
      description: "Comprehensive coverage for your special day",
      price: "Rs. 95,000/-",
      features: [
        '10 hours of coverage',
        'Second photographer',
        'All unedited pictures on Drive',
        '300+ edited high resolution images'
      ]
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Travel Photography",
      description: "Capture your adventures in stunning detail",
      price: "Rs. 50,000/-",
      features: [
        'Half-day coverage',
        'Location scouting',
        '30 edited photos',
        'Travel guide assistance',
        'Online gallery',
        'Social media package'
      ]
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Event Coverage",
      description: "Professional photography for your special events",
      price: "Rs. 25,000/-",
      features: [
        '4 hours of coverage',
        'Event coordination',
        '50 edited photos',
        'Online gallery',
        'Same-day previews',
        'Commercial use license'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service, index) => (
        <ServiceCard 
          key={index} 
          {...service} 
          index={index}
        />
      ))}
    </div>
  );
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced background elements - same as testimonials */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-teal-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/3 to-teal-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ServicesHeader />
        <ServicesGrid />
        <PDFSection />
      </div>

      <style>{`
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};