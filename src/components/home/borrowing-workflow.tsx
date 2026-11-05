"use client";
import React from "react";
import { BookCategory } from "@/types";
import {
  BookOpen,
  Atom,
  Landmark,
  Sparkles,
  Palette,
  Search,
  BookmarkCheck,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const initialCategories = [
  { id: "fiction", name: "Fiction", subtitle: "Stories & novels", count: 120, iconName: "book" },
  { id: "science", name: "Science", subtitle: "Discoveries & ideas", count: 85, iconName: "atom" },
  { id: "history", name: "History", subtitle: "Past civilizations", count: 64, iconName: "history" },
  { id: "fantasy", name: "Fantasy", subtitle: "Magic & adventure", count: 92, iconName: "sparkles" },
  { id: "art", name: "Art & Design", subtitle: "Creative expression", count: 48, iconName: "palette" },
];

const workflowSteps = [
  {
    step: "01",
    title: "Browse & Discover",
    description:
      "Explore curated shelves with real-time copy tracking. Filter by your favorite genres or search directly by title and author.",
    tag: "Live Inventory Tracking",
    icon: Search,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100/70 dark:bg-blue-950/50",
  },
  {
    step: "02",
    title: "One-Click Borrow",
    description:
      "Select your volume and choose an estimated return date. No subscription fees, security deposit, or paperwork required.",
    tag: "Instant Loan Approval",
    icon: BookmarkCheck,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100/70 dark:bg-amber-950/50",
  },
  {
    step: "03",
    title: "Read at Your Pace",
    description:
      "Enjoy reading anytime. Your loan is linked to your reader profile so you can monitor deadlines and returns effortlessly.",
    tag: "Personal Loan Tracking",
    icon: BookOpen,
    color: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-100/70 dark:bg-emerald-950/50",
  },
  {
    step: "04",
    title: "Return & Restock",
    description:
      "Return the book to restore shelf stock for fellow readers, or contribute books from your own bookshelf to keep knowledge flowing.",
    tag: "Restores Shelf Stock",
    icon: RotateCcw,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-100/70 dark:bg-rose-950/50",
  },
];

interface BorrowingWorkflowProps {
  onSelectCategory?: (category: BookCategory) => void;
}

export function BorrowingWorkflow({
  onSelectCategory,
}: BorrowingWorkflowProps) {
  const getCategoryIcon = (iconName: string): React.ReactNode => {
    switch (iconName) {
      case "book":
        return (
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        );
      case "atom":
        return (
          <Atom className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        );
      case "history":
        return (
          <Landmark className="w-5 h-5 text-amber-700 dark:text-amber-400" />
        );
      case "sparkles":
        return (
          <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400" />
        );
      case "palette":
        return (
          <Palette className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        );
      default:
        return <BookOpen className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <section
      id="workflow"
      className="w-full bg-[#fbf7f0] dark:bg-[#131920] border-y border-stone-200/80 dark:border-stone-800/80 py-12 sm:py-16 md:py-20 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* ============================================================== */}
        {/* 1. HOW BORROWING WORKS SECTION                                 */}
        {/* ============================================================== */}
        <div className="space-y-8 sm:space-y-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/10 dark:bg-emerald-400/10 text-emerald-900 dark:text-emerald-300 text-[11px] font-semibold uppercase tracking-wider border border-emerald-700/15">
              <span>Community Lending Flow</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              How Borrowing Works
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              A simple, trust-based neighborhood library cycle that keeps books moving and stories alive for everyone.
            </p>
          </div>

          {/* Workflow Cards Grid */}
          <div className="grid grid-cols-1 min-[440px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {workflowSteps.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.step}
                  className="group relative rounded-2xl sm:rounded-3xl bg-card border border-border/80 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-emerald-600/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-muted text-muted-foreground group-hover:text-foreground transition-colors">
                        Step {item.step}
                      </span>
                      <div className={`p-2.5 rounded-xl ${item.bg} ${item.color} transition-transform group-hover:scale-105`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-foreground tracking-tight group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Highlight Tag */}
                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-1.5 text-[11px] font-medium text-stone-600 dark:text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{item.tag}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick CTA banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-emerald-900/5 dark:bg-emerald-400/5 border border-emerald-900/10 dark:border-emerald-400/15">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm sm:text-base font-bold text-foreground">
                  Ready to start reading?
                </h4>
                <p className="text-xs text-muted-foreground">
                  Explore over hundreds of books available in the neighborhood right now.
                </p>
              </div>
            </div>

            <Link
              href="/all-books"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#164e38] hover:bg-[#123e2d] active:scale-98 text-white text-xs sm:text-sm font-medium shadow-sm transition-all cursor-pointer shrink-0"
            >
              <span>Explore Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Subtle Section Divider */}
        <div className="border-t border-stone-200/80 dark:border-stone-800/80" />

        {/* ============================================================== */}
        {/* 2. TOP CATEGORIES SECTION                                      */}
        {/* ============================================================== */}
        <div className="space-y-6 sm:space-y-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Top Categories
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Explore literature organized across reader-curated genres.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {initialCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory?.(cat.name as BookCategory)}
                className="group p-3.5 sm:p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md hover:border-emerald-600/40 text-left transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2 rounded-xl bg-muted group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 transition-colors">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-muted text-foreground">
                    {cat.count} Books
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
