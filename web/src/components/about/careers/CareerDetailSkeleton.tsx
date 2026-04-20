export function CareerDetailSkeleton() {
  return (
    <div>
      {/* Back link */}
      <div className="mb-6 h-4 w-32 animate-pulse rounded-full bg-gray-200" />

      {/* Card */}
      <div className="rounded-2xl border border-gray-100 bg-white">
        {/* Header */}
        <div className="border-l-4 border-[#00AAAC]/30 px-6 py-6 sm:px-8 sm:py-7">
          <div className="mb-3 flex flex-wrap gap-2">
            <div className="h-6 w-24 animate-pulse rounded-full bg-[#00AAAC]/10" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-100" />
            <div className="h-6 w-28 animate-pulse rounded-full bg-gray-100" />
          </div>
          <div className="mb-2 h-7 w-2/3 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-3 w-36 animate-pulse rounded-full bg-gray-100" />
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gray-50 sm:mx-8" />

        {/* Body */}
        <div className="space-y-3 px-6 py-6 sm:px-8 sm:py-7">
          {[100, 95, 80, 100, 65, 88, 50, 95, 75, 60].map((w, i) => (
            <div
              key={i}
              className="h-4 animate-pulse rounded bg-gray-100"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
