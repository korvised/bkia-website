export function NoticeDetailSkeleton() {
  return (
    <>
      {/* Header section — mirrors the priority-tinted section with left accent */}
      <section className="border-l-[6px] border-l-gray-300 bg-gray-50 py-10 lg:border-l-8">
        <div className="container max-w-4xl">
          {/* Back link */}
          <div className="mb-8 h-4 w-28 animate-pulse rounded bg-gray-200" />

          {/* Priority badge pill */}
          <div className="mb-5">
            <div className="inline-block h-7 w-32 animate-pulse rounded-full bg-gray-200" />
          </div>

          {/* Title */}
          <div className="mb-2 h-10 w-3/4 animate-pulse rounded-lg bg-gray-200" />
          <div className="mb-4 h-10 w-1/2 animate-pulse rounded-lg bg-gray-200" />

          {/* Description */}
          <div className="mb-2 h-5 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />

          {/* Metadata row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/10 pt-6">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* Tags row */}
          <div className="mt-5 flex items-center gap-2">
            <div className="h-3.5 w-3.5 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="bg-white py-10">
        <div className="container max-w-4xl space-y-4">
          <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-4/5 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>
      </section>
    </>
  );
}
