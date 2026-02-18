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
    en: "Travel requirements and facilities",
    lo: "ຂໍ້ກຳນົດ ແລະ ສິ່ງອຳນວຍຄວາມສະດວກ",
    zh: "出行要求及设施",
  },
  disclaimer: {
    en: "The information on this page is for reference only. Please verify with the relevant airline or agency for accurate information.",
    lo: "ຂໍ້ມູນໃນໜ້ານີ້ແມ່ນເພື່ອເປັນການອ້າງອີງເທົ່ານັ້ນ. ກະລຸນາກວດສອບກັບສາຍການບິນ ຫຼື ຕົວແທນຈຳໜ່າຍສຳລັບຂໍ້ມູນທີ່ຖືກຕ້ອງ.",
    zh: "本页信息仅供参考。请与相关航空公司或机构核实准确信息。",
  },

  // Pregnant Women Sections
  catPregnant: { en: "Pregnant Women", lo: "ແມ່ຍິງຖືພາ", zh: "孕妇" },

  // 28 Weeks and below
  pregUpTo28: {
    en: "Up to 28 weeks pregnant",
    lo: "ໄລຍະການຖືພາ 28 ອາທິດລົງມາ",
    zh: "怀孕 28 周或以下",
  },
  pregUpTo28Info: {
    en: "A medical certificate from a doctor is required.",
    lo: "ຕ້ອງມີໃບຢັ້ງຢືນຈາກທາງໝໍ.",
    zh: "须出具医生证明。",
  },

  // 29 to 32 Weeks
  preg29To32: {
    en: "Between 29 and 32 weeks",
    lo: "ໄລຍະການຖືພາ 29 ຫາ 32 ອາທິດ",
    zh: "怀孕 29 至 32 周之间",
  },
  preg29To32Info: {
    en: "Single pregnancy is accepted with a medical certificate. Multiple pregnancy (twins) is also accepted but must have a doctor's certificate confirming fitness to fly.",
    lo: "ກໍລະນີລູກຄົນດຽວແມ່ນສາມາດເດີນທາງໄດ້ແຕ່ຕ້ອງມີໃບຢັ້ງຢືນຈາກທ່ານໝໍ. ສຳລັບລູກແຝດກໍສາມາດເດີນທາງໄດ້ເຊັ່ນກັນ ແຕ່ຕ້ອງມີໃບຮັບຮອງແພດຢັ້ງຢືນວ່າສາມາດເດີນທາງດ້ວຍເຮືອບິນໄດ້.",
    zh: "单胎凭医生证明可乘机。多胎（双胞胎）亦可乘机，ແຕ່须凭医生出具的适宜乘机医疗证明。",
  },

  // 33 to 35 Weeks
  preg33To35: {
    en: "Between 33 and 35 weeks",
    lo: "ໄລຍະການຖືພາ 33 ຫາ 35 ອາທິດ",
    zh: "怀孕 33 至 35 周之间",
  },
  preg33To35Info: {
    en: "Single pregnancy is accepted with a doctor's certificate confirming fitness to fly. Multiple pregnancy (twins) is not allowed to fly and the airline reserves the right to refuse carriage.",
    lo: "ກໍລະນີລູກຄົນດຽວສາມາດເດີນທາງໄດ້ແຕ່ຕ້ອງມີໃບຮັບຮອງແພດຢັ້ງຢືນວ່າສາມາດເດີນທາງດ້ວຍເຮືອບິນໄດ້. ສ່ວນລູກແຝດແມ່ນບໍ່ສາມາດຂຶ້ນເຮືອບິນໄດ້ ເຊິ່ງສາຍການບິນມີສິດປະຕິເສດການເດີນທາງ.",
    zh: "单胎须凭医生出具的适宜乘机医疗证明。多胎（双胞胎）不允许乘机，航空公司有权拒绝承运。",
  },

  // Additional Requirements
  additionalReqTitle: {
    en: "Additional Conditions",
    lo: "ເງື່ອນໄຂເພີ່ມເຕີມ",
    zh: "其他条件",
  },
  additionalReqList: {
    en: "• Confirmation of normal pregnancy with no complications\n• Must specify Expected Date of Delivery (EDD)\n• Medical certificate must include date, official stamp, and doctor's contact details.",
    lo: "• ມີການຢັນຢືນການຖືພາວ່າເປັນການຖືພາຕາມປົກກະຕິ ບໍ່ມີພາວະແຊກຊ້ອນ\n• ຕ້ອງມີການກຳນົດເກີດ (EDD)\n• ໃບຮັບຮອງທາງການແພດປະກອບມີ: ວັນທີ, ກາຈ້ຳ ແລະ ລາຍລະອຽດການຕິດຕໍ່ທີ່ເໝາະສົມຈາກທ່ານໝໍ",
    zh: "• 确认怀孕正常且无并发症\n• 必须注明预产期 (EDD)\n• 医疗证明必须包含日期、官方公章及医生的详细联系方式。",
  },

  // Infants Sections (Kept consistent with previous update)
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
    lo: "ຄວນກຽມໃບແຈ້ງເກີດ ຫຼື ໜັງສືເດີນທາງ ເພື່ອສະແດງຕໍ່ສາຍການບິນ.",
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
