"use client";

import hero from "@/assets/hero.jpg";
import Image from "next/image";
import { ArrowRight, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

interface HeroBannerProps {
  onBrowseClick?: () => void;
}

export function HeroBanner({ onBrowseClick }: HeroBannerProps) {
  return (
    <section
      aria-label="Online Library Showcase"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#FEFEF2] dark:bg-[#151c24] border border-stone-200/80 dark:border-stone-800 shadow-md transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[440px] md:min-h-[500px]">
          {/* Left Content Area */}
          <div className="lg:col-span-5 p-8 sm:p-12 md:p-14 lg:p-16 flex flex-col justify-between h-full z-10 space-y-8">
            <div className="space-y-5">
              {/* Refined Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 dark:bg-emerald-400/10 text-emerald-900 dark:text-emerald-300 text-xs font-medium border border-emerald-700/15 backdrop-blur-xs"> <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span>Community Reading Sanctuary</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl pb-2 font-bold tracking-tight text-[#16433c] dark:text-[#4ade80] leading-[1.12]">
                  Online Library
                </h1>
                <p className="text-xs sm:text-sm font-medium tracking-wide uppercase text-amber-700 dark:text-amber-400">
                  Read • Borrow • Contribute
                </p>
              </div>

              {/* Description Paragraph */}
              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-md font-normal">
                Borrow and discover curated science, history, modern fiction, and children&apos;s literature from our neighborhood community shelves. Every volume features real-time copy availability so you always know what is ready on the shelf.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onBrowseClick}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#c87000] hover:bg-[#b06200] active:scale-98 text-white font-medium text-sm sm:text-base shadow-md shadow-amber-950/20 hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={onBrowseClick}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-stone-300/80 dark:border-stone-700 hover:bg-stone-100/60 dark:hover:bg-stone-800/60 text-stone-700 dark:text-stone-300 font-medium text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Browse Catalog</span>
                </button>
              </div>

            
             
            </div>

            {/* Bottom Quick Feature Highlights */}
            <div className="pt-4 border-t border-stone-200/70 dark:border-stone-800/80 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-500 dark:text-stone-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Zero Late Fees
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Instant $inc Tracking
              </span>
            </div>
          </div>

          {/* Right Illustration Area (Unchanged) */}
          <div className="lg:col-span-7 relative h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[480px] flex items-center justify-end overflow-hidden">
            <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] flex items-center justify-end">
              <Image
                src={hero}
                alt="Online Library Bookshelf Illustration"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-right select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
