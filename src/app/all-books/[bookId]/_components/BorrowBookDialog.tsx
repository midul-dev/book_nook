"use client";
import { useContext, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IBook } from "@/types";
import Image from "next/image";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BorrowContext } from "@/context/BorrowContext";
import { jwtAuthTokenClient } from "@/lib/functions/jwt_auth_tokens/jwtAuthTokenClient";

export function BorrowBookDialog({ book }: { book: IBook }) {
  const router = useRouter();
  const { borrowCount, setBorrowCount } = useContext(BorrowContext) as {
    borrowCount: number;
    setBorrowCount: (count: number) => void;
  };

  const [isBorrowing, setIsBorrowing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  // Format: DD-MM-YYYY
  const today = new Date();
  const borrowDateStr = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;
  const todayDateInputStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const isOutOfStock = Number(book.copies) === 0 || book.copies === 0;

  const handleBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsBorrowing(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    const { _id, ...restBook } = book;
    const borrowBooks = {
      bookId: _id,
      ...restBook,
      ...userData,
    };

    // POST API
    const token = await jwtAuthTokenClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/add-borrow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(borrowBooks),
        },
      );
      const data = await res.json();
      if (res.ok) {
        setIsOpen(false);
        toast.success(data.message);
        setBorrowCount(borrowCount + 1);
        router.push("/my-borrows");
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <DialogTrigger className="inline-flex items-center w-full justify-center rounded-xl text-sm font-medium bg-[#164e38] text-white hover:bg-[#123e2d] h-11 sm:h-10 px-4 py-2 transition-all active:scale-[0.99] cursor-pointer shadow-sm">
        <span>Borrow This Book</span>
        <ArrowUpRight className="ml-2 h-4 w-4" />
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="w-[92vw] max-w-[460px] max-h-[90dvh] flex flex-col rounded-2xl sm:rounded-[1.75rem] p-4 sm:p-6 border border-border shadow-2xl bg-card overflow-hidden">
        <DialogHeader className="text-left space-y-1 pb-3 sm:pb-4 border-b border-border/60 shrink-0">
          <DialogTitle className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Borrow This Book
          </DialogTitle>
          <p className="text-xs text-muted-foreground">
            Confirm your loan details to reserve this volume from circulation.
          </p>
        </DialogHeader>

        <form
          onSubmit={handleBorrow}
          className="flex flex-col flex-1 overflow-hidden pt-3 sm:pt-4"
        >
          <div className="flex-1 overflow-y-auto space-y-3.5 sm:space-y-4 pr-1">
            {/* Book Info Card */}
            <div className="flex items-center gap-3.5 bg-muted/40 border border-border/60 rounded-xl p-3 sm:p-3.5 shadow-xs">
              <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md bg-muted shadow-sm">
                <Image
                  src={book?.image || "/placeholder-book.jpg"}
                  alt={book?.title || "Book Cover"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-bold text-foreground leading-tight truncate">
                  {book?.title || "Letters from the Observatory"}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5 truncate">
                  by {book?.author || "Miriam Al-Mansoor"}
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 mt-1">
                  {book?.copies || 0} copies currently on shelf
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 sm:space-y-3.5">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-wider text-muted-foreground block">
                  Borrower Name (Read-only)
                </label>
                <input
                  type="text"
                  name="userName"
                  readOnly
                  value={user?.name || "Unknown User"}
                  className="w-full min-w-0 px-3.5 py-2 sm:py-2.5 rounded-xl border border-border/80 bg-muted/40 text-base sm:text-sm text-foreground focus:outline-none cursor-not-allowed select-none"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-wider text-muted-foreground block">
                  Borrower Email (Read-only)
                </label>
                <input
                  type="email"
                  name="userEmail"
                  readOnly
                  value={user?.email || "Unknown"}
                  className="w-full min-w-0 px-3.5 py-2 sm:py-2.5 rounded-xl border border-border/80 bg-muted/40 text-base sm:text-sm font-mono text-muted-foreground focus:outline-none cursor-not-allowed select-none"
                />
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5 min-w-0">
                  <label className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-wider text-muted-foreground flex items-center justify-between">
                    <span>Borrow Date</span>
                    <span className="text-[10px] lowercase text-muted-foreground/80 font-normal">
                      (today)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="borrowDate"
                    readOnly
                    value={borrowDateStr}
                    className="w-full min-w-0 px-3.5 py-2 sm:py-2.5 rounded-xl border border-border/80 bg-muted/40 text-base sm:text-sm text-foreground focus:outline-none cursor-not-allowed font-mono select-none"
                  />
                </div>

                <div className="space-y-1.5 min-w-0">
                  <label className="text-[10px] sm:text-[11px] uppercase font-semibold tracking-wider text-foreground block">
                    Return Date *
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    required
                    min={todayDateInputStr}
                    className="w-full min-w-0 max-w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-border bg-background text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#164e38]/30 transition-all font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <DialogFooter className="mt-4 pt-3.5 border-t border-border/60 bg-transparent mx-0 mb-0 p-0 shrink-0 flex flex-row items-center justify-end gap-2.5 sm:gap-3 w-full">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 sm:flex-none sm:w-28 h-11 sm:h-10 border-border text-foreground hover:bg-muted rounded-xl text-sm font-medium transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={isOutOfStock || isBorrowing}
              className={`flex-[1.4] sm:flex-none sm:w-36 h-11 sm:h-10 rounded-xl text-sm font-medium transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 ${
                isOutOfStock
                  ? "bg-muted text-muted-foreground border border-border cursor-not-allowed opacity-70"
                  : "bg-[#164e38] hover:bg-[#123e2d] text-white disabled:opacity-70 disabled:cursor-not-allowed"
              }`}
            >
              {isBorrowing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Borrowing...</span>
                </>
              ) : isOutOfStock ? (
                <span>Out of Stock</span>
              ) : (
                <span>Confirm Borrow</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
