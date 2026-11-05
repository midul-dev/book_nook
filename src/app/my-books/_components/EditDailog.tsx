"use client";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { IBook } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { jwtAuthTokenClient } from "@/lib/functions/jwt_auth_tokens/jwtAuthTokenClient";

export function EditBookDialog({ book }: { book: IBook }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const updatedBook = Object.fromEntries(formData.entries());

    //  PATCH API
    const token = await jwtAuthTokenClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/update-book/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedBook),
        },
      );
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Network error! Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button  */}
      <DialogTrigger className="cursor-pointer px-3.5 py-1 text-xs font-medium rounded-full bg-[#fef5e7] hover:bg-[#fbe8ce] text-[#9c530c] dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-300 transition-all cursor-pointer shadow-2xs active:scale-95 flex">
        <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="sm:max-w-[500px] rounded-[1.5rem] p-6 border-0 shadow-2xl bg-white">
        <DialogHeader className="text-left space-y-0 pb-4 border-b border-border/60">
          {/* API Tag (Dark Green Text) */}
          <div className="text-[10px] font-bold text-[#164e38] tracking-widest uppercase mb-1">
            PATCH /BOOKS/:ID • PRE-FILLED FORM
          </div>
          {/* Title */}
          <DialogTitle className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Edit Book Information
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleEdit} className="pt-4 space-y-4">
          {/* Row 1: Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                Book Title *
              </label>
              <input
                type="text"
                name="title"
                defaultValue={book?.title || "The Glass Botanist"}
                required
                // ইমেজের মত Book Title-এ ফোকাসড/একটু মোটা বর্ডার দেওয়া হয়েছে
                className="w-full px-3 py-2.5 rounded-lg border-2 border-foreground bg-background text-sm font-medium text-foreground focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                Author Name *
              </label>
              <input
                type="text"
                name="author"
                defaultValue={book?.author || "Clara Vance"}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
              />
            </div>
          </div>

          {/* Row 2: Category & Copies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                Category *
              </label>
              <select
                name="category"
                defaultValue={book?.category || "Fiction"}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
              >
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                Available Copies *
              </label>
              <input
                type="number"
                name="copies"
                defaultValue={book?.copies || 3}
                required
                min="1"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
              />
            </div>
          </div>

          {/* Row 3: Image URL */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
              Book Image URL (Imgbb / Postimage) *
            </label>
            <input
              type="url"
              name="image"
              defaultValue={
                book?.image || "https://i.ibb.co/booknook/glass-botanist.png"
              }
              required
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
            />
          </div>

          {/* Row 4: Description */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
              Short Description *
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={
                book?.description ||
                "Set in a Victorian conservatory on the Scottish coast, a young archivist uncovers a century-old ledger of rare medicinal flora that transforms her coastal village."
              }
              required
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <DialogFooter className="pt-3 flex flex-row justify-end gap-2 w-full sm:space-x-0">
            <DialogClose className="h-10 px-5 border border-[#164e38] text-[#164e38] hover:bg-[#164e38]/5 rounded-xl text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center">
              Cancel
            </DialogClose>

            <button
              type="submit"
              disabled={isSaving}
              className="h-10 px-5 bg-[#164e38] hover:bg-[#123e2d] text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
