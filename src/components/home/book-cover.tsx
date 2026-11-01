"use client";

import React from "react";
import { Book } from "@/types";
import { Sparkles, Compass, Atom, Moon, Leaf, Landmark } from "lucide-react";

interface BookCoverProps {
  book: Book;
  className?: string;
}

export function BookCover({ book, className = "" }: BookCoverProps) {
  const isAvailable = book.availableCopies > 0;

  // Render decorative motif based on book type
  const renderMotif = () => {
    switch (book.motif) {
      case "cosmic":
        return (
          <div className="flex flex-col items-center opacity-40 my-2">
            <div className="w-12 h-12 rounded-full border border-blue-300/40 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border border-dashed border-blue-200/60 animate-spin-slow flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
              </div>
            </div>
          </div>
        );
      case "maritime":
        return (
          <div className="flex flex-col items-center opacity-40 my-2">
            <div className="w-10 h-10 border border-amber-300/40 rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 border border-amber-200/50" />
            </div>
          </div>
        );
      case "lantern":
        return (
          <div className="flex flex-col items-center opacity-40 my-2">
            <div className="w-8 h-10 rounded-t-full border border-rose-300/40 flex items-center justify-center">
              <div className="w-1 h-3 bg-amber-300/70 rounded-full" />
            </div>
          </div>
        );
      case "astronomy":
        return (
          <div className="flex flex-col items-center opacity-40 my-2">
            <div className="w-12 h-6 border-b-2 border-indigo-300/50 rounded-b-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full -mt-2" />
            </div>
          </div>
        );
      case "botanical":
        return (
          <div className="flex flex-col items-center opacity-40 my-2">
            <div className="w-10 h-10 rounded-full border border-amber-400/40 flex items-center justify-center">
              <div className="w-6 h-0.5 bg-amber-300/50" />
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center opacity-30 my-2">
            <div className="w-12 h-0.5 bg-stone-300" />
          </div>
        );
    }
  };

  return (
    <div
      className={`relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1 select-none flex flex-col justify-between p-4 bg-gradient-to-br ${book.coverGradient} border border-white/10 ${className}`}
    >
      {/* Spine 3D Lighting & Texture */}
      <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/45 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-white/10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-black/40 pointer-events-none" />

      {/* Top Header Row (Category Badge & Availability Pill) */}
      <div className="relative z-10 flex items-center justify-between gap-1">
        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase bg-white/15 text-white/90 backdrop-blur-sm border border-white/10">
          {book.category}
        </span>

        <span
          className={`px-2 py-0.5 rounded-full text-[9px] font-medium tracking-tight backdrop-blur-md border ${
            isAvailable
              ? "bg-black/35 text-white/95 border-white/15"
              : "bg-red-950/80 text-rose-200 border-red-500/40"
          }`}
        >
          {isAvailable
            ? `${book.availableCopies} of ${book.totalCopies} Copies Available`
            : "Not Available (0 Copies)"}
        </span>
      </div>

      {/* Center Cover Art & Title */}
      <div className="relative z-10 text-center my-auto px-2">
        {renderMotif()}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide leading-tight drop-shadow-md">
          {book.title}
        </h3>
        <div className="w-8 h-[1px] bg-white/30 mx-auto my-2" />
      </div>

      {/* Bottom Cover Author & Publisher Seal */}
      <div className="relative z-10 flex items-end justify-between pt-2">
        <p className="text-[11px] font-serif italic text-white/75 truncate max-w-[80%]">
          {book.author}
        </p>

        <div className="h-4 w-4 rounded-full border border-white/30 flex items-center justify-center opacity-60">
          <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
        </div>
      </div>
    </div>
  );
}
