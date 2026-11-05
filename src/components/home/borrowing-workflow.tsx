"use client";
import React from "react";
import { BookCategory } from "@/types";
import { BookOpen, Atom, Landmark, Sparkles, Palette } from "lucide-react";

const initialCategories = [
  { id: "fiction", name: "Fiction", subtitle: "Stories & novels", count: 120, iconName: "book" },
  { id: "science", name: "Science", subtitle: "Discoveries & ideas", count: 85, iconName: "atom" },
  { id: "history", name: "History", subtitle: "Past civilizations", count: 64, iconName: "history" },
  { id: "fantasy", name: "Fantasy", subtitle: "Magic & adventure", count: 92, iconName: "sparkles" },
  { id: "art", name: "Art & Design", subtitle: "Creative expression", count: 48, iconName: "palette" },
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
      className="w-full bg-[#fbf7f0] dark:bg-[#131920] border-y border-stone-200/80 dark:border-stone-800/80 py-10 sm:py-16 md:py-20 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Top Categories
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Explore literature organized across reader-curated genres.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="pt-2 sm:pt-4">
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
