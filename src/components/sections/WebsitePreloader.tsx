import { useEffect, useState } from 'react';

// Enhanced Image Cache utility - memory only (no localStorage)
class ImageCache {
  private static cache = new Map<string, string>();
  private static MAX_CACHE_SIZE = 50; // Maximum number of images to cache

  static async preloadImage(src: string): Promise<string> {
    // Check memory cache first
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    // Load and cache new image
    return this.loadAndCacheImage(src);
  }

  private static async loadAndCacheImage(src: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const timeout = setTimeout(() => {
        reject(new Error('Image loading timeout'));
      }, 15000); // 15 second timeout
      
      img.onload = () => {
        clearTimeout(timeout);
        this.cacheToMemory(src);
        resolve(src);
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });
  }

  private static cacheToMemory(src: string): void {
    // Check cache size and clean if necessary
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      // Remove the first (oldest) entry
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
    
    this.cache.set(src, src);
  }

  static clearAllCache(): void {
    this.cache.clear();
  }

  static getCacheSize(): number {
    return this.cache.size;
  }
}

// Props interface for the preloader
interface WebsitePreloaderProps {
  onLoadingComplete?: () => void;
  imageUrls?: string[];
}

// Website Preloader Component
export const WebsitePreloader: React.FC<WebsitePreloaderProps> = ({ 
  onLoadingComplete, 
  imageUrls = [] 
}) => {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<string>('initializing');
  const [loadedImages, setLoadedImages] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [focusActive, setFocusActive] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, opacity: number}>>([]);

  // Default image URLs if none provided (includes logo)
  const defaultImageUrls: string[] = [
    "/assets/logo.png",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493248/lan1_zamlol.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493254/lan2_wlyqke.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493256/lan3_eytfi3.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493251/lan4_fvmbii.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493233/port1_j62u4z.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493239/port2_kwap94.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493252/port3_gkcg0s.jpg",
    "https://res.cloudinary.com/dcbjrnh3b/image/upload/v1749493255/port4_lcraob.jpg"
  ];

  const imagesToLoad = imageUrls.length > 0 ? imageUrls : defaultImageUrls;

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + 0.5) % 100,
        opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.2 + 0.3
      })));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Focus animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFocusActive(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Smooth stage transition function
  const changeStage = async (newStage: string): Promise<void> => {
    setIsTransitioning(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Fade out
    setCurrentStage(newStage);
    setIsTransitioning(false);
  };

  // Enhanced Camera Icon component for TypeScript
  const EnhancedCameraIcon: React.FC = () => (
    <div className="mb-16 relative">
      
      {/* Main camera container */}
      <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
        
        {/* Camera body with enhanced gradients */}
        <div className="w-20 h-14 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-xl relative shadow-2xl border border-slate-600/50">
          
          {/* Top accent line */}
          <div className="absolute top-1 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-slate-500 to-transparent rounded-full" />
          
          {/* Main lens assembly */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-14 h-14">
            
            {/* Outer lens ring with metallic effect */}
            <div className="w-14 h-14 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-full border-2 border-slate-500 shadow-xl relative">
              
              {/* Inner lens ring */}
              <div className="absolute inset-1 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-full border border-slate-600">
                
                {/* Lens glass with realistic reflections */}
                <div className="absolute inset-1 bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-full overflow-hidden">
                  
                  {/* Focus rings - animated */}
                  <div className={`absolute inset-1 border-2 rounded-full transition-all duration-1000 ${
                    focusActive 
                      ? 'border-emerald-400 shadow-lg shadow-emerald-400/50 scale-105' 
                      : 'border-slate-600 scale-100'
                  }`} />
                  <div className={`absolute inset-2 border rounded-full transition-all duration-1500 ${
                    focusActive ? 'border-emerald-300 opacity-80' : 'border-slate-700 opacity-60'
                  }`} />
                  
                  {/* Aperture blades simulation */}
                  <div className="absolute inset-3 rounded-full overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute inset-0 border-l border-slate-600 transition-all duration-1000 ${
                          focusActive ? 'opacity-40' : 'opacity-20'
                        }`}
                        style={{
                          transform: `rotate(${i * 60}deg)`,
                          transformOrigin: 'center'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Multi-layered lens reflections */}
                  <div className="absolute top-1 left-1 w-3 h-3 bg-white/40 rounded-full blur-sm" />
                  <div className="absolute top-2 left-3 w-1.5 h-1.5 bg-blue-200/60 rounded-full blur-sm" />
                  <div className="absolute bottom-2 right-1 w-2 h-2 bg-purple-200/30 rounded-full blur-sm" />
                  
                  {/* Center focus point */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    focusActive ? 'scale-110' : 'scale-100'
                  }`}>
                    <div className={`w-1 h-1 rounded-full transition-all duration-1000 ${
                      focusActive ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-slate-500'
                    }`} />
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Enhanced viewfinder */}
          <div className="absolute -top-3 right-2 w-4 h-3 bg-gradient-to-b from-slate-600 to-slate-700 rounded border border-slate-500 shadow-lg">
            <div className="absolute inset-0.5 bg-slate-800 rounded-sm">
              <div className={`absolute inset-0 transition-all duration-300 ${
                currentStage === 'loading' ? 'bg-green-400/20' : 'bg-transparent'
              }`} />
            </div>
          </div>
          
          {/* Enhanced flash with charging indicator */}
          <div className="absolute -top-3 left-2 relative">
            <div className={`w-3 h-2 rounded transition-all duration-500 ${
              currentStage === 'loading' 
                ? 'bg-gradient-to-r from-amber-300 to-yellow-400 shadow-lg shadow-amber-400/50' 
                : 'bg-gradient-to-r from-slate-600 to-slate-700'
            }`} />
            {currentStage === 'loading' && (
              <div className="absolute -inset-1 bg-amber-400/30 rounded blur-sm animate-pulse" />
            )}
          </div>
          
          {/* Camera grip texture */}
          <div className="absolute right-1 top-2 bottom-2 w-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-0.5 bg-slate-600 mb-0.5 rounded-full" />
            ))}
          </div>
          
          {/* Brand logo area */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex items-center space-x-1">
            <div className="w-6 h-0.5 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full" />
            <div className="w-1 h-1 bg-slate-500 rounded-full" />
          </div>
          
          {/* Mode dial */}
          <div className="absolute -top-1 left-1 w-3 h-3 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full border border-slate-500 shadow-md">
            <div className={`absolute inset-0.5 rounded-full transition-all duration-1000 ${
              currentStage === 'loading' ? 'bg-emerald-500' : 'bg-slate-700'
            }`} />
          </div>
        </div>
        
        {/* Dynamic shutter animations */}
        {currentStage === 'loading' && (
          <>
            {/* Primary focus ring */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-14 h-14 pointer-events-none">
              <div className="absolute inset-0 border-2 border-emerald-400 rounded-full animate-ping opacity-40" />
              <div className="absolute inset-1 border border-emerald-300 rounded-full animate-pulse opacity-60" />
            </div>
            
            {/* Secondary glow effect */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 pointer-events-none">
              <div className="absolute inset-0 bg-emerald-400/10 rounded-full animate-pulse" />
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Main loading process
  useEffect(() => {
    const loadWebsite = async (): Promise<void> => {
      try {
        // Stage 1: Initialize
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoadingProgress(5);

        // Stage 2: Load images
        await changeStage('loading');
        const totalImages = imagesToLoad.length;
        let loadedCount = 0;

        for (let i = 0; i < imagesToLoad.length; i++) {
          const url = imagesToLoad[i];
          
          try {
            await ImageCache.preloadImage(url);
            loadedCount++;
            setLoadedImages(loadedCount);
            
            // Progress from 5% to 85%
            const imageProgress = 5 + (loadedCount / totalImages) * 80;
            setLoadingProgress(imageProgress);
            
            // Small delay between images for smoother UX
            await new Promise(resolve => setTimeout(resolve, 200));
            
          } catch (error) {
            console.warn(`Failed to load image ${i + 1}:`, error);
            loadedCount++;
            setLoadedImages(loadedCount);
            
            const imageProgress = 5 + (loadedCount / totalImages) * 80;
            setLoadingProgress(imageProgress);
          }
        }

        console.log(`Preloaded ${loadedCount}/${totalImages} images successfully`);

        // Stage 3: Finalizing
        await changeStage('finalizing');
        setLoadingProgress(90);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Stage 4: Complete
        setLoadingProgress(100);
        await new Promise(resolve => setTimeout(resolve, 300));
        setIsComplete(true);
        
        // Wait for completion animation then callback
        setTimeout(() => {
          onLoadingComplete?.();
        }, 1200);

      } catch (error) {
        console.error('Loading error:', error);
        // Complete anyway after error
        setTimeout(() => {
          onLoadingComplete?.();
        }, 1000);
      }
    };

    loadWebsite();
  }, [imagesToLoad, onLoadingComplete]);

  const getStageText = (): string => {
    switch (currentStage) {
      case 'initializing':
        return 'Focusing Lens';
      case 'loading':
        return 'Capturing Memories';
      case 'finalizing':
        return 'Developing Experience';
      default:
        return 'Focusing Lens';
    }
  };

  const getSubText = (): string => {
    switch (currentStage) {
      case 'initializing':
        return 'Adjusting aperture and preparing sensors...';
      case 'loading':
        return 'Processing gallery images...';
      case 'finalizing':
        return 'Fine-tuning the perfect shot...';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center overflow-hidden">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-slate-300 rounded-full transition-all duration-1000"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              transform: `scale(${0.5 + particle.opacity})`
            }}
          />
        ))}
      </div>

      {/* Completion State */}
      {isComplete ? (
        <div className="text-center relative z-10 animate-fade-in">
          <div className="mb-12 transform transition-all duration-1000">
            <div className="relative">
              <img 
                src="/assets/logo.png" 
                alt="Logo" 
                className="mx-auto h-20 w-auto object-contain transition-all duration-500 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
            </div>
          </div>
          
          {/* Enhanced Camera Icon for completion state */}
          <EnhancedCameraIcon />
          
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-slate-800 tracking-wide">
              Ready to Capture
            </h2>
            <p className="text-sm text-slate-500">
              Your experience is loaded and ready
            </p>
          </div>
        </div>
      ) : (
        /* Loading State */
        <div className="text-center relative z-10">
          {/* Logo with subtle animation */}
          <div className="mb-12 transform transition-all duration-1000">
            <div className="relative">
              <img 
                src="/assets/logo.png" 
                alt="Logo" 
                className="mx-auto h-20 w-auto object-contain transition-all duration-500 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
            </div>
          </div>

          {/* Enhanced Camera Icon */}
          <EnhancedCameraIcon />

          {/* Loading Text with Smooth Transitions */}
          <div className="mb-12 space-y-3 h-20 flex flex-col justify-center">
            <div className={`transition-all duration-500 transform ${
              isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}>
              <h1 className="text-3xl font-light text-slate-800 tracking-wide">
                {getStageText()}
              </h1>
            </div>
            
            <div className={`transition-all duration-500 transform ${
              isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}>
              {getSubText() && (
                <p className="text-sm text-slate-500 min-h-[20px]">
                  {getSubText()}
                </p>
              )}
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="w-96 mx-auto mb-8">
            <div className="relative">
              {/* Background track */}
              <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                {/* Progress fill with gradient */}
                <div 
                  className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 h-1 transition-all duration-500 ease-out relative rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                >
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </div>
              </div>
              
              {/* Progress indicator dot */}
              <div 
                className="absolute top-1/2 w-3 h-3 bg-slate-800 rounded-full transform -translate-y-1/2 transition-all duration-500 shadow-lg"
                style={{ left: `calc(${loadingProgress}% - 6px)` }}
              >
                <div className="absolute inset-0.5 bg-white rounded-full" />
              </div>
            </div>
            
            {/* Progress percentage */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-mono">
                {Math.round(loadingProgress)}%
              </span>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      currentStage === 'loading' ? 'bg-slate-400 animate-pulse' : 'bg-slate-300'
                    }`}
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WebsitePreloader;