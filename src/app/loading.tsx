import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function RootLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <LoadingSpinner
        size="lg"
        message="Entering BookNook Sanctuary..."
      />
    </div>
  );
}
