"use client";
import { BookCard } from "@/components/home/book-card";
import { Input } from "@/components/ui/input";
import { BookCategory, IBook } from "@/types";
import { BookOpen, Filter, Search } from "lucide-react";
import React, { useState } from "react";

const AllBooks = ({ books }: { books: IBook[] }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    BookCategory | "All"
  >("All");

  const categories: (BookCategory | "All")[] = [
    "All",
    "Science",
    "History",
    "Kids",
    "Fiction",
    "Others",
  ];

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" ||
      book.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.author?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 py-4 sm:py-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap cursor-pointer shrink-0 ${
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
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search title, Author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl text-sm"
          />
        </div>
      </div>

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border mt-6">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <h3 className="font-serif text-lg font-bold text-foreground">
            No Books Found
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            No titles matched your query &ldquo;{search}&rdquo;. Try a different category or
            search term.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
