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
      <DialogTrigger className="cursor-pointer px-3 py-1 text-xs font-medium rounded-full bg-[#fef5e7] hover:bg-[#fbe8ce] text-[#9c530c] dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-300 transition-all shadow-2xs active:scale-95 flex items-center shrink-0">
        <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="w-[94vw] max-w-[480px] sm:max-w-[500px] rounded-2xl sm:rounded-[1.5rem] p-4 sm:p-6 border border-border shadow-2xl bg-card max-h-[88dvh] flex flex-col my-auto">
        <DialogHeader className="text-left space-y-0 pb-2.5 sm:pb-3 border-b border-border/60 shrink-0">
          {/* API Tag (Dark Green Text) */}
          <div className="text-[10px] font-bold text-[#164e38] dark:text-emerald-400 tracking-widest uppercase mb-0.5">
            PATCH /BOOKS/:ID • PRE-FILLED FORM
          </div>
          {/* Title */}
          <DialogTitle className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-foreground">
            Edit Book Information
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleEdit} className="pt-2 sm:pt-3 flex flex-col flex-1 overflow-hidden space-y-3 sm:space-y-3.5">
          <div className="space-y-3 sm:space-y-3.5 overflow-y-auto flex-1 pr-1 -mr-1">
            {/* Row 1: Title & Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                  Book Title *
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={book?.title || "The Glass Botanist"}
                  required
                  className="w-full px-3 py-1.5 sm:py-2 rounded-lg border-2 border-foreground bg-background text-sm font-medium text-foreground focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                  Author Name *
                </label>
                <input
                  type="text"
                  name="author"
                  defaultValue={book?.author || "Clara Vance"}
                  required
                  className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
                />
              </div>
            </div>

            {/* Row 2: Category & Copies (2 columns for compact efficiency) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                  Category *
                </label>
                <select
                  name="category"
                  defaultValue={book?.category || "Fiction"}
                  required
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Kids">Kids</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                  Available Copies *
                </label>
                <input
                  type="number"
                  name="copies"
                  defaultValue={book?.copies || 3}
                  required
                  min="1"
                  className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
                />
              </div>
            </div>

            {/* Row 3: Image URL */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                Book Image URL *
              </label>
              <input
                type="url"
                name="image"
                defaultValue={
                  book?.image || "https://i.ibb.co/booknook/glass-botanist.png"
                }
                required
                className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
              />
            </div>

            {/* Row 4: Description */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-foreground">
                Short Description *
              </label>
              <textarea
                name="description"
                rows={2}
                defaultValue={
                  book?.description ||
                  "Set in a Victorian conservatory on the Scottish coast, a young archivist uncovers a century-old ledger of rare medicinal flora that transforms her coastal village."
                }
                required
                className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground transition-all resize-none"
              />
            </div>
          </div>

          {/* Action Buttons: side by side, clean layout */}
          <DialogFooter className="pt-2 sm:pt-2.5 pb-0 border-t border-border/60 bg-transparent mx-0 mb-0 p-0 flex flex-row justify-end gap-2 w-full shrink-0">
            <DialogClose className="flex-1 sm:flex-initial h-9 sm:h-10 px-4 border border-[#164e38] text-[#164e38] dark:border-emerald-500/40 dark:text-emerald-300 hover:bg-[#164e38]/5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center">
              Cancel
            </DialogClose>

            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 sm:flex-initial h-9 sm:h-10 px-4 sm:px-5 bg-[#164e38] hover:bg-[#123e2d] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
