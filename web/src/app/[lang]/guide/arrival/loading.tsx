export default function ArrivalLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse">
      {/* Tab Navigation Skeleton */}
      <div className="mb-6 overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="divide-y divide-gray-200 md:flex md:divide-y-0">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="relative md:flex md:flex-1">
              <div className="flex items-center px-4 py-4">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="ml-3 h-4 w-24 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <div className="space-y-6">
          {/* Header with Icon */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-lg bg-gray-200" />
            </div>
            <div className="flex-1 space-y-4">
              {/* Title */}
              <div className="h-8 w-1/4 rounded bg-gray-200" />

              {/* Paragraphs */}
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-11/12 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-10/12 rounded bg-gray-200" />
              </div>

              {/* Alert Box Skeleton */}
              <div className="border-l-4 border-gray-300 bg-gray-100 p-4">
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-full rounded bg-gray-200" />
                  <div className="h-3 w-5/6 rounded bg-gray-200" />
                </div>
              </div>

              {/* Section with heading */}
              <div className="space-y-3 pt-4">
                <div className="h-6 w-1/3 rounded bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-11/12 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                </div>
              </div>

              {/* Grid Cards Skeleton */}
              <div className="grid gap-4 pt-4 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="space-y-3">
                      <div className="h-5 w-2/3 rounded bg-gray-200" />
                      <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-gray-200" />
                        <div className="h-3 w-5/6 rounded bg-gray-200" />
                        <div className="h-3 w-4/6 rounded bg-gray-200" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* List Items Skeleton */}
              <div className="space-y-2 pt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-gray-200" />
                    <div className="h-4 flex-1 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Services Skeleton */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6">
          <div className="mb-2 h-6 w-1/4 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4"
            >
              <div className="h-14 w-14 rounded-full bg-gray-200" />
              <div className="w-full space-y-2">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="mx-auto h-3 w-3/4 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
