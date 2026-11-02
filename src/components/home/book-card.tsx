"use client";

import React, { useState } from "react";
import { IBook } from "@/types";
import { ChevronRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  book: IBook;
}

export function BookCard({ book }: BookCardProps) {

  // Date formatting function ba direct variable
const catalogedDate = book.createdAt 
  ? new Date(book.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', // 'short' dile Nov, 'long' dile November dekhabe
      day: 'numeric'
    })
  : "Recently Added"; // Jodi kono boi er date na thake tar jonno fallback


  return (
    <Link href={`/all-books/${book._id}`} className="group">
      <article className="group flex flex-col h-full justify-between rounded-2xl bg-card p-3 sm:p-4 border border-border shadow-xs hover:shadow-xl hover:border-emerald-600/30 transition-all duration-300">
      {/* 1. Equal-size picture container with guaranteed height & aspect ratio */}
      <div className=" sm:h-72 overflow-hidden rounded-xl bg-muted/40 shadow-xs">
        {book.image ? (
          <Image
            src={book.image}
            alt={book.title}
            height={640}
            width={640}
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-muted/60 text-muted-foreground p-4 text-center">
            <BookOpen className="w-8 h-8 mb-1.5 opacity-40 text-emerald-700" />
            <span className="text-xs font-serif font-bold text-foreground line-clamp-1">{book.title}</span>
            <span className="text-[10px] font-mono text-muted-foreground mt-0.5">Cover Unavailable</span>
          </div>
        )}
      </div>

      {/* 2. Unified metadata, title & author with consistent vertical positions */}
      <div className="pt-4 pb-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Category row */}
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground h-5">
            <span className="font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 truncate">
              {book.category}
            </span>
            {book.copies && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-muted/80 text-muted-foreground font-medium shrink-0">
                {book.copies} Copies
              </span>
            )}
          </div>

          {/* Book Title & Author */}
          <div>
            <h4
              title={book.title}
              className="font-serif text-base sm:text-lg font-bold text-foreground leading-snug cursor-pointer group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors line-clamp-1 h-6"
            >
              {book.title}
            </h4>
            <p
              title={book.author}
              className="text-xs text-muted-foreground mt-0.5 truncate h-4"
            >
              by {book.author}
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              {catalogedDate}
            </p>
          </div>
        </div>

        {/* 3. Action Button pinned to bottom */}
        <div className="pt-4 mt-auto">
          <button className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#164e38] hover:bg-[#123e2d] active:scale-98 text-white text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow-md cursor-pointer">
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
    </Link>
  );
}
