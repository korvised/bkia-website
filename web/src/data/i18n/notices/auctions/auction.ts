import type { Lang } from "@/types/language";

export const auction = {
  // ── Metadata ─────────────────────────────────────────────────────────────
  pageTitle: {
    en: "Procurement & Bidding | Bokeo International Airport",
    lo: "ການຈັດຊື້ ແລະ ການປະມູນ | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "采购与招标 | 博胶国际机场",
  },
  pageDescription: {
    en: "Transparent procurement opportunities at Bokeo International Airport",
    lo: "ໂອກາດການຈັດຊື້ທີ່ໂປ່ງໃສ ທີ່ ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "博胶国际机场透明的采购招标机会",
  },

  // ── Hero ─────────────────────────────────────────────────────────────────
  heroTitle: {
    en: "Auctions & Procurement",
    lo: "ການປະມູນ ແລະ ການຈັດຊື້",
    zh: "拍卖与采购",
  },
  heroSubtitle: {
    en: "Access official bidding documents and procurement opportunities for Bokeo International Airport projects.",
    lo: "ເຂົ້າເຖິງເອກະສານການປະມູນຢ່າງເປັນທາງການ ແລະ ໂອກາດການຈັດຊື້ ສຳລັບໂຄງການຂອງສະໜາມບິນສາກົນບໍ່ແກ້ວ.",
    zh: "获取博胶国际机场项目的官方招标文件和采购机会。",
  },

  // ── Status filter tabs ────────────────────────────────────────────────────
  tabAll: { en: "All Projects", lo: "ໂຄງການທັງໝົດ", zh: "全部项目" },
  tabOpen: { en: "Open Tenders", lo: "ເປີດຮັບປະມູນ", zh: "正在招标" },
  tabUpcoming: { en: "Upcoming", lo: "ໄວໆນີ້", zh: "即将开始" },
  tabClosed: { en: "Closed", lo: "ປິດແລ້ວ", zh: "已截止" },

  // ── Status badges ─────────────────────────────────────────────────────────
  statusUpcoming: { en: "Upcoming", lo: "ໄວໆນີ້", zh: "即将开始" },
  statusOpen: { en: "Open Now", lo: "ເປີດແລ້ວ", zh: "立即参与" },
  statusClosed: { en: "Closed", lo: "ປິດແລ້ວ", zh: "已截止" },

  // ── Category labels ───────────────────────────────────────────────────────
  categoryEquipment: { en: "Equipment", lo: "ອຸປະກອນ", zh: "设备" },
  categoryConstruction: { en: "Construction", lo: "ກໍ່ສ້າງ", zh: "建设工程" },
  categoryService: { en: "Services", lo: "ການບໍລິການ", zh: "服务" },
  categoryIT: { en: "IT & Digital", lo: "ໄອທີ ແລະ ດິຈິຕອນ", zh: "信息技术" },
  categoryConsulting: { en: "Consultancy", lo: "ທີ່ປຶກສາ", zh: "咨询" },
  categoryMaintenance: { en: "Maintenance", lo: "ບຳລຸງຮັກສາ", zh: "维护" },
  categoryOther: { en: "Other", lo: "ອື່ນໆ", zh: "其他" },

  // ── Card labels ───────────────────────────────────────────────────────────
  opens: { en: "Opens:", lo: "ເລີ່ມເປີດ:", zh: "开始日期：" },
  closes: { en: "Deadline:", lo: "ກຳນົດປິດ:", zh: "截止日期：" },
  doc: { en: "Document", lo: "ເອກະສານ", zh: "份文件" },
  docs: { en: "Documents", lo: "ເອກະສານ", zh: "份文件" },
  tenderDocuments: {
    en: "Tender Documentation",
    lo: "ເອກະສານປະກອບການປະມູນ",
    zh: "招标文件",
  },

  // ── Empty state ───────────────────────────────────────────────────────────
  noAuctions: {
    en: "No tenders found for this category.",
    lo: "ບໍ່ພົບລາຍການປະມູນທີ່ທ່ານຄົ້ນຫາ",
    zh: "未找到相关招标项目",
  },
  checkBackSoon: {
    en: "Try adjusting your filters or check back later for new opportunities.",
    lo: "ກະລຸນາລອງປ່ຽນສະຖານະການຄົ້ນຫາ ຫຼື ກັບມາເບິ່ງໃໝ່ໃນພາຍຫຼັງ.",
    zh: "请尝试调整筛选状态，或稍后查看新机会。",
  },

  // ── Contact section ───────────────────────────────────────────────────────
  contactTitle: {
    en: "Ready to Submit a Proposal?",
    lo: "ພ້ອມທີ່ຈະສົ່ງຂໍ້ສະເໜີແລ້ວບໍ?",
    zh: "准备好提交方案了吗？",
  },
  contactSubtitle: {
    en: "Submit your bidding documents via email or contact our procurement office for assistance.",
    lo: "ສົ່ງເອກະສານການປະມູນຂອງທ່ານຜ່ານອີເມວ ຫຼື ຕິດຕໍ່ຫ້ອງການຈັດຊື້ຂອງພວກເຮົາເພື່ອຂໍຄວາມຊ່ວຍເຫຼືອ.",
    zh: "请通过电子邮件提交您的投标文件，或联系我们的采购办公室寻求帮助。",
  },
  submitBidLabel: {
    en: "Submit Bid Documents",
    lo: "ສົ່ງເອກະສານການປະມູນ",
    zh: "提交投标文件",
  },
  submitBidHint: {
    en: "Ensure all required files are attached",
    lo: "ກວດສອບໃຫ້ແນ່ໃຈວ່າໄດ້ຄັດຕິດເອກະສານທີ່ຈຳເປັນທັງໝົດ",
    zh: "确保附上所有必要文件",
  },
  inquiriesLabel: {
    en: "Direct Inquiries",
    lo: "ສອບຖາມໂດຍກົງ",
    zh: "直接咨询",
  },
  businessHours: {
    en: "Mon–Fri, 8:00 AM – 5:00 PM",
    lo: "ຈັນ–ສຸກ, 08:00 – 17:00",
    zh: "周一至周五, 08:00 – 17:00",
  },
} as const;

export type AuctionI18nKey = keyof typeof auction;

export const tAuction = (k: AuctionI18nKey, lang: Lang): string => {
  return (auction[k] as Record<string, string>)[lang] ?? auction[k].en;
};
