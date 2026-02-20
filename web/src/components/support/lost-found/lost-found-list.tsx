import { Calendar, MapPin, Package, Plane } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Lang } from "@/types/language";
import { ILostFoundItem } from "@/types/lost-found";
import { LostFoundStatus, LostFoundType } from "@/types/enum";
import { asset, cn, fmtDate } from "@/lib";
import { createSupportI18n } from "@/data/i18n/support";
import { IPaginationMeta } from "@/types/pagination";
import { LostFoundPagination } from "./lost-found-pagination";

interface LostFoundListProps {
  lang: Lang;
  items: ILostFoundItem[];
  meta: IPaginationMeta;
  searchParams: Record<string, string | undefined>;
}

const TYPE_STYLE: Record<LostFoundType, string> = {
  [LostFoundType.LOST]: "bg-red-50 text-red-700 border-red-200",
  [LostFoundType.FOUND]: "bg-green-50 text-green-700 border-green-200",
};

const STATUS_STYLE: Record<LostFoundStatus, string> = {
  [LostFoundStatus.OPEN]: "bg-blue-50 text-blue-700",
  [LostFoundStatus.MATCHED]: "bg-yellow-50 text-yellow-700",
  [LostFoundStatus.RETURNED]: "bg-gray-100 text-gray-500",
  [LostFoundStatus.DONATED]: "bg-gray-100 text-gray-500",
  [LostFoundStatus.DISPOSED]: "bg-gray-100 text-gray-500",
};

export function LostFoundList({
  lang,
  items,
  meta,
  searchParams,
}: LostFoundListProps) {
  const t = createSupportI18n(lang).lostFound;

  const statusLabel: Record<LostFoundStatus, string> = {
    [LostFoundStatus.OPEN]: t.statusOpen,
    [LostFoundStatus.MATCHED]: t.statusMatched,
    [LostFoundStatus.RETURNED]: t.statusReturned,
    [LostFoundStatus.DONATED]: t.statusDonated,
    [LostFoundStatus.DISPOSED]: t.statusDisposed,
  };

  const typeLabel: Record<LostFoundType, string> = {
    [LostFoundType.LOST]: t.typeLost,
    [LostFoundType.FOUND]: t.typeFound,
  };

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Package className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {t.noItemsFound}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{t.noItemsMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${lang}/support/lost-found/${item.id}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-md"
          >
            {/* Cover image */}
            <div className="relative h-44 w-full bg-gray-100">
              {item.coverImage ? (
                <Image
                  src={asset(item.coverImage.path)}
                  alt={item.itemName}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Package className="h-12 w-12 text-gray-300" />
                </div>
              )}
              {/* Type badge overlay */}
              <span
                className={cn(
                  "absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                  TYPE_STYLE[item.type],
                )}
              >
                {typeLabel[item.type]}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="group-hover:text-primary-600 line-clamp-1 text-sm font-semibold text-gray-900 transition-colors">
                  {item.itemName}
                </h3>
                <span
                  className={cn(
                    "shrink-0 rounded-md px-2 py-0.5 text-xs font-medium",
                    STATUS_STYLE[item.status],
                  )}
                >
                  {statusLabel[item.status]}
                </span>
              </div>

              {item.description && (
                <p className="line-clamp-2 text-xs text-gray-500">
                  {item.description}
                </p>
              )}

              <div className="mt-auto space-y-1 pt-2 text-xs text-gray-500">
                {item.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>{fmtDate(new Date(item.incidentDate), lang)}</span>
                </div>
                {item.flightNumber && (
                  <div className="flex items-center gap-1.5">
                    <Plane className="h-3.5 w-3.5 shrink-0" />
                    <span>{item.flightNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {meta.pages > 1 && (
        <LostFoundPagination
          lang={lang}
          meta={meta}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}
