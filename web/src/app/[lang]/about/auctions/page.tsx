import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Lang } from "@/types/language";
import { AuctionCategory, AuctionStatus, type AuctionPageProps } from "@/types/auction";
import { createAuctionI18n } from "@/data/i18n/about";
import { AuctionList, AuctionListSkeleton } from "@/components/about/auction";

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: AuctionPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = createAuctionI18n(lang as Lang).auction;
  return { title: t.pageTitle, description: t.pageDescription };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AuctionsPage({
  params,
  searchParams,
}: AuctionPageProps) {
  const { lang } = await params;
  const filters = await searchParams;
  const t = createAuctionI18n(lang as Lang).auction;

  const status = filters.status as AuctionStatus | undefined;
  const category = filters.category as AuctionCategory | undefined;
  const page = Number(filters.page ?? 1);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="container">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
          <div className="relative mx-auto max-w-7xl text-center">
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
              {t.heroTitle}
            </h1>
            <p className="text-sm opacity-90 sm:text-base">{t.heroSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="container bg-white">
        <div className="flex gap-1 overflow-x-auto border-b border-gray-200 px-1">
          {(
            [
              { value: "", label: t.tabAll },
              { value: AuctionStatus.OPEN, label: t.tabOpen },
              { value: AuctionStatus.UPCOMING, label: t.tabUpcoming },
              { value: AuctionStatus.CLOSED, label: t.tabClosed },
            ] as const
          ).map(({ value, label }) => (
            <Link
              key={value}
              href={value ? `?status=${value}&page=1` : `?page=1`}
              className={`border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                (status ?? "") === value
                  ? "border-[#00AAAC] text-[#00AAAC]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container py-6">
        <Suspense fallback={<AuctionListSkeleton />}>
          <AuctionList
            lang={lang as Lang}
            status={status}
            category={category}
            page={page}
          />
        </Suspense>
      </div>

      {/* Contact */}
      <div className="bg-gray-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
            {t.contactTitle}
          </h2>
          <p className="mb-6 text-sm text-gray-600">{t.contactSubtitle}</p>
          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm">
              <div className="rounded-lg bg-[#e6f7f8] p-2.5">
                <Mail className="h-5 w-5 text-[#00AAAC]" />
              </div>
              <div className="text-left">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t.submitBidLabel}
                </p>
                <a
                  href="mailto:sambidding@laosam.net"
                  className="text-sm font-medium text-[#00AAAC] hover:underline"
                >
                  sambidding@laosam.net
                </a>
                <p className="mt-0.5 text-xs text-gray-400">{t.submitBidHint}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm">
              <div className="rounded-lg bg-[#e6f7f8] p-2.5">
                <Phone className="h-5 w-5 text-[#00AAAC]" />
              </div>
              <div className="text-left">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t.inquiriesLabel}
                </p>
                <a
                  href="tel:+8562099982986"
                  className="text-sm font-medium text-[#00AAAC] hover:underline"
                >
                  +856 20 99 982 986
                </a>
                <p className="mt-0.5 text-xs text-gray-400">{t.businessHours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
