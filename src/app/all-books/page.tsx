import { Button } from "@/components/ui/button";
import AllBooks from "./_components/AllBooks";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AllBooksPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-books`);
  const books = await res.json();
  console.log("Fetched books:", books);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              All Books in the Library
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Browse through our entire community-driven literary inventory with
              real-time copy tracking and instant loans.
            </p>
          </div>

          <Link href="/add-books">
            <Button className="self-start md:self-end bg-[#164e38] hover:bg-[#123e2d] text-white gap-1.5 h-10 px-4 mb-4 rounded-xl">
              <Plus className="w-4 h-4" />
              <span>Add a New Book</span>
            </Button>
          </Link>
        </div>
        {/* All-Book Section  */}
        <AllBooks books={books} />
      </main>
    </div>
  );
}
