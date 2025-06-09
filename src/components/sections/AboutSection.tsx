import React from 'react';
import { Camera, Heart, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
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

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://res.cloudinary.com/dcbjrnh3b/image/upload/q_auto,f_auto/cover_lbylpo.jpg" 
                alt="Photographer with camera" 
                className="w-full h-96 object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-600/10 rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-600/10 rounded-full -z-10" />
          </div>

          {/* Content Section */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            About Me
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
          </h2>
            
            <div className="mt-6 space-y-4">
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Hello! I'm Tharun Goutham, a professional photographer with over 7
                years of experience capturing life's most precious moments. My
                passion for photography began when I received my first camera as a
                teenager, and it has grown into a lifelong pursuit of visual
                storytelling.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                I specialize in portrait, wedding, travel, and event photography,
                bringing a unique perspective and artistic vision to each shoot.
                My philosophy is simple: every photo should tell a story and evoke
                emotion.
              </p>
            </div>

            {/* Features Grid */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};