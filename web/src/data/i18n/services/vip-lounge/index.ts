import { createTranslator } from "@/lib";
import type { Lang } from "@/types/language";
import {
  vipLounge,
  type VipLoungeKey,
  tVipLounge,
  VIP_IMG,
  VIP_ROOM_IMAGES,
  VIP_AMENITIES,
  VIP_PACKAGE_BASE,
  VIP_PACKAGE_CONTENT,
  type VipAmenity,
  type VipPackageBase,
  type VipPackageContent,
  type VipPackage,
} from "./vip-lounge";

export function createVipLoungeI18n(lang: Lang) {
  const t = createTranslator<typeof vipLounge, VipLoungeKey>(vipLounge, lang);

  const amenities = VIP_AMENITIES[lang];

  const packages: VipPackage[] = VIP_PACKAGE_BASE.map((base, i) => ({
    ...base,
    ...VIP_PACKAGE_CONTENT[lang][i],
  }));

  return { vipLounge: t, amenities, packages };
}

export { vipLounge, tVipLounge, VIP_IMG, VIP_ROOM_IMAGES, VIP_AMENITIES, VIP_PACKAGE_BASE, VIP_PACKAGE_CONTENT };
export type { VipLoungeKey, VipAmenity, VipPackageBase, VipPackageContent, VipPackage };
