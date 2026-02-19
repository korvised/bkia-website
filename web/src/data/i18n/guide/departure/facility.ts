import type { Lang } from "@/types/language";

export const facilities = {
  title: {
    en: "Airport Facilities & Services",
    lo: "ສິ່ງອຳນວຍຄວາມສະດວກ ແລະ ບໍລິການ",
    zh: "机场设施与服务",
  },
  subtitle: {
    en: "Passenger guide to airport facilities and services, designed to ensure your comfort and convenience throughout your journey.",
    lo: "ຄູ່ມືຜູ້ໂດຍສານ ສຳລັບສິ່ງອຳນວຍຄວາມສະດວກ ແລະ ບໍລິການຕ່າງໆ ເພື່ອຮັບປະກັນຄວາມສະດວກສະບາຍຂອງທ່ານຕະຫຼອດການເດີນທາງ.",
    zh: "旅客指南：提供各项机场设施与服务详情，确保您在整个旅程中享有舒适与便利的体验。",
  },
} as const;

export type FacilitiesKey = keyof typeof facilities;

export const tFacilities = (k: FacilitiesKey, lang: Lang) =>
  facilities[k][lang] ?? facilities[k].en;
