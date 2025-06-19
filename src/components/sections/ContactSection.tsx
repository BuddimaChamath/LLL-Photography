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

        {/* Social Media Card */}
        <div ref={socialMediaRef} className={`mt-12 ${getCardAnimation('socialMedia', 'social')}`}>
          <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/20 transition-all duration-700 ${
            cardVisibility.socialMedia ? 'hover:-translate-y-2 hover:shadow-2xl' : ''
          }`}>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
              Follow Me
            </h4>
            <div className="flex justify-center space-x-4">
              {[
                { icon: 'instagram', color: 'from-pink-500 to-orange-500' },
                { icon: 'twitter', color: 'from-blue-400 to-blue-600' },
                { icon: 'github', color: 'from-gray-700 to-gray-900' },
                { icon: 'facebook', color: 'from-blue-600 to-blue-800' }
              ].map((social, index) => (
                <a 
                  key={social.icon}
                  href="#" 
                  className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${social.color} text-white transition-all duration-700 shadow-lg ${
                    cardVisibility.socialMedia 
                      ? 'hover:scale-110 hover:shadow-xl hover:-translate-y-1 hover:rotate-3 opacity-100 translate-z-0 scale-100' 
                      : `opacity-0 scale-75 ${scrollDirection === 'down' ? 'translate-z-[-200px] rotate-y-12' : 'translate-z-[-150px] rotate-y-[-12]'} blur-md`
                  }`}
                  style={{ 
                    transitionDelay: cardVisibility.socialMedia ? `${300 + index * 150}ms` : `${index * 100}ms`
                  }}
                >
                  {/* Social media icons */}
                  {social.icon === 'instagram' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  )}
                  {social.icon === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  )}
                  {social.icon === 'github' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  )}
                  {social.icon === 'facebook' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};