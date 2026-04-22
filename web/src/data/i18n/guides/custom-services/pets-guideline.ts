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
    en: "Traveling with Pets (AVIH)",
    lo: "ການເດີນທາງກັບສັດລ້ຽງ (AVIH)",
    zh: "携带宠物旅行 (AVIH)",
  },
  subtitle: {
    en: "Guide to necessary documents and procedures for traveling with pets in the cargo hold.",
    lo: "ຄຳແນະນຳກ່ຽວກັບເອກະສານ ແລະ ຂັ້ນຕອນຕ່າງໆ ໃນການເດີນທາງກັບສັດລ້ຽງຜ່ານຫ້ອງສິນຄ້າ.",
    zh: "携带宠物（货舱托运）所需文件和程序的指南。",
  },
  disclaimer: {
    en: "The information on this page is for reference only. Please inquire with your airline or ticket agent for accurate information.",
    lo: "ຂໍ້ມູນໃນໜ້ານີ້ແມ່ນເພື່ອເປັນການອ້າງອີງເທົ່ານັ້ນ ກະລຸນາສອບຖາມກັບສາຍການບິນ ຫຼື ຕົວແທນຈໍາໜ່າຍປີ້ສຳລັບຂໍ້ມູນທີ່ຖືກຕ້ອງ",
    zh: "本页信息仅供参考。请向航空公司或购票代理咨询以获取准确信息。",
  },

  // General Rules
  generalTitle: {
    en: "General Rules",
    lo: "ກົດລະບຽບທົ່ວໄປ",
    zh: "一般规定",
  },
  general1: {
    en: "Pets must be at least 10 weeks old. Accepted pets include dogs, cats, and small animals like shrimp, snails, crabs, and fish.",
    lo: "ສັດລ້ຽງຕ້ອງມີອາຍຸ 10 ອາທິດຂຶ້ນໄປ. ປະເພດທີ່ອະນຸຍາດມີ: ໝາ, ແມວ, ກຸ້ງ, ຫອຍ, ປູ ແລະ ປາ.",
    zh: "宠物必须至少 10 周大。接受的宠物包括狗、猫以及虾、螺、蟹、鱼等小动物。",
  },
  general2: {
    en: "The combined weight of the pet and carrier must not exceed 30 kg per unit.",
    lo: "ນ້ຳໜັກລວມຂອງສັດລ້ຽງ ແລະ ກົງໃສ່ ຕ້ອງບໍ່ເກີນ 30 ກິໂລ/ໂຕ.",
    zh: "宠物及其航空箱的总重量每单位不得超过 30 公斤。",
  },
  general3: {
    en: "A maximum of 2 pets of the same species can share a carrier if they live together and their combined weight is under 15 kg.",
    lo: "ສັດຊະນິດດຽວກັນ 2 ໂຕ ສາມາດຢູ່ໃນກົງດຽວກັນໄດ້ ຖ້າອາໄສຢູ່ນຳກັນ ແລະ ນ້ຳໜັກລວມບໍ່ເກີນ 15 ກິໂລ.",
    zh: "同种类的两只宠物如果共同生活且总重量不超过 15 公斤，可以共用一个航空箱。",
  },
  general4: {
    en: "Airlines reserve the right to unload or refuse pets that exhibit strong odors or health issues.",
    lo: "ສາຍການບິນມີສິດປະຕິເສດ ຫຼື ໃຫ້ເອົາສັດລ້ຽງອອກ ຫາກພົບວ່າມີກິ່ນເໝັນແຮງ ຫຼື ມີບັນຫາສຸຂະພາບ.",
    zh: "如果发现宠物有强烈异味或健康问题，航空公司保留卸载或拒绝承运的权利。",
  },

  // AVIH Specifics (New section from image)
  avihTitle: {
    en: "AVIH Special Requirements",
    lo: "ຂໍ້ກຳນົດພິເສດ AVIH",
    zh: "AVIH 特殊要求",
  },
  avih1: {
    en: "Passengers must provide their own sedatives if needed; staff are not permitted to administer medication to pets.",
    lo: "ຜູ້ໂດຍສານຕ້ອງຈັດຫາຢານອນຫຼັບໃຫ້ສັດລ້ຽງດ້ວຍຕົນເອງ, ພະນັກງານບໍ່ມີສິດໃສ່ຢາໃຫ້ສັດລ້ຽງ.",
    zh: "如需镇静剂，旅客必须自行准备；工作人员不得为宠物喂药。",
  },
  avih2: {
    en: "For fish, multiple layers of plastic bags inside a foam box are required to prevent leaks or damage to the aircraft systems.",
    lo: "ສຳລັບປາ ຕ້ອງໃສ່ຖົງຢາງຫຼາຍຊັ້ນ ແລະ ໃສ່ກ່ອງໂຟມ ເພື່ອປ້ອງກັນການຮົ່ວໄຫຼໃສ່ລະບົບໄຟເຮືອບິນ.",
    zh: "运输鱼类时，须使用多层塑料袋并放入泡沫箱中，以防漏水损坏飞机系统。",
  },
  avih3: {
    en: "Pets under 6 months old may share a carrier with their mother.",
    lo: "ສັດທີ່ມີອາຍຸບໍ່ເກີນ 6 ເດືອນ ສາມາດຢູ່ໃນກົງດຽວກັນກັບແມ່ຂອງມັນໄດ້.",
    zh: "6 个月以下的宠物可以与母亲共用一个航空箱。",
  },

  // Required Documents
  documentsTitle: {
    en: "Required Documents",
    lo: "ເອກະສານທີ່ຈຳເປັນ",
    zh: "所需文件",
  },
  doc1Title: {
    en: "Health & Vaccination Records",
    lo: "ປຶ້ມຕິດຕາມການສັກຢາ ແລະ ໃບຢັ້ງຢືນສຸຂະພາບ",
    zh: "健康及疫苗接种记录",
  },
  doc1Desc: {
    en: "A vaccination book and a general health certificate from a vet are mandatory.",
    lo: "ຕ້ອງມີປຶ້ມຕິດຕາມການສັກຢາວັກຊີນ ແລະ ໃບຢັ້ງຢືນສຸຂະພາບສັດຈາກສັດຕະວະແພດ.",
    zh: "必须提供疫苗接种簿和兽医出具的普通健康证明。",
  },
  doc2Title: {
    en: "Import / Export Permit",
    lo: "ໃບອະນຸຍາດນຳເຂົ້າ-ສົ່ງອອກ",
    zh: "进出口许可证",
  },
  doc2Desc: {
    en: "Passengers must arrange all necessary transport permits personally before boarding.",
    lo: "ຜູ້ໂດຍສານຕ້ອງຈັດຫາໃບຂົນສົ່ງສັດລ້ຽງ (Permit) ໃຫ້ຮຽບຮ້ອຍກ່ອນຂຶ້ນເຮືອບິນດ້ວຍຕົນເອງ.",
    zh: "旅客必须在登机前自行办理所有必要的运输许可。",
  },

  // Pet Carrier Requirements
  carrierTitle: {
    en: "Pet Carrier Requirements",
    lo: "ຂໍ້ກຳນົດຂອງກົງໃສ່ສັດ",
    zh: "宠物箱要求",
  },
  carrier1: {
    en: "The carrier must be sturdy, leak-proof, and include food and water containers.",
    lo: "ກົງສັດຕ້ອງມີຄວາມທົນທານ, ກັນຮົ່ວໄຫຼ, ພ້ອມທັງມີຖ້ວຍອາຫານ ຫຼື ນ້ຳດື່ມ.",
    zh: "航空箱必须坚固、防漏，并配备食盆或水槽。",
  },
  carrier2: {
    en: "Carriers must be labeled with the owner's name, baggage tag, and an AVIH tag for staff identification.",
    lo: "ກົງສັດຕ້ອງຕິດປ້າຍຊື່ຜູ້ໂດຍສານ, ປ້າຍກະເປົ໋າ ແລະ ປ້າຍ AVIH ເພື່ອແຈ້ງໃຫ້ພະນັກງານຊາບ.",
    zh: "航空箱必须贴有旅客姓名标签、行李牌和 AVIH 标签，以便工作人员识别。",
  },

  // Tips
  tipsTitle: {
    en: "Travel Tips",
    lo: "ຂໍ້ແນະນຳການເດີນທາງ",
    zh: "旅行建议",
  },
  tip1: {
    en: "Avoid feeding your pet 4–6 hours before the flight to prevent discomfort.",
    lo: "ງົດໃຫ້ອາຫານສັດລ້ຽງ 4-6 ຊົ່ວໂມງກ່ອນຂຶ້ນເຄື່ອງ ເພື່ອຫຼຸດຜ່ອນອາການບໍ່ສະບາຍ.",
    zh: "起飞前 4-6 小时避免喂食，以防止宠物不适。",
  },
  tip2: {
    en: "Let your pet get used to the carrier weeks before travel to reduce anxiety.",
    lo: "ຝຶກໃຫ້ສັດລ້ຽງຄຸ້ນເຄີຍກັບກົງລ່ວງໜ້າຫຼາຍອາທິດ ເພື່ອຫຼຸດຜ່ອນຄວາມຕື່ນຕົກໃຈ.",
    zh: "提前几周让宠物熟悉航空箱，以减轻焦虑。",
  },
} as const;

export type PetsGuidelineKey = keyof typeof petsGuideline;

export const tPetsGuideline = (k: PetsGuidelineKey, lang: Lang) =>
  petsGuideline[k][lang] ?? petsGuideline[k].en;
