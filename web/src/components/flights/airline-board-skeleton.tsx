export function AirlineBoardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl bg-white p-5">
            {/* Header: logo + name + code */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="h-5 w-12 rounded-full bg-gray-200" />
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-100" />

            {/* Contact rows */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="h-4 w-4 rounded bg-gray-200" />
                <div className="h-4 w-40 rounded bg-gray-200" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-4 w-4 rounded bg-gray-200" />
                <div className="h-4 w-28 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
