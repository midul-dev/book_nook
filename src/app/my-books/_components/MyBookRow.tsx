"use client";

import React from "react";
import Image from "next/image";

export interface IMyBookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  copies: string;
  description: string;
  initials?: string;
  coverGradient?: string;
  image?: string;
}

interface MyBookRowProps {
  book: IMyBookItem;
}

export function MyBookRow({ book }: MyBookRowProps) {
  return (
    <div className="grid grid-cols-12 items-center px-6 py-4.5 hover:bg-muted/40 transition-colors">
      {/* 1. Cover & Title */}
      <div className="col-span-5 flex items-center gap-3.5 min-w-0 pr-4">
        {/* Modern 3D Spine Book Thumbnail */}
        <div className="relative shrink-0 w-11 h-14 rounded-md overflow-hidden shadow-md shadow-black/20 flex items-end p-1 select-none">
          {book.image ? (
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                book.coverGradient || "from-neutral-800 to-neutral-950"
              }`}
            >
              {/* Realistic book spine band & lighting */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/15 border-r border-black/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />
            </div>
          )}

          {/* Spine badge / category initials */}
          {book.initials && !book.image && (
            <span className="relative z-10 text-[9px] font-mono font-bold tracking-wider px-1 py-0.5 rounded bg-black/45 text-white/90 backdrop-blur-xs border border-white/10">
              {book.initials}
            </span>
          )}
        </div>

        {/* Title & One-line excerpt */}
        <div className="min-w-0 flex-1">
          <h3
            title={book.title}
            className="text-sm sm:text-base font-semibold text-foreground truncate tracking-tight"
          >
            {book.title}
          </h3>
          <p
            title={book.description}
            className="text-xs text-muted-foreground truncate mt-0.5"
          >
            {book.description}
          </p>
        </div>
      </div>

      {/* 2. Author */}
      <div className="col-span-2 min-w-0 pr-3">
        <span
          title={book.author}
          className="text-xs sm:text-sm font-medium text-foreground/80 truncate block"
        >
          {book.author}
        </span>
      </div>

      {/* 3. Category */}
      <div className="col-span-2">
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-[#eef7f2] text-[#1b6b47] dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/50">
          {book.category}
        </span>
      </div>

      {/* 4. Copies */}
      <div className="col-span-1 text-center">
        <span className="text-xs sm:text-sm font-semibold text-foreground font-mono tracking-tight">
          {book.copies}
        </span>
      </div>

      {/* 5. Actions (Update & Delete) */}
      <div className="col-span-2 flex items-center justify-end gap-2">
        <button
          type="button"
          className="px-3.5 py-1 text-xs font-medium rounded-full bg-[#fef5e7] hover:bg-[#fbe8ce] text-[#9c530c] dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-300 transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          Edit
        </button>
        <button
          type="button"
          className="px-3.5 py-1 text-xs font-medium rounded-full bg-[#fef0f2] hover:bg-[#fde0e5] text-[#c0264b] dark:bg-rose-950/40 dark:hover:bg-rose-900/50 dark:text-rose-300 transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
