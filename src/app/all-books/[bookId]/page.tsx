
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Library,
  Package,
  UserRound,
} from "lucide-react";

import { IBook } from "@/types";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ bookId: string }>;
}

export default async function BookDetailPage({ params }: Props) {
  const { bookId } = await params;

  const res = await fetch(
    `http://localhost:5000/all-books/${bookId}`,
    {
      cache: "no-store",
    }
  );

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
        <section className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm">

          <div className="grid md:grid-cols-[0.85fr_1.15fr]">

            {/* Book Cover Section */}
            <div className="flex items-center justify-center bg-[#f3f4f0] p-8 sm:p-12 lg:p-14">

              <div className="group relative w-full max-w-[290px]">

                {/* Decorative Background */}
                <div className="absolute -inset-4 rounded-2xl bg-emerald-900/5 blur-xl" />

                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-r-xl rounded-l-md bg-white shadow-xl ring-1 ring-black/5 transition-transform duration-500 group-hover:-translate-y-1">

                  {/* Book Spine */}
                  <div className="absolute inset-y-0 left-0 z-10 w-2 bg-black/10" />

                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 80vw, 290px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-5 bg-[#164e38] px-6 text-center text-white">

                      <BookOpen size={52} strokeWidth={1.2} />

                      <h2 className="font-serif text-2xl font-bold">
                        {book.title}
                      </h2>

                      <p className="text-sm text-white/70">
                        {book.author}
                      </p>

                    </div>
                  )}

                </div>

                {/* Cover Caption */}
                <p className="relative mt-6 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                  BookNook Collection
                </p>

              </div>
            </div>

            {/* Book Information */}
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">

              {/* Category */}
              <div className="mb-5">
                <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-800">
                  {book.category || "Uncategorized"}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-[42px]">
                {book.title}
              </h1>

              {/* Author */}
              <p className="mt-3 text-base text-stone-500">
                Written by{" "}
                <span className="font-semibold text-stone-800">
                  {book.author}
                </span>
              </p>

              {/* Divider */}
              <div className="my-7 h-px bg-stone-200" />

              {/* Description */}
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen size={17} className="text-emerald-700" />

                  <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-stone-800">
                    About This Book
                  </h2>
                </div>

                <p className="text-sm leading-7 text-stone-600 sm:text-[15px]">
                  {book.description ||
                    "No description is available for this book yet."}
                </p>
              </div>

              {/* Statistics */}
              <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

               {/* Uploader Information */}
<div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5 transition-colors hover:border-emerald-200">

  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
    <UserRound size={17} />
  </div>

  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">
    Uploaded By
  </p>

  <p className="text-sm font-semibold text-stone-800">
    {book.addedBy?.name || "Unknown User"}
  </p>

  <p className="mt-1 text-xs text-stone-500">
    {book.addedBy?.email || "Email not available"}
  </p>

</div>

                {/* Inventory Info */}
                <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5 transition-colors hover:border-emerald-200">

                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                    <Package size={17} />
                  </div>

                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Total Copies
                  </p>

                  <p className="text-sm font-semibold text-stone-800">
                    {totalCopies} Copies
                  </p>

                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">

                <Button
                  type="button"
                  disabled={totalCopies <= 0}
                  className="h-12 flex-1 rounded-xl bg-[#164e38] px-7 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#103d2b] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Borrow This Book
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>

                <Link
                  href="/all-books"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-stone-200 px-6 text-sm font-semibold text-stone-700 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  Explore Books
                </Link>

              </div>

              {/* Footer Note */}
              <p className="mt-5 text-center text-xs text-stone-400 sm:text-left">
                Discover more stories from your community library.
              </p>

            </div>
          </div>
        </section>

        {/* Bottom Message */}
        <div className="mt-10 flex flex-col items-center text-center">

          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
            <BookOpen size={21} />
          </div>

          <h2 className="font-serif text-xl font-bold text-stone-800">
            Happy Reading!
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
            Every book is an opportunity to discover something new.
            Find your next favorite story at BookNook.
          </p>

        </div>

      </div>
    </main>
  );
}
