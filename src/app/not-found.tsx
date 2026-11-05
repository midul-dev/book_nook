import Link from "next/link";
import { BookX, Home, Library, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-lg text-center mx-auto">
        {/* Visual Graphic */}
        <div className="relative mx-auto mb-8 w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-100/60 dark:bg-emerald-950/40 animate-pulse" />
          <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#164e38]/10 dark:bg-emerald-500/10 border border-[#164e38]/20 dark:border-emerald-500/20 shadow-inner">
            <BookX className="w-10 h-10 sm:w-12 sm:h-12 text-[#164e38] dark:text-emerald-400" strokeWidth={1.8} />
          </div>
          <div className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white shadow-md">
            <Compass className="w-4 h-4 animate-spin [animation-duration:8s]" />
          </div>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-widest uppercase bg-muted text-muted-foreground border border-border mb-4">
          <span>Error 404</span>
          <span>•</span>
          <span>Missing Chapter</span>
        </div>

        {/* Heading & Description */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
          The page or library catalog shelf you are looking for has been moved, archived, or never existed in this collection.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 h-11 bg-[#164e38] hover:bg-[#123e2d] text-white rounded-xl font-medium text-sm gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/all-books"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 h-11 border border-border hover:bg-muted text-foreground rounded-xl font-medium text-sm gap-2 transition cursor-pointer"
          >
            <Library className="w-4 h-4 text-[#164e38] dark:text-emerald-400" />
            <span>Browse All Books</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
