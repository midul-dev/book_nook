"use client";
import React from "react";
import Image from "next/image";
import { IBook } from "@/types";
import { DeleteBookDialog } from "./DeleteDialog";
import { EditBookDialog } from "./EditDailog";

interface MyBookRowProps {
  book: IBook;
}

export function MyBookRow({ book }: MyBookRowProps) {
  return (
    <>
      {/* 1. Desktop & Tablet Table View */}
      <div className="hidden md:grid grid-cols-12 items-center px-6 py-4 hover:bg-muted/40 transition-colors">
        {/* Cover & Title */}
        <div className="col-span-5 flex items-center gap-3.5 min-w-0 pr-4">
          <div className="relative shrink-0 w-11 h-14 rounded-md overflow-hidden shadow-md shadow-black/20 flex items-end p-1 select-none bg-muted">
            {book.image && (
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3
              title={book.title}
              className="text-sm font-semibold text-foreground truncate tracking-tight"
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

        {/* Author */}
        <div className="col-span-2 min-w-0 pr-3">
          <span
            title={book.author}
            className="text-xs sm:text-sm font-medium text-foreground/80 truncate block"
          >
            {book.author}
          </span>
        </div>

        {/* Category */}
        <div className="col-span-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#eef7f2] text-[#1b6b47] dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/50">
            {book.category || "Unknown"}
          </span>
        </div>

        {/* Copies */}
        <div className="col-span-1 text-center">
          <span className="text-xs sm:text-sm font-semibold text-foreground font-mono tracking-tight">
            {book.copies || "0"}
          </span>
        </div>

        {/* Actions (Update & Delete) */}
        <div className="col-span-2 flex items-center justify-end gap-2">
          <EditBookDialog book={book} />
          <DeleteBookDialog book={book} />
        </div>
      </div>

      {/* 2. Mobile Responsive Card View */}
      <div className="md:hidden p-4 flex flex-col gap-3 hover:bg-muted/30 transition-colors">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0 w-12 h-16 rounded-md overflow-hidden shadow-sm shadow-black/20 bg-muted select-none">
            {book.image && (
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#eef7f2] text-[#1b6b47] dark:bg-emerald-950/60 dark:text-emerald-300">
                {book.category || "Unknown"}
              </span>
              <span className="text-xs font-semibold text-foreground font-mono">
                {book.copies || "0"} copies
              </span>
            </div>

            <h3
              title={book.title}
              className="text-sm font-semibold text-foreground truncate mt-1.5"
            >
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              by {book.author}
            </p>
          </div>
        </div>

        {book.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {book.description}
          </p>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
          <EditBookDialog book={book} />
          <DeleteBookDialog book={book} />
        </div>
      </div>
    </>
  );
}
