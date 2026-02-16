import type { Lang } from "@/types/language";

export const pregnancyGuideline = {
  // Page Header
  backButton: {
    en: "All Custom Services",
    lo: "ບໍລິການພິເສດທັງໝົດ",
    zh: "全部定制服务",
  },
  title: {
    en: "Guidelines for Pregnant Women and Infants",
    lo: "ຄຳແນະນຳສຳລັບແມ່ຍິງຖືພາ ແລະ ແອນ້ອຍ",
    zh: "孕妇及婴儿乘机指南",
  },
  subtitle: {
    en: "Travel requirements and facilities for families",
    lo: "ຂໍ້ກຳນົດ ແລະ ສິ່ງອຳນວຍຄວາມສະດວກສຳລັບຄອບຄົວ",
    zh: "家庭旅客出行要求及设施",
  },
  disclaimer: {
    en: "The information on this page is for reference only. Please verify with the relevant airline or agency for accurate information.",
    lo: "ຂໍ້ມູນໃນໜ້ານີ້ແມ່ນເພື່ອເປັນການອ້າງອີງເທົ່ານັ້ນ. ກະລຸນາກວດສອບກັບສາຍການບິນ ຫຼື ຕົວແທນຈຳໜ່າຍສຳລັບຂໍ້ມູນທີ່ຖືກຕ້ອງ.",
    zh: "本页信息仅供参考。请与相关航空公司或机构核实准确信息。",
  },

  // Pregnant Women Sections
  catPregnant: { en: "Pregnant Women", lo: "ແມ່ຍິງຖືພາ", zh: "孕妇" },
  pregUnder32: {
    en: "Under 32 weeks pregnant",
    lo: "ອາຍຸການຖືພາໜ້ອຍກວ່າ 32 ສັບປະດາ",
    zh: "怀孕未满 32 周",
  },
  pregUnder32Info: {
    en: "Travel is generally allowed unless advised against air travel by a physician.",
    lo: "ໂດຍທົ່ວໄປແມ່ນສາມາດເດີນທາງໄດ້ ຍົກເວັ້ນມີຄຳສັ່ງຫ້າມຈາກທ່ານໝໍ.",
    zh: "通常允许旅行，除非医生建议不宜飞行。",
  },
  preg32to36: {
    en: "Between 32 and 36 weeks",
    lo: "ອາຍຸການຖືພາລະຫວ່າງ 32 ຫາ 36 ສັບປະດາ",
    zh: "怀孕 32 至 36 周之间",
  },
  preg32to36Info: {
    en: "A medical certificate issued within 7 days before the flight must be submitted.",
    lo: "ຕ້ອງຍື່ນໃບຢັ້ງຢືນການແພດ ທີ່ອອກໃຫ້ພາຍໃນ 7 ວັນ ກ່ອນມື້ເດີນທາງ.",
    zh: "必须提交航前 7 天内签发的医疗证明。",
  },
  pregOver36: {
    en: "36 weeks or more",
    lo: "ອາຍຸການຖືພາ 36 ສັບປະດາຂຶ້ນໄປ",
    zh: "怀孕 36 周或以上",
  },
  pregOver36Info: {
    en: "Travel is generally not allowed for full-term pregnancies to ensure safety.",
    lo: "ໂດຍທົ່ວໄປແມ່ນບໍ່ອະນຸຍາດໃຫ້ເດີນທາງ ເພື່ອຄວາມປອດໄພຂອງແມ່ ແລະ ເດັກ.",
    zh: "为了母婴安全，通常不允许旅行。",
  },

  // Infants Sections
  catInfants: { en: "Infants", lo: "ແອນ້ອຍ (Infants)", zh: "婴儿" },
  infantGeneral: {
    en: "Infants are generally allowed to travel after 7 days of birth.",
    lo: "ອະນຸຍາດໃຫ້ເດີນທາງໄດ້ ຫຼັງຈາກເກີດໄດ້ 7 ວັນຂຶ້ນໄປ.",
    zh: "出生 7 天后允许旅行。",
  },
  infantAirlines: {
    en: "Different airlines may have specific rules. Please check with your carrier.",
    lo: "ແຕ່ລະສາຍການບິນອາດມີລະບຽບສະເພາະ. ກະລຸນາກວດສອບກັບສາຍການບິນຄືນ.",
    zh: "不同的航空公司可能有具体规定。请咨询您的承运商。",
  },
  infantTicket: {
    en: "Infants under 2 years old must sit on a guardian's lap.",
    lo: "ເດັກອາຍຸຕ່ຳກວ່າ 2 ປີ ຕ້ອງນັ່ງຢູ່ໃນຕັກຂອງຜູ້ປົກຄອງ.",
    zh: "2 岁以下婴儿须坐在监护人腿上。",
  },
  infantDoc: {
    en: "Birth certificate or passport may be required by the airline.",
    lo: "ຄວນກຽມໃບສູດ ຫຼື ໜັງສືເດີນທາງ ເພື່ອສະແດງຕໍ່ສາຍການບິນ.",
    zh: "航空公司可能要求出示出生证明或护照。",
  },

  // Nursery Room
  nurseryTitle: {
    en: "Nursery & Breastfeeding Room",
    lo: "ຫ້ອງພັກໃຫ້ນົມລູກ ແລະ ປ່ຽນຜ້າອ້ອມ",
    zh: "育婴室及哺乳室",
  },
  nurseryLoc: {
    en: "International Terminal — Arrival and Departure Zones",
    lo: "ອາຄານຜູ້ໂດຍສານສາກົນ - ເຂດຂາເຂົ້າ ແລະ ຂາອອກ",
    zh: "国际航站楼 — 到达及出发区域",
  },
  nurseryDesc: {
    en: "Private and comfortable spaces are available for mothers to breastfeed or change diapers.",
    lo: "ພວກເຮົາມີພື້ນທີ່ສ່ວນຕົວ ແລະ ສະດວກສະບາຍ ໄວ້ບໍລິການສຳລັບຄຸນແມ່ທີ່ຕ້ອງການໃຫ້ນົມລູກ ຫຼື ປ່ຽນຜ້າອ້ອມ.",
    zh: "为母亲提供私密且舒适的哺乳或更换尿布的空间。",
  },

  // Tips
  tipsTitle: { en: "Travel Tips", lo: "ຂໍ້ແນະນຳເພີ່ມເຕີມ", zh: "旅行建议" },
  tip1: {
    en: "Consult your doctor before booking, especially in the third trimester.",
    lo: "ຄວນປຶກສາທ່ານໝໍກ່ອນຈອງຖ້ຽວບິນ ໂດຍສະເພາະໄລຍະໃກ້ເກີດ.",
    zh: "订票前请咨询医生，尤其是在妊娠晚期。",
  },
  tip2: {
    en: "Carry medical documents and prescriptions in your hand luggage.",
    lo: "ພົກພາເອກະສານທາງການແພດ ແລະ ຢາປະຈຳໂຕ ໄວ້ໃນກະເປົ໋າຖືຂຶ້ນເຄື່ອງ.",
    zh: "将医疗文件和处方放在随身行李中。",
  },
  tip3: {
    en: "Arrive early for check-in and security procedures.",
    lo: "ຄວນມາຮອດສະໜາມບິນໄວຂຶ້ນ ເພື່ອຄວາມສະດວກໃນການເຊັກອິນ.",
    zh: "提前到达以便办理值机和安检。",
  },
  tip4: {
    en: "Stay hydrated and move around periodically during long flights.",
    lo: "ດື່ມນ້ຳໃຫ້ພຽງພໍ ແລະ ປ່ຽນທ່າທາງ ຫຼື ຍ່າງຢຽດຂາເປັນໄລຍະ.",
    zh: "保持水分并定期在舱内走动。",
  },
} as const;

export type PregnancyGuidelineKey = keyof typeof pregnancyGuideline;

export const tPregnancyGuideline = (k: PregnancyGuidelineKey, lang: Lang) =>
  pregnancyGuideline[k][lang] ?? pregnancyGuideline[k].en;
