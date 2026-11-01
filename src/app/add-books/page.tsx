"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TopDevBanner } from "@/components/layout/top-dev-banner";
import { Book, BookCategory } from "@/types";
import { PlusCircle, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddBooksPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<BookCategory>("Science");
  const [copies, setCopies] = useState("3");
  const [description, setDescription] = useState("");
  const [themeIndex, setThemeIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const themes = [
    {
      label: "Cosmic Indigo",
      gradient: "from-[#1c2c4d] via-[#131f38] to-[#0a1224]",
      color: "#3b82f6",
      motif: "cosmic" as const,
    },
    {
      label: "Maritime Rust",
      gradient: "from-[#85351a] via-[#692913] to-[#451809]",
      color: "#ea580c",
      motif: "maritime" as const,
    },
    {
      label: "Crimson Lantern",
      gradient: "from-[#7e182c] via-[#630f20] to-[#420813]",
      color: "#e11d48",
      motif: "lantern" as const,
    },
    {
      label: "Minimalist Slate",
      gradient: "from-[#292f38] via-[#1d2329] to-[#121619]",
      color: "#64748b",
      motif: "minimalist" as const,
    },
    {
      label: "Lapis Observatory",
      gradient: "from-[#1a3c70] via-[#122b52] to-[#0a1930]",
      color: "#2563eb",
      motif: "astronomy" as const,
    },
    {
      label: "Spiced Cinnamon",
      gradient: "from-[#8a3e1b] via-[#6e2f12] to-[#481c08]",
      color: "#d97706",
      motif: "botanical" as const,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBook = Object.fromEntries(formData.entries()) as { title: string; author: string; category: BookCategory; copies: string; description: string };
    console.log("New Book Submitted:", newBook);
    
    
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home Shelf</span>
        </Link>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Contribute a Book to BookNook
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Add a hardcover or paperback from your collection. Readers will be
              able to discover and borrow it with atomic inventory
              synchronization.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center space-y-2 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-emerald-900 dark:text-emerald-200">
                Book Cataloged Successfully!
              </h3>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                Your edition has been safely indexed into MongoDB with live copy
                tracking.
              </p>
              <div className="pt-2">
                <Link href="/all-books">
                  <Button
                    size="sm"
                    className="bg-[#164e38] hover:bg-[#123e2d] text-white"
                  >
                    View in All Books →
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-foreground mb-1.5 uppercase">
                  Book Title *
                </label>
                <input
                  type="text"
                  required
                  name="title"
                  placeholder="e.g. Harry Potter"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-foreground mb-1.5 uppercase">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="author"
                    placeholder="e.g. J. K. Rowling"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-1.5 uppercase">
                    Category *
                  </label>
                  <select
                    name="category"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Kids">Kids</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-foreground mb-1.5 uppercase">
                  Available Copies for Borrowing
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  name="copies"
                  placeholder="e.g. 3"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div>
                <label className="block text-xs text-foreground mb-1.5 uppercase">
                  Image Url / Cover Art *
                </label>
                <input
                    type="text"
                    required
                    name="image"
                    placeholder="e.g. https://example.com/cover.jpg"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
              </div>

              <div>
                <label className="block text-xs text-foreground mb-1.5 uppercase">
                  Synopsis / Overview
                </label>
                <textarea
                  rows={4}
                  name="description"
                  placeholder="Share a short teaser or context for future readers..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#164e38] hover:bg-[#123e2d] text-white font-medium text-sm rounded-xl gap-2 shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Book to Library Shelf</span>
              </Button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
