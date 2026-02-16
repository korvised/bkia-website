import type { Lang } from "@/types/language";

export const petsGuideline = {
  backButton: {
    en: "All Custom Services",
    lo: "ບໍລິການພິເສດທັງໝົດ",
    zh: "全部定制服务",
  },
  categoryLabel: {
    en: "Custom Services",
    lo: "ບໍລິການພິເສດ",
    zh: "定制服务",
  },
  title: {
    en: "Traveling with Pets",
    lo: "ການເດີນທາງກັບສັດລ້ຽງ",
    zh: "携带宠物旅行",
  },
  subtitle: {
    en: "Guide to necessary documents and procedures for traveling with pets.",
    lo: "ຄຳແນະນຳກ່ຽວກັບເອກະສານ ແລະ ຂັ້ນຕອນຕ່າງໆ ໃນການເດີນທາງກັບສັດລ້ຽງ.",
    zh: "携带宠物旅行时所需文件和程序的指南。",
  },
  disclaimer: {
    en: "The information on this page is for reference only. Please verify with the relevant airline or agency for accurate information.",
    lo: "ຂໍ້ມູນໃນໜ້ານີ້ແມ່ນເພື່ອເປັນການອ້າງອີງເທົ່ານັ້ນ. ກະລຸນາກວດສອບກັບສາຍການບິນ ຫຼື ຕົວແທນຈຳໜ່າຍສຳລັບຂໍ້ມູນທີ່ຖືກຕ້ອງ.",
    zh: "本页信息仅供参考。请与相关航空公司或机构核实准确信息。",
  },

  // General Rules
  generalTitle: {
    en: "General Rules",
    lo: "ກົດລະບຽບທົ່ວໄປ",
    zh: "一般规定",
  },
  general1: {
    en: "Pets must be declared at the time of booking. Please check with your airline in advance.",
    lo: "ຕ້ອງແຈ້ງສັດລ້ຽງໃນເວລາຈອງຖ້ຽວບິນ. ກະລຸນາກວດສອບກັບສາຍການບິນລ່ວງໜ້າ.",
    zh: "必须在订票时申报宠物。请提前与航空公司确认。",
  },
  general2: {
    en: "Small pets may be allowed in the cabin; larger animals must travel in the cargo hold.",
    lo: "ສັດລ້ຽງຂະໜາດນ້ອຍອາດໄດ້ຮັບອະນຸຍາດໃຫ້ນຳຂຶ້ນຫ້ອງໂດຍສານ; ສັດຂະໜາດໃຫຍ່ຕ້ອງຂົນສົ່ງໃນຫ້ອງສິນຄ້າ.",
    zh: "小型宠物可能允许进入客舱；较大的动物必须在货舱运输。",
  },
  general3: {
    en: "Service animals are generally permitted in the cabin, subject to airline policy.",
    lo: "ສັດຊ່ວຍເຫຼືອ (Service animals) ສາມາດນຳຂຶ້ນຫ້ອງໂດຍສານໄດ້ ຕາມນະໂຍບາຍຂອງສາຍການບິນ.",
    zh: "服务性动物通常允许进入客舱，具体视航空公司政策而定。",
  },
  general4: {
    en: "Each airline has specific weight and carrier size limits. Confirm before arriving at the airport.",
    lo: "ແຕ່ລະສາຍການບິນມີຂໍ້ກຳນົດນ້ຳໜັກ ແລະ ຂະໜາດກົງສັດທີ່ຕ່າງກັນ. ກະລຸນາຢັ້ງຢືນກ່ອນມາຮອດສະໜາມບິນ.",
    zh: "各航空公司有不同的重量和宠物箱尺寸限制。请在抵达机场前确认。",
  },

  // Required Documents
  documentsTitle: {
    en: "Required Documents",
    lo: "ເອກະສານທີ່ຈຳເປັນ",
    zh: "所需文件",
  },
  doc1Title: {
    en: "Health Certificate",
    lo: "ໃບຢັ້ງຢືນສຸຂະພາບ",
    zh: "健康证明",
  },
  doc1Desc: {
    en: "Issued by a licensed veterinarian within 10 days before travel.",
    lo: "ຕ້ອງອອກໂດຍສັດຕະວະແພດທີ່ໄດ້ຮັບອະນຸຍາດ ພາຍໃນ 10 ວັນ ກ່ອນການເດີນທາງ.",
    zh: "由执业兽医在旅行前 10 天内出具。",
  },
  doc2Title: {
    en: "Vaccination Records",
    lo: "ປະຫວັດການສັກຢາວັກຊີນ",
    zh: "疫苗接种记录",
  },
  doc2Desc: {
    en: "Up-to-date records, including rabies vaccination, are required for all pets.",
    lo: "ຕ້ອງມີປະຫວັດການສັກຢາທີ່ຄົບຖ້ວນ ລວມທັງວັກຊີນປ້ອງກັນພະຍາດກະລອກ.",
    zh: "须提供最新的接种记录，包括狂犬病疫苗。",
  },
  doc3Title: {
    en: "Import / Export Permit",
    lo: "ໃບອະນຸຍາດນຳເຂົ້າ-ສົ່ງອອກ",
    zh: "进出口许可证",
  },
  doc3Desc: {
    en: "Required for international travel. Check specific requirements of the destination country.",
    lo: "ຈຳເປັນສຳລັບການເດີນທາງຕ່າງປະເທດ. ກະລຸນາກວດສອບຂໍ້ກຳນົດຂອງປະເທດປາຍທາງ.",
    zh: "国际旅行必备。请确认目的地国家的具体要求。",
  },
  doc4Title: {
    en: "Microchip Documentation",
    lo: "ເອກະສານຝັງໄມໂຄຊິບ",
    zh: "芯片证明文件",
  },
  doc4Desc: {
    en: "Many countries require microchips for identification. Ensure documents match the chip ID.",
    lo: "ຫຼາຍປະເທດຮຽກຮ້ອງໃຫ້ມີການຝັງໄມໂຄຊິບ. ໃຫ້ຮັບປະກັນວ່າເອກະສານກົງກັບໝາຍເລກຊິບ.",
    zh: "许多国家要求植入芯片。请确保文件与芯片编号一致。",
  },

  // Pet Carrier Requirements
  carrierTitle: {
    en: "Pet Carrier Requirements",
    lo: "ຂໍ້ກຳນົດຂອງກົງໃສ່ສັດ",
    zh: "宠物箱要求",
  },
  carrier1: {
    en: "The carrier must be well-ventilated and large enough for the pet to move comfortably.",
    lo: "ກົງສັດຕ້ອງມີການລະບາຍອາກາດດີ ແລະ ກວ້າງພໍໃຫ້ສັດປ່ຽນທ່າທາງໄດ້ສະດວກ.",
    zh: "宠物箱必须通风良好，且空间充足，方便宠物活动。",
  },
  carrier2: {
    en: "The carrier must be leak-proof and contain absorbent bedding.",
    lo: "ກົງສັດຕ້ອງມີລະບົບກັນຮົ່ວໄຫຼ ແລະ ມີວັດສະດຸດູດຊຶມຮອງພື້ນ.",
    zh: "宠物箱必须防漏，并铺有吸水垫料。",
  },
  carrier3: {
    en: "Hard-sided carriers are required for cargo; soft-sided may be allowed in the cabin.",
    lo: "ຕ້ອງໃຊ້ກົງແບບແຂງສຳລັບການສົ່ງໃນຫ້ອງສິນຄ້າ; ສ່ວນໃນຫ້ອງໂດຍສານອາດໃຊ້ແບບອ່ອນໄດ້.",
    zh: "货舱运输须使用硬壳箱；客舱可接受软式宠物箱。",
  },
  carrier4: {
    en: "Attach a label with the pet's name, owner's contact, and feeding instructions.",
    lo: "ຕິດປ້າຍຊື່ສັດ, ຂໍ້ມູນຕິດຕໍ່ເຈົ້າຂອງ ແລະ ຄຳແນະນຳການໃຫ້ອາຫານໄວ້ທີ່ກົງສັດ.",
    zh: "在宠物箱上贴上宠物姓名、联系方式和喂食说明标签。",
  },

  // Tips
  tipsTitle: {
    en: "Travel Tips",
    lo: "ຂໍ້ແນະນຳການເດີນທາງ",
    zh: "旅行建议",
  },
  tip1: {
    en: "Visit your vet at least 2 weeks before travel for a health check and vaccinations.",
    lo: "ຄວນພັດສັດຕະວະແພດຢ່າງໜ້ອຍ 2 ອາທິດລ່ວງໜ້າ ເພື່ອກວດສຸຂະພາບ ແລະ ສັກຢາ.",
    zh: "出行前至少 2 周拜访兽医，完成健康检查和疫苗接种。",
  },
  tip2: {
    en: "Avoid feeding your pet 4–6 hours before the flight to prevent discomfort.",
    lo: "ງົດໃຫ້ອາຫານສັດລ້ຽງ 4-6 ຊົ່ວໂມງກ່ອນຂຶ້ນເຄື່ອງ ເພື່ອຫຼຸດຜ່ອນອາການບໍ່ສະບາຍ.",
    zh: "起飞前 4-6 小时避免喂食，以防止宠物不适。",
  },
  tip3: {
    en: "Let your pet get used to the carrier weeks before travel to reduce anxiety.",
    lo: "ຝຶກໃຫ້ສັດລ້ຽງຄຸ້ນເຄີຍກັບກົງລ່ວງໜ້າຫຼາຍອາທິດ ເພື່ອຫຼຸດຜ່ອນຄວາມຕື່ນຕົກໃຈ.",
    zh: "提前几周让宠物熟悉宠物箱，以减轻焦虑。",
  },
  tip4: {
    en: "Carry sufficient food, water, and necessary medications for the entire journey.",
    lo: "ກຽມອາຫານ, ນ້ຳ ແລະ ຢາທີ່ຈຳເປັນໃຫ້ພຽງພໍຕະຫຼອດການເດີນທາງ.",
    zh: "备足整个旅程所需的食物、水和药物。",
  },
} as const;

export type PetsGuidelineKey = keyof typeof petsGuideline;

export const tPetsGuideline = (k: PetsGuidelineKey, lang: Lang) =>
  petsGuideline[k][lang] ?? petsGuideline[k].en;
