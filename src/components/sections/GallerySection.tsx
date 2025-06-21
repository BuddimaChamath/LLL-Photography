import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Info } from 'lucide-react';
import { altitudeCollection } from '../../collections/altitude-collection';
import { piyumiShasithaWedCollection } from '../../collections/piyumiShasitha-collection';
import { inuriIsharaWedCollection } from '../../collections/inuriIshara-collection';
import { erandiHeshanWedCollection } from '../../collections/erandiHeshan-collection';
import { lithmiJehaadWedCollection } from '../../collections/lithmiJehaad-collection';
import { iitConvoCollection } from '../../collections/iitConvo-collection';
import { taniaConvoCollection } from '../../collections/taniaConvo-collection';
import { aditiBdayCollection } from '../../collections/aditiBday-collection';
import { adoraBdayCollection } from '../../collections/adoraBday-collection';
import { diliniRobinEngCollection } from '../../collections/diliniRobinEng-collection';
import { dulanjaliBdayCollection } from '../../collections/dulanjaliBday-collection';
import { pinkyBdayCollection } from '../../collections/pinkyBday-collection';
import { mevinaBdayCollection } from '../../collections/mevinaBday-collection';

// Cloudinary optimization utilities
const getOptimizedImageUrl = (url: string, options: {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif';
  crop?: 'fill' | 'fit' | 'pad' | 'scale' | 'limit';
  gravity?: 'auto' | 'face' | 'center';
  preserveAspectRatio?: boolean;
} = {}) => {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'limit',
    gravity = 'auto',
    preserveAspectRatio = true
  } = options;

  if (!url.includes('cloudinary.com')) return url;
  
  const [baseUrl, imagePath] = url.split('/upload/');
  if (!baseUrl || !imagePath) return url;
  
  const transformations = [];
  
  if (width || height) {
    const dimensions = [];
    
    if (preserveAspectRatio) {
      if (width) dimensions.push(`w_${width}`);
      if (height) dimensions.push(`h_${height}`);
      dimensions.push(`c_limit`);
    } else {
      if (width) dimensions.push(`w_${width}`);
      if (height) dimensions.push(`h_${height}`);
      dimensions.push(`c_${crop}`);
      if (crop === 'fill') dimensions.push(`g_${gravity}`);
    }
    
    transformations.push(dimensions.join(','));
  }
  
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);
  
  return `${baseUrl}/upload/${transformations.join('/')}/fl_progressive/${imagePath}`;
};

// Image preloader utility
const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Intersection Observer hook for lazy loading
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px', ...options }
    );

    const current = targetRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return { targetRef, isIntersecting };
};

// Optimized Image Component
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  preserveAspectRatio?: boolean;
  isModal?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  onClick,
  width,
  height,
  priority = false,
  placeholder,
  preserveAspectRatio = true,
  isModal = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { targetRef, isIntersecting } = useIntersectionObserver();
  
  const shouldLoad = priority || isIntersecting;
  
  const thumbnailUrl = useMemo(() => 
    getOptimizedImageUrl(src, { 
      width: width || 400, 
      height: height || 400, 
      quality: 70,
      format: 'auto',
      preserveAspectRatio: isModal || preserveAspectRatio,
      crop: isModal ? 'limit' : 'fill'
    }), [src, width, height, isModal, preserveAspectRatio]
  );
  
  const fullUrl = useMemo(() => 
    getOptimizedImageUrl(src, { 
      width: width ? width * 2 : 1600,
      height: height ? height * 2 : 1200,
      quality: 'auto',
      format: 'auto',
      preserveAspectRatio: true,
      crop: 'limit'
    }), [src, width, height]
  );

  useEffect(() => {
    if (!shouldLoad) return;
    
    const loadImage = async () => {
      try {
        await preloadImage(thumbnailUrl);
        setIsLoaded(true);
        preloadImage(fullUrl).catch(() => {});
      } catch {
        setIsError(true);
      }
    };
    
    loadImage();
  }, [shouldLoad, thumbnailUrl, fullUrl]);

  return (
    <div ref={targetRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          {placeholder ? (
            <img 
              src={placeholder} 
              alt={alt} 
              className="w-full h-full object-cover opacity-30 blur-sm"
            />
          ) : (
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      )}
      
      {isError && (
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Failed to load</span>
        </div>
      )}
      
      {isLoaded && (
        <img
          src={thumbnailUrl}
          alt={alt}
          className={`w-full h-full ${isModal ? 'object-contain' : 'object-cover'} transition-all duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClick}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
};

// Extended GalleryItem type
type Category = 'all' | 'portraits' | 'weddings' | 'events' | 'engagements' | 'birthday shoots' | 'baby shoots' | 'convocation';
type Image = {
  url: string;
  alt: string;
};

type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: Category[];
  title: string;
  description: string;
  images: Image[];
};

// Gallery Modal Component with Facebook-style scroll behavior
interface GalleryModalProps {
  gallery: GalleryItem;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ gallery, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());
  const [scrollY, setScrollY] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const preloadAdjacentImages = useCallback(async (index: number) => {
    const imagesToPreload = [
      index,
      (index + 1) % gallery.images.length,
      (index - 1 + gallery.images.length) % gallery.images.length,
      (index + 2) % gallery.images.length,
      (index - 2 + gallery.images.length) % gallery.images.length
    ];
    
    for (const idx of imagesToPreload) {
      if (!preloadedImages.has(idx) && !loadingImages.has(idx)) {
        setLoadingImages(prev => new Set([...prev, idx]));
        
        try {
          const optimizedUrl = getOptimizedImageUrl(gallery.images[idx].url, {
            width: 1600,
            height: 1200,
            quality: 'auto',
            format: 'auto',
            preserveAspectRatio: true,
            crop: 'limit'
          });
          
          await preloadImage(optimizedUrl);
          setPreloadedImages(prev => new Set([...prev, idx]));
        } catch (error) {
          console.warn(`Failed to preload image ${idx}:`, error);
        } finally {
          setLoadingImages(prev => {
            const next = new Set(prev);
            next.delete(idx);
            return next;
          });
        }
      }
    }
  }, [gallery.images, preloadedImages, loadingImages]);
  
  useEffect(() => {
    preloadAdjacentImages(currentImageIndex);
  }, [currentImageIndex, preloadAdjacentImages]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'i':
        case 'I':
          setIsInfoPanelOpen(prev => !prev);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  
  const goToNext = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev === gallery.images.length - 1 ? 0 : prev + 1
    );
    setScrollY(0); // Reset scroll when changing images
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [gallery.images.length]);
  
  const goToPrevious = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev === 0 ? gallery.images.length - 1 : prev - 1
    );
    setScrollY(0); // Reset scroll when changing images
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [gallery.images.length]);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  // Handle scroll with Facebook-style behavior
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    setScrollY(scrollTop);
  }, []);

  // Toggle info panel when clicking/tapping on image
  const handleImageClick = useCallback(() => {
    setIsInfoPanelOpen(prev => !prev);
  }, []);

  const currentImageUrl = useMemo(() => 
    getOptimizedImageUrl(gallery.images[currentImageIndex].url, {
      width: 1600,
      height: 1200,
      quality: 'auto',
      format: 'auto',
      preserveAspectRatio: true,
      crop: 'limit'
    }), [gallery.images, currentImageIndex]
  );
  
  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-300 animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-3 bg-gradient-to-b from-black/70 to-transparent z-50">
        <h3 className="text-white font-medium truncate max-w-md">
          {gallery.title} <span className="text-gray-300 text-sm">({currentImageIndex + 1}/{gallery.images.length})</span>
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setIsInfoPanelOpen(prev => !prev)}
            className="text-white hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Toggle information panel"
          >
            <Info size={20} />
          </button>
          <button 
            onClick={onClose} 
            className="text-white hover:text-red-400 transition-colors p-2 rounded-full hover:bg-white/10" 
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
  onClick={goToPrevious} 
  className="hidden md:block absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 z-20 transition-all hover:scale-110" 
  aria-label="Previous image"
>
  <ChevronLeft size={24} />
</button>

<button 
  onClick={goToNext} 
  className="hidden md:block absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 z-20 transition-all hover:scale-110" 
  aria-label="Next image"
>
  <ChevronRight size={24} />
</button>
    

      {/* Main content area */}
      <div className="w-full h-full flex">
        {/* Desktop Layout */}
        <div className="hidden md:flex w-full h-full">
          {/* Fixed Image Section */}
          <div 
            className={`${isInfoPanelOpen ? 'w-3/4' : 'w-full'} h-full relative flex items-center justify-center p-4 transition-all duration-300`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {!preloadedImages.has(currentImageIndex) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <span className="text-white text-sm">Loading...</span>
                </div>
              </div>
            )}
            
            <img 
              src={currentImageUrl}
              alt={gallery.images[currentImageIndex].alt} 
              className={`max-w-full max-h-full object-contain transition-opacity duration-500 cursor-pointer ${
                preloadedImages.has(currentImageIndex) ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={handleImageClick}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
              loading="eager"
            />
          </div>
          
          {/* Info Panel */}
          <div 
            className={`w-1/4 bg-white dark:bg-gray-900 overflow-y-auto flex-shrink-0 transition-all duration-300 border-l border-gray-200 dark:border-gray-700 ${
              isInfoPanelOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            } absolute right-0 top-0 bottom-0`}
            onScroll={handleScroll}
          >
            <div className="p-6">
              <h3 className="text-2xl font-serif mb-3 text-gray-900 dark:text-white">
                {gallery.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                {gallery.description}
              </p>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center justify-between">
                  Gallery Images
                  <span className="text-blue-600 dark:text-blue-400">{currentImageIndex + 1}/{gallery.images.length}</span>
                </h4>
                <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                  {gallery.images.map((image, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setCurrentImageIndex(idx)} 
                      className={`aspect-square overflow-hidden rounded cursor-pointer transition-all duration-200 hover:opacity-90 ${
                        idx === currentImageIndex ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-95' : 'hover:scale-95'
                      }`}
                    >
                      <OptimizedImage
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full"
                        width={100}
                        height={100}
                        preserveAspectRatio={false}
                        isModal={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  Image Details
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p><span className="font-medium">Category:</span> {gallery.category.join(', ')}</p>
                  <p><span className="font-medium">Total Images:</span> {gallery.images.length}</p>
                  <p><span className="font-medium">Current Image:</span> {gallery.images[currentImageIndex].alt}</p>
                </div>
              </div>
              
              <div className="h-32"></div>
            </div>
          </div>
        </div>

        

<div className="md:hidden w-full h-full relative overflow-hidden">
  {/* Main container with optimized smooth scroll */}
  <div 
    ref={scrollContainerRef}
    className="w-full h-full overflow-y-auto"
    style={{ 
      scrollBehavior: 'smooth',
      overscrollBehavior: 'contain',
      height: '100vh',
      minHeight: '100vh',
      WebkitOverflowScrolling: 'touch', // Better iOS scrolling
      willChange: 'scroll-position' // Optimize for scroll animations
    }}
  >
    {/* Fixed Image Container - Optimized for mobile */}
    <div 
      className={`relative w-full bg-black flex items-center justify-center transition-all duration-300 ease-out ${
        isInfoPanelOpen ? 'h-[60vh] min-h-[60vh]' : 'h-screen min-h-screen'
      }`}
      style={{
        transform: 'translateZ(0)', // Force hardware acceleration
        backfaceVisibility: 'hidden' // Reduce flickering
      }}
    >
      {/* Loading indicator */}
      {!preloadedImages.has(currentImageIndex) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
            <span className="text-white text-sm">Loading...</span>
          </div>
        </div>
      )}
      
      {/* Main Image - Optimized for mobile performance */}
      <div 
        className="w-full h-full flex items-center justify-center p-2 sm:p-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: 'translateZ(0)', // Hardware acceleration
          WebkitTransform: 'translateZ(0)'
        }}
      >
        <img 
          src={currentImageUrl}
          alt={gallery.images[currentImageIndex].alt} 
          className={`max-w-full max-h-full object-contain cursor-pointer transition-opacity duration-300 ${
            preloadedImages.has(currentImageIndex) ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => {
            setIsInfoPanelOpen(prev => !prev);
            if (!isInfoPanelOpen) {
              // Optimized scroll with requestAnimationFrame
              requestAnimationFrame(() => {
                if (scrollContainerRef.current) {
                  const viewportHeight = window.innerHeight;
                  scrollContainerRef.current.scrollTo({
                    top: viewportHeight * 0.6,
                    behavior: 'smooth'
                  });
                }
              });
            } else {
              requestAnimationFrame(() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }
              });
            }
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{ 
            userSelect: 'none', 
            WebkitUserSelect: 'none',
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translateZ(0)', // Hardware acceleration
            WebkitTransform: 'translateZ(0)'
          }}
          loading="eager"
        />
      </div>
      
      {/* Image counter overlay - optimized positioning */}
      {!isInfoPanelOpen && (
        <div 
          className="absolute bottom-4 left-1/2 bg-black/70 text-white text-sm rounded-full px-4 py-2 backdrop-blur-sm border border-white/20"
          style={{
            transform: 'translateX(-50%) translateZ(0)',
            WebkitTransform: 'translateX(-50%) translateZ(0)'
          }}
        >
          {currentImageIndex + 1} / {gallery.images.length}
        </div>
      )}
    </div>
    
    {/* Gallery Panel - Optimized transitions */}
    <div 
      className={`w-full bg-white dark:bg-gray-900 transition-all duration-300 ease-out ${
        isInfoPanelOpen 
          ? 'min-h-[60vh] opacity-100' 
          : 'h-0 opacity-0 overflow-hidden'
      }`}
      style={{
        transform: 'translateZ(0)', // Hardware acceleration
        WebkitTransform: 'translateZ(0)',
        willChange: isInfoPanelOpen ? 'height, opacity' : 'auto'
      }}
    >
      {isInfoPanelOpen && (
        <div className="p-4 sm:p-6">
          {/* Collection Title */}
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-serif text-gray-900 dark:text-white leading-tight">
              {gallery.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {gallery.description}
            </p>
          </div>
          
          {/* All Gallery Images - iOS Safari Compatible Grid */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Collection Gallery ({gallery.images.length} photos)
            </h4>
            <div 
              className="rounded-lg"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem', // 8px gap
                maxHeight: `${Math.min(Math.ceil(gallery.images.length / 3) * 120, 480)}px`,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                minHeight: '0'
              }}
            >
              {gallery.images.map((image, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setCurrentImageIndex(idx);
                    // Optimized scroll behavior
                    requestAnimationFrame(() => {
                      if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        });
                      }
                    });
                    // Delayed second scroll
                    setTimeout(() => {
                      requestAnimationFrame(() => {
                        if (scrollContainerRef.current) {
                          const viewportHeight = window.innerHeight;
                          scrollContainerRef.current.scrollTo({
                            top: viewportHeight * 0.6,
                            behavior: 'smooth'
                          });
                        }
                      });
                    }, 600); // Reduced delay for snappier feel
                  }} 
                  className={`overflow-hidden rounded cursor-pointer transition-all duration-200 ${
                    idx === currentImageIndex 
                      ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-95 shadow-lg' 
                      : 'hover:scale-95 hover:opacity-80 shadow-sm'
                  }`}
                  style={{
                    // Fixed sizing for 3 columns with gap
                    width: 'calc(33.333% - 0.334rem)', // Adjusted for 0.5rem gap
                    aspectRatio: '1 / 1',
                    flexShrink: 0,
                    // Hardware acceleration
                    transform: 'translateZ(0)',
                    WebkitTransform: 'translateZ(0)',
                    // iOS specific fixes
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    position: 'relative',
                    minWidth: '0',
                    minHeight: '0'
                  }}
                >
                  <OptimizedImage
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full"
                    width={100}
                    height={100}
                    preserveAspectRatio={false}
                    isModal={false}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Categories */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories:</span>
              {gallery.category.map((cat, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs">
                  {cat}
                </span>
              ))}
            </div>
          </div>
          
          {/* Scroll hint */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-full">
              <span>Tap main image to hide gallery • Swipe to navigate</span>
            </div>
          </div>
          
          {/* Extra padding for better scrolling experience */}
          <div className="h-8"></div>
        </div>
      )}
    </div>
    
    {/* Limit scroll area based on panel state */}
    {isInfoPanelOpen && (
      <div className="w-full h-20 bg-transparent" />
    )}
  </div>
</div>
      </div>
      
      {/* Keyboard shortcuts (desktop only) */}
      <div className="absolute bottom-4 left-4 text-white text-xs opacity-60 hidden md:block">
        <div className="flex gap-3">
          <span>← → Navigate</span>
          <span>I Toggle Info</span>
          <span>Click image to toggle info</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
};

// Main Gallery Section Component
export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    if (selectedGallery) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    }
  }, [selectedGallery]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const galleryItems: GalleryItem[] = useMemo(() => [
    {
      ...altitudeCollection,
      category: altitudeCollection.category as Category[],
    },
    {
      ...piyumiShasithaWedCollection,
      category: piyumiShasithaWedCollection.category as Category[],
    },
    {
      ...inuriIsharaWedCollection,
      category: inuriIsharaWedCollection.category as Category[],
    },
    {
      ...lithmiJehaadWedCollection,
      category: lithmiJehaadWedCollection.category as Category[],
    },
    {
      ...erandiHeshanWedCollection,
      category: erandiHeshanWedCollection.category as Category[],
    },
    {
      ...pinkyBdayCollection,
      category: pinkyBdayCollection.category as Category[],
    },
    {
      ...diliniRobinEngCollection,
      category: diliniRobinEngCollection.category as Category[],
    },
    {
      ...mevinaBdayCollection,
      category: mevinaBdayCollection.category as Category[],
    },
    {
      ...dulanjaliBdayCollection,
      category: dulanjaliBdayCollection.category as Category[],
    },
    {
      ...iitConvoCollection,
      category: iitConvoCollection.category as Category[],
    },
    {
      ...taniaConvoCollection,
      category: taniaConvoCollection.category as Category[],
    },
    {
      ...aditiBdayCollection,
      category: aditiBdayCollection.category as Category[],
    },
    {
      ...adoraBdayCollection,
      category: adoraBdayCollection.category as Category[],
    }
  ], []);
  
  const filteredItems = useMemo(() => 
    activeCategory === 'all' 
      ? galleryItems 
      : galleryItems.filter(item => item.category.includes(activeCategory)),
    [activeCategory, galleryItems]
  );

  // Reset animations when category changes
useEffect(() => {
  setAnimatedItems(new Set());
}, [activeCategory]);

useEffect(() => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target.id) {
        if (entry.isIntersecting) {
          // Element is entering viewport - add to animated items
          setAnimatedItems(prev => new Set([...prev, entry.target.id]));
        } else {
          // Element is leaving viewport - remove from animated items
          setAnimatedItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(entry.target.id);
            return newSet;
          });
        }
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '50px 0px -50px 0px' // Add some margin for smoother transitions
  });

  const observeElements = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      if (item.id) {
        observer.observe(item);
      }
    });
  };

  // Clear all animations when category changes
  setAnimatedItems(new Set());

  const timeoutId = setTimeout(observeElements, 300);

  return () => {
    clearTimeout(timeoutId);
    observer.disconnect();
  };
}, [filteredItems, activeCategory]);
  
  return (
    <section id="gallery" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            Gallery
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-teal-600 rounded-full"></span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through a collection of my best work across different photography styles
          </p>
        </div>
        
        {/* Filter tabs */}
        <div className="relative flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All Work' },
            { key: 'weddings', label: 'Weddings' },
            { key: 'birthday shoots', label: 'Birthday Shoots' },
            { key: 'events', label: 'Events' },
            { key: 'convocation', label: 'Convocation' },
            { key: 'baby shoots', label: 'Baby Shoots' },
            { key: 'engagements', label: 'Engagements' }
          ].map(({ key, label }) => (
            <button 
              key={key}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 transform scale-105' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`} 
              onClick={() => setActiveCategory(key as Category)}
            >
              {label}
            </button>
          ))}
        </div>
        
        {/* Gallery grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading gallery...</p>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No items found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => {
              const isAnimated = animatedItems.has(`gallery-${item.id}`);
              
              
              return (
  <div 
    key={item.id}
    id={`gallery-${item.id}`}
    className={`gallery-item group relative overflow-hidden rounded-lg shadow-lg transition-all duration-700 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer bg-white dark:bg-gray-800 ${
      isAnimated
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-10'
    }`}
    style={{
      transitionDelay: `${index * 100}ms`
    }}
                  onClick={() => setSelectedGallery(item)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      className={`w-full h-full transition-all duration-700 ${
                        hoveredItem === item.id ? 'scale-110 brightness-90' : 'scale-100'
                      }`}
                      onClick={() => setSelectedGallery(item)}
                      width={400}
                      height={400}
                      priority={index < 8}
                      preserveAspectRatio={false}
                      isModal={false}
                    />
                    
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                      hoveredItem === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-90'
                    }`}>
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-200 text-sm mb-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-300 bg-black/30 px-2 py-1 rounded-full">
                            {item.images.length} photos
                          </span>
                          <span className="text-xs text-gray-300 bg-black/15 px-2 py-1 rounded-full">
                            {item.category[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
      </div>
      
      {/* Modal */}
      {selectedGallery && (
        <GalleryModal 
          gallery={selectedGallery} 
          onClose={() => setSelectedGallery(null)} 
        />
      )}
    </section>
  );
};

export default GallerySection;