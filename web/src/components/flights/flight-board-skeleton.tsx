export function FlightBoardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Title Skeleton */}
      <div className="mb-6 text-center">
        <div className="mx-auto h-8 w-64 rounded bg-gray-200 sm:h-9 sm:w-80" />
      </div>

      {/* Information Box Skeleton */}
      <div className="mb-6 rounded-lg bg-gray-100 p-4">
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
            <div className="h-4 w-full rounded bg-gray-200" />
          </div>
          <div className="flex gap-2">
            <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
          <div className="flex gap-2">
            <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
            <div className="h-4 w-4/6 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Filter Section Skeleton */}
      <div className="mb-6 flex flex-wrap items-end gap-3">
        <div className="h-10 w-32 rounded-lg bg-gray-200" />
        <div className="h-10 w-40 rounded-lg bg-gray-200" />
        <div className="h-10 w-24 rounded-lg bg-gray-200" />
        <div className="h-10 w-24 rounded-lg bg-gray-200" />
        <div className="h-10 w-40 rounded-lg bg-gray-200" />
        <div className="h-10 w-40 rounded-lg bg-gray-200" />
        <div className="h-10 min-w-[200px] flex-1 rounded-lg bg-gray-200" />
        <div className="h-10 w-24 rounded-lg bg-gray-200" />
      </div>

      {/* Action Bar Skeleton */}
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="h-4 w-48 rounded bg-gray-200" />
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-gray-200" />
        </div>
      </div>

      {/* Desktop Table Skeleton - Hidden on mobile */}
      <div className="hidden overflow-x-auto rounded-lg border border-gray-200 lg:block">
        <div className="min-w-full">
          {/* Header */}
          <div className="bg-gray-100 px-4 py-3">
            <div className="flex gap-4">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-4 w-40 rounded bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-4 w-16 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>
          </div>

          {/* Rows */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-t border-gray-200 px-4 py-4">
              <div className="flex gap-4">
                <div className="h-6 w-16 rounded bg-gray-200" />
                <div className="h-6 w-32 rounded bg-gray-200" />
                <div className="h-6 w-40 rounded bg-gray-200" />
                <div className="h-6 w-12 rounded bg-gray-200" />
                <div className="h-6 w-24 rounded bg-gray-200" />
                <div className="h-6 w-12 rounded bg-gray-200" />
                <div className="h-6 w-20 rounded bg-gray-200" />
                <div className="h-6 w-16 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cards Skeleton - Visible only on mobile */}
      <div className="space-y-4 lg:hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            {/* Header */}
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gray-200" />
                <div className="flex flex-col gap-1.5">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-3 w-32 rounded bg-gray-200" />
                </div>
              </div>
              <div className="h-6 w-20 rounded-full bg-gray-200" />
            </div>

            {/* Time Section */}
            <div className="mb-3 h-16 rounded-lg bg-gray-100" />

            {/* Route Section */}
            <div className="mb-3 h-14 rounded-lg border border-gray-200" />

            {/* Bottom Section */}
            <div className="flex items-center gap-3">
              <div className="h-14 w-20 rounded-md border border-gray-200 bg-gray-100" />
              <div className="h-14 w-20 rounded-md border border-gray-200 bg-gray-100" />
              <div className="h-14 flex-1 rounded-md border border-gray-200 bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
