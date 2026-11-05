import { IBook } from "@/types";
import { BookOpen, Package, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BorrowBookDialog } from "./BorrowBookDialog";

const DetailCard = async ({
  book,
  totalCopies,
}: {
  book: IBook;
  totalCopies: number;
}) => {
  const catalogedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently Added";

  return (
    <section className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card shadow-sm">
      <div className="grid md:grid-cols-[0.85fr_1.15fr]">
        {/* Book Cover Section */}
        <div className="flex items-center justify-center bg-muted/40 p-6 sm:p-10 lg:p-14">
          <div className="group relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[290px]">
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

                  <p className="text-sm text-white/70">{book.author}</p>
                </div>
              )}
            </div>

            {/* Cover Caption */}
            <p className="relative mt-4 sm:mt-6 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              BookNook Collection
            </p>
          </div>
        </div>

        {/* Book Information */}
        <div className="flex flex-col justify-center p-4 sm:p-8 lg:p-12">
          {/* Category */}
          <div className="mb-4 sm:mb-5">
            <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-800 dark:text-emerald-300">
              {book.category || "Uncategorized"}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-2xl min-[400px]:text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[42px]">
            {book.title}
          </h1>

          {/* Author */}
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">
            Written by{" "}
            <span className="font-semibold text-foreground">{book.author}</span>
          </p>

          <p className="text-xs text-muted-foreground mt-2 sm:mt-3">{catalogedDate}</p>

          {/* Divider */}
          <div className="mb-6 sm:mb-7 mt-2 h-px bg-border" />

          {/* Description */}
          <div className="mb-6 sm:mb-8">
            <div className="mb-2.5 sm:mb-3 flex items-center gap-2">
              <BookOpen size={16} className="text-emerald-700 dark:text-emerald-400" />

              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">
                About This Book
              </h2>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed sm:leading-7 text-muted-foreground">
              {book.description ||
                "No description is available for this book yet."}
            </p>
          </div>

          {/* Statistics */}
          <div className="mb-6 sm:mb-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            {/* Uploader Information */}
            <div className="rounded-2xl border border-border bg-muted/40 p-4 sm:p-5 transition-colors hover:border-emerald-500/40">
              <div className="mb-3 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                <UserRound size={17} />
              </div>

              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Uploaded By
              </p>

              <p className="text-sm font-semibold text-foreground truncate">
                {book.userName || "Unknown user"}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground truncate">
                {book.userEmail || "Unknown email"}
              </p>
            </div>

            {/* Inventory Info */}
            <div className="rounded-2xl border border-border bg-muted/40 p-4 sm:p-5 transition-colors hover:border-emerald-500/40">
              <div className="mb-3 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                <Package size={17} />
              </div>

              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Total Copies
              </p>

              <p className="text-sm font-semibold text-foreground">
                {totalCopies} Copies
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex-1 flex">
              <BorrowBookDialog book={book} />
            </div>

            <Link
              href="/all-books"
              className="flex-1 flex h-11 sm:h-10 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
            >
              Explore More
            </Link>
          </div>

          {/* Footer Note */}
          <p className="mt-4 sm:mt-5 text-center text-xs text-muted-foreground sm:text-left">
            Discover more stories from your community library.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailCard;
