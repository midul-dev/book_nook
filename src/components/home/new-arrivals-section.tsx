import { IBook } from "@/types";
import { BookCard } from "@/components/home/book-card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export async function NewArrivalsSection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/latest-books`);
  const displayedBooks: IBook[] = await res.json();

  return (
    <section
      id="shelf"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/80">
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            New Arrivals on the Shelf
          </h2>
          <p className="text-sm text-muted-foreground">
            Freshly cataloged additions contributed by our community readers.
          </p>
        </div>

        {/* Action Controls (Add Book & Filter) */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
          <Button
            variant="outline"
            className="rounded-xl border-border hover:bg-muted font-medium text-xs sm:text-sm h-10 px-4 gap-1.5 shadow-2xs hover:border-emerald-600/50"
          >
            <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Add a New Book</span>
          </Button>
        </div>
      </div>

      {/* Book Grid */}
      <div
        id="latest-books"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {displayedBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {displayedBooks.length === 0 && (
        <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed border-border">
          <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-base font-medium text-foreground">
            No books found in this category
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Try selecting another filter or donate a new book.
          </p>
        </div>
      )}

      {/* Centered CTA */}
      <div className="flex justify-center pt-12">
        <Link
          href="/all-books"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#164e38] hover:bg-[#123e2d] active:scale-98 text-white text-sm md:text-base font-medium shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <span>See All Books</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
