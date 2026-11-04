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

                  <p className="text-sm text-white/70">{book.author}</p>
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
            <span className="font-semibold text-stone-800">{book.author}</span>
          </p>

          <p className="text-xs text-stone-400 mt-3">{catalogedDate}</p>

          {/* Divider */}
          <div className="mb-7 mt-2 h-px bg-stone-200" />

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
                {book.userName || "Unknown user"}
              </p>

              <p className="mt-1 text-xs text-stone-500">
                {book.userEmail || "Unknown email"}
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
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {/* ১. Borrow Button (flex-1 দিয়ে সমান করা হয়েছে) */}
            <div className="flex-1 flex">
              <BorrowBookDialog book={book} />
            </div>

            {/* ২. Explore Books Link (flex-1 দিয়ে সমান করা হয়েছে) */}
            <Link
              href="/all-books"
              className="flex-1 flex h-9 items-center justify-center rounded-xl border border-stone-200 px-6 text-sm font-semibold text-stone-700 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
            >
              Explore More
            </Link>
          </div>

          {/* Footer Note */}
          <p className="mt-5 text-center text-xs text-stone-400 sm:text-left">
            Discover more stories from your community library.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailCard;
