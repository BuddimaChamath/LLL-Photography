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

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  price,
  features,
  index
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // SOA (Scroll On Appear) - show card when it enters viewport
          setIsVisible(true);
        } else {
          // SOD (Scroll On Disappear) - hide card when it leaves viewport
          setIsVisible(false);
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '-100px 0px -100px 0px' // More aggressive margins for better control
      }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-800 ease-out hover:-translate-y-2 hover:shadow-2xl ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-95'
      }`}
      style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
    >
      <div className="p-8">
        <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-700 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 mb-6">
          <div className="text-teal-600 dark:text-teal-400 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-teal-500/5 -z-10 group-hover:bg-teal-500/10 transition-colors duration-300"></div>
          {/* Animated ring on hover */}
          <div className="absolute inset-0 w-16 h-16 rounded-2xl border-2 border-teal-500/0 group-hover:border-teal-500/20 transition-all duration-300 group-hover:scale-125"></div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-wide mb-3 transition-colors duration-300 group-hover:text-teal-600 dark:group-hover:text-teal-400">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-6">
          {description}
        </p>
        
        <p className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-6 transition-transform duration-300 group-hover:scale-105">
          {price}
        </p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600 dark:text-gray-300 font-light transition-all duration-300 group-hover:translate-x-1">
              <span className="mr-3 text-teal-600 dark:text-teal-400 font-semibold transition-transform duration-300 group-hover:scale-110">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="mt-auto">
          <a 
            href="#contact" 
            className="block w-full py-3 px-6 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white text-center font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

const PDFSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // SOA (Scroll On Appear) - triggers when element enters viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // SOD (Scroll On Disappear) - triggers when element leaves viewport
          setIsVisible(false);
        }
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    if (pdfRef.current) observer.observe(pdfRef.current);

    return () => observer.disconnect();
  }, []);

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
      ref={pdfRef}
      className={`mt-16 w-full transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
    >
      <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Header section */}
        <div 
          className={`flex items-center gap-4 mb-8 transition-all duration-800 ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-6'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-2xl transition-transform duration-300 hover:scale-110">
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
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-800 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <button
            onClick={handlePDFView}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Eye className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
            <span>View PDF</span>
          </button>
          <button
            onClick={handlePDFDownload}
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
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
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // SOA (Scroll On Appear) - animate in when visible
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // SOD (Scroll On Disappear) - animate out when not visible
          setIsVisible(false);
        }
      },
      { threshold: 0.3, rootMargin: '-80px' }
    );

    if (headerRef.current) observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={headerRef}
      className="text-center mb-16"
    >
      <div 
        className={`relative mb-8 transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white tracking-wide leading-tight">
          Photography Services
        </h2>
        <div 
          className={`mt-4 h-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full mx-auto transition-all duration-1000 ease-out ${
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
        Professional photography packages tailored to your needs
      </p>
    </div>
  );
};

const ServicesGrid: React.FC = () => {
  const services = [
    {
      icon: <User className="w-7 h-7" />,
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
      icon: <Heart className="w-7 h-7" />,
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
      icon: <MapPin className="w-7 h-7" />,
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
      icon: <Calendar className="w-7 h-7" />,
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
    <section id="services" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesHeader />
        <ServicesGrid />
        <PDFSection />
      </div>
    </section>
  );
};