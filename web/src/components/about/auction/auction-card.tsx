import { Calendar, HelpCircle } from "lucide-react";
import { Lang } from "@/types/language";
import { IAuction, AuctionCategory, AuctionStatus } from "@/types/auction";
import { asset, fmtDate } from "@/lib";
import { createAuctionI18n } from "@/data/i18n/notices";
import { CATEGORY_ICONS, CATEGORY_COLORS, STATUS_CLASS } from "./auction-helpers";
import { AuctionDownloadButton } from "./auction-download-button";

interface AuctionCardProps {
  auction: IAuction;
  lang: Lang;
}

export function AuctionCard({ auction, lang }: AuctionCardProps) {
  const t = createAuctionI18n(lang).auction;

  const CATEGORY_LABELS: Record<AuctionCategory, string> = {
    [AuctionCategory.EQUIPMENT]: t.categoryEquipment,
    [AuctionCategory.CONSTRUCTION]: t.categoryConstruction,
    [AuctionCategory.SERVICE]: t.categoryService,
    [AuctionCategory.IT]: t.categoryIT,
    [AuctionCategory.CONSULTING]: t.categoryConsulting,
    [AuctionCategory.MAINTENANCE]: t.categoryMaintenance,
    [AuctionCategory.OTHER]: t.categoryOther,
  };

  const STATUS_LABELS: Record<AuctionStatus, string> = {
    [AuctionStatus.UPCOMING]: t.statusUpcoming,
    [AuctionStatus.OPEN]: t.statusOpen,
    [AuctionStatus.CLOSED]: t.statusClosed,
  };

  const title = auction.title[lang] || auction.title.en || "Untitled";
  const description = auction.description[lang] || auction.description.en || "";
  const CategoryIcon = CATEGORY_ICONS[auction.category] ?? HelpCircle;
  const catColor = CATEGORY_COLORS[auction.category] ?? "bg-gray-100 text-gray-700";
  const docs = auction.documents ?? [];

  return (
    <div className="rounded-xl bg-white p-5">
      {/* Badges */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${catColor}`}
        >
          <CategoryIcon className="h-3 w-3" />
          {CATEGORY_LABELS[auction.category]}
        </span>
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLASS[auction.status]}`}
        >
          {STATUS_LABELS[auction.status]}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-bold text-gray-900 sm:text-lg">{title}</h3>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-gray-600">{description}</p>

      {/* Dates */}
      <div className="flex flex-wrap gap-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5 text-[#00AAAC]" />
          {t.opens} {fmtDate(new Date(auction.startDate), lang)}
        </span>
        <span className="flex items-center gap-1 font-semibold text-red-500">
          <Calendar className="h-3.5 w-3.5" />
          {t.closes} {fmtDate(new Date(auction.endDate), lang)}
        </span>
      </div>

      {/* Documents */}
      {docs.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            {t.tenderDocuments}
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => (
              <AuctionDownloadButton
                key={doc.id}
                href={asset(doc.file.path)}
                fileName={doc.fileName[lang] || doc.fileName.en}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
