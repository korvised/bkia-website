"use client";

import { useInView } from "@/hooks/useInView";

interface SectionHeaderProps {
  label: string;
  count?: number;
}

export function SectionHeader({ label, count }: SectionHeaderProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <>
      <style>{`
        @keyframes section-header-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sh-animated { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
      <div
        ref={ref}
        className="mb-10 flex items-center justify-between"
      >
        <h2
          className="sh-animated text-2xl font-bold text-[#0f1e3d] sm:text-3xl"
          style={inView ? { animation: "section-header-in 0.6s cubic-bezier(0.22,1,0.36,1) both" } : { opacity: 0 }}
        >
          {label}
        </h2>
        {count !== undefined && count > 0 && (
          <span
            className="sh-animated rounded-full bg-[#00AAAC] px-3 py-1 text-sm font-bold text-white"
            style={inView ? { animation: "section-header-in 0.6s cubic-bezier(0.22,1,0.36,1) 80ms both" } : { opacity: 0 }}
          >
            {count}
          </span>
        )}
      </div>
    </>
  );
}
