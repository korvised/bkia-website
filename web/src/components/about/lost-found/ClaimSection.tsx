"use client";

// ── Numbered section wrapper used inside the claim form ───────────────────

export function ClaimSection({
  title,
  number,
  children,
}: {
  title: string;
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
          {number}
        </span>
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <div className="h-px flex-1 bg-gray-100" />
      </div>
      {children}
    </div>
  );
}

// ── Required asterisk ─────────────────────────────────────────────────────

export function Required() {
  return <span className="text-red-500"> *</span>;
}
