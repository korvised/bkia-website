export function NoticeDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl">
        {/* Back Button Skeleton */}
        <div className="mb-6 h-5 w-32 animate-pulse rounded-lg bg-gray-200" />

        {/* Main Card Skeleton */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Header Section */}
          <div className="border-l-8 border-l-gray-300 p-8 lg:p-10">
            <div className="mb-5 h-8 w-32 animate-pulse rounded-lg bg-gray-200" />
            <div className="mb-4 h-12 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="mb-2 h-6 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="mb-6 h-6 w-2/3 animate-pulse rounded-lg bg-gray-200" />

            <div className="border-t border-gray-200 pt-6">
              <div className="flex gap-6">
                <div className="h-16 w-40 animate-pulse rounded-lg bg-gray-200" />
                <div className="h-16 w-40 animate-pulse rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-4 p-8 lg:p-10">
            <div className="h-6 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-5/6 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
