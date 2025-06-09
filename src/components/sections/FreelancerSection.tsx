import React from 'react';
import { StarIcon } from 'lucide-react';
type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating: number;
};
const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  image,
  rating
}) => {
  return <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        {Array.from({
        length: 5
      }).map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill={i < rating ? 'currentColor' : 'none'} />)}
      </div>
      <p className="text-gray-600 dark:text-gray-400 italic mb-6">"{quote}"</p>
      <div className="flex items-center">
        <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">
            {author}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </div>;
};
export const FreelancerSection: React.FC = () => {
  return <section id="freelance" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            Freelance Photography
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Available for freelance projects worldwide
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Professional Experience
            </h3>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Nadun Badhuge Weddings
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2020 - 2022
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Freelance travel photographer for NB Weddings
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Agani Fine Arts
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2018 - 2020
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Freelance travel photographer for Agani Weddings
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    CameraLK Student
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    2017 - 2018
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete CameraLK Course
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Client Testimonials
            </h3>
            <div className="space-y-6">
              <Testimonial quote="Tharun captured our wedding day perfectly. The photos exceeded our expectations and brought tears to our eyes." author="Ishara & Inuri" role="Wedding Clients" image="/assets/inuri&ishara-01.jpg" rating={5} />
              <Testimonial quote="Working with Tharun on our company event was seamless. The photos perfectly captured our brand's essence." author="Lithmi & Jehaad" role="Wedding Clients" image="/assets/Lith&jay02.JPG" rating={5} />
              <Testimonial quote="The portrait session with Tharun was comfortable and fun. The results were absolutely stunning." author="Mevina" role="Birthday Client" image="/assets/mev-01.jpg" rating={5} />
            </div>
          </div>
        </div>
      </div>
    </section>;
};