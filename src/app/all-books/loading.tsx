import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AllBooksLoading() {
  return (
    <div className="min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
      <LoadingSpinner
        size="lg"
        message="Loading library catalog & inventory..."
      />
    </div>
  );
}
