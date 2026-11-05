import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import BorrowProvider from "@/context/BorrowContext";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "BookNook | Community Library - Explore Curated Books",
  description:
    "A neighborhood online library built around a simple community promise: add a book from your shelf, borrow a book for a few days, and return it for the next reader.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${openSans.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${openSans.className} min-h-screen flex flex-col bg-background text-foreground selection:bg-amber-200 selection:text-amber-950 overflow-x-hidden`}
      >
        <BorrowProvider>
          <Navbar />
          <main className="flex-1 flex flex-col w-full">{children}</main>
          <Footer />
          <Toaster position="top-center" />
        </BorrowProvider>
      </body>
    </html>
  );
}
