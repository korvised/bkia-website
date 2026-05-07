import type { LucideIcon } from "lucide-react";
import {
  Smartphone,
  Luggage,
  Shirt,
  FileText,
  Gem,
  KeyRound,
  Banknote,
  Gamepad2,
  Package,
} from "lucide-react";
import { LostFoundCategory } from "@/types/enum";
import type { Lang } from "@/types/language";
import { lostFound, type LostFoundKey } from "@/data/i18n/about/lost-found";

export type { LostFoundKey };

// ── Category icon + i18n key maps ─────────────────────────────────────────

export const CATEGORY_ICONS: Record<LostFoundCategory, LucideIcon> = {
  [LostFoundCategory.ELECTRONICS]: Smartphone,
  [LostFoundCategory.BAGGAGE]:     Luggage,
  [LostFoundCategory.CLOTHING]:    Shirt,
  [LostFoundCategory.DOCUMENTS]:   FileText,
  [LostFoundCategory.JEWELRY]:     Gem,
  [LostFoundCategory.KEYS]:        KeyRound,
  [LostFoundCategory.CASH]:        Banknote,
  [LostFoundCategory.TOYS]:        Gamepad2,
  [LostFoundCategory.OTHER]:       Package,
};

export const CATEGORY_KEYS: Record<LostFoundCategory, LostFoundKey> = {
  [LostFoundCategory.ELECTRONICS]: "categoryElectronics",
  [LostFoundCategory.BAGGAGE]:     "categoryBaggage",
  [LostFoundCategory.CLOTHING]:    "categoryClothing",
  [LostFoundCategory.DOCUMENTS]:   "categoryDocuments",
  [LostFoundCategory.JEWELRY]:     "categoryJewelry",
  [LostFoundCategory.KEYS]:        "categoryKeys",
  [LostFoundCategory.CASH]:        "categoryCash",
  [LostFoundCategory.TOYS]:        "categoryToys",
  [LostFoundCategory.OTHER]:       "categoryOther",
};

// ── Translation helper ────────────────────────────────────────────────────

export function t(key: LostFoundKey, lang: Lang): string {
  return lostFound[key][lang] ?? lostFound[key].en;
}

// ── Date formatter ────────────────────────────────────────────────────────

export function formatDate(iso: string, lang: Lang): string {
  return new Date(iso).toLocaleDateString(
    lang === "lo" ? "lo-LA" : lang === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );
}

// ── Claim form state ──────────────────────────────────────────────────────

export interface ClaimFormState {
  ownershipProof: string;
  flightNumber: string;
  seatNumber: string;
  claimantName: string;
  claimantPhone: string;
  claimantEmail: string;
  files: File[];
}

export const emptyClaimForm = (): ClaimFormState => ({
  ownershipProof: "",
  flightNumber:   "",
  seatNumber:     "",
  claimantName:   "",
  claimantPhone:  "",
  claimantEmail:  "",
  files: [],
});
