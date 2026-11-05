"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface HeroBannerProps {
  onBrowseClick?: () => void;
}

const heroSlides = [
  {
    id: 1,
    eyebrow: "Community Reading Sanctuary",
    title: "Discover, Borrow & Share Stories",
    highlight: "Read • Borrow • Contribute",
    description:
      "Borrow curated science, history, modern fiction, and children's literature from our neighborhood community shelves. Every volume features real-time available copy tracking.",
    image: "/assets/hero-banner.jpg",
    badge: "Instant $inc Tracking",
  },
  {
    id: 2,
    eyebrow: "Neighborhood Knowledge Hub",
    title: "Empower Your Mind with Every Read",
    highlight: "Explore • Learn • Connect",
    description:
      "From timeless classics to modern scientific breakthroughs, delve into thousands of volunteer-donated volumes. Borrow with zero late fees and return at your pace.",
    image: "/assets/hero-bookshelf.png",
    badge: "100% Free Borrowing",
  },
  {
    id: 3,
    eyebrow: "Give & Take Community Promise",
    title: "Contribute One Volume, Borrow Many",
    highlight: "Share • Grow • Inspire",
    description:
      "Add a hardcover or paperback from your personal bookshelf to give it a second life. Join a trust-driven network of avid readers and passionate learners.",
    image: "/assets/hero.jpg",
    badge: "Peer-to-Peer Shelves",
  },
];

export function HeroBanner({ onBrowseClick }: HeroBannerProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      aria-label="Online Library Showcase"
      className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8"
    >
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FEFEF2] dark:bg-[#151c24] border border-stone-200/80 dark:border-stone-800 shadow-md transition-all duration-300">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={600}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".hero-swiper-pagination",
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[440px] md:min-h-[500px]">
                {/* Left Content Area */}
                <div className="lg:col-span-5 p-5 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-between h-full z-10 space-y-6 sm:space-y-8">
                  <div className="space-y-4 sm:space-y-5">
                    {/* Eyebrow Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-900/10 dark:bg-emerald-400/10 text-emerald-900 dark:text-emerald-300 text-[11px] sm:text-xs font-medium border border-emerald-700/15 backdrop-blur-xs">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                      </span>
                      <span>{slide.eyebrow}</span>
                    </div>

                    {/* Main Headline */}
                    <div className="space-y-1">
                      <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl pb-1 sm:pb-2 font-bold tracking-tight text-[#16433c] dark:text-[#4ade80] leading-[1.12]">
                        {slide.title}
                      </h1>
                      <p className="text-xs sm:text-sm font-medium tracking-wide uppercase text-amber-700 dark:text-amber-400">
                        {slide.highlight}
                      </p>
                    </div>

                    {/* Short Text */}
                    <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-base leading-relaxed max-w-md font-normal">
                      {slide.description}
                    </p>

                    {/* Browse Books Button */}
                    <div className="pt-2 flex flex-col min-[420px]:flex-row items-stretch min-[420px]:items-center gap-3 sm:gap-4">
                      <Link
                        href="/all-books"
                        onClick={onBrowseClick}
                        className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#c87000] hover:bg-[#b06200] active:scale-98 text-white font-medium text-xs sm:text-base shadow-md shadow-amber-950/20 hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4 text-white" />
                        <span>Browse Books</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href="/add-books"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-stone-300/80 dark:border-stone-700 hover:bg-stone-100/60 dark:hover:bg-stone-800/60 text-stone-700 dark:text-stone-300 font-medium text-xs sm:text-sm transition-all cursor-pointer"
                      >
                        <span>Contribute Book</span>
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Quick Feature Highlights */}
                  <div className="pt-3 sm:pt-4 border-t border-stone-200/70 dark:border-stone-800/80 flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-5 text-xs text-stone-500 dark:text-stone-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {slide.badge}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Zero Late Fees
                    </span>
                  </div>
                </div>

                {/* Right Illustration Area */}
                <div className="lg:col-span-7 relative h-full min-h-[240px] sm:min-h-[340px] lg:min-h-[500px] flex items-center justify-end overflow-hidden">
                  <div className="relative w-full h-full min-h-[240px] sm:min-h-[340px] lg:min-h-[500px] flex items-center justify-end">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={slide.id === 1}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-center lg:object-right select-none pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous Slide"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black/90 backdrop-blur-md border border-stone-200/80 dark:border-stone-700 flex items-center justify-center text-foreground transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next Slide"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black/90 backdrop-blur-md border border-stone-200/80 dark:border-stone-700 flex items-center justify-center text-foreground transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Custom Pagination Indicator */}
        <div className="hero-swiper-pagination flex items-center justify-center gap-1.5 absolute bottom-3 left-1/2 -translate-x-1/2 z-20" />
      </div>

      {/* Styled JSX for Swiper Pagination */}
      <style jsx global>{`
        .hero-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #a8a29e;
          opacity: 0.5;
          transition: all 0.3s ease;
          border-radius: 9999px;
          cursor: pointer;
        }
        .hero-swiper-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background: #164e38 !important;
          opacity: 1 !important;
        }
        .dark .hero-swiper-pagination .swiper-pagination-bullet-active {
          background: #4ade80 !important;
        }
      `}</style>
    </section>
  );
}
