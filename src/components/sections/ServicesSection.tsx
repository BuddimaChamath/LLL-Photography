import React from 'react';
import { User, Heart, MapPin, Calendar, FileText, Download, Eye } from 'lucide-react';

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  features: string[];
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  price,
  features
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        <p className="mt-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
          {price}
        </p>
        <ul className="mt-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
              <span className="mr-2 text-blue-600 dark:text-blue-400">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PDFSection: React.FC = () => {
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
    <div className="mt-8 w-full">
      <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        {/* Header section */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Complete Services Brochure</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Download detailed pricing and package information</p>
          </div>
        </div>
        
        {/* Buttons section - always stacked on mobile, side by side on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handlePDFView}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            <span>View PDF</span>
          </button>
          <button
            onClick={handlePDFDownload}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ServicesHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <br></br>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            Photography Services
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
          </h2>
          <br></br>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Professional photography packages tailored to your needs
      </p>
    </div>
  );
};

const ServicesGrid: React.FC = () => {
  const services = [
    {
      icon: <User className="w-6 h-6" />,
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
      icon: <Heart className="w-6 h-6" />,
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
      icon: <MapPin className="w-6 h-6" />,
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
      icon: <Calendar className="w-6 h-6" />,
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
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  );
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesHeader />
        <ServicesGrid />
        <PDFSection />
      </div>
    </section>
  );
};