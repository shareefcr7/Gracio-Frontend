"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BannerSlide = {
  _id: string;
  desktopImage: string;
  mobileImage: string;
  isActive: boolean;
  align: "left" | "center" | "right";
  tag: string;
  headline: string;
  subheadline: string;
  cta?: string;
  ctaSecondary?: string;
};

// Fallback banners in case API is not available
const fallbackSlides: BannerSlide[] = [
  {
    _id: "1",
    desktopImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=90",
    mobileImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=90",
    tag: "New Arrivals",
    headline: "Dress for\nthe Moment",
    subheadline: "Curated pieces for every occasion — minimal, intentional, yours.",
    cta: "Shop Collection",
    ctaSecondary: "Explore Lookbook",
    align: "left",
    isActive: true,
  },
  {
    _id: "2",
    desktopImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=90",
    mobileImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=90",
    tag: "Limited Edition",
    headline: "Summer\nEssentials",
    subheadline: "Lightweight fabrics. Bold silhouettes. Made to move with you.",
    cta: "View All",
    ctaSecondary: "Find Your Size",
    align: "center",
    isActive: true,
  },
  {
    _id: "3",
    desktopImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=90",
    mobileImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=90",
    tag: "Sale — Up to 40% Off",
    headline: "Classic\nRedefined",
    subheadline: "Timeless staples reimagined for the modern wardrobe.",
    cta: "Shop Sale",
    align: "right",
    isActive: true,
  },
];

let bannerCache: BannerSlide[] | null = null;

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const api = process.env.NEXT_PUBLIC_API_URL;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const fetchBanners = useCallback(async () => {
    if (!api) {
      setSlides(fallbackSlides);
      setLoading(false);
      return;
    }

    if (bannerCache) {
      setSlides(bannerCache);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${api}/banner`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      if (data.banners && Array.isArray(data.banners)) {
        const activeBanners = data.banners.filter((b: BannerSlide) => b.isActive);
        if (activeBanners.length > 0) {
          const mergedBanners = activeBanners.map((b: Partial<BannerSlide>) => {
            return {
              _id: b._id || Math.random().toString(),
              desktopImage: b.desktopImage || "",
              mobileImage: b.mobileImage || "",
              isActive: b.isActive ?? true,
              tag: b.tag || "",
              headline: b.headline || "",
              subheadline: b.subheadline || "",
              align: b.align || "left",
            } as BannerSlide;
          });
          bannerCache = mergedBanners;
          setSlides(mergedBanners);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.error("HeroBanner: Fetch failed", err);
    }
    
    bannerCache = fallbackSlides;
    setSlides(fallbackSlides);
    setLoading(false);
  }, [api]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const next = useCallback(() => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev + 1) % slides.length);
    }
  }, [slides.length]);

  const back = useCallback(() => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
  }, [slides.length]);

  useEffect(() => {
    if (paused || loading || slides.length <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, paused, loading, slides.length]);

  if (loading) {
    return (
      <div className="w-full h-[90vh] bg-[#fdf5e6] animate-pulse flex items-center justify-center">
        <div className="text-[#4b3121] font-light tracking-widest uppercase">Luxy</div>
      </div>
    );
  }

  const slide = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500&display=swap');

        .banner-root {
          font-family: 'Montserrat', sans-serif;
          position: relative;
          width: 100%;
          height: 92vh;
          min-height: 560px;
          background: #fdf5e6;
          overflow: hidden;
        }

        .slide-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding: 0 8vw;
          z-index: 10;
        }

        .slide-container.center { justify-content: center; text-align: center; }
        .slide-container.right { justify-content: flex-end; text-align: right; }

        .text-content {
          max-width: 600px;
          color: #4b3121;
        }

        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 24px;
          white-space: pre-line;
        }

        .subheadline {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.6;
          margin-bottom: 40px;
          opacity: 0.9;
        }



        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(75, 49, 33, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4b3121;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: #4b3121;
          color: white;
        }

        .nav-prev { left: 30px; }
        .nav-next { right: 30px; }

        .indicators {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 20;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid #4b3121;
          transition: all 0.3s ease;
          cursor: pointer;
          background: transparent;
        }

        .indicator.active {
          background: #4b3121;
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .nav-btn { display: none; }
          .slide-container { padding: 0 5vw; text-align: center !important; justify-content: center !important; }

        }
      `}</style>

      <section 
        className="banner-root"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear scale-110"
              style={{ 
                backgroundImage: `url(${isMobile ? slide.mobileImage : slide.desktopImage})`,
                transform: paused ? 'scale(1.1)' : 'scale(1.15)'
              }}
            />
            {/* Only show overlay if there is text to display */}
            {(slide.headline || slide.subheadline || slide.tag) && (
              <div className="absolute inset-0 bg-white/10 backdrop-contrast-[0.9]" />
            )}
            
            <div className={`slide-container ${slide.align}`}>
              <div className="text-content">
                {slide.tag && (
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block text-[0.65rem] tracking-[0.3em] uppercase mb-4 border-b border-[#4b3121]/30 pb-1"
                  >
                    {slide.tag}
                  </motion.span>
                )}
                
                {slide.headline && (
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="headline"
                  >
                    {slide.headline}
                  </motion.h1>
                )}
                
                {slide.subheadline && (
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="subheadline"
                  >
                    {slide.subheadline}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button className="nav-btn nav-prev" onClick={back}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="nav-btn nav-next" onClick={next}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="indicators">
          {slides.map((_, i) => (
            <button 
              key={i}
              className={`indicator ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
