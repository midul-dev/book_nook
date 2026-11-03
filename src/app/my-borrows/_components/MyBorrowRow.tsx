"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Calendar, Clock } from "lucide-react";
import { ReturnBookDialog, IBorrowItem } from "./ReturnDialog";

interface MyBorrowRowProps {
  book: IBorrowItem;
}

export function MyBorrowRow({ book }: MyBorrowRowProps) {
  // Format Return / Due Date cleanly
  const formattedReturnDate = book.returnDate
    ? (() => {
        try {
          const d = new Date(book.returnDate);
          if (!isNaN(d.getTime())) {
            return d.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
          }
          return book.returnDate;
        } catch {
          return book.returnDate;
        }
      })()
    : "Flexible";

  return (
    <div className="grid grid-cols-12 items-center px-6 py-4.5 hover:bg-muted/40 transition-colors">
      {/* 1. Cover & Title */}
      <div className="col-span-4 flex items-center gap-3.5 min-w-0 pr-4">
        {/* Book Thumbnail */}
        <div className="relative shrink-0 w-11 h-14 rounded-md overflow-hidden shadow-md shadow-black/20 flex items-center justify-center bg-muted/60 select-none">
          {book.image ? (
            <Image
              src={book.image}
              alt={book.title || "Book Cover"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#164e38] text-white">
              <BookOpen className="w-5 h-5 opacity-80" />
            </div>
          )}
        </div>

        {/* Title & Short Description */}
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
            {book.description || "No description provided."}
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
          {book.category || "General"}
        </span>
      </div>

      {/* 4. Return Date */}
      <div className="col-span-2 flex flex-col items-center justify-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/50">
          <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>{formattedReturnDate}</span>
        </span>
        {book.borrowDate && (
          <span className="text-[10px] text-muted-foreground font-mono mt-1">
            Borrowed: {book.borrowDate}
          </span>
        )}
      </div>

      {/* 5. Action (Return Book) */}
      <div className="col-span-2 flex items-center justify-end">
        <div className="px-3.5 py-1 text-xs font-medium rounded-full bg-[#fef5e7] hover:bg-[#fae8ce] text-[#9c530c] dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-300 transition-all cursor-pointer shadow-2xs active:scale-95">
          <ReturnBookDialog book={book} />
        </div>
      </div>
    </div>
  );
}
