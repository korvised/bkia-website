export function FlightBoardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Title Skeleton */}
      <div className="mb-6 text-center">
        <div className="mx-auto h-8 w-64 rounded bg-gray-200" />
      </div>

      {/* Information Box Skeleton */}
      <div className="mb-6 rounded-lg bg-gray-100 p-4">
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-4/6 rounded bg-gray-200" />
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

      {/* Table Skeleton */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
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
              <div className="h-4 w-32 rounded bg-gray-200" />
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
                <div className="h-6 w-24 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
