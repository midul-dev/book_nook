"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Check,
  X,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Calendar,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { updateUser, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { toast } from "sonner";

export default function UserProfilePage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // শুধু UI টগল করার জন্য স্টেট
  const [isEditingName, setIsEditingName] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit
  const handleStartEdit = () => {
    setIsEditingName(true);
  };

  // Edit
  const handleCancelEdit = () => {
    setIsEditingName(false);
  };

  // Update
  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const newData = Object.fromEntries(formData.entries());

    await updateUser({
      image: newData.image as string,
      name: newData.name as string,
    });
    setIsEditingName(false);
    setIsSubmitting(false);
    toast.success("Profile updated successfully!");
  };

  //   First Letter
  const initials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : "U";

  //   Join Date
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Recent Reader";

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-background text-foreground transition-colors py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Shelf</span>
          </Link>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground text-xs font-mono"
          >
            Account Settings
          </Badge>
        </div>

        {/* Loading Skeleton */}
        {isPending ? (
          <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shrink-0" />
              <div className="space-y-3 w-full text-center sm:text-left">
                <Skeleton className="h-7 w-48 mx-auto sm:mx-0 rounded-lg" />
                <Skeleton className="h-4 w-64 mx-auto sm:mx-0 rounded-md" />
                <div className="flex gap-2 justify-center sm:justify-start pt-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-border space-y-4">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        ) : !user ? (
          /* Unauthenticated State */
          <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-4 sm:space-y-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-muted mx-auto flex items-center justify-center text-muted-foreground">
              <User className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold font-serif text-foreground">
                You are not signed in
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                Please sign in to view and customize your library member
                profile.
              </p>
            </div>
            <div>
              <Link href="/sign-in">
                <Button className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl px-6 h-10">
                  Sign In to BookNook
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Profile Card */
          <div className="bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm transition-all">
            {/* Top Decorative Banner */}
            <div className="h-28 sm:h-36 md:h-40 bg-gradient-to-tr from-emerald-900 via-emerald-800 to-slate-900 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

              <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/30 backdrop-blur-md text-emerald-100 text-[10px] sm:text-[11px] font-medium border border-white/10 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Member Profile</span>
              </div>
            </div>

            {/* Profile Content Body */}
            <div className="px-4 sm:px-8 md:px-10 pb-6 sm:pb-8 pt-0 relative">
              {/* Profile Picture & Main Identity Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="relative -mt-12 sm:-mt-16 md:-mt-20 z-10 shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full ring-4 sm:ring-[6px] ring-card bg-emerald-950 text-white shadow-xl flex items-center justify-center overflow-hidden select-none">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User Avatar"}
                        className="w-full h-full object-cover"
                        width={128}
                        height={128}
                      />
                    ) : (
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif tracking-wider text-emerald-100">
                        {initials}
                      </span>
                    )}
                  </div>
                  <div
                    title="Active Library Member"
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-full border-2 sm:border-[3px] border-card shadow-sm"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0 pb-1 sm:pb-3">
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-foreground tracking-tight">
                      {user.name}
                    </h1>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                      Active Reader
                    </Badge>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm text-muted-foreground font-medium">
                    <Mail className="w-3.5 h-3.5 opacity-70 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Edit Section */}
              <div className="pt-5 sm:pt-6 border-t border-border">
                <div className="space-y-4">
                  {/* Header & Edit Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Profile Info
                      </h2>
                      <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                        This info is visible to community members on your books
                        and borrows.
                      </p>
                    </div>

                    {!isEditingName && (
                      <button
                        onClick={handleStartEdit}
                        className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {/* Conditional Rendering: Form vs Saved State */}
                  {isEditingName ? (
                    <form
                      onSubmit={handleUpdateName}
                      className="p-3.5 sm:p-4 rounded-2xl bg-muted/40 border border-border space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-top-1"
                    >
                      <div className="space-y-3 sm:space-y-4">
                        {/* Display Name Input */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="nameInput"
                            className="text-[11px] sm:text-xs font-medium text-foreground block"
                          >
                            New Display Name
                          </label>
                          <div className="relative">
                            <Input
                              id="nameInput"
                              name="name"
                              type="text"
                              defaultValue={user.name}
                              placeholder="Enter your full name"
                              className="h-10 px-3 text-base sm:text-sm rounded-xl bg-background border-border focus-visible:ring-emerald-500"
                              disabled={isSubmitting}
                              autoFocus
                              required
                            />
                          </div>
                        </div>

                        {/* Profile Image URL Input */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="imageInput"
                            className="text-[11px] sm:text-xs font-medium text-foreground block"
                          >
                            Profile Image URL
                          </label>
                          <div className="relative">
                            <Input
                              id="imageInput"
                              name="image"
                              type="url"
                              defaultValue={user.image || ""}
                              placeholder="https://example.com/avatar.jpg"
                              className="h-10 px-3 text-base sm:text-sm rounded-xl bg-background border-border focus-visible:ring-emerald-500"
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleCancelEdit}
                          disabled={isSubmitting}
                          className="h-9 px-3.5 rounded-xl text-xs hover:bg-muted"
                        >
                          <X className="w-3.5 h-3.5 mr-1" />
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-9 px-4 rounded-xl text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-medium"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5 mr-1.5" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/40 border border-border text-sm">
                      <span className="font-medium text-foreground truncate mr-2">
                        {user.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono shrink-0">
                        Saved
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Extra Account Details */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-muted/30 border border-border/80 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                      Member Since
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                      {memberSince}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-muted/30 border border-border/80 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                      Account Status
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                      Active Community Reader
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
