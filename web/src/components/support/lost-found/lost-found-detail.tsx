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
import Link from "next/link";
import { Lang } from "@/types/language";
import { ILostFoundItem } from "@/types/lost-found";
import {
  LostFoundCategory,
  LostFoundStatus,
  LostFoundType,
} from "@/types/enum";
import { cn, fmtDate } from "@/lib";
import { createLostFoundI18n } from "@/data/i18n/about/lost-found";
import { LostFoundClaimForm } from "./lost-found-claim-form";
import { LostFoundImageGallery } from "./lost-found-image-gallery";

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

const HEADER_CONFIG: Record<
  LostFoundType,
  { headerBg: string; borderClass: string; typeBadge: string }
> = {
  [LostFoundType.LOST]: {
    headerBg: "bg-red-50",
    borderClass: "border-red-500",
    typeBadge: "bg-red-600 text-white",
  },
  [LostFoundType.FOUND]: {
    headerBg: "bg-[#f0fbfc]",
    borderClass: "border-[#00AAAC]",
    typeBadge: "bg-emerald-600 text-white",
  },
};

const STATUS_STYLE: Record<LostFoundStatus, string> = {
  [LostFoundStatus.OPEN]: "bg-[#f0fbfc] text-[#008e90]",
  [LostFoundStatus.MATCHED]: "bg-amber-50 text-amber-700",
  [LostFoundStatus.RETURNED]: "bg-gray-100 text-gray-500",
  [LostFoundStatus.DONATED]: "bg-gray-100 text-gray-500",
  [LostFoundStatus.DISPOSED]: "bg-gray-100 text-gray-500",
};

export function LostFoundDetail({ lang, item }: LostFoundDetailProps) {
  const t = createLostFoundI18n(lang).lostFound;
  const config = HEADER_CONFIG[item.type];
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

  // Build de-duplicated image list: cover first, then additional
  const coverImage = item.coverImage;
  const extraImages = (item.images ?? []).filter(
    (img) => img.id !== coverImage?.id,
  );
  const allImages = [...(coverImage ? [coverImage] : []), ...extraImages];

  return (
    <>
      {/* Type-tinted full-bleed header */}
      <section
        className={cn(
          "border-l-[6px] py-10 lg:border-l-8",
          config.headerBg,
          config.borderClass,
        )}
      >
        <div className="container max-w-5xl">
          {/* Back */}
          <Link
            href={`/${lang}/about/lost-found`}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.backToList}
          </Link>

          {/* Type badge */}
          <div className="mb-4">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide",
                config.typeBadge,
              )}
            >
              {typeLabel[item.type]}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
            {item.itemName}
          </h1>

          {/* Description */}
          {item.description && (
            <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
              {item.description}
            </p>
          )}

          {/* Meta chips row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-black/10 pt-5 text-sm">
            {/* Status */}
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                STATUS_STYLE[item.status],
              )}
            >
              {statusLabel[item.status]}
            </span>

            {/* Category */}
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <CategoryIcon className="h-3.5 w-3.5" />
              {t[
                `category${item.category.charAt(0) + item.category.slice(1).toLowerCase()}` as keyof typeof t
              ] ?? item.category}
            </span>

            {/* Date */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              <span>{fmtDate(new Date(item.incidentDate), lang)}</span>
            </div>

            {/* Location */}
            {item.location && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                <span>{item.location}</span>
              </div>
            )}

            {/* Flight */}
            {item.flightNumber && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Plane className="h-3.5 w-3.5 text-gray-400" />
                <span>{item.flightNumber}</span>
              </div>
            )}

            {/* Reference code */}
            {item.referenceCode && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FileText className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs text-gray-400">{t.referenceLabel}: </span>
                <span className="font-mono font-semibold tracking-wider text-gray-700">
                  {item.referenceCode}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content — images + claim */}
      <section className="bg-white py-10">
        <div className="container max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: image gallery */}
            <div className="lg:col-span-2">
              <LostFoundImageGallery
                images={allImages}
                itemName={item.itemName}
                fallback={<CategoryIcon className="h-20 w-20 text-gray-300" />}
              />
            </div>

            {/* Right: claim / status + report CTA */}
            <div className="space-y-5 lg:col-span-1">
              {canClaim ? (
                <LostFoundClaimForm lang={lang} itemId={item.id} />
              ) : (
                <div className="py-4 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                    <Package className="h-7 w-7 text-gray-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    {statusLabel[item.status]}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {item.type === LostFoundType.LOST
                      ? t.lostItemNote
                      : t.notAvailableNote}
                  </p>
                </div>
              )}

              {/* Report your own */}
              <div className="rounded-r-lg border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-4">
                <p className="mb-3 text-xs text-gray-600">{t.lostSomething}</p>
                <Link
                  href={`/${lang}/about/lost-found/report`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#00AAAC] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#008e90]"
                >
                  {t.reportLost}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
