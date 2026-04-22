import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import { auction, type AuctionI18nKey, tAuction } from "./auction";

export function createAuctionI18n(lang: Lang) {
  const auctionT = createTranslator<typeof auction, AuctionI18nKey>(
    auction,
    lang,
  );

  return {
    auction: auctionT,
  };
}

export { auction, tAuction };
export type { AuctionI18nKey };
