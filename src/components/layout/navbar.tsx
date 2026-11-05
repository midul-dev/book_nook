"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import Image from "next/image";
import { BorrowContext } from "@/context/BorrowContext";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { borrowCount } = useContext(BorrowContext) as { borrowCount: number };

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    requestAnimationFrame(() => {
      setIsDarkMode(isDark);
    });
  }, []);

  const { data: session, isPending, error } = useSession();
  const user = session?.user;

  const toggleDarkMode = () => {
    const nextState = !isDarkMode;
    setIsDarkMode(nextState);
    if (nextState) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    toast.success("Signed out successfully!");
    setIsProfileOpen(false);
  };

  const publicRoute = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/all-books" },
  ];
  const privateRoute = [
    { name: "Add Book", href: "/add-books" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows", badge: borrowCount },
  ]

  const navItems = user ? [...publicRoute, ...privateRoute] : publicRoute

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 shrink-0"
        >
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-950/20 group-hover:bg-emerald-700 transition-colors">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-foreground leading-none">
              BookNook
            </span>
            <span className="hidden min-[360px]:inline-block text-[9px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mt-0.5">
              Community Library
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5 p-1 rounded-full bg-muted/70 border border-border/80">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-2.5 lg:px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                <span>{item.name}</span>
                {item.badge !== undefined && (
                  <span
                    className={`inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full transition-transform ${
                      borrowCount > 0
                        ? "bg-amber-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Tools (Theme Toggle, Profile, Quick Actions) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Dark Mode Switcher */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle color theme"
            className="h-8 w-8 rounded-full flex items-center justify-center border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-all shadow-2xs cursor-pointer shrink-0"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Sign In & Sign Up Buttons & User Profile Pill */}
          {isPending ? (
            <div className="relative">
              <div className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border border-border bg-card">
                {/* Avatar Circle Skeleton */}
                <Skeleton className="h-6 w-6 rounded-full shrink-0" />

                {/* User Name Text Skeleton (Hidden on mobile just like the real text) */}
                <Skeleton className="hidden sm:block h-3 w-20 rounded-md" />

                {/* Chevron Icon Skeleton */}
                <Skeleton className="h-3 w-3 rounded-sm shrink-0" />
              </div>
            </div>
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1.5 sm:gap-2 pl-1 sm:pl-1.5 pr-2 sm:pr-2.5 py-1 rounded-full border border-border bg-card hover:bg-muted/80 transition-all text-xs font-medium cursor-pointer"
              >
                <div className="h-6 w-6 rounded-full bg-[#1b2533] text-white flex items-center justify-center text-[10px] font-bold ring-1 ring-border shrink-0">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "Profile"}
                      height={24}
                      width={24}
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <span>{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
                  )}
                </div>
                <span className="hidden sm:inline-block text-foreground font-medium text-xs max-w-[100px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-card border border-border shadow-xl p-2 text-xs z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-border/80 mb-1">
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <Link
                      href="/user-profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted text-left text-foreground transition"
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-amber-500" />
                        Profile
                      </span>
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-left text-foreground transition cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-emerald-600 " />
                      Signout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-2 sm:px-2.5 text-xs font-medium border-border hover:bg-muted text-foreground cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="h-8 px-2.5 sm:px-3 text-xs font-medium bg-[#164e38] hover:bg-[#123e2d] text-white rounded-lg cursor-pointer"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden h-8 w-8 rounded-lg flex items-center justify-center border border-border text-foreground hover:bg-muted cursor-pointer shrink-0"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pt-3 pb-5 space-y-1.5 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span>{item.name}</span>
                {item.badge !== undefined && (
                  <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Mobile Drawer User / Auth shortcuts */}
          {user && (
            <div className="pt-2 mt-2 border-t border-border flex flex-col gap-1">
              <Link
                href="/user-profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <User className="w-4 h-4 text-amber-500" />
                <span>My Profile ({user.name})</span>
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
