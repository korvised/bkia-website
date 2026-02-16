import type { Lang } from "@/types/language";

export const pregnancyGuideline = {
  // Page Header
  categoryLabel: {
    en: "Custom Services",
    lo: "ບໍລິການພິເສດ",
    zh: "定制服务",
  },
  title: {
    en: "Guidelines for Pregnant Women and Infants Traveling by Air",
    lo: "ຄຳແນະນຳສຳລັບແມ່ຍິງຖືພາ ແລະ ເດັກອ່ອນ ທີ່ເດີນທາງທາງອາກາດ",
    zh: "孕妇及婴儿乘机指南",
  },
  subtitle: {
    en: "Accompanied by Pregnant Women and Infants or Children",
    lo: "ການບໍລິການສຳລັບແມ່ຍິງຖືພາ, ເດັກອ່ອນ ຫຼື ເດັກນ້ອຍ",
    zh: "孕妇、婴儿或儿童陪同服务",
  },
  disclaimer: {
    en: "The information on this page is for reference only. Please verify with the relevant airline, agency, or facility for accurate information.",
    lo: "ຂໍ້ມູນໃນໜ້ານີ້ແມ່ນເພື່ອເປັນການອ້າງອີງເທົ່ານັ້ນ. ກະລຸນາກວດສອບກັບສາຍການບິນ/ຕົວແທນ/ສະຖານທີ່ທີ່ກ່ຽວຂ້ອງ ສຳລັບຂໍ້ມູນທີ່ຖືກຕ້ອງ.",
    zh: "本页信息仅供参考。请与相关航空公司/机构/设施核实准确信息。",
  },

  // Table Headers
  colCategory: { en: "Category", lo: "ປະເພດ", zh: "类别" },
  colInfo: { en: "Information", lo: "ຂໍ້ມູນລາຍລະອຽດ", zh: "信息" },

  // Pregnant Women
  catPregnant: { en: "Pregnant Women", lo: "ແມ່ຍິງຖືພາ", zh: "孕妇" },
  pregUnder32: {
    en: "Less than 32 weeks pregnant (less than 8 months)",
    lo: "ອາຍຸການຖືພາໜ້ອຍກວ່າ 32 ສັບປະດາ (ໜ້ອຍກວ່າ 8 ເດືອນ)",
    zh: "怀孕未满 32 周（不满 8 个月）",
  },
  pregUnder32Info: {
    en: "Travel is generally allowed unless advised against air travel by a physician.",
    lo: "ໂດຍທົ່ວໄປແລ້ວແມ່ນອະນຸຍາດໃຫ້ເດີນທາງໄດ້ ນອກຈາກມີຄຳແນະນຳຫ້າມຈາກທ່ານໝໍ.",
    zh: "通常允许旅行，除非医生建议不要进行空中旅行。",
  },
  preg32to36: {
    en: "Between 32 and 36 weeks pregnant",
    lo: "ອາຍຸການຖືພາລະຫວ່າງ 32 ຫາ 36 ສັບປະດາ",
    zh: "怀孕 32 至 36 周之间",
  },
  preg32to36Info: {
    en: "A medical certificate and a letter of consent from an obstetrician, issued within 7 days before the flight, must be submitted.",
    lo: "ຕ້ອງຍື່ນໃບຢັ້ງຢືນການແພດ ແລະ ໜັງສືຍິນຍອມຈາກທ່ານໝໍສູຕິ-ນາລີເວດ ທີ່ອອກໃຫ້ພາຍໃນ 7 ວັນກ່ອນມື້ເດີນທາງ.",
    zh: "必须提交由产科医生在航前 7 天内签发的医疗证明和同意书。",
  },
  pregOver36: {
    en: "36 weeks or more (9 months or more, or 32 weeks for multiple pregnancies)",
    lo: "ອາຍຸການຖືພາ 36 ສັບປະດາຂຶ້ນໄປ (9 ເດືອນຂຶ້ນໄປ, ຫຼື 32 ສັບປະດາສຳລັບການຖືພາລູກແຝດ)",
    zh: "怀孕 36 周或以上（9 个月或以上，多胞胎则为 32 周）",
  },
  pregOver36Info: {
    en: "Travel is generally not allowed for full-term pregnancies to ensure the safety of both the passenger and the flight.",
    lo: "ໂດຍທົ່ວໄປແມ່ນບໍ່ອະນຸຍາດໃຫ້ເດີນທາງ ເພື່ອຄວາມປອດໄພຂອງຜູ້ໂດຍສານ ແລະ ຖ້ຽວບິນ.",
    zh: "为了确保乘客和飞行的安全，足月怀孕通常不允许旅行。",
  },

  // Infants
  catInfants: { en: "Infants", lo: "ເດັກອ່ອນ", zh: "婴儿" },
  infantGeneral: {
    en: "Infants are generally allowed to travel after 7 days of birth.",
    lo: "ໂດຍທົ່ວໄປແລ້ວ ເດັກອ່ອນແມ່ນອະນຸຍາດໃຫ້ເດີນທາງໄດ້ ຫຼັງຈາກເກີດໄດ້ 7 ວັນ.",
    zh: "婴儿出生 7 天后通常允许旅行。",
  },
  infantAirlines: {
    en: "Different airlines may have specific rules regarding international and domestic flights. Please check directly with your carrier.",
    lo: "ແຕ່ລະສາຍການບິນອາດມີລະບຽບການສະເພາະສຳລັບຖ້ຽວບິນພາຍໃນ ແລະ ຕ່າງປະເທດ. ກະລຸນາກວດສອບກັບສາຍການບິນທີ່ທ່ານໃຊ້ບໍລິການ.",
    zh: "不同的航空公司对国际和国内航班可能有具体的规定。请直接向您的承运商查询。",
  },
  infantTicket: {
    en: "Infants under 2 years old do not require a separate seat but must sit on a guardian's lap.",
    lo: "ເດັກອ່ອນອາຍຸຕ່ຳກວ່າ 2 ປີ ບໍ່ຕ້ອງການບ່ອນນັ່ງແຍກຕ່າງຫາກ ແຕ່ຕ້ອງນັ່ງຢູ່ໃນຕັກຜູ້ປົກຄອງ.",
    zh: "2 岁以下婴儿无需单独座位，但须坐在监护人腿上。",
  },
  infantDoc: {
    en: "A birth certificate or passport may be required. Please check with your airline before departure.",
    lo: "ອາດຕ້ອງການໃບສູດ ຫຼື ໜັງສືເດີນທາງ. ກະລຸນາກວດສອບກັບສາຍການບິນກ່ອນການເດີນທາງ.",
    zh: "可能需要出生证明或护照。请在出发前与航空公司确认。",
  },

  // Nursery / Breastfeeding Room
  nurseryTitle: {
    en: "Nursery & Breastfeeding Room",
    lo: "ຫ້ອງພັກໃຫ້ນົມລູກ ແລະ ປ່ຽນຜ້າອ້ອມ",
    zh: "育婴室及哺乳室",
  },
  nurseryLoc: {
    en: "Location: International Terminal — Arrival and Departure Zones",
    lo: "ສະຖານທີ່: ອາຄານຜູ້ໂດຍສານສາກົນ - ເຂດຜູ້ໂດຍສານຂາເຂົ້າ ແລະ ຂາອອກ",
    zh: "地点：国际航站楼 — 到达及出发区域",
  },
  nurseryDesc: {
    en: "Private and comfortable spaces are available for mothers to breastfeed or change diapers.",
    lo: "ພວກເຮົາມີພື້ນທີ່ສ່ວນຕົວ ແລະ ສະດວກສະບາຍ ໄວ້ບໍລິການສຳລັບຄຸນແມ່ທີ່ຕ້ອງການໃຫ້ນົມລູກ ຫຼື ປ່ຽນຜ້າອ້ອມ.",
    zh: "为母亲提供私密且舒适的哺乳或更换尿布的空间。",
  },

  // Tips
  tipsTitle: {
    en: "Travel Tips",
    lo: "ຄຳແນະນຳການເດີນທາງ",
    zh: "旅行建议",
  },
  tip1: {
    en: "Consult your doctor before booking flights, especially in the third trimester.",
    lo: "ປຶກສາທ່ານໝໍກ່ອນຈອງຕົ໋ວ ໂດຍສະເພາະໃນໄຕມາດທີສາມ.",
    zh: "订票前请咨询医生，尤其是在妊娠晚期。",
  },
  tip2: {
    en: "Carry all medical documents and prescriptions in your hand luggage.",
    lo: "ພົກເອົາເອກະສານທາງການແພດ ແລະ ໃບສັ່ງຢາທຸກຢ່າງໄວ້ໃນກະເປົ໋າຖືຂຶ້ນຍົນ.",
    zh: "将所有医疗文件和处方放在手提行李中随身携带。",
  },
  tip3: {
    en: "Arrive early to allow extra time for check-in and security procedures.",
    lo: "ມາຮອດສະໜາມບິນໄວໆ ເພື່ອໃຫ້ມີເວລາພຽງພໍສຳລັບການ Check-in ແລະ ຂັ້ນຕອນຄວາມປອດໄພ.",
    zh: "提前到达，以便有足够时间办理值机和安检手续。",
  },
  tip4: {
    en: "Stay hydrated and move around the cabin periodically during long flights.",
    lo: "ດື່ມນ້ຳໃຫ້ພຽງພໍ ແລະ ເດີນເຊາະໃນຫ້ອງໂດຍສານເປັນໄລຍະ ສຳລັບຖ້ຽວບິນໄລຍະໄກ.",
    zh: "长途飞行期间保持水分并定期在客舱内走动。",
  },

  backButton: {
    en: "All Custom Services",
    lo: "ບໍລິການພິເສດທັງໝົດ",
    zh: "全部定制服务",
  },
} as const;

export type PregnancyGuidelineKey = keyof typeof pregnancyGuideline;

export const tPregnancyGuideline = (k: PregnancyGuidelineKey, lang: Lang) =>
  pregnancyGuideline[k][lang] ?? pregnancyGuideline[k].en;
