import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MyBookRow } from "./_components/MyBookRow";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { IBook } from "@/types";
import { jwtAuthTokenServer } from "@/lib/functions/jwt_auth_tokens/jwtAuthTokenServer";

export const metadata: Metadata = {
  title: "BookNook | My Books",
};

export default async function MyBooksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userEmail = session?.user?.email;
  const token = await jwtAuthTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-books?email=${userEmail}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const myBooks: IBook[] = res.ok ? await res.json() : [];

  const hasBooks = Array.isArray(myBooks) && myBooks.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-border">
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              My Contributed Books
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl">
              Manage your contributed volumes, track available copies, and
              update library catalog entries.
            </p>
          </div>

          <Link href="/add-books" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#164e38] hover:bg-[#123e2d] text-white gap-1.5 h-10 px-4 rounded-xl cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Add a New Book</span>
            </Button>
          </Link>
        </div>

        {/* Books Content */}
        <div className="py-6 sm:py-8">
          {hasBooks ? (
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border/80 shadow-xs overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 items-center px-6 py-4 border-b border-border/70 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider select-none">
                <div className="col-span-5">COVER & TITLE</div>
                <div className="col-span-2">AUTHOR</div>
                <div className="col-span-2">CATEGORY</div>
                <div className="col-span-1 text-center">COPIES</div>
                <div className="col-span-2 text-right">
                  ACTIONS
                </div>
              </div>

              {/* Book Rows */}
              <div className="divide-y divide-border/60">
                {myBooks.map((book) => (
                  <MyBookRow key={book._id} book={book} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20 px-4 bg-card rounded-3xl border border-dashed border-border/90 shadow-2xs">
              <div className="w-16 h-16 rounded-2xl bg-[#164e38]/10 text-[#164e38] dark:text-emerald-400 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 opacity-80" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                You haven&apos;t added any books yet
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mt-2 mb-6">
                Contribute your first book to see it listed here with Edit and
                Delete controls.
              </p>
              <Link href="/add-books">
                <Button className="bg-[#164e38] hover:bg-[#123e2d] text-white gap-2 h-11 px-6 rounded-xl cursor-pointer">
                  <Plus className="w-4 h-4" />
                  <span>Add Your First Book</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
