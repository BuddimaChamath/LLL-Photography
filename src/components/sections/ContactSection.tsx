import React, { useState } from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, SendIcon, Instagram, Facebook, Twitter, Github } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            Get in Touch
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to book a session? Reach out and
            let's create something amazing together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <MapPinIcon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      Location
                    </h4>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      Battaramulla, Sri Lanka
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <PhoneIcon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      Phone
                    </h4>
                    <a 
                      href="tel:+94755996155" 
                      className="mt-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      +94 755996155
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <MailIcon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      Email
                    </h4>
                    <a 
                      href="mailto:tharungoutham25@gmail.com" 
                      className="mt-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      tharungoutham25@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 transition-all duration-200 hover:scale-110 transform"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  
                  <a 
                    href="#" 
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700 transition-all duration-200 hover:scale-110 transform"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  
                  <a 
                    href="#" 
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 transition-all duration-200 hover:scale-110 transform"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                  
                  <a 
                    href="#" 
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-900 transition-all duration-200 hover:scale-110 transform"
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Send Me a Message
              </h3>
              
              {isSubmitted ? (
                <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-medium">Thank you for your message!</p>
                      <p className="mt-1 text-sm">
                        I'll get back to you as soon as possible.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formState.name} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dark:bg-gray-700 dark:text-white ${
                        errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formState.email} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dark:bg-gray-700 dark:text-white ${
                        errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select 
                      id="subject" 
                      name="subject" 
                      value={formState.subject} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dark:bg-gray-700 dark:text-white ${
                        errors.subject ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">📸 Book a Photography Session</option>
                      <option value="wedding">💍 Wedding Photography</option>
                      <option value="portrait">👤 Portrait Session</option>
                      <option value="event">🎉 Event Photography</option>
                      <option value="freelance">💼 Freelance Opportunity</option>
                      <option value="question">❓ General Question</option>
                      <option value="collaboration">🤝 Collaboration</option>
                      <option value="other">📝 Other</option>
                    </select>
                    {errors.subject && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      value={formState.message} 
                      onChange={handleChange} 
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dark:bg-gray-700 dark:text-white resize-none ${
                        errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Tell me about your project, event details, or any specific requirements..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {formState.message.length}/500 characters
                    </p>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className={`w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <SendIcon className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};