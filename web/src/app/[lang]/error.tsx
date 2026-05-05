"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Home, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const messages = {
  en: {
    label: "System Error",
    title: "Something went wrong",
    description:
      "We encountered an unexpected problem while loading this page. Please try again or return to the home page.",
    retry: "Try again",
    home: "Go home",
    hint: "If this problem persists, please contact airport staff for assistance.",
  },
  lo: {
    label: "ຂໍ້ຜິດພາດ",
    title: "ເກີດຂໍ້ຜິດພາດ",
    description:
      "ເກີດຄວາມຜິດພາດທີ່ບໍ່ຄາດຄິດໃນການໂຫຼດໜ້ານີ້. ກະລຸນາລອງໃໝ່ ຫຼື ກັບໄປໜ້າຫຼັກ.",
    retry: "ລອງໃໝ່",
    home: "ໄປໜ້າຫຼັກ",
    hint: "ຖ້າຫາກຍັງເກີດຂໍ້ຜິດພາດ, ກະລຸນາຕິດຕໍ່ພະນັກງານສະໜາມບິນ.",
  },
  zh: {
    label: "系统错误",
    title: "出现错误",
    description: "加载此页面时遇到意外错误，请重试或返回首页。",
    retry: "重试",
    home: "返回首页",
    hint: "如果问题持续存在，请联系机场工作人员寻求帮助。",
  },
} as const;

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const params = useParams();
  const lang = (params?.lang as keyof typeof messages) ?? "en";
  const t = messages[lang] ?? messages.en;

  useEffect(() => {
    console.error("[page error]", error);
  }, [error]);

  return (
    <>
      <style>{`
        @keyframes err-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .err-1 { animation: err-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
        .err-2 { animation: err-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .err-3 { animation: err-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .err-4 { animation: err-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
        @media (prefers-reduced-motion: reduce) {
          .err-1,.err-2,.err-3,.err-4 { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── Dark top — header (transparent + white text) is visible here ── */}
      <section className="relative overflow-hidden bg-[#003d3e] px-4 pb-24 pt-32">
        {/* Subtle bg texture */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,170,172,0.18)_0%,_transparent_60%)]" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#00AAAC]/10" />

        <div className="relative mx-auto max-w-md text-center">
          {/* Icon */}
          <div className="err-1 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/15">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-amber-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          {/* Label */}
          <p className="err-1 mb-2 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#00AAAC]/80">
            {t.label}
          </p>

          {/* Title */}
          <h1 className="err-2 text-3xl font-bold text-white sm:text-4xl">
            {t.title}
          </h1>
        </div>
      </section>

      {/* ── Light content — card overlaps the dark section ── */}
      <section className="bg-[#f0fbfc] px-4 pb-16">
        <div className="mx-auto max-w-md">
          {/* Floating card */}
          <div className="err-3 -mt-10 rounded-2xl border border-[#00AAAC]/10 bg-white px-8 py-8 shadow-lg shadow-[#00AAAC]/8">
            <p className="text-center text-sm leading-relaxed text-gray-500">
              {t.description}
            </p>

            {error.digest && (
              <p className="mt-3 text-center font-mono text-[11px] text-gray-400">
                ref: {error.digest}
              </p>
            )}

            <div className="my-6 flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-100" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#00AAAC]/30" />
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={reset}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00AAAC] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#009a9c] focus:outline-none focus:ring-2 focus:ring-[#00AAAC] focus:ring-offset-2"
              >
                <RefreshCw className="h-4 w-4" />
                {t.retry}
              </button>

              <Link
                href={`/${lang}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
              >
                <Home className="h-4 w-4" />
                {t.home}
              </Link>
            </div>
          </div>

          <p className="err-4 mt-6 text-center text-xs text-gray-400">
            {t.hint}
          </p>
        </div>
      </section>
    </>
  );
}
