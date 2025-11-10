export function AirlineBoardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8 text-center">
        <div className="mx-auto h-9 w-48 rounded-lg bg-gray-200 sm:h-10 sm:w-64" />
        <div className="mx-auto mt-2 h-4 w-80 rounded bg-gray-100 sm:w-96" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            {/* Logo Section */}
            <div className="flex items-center gap-4 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6">
              <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-gray-200" />
              <div className="flex-1">
                <div className="mb-2 h-5 w-32 rounded bg-gray-200" />
                <div className="flex items-center gap-2">
                  <div className="h-6 w-12 rounded-md bg-gray-200" />
                  <div className="h-5 w-14 rounded-md bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-2 p-6">
              {/* Website Skeleton */}
              <div className="flex items-start gap-3 rounded-lg p-3">
                <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-md bg-gray-100" />
                <div className="flex-1">
                  <div className="mb-1.5 h-3 w-16 rounded bg-gray-100" />
                  <div className="h-4 w-36 rounded bg-gray-200" />
                </div>
              </div>

              {/* Hotline Skeleton */}
              <div className="flex items-start gap-3 rounded-lg p-3">
                <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-md bg-gray-100" />
                <div className="flex-1">
                  <div className="mb-1.5 h-3 w-12 rounded bg-gray-100" />
                  <div className="h-4 w-28 rounded bg-gray-200" />
                </div>
              </div>

              {/* Contact Skeleton */}
              <div className="flex items-start gap-3 rounded-lg p-3">
                <div className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-md bg-gray-100" />
                <div className="flex-1">
                  <div className="mb-1.5 h-3 w-14 rounded bg-gray-100" />
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
