import { Plane, RefreshCw } from "lucide-react";

export default function FlightsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Plane className="text-bokeo-teal-600 h-8 w-8" />
              <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Search Section Skeleton */}
          <div className="space-y-4">
            <div className="h-12 animate-pulse rounded-lg bg-gray-200" />
            <div className="flex items-center space-x-4">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-48 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="py-2">
                  <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Loading Message */}
          <div className="rounded-lg border bg-white p-8">
            <div className="flex items-center justify-center space-x-2">
              <RefreshCw className="text-bokeo-teal-600 h-6 w-6 animate-spin" />
              <p className="text-gray-600">正在加载航班信息...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
