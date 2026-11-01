"use client";

import React from "react";
import { initialReviews } from "@/data/mock-reviews";
import { Star, Quote } from "lucide-react";

export function ReaderReviews() {
  return (
    <section id="reviews" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <span className="font-mono text-xs font-bold tracking-widest uppercase text-amber-700 dark:text-amber-400">
          EXTRA SECTION 02 • COMMUNITY VOICES
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Reader Reviews & Shelf Stories
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Hear from members who regularly contribute books from their personal shelves and borrow new reads every month.
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {initialReviews.map((rev) => (
          <div
            key={rev.id}
            className="group relative rounded-2xl bg-card p-6 sm:p-8 border border-border shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Star Rating & Activity Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <span className="text-[11px] font-mono font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-full">
                  {rev.badgeText}
                </span>
              </div>

              {/* Quote */}
              <p className="font-serif italic text-sm sm:text-base text-foreground/90 leading-relaxed pt-1">
                {rev.quote}
              </p>
            </div>

            {/* Reviewer Profile */}
            <div className="pt-6 mt-6 border-t border-border/70 flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${rev.reviewer.avatarColor}`}
              >
                {rev.reviewer.avatarInitials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif font-bold text-sm text-foreground truncate">
                  {rev.reviewer.name}
                </span>
                <span className="text-[11px] text-muted-foreground truncate">
                  {rev.reviewer.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
