import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const HERO_SLIDES = [
  {
    id: 1,
    type: 'video',
    video: '/hero1.mp4',
    title: 'Yeni Sezon Ürünleri',
    subtitle: 'Bağımsız butiklerden en yeni trendleri keşfet',
    cta: 'Hemen Alışveriş Yap',
    ctaLink: '/new-arrivals',
    theme: 'light'
  },
  {
    id: 2,
    type: 'video',
    video: '/hero2.mp4',
    title: 'Yaz İndirimleri',
    subtitle: 'Seçili ürünlerde %50\'ye varan indirim',
    cta: 'İndirimleri Gör',
    ctaLink: '/sale',
    theme: 'light'
  },
  {
    id: 3,
    type: 'video',
    video: '/hero3.mp4',
    title: 'Özel Koleksiyonlar',
    subtitle: 'Dünyanın dört bir yanından özenle seçilmiş stiller',
    cta: 'Keşfet',
    ctaLink: '/shop',
    theme: 'light'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const videoRefs = useRef([]);

  // Auto-rotate slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Play/pause videos based on current slide
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          // Try to play the video
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log(`Video ${index} playing successfully`);
              })
              .catch(error => {
                console.error(`Video ${index} play failed:`, error);
              });
          }
        } else {
          video.pause();
        }
      }
    });
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlideData = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[650px] lg:h-[750px] xl:h-[705px] overflow-hidden bg-gray-900">
      {/* Background Layer - Videos and Images */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.type === 'video' ? (
              <video
                key={`video-${index}`}
                ref={(el) => (videoRefs.current[index] = el)}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={(e) => {
                  console.log(`Video ${index} loaded:`, slide.video);
                  if (index === currentSlide) {
                    e.target.play().catch(err => console.error('Initial play error:', err));
                  }
                }}
                onError={(e) => {
                  console.error('Video load error:', slide.video, e.target.error);
                }}
                onCanPlay={() => console.log(`Video ${index} can play`)}
              >
                <source src={slide.video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Content Layer */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={`content-${slide.id}`}
              className={`transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-6 text-white drop-shadow-2xl px-4">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl mb-6 md:mb-10 text-white drop-shadow-lg px-4">
                {slide.subtitle}
              </p>
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl text-sm md:text-base"
              >
                <span>{slide.cta}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls - Hidden on mobile */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 md:p-4 rounded-full transition-all z-50 group items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 md:p-4 rounded-full transition-all z-50 group items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 md:space-x-3 z-50">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8 md:w-10'
                : 'bg-white/50 w-2 md:w-2.5 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
