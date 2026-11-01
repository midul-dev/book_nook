"use client";

import React, { useState } from "react";
import { Book } from "@/types";
import { BookCover } from "@/components/home/book-cover";
import {
  X,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface BookDetailDialogProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onBorrowBook: (bookId: string) => void;
  onReturnBook: (bookId: string) => void;
  hasBorrowed: boolean;
}

export function BookDetailDialog({
  book,
  isOpen,
  onClose,
  onBorrowBook,
  onReturnBook,
  hasBorrowed,
}: BookDetailDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen || !book) return null;

  const isAvailable = book.availableCopies > 0;

  const handleBorrowAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onBorrowBook(book.id);
      setIsProcessing(false);
      setSuccessMessage("Book borrowed successfully! Atomic count decremented with $inc: -1.");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 400);
  };

  const handleReturnAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onReturnBook(book.id);
      setIsProcessing(false);
      setSuccessMessage("Book returned successfully! Copy restored with $inc: +1.");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Catalog Reference: {book.isbn}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="h-8 w-8 rounded-full border border-border hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            {/* Book Cover simulation */}
            <div className="sm:col-span-5 max-w-[220px] mx-auto w-full">
              <BookCover book={book} />
            </div>

            {/* Info Column */}
            <div className="sm:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-emerald-800 dark:text-emerald-400">
                  {book.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-foreground leading-tight mt-1">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">by {book.author}</p>
              </div>

              {/* Status pill & badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full border ${
                    isAvailable
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                      : "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800"
                  }`}
                >
                  {isAvailable
                    ? `${book.availableCopies} of ${book.totalCopies} Available`
                    : "Out of Stock (0 Copies)"}
                </span>

                {hasBorrowed && (
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-amber-600" />
                    Currently On Loan To You
                  </span>
                )}
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-border/80">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  <span>Added: {book.addedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Layers className="w-3.5 h-3.5 text-stone-500" />
                  <span>{book.pages} Pages</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>BetterAuth Verified</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>14 Days Borrow Period</span>
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-foreground mb-1">
                  Synopsis
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>
            </div>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-border bg-muted/40 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-muted-foreground font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Zero Late-Fee Community Policy</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium transition cursor-pointer"
            >
              Close
            </button>

            {hasBorrowed ? (
              <button
                disabled={isProcessing}
                onClick={handleReturnAction}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isProcessing ? "Returning..." : "Return Book ($inc: +1)"}</span>
              </button>
            ) : (
              <button
                disabled={!isAvailable || isProcessing}
                onClick={handleBorrowAction}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#164e38] hover:bg-[#123e2d] text-white text-xs font-medium transition shadow-sm cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>
                  {isProcessing
                    ? "Reserving..."
                    : isAvailable
                    ? "Borrow This Book ($inc: -1)"
                    : "Currently Unavailable"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
