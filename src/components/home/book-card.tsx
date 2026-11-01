"use client";

import React from "react";
import { Book } from "@/types";
import { BookCover } from "@/components/home/book-cover";
import { ChevronRight } from "lucide-react";

interface BookCardProps {
  book: Book;
  onViewDetails: (book: Book) => void;
}

export function BookCard({ book, onViewDetails }: BookCardProps) {
  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-card p-3 sm:p-4 border border-border shadow-xs hover:shadow-xl hover:border-emerald-600/30 transition-all duration-300">
      {/* Clickable Cover */}
      <button
        onClick={() => onViewDetails(book)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
        aria-label={`View details for ${book.title}`}
      >
        <BookCover book={book} />
      </button>

      {/* Book Metadata & Title */}
      <div className="pt-4 pb-2 space-y-1.5 flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span className="font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            {book.category}
          </span>
          <span>{book.addedDate}</span>
        </div>

        <div>
          <h4
            onClick={() => onViewDetails(book)}
            className="font-serif text-base sm:text-lg font-bold text-foreground leading-snug cursor-pointer group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors line-clamp-1"
          >
            {book.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">by {book.author}</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          onClick={() => onViewDetails(book)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#164e38] hover:bg-[#123e2d] active:scale-98 text-white text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow-md cursor-pointer"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}
