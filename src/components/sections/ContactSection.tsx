import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [cardVisibility, setCardVisibility] = useState({
    header: false,
    contactInfo: false,
    form: false,
    socialMedia: false
  });
  
  const headerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialMediaRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Enhanced scroll direction tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Individual card observers for precise SOD effect
  useEffect(() => {
    const createObserver = (ref: React.RefObject<HTMLElement>, cardName: keyof typeof cardVisibility) => {
      return new IntersectionObserver(
        ([entry]) => {
          const isIntersecting = entry.isIntersecting;
          const intersectionRatio = entry.intersectionRatio;
          
          // More aggressive thresholds for dramatic SOD effect
          const shouldShow = isIntersecting && intersectionRatio > 0.25;
          const shouldHide = !isIntersecting || intersectionRatio < 0.2;
          
          setCardVisibility(prev => ({
            ...prev,
            [cardName]: shouldShow && !shouldHide
          }));
        },
        {
          threshold: [0, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '50px 0px -50px 0px'
        }
      );
    };

    const observers = [
      { ref: headerRef, name: 'header' as const },
      { ref: contactInfoRef, name: 'contactInfo' as const },
      { ref: formRef, name: 'form' as const },
      { ref: socialMediaRef, name: 'socialMedia' as const }
    ];

    const observerInstances = observers.map(({ ref, name }) => {
      const observer = createObserver(ref, name);
      if (ref.current) {
        observer.observe(ref.current);
      }
      return { observer, ref };
    });

    return () => {
      observerInstances.forEach(({ observer, ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  // Dynamic animation classes for individual cards with backward blur exit
  const getCardAnimation = (cardName: keyof typeof cardVisibility, animationType = 'default') => {
    const isVisible = cardVisibility[cardName];
    
    if (!isVisible) {
      // Backward blur exit animations
      switch (animationType) {
        case 'header':
          return `opacity-0 ${scrollDirection === 'down' ? 'translate-z-[-200px] scale-75 rotate-y-12' : 'translate-z-[-150px] scale-80 rotate-y-[-8]'} blur-md transition-all duration-1000 ease-in-out transform-gpu`;
        case 'slideLeft':
          return `opacity-0 ${scrollDirection === 'down' ? 'translate-z-[-300px] scale-60 rotate-y-15' : 'translate-z-[-250px] scale-70 rotate-y-[-12]'} blur-lg transition-all duration-1200 ease-in-out transform-gpu`;
        case 'slideRight':
          return `opacity-0 ${scrollDirection === 'down' ? 'translate-z-[-300px] scale-60 rotate-y-[-15]' : 'translate-z-[-250px] scale-70 rotate-y-12'} blur-lg transition-all duration-1200 ease-in-out transform-gpu`;
        case 'social':
          return `opacity-0 ${scrollDirection === 'down' ? 'translate-z-[-400px] scale-50 rotate-y-20' : 'translate-z-[-350px] scale-60 rotate-y-[-20]'} blur-xl transition-all duration-900 ease-in-out transform-gpu`;
        default:
          return `opacity-0 ${scrollDirection === 'down' ? 'translate-z-[-200px] scale-75' : 'translate-z-[-150px] scale-80'} blur-md transition-all duration-800 ease-in-out transform-gpu`;
      }
    }

    // Smooth enter animations
    return `opacity-100 translate-z-0 scale-100 rotate-y-0 blur-0 transition-all duration-1400 ease-out transform-gpu`;
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden perspective-1000">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header Card */}
        <div ref={headerRef} className={`text-center mb-12 ${getCardAnimation('header', 'header')}`}>
          <div className="relative mb-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
              Get in Touch
            </h2>
            <div className={`mt-4 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 rounded-full mx-auto transition-all duration-1000 ease-out ${
              cardVisibility.header ? 'w-20 opacity-100 delay-300' : 'w-0 opacity-0'
            }`}></div>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to book a session? Reach out and
            let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information Card */}
          <div ref={contactInfoRef} className={getCardAnimation('contactInfo', 'slideLeft')}>
            <div className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ${
              cardVisibility.contactInfo ? 'hover:-translate-y-2 hover:shadow-2xl hover:scale-102' : ''
            } p-6 border border-white/20 dark:border-gray-700/20`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {/* Location */}
                <div className={`flex items-start group/item transition-all duration-500 ${
                  cardVisibility.contactInfo ? 'translate-x-0 opacity-100' : 'translate-x-[-20px] opacity-0'
                }`} style={{ transitionDelay: cardVisibility.contactInfo ? '200ms' : '0ms' }}>
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg transition-all duration-500 ${
                      cardVisibility.contactInfo ? 'group-hover/item:shadow-xl group-hover/item:scale-110 group-hover/item:rotate-3' : ''
                    }`}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      Location
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Battaramulla, Sri Lanka
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className={`flex items-start group/item transition-all duration-500 ${
                  cardVisibility.contactInfo ? 'translate-x-0 opacity-100' : 'translate-x-[-20px] opacity-0'
                }`} style={{ transitionDelay: cardVisibility.contactInfo ? '400ms' : '0ms' }}>
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg transition-all duration-500 ${
                      cardVisibility.contactInfo ? 'group-hover/item:shadow-xl group-hover/item:scale-110 group-hover/item:rotate-3' : ''
                    }`}>
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      Phone
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      +94 755996155
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className={`flex items-start group/item transition-all duration-500 ${
                  cardVisibility.contactInfo ? 'translate-x-0 opacity-100' : 'translate-x-[-20px] opacity-0'
                }`} style={{ transitionDelay: cardVisibility.contactInfo ? '600ms' : '0ms' }}>
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg transition-all duration-500 ${
                      cardVisibility.contactInfo ? 'group-hover/item:shadow-xl group-hover/item:scale-110 group-hover/item:rotate-3' : ''
                    }`}>
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      Email
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      tharungoutham25@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div ref={formRef} className={getCardAnimation('form', 'slideRight')}>
            <div className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ${
              cardVisibility.form ? 'hover:-translate-y-2 hover:shadow-2xl hover:scale-102' : ''
            } p-6 border border-white/20 dark:border-gray-700/20`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Send Me a Message
              </h3>
              
              {isSubmitted ? (
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 border border-teal-200 dark:border-teal-700 text-teal-800 dark:text-teal-300 p-6 rounded-xl animate-pulse">
                  <p className="font-bold text-base">Thank you for your message!</p>
                  <p className="mt-2 text-sm">
                    I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Form Fields */}
                  {[
                    { name: 'name', type: 'text', label: 'Name', delay: '200ms' },
                    { name: 'email', type: 'email', label: 'Email', delay: '400ms' },
                    { name: 'subject', type: 'select', label: 'Subject', delay: '600ms' },
                    { name: 'message', type: 'textarea', label: 'Message', delay: '800ms' }
                  ].map((field, index) => (
                    <div key={field.name} className={`transition-all duration-500 ${
                      cardVisibility.form ? 'translate-x-0 opacity-100' : 'translate-x-[20px] opacity-0'
                    }`} style={{ transitionDelay: cardVisibility.form ? field.delay : '0ms' }}>
                      <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          id={field.name}
                          name={field.name}
                          value={formState[field.name as keyof typeof formState]}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 dark:bg-gray-700 dark:text-white transition-all duration-300 backdrop-blur-sm text-sm"
                        >
                          <option value="">Select a subject</option>
                          <option value="booking">Book a Session</option>
                          <option value="freelance">Freelance Opportunity</option>
                          <option value="question">General Question</option>
                          <option value="other">Other</option>
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          rows={3}
                          value={formState[field.name as keyof typeof formState]}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 dark:bg-gray-700 dark:text-white transition-all duration-300 backdrop-blur-sm resize-none text-sm"
                        />
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formState[field.name as keyof typeof formState]}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 dark:bg-gray-700 dark:text-white transition-all duration-300 backdrop-blur-sm text-sm"
                        />
                      )}
                    </div>
                  ))}
                  
                  {/* Submit Button */}
                  <div className={`transition-all duration-500 ${
                    cardVisibility.form ? 'translate-x-0 opacity-100' : 'translate-x-[20px] opacity-0'
                  }`} style={{ transitionDelay: cardVisibility.form ? '1000ms' : '0ms' }}>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 text-white font-semibold rounded-xl transition-all duration-500 shadow-lg ${
                        cardVisibility.form && !isSubmitting 
                          ? 'hover:from-teal-700 hover:via-teal-600 hover:to-emerald-600 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1' 
                          : ''
                      } ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};