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
import { IBook } from "@/types"; // তোমার টাইপ অনুযায়ী
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BorrowContext } from "@/context/BorrowContext";

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

  //  (Format: DD-MM-YYYY)
  const today = new Date();
  const borrowDateStr = `${String(today.getDate()).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}`;

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

    //  POST API
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowBooks),
      });
      const data = await res.json();
      if (res.ok) {
        setIsOpen(false);
        toast.success(data.message);
        setBorrowCount(borrowCount + 1);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      router.push("/my-borrows");
      setIsBorrowing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <DialogTrigger className="inline-flex items-center w-full justify-center rounded-md text-sm font-medium bg-[#164e38] text-white hover:bg-[#123e2d] h-9 px-4 py-2 transition-colors cursor-pointer shadow-sm">
        Borrow This Book
        <ArrowUpRight className="ml-2 h-4 w-4" />
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="sm:max-w-[425px] rounded-[1.5rem] p-6 border-0 shadow-2xl bg-white">
        <DialogHeader className="text-left space-y-0 pb-4 border-b border-border/60">
          {/* API Tag (Orange Text) */}
          <div className="text-[10px] font-bold text-amber-600 tracking-widest uppercase mb-1">
            POST /BORROWS • $INC: -1
          </div>
          {/* Title */}
          <DialogTitle className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Borrow This Book
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleBorrow} className="pt-4 space-y-5">
          {/* Book Info Card */}
          <div className="flex items-center gap-3.5 bg-[#fcfbf9] border border-border/60 rounded-xl p-3.5 shadow-sm">
            <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded bg-muted shadow-sm">
              <Image
                src={book?.image || "/placeholder-book.jpg"}
                alt={book?.title || "Book Cover"}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground leading-tight">
                {book?.title || "Letters from the Observatory"}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                by {book?.author || "Miriam Al-Mansoor"}
              </span>
              <span className="text-[11px] font-semibold text-[#164e38] mt-1">
                {book?.copies || 3} copies currently on shelf
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
                Borrower Name (Read-only)
              </label>
              <input
                type="text"
                name="userName"
                readOnly
                value={user?.name || "Unknown User"}
                className="w-full px-3 py-2.5 rounded-lg border border-border/80 bg-muted/30 text-sm text-foreground focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
                Borrower Email (Read-only)
              </label>
              <input
                type="email"
                name="userEmail"
                readOnly
                value={user?.email || "Unknown"}
                className="w-full px-3 py-2.5 rounded-lg border border-border/80 bg-muted/30 text-sm font-mono text-muted-foreground focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
                  Borrow Date
                </label>
                <input
                  type="text"
                  name="borrowDate"
                  readOnly
                  value={borrowDateStr}
                  className="w-full px-3 py-2.5 rounded-lg border border-border/80 bg-muted/30 text-sm text-foreground focus:outline-none cursor-not-allowed font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                  Return Date *
                </label>
                <input
                  type="date"
                  name="returnDate"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-[#164e38] transition-all font-mono"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <DialogFooter className="pt-2 flex flex-row justify-end gap-2 w-full sm:space-x-0">
            <DialogClose className="h-10 px-4 border border-[#164e38] text-[#164e38] hover:bg-[#164e38]/5 rounded-xl text-sm font-medium transition-colors cursor-pointer flex items-center justify-center">
              Cancel
            </DialogClose>

            <button
              type="submit"
              disabled={isBorrowing}
              className="h-10 px-4 bg-[#164e38] hover:bg-[#123e2d] text-white rounded-xl text-sm font-medium transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isBorrowing ? "Confirming..." : "Confirm Borrow"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
