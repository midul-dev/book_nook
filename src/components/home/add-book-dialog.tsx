"use client";

import React, { useState } from "react";
import { Book, BookCategory } from "@/types";
import { X, Plus, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (newBook: Book) => void;
}

export function AddBookDialog({ isOpen, onClose, onAddBook }: AddBookDialogProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<BookCategory>("Science");
  const [copies, setCopies] = useState("3");
  const [description, setDescription] = useState("");
  const [themeIndex, setThemeIndex] = useState(0);

  if (!isOpen) return null;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const total = parseInt(copies) || 3;
    const selectedTheme = themes[themeIndex];

    const newBook: Book = {
      id: `book-${Date.now()}`,
      title: title.trim(),
      author: author.trim(),
      category,
      coverGradient: selectedTheme.gradient,
      coverThemeColor: selectedTheme.color,
      motif: selectedTheme.motif,
      totalCopies: total,
      availableCopies: total,
      addedDate: new Date().toISOString().split("T")[0],
      description:
        description.trim() ||
        "A freshly donated community hardcover volume added to BookNook's shared shelves.",
      isbn: `978-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1 + Math.random() * 9)}`,
      pages: Math.floor(200 + Math.random() * 350),
      rating: 5.0,
    };

    onAddBook(newBook);
    setTitle("");
    setAuthor("");
    setDescription("");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-foreground">Catalog a New Book</h3>
              <p className="text-[11px] text-muted-foreground font-mono">
                Atomic MongoDB insertion with .save()
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="h-8 w-8 rounded-full border border-border hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-xs font-mono font-medium text-foreground mb-1.5 uppercase">
              Book Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Architecture of Silence"
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-medium text-foreground mb-1.5 uppercase">
                Author Name *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-foreground mb-1.5 uppercase">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BookCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
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
              Copies Available for Borrowing
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-foreground mb-1.5 uppercase">
              Select Cover Aesthetic
            </label>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t, idx) => (
                <button
                  type="button"
                  key={t.label}
                  onClick={() => setThemeIndex(idx)}
                  className={`p-2 rounded-xl text-left border transition cursor-pointer flex flex-col gap-1.5 ${
                    themeIndex === idx
                      ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-emerald-500"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <div
                    className={`h-5 w-full rounded-md bg-gradient-to-r ${t.gradient} shadow-2xs`}
                  />
                  <span className="text-[10px] font-medium text-foreground leading-tight truncate">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-foreground mb-1.5 uppercase">
              Brief Description / Synopsis
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What makes this book worth reading?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
            />
          </div>

          {/* Dialog Action Buttons */}
          <div className="pt-4 border-t border-border flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-border hover:bg-muted text-xs font-medium transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#164e38] hover:bg-[#123e2d] text-white text-xs font-medium transition shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catalog to Shelf</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
