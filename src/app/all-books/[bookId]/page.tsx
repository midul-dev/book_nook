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

  const token = await jwtAuthTokenServer()

  const res = await fetch(`http://localhost:5000/all-books/${bookId}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (res.status === 404) notFound();

  if (!res.ok) {
    throw new Error("Failed to fetch book");
  }

  const book: IBook = await res.json();

  if (!book) notFound();

  const totalCopies = Number(book.copies) || 0;

  return (
    <main className="min-h-screen bg-[#fafaf9] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Navigation */}
        <Link
          href="/books"
          className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-emerald-800"
        >
          <ArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Library
        </Link>

        {/* Main Book Card */}
        <DetailCard book={book} totalCopies={totalCopies} />

        {/* Bottom Message */}
        <div className="mt-10 flex flex-col items-center text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
            <BookOpen size={21} />
          </div>

          <h2 className="font-serif text-xl font-bold text-stone-800">
            Happy Reading!
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
            Every book is an opportunity to discover something new. Find your
            next favorite story at BookNook.
          </p>
        </div>
      </div>
    </main>
  );
}
