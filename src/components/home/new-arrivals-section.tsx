import { IBook } from "@/types";
import { BookCard } from "@/components/home/book-card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export async function NewArrivalsSection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/latest-books`,{
    cache: "no-store",
  });
  const displayedBooks: IBook[] = await res.json();

  return (
    <section
      id="shelf"
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-border/80">
        <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            New Arrivals on the Shelf
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Freshly cataloged additions contributed by our community readers.
          </p>
        </div>

        {/* Action Controls (Add Book & Filter) */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto">
          <Link href="/add-books" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto rounded-xl border-border hover:bg-muted font-medium text-xs sm:text-sm h-10 px-4 gap-1.5 shadow-2xs hover:border-emerald-600/50 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Add a New Book</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Book Grid */}
      <div
        id="latest-books"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8"
      >
        {displayedBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {displayedBooks.length === 0 && (
        <div className="text-center py-12 sm:py-16 bg-muted/30 rounded-2xl border border-dashed border-border mt-6">
          <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-sm sm:text-base font-medium text-foreground">
            No books found in this category
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Try selecting another filter or donate a new book.
          </p>
        </div>
      )}

      {/* Centered CTA */}
      <div className="flex justify-center pt-8 sm:pt-12">
        <Link
          href="/all-books"
          className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-[#164e38] hover:bg-[#123e2d] active:scale-98 text-white text-xs sm:text-sm md:text-base font-medium shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <span>See All Books</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
