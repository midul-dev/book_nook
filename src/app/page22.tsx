"use client";

import React, { useState } from "react";
import { initialBooks } from "@/data/mock-books";
import { Book, BookCategory } from "@/types";
import { TopDevBanner } from "@/components/layout/top-dev-banner";
import { Navbar } from "@/components/layout/navbar";
import { HeroBanner } from "@/components/home/hero-banner";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { BorrowingWorkflow } from "@/components/home/borrowing-workflow";

import { Footer } from "@/components/layout/footer";
import { BookDetailDialog } from "@/components/home/book-detail-dialog";
import { AddBookDialog } from "@/components/home/add-book-dialog";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [borrowedBookIds, setBorrowedBookIds] = useState<string[]>(["book-4", "book-1"]); // Default 2 borrows matching screenshot
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [categoryFilter, setCategoryFilter] = useState<BookCategory | "All">("All");

  // Handle open book details
  const handleViewDetails = (book: Book) => {
    const currentBook = books.find((b) => b.id === book.id) || book;
    setSelectedBook(currentBook);
    setIsDetailOpen(true);
  };

  // Handle Borrow
  const handleBorrowBook = (bookId: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => {
        if (b.id === bookId && b.availableCopies > 0) {
          return { ...b, availableCopies: b.availableCopies - 1 };
        }
        return b;
      })
    );
    if (!borrowedBookIds.includes(bookId)) {
      setBorrowedBookIds((prev) => [...prev, bookId]);
    }
    setSelectedBook((prev) =>
      prev && prev.id === bookId && prev.availableCopies > 0
        ? { ...prev, availableCopies: prev.availableCopies - 1 }
        : prev
    );
  };

  // Handle Return
  const handleReturnBook = (bookId: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => {
        if (b.id === bookId && b.availableCopies < b.totalCopies) {
          return { ...b, availableCopies: b.availableCopies + 1 };
        }
        return b;
      })
    );
    setBorrowedBookIds((prev) => prev.filter((id) => id !== bookId));
    setSelectedBook((prev) =>
      prev && prev.id === bookId
        ? { ...prev, availableCopies: prev.availableCopies + 1 }
        : prev
    );
  };

  // Handle Adding New Book
  const handleAddNewBook = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev]);
    setTimeout(() => {
      document.getElementById("shelf")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Category filter trigger
  const handleCategorySelect = (cat: BookCategory | "All") => {
    setCategoryFilter(cat);
    document.getElementById("shelf")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      {/* 1. Top Prototype / Status Banner */}
      <TopDevBanner />

      {/* 2. Main Navigation Bar */}
      <Navbar
        borrowCount={borrowedBookIds.length}
        onOpenAddBook={() => setIsAddBookOpen(true)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      <main className="flex-1">
        {/* 3. Hero Showcase Carousel */}
        <HeroBanner
          onBrowseClick={() => {
            document.getElementById("shelf")?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 4. New Arrivals on the Shelf Grid */}
        <NewArrivalsSection
          books={books}
          onViewDetails={handleViewDetails}
          onOpenAddBook={() => setIsAddBookOpen(true)}
          selectedCategory={categoryFilter}
          onSelectCategory={setCategoryFilter}
        />

        {/* 5. How Borrowing Works & Top Categories */}
        <BorrowingWorkflow
          onSelectCategory={(category) => handleCategorySelect(category)}
        />
      </main>

      {/* 7. Comprehensive Dark Footer */}
      <Footer onOpenAddBook={() => setIsAddBookOpen(true)} />

      {/* 8. Interactive Book Detail Dialog Modal */}
      <BookDetailDialog
        book={selectedBook}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onBorrowBook={handleBorrowBook}
        onReturnBook={handleReturnBook}
        hasBorrowed={selectedBook ? borrowedBookIds.includes(selectedBook.id) : false}
      />

      {/* 9. Interactive Add New Book Dialog Modal */}
      <AddBookDialog
        isOpen={isAddBookOpen}
        onClose={() => setIsAddBookOpen(false)}
        onAddBook={handleAddNewBook}
      />
    </div>
  );
}
