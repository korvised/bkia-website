import type { Lang } from "@/types/language";

export const lostFound = {
  pageTitle: {
    en: "Lost & Found",
    lo: "ບໍລິການເຄື່ອງເສຍ ແລະ ເຄື່ອງຕົກຄ້າງ",
    zh: "失物招领",
  },
  pageDescription: {
    en: "Search for lost items or report a found item at Bokeo International Airport",
    lo: "ຄົ້ນຫາສິ່ງຂອງທີ່ເສຍ ຫຼື ແຈ້ງເຄື່ອງທີ່ເກັບໄດ້ ຢູ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "在博胶国际机场查找丢失物品或上报拾获物品",
  },

  // Tabs
  tabAll: { en: "All Items", lo: "ທັງໝົດ", zh: "全部物品" },
  tabLost: { en: "Lost", lo: "ເຄື່ອງເສຍ", zh: "失物" },
  tabFound: { en: "Found", lo: "ເຄື່ອງທີ່ເກັບໄດ້", zh: "招领" },

  // Categories
  categoryAll: { en: "All Categories", lo: "ທຸກໝວດໝູ່", zh: "全部类别" },
  categoryElectronics: {
    en: "Electronics",
    lo: "ອຸປະກອນອີເລັກໂທຣນິກ",
    zh: "电子产品",
  },
  categoryBaggage: { en: "Baggage", lo: "ກະເປົ໋າເດີນທາງ", zh: "行李" },
  categoryClothing: { en: "Clothing", lo: "ເຄື່ອງນຸ່ງຫົ່ມ", zh: "服装" },
  categoryDocuments: { en: "Documents", lo: "ເອກະສານສຳຄັນ", zh: "证件文件" },
  categoryJewelry: { en: "Jewelry", lo: "ເຄື່ອງປະດັບ", zh: "珠宝首饰" },
  categoryKeys: { en: "Keys", lo: "ກຸນແຈ", zh: "钥匙" },
  categoryCash: { en: "Cash", lo: "ເງິນສົດ", zh: "现金" },
  categoryToys: { en: "Toys", lo: "ຂອງຫຼິ້ນ", zh: "玩具" },
  categoryOther: { en: "Other", lo: "ອື່ນໆ", zh: "其他" },

  // Status badge
  statusOpen: { en: "Open", lo: "ກຳລັງດຳເນີນການ", zh: "待处理" },
  statusMatched: { en: "Matched", lo: "ພົບຂໍ້ມູນທີ່ກົງກັນ", zh: "已匹配" },
  statusReturned: { en: "Returned", lo: "ສົ່ງຄືນເຈົ້າຂອງແລ້ວ", zh: "已归还" },
  statusDonated: { en: "Donated", lo: "ບໍລິຈາກແລ້ວ", zh: "已捐赠" },
  statusDisposed: { en: "Disposed", lo: "ກຳຈັດ/ທຳລາຍແລ້ວ", zh: "已处置" },

  // Type badge
  typeLost: { en: "Lost", lo: "ເຄື່ອງເສຍ", zh: "失物" },
  typeFound: { en: "Found", lo: "ເຄື່ອງທີ່ເກັບໄດ້", zh: "招领" },

  // Search
  searchPlaceholder: {
    en: "Search by item name or location...",
    lo: "ຄົ້ນຫາດ້ວຍຊື່ສິ່ງຂອງ ຫຼື ສະຖານທີ່...",
    zh: "按物品名称或地点搜索...",
  },
  clearSearch: { en: "Clear", lo: "ລ້າງການຄົ້ນຫາ", zh: "清除" },

  // Labels
  incidentDate: { en: "Date", lo: "ວັນທີ", zh: "日期" },
  location: { en: "Location", lo: "ສະຖານທີ່", zh: "地点" },
  flightNumber: { en: "Flight", lo: "ທ່ຽວບິນ", zh: "航班" },
  claimItem: { en: "Claim This Item", lo: "ແຈ້ງຮັບເຄື່ອງນີ້", zh: "申领此物" },
  reportLost: { en: "Report Lost Item", lo: "ແຈ້ງເຄື່ອງເສຍ", zh: "上报失物" },
  reportFound: {
    en: "Report Found Item",
    lo: "ແຈ້ງເຄື່ອງທີ່ເກັບໄດ້",
    zh: "上报拾获物品",
  },
  backToList: {
    en: "Back to Lost & Found",
    lo: "ກັບຄືນ",
    zh: "返回失物招领",
  },
  viewDetail: { en: "View Details", lo: "ເບິ່ງລາຍລະອຽດ", zh: "查看详情" },

  // Empty state
  noItemsFound: { en: "No items found", lo: "ບໍ່ພົບລາຍການ", zh: "未找到物品" },
  noItemsMessage: {
    en: "Try adjusting your filters or search terms.",
    lo: "ກະລຸນາລອງປ່ຽນຕົວກອງ ຫຼື ຄຳຄົ້ນຫາໃໝ່.",
    zh: "请尝试调整筛选条件或搜索词。",
  },

  // Not found
  notFoundTitle: { en: "Item Not Found", lo: "ບໍ່ພົບຂໍ້ມູນ", zh: "未找到物品" },
  notFoundMessage: {
    en: "This item does not exist or may have been removed.",
    lo: "ບໍ່ພົບລາຍການນີ້ ຫຼື ອາດຖືກລຶບອອກຈາກລະບົບແລ້ວ.",
    zh: "此物品不存在或可能已被删除。",
  },

  // Claim form
  claimFormTitle: {
    en: "Submit a Claim",
    lo: "ສົ່ງຄຳຮ້ອງຂໍຮັບເຄື່ອງຄືນ",
    zh: "提交申领",
  },
  claimantName: { en: "Your Name", lo: "ຊື່ ແລະ ນາມສະກຸນ", zh: "您的姓名" },
  claimantEmail: { en: "Email", lo: "ອີເມວ", zh: "电子邮件" },
  claimantPhone: {
    en: "Phone (optional)",
    lo: "ເບີໂທລະສັບ (ຖ້າມີ)",
    zh: "电话（选填）",
  },
  ownershipProof: {
    en: "Describe how you can prove ownership",
    lo: "ລາຍລະອຽດເພື່ອຢືນຢັນຄວາມເປັນເຈົ້າຂອງ",
    zh: "请描述您如何证明物品归属",
  },
  ownershipProofHint: {
    en: "e.g. contents inside, distinguishing marks, receipts, etc.",
    lo: "ຕົວຢ່າງ: ສິ່ງຂອງທາງໃນ, ຈຸດຕຳໜິ, ໃບບິນຢືນຢັນ, ແລະ ອື່ນໆ.",
    zh: "如：物品内容物、特殊标记、购买收据等",
  },
  proofFiles: {
    en: "Upload proof (ID, boarding pass, receipt) — optional",
    lo: "ອັບໂຫລດຫຼັກຖານ (ບັດປະຈຳຕົວ, ບັດຂຶ້ນເຮືອ, ໃບບິນ) — ຖ້າມີ",
    zh: "上传证明文件（身份证、登机牌、收据）— 选填",
  },
  submitClaim: {
    en: "Submit Claim",
    en2: "Submitting...",
    lo: "ສົ່ງຄຳຮ້ອງຂໍ",
    zh: "提交申领",
  },
  claimSuccess: {
    en: "Claim submitted successfully. Our staff will contact you via email.",
    lo: "ສົ່ງຄຳຮ້ອງສຳເລັດແລ້ວ. ພະນັກງານຈະຕິດຕໍ່ຫາທ່ານຜ່ານທາງອີເມວ.",
    zh: "申领已成功提交，工作人员将通过电子邮件与您联系。",
  },

  // Report form
  reportFormTitle: {
    en: "Report an Item",
    lo: "ແຈ້ງຂໍ້ມູນສິ່ງຂອງ",
    zh: "上报物品",
  },
  reportType: { en: "Report Type", lo: "ປະເພດການແຈ້ງ", zh: "上报类型" },
  itemName: { en: "Item Name", lo: "ຊື່ສິ່ງຂອງ", zh: "物品名称" },
  itemCategory: { en: "Category", lo: "ໝວດໝູ່", zh: "类别" },
  itemDescription: { en: "Description", lo: "ລາຍລະອຽດ", zh: "描述" },
  itemLocation: { en: "Location", lo: "ສະຖານທີ່ ທີ່ພົບ/ເສຍ", zh: "地点" },
  itemIncidentDate: {
    en: "Date Lost/Found",
    lo: "ວັນທີ ເສຍ/ເກັບໄດ້",
    zh: "丢失/拾获日期",
  },
  itemFlightNumber: {
    en: "Flight Number (optional)",
    lo: "ເລກທ່ຽວບິນ (ຖ້າມີ)",
    zh: "航班号（选填）",
  },
  reporterName: { en: "Your Name", lo: "ຊື່ຜູ້ແຈ້ງ", zh: "您的姓名" },
  reporterEmail: { en: "Email", lo: "ອີເມວ", zh: "电子邮件" },
  reporterPhone: {
    en: "Phone (optional)",
    lo: "ເບີໂທລະສັບ (ຖ້າມີ)",
    zh: "电话（选填）",
  },
  itemImages: {
    en: "Upload images of the item (optional)",
    lo: "ອັບໂຫລດຮູບພາບສິ່ງຂອງ (ຖ້າມີ)",
    zh: "上传物品图片（选填）",
  },
  submitReport: { en: "Submit Report", lo: "ສົ່ງລາຍງານ", zh: "提交上报" },
  reportSuccess: {
    en: "Report submitted. Your reference code is:",
    lo: "ແຈ້ງລາຍງານສຳເລັດ. ລະຫັດອ້າງອີງຂອງທ່ານແມ່ນ:",
    zh: "上报成功，您的参考编号为：",
  },
  copyCode: { en: "Copy", lo: "ຄັດລອກ", zh: "复制" },
  codeCopied: { en: "Copied!", lo: "ຄັດລອກແລ້ວ!", zh: "已复制！" },
} as const;

export type LostFoundKey = keyof typeof lostFound;

export const tLostFound = (k: LostFoundKey, lang: Lang) =>
  lostFound[k][lang] ?? lostFound[k].en;
