import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function BookDetailLoading() {
  return (
    <div className="min-h-[70vh] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center">
      <LoadingSpinner
        size="lg"
        message="Fetching book volume & loan status..."
      />
    </div>
  );
}
