import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, Mail, Phone } from "lucide-react";
import { Lang } from "@/types/language";
import { AuctionCategory, AuctionStatus, type AuctionPageProps } from "@/types/auction";
import { createAuctionI18n } from "@/data/i18n/notices";
import { AuctionList, AuctionListSkeleton } from "@/components/about/auction";
import { NoticesCrossNav } from "@/components/support/notice";

export async function generateMetadata({
  params,
}: AuctionPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = createAuctionI18n(lang as Lang).auction;
  return { title: t.pageTitle, description: t.pageDescription };
}

export default async function AuctionsPage({
  params,
  searchParams,
}: AuctionPageProps) {
  const { lang } = await params;
  const filters = await searchParams;
  const t = createAuctionI18n(lang as Lang).auction;

  const eyebrow: Record<Lang, string> = {
    en: "Announcements",
    lo: "ແຈ້ງການ",
    zh: "公告",
  };

  const status = filters.status as AuctionStatus | undefined;
  const category = filters.category as AuctionCategory | undefined;
  const page = Number(filters.page ?? 1);

  const tabs = [
    { value: "", label: t.tabAll },
    { value: AuctionStatus.OPEN, label: t.tabOpen },
    { value: AuctionStatus.UPCOMING, label: t.tabUpcoming },
    { value: AuctionStatus.CLOSED, label: t.tabClosed },
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#00AAAC]">
              <ClipboardList className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                {eyebrow[lang as Lang]}
              </p>
              <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
                {t.heroTitle}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-gray-500 lg:text-base">
                {t.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Status filter pills */}
      <section className="bg-white py-4">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {tabs.map(({ value, label }) => (
              <Link
                key={value}
                href={value ? `?status=${value}&page=1` : `?page=1`}
                className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  (status ?? "") === value
                    ? "bg-[#00AAAC] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Auction list */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <Suspense fallback={<AuctionListSkeleton />}>
            <AuctionList
              lang={lang as Lang}
              status={status}
              category={category}
              page={page}
            />
          </Suspense>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
              {t.contactTitle}
            </h2>
            <p className="mb-8 text-sm text-gray-500">{t.contactSubtitle}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-r-lg border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-5 py-4 text-left">
                <div className="mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-xs font-bold uppercase tracking-wide text-[#00AAAC]">
                    {t.submitBidLabel}
                  </p>
                </div>
                <a
                  href="mailto:sambidding@laosam.net"
                  className="text-sm font-medium text-gray-900 hover:text-[#00AAAC] hover:underline"
                >
                  sambidding@laosam.net
                </a>
                <p className="mt-1 text-xs text-gray-500">{t.submitBidHint}</p>
              </div>
              <div className="rounded-r-lg border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-5 py-4 text-left">
                <div className="mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-xs font-bold uppercase tracking-wide text-[#00AAAC]">
                    {t.inquiriesLabel}
                  </p>
                </div>
                <a
                  href="tel:+8562099982986"
                  className="text-sm font-medium text-gray-900 hover:text-[#00AAAC] hover:underline"
                >
                  +856 20 99 982 986
                </a>
                <p className="mt-1 text-xs text-gray-500">{t.businessHours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross navigation to other sections */}
      <NoticesCrossNav lang={lang as Lang} current="auctions" />
    </>
  );
}
