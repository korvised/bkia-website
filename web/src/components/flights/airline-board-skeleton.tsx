export function AirlineBoardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-6 text-center">
        <div className="mx-auto h-8 w-48 rounded bg-gray-200 sm:h-9 sm:w-64" />
        <div className="mx-auto mt-2 h-4 w-64 rounded bg-gray-200 sm:w-96" />
      </div>

      {/* Information Box Skeleton */}
      <div className="mb-6 rounded-lg bg-gray-100 p-4">
        <div className="h-4 w-full rounded bg-gray-200 sm:w-3/4" />
      </div>

      {/* Stats Bar Skeleton */}
      <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-6 w-12 rounded bg-gray-200" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            {/* Header */}
            <div className="bg-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-200" />
                <div className="flex-1">
                  <div className="mb-2 h-5 w-32 rounded bg-gray-200" />
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 p-6">
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <div className="h-5 w-5 rounded bg-gray-200" />
                <div className="flex-1">
                  <div className="mb-1.5 h-3 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <div className="h-5 w-5 rounded bg-gray-200" />
                <div className="flex-1">
                  <div className="mb-1.5 h-3 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </div>
              </div>
              <div className="mt-auto pt-3">
                <div className="h-6 w-16 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
