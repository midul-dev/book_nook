"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TopDevBanner } from "@/components/layout/top-dev-banner";
import { initialBooks } from "@/data/mock-books";
import { Book } from "@/types";
import { BookCover } from "@/components/home/book-cover";
import { Button } from "@/components/ui/button";
import { Bookmark, RotateCcw, Clock, Calendar, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MyBorrowsPage() {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([initialBooks[0], initialBooks[3]]);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleReturn = (bookId: string) => {
    setBorrowedBooks((prev) => prev.filter((b) => b.id !== bookId));
    setSuccessNotice("Book returned successfully! Copy restored with $inc: +1.");
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <TopDevBanner />
      <Navbar borrowCount={borrowedBooks.length} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home Shelf</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">
              Route: /my-borrows • Active Loans
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              My Active Borrows
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Volumes currently checked out to your BetterAuth profile. One click on Return Book restores the inventory copy count immediately.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold">
              {borrowedBooks.length} Active Loans
            </span>
          </div>
        </div>

        {/* Success Notice */}
        {successNotice && (
          <div className="my-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Active Borrows List */}
        <div className="py-8 space-y-6">
          {borrowedBooks.map((book) => (
            <div
              key={book.id}
              className="rounded-3xl bg-card border border-border p-6 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="w-32 shrink-0">
                <BookCover book={book} />
              </div>

              <div className="flex-1 space-y-3 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase font-bold text-emerald-800 dark:text-emerald-400">
                    {book.category}
                  </span>
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Due in 11 days (Nov 12, 2026)
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">by {book.author}</p>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {book.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/80">
                  <div className="text-[11px] font-mono text-muted-foreground">
                    ISBN: {book.isbn} • {book.pages} Pages
                  </div>

                  <Button
                    onClick={() => handleReturn(book.id)}
                    className="bg-amber-600 hover:bg-amber-700 text-white gap-1.5 h-9 px-4 rounded-xl text-xs font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Return Book ($inc: +1)</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {borrowedBooks.length === 0 && (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
              <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
              <h3 className="font-serif text-lg font-bold text-foreground">No Active Borrows</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                You have returned all borrowed editions. Explore the catalog to discover your next read!
              </p>
              <Link href="/all-books">
                <Button className="bg-[#164e38] hover:bg-[#123e2d] text-white">
                  Browse All Books
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
