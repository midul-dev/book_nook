"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IBook } from "@/types";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteBookDialog({book} : {book:IBook}) {
    const [isDeleting, setISDeleting] = useState(false)

     const router = useRouter();

    const handleDeletemyBooks = async (bookId: string) => {
        setISDeleting(true)
        const res = await fetch(`http://localhost:5000/delete-book/${bookId}`, {
          method: "DELETE",
        });
        const data = await res.json();
    
        if (res.ok) {
          toast.success(data.message);
        } else {
          toast.error(data.error);
        }
        router.refresh();
        setISDeleting(false)
      };

  return (
    <Dialog>
      <DialogTrigger className='cursor-pointer'>Delete</DialogTrigger>

      {/* Modal Content - ইমেজের মতো রাউন্ডেড এবং প্যাডিং দেওয়া হয়েছে */}
      <DialogContent className="sm:max-w-md rounded-[2rem] p-6 sm:p-10 border-0 shadow-2xl">
        <div className="flex flex-col items-center justify-center">
          {/* Trash Icon */}
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100">
            <Trash2 className="h-7 w-7 text-rose-600" strokeWidth={2.5} />
          </div>

          <DialogHeader className="flex flex-col items-center space-y-3 text-center">
            {/* Title */}
            <DialogTitle className="font-serif text-2xl font-bold tracking-tight text-foreground">
              Remove Book from Library?
            </DialogTitle>

            {/* Book Name */}
            <div className="text-[15px] font-semibold text-[#c0264b]">
              {`${book.title} by ${book.author}`}
            </div>

          </DialogHeader>
        </div>

        {/* Action Buttons */}
        <DialogFooter className="mt-8 flex-col sm:flex-row sm:justify-center gap-3 sm:gap-4 w-full">
          <DialogClose
            render={
              <Button
                variant="outline"
                className="w-full sm:w-36 h-11 border-[#164e38] text-[#164e38] hover:bg-[#164e38]/10 hover:text-[#164e38] rounded-xl font-medium cursor-pointer"
              >
                Keep Book
              </Button>
            }
          />

          <Button
            type="button"
            disabled={isDeleting}
            onClick={() => handleDeletemyBooks(book._id)}
            className="w-full sm:w-36 h-11 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-xl font-medium cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
