"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BorrowContext } from "@/context/BorrowContext";
import { jwtAuthTokenClient } from "@/lib/functions/jwt_auth_tokens/jwtAuthTokenClient";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";

export interface IBorrowItem {
  _id: string;
  bookId?: string;
  title: string;
  author: string;
  category: string;
  image?: string;
  description?: string;
  borrowDate?: string;
  returnDate?: string;
  copies?: string;
}

export function ReturnBookDialog({ book }: { book: IBorrowItem }) {
  const { borrowCount, setBorrowCount } = useContext(BorrowContext) as {
    borrowCount: number;
    setBorrowCount: (count: number) => void;
  };
  const [isReturning, setIsReturning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleReturnBook = async (borrowId: string, bookId?: string) => {
    setIsReturning(true);
    const token = await jwtAuthTokenClient();
    try {
      // First try /return-book endpoint, if not available try delete-borrow
      const res = await fetch(
        `${process.env.SERVER_URL}/return-book/${borrowId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId }),
        },
      );
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Book returned successfully!");
        setIsOpen(false);
        router.refresh();
        setBorrowCount(borrowCount - 1);
      } else {
        toast.error(data.error || "Failed to return book");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="cursor-pointer">Return</DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-[2rem] p-6 sm:p-10 border-0 shadow-2xl bg-card">
        <div className="flex flex-col items-center justify-center">
          {/* Rotate / Return Icon */}
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950/50">
            <RotateCcw
              className="h-7 w-7 text-amber-700 dark:text-amber-400"
              strokeWidth={2.5}
            />
          </div>

          <DialogHeader className="flex flex-col items-center space-y-3 text-center">
            <DialogTitle className="font-serif text-2xl font-bold tracking-tight text-foreground">
              Return Book to Library?
            </DialogTitle>

            <div className="text-[15px] font-semibold text-[#8a4b08] dark:text-amber-400">
              {`${book.title} by ${book.author}`}
            </div>

            <p className="text-xs text-muted-foreground max-w-xs text-center">
              Returning this volume will restore copy availability on the
              community shelf and complete your loan record.
            </p>
          </DialogHeader>
        </div>

        <DialogFooter className="mt-8 flex-col sm:flex-row sm:justify-center gap-3 sm:gap-4 w-full">
          <DialogClose
            render={
              <Button
                variant="outline"
                className="w-full sm:w-36 h-11 border-[#164e38] text-[#164e38] hover:bg-[#164e38]/10 hover:text-[#164e38] rounded-xl font-medium cursor-pointer"
              >
                Keep Reading
              </Button>
            }
          />

          <Button
            type="button"
            disabled={isReturning}
            onClick={() => handleReturnBook(book._id, book.bookId)}
            className="w-full sm:w-36 h-11 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium cursor-pointer"
          >
            {isReturning ? "Returning..." : "Yes, Return"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
