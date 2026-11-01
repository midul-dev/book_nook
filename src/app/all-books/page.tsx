"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TopDevBanner } from "@/components/layout/top-dev-banner";
import { initialBooks } from "@/data/mock-books";
import { Book, BookCategory } from "@/types";
import { BookCard } from "@/components/home/book-card";
import { BookDetailDialog } from "@/components/home/book-detail-dialog";
import { AddBookDialog } from "@/components/home/add-book-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter, BookOpen } from "lucide-react";

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | "All">("All");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [borrowedBookIds, setBorrowedBookIds] = useState<string[]>(["book-4", "book-1"]);

  const categories: (BookCategory | "All")[] = ["All", "Science", "History", "Kids", "Fiction", "Others"];

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" || book.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBorrow = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId && b.availableCopies > 0 ? { ...b, availableCopies: b.availableCopies - 1 } : b))
    );
    if (!borrowedBookIds.includes(bookId)) setBorrowedBookIds((prev) => [...prev, bookId]);
    setSelectedBook((prev) => (prev && prev.id === bookId ? { ...prev, availableCopies: prev.availableCopies - 1 } : prev));
  };

  const handleReturn = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId && b.availableCopies < b.totalCopies ? { ...b, availableCopies: b.availableCopies + 1 } : b))
    );
    setBorrowedBookIds((prev) => prev.filter((id) => id !== bookId));
    setSelectedBook((prev) => (prev && prev.id === bookId ? { ...prev, availableCopies: prev.availableCopies + 1 } : prev));
  };

  const handleAddNewBook = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <TopDevBanner />
      <Navbar borrowCount={borrowedBookIds.length} onOpenAddBook={() => setIsAddBookOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">
              Route: /all-books • Complete Archive
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              All Books in the Library
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Browse through our entire community-driven literary inventory with real-time copy tracking and instant loans.
            </p>
          </div>

          <Button
            onClick={() => setIsAddBookOpen(true)}
            className="self-start md:self-end bg-[#164e38] hover:bg-[#123e2d] text-white gap-1.5 h-10 px-4 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            <span>Add a New Book</span>
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-emerald-900 text-white dark:bg-emerald-800 shadow-sm"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search title, author, ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-xl"
            />
          </div>
        </div>

        {/* Book Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredBooks.map((book) => (
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

        {filteredBooks.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border mt-6">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
            <h3 className="font-serif text-lg font-bold text-foreground">No Books Found</h3>
            <p className="text-xs text-muted-foreground mt-1">
              No titles matched your query "{searchQuery}". Try a different category or search term.
            </p>
          </div>
        )}
      </main>

      <Footer onOpenAddBook={() => setIsAddBookOpen(true)} />

      <BookDetailDialog
        book={selectedBook}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onBorrowBook={handleBorrow}
        onReturnBook={handleReturn}
        hasBorrowed={selectedBook ? borrowedBookIds.includes(selectedBook.id) : false}
      />

      <AddBookDialog
        isOpen={isAddBookOpen}
        onClose={() => setIsAddBookOpen(false)}
        onAddBook={handleAddNewBook}
      />
    </div>
  );
}
