import {
  ArrowLeft,
  Banknote,
  Briefcase,
  Calendar,
  FileText,
  Gem,
  KeyRound,
  MapPin,
  Package,
  Plane,
  Puzzle,
  Shirt,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Lang } from "@/types/language";
import { ILostFoundItem } from "@/types/lost-found";
import {
  LostFoundCategory,
  LostFoundStatus,
  LostFoundType,
} from "@/types/enum";
import { asset, cn, fmtDate } from "@/lib";
import { createSupportI18n } from "@/data/i18n/support";
import { LostFoundClaimForm } from "./lost-found-claim-form";

interface LostFoundDetailProps {
  lang: Lang;
  item: ILostFoundItem;
}

const CATEGORY_ICON: Record<LostFoundCategory, typeof Package> = {
  [LostFoundCategory.ELECTRONICS]: Smartphone,
  [LostFoundCategory.BAGGAGE]: Briefcase,
  [LostFoundCategory.CLOTHING]: Shirt,
  [LostFoundCategory.DOCUMENTS]: FileText,
  [LostFoundCategory.JEWELRY]: Gem,
  [LostFoundCategory.KEYS]: KeyRound,
  [LostFoundCategory.CASH]: Banknote,
  [LostFoundCategory.TOYS]: Puzzle,
  [LostFoundCategory.OTHER]: Package,
};

const TYPE_STYLE: Record<LostFoundType, { badge: string; accent: string }> = {
  [LostFoundType.LOST]: {
    badge: "bg-red-50 text-red-700 border-red-200",
    accent: "border-l-red-500",
  },
  [LostFoundType.FOUND]: {
    badge: "bg-green-50 text-green-700 border-green-200",
    accent: "border-l-green-500",
  },
};

const STATUS_STYLE: Record<LostFoundStatus, string> = {
  [LostFoundStatus.OPEN]: "bg-blue-50 text-blue-700",
  [LostFoundStatus.MATCHED]: "bg-yellow-50 text-yellow-700",
  [LostFoundStatus.RETURNED]: "bg-gray-100 text-gray-500",
  [LostFoundStatus.DONATED]: "bg-gray-100 text-gray-500",
  [LostFoundStatus.DISPOSED]: "bg-gray-100 text-gray-500",
};

export function LostFoundDetail({ lang, item }: LostFoundDetailProps) {
  const t = createSupportI18n(lang).lostFound;
  const typeStyle = TYPE_STYLE[item.type];
  const CategoryIcon = CATEGORY_ICON[item.category] ?? Package;

  const typeLabel: Record<LostFoundType, string> = {
    [LostFoundType.LOST]: t.typeLost,
    [LostFoundType.FOUND]: t.typeFound,
  };

  const statusLabel: Record<LostFoundStatus, string> = {
    [LostFoundStatus.OPEN]: t.statusOpen,
    [LostFoundStatus.MATCHED]: t.statusMatched,
    [LostFoundStatus.RETURNED]: t.statusReturned,
    [LostFoundStatus.DONATED]: t.statusDonated,
    [LostFoundStatus.DISPOSED]: t.statusDisposed,
  };

  const canClaim =
    item.type === LostFoundType.FOUND && item.status === LostFoundStatus.OPEN;

  const images = item.images ?? [];
  const coverImage = item.coverImage;

  return (
    <div className="min-h-screen">
      <div className="container max-w-5xl">
        {/* Back */}
        <Link
          href={`/${lang}/support/lost-found`}
          className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t.backToList}
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ── Left: Images + Meta ── */}
          <div className="space-y-4 lg:col-span-2">
            {/* Cover image */}
            <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-96">
              {coverImage ? (
                <Image
                  src={asset(coverImage.path)}
                  alt={item.itemName}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <CategoryIcon className="h-20 w-20 text-gray-300" />
                </div>
              )}
              {/* Type badge */}
              <span
                className={cn(
                  "absolute top-4 left-4 rounded-full border px-3 py-1 text-sm font-semibold",
                  typeStyle.badge,
                )}
              >
                {typeLabel[item.type]}
              </span>
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
                  >
                    <Image
                      src={asset(img.path)}
                      alt={img.originalName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Detail card */}
            <div
              className={cn(
                "overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs",
              )}
            >
              <div className={cn("border-l-8 p-6 lg:p-8", typeStyle.accent)}>
                {/* Badges row */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-md px-2.5 py-1 text-xs font-semibold",
                      STATUS_STYLE[item.status],
                    )}
                  >
                    {statusLabel[item.status]}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    <CategoryIcon className="h-3.5 w-3.5" />
                    {t[
                      `category${item.category.charAt(0) + item.category.slice(1).toLowerCase()}` as keyof typeof t
                    ] ?? item.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">
                  {item.itemName}
                </h1>

                {/* Description */}
                {item.description && (
                  <p className="text-base leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                )}

                {/* Meta */}
                <div className="mt-6 grid gap-3 border-t border-gray-100 pt-6 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{t.incidentDate}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {fmtDate(new Date(item.incidentDate), lang)}
                      </p>
                    </div>
                  </div>

                  {item.location && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                        <MapPin className="h-4 w-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{t.location}</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {item.flightNumber && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                        <Plane className="h-4 w-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">
                          {t.flightNumber}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {item.flightNumber}
                        </p>
                      </div>
                    </div>
                  )}

                  {item.referenceCode && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                        <FileText className="h-4 w-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Reference</p>
                        <p className="text-sm font-semibold tracking-wider text-gray-900">
                          {item.referenceCode}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Claim form or status ── */}
          <div className="lg:col-span-1">
            {canClaim ? (
              <LostFoundClaimForm lang={lang} itemId={item.id} />
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-xs">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <Package className="h-7 w-7 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {statusLabel[item.status]}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {item.type === LostFoundType.LOST
                    ? "This is a lost item report."
                    : "This item is no longer available for claim."}
                </p>
              </div>
            )}

            {/* Report your own */}
            <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5 text-center">
              <p className="mb-3 text-xs text-gray-500">
                Lost something at the airport?
              </p>
              <Link
                href={`/${lang}/support/lost-found/report`}
                className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                {t.reportLost}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
