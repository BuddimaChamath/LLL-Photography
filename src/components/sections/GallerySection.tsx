import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Heart, Share2, ZoomIn, ZoomOut, Info, Download, Maximize2, RotateCcw, ArrowLeft } from 'lucide-react';
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

const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Enhanced Intersection Observer hook
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '100px', ...options }
    );

    const current = targetRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return { targetRef, isIntersecting };
};

// Enhanced device detection
const useDeviceDetection = () => {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    orientation: 'landscape' as 'portrait' | 'landscape',
    screenSize: { width: 0, height: 0 }
  });

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width <= 768;
      const isTablet = width > 768 && width <= 1024;
      const isDesktop = width > 1024;
      const orientation = width < height ? 'portrait' : 'landscape';

      setDevice({
        isMobile,
        isTablet,
        isDesktop,
        orientation,
        screenSize: { width, height }
      });
    };

    updateDevice();
    window.addEventListener('resize', updateDevice);
    window.addEventListener('orientationchange', updateDevice);

    return () => {
      window.removeEventListener('resize', updateDevice);
      window.removeEventListener('orientationchange', updateDevice);
    };
  }, []);

  return device;
};

// Enhanced OptimizedImage Component
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
  showSkeleton?: boolean;
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
  isModal = false,
  showSkeleton = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
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

  const retryLoad = useCallback(() => {
    if (retryCount < 3) {
      setIsError(false);
      setRetryCount(prev => prev + 1);
    }
  }, [retryCount]);

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
  }, [shouldLoad, thumbnailUrl, fullUrl, retryCount]);

  return (
    <div ref={targetRef} className={`relative overflow-hidden ${className}`}>
      {/* Enhanced skeleton loading */}
      {!isLoaded && !isError && showSkeleton && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          {placeholder ? (
            <img 
              src={placeholder} 
              alt={alt} 
              className="w-full h-full object-cover opacity-30 blur-sm"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}
      
      {/* Enhanced error state */}
      {isError && (
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 flex flex-col items-center justify-center p-4">
          <span className="text-gray-500 text-sm mb-2">Failed to load image</span>
          {retryCount < 3 && (
            <button 
              onClick={retryLoad}
              className="text-blue-600 text-xs hover:underline flex items-center gap-1"
            >
              <RotateCcw size={12} />
              Retry
            </button>
          )}
        </div>
      )}
      
      {/* Main image */}
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

// Extended types
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

// Enhanced Gallery Modal Component
interface GalleryModalProps {
  gallery: GalleryItem;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ gallery, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);
  
  const device = useDeviceDetection();
  
  // Auto-set info panel based on device
  useEffect(() => {
    setIsInfoPanelOpen(!device.isMobile);
  }, [device.isMobile]);
  
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
            width: device.isMobile ? 800 : 1600,
            height: device.isMobile ? 600 : 1200,
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
  }, [gallery.images, preloadedImages, loadingImages, device.isMobile]);
  
  useEffect(() => {
    preloadAdjacentImages(currentImageIndex);
  }, [currentImageIndex, preloadAdjacentImages]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          if (isFullscreen) {
            document.exitFullscreen?.();
          } else {
            onClose();
          }
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
        case 'z':
        case 'Z':
          setIsZoomed(prev => !prev);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'g':
        case 'G':
          setShowThumbnails(prev => !prev);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, isFullscreen]);
  
  const goToNext = useCallback(() => {
    setImageTransition(true);
    setTimeout(() => {
      setCurrentImageIndex(prev => 
        prev === gallery.images.length - 1 ? 0 : prev + 1
      );
      setImageTransition(false);
    }, 150);
  }, [gallery.images.length]);
  
  const goToPrevious = useCallback(() => {
    setImageTransition(true);
    setTimeout(() => {
      setCurrentImageIndex(prev => 
        prev === 0 ? gallery.images.length - 1 : prev - 1
      );
      setImageTransition(false);
    }, 150);
  }, [gallery.images.length]);
  
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, []);
  
  // Enhanced touch handling with momentum
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; time: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number; time: number } | null>(null);
  const minSwipeDistance = 50;
  const maxSwipeTime = 300;
  
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchEnd(null);
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const deltaTime = touchEnd.time - touchStart.time;
    
    // Check if it's a horizontal swipe and within time limit
    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaTime < maxSwipeTime) {
      const isLeftSwipe = deltaX > minSwipeDistance;
      const isRightSwipe = deltaX < -minSwipeDistance;
      
      if (isLeftSwipe) goToNext();
      if (isRightSwipe) goToPrevious();
    }
  };

  const currentImageUrl = useMemo(() => 
    getOptimizedImageUrl(gallery.images[currentImageIndex].url, {
      width: device.isMobile ? 800 : 1600,
      height: device.isMobile ? 600 : 1200,
      quality: 'auto',
      format: 'auto',
      preserveAspectRatio: true,
      crop: 'limit'
    }), [gallery.images, currentImageIndex, device.isMobile]
  );
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-300 animate-fade-in overflow-hidden">
      {/* Enhanced top controls bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-50">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          {device.isMobile && (
            <button
              onClick={onClose}
              className="text-white hover:text-red-400 transition-colors p-2 rounded-full hover:bg-white/10 flex-shrink-0"
              aria-label="Back to gallery"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-medium truncate text-sm sm:text-base">
              {gallery.title}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm">
              {currentImageIndex + 1} of {gallery.images.length}
            </p>
          </div>
        </div>
        
        <div className="flex gap-1 sm:gap-3 flex-shrink-0">
          {!device.isMobile && (
            <>
              
              <button
                onClick={() => setIsInfoPanelOpen(prev => !prev)}
                className="text-white hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Toggle information panel"
              >
                <Info size={18} />
              </button>
            </>
          )}
          <button
            onClick={() => setIsZoomed(prev => !prev)}
            className="text-white hover:text-blue-400 transition-colors p-1.5 sm:p-2 rounded-full hover:bg-white/10"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>
          {!device.isMobile && (
            <>
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Toggle fullscreen"
              >
                <Maximize2 size={18} />
              </button>
              <button 
                onClick={onClose} 
                className="text-white hover:text-red-400 transition-colors p-2 rounded-full hover:bg-white/10" 
                aria-label="Close gallery"
              >
                <X size={18} />
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Enhanced navigation arrows */}
      <button 
        onClick={goToPrevious} 
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 sm:p-3 z-20 transition-all hover:scale-110 active:scale-95 ${
          device.isMobile ? 'touch-manipulation' : ''
        }`}
        aria-label="Previous image"
      >
        <ChevronLeft size={device.isMobile ? 20 : 24} />
      </button>
      
      <button 
        onClick={goToNext} 
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 sm:p-3 z-20 transition-all hover:scale-110 active:scale-95 ${
          device.isMobile ? 'touch-manipulation' : ''
        }`}
        aria-label="Next image"
      >
        <ChevronRight size={device.isMobile ? 20 : 24} />
      </button>
      
      {/* Bottom thumbnail strip for mobile */}
      {device.isMobile && (
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div className="bg-gradient-to-t from-black/80 to-transparent px-4 pb-safe">
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              {gallery.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all ${
                    idx === currentImageIndex ? 'ring-2 ring-blue-500 scale-110' : 'opacity-60'
                  }`}
                >
                  <OptimizedImage
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full"
                    width={48}
                    height={48}
                    preserveAspectRatio={false}
                    showSkeleton={false}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className={`w-full h-full max-w-7xl flex ${device.orientation === 'portrait' ? 'flex-col' : 'flex-row'} overflow-hidden relative`}>
        {/* Image container */}
        <div 
          className={`w-full ${
            isInfoPanelOpen && !device.isMobile 
              ? device.orientation === 'portrait' ? 'h-2/3' : 'md:w-3/4' 
              : 'h-full'
          } transition-all duration-300 relative flex items-center justify-center ${
            device.isMobile ? 'px-2 py-16 pb-24' : 'p-4'
          }`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Loading indicator */}
          {!preloadedImages.has(currentImageIndex) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="flex flex-col items-center">
                <div className="w-8 sm:w-12 h-8 sm:h-12 border-3 sm:border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                <span className="text-white text-xs sm:text-sm">Loading...</span>
              </div>
            </div>
          )}
          
          <img 
            src={currentImageUrl}
            alt={gallery.images[currentImageIndex].alt} 
            className={`max-w-full max-h-full object-contain transition-all duration-300 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
            } ${preloadedImages.has(currentImageIndex) && !imageTransition ? 'opacity-100' : 'opacity-0'} ${
              device.isMobile ? 'touch-manipulation' : ''
            }`}
            onClick={() => setIsZoomed(prev => !prev)}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            loading="eager"
          />
        </div>
        
        {/* Enhanced info panel */}
        {!device.isMobile && (
          <div 
            className={`${
              device.orientation === 'portrait' ? 'w-full h-1/3' : 'w-1/4 h-full'
            } bg-white dark:bg-gray-900 overflow-y-auto flex-shrink-0 transition-all duration-300 border-l dark:border-gray-700 ${
              isInfoPanelOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute right-0 top-0 bottom-0'
            }`}
          >
            <div className="p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-serif mb-3 text-gray-900 dark:text-white">
                {gallery.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                {gallery.description}
              </p>
              
              {/* Image metadata */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Image Details</h4>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm">
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-medium">Title:</span> {gallery.images[currentImageIndex].alt}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Categories:</span> {gallery.category.join(', ')}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center justify-between">
                  Gallery Images
                  <span className="text-blue-600 dark:text-blue-400">{currentImageIndex + 1}/{gallery.images.length}</span>
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
                  {gallery.images.map((image, idx) => (
                    <button 
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
                        width={80}
                        height={80}
                        preserveAspectRatio={false}
                        isModal={false}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced keyboard shortcuts help */}
      {!device.isMobile && (
        <div className="absolute bottom-4 left-4 text-white text-xs opacity-60">
          <div className="flex gap-4 flex-wrap">
            <span>← → Navigate</span>
            <span>I Info</span>
            <span>Z Zoom</span>
            <span>F Fullscreen</span>
            <span>ESC Close</span>
          </div>
        </div>
      )}
      
      
    </div>
  );
};

// Main Gallery Section Component
export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
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
  
  // Memoized gallery items
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
  
  return (
    <section id="gallery" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            Portfolio Gallery
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
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
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer bg-white dark:bg-gray-800"
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
                    priority={index < 8} // Prioritize first 8 images
                    preserveAspectRatio={false} // Keep cropping for grid thumbnails
                    isModal={false}
                  />
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                    hoveredItem === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-90'
                  }`}>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-sm mb-2 ">
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
            ))}
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