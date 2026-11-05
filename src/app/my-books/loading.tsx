import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function MyBooksLoading() {
  return (
    <div className="min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col items-center justify-center">
      <LoadingSpinner
        size="lg"
        message="Loading your contributed books..."
      />
    </div>
  );
}
