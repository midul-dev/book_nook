"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Clock } from "lucide-react";
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
    <>
      {/* 1. Desktop & Tablet Table View */}
      <div className="hidden md:grid grid-cols-12 items-center px-6 py-4 hover:bg-muted/40 transition-colors">
        {/* Cover & Title */}
        <div className="col-span-4 flex items-center gap-3.5 min-w-0 pr-4">
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

          <div className="min-w-0 flex-1">
            <h3
              title={book.title}
              className="text-sm font-semibold text-foreground truncate tracking-tight"
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

        {/* Author */}
        <div className="col-span-2 min-w-0 pr-3">
          <span
            title={book.author}
            className="text-xs sm:text-sm font-medium text-foreground/80 truncate block"
          >
            {book.author}
          </span>
        </div>

        {/* Category */}
        <div className="col-span-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#eef7f2] text-[#1b6b47] dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/50">
            {book.category || "General"}
          </span>
        </div>

        {/* Return Date */}
        <div className="col-span-2 flex flex-col items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/50">
            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{formattedReturnDate}</span>
          </span>
          {book.borrowDate && (
            <span className="text-[10px] text-muted-foreground font-mono mt-1">
              Borrowed: {book.borrowDate}
            </span>
          )}
        </div>

        {/* Action (Return Book) */}
        <div className="col-span-2 flex items-center justify-end">
          <div className="px-3.5 py-1 text-xs font-medium rounded-full bg-[#fef5e7] hover:bg-[#fae8ce] text-[#9c530c] dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-300 transition-all cursor-pointer shadow-2xs active:scale-95">
            <ReturnBookDialog book={book} />
          </div>
        </div>
      </div>

      {/* 2. Mobile Responsive Card View */}
      <div className="md:hidden p-4 flex flex-col gap-3 hover:bg-muted/30 transition-colors">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0 w-12 h-16 rounded-md overflow-hidden shadow-sm shadow-black/20 bg-muted select-none">
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

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#eef7f2] text-[#1b6b47] dark:bg-emerald-950/60 dark:text-emerald-300">
                {book.category || "General"}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/50">
                <Clock className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{formattedReturnDate}</span>
              </span>
            </div>

            <h3
              title={book.title}
              className="text-sm font-semibold text-foreground truncate mt-1.5"
            >
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              by {book.author}
            </p>
          </div>
        </div>

        {book.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {book.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50 text-[11px] font-mono text-muted-foreground">
          <span>Borrowed: {book.borrowDate || "N/A"}</span>
          <div className="px-3.5 py-1 text-xs font-medium rounded-full bg-[#fef5e7] hover:bg-[#fae8ce] text-[#9c530c] dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-300 transition-all cursor-pointer shadow-2xs active:scale-95">
            <ReturnBookDialog book={book} />
          </div>
        </div>
      </div>
    </>
  );
}
