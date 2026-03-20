export function NewsDetailSkeleton() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container">
          {/* Back link skeleton */}
          <div className="mb-6 h-5 w-28 animate-pulse rounded-full bg-[#00AAAC]/20" />

          {/* Cover image skeleton */}
          <div className="aspect-video w-full animate-pulse rounded-2xl bg-gray-200 lg:aspect-[21/9]" />

          {/* Meta chips skeleton */}
          <div className="mt-5 flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-28 animate-pulse rounded-full bg-gray-200"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-9 w-3/4 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-9 w-1/2 animate-pulse rounded-lg bg-gray-200" />
            </div>

            {/* Excerpt callout */}
            <div className="rounded-r-lg border-l-4 border-[#00AAAC]/30 bg-[#f0fbfc] px-6 py-4 space-y-2">
              <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-5/6 animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Body */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className={`h-4 animate-pulse rounded bg-gray-100 ${i % 3 === 0 ? "w-2/3" : "w-full"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
