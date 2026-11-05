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
import { jwtAuthTokenClient } from "@/lib/functions/jwt_auth_tokens/jwtAuthTokenClient";
import { IBook } from "@/types";
import { Trash, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteBookDialog({ book }: { book: IBook }) {
  const [isDeleting, setISDeleting] = useState(false);

  const router = useRouter();

  const handleDeletemyBooks = async (bookId: string) => {
    setISDeleting(true);

    const token = await jwtAuthTokenClient();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/delete-book/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
    router.refresh();
    setISDeleting(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer px-3 py-1 text-xs font-medium rounded-full bg-[#fef0f2] hover:bg-[#fde0e5] text-[#c0264b] dark:bg-rose-950/40 dark:hover:bg-rose-900/50 dark:text-rose-300 transition-all shadow-2xs active:scale-95 flex items-center shrink-0">
        <Trash className="mr-1.5 h-3.5 w-3.5" /> Delete
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="w-[92vw] sm:max-w-md rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 border border-border shadow-2xl bg-card">
        <div className="flex flex-col items-center justify-center text-center w-full">
          {/* Trash Icon */}
          <div className="mb-4 sm:mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-950/50 mx-auto">
            <Trash2 className="h-6 w-6 sm:h-7 sm:w-7 text-rose-600 dark:text-rose-400" strokeWidth={2.5} />
          </div>

          <DialogHeader className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center w-full">
            {/* Title */}
            <DialogTitle className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground text-center">
              Remove Book from Library?
            </DialogTitle>

            {/* Book Name */}
            <div className="text-sm sm:text-[15px] font-semibold text-[#c0264b] dark:text-rose-400 text-center max-w-sm mx-auto">
              {`${book.title} by ${book.author}`}
            </div>
          </DialogHeader>
        </div>

        {/* Action Buttons */}
        <DialogFooter className="mt-5 sm:mt-8 pt-0 border-0 bg-transparent mx-0 mb-0 p-0 flex flex-col sm:flex-row justify-center sm:justify-center items-center gap-2.5 sm:gap-4 w-full">
          <DialogClose
            render={
              <Button
                variant="outline"
                className="w-full sm:w-36 h-10 sm:h-11 border-[#164e38] text-[#164e38] dark:border-emerald-500/40 dark:text-emerald-300 hover:bg-[#164e38]/10 rounded-xl font-medium cursor-pointer"
              >
                Keep Book
              </Button>
            }
          />

          <Button
            type="button"
            disabled={isDeleting}
            onClick={() => handleDeletemyBooks(book._id)}
            className="w-full sm:w-36 h-10 sm:h-11 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-xl font-medium cursor-pointer flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Yes, Delete</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
