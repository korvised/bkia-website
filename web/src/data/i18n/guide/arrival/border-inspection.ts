import type { Lang } from "@/types/language";

export const borderInspection = {
  // Page title
  title: {
    en: "Immigration / Border Control (Arrival)",
    lo: "ການກວດຄົນເຂົ້າ-ອອກເມືອງ (ຂາເຂົ້າ)",
    zh: "边检（入境）",
  },
  intro: {
    en: "All international passengers must clear immigration control at Bokeo International Airport. Present your passport and completed arrival card at the immigration counter. Lao citizens and foreign nationals use separate queues.",
    lo: "ຜູ້ໂດຍສານສາກົນທັງໝົດຕ້ອງຜ່ານການກວດຄົນເຂົ້າ-ອອກເມືອງທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ສະແດງໜັງສືຜ່ານແດນ ແລະ ບັດມາຮອດທີ່ຕື່ມເຮັດແລ້ວຢູ່ເຄົາເຕີກວດຄົນເຂົ້າ-ອອກເມືອງ. ພົນລະເມືອງລາວ ແລະ ຄົນຕ່າງປະເທດໃຊ້ແຖວແຍກກັນ.",
    zh: "所有国际旅客必须在博胶国际机场通过边检。请向边检柜台出示护照和填写完整的入境卡。老挝公民和外国公民使用不同的队列。",
  },

  // Wait time
  waitTimeTitle: {
    en: "⏱️ Estimated Wait Time:",
    lo: "⏱️ ເວລາລໍຖ້າໂດຍປະມານ:",
    zh: "⏱️ 预计等待时间：",
  },
  waitOffPeak: {
    en: "Off-peak hours: 5-15 minutes",
    lo: "ເວລານອກພີກ: 5-15 ນາທີ",
    zh: "非高峰时段：5-15分钟",
  },
  waitPeak: {
    en: "Peak hours (multiple arrivals): 15-45 minutes",
    lo: "ເວລາພີກ (ມີຖ້ຽວບິນຫຼາຍຖ້ຽວມາຮອດ): 15-45 ນາທີ",
    zh: "高峰时段（多个航班到达）：15-45分钟",
  },
  waitAdvice: {
    en: "Have documents ready to expedite processing",
    lo: "ກະກຽມເອກະສານໃຫ້ພ້ອມເພື່ອເລັ່ງການປະມວນຜົນ",
    zh: "请准备好证件以加快处理速度",
  },

  // Required documents
  documentsTitle: {
    en: "Required Documents",
    lo: "ເອກະສານທີ່ຕ້ອງການ",
    zh: "所需证件",
  },
  laoCitizensTitle: {
    en: "Lao Citizens",
    lo: "ພົນລະເມືອງລາວ",
    zh: "老挝公民",
  },
  laoDoc1: {
    en: "Valid Lao passport",
    lo: "ໜັງສືຜ່ານແດນລາວທີ່ຍັງໃຊ້ໄດ້",
    zh: "有效老挝护照",
  },
  laoDoc2: {
    en: "Completed arrival card",
    lo: "ບັດມາຮອດທີ່ຕື່ມເຮັດແລ້ວ",
    zh: "填写完整的入境卡",
  },
  laoDoc3: {
    en: "No visa required for Lao nationals",
    lo: "ບໍ່ຕ້ອງວີຊ່າສຳລັບພົນລະເມືອງລາວ",
    zh: "老挝公民无需签证",
  },

  foreignNationalsTitle: {
    en: "Foreign Nationals",
    lo: "ຄົນຕ່າງປະເທດ",
    zh: "外国公民",
  },
  foreignDoc1: {
    en: "Valid passport (6+ months validity)",
    lo: "ໜັງສືຜ່ານແດນທີ່ຍັງໃຊ້ໄດ້ (ຍັງໃຊ້ໄດ້ 6 ເດືອນຂຶ້ນໄປ)",
    zh: "有效护照（有效期6个月以上）",
  },
  foreignDoc2: {
    en: "Valid Lao visa OR visa exemption",
    lo: "ວີຊ່າລາວທີ່ຍັງໃຊ້ໄດ້ ຫຼື ການຍົກເວັ້ນວີຊ່າ",
    zh: "有效老挝签证或免签",
  },
  foreignDoc3: {
    en: "Completed arrival card (white form)",
    lo: "ບັດມາຮອດທີ່ຕື່ມເຮັດແລ້ວ (ແບບຟອມສີຂາວ)",
    zh: "填写完整的入境卡（白色表格）",
  },
  foreignDoc4: {
    en: "Return/onward ticket (may be checked)",
    lo: "ປີ້ກັບ/ຕໍ່ (ອາດຖືກກວດ)",
    zh: "回程/续程机票（可能被检查）",
  },

  // Visa on arrival
  voaTitle: {
    en: "Visa on Arrival (VOA)",
    lo: "ວີຊ່າທີ່ສະໜາມບິນ (VOA)",
    zh: "落地签（VOA）",
  },
  voaAvailable: {
    en: "Available at Bokeo International Airport: Citizens of most countries can obtain a visa on arrival. Requirements and process:",
    lo: "ມີໃຫ້ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ: ພົນລະເມືອງຈາກສ່ວນຫຼາຍປະເທດສາມາດຂໍວີຊ່າທີ່ສະໜາມບິນໄດ້. ຄວາມຕ້ອງການ ແລະ ຂັ້ນຕອນ:",
    zh: "博胶国际机场可办理：大多数国家公民可以办理落地签。要求和流程：",
  },
  voaFee: {
    en: "Fee: USD 30-42 (depending on nationality). Payment in USD cash only.",
    lo: "ຄ່າທຳນຽມ: USD 30-42 (ຂຶ້ນກັບສັນຊາດ). ຈ່າຍເປັນເງິນສົດ USD ເທົ່ານັ້ນ.",
    zh: "费用：30-42美元（取决于国籍）。仅接受美元现金付款。",
  },
  voaProcessing: {
    en: "Processing Time: 10-20 minutes",
    lo: "ເວລາປະມວນຜົນ: 10-20 ນາທີ",
    zh: "处理时间：10-20分钟",
  },
  voaValidity: {
    en: "Validity: 30 days from date of entry",
    lo: "ໄລຍະເວລາໃຊ້ໄດ້: 30 ວັນນັບຈາກວັນເຂົ້າ",
    zh: "有效期：入境之日起30天",
  },
  voaDocuments: {
    en: "Documents Needed:",
    lo: "ເອກະສານທີ່ຕ້ອງການ:",
    zh: "所需文件：",
  },
  voaDoc1: {
    en: "Passport with 6 months validity and 2 blank pages",
    lo: "ໜັງສືຜ່ານແດນທີ່ຍັງໃຊ້ໄດ້ 6 ເດືອນ ແລະ ມີໜ້າເປົ່າ 2 ໜ້າ",
    zh: "有效期6个月的护照，且有2页空白页",
  },
  voaDoc2: {
    en: "1 passport photo (4x6cm) - photo booth available at airport",
    lo: "ຮູບໜັງສືຜ່ານແດນ 1 ຮູບ (4x6cm) - ມີຈຸດຖ່າຍຮູບຢູ່ສະໜາມບິນ",
    zh: "1张护照照片（4x6厘米）- 机场有照相亭",
  },
  voaDoc3: {
    en: "Completed visa application form",
    lo: "ແບບຟອມຂໍວີຊ່າທີ່ຕື່ມເຮັດແລ້ວ",
    zh: "填写完整的签证申请表",
  },
  voaDoc4: {
    en: "Cash in USD for visa fee",
    lo: "ເງິນສົດເປັນ USD ສຳລັບຄ່າວີຊ່າ",
    zh: "签证费用的美元现金",
  },

  // Interview questions
  interviewTitle: {
    en: "Immigration Interview Questions",
    lo: "ຄຳຖາມສຳຫຼວດຄົນເຂົ້າ-ອອກເມືອງ",
    zh: "边检问询",
  },
  interviewDesc: {
    en: "Immigration officers may ask you the following questions. Answer honestly and clearly:",
    lo: "ເຈົ້າໜ້າທີ່ຕມ ອາດຖາມທ່ານຄຳຖາມຕໍ່ໄປນີ້. ຕອບຢ່າງຊື່ສັດ ແລະ ຊັດເຈນ:",
    zh: "边检人员可能会问以下问题。请诚实清楚地回答：",
  },
  q1: {
    en: "Q: What is the purpose of your visit?",
    lo: "ຖ: ຈຸດປະສົງຂອງການມາຢ້ຽມຢາມຂອງທ່ານແມ່ນຫຍັງ?",
    zh: "问：您访问的目的是什么？",
  },
  a1: {
    en: "A: Tourism / Business / Visiting family / Transit",
    lo: "ຕ: ທ່ອງທ່ຽວ / ທຸລະກິດ / ຢ້ຽມຄອບຄົວ / ຜ່ານແດນ",
    zh: "答：旅游/商务/探亲/过境",
  },
  q2: {
    en: "Q: How long will you stay in Laos?",
    lo: "ຖ: ທ່ານຈະຢູ່ລາວດົນປານໃດ?",
    zh: "问：您将在老挝停留多长时间？",
  },
  a2: {
    en: 'A: State your planned duration (e.g., "5 days," "2 weeks")',
    lo: 'ຕ: ບອກໄລຍະເວລາທີ່ວາງແຜນໄວ້ (ເຊັ່ນ: "5 ວັນ," "2 ອາທິດ")',
    zh: '答：说明您计划的停留时间（例如："5天"、"2周"）',
  },
  q3: {
    en: "Q: Where will you be staying?",
    lo: "ຖ: ທ່ານຈະພັກຢູ່ໃສ?",
    zh: "问：您将住在哪里？",
  },
  a3: {
    en: "A: Provide hotel name or address",
    lo: "ຕ: ໃຫ້ຊື່ໂຮງແຮມ ຫຼື ທີ່ຢູ່",
    zh: "答：提供酒店名称或地址",
  },
  q4: {
    en: "Q: Do you have sufficient funds for your stay?",
    lo: "ຖ: ທ່ານມີເງິນພຽງພໍສຳລັບການພັກເທົ່າບໍ?",
    zh: "问：您有足够的资金支持停留期间的费用吗？",
  },
  a4: {
    en: "A: Yes (officers rarely check but may ask)",
    lo: "ຕ: ມີ (ເຈົ້າໜ້າທີ່ບໍ່ຄ່ອຍກວດ ແຕ່ອາດຖາມ)",
    zh: "答：有（官员很少检查但可能询问）",
  },

  // Reminders
  remindersTitle: {
    en: "Important Reminders",
    lo: "ການເຕືອນສຳຄັນ",
    zh: "重要提醒",
  },
  reminder1: {
    en: "Keep the departure portion of your arrival card - you'll need it when leaving Laos",
    lo: "ເກັບສ່ວນຂາອອກຂອງບັດມາຮອດໄວ້ - ທ່ານຈະຕ້ອງການມັນເມື່ອອອກຈາກລາວ",
    zh: "保留入境卡的出境联 - 离开老挝时需要用到",
  },
  reminder2: {
    en: "Immigration will stamp your passport with entry date and permitted stay duration",
    lo: "ຕມຈະປະທັບຕາໜັງສືຜ່ານແດນຂອງທ່ານດ້ວຍວັນທີເຂົ້າ ແລະ ໄລຍະເວລາພັກທີ່ອະນຸຍາດ",
    zh: "边检会在护照上盖章，标注入境日期和允许停留时间",
  },
  reminder3: {
    en: "Check your stamp carefully before leaving the counter",
    lo: "ກວດເບິ່ງປະທັບຕາຂອງທ່ານຢ່າງລະມັດລະວັງກ່ອນອອກຈາກເຄົາເຕີ",
    zh: "离开柜台前请仔细检查盖章",
  },
  reminder4: {
    en: "If you lose your arrival card, report to immigration office for replacement",
    lo: "ຖ້າທ່ານເສຍບັດມາຮອດ, ລາຍງານຕໍ່ຫ້ອງການຕມເພື່ອຂໍໃໝ່",
    zh: "如果遗失入境卡，请向边检办公室报告补办",
  },
  reminder5: {
    en: "Do not overstay your visa - fines of USD 10/day apply",
    lo: "ຫ້າມຢູ່ເກີນກຳນົດວີຊ່າ - ມີຄ່າປັບ USD 10/ວັນ",
    zh: "不要逾期停留 - 每天罚款10美元",
  },

  // After clearance
  afterClearanceTitle: {
    en: "After Immigration Clearance",
    lo: "ຫຼັງຈາກຜ່ານການກວດຄົນເຂົ້າ-ອອກເມືອງ",
    zh: "通过边检后",
  },
  afterClearanceDesc: {
    en: "Once your passport is stamped, proceed to the baggage claim area. Follow signs for baggage carousels. Your flight number will be displayed on screens above the carousel.",
    lo: "ເມື່ອໜັງສືຜ່ານແດນຂອງທ່ານຖືກປະທັບຕາແລ້ວ, ໄປຫາພື້ນທີ່ຮັບກະເປົາ. ຕິດຕາມປ້າຍໄປຫາສາຍພານລຳເລຍ. ເລກຖ້ຽວບິນຂອງທ່ານຈະສະແດງຢູ່ໜ້າຈໍເທິງສາຍພານ.",
    zh: "护照盖章后，请前往行李提取区。请跟随指示牌前往行李传送带。您的航班号会显示在传送带上方的屏幕上。",
  },

  // Assistance
  assistanceTitle: {
    en: "Need Assistance?",
    lo: "ຕ້ອງການຄວາມຊ່ວຍເຫຼືອ?",
    zh: "需要帮助？",
  },
  assistanceDesk: {
    en: "Immigration Help Desk: Available at the immigration hall",
    lo: "ເຄົາເຕີຊ່ວຍເຫຼືອຕມ: ມີຢູ່ໃນຫ້ອງກວດຄົນເຂົ້າ-ອອກເມືອງ",
    zh: "边检服务台：位于边检大厅",
  },
  assistanceEmergency: {
    en: "Emergency: Contact airport police or information desk",
    lo: "ສຸກເສີນ: ຕິດຕໍ່ຕຳຫຼວດສະໜາມບິນ ຫຼື ເຄົາເຕີຂໍ້ມູນ",
    zh: "紧急情况：联系机场警察或问询台",
  },
} as const;

export type BorderInspectionKey = keyof typeof borderInspection;

export const tBorderInspection = (k: BorderInspectionKey, lang: Lang) =>
  borderInspection[k][lang] ?? borderInspection[k].en;
