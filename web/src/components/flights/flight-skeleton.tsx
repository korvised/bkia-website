import { Plane } from "lucide-react";

export function FlightSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Plane className="text-primary-600 h-8 w-8" />
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      {/* Search Section Skeleton */}
      <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />

      {/* Tabs Skeleton */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="pb-2">
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden bg-white">
        {/* Table Header */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
          <div className="grid grid-cols-9 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-gray-300" />
            ))}
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="px-6 py-4">
              <div className="grid grid-cols-9 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
                  <div key={col} className="space-y-2">
                    <div
                      className="h-4 animate-pulse rounded bg-gray-200"
                      style={{
                        animationDelay: `${row * col * 50}ms`,
                      }}
                    />
                    {col === 1 && (
                      <div
                        className="h-3 w-3/4 animate-pulse rounded bg-gray-100"
                        style={{
                          animationDelay: `${row * col * 50 + 100}ms`,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex justify-center">
        <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
