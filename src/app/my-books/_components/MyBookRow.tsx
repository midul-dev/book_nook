"use client";

import React from "react";
import Image from "next/image";
import { IBook } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DeleteBookDialog } from "./DeleteDialog";

interface MyBookRowProps {
  book: IBook;
}

export function MyBookRow({ book }: MyBookRowProps) {
 

  

  return (
    <div className="grid grid-cols-12 items-center px-6 py-4.5 hover:bg-muted/40 transition-colors">
      {/* 1. Cover & Title */}
      <div className="col-span-5 flex items-center gap-3.5 min-w-0 pr-4">
        {/* Modern 3D Spine Book Thumbnail */}
        <div className="relative shrink-0 w-11 h-14 rounded-md overflow-hidden shadow-md shadow-black/20 flex items-end p-1 select-none">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Title & One-line excerpt */}
        <div className="min-w-0 flex-1">
          <h3
            title={book.title}
            className="text-sm sm:text-base font-semibold text-foreground truncate tracking-tight"
          >
            {book.title}
          </h3>
          <p
            title={book.description}
            className="text-xs text-muted-foreground truncate mt-0.5"
          >
            {book.description}
          </p>
        </div>
      </div>

      {/* 2. Author */}
      <div className="col-span-2 min-w-0 pr-3">
        <span
          title={book.author}
          className="text-xs sm:text-sm font-medium text-foreground/80 truncate block"
        >
          {book.author}
        </span>
      </div>

      {/* 3. Category */}
      <div className="col-span-2">
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-[#eef7f2] text-[#1b6b47] dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/50">
          {book.category || "Unknown"}
        </span>
      </div>

      {/* 4. Copies */}
      <div className="col-span-1 text-center">
        <span className="text-xs sm:text-sm font-semibold text-foreground font-mono tracking-tight">
          {book.copies || "0"}
        </span>
      </div>

      {/* 5. Actions (Update & Delete) */}
      <div className="col-span-2 flex items-center justify-end gap-2">
        <button
          type="button"
          className="px-3.5 py-1 text-xs font-medium rounded-full bg-[#fef5e7] hover:bg-[#fbe8ce] text-[#9c530c] dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-300 transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          Edit
        </button>
        <div
          
          className="px-3.5 py-1 text-xs font-medium rounded-full bg-[#fef0f2] hover:bg-[#fde0e5] text-[#c0264b] dark:bg-rose-950/40 dark:hover:bg-rose-900/50 dark:text-rose-300 transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          <DeleteBookDialog book={book} />
        </div>
      </div>
    </div>
  );
}
