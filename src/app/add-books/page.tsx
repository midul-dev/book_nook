"use client";
import React, { useState } from "react";
import { BookCategory } from "@/types";
import { PlusCircle, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

export default function AddBooksPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const newBook = Object.fromEntries(formData.entries()) as {
      title: string;
      author: string;
      category: BookCategory;
      copies: string;
      description: string;
      image: string;
      userName: string;
      userEmail: string;
    };
    console.log(newBook);

    try {
      const res = await fetch("http://localhost:5000/add-books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error submitting book:", error);
      toast.error(
        "An error occurred while submitting the book. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home Shelf</span>
        </Link>
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          {isSubmitted ? (
            <div className="py-8 px-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center space-y-3 animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-emerald-900 dark:text-emerald-200">
                Book Cataloged Successfully!
              </h3>
              <p className="text-sm text-emerald-800/80 dark:text-emerald-300/80 max-w-md mx-auto">
                Your book has been added to the community library. Readers can
                now discover and borrow it. Thank you for contributing to our
                shared literary space!
              </p>
              <p className="text-sm text-emerald-800/80 dark:text-emerald-300/80 max-w-md mx-auto">
                You can add another book or view it in the All Books section.
              </p>
              <div className="pt-4 flex items-center justify-center gap-3">
                <Button
                  className="border border-[#164e38] text-black bg-white hover:bg-[#123e2d] hover:text-white"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                >
                  <span>Add Another Book</span> <PlusCircle />
                </Button>
                <Link href="/my-books">
                  <Button
                    size="sm"
                    className="bg-[#164e38] hover:bg-[#123e2d] text-white"
                  >
                    View in My Books →
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                  Contribute a Book to BookNook
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Add a hardcover or paperback from your collection. Readers
                  will be able to discover and borrow it with atomic inventory
                  synchronization.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-foreground mb-1.5 uppercase">
                      User Name
                    </label>
                    <input
                      type="text"
                      name="userName"
                      value={user?.name || ""}
                      readOnly
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 text-sm text-muted-foreground focus:outline-none cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-foreground mb-1.5 uppercase">
                      User Email
                    </label>
                    <input
                      type="email"
                      name="userEmail"
                      value={user?.email || ""}
                      readOnly
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/50 text-sm text-muted-foreground focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-1.5 uppercase">
                    Book Title *
                  </label>
                  <input
                    type="text"
                    required
                    name="title"
                    placeholder="e.g. Harry Potter"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-foreground mb-1.5 uppercase">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="author"
                      placeholder="e.g. J. K. Rowling"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-foreground mb-1.5 uppercase">
                      Category *
                    </label>
                    <select
                      name="category"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    >
                      <option value="Science">Science</option>
                      <option value="History">History</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Kids">Kids</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-foreground mb-1.5 uppercase">
                    Available Copies for Borrowing *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="30"
                    name="copies"
                    placeholder="e.g. 3"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-1.5 uppercase">
                    Image Url / Cover Art *
                  </label>
                  <input
                    type="url"
                    required
                    name="image"
                    placeholder="e.g. https://example.com/cover.jpg"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs text-foreground mb-1.5 uppercase">
                    Synopsis / Overview
                  </label>
                  <textarea
                    rows={4}
                    name="description"
                    placeholder="Share a short teaser or context for future readers..."
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className={
                    loading
                      ? "w-full h-11 bg-[#164e38] hover:bg-[#123e2d] text-white font-medium text-sm rounded-xl gap-2 shadow-md cursor-pointer"
                      : "w-full h-11 bg-[#164e38] hover:bg-[#123e2d] text-white font-medium text-sm rounded-xl gap-2 shadow-md cursor-pointer"
                  }
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {loading
                      ? "Publishing..."
                      : "Publish Book to Library Shelf"}
                  </span>
                </Button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
