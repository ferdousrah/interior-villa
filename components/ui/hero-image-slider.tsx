'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { PerformanceImage } from './performance-image';

interface SlideImage {
  id: number;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  blurPlaceholder?: string;
  fallbackSrc: string;
}

interface HeroImageSliderProps {
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  transitionEffect?: 'fade' | 'zoom' | 'slide' | 'flip' | 'auto';
  imageSize?: 'small' | 'medium' | 'large' | 'full';
}

const CMS_BASE_URL = 'https://interiorvillabd.com';

export const HeroImageSlider: React.FC<HeroImageSliderProps> = ({
  className = '',
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  transitionEffect = 'fade',
  imageSize = 'large',
}) => {
  const [slides, setSlides] = useState<SlideImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<number | null>(null);

  /* ---------- Fetch slides from CMS ---------- */
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${CMS_BASE_URL}/api/slider?sort=slider.position:asc`);
        const data = await res.json();

        const mapped: SlideImage[] = data.docs.map((item: any) => {
          const img = item.slider?.image;
          const rawUrl = img?.sizes?.large?.url || img?.url || '';
          const fullUrl = `${rawUrl}`;
          const webpUrl = fullUrl.replace(/\.(jpg|jpeg|png)(\?.*)?$/i, '.webp$2');

          return {
            id: item.id,
            src: webpUrl || fullUrl,
            fallbackSrc: fullUrl,
            alt: img?.alt || item.slider.title || 'Slide',
            title: item.slider.title,
            subtitle: item.slider.subtitle,
            blurPlaceholder: img?.sizes?.blur?.url ? `${img.sizes.blur.url}` : undefined,
          };
        });

        setSlides(mapped);
      } catch (err) {
        console.error('Failed to load slides:', err);
      }
    };

    fetchSlides();
  }, []);

  /* ---------- 🚀 Dynamically preload first hero image ---------- */
  useEffect(() => {
    if (slides.length > 0) {
      const first = slides[0];
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = first.src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);

      // Also preconnect CMS for faster image fetching
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = CMS_BASE_URL;
      preconnect.crossOrigin = '';
      document.head.appendChild(preconnect);
    }
  }, [slides]);

  /* ---------- Autoplay ---------- */
  useEffect(() => {
    if (!isPlaying || slides.length === 0) return;
    intervalRef.current = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [isPlaying, autoPlayInterval, slides.length]);

  /* ---------- Predictive preload + decode ---------- */
  useEffect(() => {
    if (slides.length === 0) return;

    const nextIndex = (currentIndex + 1) % slides.length;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;

    [nextIndex, prevIndex].forEach((i) => {
      const img = new Image();
      img.src = slides[i].src;
      img.decode?.().catch(() => {});
    });
  }, [currentIndex, slides]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const togglePlayPause = () => setIsPlaying((p) => !p);

  /* ---------- Variants ---------- */
  const variants = {
    enter: (dir: number) => ({
      x: transitionEffect === 'slide' ? (dir > 0 ? '100%' : '-100%') : 0,
      opacity: 0,
      scale: transitionEffect === 'zoom' ? 1.2 : 1,
    }),
    center: { x: 0, opacity: 1, scale: 1, zIndex: 1 },
    exit: (dir: number) => ({
      x: transitionEffect === 'slide' ? (dir < 0 ? '100%' : '-100%') : 0,
      opacity: 0,
      scale: transitionEffect === 'zoom' ? 0.95 : 1,
      zIndex: 0,
    }),
  };

  const heightMap = {
    small: 'h-[40vh] sm:h-[50vh]',
    medium: 'h-[60vh] sm:h-[70vh]',
    large: 'h-[80vh] sm:h-[90vh]',
    full: 'h-screen',
  };

  if (slides.length === 0) {
    return (
      <div className={`relative w-full ${heightMap[imageSize]} bg-gray-900 animate-pulse`} />
    );
  }

  const slide = slides[currentIndex];

  return (
    <div className={`relative w-full overflow-hidden ${heightMap[imageSize]} ${className}`}>
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        >
          <PerformanceImage
            src={slide.src}
            alt={slide.alt}
            blurDataURL={slide.blurPlaceholder}
            placeholder="blur"
            priority={currentIndex === 0}
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
            fallbackSrc={slide.fallbackSrc}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-start px-8 sm:px-12 md:px-20">
            <div className="text-white max-w-3xl">
              {slide.title && (
                <motion.h1
                  key={`title-${slide.id}`}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
                >
                  {slide.title}
                </motion.h1>
              )}
              {slide.subtitle && (
                <motion.p
                  key={`subtitle-${slide.id}`}
                  className="text-lg sm:text-xl text-white/90"
                >
                  {slide.subtitle}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      {showControls && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white p-2 bg-black/30 rounded-full hover:bg-black/50"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white p-2 bg-black/30 rounded-full hover:bg-black/50"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </>
      )}

      {/* Play / Pause */}
      {autoPlay && (
        <button
          onClick={togglePlayPause}
          className="absolute bottom-6 left-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex ? 'bg-primary scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
