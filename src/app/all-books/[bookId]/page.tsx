import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, BookOpen } from "lucide-react";
import { IBook } from "@/types";
import { Button } from "@/components/ui/button";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const res = await fetch(`http://localhost:5000/all-books/${bookId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error("Failed to fetch book");
  }
  
  const book: IBook = await res.json();

  if (!book) notFound();

  const totalCopies = Number(book.copies) || 0;
//   const availableCopies = Math.max(0, totalCopies - 3); // Demo calculation
//   const isBorrowedByMe = true; // Demo state

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Navigation */}
        <Link 
          href="/books" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Library
        </Link>

        {/* 2-Column Detail Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Column: Book Cover Image */}
          <div className="w-full md:w-2/5 bg-gray-100 p-8 md:p-12 flex items-center justify-center relative">
            <div className="relative w-full aspect-[2/3] rounded-lg shadow-lg overflow-hidden bg-white flex items-center justify-center">
              {/* Note: Replace 'book.image' with your actual image property from IBook */}
              {/* Using a placeholder icon if no image is available */}
              {book.image ? (
                <Image 
                  src={book.image} 
                  alt={book.title} 
                  height={400}
                  width={300}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              ) : (
                <BookOpen className="w-24 h-24 text-gray-300" />
              )}
            </div>
          </div>

          {/* Right Column: Book Details */}
          <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            
            {/* Header Info */}
            <div className="mb-2 uppercase tracking-wider text-xs font-bold text-blue-600">
              {book.category || "Book Category"}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
              {book.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium mb-6">
              by {book.author}
            </p>

            {/* Description */}
            <div className=" text-slate-300 mb-8 max-w-none">
              <p className="leading-relaxed">{book.description}</p>
            </div>

            {/* Statistics Grid */}
            

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="border border-gray-200 rounded-2xl p-5">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Added to Library By
                </h3>
                <p className="font-semibold text-gray-900 text-sm">mm</p>
                <p className="text-gray-500 text-xs">mg</p>
              </div>
              <div className=" border-gray-200 rounded-2xl p-5">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Inventory Status (Sync)
                </h3>
                <p className="font-semibold text-gray-900 text-sm">
                  {/* {availableCopies} Available / {totalCopies} Total */}
                </p>
                <p className="text-gray-500 text-xs">Cataloged on null</p>
              </div>
            </div>

            {/* Actions */}
            <Button
  className="w-full sm:w-auto px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-sm"
>
  Borrow Book
</Button>

<div className="bg-red-500 p-10">
  <h1 className="text-white text-4xl font-bold">
    Tailwind Color Test
  </h1>

  <p className="text-blue-500">
    This should be blue.
  </p>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}