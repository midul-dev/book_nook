import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Bookmark, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MyBorrowRow } from "./_components/MyBorrowRow";
import { IBorrowItem } from "./_components/ReturnDialog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { jwtAuthTokenServer } from "@/lib/functions/jwt_auth_tokens/jwtAuthTokenServer";

export const metadata: Metadata = {
  title: "BookNook | My Borrows",
};

export default async function MyBorrowsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userEmail = session?.user?.email;

  const token = await jwtAuthTokenServer();

  let borrowedBooks: IBorrowItem[] = [];
  try {
    if (userEmail) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-borrows?email=${userEmail}`,
        {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.ok) {
        borrowedBooks = await res.json();
      }
    }
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
  }

  const hasBorrows = Array.isArray(borrowedBooks) && borrowedBooks.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-border">
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              My Borrowed Books
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl">
              Volumes currently checked out to your profile. Track return
              deadlines and return finished volumes to the shelf.
            </p>
          </div>

          <Link href="/all-books" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#164e38] hover:bg-[#123e2d] text-white gap-1.5 h-10 px-4 rounded-xl cursor-pointer">
              <BookOpen className="w-4 h-4" />
              <span>Browse All Books</span>
            </Button>
          </Link>
        </div>

        {/* Borrows Content */}
        <div className="py-6 sm:py-8">
          {hasBorrows ? (
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border/80 shadow-xs overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 items-center px-6 py-4 border-b border-border/70 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider select-none">
                <div className="col-span-4">COVER & TITLE</div>
                <div className="col-span-2">AUTHOR</div>
                <div className="col-span-2">CATEGORY</div>
                <div className="col-span-2 text-center">RETURN DATE</div>
                <div className="col-span-2 text-right">
                  ACTIONS
                </div>
              </div>

              {/* Borrow Rows */}
              <div className="divide-y divide-border/60">
                {borrowedBooks.map((book) => (
                  <MyBorrowRow key={book._id} book={book} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20 px-4 bg-card rounded-3xl border border-dashed border-border/90 shadow-2xs">
              <div className="w-16 h-16 rounded-2xl bg-[#164e38]/10 text-[#164e38] dark:text-emerald-400 flex items-center justify-center mb-4">
                <Bookmark className="w-8 h-8 opacity-80" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                No Active Borrows
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mt-2 mb-6">
                You haven&apos;t borrowed any books from the library yet, or all
                borrowed editions have been returned. Discover your next read
                from the catalog!
              </p>
              <Link href="/all-books">
                <Button className="bg-[#164e38] hover:bg-[#123e2d] text-white gap-2 h-11 px-6 rounded-xl cursor-pointer">
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Available Books</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
