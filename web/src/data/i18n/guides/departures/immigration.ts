import type { Lang } from "@/types/language";

export const immigration = {
  title: {
    en: "Immigration / Border Control (Departure)",
    lo: "ດ່ານກວດຄົນເຂົ້າ-ອອກເມືອງ (ຂາອອກ)",
    zh: "边检（离境）",
  },
  intro: {
    en: "Before proceeding to the departure lounge, all passengers must clear immigration. Have your documents and LDIF QR Code ready before reaching the counter.",
    lo: "ກ່ອນໄປຫ້ອງໂດຍສານຂາອອກ, ທຸກຄົນຕ້ອງຜ່ານດ່ານ ຕມ. ກະລຸນາກຽມເອກະສານ ແລະ QR Code (LDIF) ໃຫ້ພ້ອມກ່ອນໄປຮອດເຄົາເຕີ.",
    zh: "前往候机厅前，所有旅客须通过边检。请在到达柜台前备好证件和 LDIF 二维码。",
  },

  // ── LDIF Digital Form ────────────────────────────────────────────────────

  ldifTitle: {
    en: "Lao Digital Immigration Form (LDIF)",
    lo: "ແບບຟອມດີຈີຕອນ (LDIF)",
    zh: "老挝数字移民表格 (LDIF)",
  },
  ldifDesc: {
    en: "The Lao government has moved to a paperless system at international airports. All passengers except Lao nationals must register their departure online before travel.",
    lo: "ລັດຖະບານລາວໄດ້ປ່ຽນມາໃຊ້ລະບົບບໍ່ໃຊ້ເຈ້ຍ. ຜູ້ໂດຍສານທຸກຄົນ ຍົກເວັ້ນ ຄົນລາວ ຕ້ອງລົງທະບຽນຂາອອກທາງອອນລາຍກ່ອນການເດີນທາງ.",
    zh: "老挝政府已在国际机场推行无纸化系统。除老挝公民外，所有旅客须在出行前在线登记出境。",
  },
  ldifWhoLabel: { en: "Who", lo: "ຜູ້ທີ່ຕ້ອງເຮັດ", zh: "适用人群" },
  ldifWhoDesc: {
    en: "All passengers except Lao nationals",
    lo: "ທຸກຄົນ ຍົກເວັ້ນ ຄົນລາວ",
    zh: "除老挝公民外的所有旅客",
  },
  ldifTimingLabel: { en: "When", lo: "ເວລາ", zh: "时间" },
  ldifTimingDesc: {
    en: "Within 72 hours before your scheduled departure",
    lo: "ພາຍໃນ 72 ຊົ່ວໂມງ ກ່ອນເວລາອອກເດີນທາງ",
    zh: "计划出发前 72 小时内",
  },
  ldifRequirementLabel: { en: "Requirement", lo: "ສິ່ງທີ່ຕ້ອງກຽມ", zh: "要求" },
  ldifRequirementDesc: {
    en: "Present the QR Code on your phone or as a printout to the immigration officer",
    lo: "ສະແດງ QR Code ໃນໂທລະສັບ ຫຼື ໃບພິມ ຕໍ່ເຈົ້າໜ້າທີ່",
    zh: "向移民官员出示手机或打印的二维码",
  },

  // ── Required Documents ───────────────────────────────────────────────────

  documentsTitle: {
    en: "Required Documents",
    lo: "ເອກະສານທີ່ຕ້ອງກຽມ",
    zh: "所需证件",
  },

  laoNationalsTitle: {
    en: "Lao Nationals",
    lo: "ພົນລະເມືອງລາວ",
    zh: "老挝公民",
  },
  laoDoc1: {
    en: "Valid Lao passport",
    lo: "ໜັງສືຜ່ານແດນລາວທີ່ຍັງບໍ່ໝົດອາຍຸ",
    zh: "有效老挝护照",
  },
  laoDoc2: {
    en: "Boarding pass",
    lo: "ປີ້ຂຶ້ນເຮືອບິນ (Boarding Pass)",
    zh: "登机牌",
  },
  laoDoc3: {
    en: "No LDIF required for Lao nationals",
    lo: "ຄົນລາວ ບໍ່ຕ້ອງເຮັດ LDIF",
    zh: "老挝公民无需填写 LDIF",
  },

  foreignersTitle: {
    en: "Foreign Nationals",
    lo: "ຄົນຕ່າງປະເທດ",
    zh: "外国公民",
  },
  foreignDoc1: {
    en: "Valid passport (6+ months validity)",
    lo: "ໜັງສືຜ່ານແດນ (ອາຍຸ 6 ເດືອນຂຶ້ນໄປ)",
    zh: "有效护照（有效期 6 个月以上）",
  },
  foreignDoc2: {
    en: "Boarding pass",
    lo: "ບັດຂຶ້ນເຄື່ອງ (Boarding Pass)",
    zh: "登机牌",
  },
  foreignDoc3: {
    en: "Mandatory LDIF QR Code",
    lo: "ລະຫັດ QR Code ຈາກລະບົບ LDIF",
    zh: "强制性 LDIF 二维码",
  },
  foreignDoc4: {
    en: "Valid visa / stay permit",
    lo: "ວີຊ່າ ຫຼື ໃບອະນຸຍາດພັກ ທີ່ຍັງໃຊ້ໄດ້",
    zh: "有效签证 / 居留许可",
  },

  // ── Departure Procedures ─────────────────────────────────────────────────

  processTitle: {
    en: "Departure Procedures",
    lo: "ຂັ້ນຕອນການອອກເດີນທາງ",
    zh: "出境流程",
  },
  step1Label: { en: "Check-in First", lo: "ແຈ້ງປີ້ກ່ອນ", zh: "先办理值机" },
  step1Desc: {
    en: "Obtain your boarding pass from the airline check-in counter before approaching immigration",
    lo: "ຮັບບັດຂຶ້ນເຮືອບິນຈາກເຄົາເຕີແຈ້ງປີ້ສາຍການບິນ ກ່ອນໄປດ່ານ ຕມ",
    zh: "前往边检前先在航空公司值机柜台领取登机牌",
  },
  step2Label: { en: "Join the Queue", lo: "ລຽນແຖວ", zh: "排队等候" },
  step2Desc: {
    en: "Join the appropriate lane — Lao Nationals or Foreigners",
    lo: "ລຽນແຖວຄິວທີ່ຖືກຕ້ອງ — ຄົນລາວ ຫຼື ຄົນຕ່າງປະເທດ",
    zh: "按类别排队 — 老挝公民或外国公民通道",
  },
  step3Label: { en: "Verification", lo: "ກວດສອບ", zh: "证件核验" },
  step3Desc: {
    en: "Present your passport, boarding pass, and LDIF QR Code. The officer may perform a face scan",
    lo: "ສະແດງໜັງສືຜ່ານແດນ, ບັດຂຶ້ນເຄື່ອງ, ແລະ QR Code. ເຈົ້າໜ້າທີ່ ອາດສະແກນໃບໜ້າ",
    zh: "出示护照、登机牌和二维码，官员可能进行人脸扫描",
  },
  step4Label: {
    en: "Stamp & Proceed",
    lo: "ປະທັບຕາ ແລະ ດຳເນີນຕໍ່",
    zh: "盖章后通行",
  },
  step4Desc: {
    en: "Ensure your passport receives an official departure stamp, then proceed to the Security Screening area",
    lo: "ກວດໃຫ້ແນ່ວ່າໄດ້ຮັບກາປະທັບຕາຂາອອກ, ຈາກນັ້ນໄປຈຸດກວດຄວາມປອດໄພ",
    zh: "确认护照获得出境章后，前往安检区域",
  },

  // ── Rules & Regulations ──────────────────────────────────────────────────

  rulesTitle: {
    en: "Important Rules & Regulations",
    lo: "ກົດລະບຽບ ແລະ ຂໍ້ກຳນົດ",
    zh: "重要规定",
  },
  rule1Label: { en: "Visa Overstay", lo: "ພັກເກີນກຳນົດວີຊ່າ", zh: "签证逾期" },
  rule1Desc: {
    en: "If you have overstayed your visa, you must settle all fines at the immigration office before departure. Fines are calculated daily per Decree No. 21/GoL.",
    lo: "ຖ້າທ່ານຢູ່ເກີນກຳນົດວີຊ່າ, ຕ້ອງຊຳລະຄ່າປັບໃໝຢູ່ຫ້ອງ ຕມ ກ່ອນອອກເດີນທາງ. ຄ່າປັບໃໝໄລ່ເປັນລາຍວັນ ຕາມດຳລັດ 21/ລບ.",
    zh: "若您签证已过期，须在出发前在移民局结清所有罚款。罚款按日计算，依据第 21 号令执行。",
  },
  rule2Label: {
    en: "Currency Declaration",
    lo: "ການແຈ້ງສະກຸນເງິນ",
    zh: "货币申报",
  },
  rule2Desc: {
    en: "Passengers carrying cash (Lao Kip or foreign currency) exceeding $10,000 USD equivalent must declare it to authorities.",
    lo: "ຜູ້ໂດຍສານທີ່ຖືເງິນສົດ (ກີບ ຫຼື ຕ່າງປະເທດ) ເກີນ 10,000 ໂດລາ ຕ້ອງແຈ້ງຕໍ່ເຈົ້າໜ້າທີ່.",
    zh: "携带现金（老挝基普或外币）超过等值 1 万美元的旅客须向当局申报。",
  },
  rule3Label: {
    en: "Prohibited Exports",
    lo: "ສິ່ງຂອງຫ້າມສົ່ງອອກ",
    zh: "禁止出口物品",
  },
  rule3Desc: {
    en: "Exporting Buddha images, antiques, or protected wildlife products without official permits from the Ministry of Information, Culture, and Tourism is strictly prohibited.",
    lo: "ການສົ່ງອອກພະພຸດທະຮູບ, ຂອງໂບຣານ ຫຼື ຜະລິດຕະພັນສັດປ່າທີ່ໄດ້ຮັບການປົກປ້ອງ ໂດຍບໍ່ມີໃບອະນຸຍາດ ແມ່ນຖືກຫ້າມຢ່າງເດັດຂາດ.",
    zh: "未持有文化和旅游部颁发的官方许可，严禁出口佛像、古董或受保护野生动物产品。",
  },

  // ── Official Disclaimer ───────────────────────────────────────────────────

  disclaimerTitle: {
    en: "Official Notice",
    lo: "ແຈ້ງການທາງການ",
    zh: "官方声明",
  },
  disclaimerDesc: {
    en: "Immigration regulations, procedures, and fees are subject to change by the Lao government without prior notice. For the most up-to-date information, always refer to the official portal.",
    lo: "ກົດລະບຽບ ຕມ, ຂັ້ນຕອນ ແລະ ຄ່າທຳນຽມ ອາດປ່ຽນແປງໂດຍລັດຖະບານບໍ່ແຈ້ງລ່ວງໜ້າ. ກວດສອບຂໍ້ມູນຫຼ້າສຸດ ທີ່ເວັບໄຊທາງການ.",
    zh: "移民法规、程序和费用可能随时变更，恕不另行通知。请随时查阅官方门户网站获取最新信息。",
  },
  disclaimerLinkText: {
    en: "immigration.gov.la",
    lo: "immigration.gov.la",
    zh: "immigration.gov.la",
  },
} as const;

export type ImmigrationKey = keyof typeof immigration;

export const tImmigration = (k: ImmigrationKey, lang: Lang) =>
  immigration[k][lang] ?? immigration[k].en;
