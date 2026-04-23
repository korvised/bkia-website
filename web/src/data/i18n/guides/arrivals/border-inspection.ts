import type { Lang } from "@/types/language";

export const borderInspection = {
  title: {
    en: "Immigration / Border Control",
    lo: "ດ່ານກວດຄົນເຂົ້າ-ອອກເມືອງ (ຂາເຂົ້າ)",
    zh: "边检（入境）",
  },
  intro: {
    en: "All international passengers must clear immigration at Bokeo International Airport. Present your passport and official digital QR code at the immigration counter. Lao citizens and foreign nationals use separate queues.",
    lo: "ຜູ້ໂດຍສານສາກົນທັງໝົດ ຕ້ອງຜ່ານຂັ້ນຕອນກວດຄົນເຂົ້າ-ອອກ ທີ່ສະໝາມບິນສາກົນບໍ່ແກ້ວ. ຍື່ນໜັງສືຜ່ານແດນ ແລະ ລະຫັດ QR Code ດິຈິຕອລທີ່ເຄົາເຕີ. ພົນລະເມືອງລາວ ແລະ ຕ່າງຊາດ ໃຊ້ຄິວແຍກກັນ.",
    zh: "所有国际旅客须在博胶国际机场通过边检。请向柜台出示护照及官方电子入境二维码。老挝公民与外国公民使用不同队列。",
  },

  // ── Wait Times ───────────────────────────────────────────────────────────

  waitTimeTitle: {
    en: "Estimated Wait Times",
    lo: "ເວລາລໍຖ້າໂດຍປະມານ",
    zh: "预计等待时间",
  },
  waitOffPeakLabel: {
    en: "Off-peak hours",
    lo: "ຊ່ວງເວລາທົ່ວໄປ",
    zh: "非高峰时段",
  },
  waitOffPeakValue: { en: "5–15 min", lo: "5–15 ນາທີ", zh: "5–15 分钟" },
  waitPeakLabel: {
    en: "Peak hours (multiple arrivals)",
    lo: "ຊ່ວງທີ່ມີຫຼາຍຖ້ຽວ",
    zh: "高峰时段（多航班到达）",
  },
  waitPeakValue: { en: "15–45 min", lo: "15–45 ນາທີ", zh: "15–45 分钟" },
  waitAdvice: {
    en: "Have all documents and LDIF QR Code ready before reaching the counter",
    lo: "ກຽມເອກະສານ ແລະ QR Code (LDIF) ໃຫ້ພ້ອມ ກ່ອນໄປຮອດເຄົາເຕີ",
    zh: "到达柜台前请备好所有证件及 LDIF 二维码",
  },

  // ── LDIF Digital Form ────────────────────────────────────────────────────

  ldifTitle: {
    en: "Lao Digital Immigration Form (LDIF)",
    lo: "ແບບຟອມດີຈີຕອນ (LDIF)",
    zh: "老挝数字移民表格 (LDIF)",
  },
  ldifDesc: {
    en: "The Lao government has moved to a paperless system at international airports. All passengers except Lao nationals must complete this form online before travel.",
    lo: "ລັດຖະບານລາວໄດ້ປ່ຽນມາໃຊ້ລະບົບບໍ່ໃຊ້ເຈ້ຍ. ຜູ້ໂດຍສານທຸກຄົນ ຍົກເວັ້ນ ຄົນລາວ ຕ້ອງຕື່ມຟອມອອນລາຍ ກ່ອນການເດີນທາງ.",
    zh: "老挝政府已推行国际机场无纸化系统。除老挝公民外，所有旅客须在出行前在线填写此表格。",
  },
  ldifWhoLabel: { en: "Who", lo: "ຜູ້ທີ່ຕ້ອງເຮັດ", zh: "适用人群" },
  ldifWhoDesc: {
    en: "All passengers except Lao nationals",
    lo: "ທຸກຄົນ ຍົກເວັ້ນ ຄົນລາວ",
    zh: "除老挝公民外的所有旅客",
  },
  ldifTimingLabel: { en: "When", lo: "ເວລາ", zh: "时间" },
  ldifTimingDesc: {
    en: "Within 72 hours before arrival or departure",
    lo: "ພາຍໃນ 72 ຊົ່ວໂມງ ກ່ອນການເດີນທາງ",
    zh: "抵达或出发前72小时内",
  },
  ldifRequirementLabel: { en: "Requirement", lo: "ສິ່ງທີ່ຕ້ອງກຽມ", zh: "要求" },
  ldifRequirementDesc: {
    en: "Present the QR Code on your phone or as a printout to the immigration officer",
    lo: "ສະແດງ QR Code ໃນໂທລະສັບ ຫຼື ໃບພິມ ຕໍ່ເຈົ້າໜ້າທີ່",
    zh: "向移民官员出示手机或打印的二维码",
  },

  // ── Visa Categories ──────────────────────────────────────────────────────

  visaCategoriesTitle: {
    en: "Visa Categories",
    lo: "ປະເພດວີຊ່າ",
    zh: "签证类别",
  },
  visaCategoriesDesc: {
    en: "Most foreign nationals require a visa to enter Lao PDR. Choose the category that matches your purpose of travel.",
    lo: "ຄົນຕ່າງຊາດສ່ວນໃຫຍ່ ຕ້ອງມີວີຊ່າ ເພື່ອເຂົ້າ ສປປ ລາວ. ເລືອກປະເພດທີ່ກົງກັບຈຸດປະສົງການເດີນທາງ.",
    zh: "大多数外国公民进入老挝需要签证业务。请根据您的出行目的选择相应类别。",
  },

  visaTouristCode: { en: "T-B3", lo: "T-B3", zh: "T-B3" },
  visaTouristName: { en: "Tourist Visa", lo: "ວີຊ່າທ່ອງທ່ຽວ", zh: "旅游签证" },
  visaTouristDesc: {
    en: "Leisure travel — up to 30 days, extendable",
    lo: "ທ່ອງທ່ຽວ — ສູງສຸດ 30 ວັນ, ຕໍ່ອາຍຸໄດ້",
    zh: "休闲旅游 — 最多30天，可延期",
  },

  visaBusinessCode: { en: "NI-B2", lo: "NI-B2", zh: "NI-B2" },
  visaBusinessName: { en: "Business Visa", lo: "ວີຊ່າທຸລະກິດ", zh: "商务签证" },
  visaBusinessDesc: {
    en: "For business people and investors",
    lo: "ສຳລັບນັກທຸລະກິດ ແລະ ນັກລົງທຶນ",
    zh: "商务人士及投资者",
  },

  visaLaborCode: { en: "LA-B2", lo: "LA-B2", zh: "LA-B2" },
  visaLaborName: { en: "Labor Visa", lo: "ວີຊ່າແຮງງານ", zh: "劳务签证" },
  visaLaborDesc: {
    en: "Authorized foreign workers and their families",
    lo: "ແຮງງານຕ່າງຊາດ ແລະ ຄອບຄົວທີ່ໄດ້ຮັບອະນຸຍາດ",
    zh: "获授权外籍工人及家属",
  },

  visaDiplomaticCode: {
    en: "S-A2 / D-A1",
    lo: "S-A2 / D-A1",
    zh: "S-A2 / D-A1",
  },
  visaDiplomaticName: {
    en: "Official / Diplomatic",
    lo: "ລັດຖະການ / ການທູດ",
    zh: "公务 / 外交",
  },
  visaDiplomaticDesc: {
    en: "Diplomats and administrative-technical mission staff",
    lo: "ນັກການທູດ ແລະ ພະນັກງານຄະນະທູດ",
    zh: "外交官及使馆行政技术人员",
  },

  visaExpertCode: { en: "E-B2", lo: "E-B2", zh: "E-B2" },
  visaExpertName: { en: "Expert Visa", lo: "ວີຊ່າຜູ້ຊ່ຽວຊານ", zh: "专家签证" },
  visaExpertDesc: {
    en: "Specialists, technicians, and NGO staff",
    lo: "ຜູ້ຊ່ຽວຊານ, ຊ່າງເຕັກນິກ ແລະ ພະນັກງານ NGO",
    zh: "专家、技术人员及非政府组织人员",
  },

  visaTransitCode: { en: "TR-B3", lo: "TR-B3", zh: "TR-B3" },
  visaTransitName: { en: "Transit Visa", lo: "ວີຊ່າຜ່ານທາງ", zh: "过境签证" },
  visaTransitDesc: {
    en: "Passing through Laos to a third country — onward travel proof required",
    lo: "ຜ່ານລາວໄປປະເທດທີ່ສາມ — ຕ້ອງມີໃບຢືນຢັນການເດີນທາງຕໍ່",
    zh: "途径老挝前往第三国 — 需提供续程证明",
  },

  visaExemptionLabel: {
    en: "Visa Exemption",
    lo: "ການຍົກເວັ້ນວີຊ່າ",
    zh: "免签政策",
  },
  visaExemptionDesc: {
    en: "Certain nationalities are exempt under bilateral or unilateral agreements. Check the official immigration website for the current exemption list.",
    lo: "ບາງສັນຊາດໄດ້ຮັບການຍົກເວັ້ນ ຕາມຂໍ້ຕົກລົງທະວິພາຄີ. ກວດສອບລາຍຊື່ຢູ່ເວັບໄຊ ຕມ ທາງການ.",
    zh: "部分国籍依据双边或单边协议享有免签待遇。请查阅老挝移民局官方网站获取最新免签名单。",
  },

  // ── How to Obtain ────────────────────────────────────────────────────────

  obtainTitle: {
    en: "How to Get Your Visa",
    lo: "ວິທີຂໍວີຊ່າ",
    zh: "如何办理签证",
  },
  obtainVoaLabel: { en: "Visa on Arrival", lo: "ວີຊ່າກັບດ່ານ", zh: "落地签" },
  obtainVoaDesc: {
    en: "Available at Bokeo International Airport for eligible nationalities. Bring passport photos and USD cash for the fee.",
    lo: "ມີຢູ່ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ ສຳລັບສັນຊາດທີ່ມີສິດ. ກຽມຮູບ ແລະ ເງິນ USD.",
    zh: "博胶国际机场为符合条件的国籍提供。请准备护照照片和美元现金支付签证费。",
  },
  obtainEvisaLabel: {
    en: "E-Visa (Online)",
    lo: "E-Visa (ອອນລາຍ)",
    zh: "电子签证（在线）",
  },
  obtainEvisaDesc: {
    en: "Apply online before your flight via the official government portal.",
    lo: "ຍື່ນຄຳຮ້ອງອອນລາຍ ກ່ອນຂຶ້ນເຄື່ອງ ທາງເວັບໄຊທາງການ.",
    zh: "在登机前通过官方门户网站在线申请。",
  },
  obtainEvisaNote: {
    en: 'Select "Bokeo International Airport" as your port of entry',
    lo: 'ເລືອກ "ສະໜາມບິນສາກົນບໍ່ແກ້ວ" ເປັນດ່ານເຂົ້າ',
    zh: '选择"博胶国际机场"作为入境口岸',
  },
  obtainEmbassyLabel: {
    en: "Embassy / Consulate",
    lo: "ສະຖານທູດ / ກົງສຸນ",
    zh: "大使馆 / 领事馆",
  },
  obtainEmbassyDesc: {
    en: "Apply at a Lao diplomatic mission in your home country. Recommended for long-term or specific work visas.",
    lo: "ຍື່ນຢູ່ສະຖານທູດລາວໃນປະເທດຕົ້ນທາງ. ແນະນຳ ສຳລັບວີຊ່າແຮງງານ ຫຼື ໄລຍະຍາວ.",
    zh: "在所在国老挝外交使团申请。推荐用于劳务或长期签证。",
  },

  // ── Required Documents ───────────────────────────────────────────────────

  documentsTitle: {
    en: "Required Documents",
    lo: "ເອກະສານທີ່ຕ້ອງກຽມ",
    zh: "所需证件",
  },
  laoCitizensTitle: { en: "Lao Citizens", lo: "ພົນລະເມືອງລາວ", zh: "老挝公民" },
  laoDoc1: {
    en: "Valid Lao passport",
    lo: "ໜັງສືຜ່ານແດນລາວທີ່ຍັງບໍ່ໝົດອາຍຸ",
    zh: "有效老挝护照",
  },
  laoDoc2: {
    en: "Completed LDIF (if traveling internationally)",
    lo: "ໃບ LDIF ທີ່ຕື່ມຄົບ (ຖ້າເດີນທາງໄປຕ່າງປະເທດ)",
    zh: "填写完整的 LDIF（如涉及国际旅行）",
  },
  laoDoc3: {
    en: "No visa required for Lao nationals",
    lo: "ພົນລະເມືອງລາວ ບໍ່ຕ້ອງໃຊ້ວີຊ່າ",
    zh: "老挝公民无需签证",
  },

  foreignNationalsTitle: {
    en: "Foreign Nationals",
    lo: "ຄົນຕ່າງປະເທດ",
    zh: "外国公民",
  },
  foreignDoc1: {
    en: "Valid passport (6+ months validity)",
    lo: "ໜັງສືຜ່ານແດນ (ອາຍຸ 6 ເດືອນຂຶ້ນໄປ)",
    zh: "有效护照（有效期6个月以上）",
  },
  foreignDoc2: {
    en: "Valid Lao visa or visa exemption",
    lo: "ວີຊ່າລາວທີ່ຍັງໃຊ້ໄດ້ ຫຼື ການຍົກເວັ້ນວີຊ່າ",
    zh: "有效老挝签证或免签文件",
  },
  foreignDoc3: {
    en: "Mandatory LDIF QR Code",
    lo: "ລະຫັດ QR Code ຈາກລະບົບ LDIF",
    zh: "强制性 LDIF 二维码",
  },
  foreignDoc4: {
    en: "Return / onward ticket (may be checked)",
    lo: "ປີ້ເຮືອບິນຂາກັບ ຫຼື ໄປຕໍ່ (ອາດຖືກກວດ)",
    zh: "回程 / 续程机票（可能被检查）",
  },

  // ── Official Disclaimer ───────────────────────────────────────────────────

  disclaimerTitle: {
    en: "Official Notice",
    lo: "ແຈ້ງການທາງການ",
    zh: "官方声明",
  },
  disclaimerDesc: {
    en: "Immigration regulations, entry requirements, and fees are subject to change by the Lao government without prior notice. For the most up-to-date information, always refer to the official portal.",
    lo: "ກົດລະບຽບ ຕມ, ຂໍ້ກຳນົດການເຂົ້າ ແລະ ຄ່າທຳນຽມ ອາດປ່ຽນແປງໂດຍບໍ່ແຈ້ງລ່ວງໜ້າ. ກວດສອບຂໍ້ມູນຫຼ້າສຸດ ທີ່ເວັບໄຊທາງການ.",
    zh: "移民法规、入境要求和费用可能随时变更，恕不另行通知。如需最新信息，请随时查阅官方门户网站。",
  },
  disclaimerLinkText: {
    en: "immigration.gov.la",
    lo: "immigration.gov.la",
    zh: "immigration.gov.la",
  },
} as const;

export type BorderInspectionKey = keyof typeof borderInspection;

export const tBorderInspection = (k: BorderInspectionKey, lang: Lang) =>
  borderInspection[k][lang] ?? borderInspection[k].en;
