"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Users,
  BookmarkCheck,
  Library
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import bookSelf from "@/assets/book_self.avif";
import bigBook from "@/assets/book.avif";
import openLib from "@/assets/Open_Lib.avif";

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
    image: openLib,
    badge: "Instant Sync Tracking",
    floatingStat: {
      icon: Library,
      label: "Community Volumes",
      value: "1,450+ Books",
    },
  },
  {
    id: 2,
    eyebrow: "Neighborhood Knowledge Hub",
    title: "Empower Your Mind with Every Read",
    highlight: "Explore • Learn • Connect",
    description:
      "From timeless classics to modern scientific breakthroughs, delve into thousands of volunteer-donated volumes. Borrow with zero late fees and return at your own pace.",
    image: bookSelf,
    badge: "100% Free Borrowing",
    floatingStat: {
      icon: Users,
      label: "Active Readers",
      value: "820+ Members",
    },
  },
  {
    id: 3,
    eyebrow: "Give & Take Community Promise",
    title: "Contribute One Volume, Borrow Many",
    highlight: "Share • Grow • Inspire",
    description:
      "Add a hardcover or paperback from your personal bookshelf to give it a second life. Join a trust-driven network of avid readers and passionate learners.",
    image: bigBook,
    badge: "Peer-to-Peer Shelves",
    floatingStat: {
      icon: BookmarkCheck,
      label: "Verified Returns",
      value: "99.4% Trust Rate",
    },
  },
];

export function HeroBanner({ onBrowseClick }: HeroBannerProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section
      aria-label="Online Library Showcase"
      className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-6 sm:pb-10"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#FAF9F5] dark:bg-[#121920] border border-stone-200/90 dark:border-stone-800/90 shadow-xl shadow-stone-900/5 transition-all duration-300">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={800}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".hero-swiper-pagination",
          }}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
          }}
          className="w-full"
        >
          {heroSlides.map((slide) => {
            const FloatingIcon = slide.floatingStat.icon;
            return (
              <SwiperSlide key={slide.id}>
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px] md:min-h-[560px]">
                  {/* Left Content Area */}
                  <div className="lg:col-span-6 p-5 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-between h-full z-10 space-y-6 sm:space-y-8">
                    <div className="space-y-4 sm:space-y-5">
                      {/* Eyebrow Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-950/5 dark:bg-emerald-400/10 text-emerald-900 dark:text-emerald-300 text-xs font-medium border border-emerald-800/15 backdrop-blur-md max-w-full">
                        <span className="flex h-2 w-2 relative shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                        </span>
                        <span className="truncate">{slide.eyebrow}</span>
                      </div>

                      {/* Main Headline */}
                      <div className="space-y-2">
                        <h1 className="font-serif text-2xl min-[360px]:text-3xl min-[440px]:text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#163a32] dark:text-[#5eead4] leading-[1.14]">
                          {slide.title}
                        </h1>
                        <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-700 dark:text-amber-400/90 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>{slide.highlight}</span>
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                        {slide.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-col min-[420px]:flex-row items-stretch min-[420px]:items-center gap-3 sm:gap-4">
                        <Link
                          href="/all-books"
                          onClick={onBrowseClick}
                          className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-[#164e38] hover:bg-[#123e2d] active:scale-[0.98] text-white font-medium text-sm sm:text-base shadow-lg shadow-emerald-950/20 hover:shadow-xl hover:shadow-emerald-950/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4 text-emerald-200" />
                          <span>Browse Books</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                          href="/add-books"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-2xl border border-stone-300/80 dark:border-stone-700 hover:bg-stone-100/70 dark:hover:bg-stone-800/60 text-stone-800 dark:text-stone-200 font-medium text-sm transition-all cursor-pointer shadow-xs"
                        >
                          <span>Contribute Book</span>
                        </Link>
                      </div>
                    </div>

                    {/* Features Strip */}
                    <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800 flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-5 text-xs text-stone-500 dark:text-stone-400 font-medium pb-8 lg:pb-0">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        {slide.badge}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        Zero Late Fees
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        Verified Circulation
                      </span>
                    </div>
                  </div>

                  {/* Right Illustration & Realistic Photo Area */}
                  <div className="lg:col-span-6 relative h-64 sm:h-80 md:h-96 lg:h-full min-h-[260px] sm:min-h-[360px] lg:min-h-[560px] overflow-hidden">
                    <div className="relative w-full h-full min-h-[260px] sm:min-h-[360px] lg:min-h-[560px]">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        priority={slide.id === 1}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center select-none"
                      />

                      {/* Editorial Gradient Mask */}
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#FAF9F5] dark:from-[#121920] via-transparent to-transparent opacity-90 lg:w-2/5 pointer-events-none" />
                      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FAF9F5] dark:from-[#121920] to-transparent opacity-80 pointer-events-none lg:hidden" />
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF9F5] dark:from-[#121920] to-transparent opacity-80 pointer-events-none lg:hidden" />

                      {/* Floating Glassmorphic Stat Card */}
                      <div className="absolute bottom-16 sm:bottom-6 right-4 sm:right-6 z-10 hidden min-[480px]:flex items-center gap-3.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-white/80 dark:bg-black/70 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-xl shadow-black/10">
                        <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-900/10 dark:bg-emerald-400/20 text-emerald-800 dark:text-emerald-300">
                          <FloatingIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400">
                            {slide.floatingStat.label}
                          </p>
                          <p className="font-serif font-bold text-xs sm:text-base text-stone-900 dark:text-stone-100">
                            {slide.floatingStat.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Desktop Side Navigation Arrows */}
        <button
          type="button"
          onClick={() => swiperInstance?.slidePrev()}
          aria-label="Previous Slide"
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/85 dark:bg-stone-900/85 hover:bg-white dark:hover:bg-stone-900 text-stone-800 dark:text-stone-100 backdrop-blur-md border border-stone-200/90 dark:border-stone-700/90 items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Next Slide"
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/85 dark:bg-stone-900/85 hover:bg-white dark:hover:bg-stone-900 text-stone-800 dark:text-stone-100 backdrop-blur-md border border-stone-200/90 dark:border-stone-700/90 items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Centered Unified Pagination & Controls Pill */}
        <div className="absolute bottom-3.5 sm:bottom-5 inset-x-0 z-20 flex items-center justify-center pointer-events-none px-4">
          <div className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full bg-stone-900/80 dark:bg-stone-950/85 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl pointer-events-auto">
            <button
              type="button"
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous Slide"
              className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="hero-swiper-pagination flex items-center justify-center" />

            <button
              type="button"
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next Slide"
              className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Styled JSX for Bullet Moving Dots */}
      <style jsx global>{`
        .hero-swiper-pagination {
          position: static !important;
          width: auto !important;
          transform: none !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          margin: 0 !important;
          padding: 0 4px !important;
          line-height: 1 !important;
        }
        .hero-swiper-pagination .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          margin: 0 !important;
          background: #ffffff !important;
          opacity: 0.45 !important;
          border-radius: 9999px !important;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer !important;
          display: inline-block !important;
          vertical-align: middle !important;
        }
        .hero-swiper-pagination .swiper-pagination-bullet-active {
          width: 26px !important;
          opacity: 1 !important;
          background: #34d399 !important;
          border-radius: 9999px !important;
        }
      `}</style>
    </section>
  );
}