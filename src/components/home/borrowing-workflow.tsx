"use client";

import React from "react";
import { workflowSteps } from "@/data/workflow-steps";
import { initialCategories } from "@/data/mock-categories";
import { BookCategory } from "@/types";
import {
  BookOpen,
  Atom,
  Landmark,
  Sparkles,
  Palette,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";

interface BorrowingWorkflowProps {
  onSelectCategory?: (category: BookCategory) => void;
}

export function BorrowingWorkflow({ onSelectCategory }: BorrowingWorkflowProps) {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "book":
        return <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "atom":
        return <Atom className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case "history":
        return <Landmark className="w-5 h-5 text-amber-700 dark:text-amber-400" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case "palette":
        return <Palette className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <section
      id="workflow"
      className="w-full bg-[#fbf7f0] dark:bg-[#131920] border-y border-stone-200/80 dark:border-stone-800/80 py-16 md:py-24 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-amber-700 dark:text-amber-400">
            EXTRA SECTION 01 • LIBRARY WORKFLOW & CURATED SHELVES
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            How Borrowing Works & Top Categories
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Borrowing from BookNook takes less than thirty seconds, backed by real-time inventory protection
            and five dedicated subject collections.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {workflowSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="group relative rounded-2xl bg-card p-6 sm:p-8 border border-border/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Step Pill */}
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-sm border border-emerald-200 dark:border-emerald-800/60">
                  {step.stepNumber}
                </div>

                <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom Meta Badges */}
              <div className="pt-6 mt-6 border-t border-border/70 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span className="truncate">{step.badge1}</span>
                <span className="text-foreground font-semibold flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {step.badge2}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {initialCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                className="group p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-md hover:border-emerald-600/40 text-left transition-all duration-200 flex flex-col justify-between cursor-pointer"
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
                  <h4 className="font-serif text-base font-bold text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
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
