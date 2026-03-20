import Link from "next/link";
import { FileText } from "lucide-react";
import { Lang } from "@/types/language";
import { AuctionCategory, AuctionStatus } from "@/types/auction";
import { listPublicAuctions } from "@/services/auction";
import { createAuctionI18n } from "@/data/i18n/about";
import { AuctionCard } from "./auction-card";

interface AuctionListProps {
  lang: Lang;
  status?: AuctionStatus;
  category?: AuctionCategory;
  page: number;
}

export async function AuctionList({
  lang,
  status,
  category,
  page,
}: AuctionListProps) {
  const t = createAuctionI18n(lang).auction;
  const { data: auctions, meta } = await listPublicAuctions({
    status,
    category,
    page,
    limit: 10,
  });

  return (
    <div className="space-y-6">
      {/* List */}
      {auctions.length === 0 ? (
        <div className="py-16 text-center">
          <FileText className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm font-medium text-gray-500">{t.noAuctions}</p>
          <p className="mt-1 text-xs text-gray-400">{t.checkBackSoon}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {auctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} lang={lang} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta.pages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: meta.pages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`?page=${p}`}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                p === page
                  ? "bg-[#00AAAC] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
