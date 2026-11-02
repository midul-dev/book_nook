"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TopDevBanner } from "@/components/layout/top-dev-banner";
import { initialBooks } from "@/data/mock-books";
import { Book } from "@/types";
import { BookCard } from "@/components/home/book-card";
import { BookDetailDialog } from "@/components/home/book-detail-dialog";
import { Button } from "@/components/ui/button";
import { BookMarked, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MyBooksPage() {
  // Simulating books added by user (e.g., Ariana)
  const [myBooks, setMyBooks] = useState<Book[]>([initialBooks[1], initialBooks[4]]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <TopDevBanner />
      <Navbar />

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
              Route: /my-books • Contributed Volumes
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              My Contributed Books
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Editions you have placed onto the community shelves. You can monitor loan frequencies, availability, and update descriptions.
            </p>
          </div>

          <Link href="/add-books">
            <Button className="bg-[#164e38] hover:bg-[#123e2d] text-white gap-1.5 h-10 px-4 rounded-xl">
              <Plus className="w-4 h-4" />
              <span>Contribute Another Book</span>
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {myBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onViewDetails={(b) => {
                  setSelectedBook(b);
                  setIsDetailOpen(true);
                }}
              />
            ))}
          </div>

          {myBooks.length === 0 && (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
              <BookMarked className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
              <h3 className="font-serif text-lg font-bold text-foreground">No Contributed Books Yet</h3>
              <p className="text-xs text-muted-foreground mt-1">
                You haven't added any books yet. Place an edition from your personal shelf to get started!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <BookDetailDialog
        book={selectedBook}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onBorrowBook={() => {}}
        onReturnBook={() => {}}
        hasBorrowed={false}
      />
    </div>
  );
}
