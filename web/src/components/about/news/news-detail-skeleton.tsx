export function NewsDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <div className="relative h-[400px] w-full animate-pulse bg-gray-300 lg:h-[500px]" />

      {/* Content Section */}
      <div className="container py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Meta Card Skeleton */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex gap-6">
              <div className="h-16 w-32 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-16 w-32 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-16 w-32 animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>

          {/* Excerpt Skeleton */}
          <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-8">
            <div className="h-6 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-3/4 animate-pulse rounded-lg bg-gray-200" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-8">
            <div className="h-6 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-2/3 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-5/6 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
