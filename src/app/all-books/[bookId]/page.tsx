import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { IBook } from "@/types";
import DetailCard from "./_components/DetailCard";
import { jwtAuthTokenServer } from "@/lib/functions/jwt_auth_tokens/jwtAuthTokenServer";

interface Props {
  params: Promise<{ bookId: string }>;
}

export default async function BookDetailPage({ params }: Props) {
  const { bookId } = await params;

  const token = await jwtAuthTokenServer();

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-books/${bookId}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404) notFound();

  if (!res.ok) {
    throw new Error("Failed to fetch book");
  }

  const book: IBook = await res.json();

  if (!book) notFound();

  const totalCopies = Number(book.copies) || 0;

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-background px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Back Navigation */}
        <Link
          href="/all-books"
          className="group mb-4 sm:mb-6 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-500 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to All Books
        </Link>

        {/* Main Book Card */}
        <DetailCard book={book} totalCopies={totalCopies} />

        {/* Bottom Message */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center text-center px-4">
          <div className="mb-3 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            <BookOpen size={20} />
          </div>

          <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground">
            Happy Reading!
          </h2>

          <p className="mt-1.5 sm:mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-muted-foreground">
            Every book is an opportunity to discover something new. Find your
            next favorite story at BookNook.
          </p>
        </div>
      </div>
    </div>
  );
}
