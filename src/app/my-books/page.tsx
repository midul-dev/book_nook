import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MyBookRow, IMyBookItem } from "./_components/MyBookRow";

// Static mock data modeled exactly after the reference design
const staticMyBooks: IMyBookItem[] = [
  {
    id: "my-book-1",
    title: "The Glass Botanist",
    author: "Clara Vance",
    category: "Fiction",
    copies: "3 / 5",
    description: "Set in a Victorian conservatory on the Scottish coast, a...",
    initials: "FI",
    coverGradient: "from-[#143d2b] via-[#0d2a1d] to-[#071911]",
  },
  {
    id: "my-book-2",
    title: "Quantum Tides & Cosmic Clocks",
    author: "Dr. Rafiqul Islam",
    category: "Science",
    copies: "2 / 4",
    description: "An accessible guide to gravitational waves, atomic...",
    initials: "SC",
    coverGradient: "from-[#182d54] via-[#10203d] to-[#0a1324]",
  },
  {
    id: "my-book-3",
    title: "The Paper Lantern Express",
    author: "Mina & Kaito Sato",
    category: "Kids",
    copies: "5 / 6",
    description: "A heartwarming illustrated adventure following two...",
    initials: "KI",
    coverGradient: "from-[#631427] via-[#450d1a] to-[#26060e]",
  },
  {
    id: "my-book-4",
    title: "Designing Calm Spaces",
    author: "Soren Lindqvist",
    category: "Others",
    copies: "4 / 4",
    description: "Practical architectural principles for crafting quiet...",
    initials: "OT",
    coverGradient: "from-[#26282b] via-[#1a1c1e] to-[#111213]",
  },
];

export default function MyBooksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              My Books
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Manage your contributed volumes, track available copies, and update library catalog entries.
            </p>
          </div>

          <Link href="/add-books">
            <Button className="self-start md:self-end bg-[#164e38] hover:bg-[#123e2d] text-white gap-1.5 h-10 px-4 rounded-xl cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Add a New Book</span>
            </Button>
          </Link>
        </div>

        {/* Books Table Container */}
        <div className="py-8">
          <div className="bg-card rounded-3xl border border-border/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[820px]">
                {/* Table Header Row */}
                <div className="grid grid-cols-12 items-center px-6 py-4.5 border-b border-border/70 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider select-none">
                  <div className="col-span-5">COVER & TITLE</div>
                  <div className="col-span-2">AUTHOR</div>
                  <div className="col-span-2">CATEGORY</div>
                  <div className="col-span-1 text-center">COPIES</div>
                  <div className="col-span-2 text-right">
                    ACTIONS [UPDATE & DELETE]
                  </div>
                </div>

                {/* Book Rows */}
                <div className="divide-y divide-border/60">
                  {staticMyBooks.map((book) => (
                    <MyBookRow key={book.id} book={book} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
