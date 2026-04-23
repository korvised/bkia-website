import type { Lang } from "@/types/language";

export const lostFound = {
  // ── Metadata ─────────────────────────────────────────────────────────────
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

  // ── Hero / search ─────────────────────────────────────────────────────────
  heroSubtitle: {
    en: "Search our database of found items. If you spot a match, submit a claim with your proof of ownership.",
    lo: "ຄົ້ນຫາໃນຖານຂໍ້ມູນເຄື່ອງຕົກຄ້າງຂອງພວກເຮົາ. ຫາກທ່ານພົບລາຍການທີ່ຄ້າຍຄືສິ່ງຂອງຂອງທ່ານ, ກະລຸນາສົ່ງຄຳຮ້ອງພ້ອມຫຼັກຖານຢືນຢັນຄວາມເປັນເຈົ້າຂອງ.",
    zh: "在我们的失物数据库中进行搜索。如果发现匹配物品，请提交认领申请并提供所有权证明。",
  },
  searchPlaceholderMain: {
    en: "Search by item name, category or location…",
    lo: "ຄົ້ນຫາດ້ວຍຊື່ສິ່ງຂອງ, ໝວດໝູ່ ຫຼື ສະຖານທີ່…",
    zh: "按物品名称、类别或地点搜索…",
  },
  clearSearch: { en: "Clear", lo: "ລ້າງການຄົ້ນຫາ", zh: "清除" },

  // ── Stats ─────────────────────────────────────────────────────────────────
  statsTitle: {
    en: "Items currently in our care",
    lo: "ສິ່ງຂອງທີ່ຢູ່ໃນຄວາມດູແລຂອງພວກເຮົາ",
    zh: "目前保管中的物品",
  },
  statTotal: { en: "Total Items", lo: "ສິ່ງຂອງທັງໝົດ", zh: "物品总数" },
  statOpen: { en: "Awaiting Claim", lo: "ລໍຖ້າເຈົ້າຂອງມາຮັບ", zh: "待认领" },
  statMatched: { en: "Under Review", lo: "ກຳລັງກວດສອບຄຳຮ້ອງ", zh: "审核中" },
  statReturned: { en: "Returned", lo: "ສົ່ງຄືນເຈົ້າຂອງແລ້ວ", zh: "已归还" },

  // ── Search results ────────────────────────────────────────────────────────
  searchResultsCount: {
    en: "result(s) found for",
    lo: "ລາຍການທີ່ພົບສຳລັບ",
    zh: "条结果：",
  },
  noResultsFound: {
    en: "No matching items found",
    lo: "ບໍ່ພົບລາຍການທີ່ກົງກັນ",
    zh: "未找到匹配物品",
  },
  noResultsHint: {
    en: "Try different keywords, or contact us — our staff can search records directly.",
    lo: "ລອງໃຊ້ຄຳຄົ້ນຫາອື່ນ ຫຼື ຕິດຕໍ່ພວກເຮົາ — ພະນັກງານສາມາດຊ່ວຍຄົ້ນຫາຈາກບັນທຶກໂດຍກົງ.",
    zh: "请尝试使用其他关键词，或直接联系我们——工作人员可为您查询内部记录。",
  },
  claimThisItem: { en: "This is mine", lo: "ແມ່ນຂອງຂ້ອຍ", zh: "这是我的" },
  cancelClaim: { en: "Cancel", lo: "ຍົກເລີກ", zh: "取消" },
  backToList: { en: "Back", lo: "ກັບຄືນ", zh: "返回" },

  // ── Claim form ────────────────────────────────────────────────────────────
  claimItemLabel: { en: "Claiming", lo: "ແຈ້ງຮັບເຄື່ອງຄືນ", zh: "申领物品" },
  claimSectionDescribe: {
    en: "Describe your item",
    lo: "ອະທິບາຍລາຍລະອຽດສິ່ງຂອງ",
    zh: "描述您的物品",
  },
  claimSectionFlight: {
    en: "Your flight details",
    lo: "ຂໍ້ມູນທ່ຽວບິນຂອງທ່ານ",
    zh: "航班详情",
  },
  claimSectionProof: {
    en: "Proof documents",
    lo: "ເອກະສານຢືນຢັນ",
    zh: "证明文件",
  },
  claimSectionContact: {
    en: "Your contact info",
    lo: "ຂໍ້ມູນຕິດຕໍ່",
    zh: "联系方式",
  },
  ownershipProof: {
    en: "Describe how you can prove ownership",
    lo: "ທ່ານຈະຢືນຢັນຄວາມເປັນເຈົ້າຂອງໄດ້ແນວໃດ?",
    zh: "请描述您如何证明该物品归您所有",
  },
  ownershipProofHint: {
    en: "e.g. contents inside, distinguishing marks, receipts, etc.",
    lo: "ຕົວຢ່າງ: ສິ່ງຂອງທີ່ຢູ່ທາງໃນ, ຈຸດຕຳໜິພິເສດ, ໃບບິນຊື້ເຄື່ອງ ແລະ ອື່ນໆ.",
    zh: "例如：内部装有的物品、特殊标记、购买收据等",
  },
  claimFlightNumber: {
    en: "Your flight number",
    lo: "ເລກທ່ຽວບິນຂອງທ່ານ",
    zh: "航班号",
  },
  claimFlightHint: {
    en: "e.g. QV 201 — the flight you were on when the item was lost",
    lo: "ຕົວຢ່າງ: QV 201 — ທ່ຽວບິນທີ່ທ່ານເດີນທາງໃນຊ່ວງທີ່ເຄື່ອງເສຍ",
    zh: "例如：QV 201 — 丢失物品时乘坐的航班",
  },
  claimSeatNumber: {
    en: "Your seat number",
    lo: "ໝາຍເລກບ່ອນນັ່ງ",
    zh: "座位号",
  },
  claimSeatHint: {
    en: "e.g. 14A — helps confirm you were on the flight",
    lo: "ຕົວຢ່າງ: 14A — ຊ່ວຍຢືນຢັນວ່າທ່ານຢູ່ໃນທ່ຽວບິນແທ້",
    zh: "例如：14A — 有助于确认您确实在该航班上",
  },
  proofPhotos: {
    en: "Upload proof photos",
    lo: "ອັບໂຫຼດຮູບພາບຢືນຢັນ",
    zh: "上传证明照片",
  },
  proofPhotosHint: {
    en: "Boarding pass, receipt, photo of item, or ID — optional but speeds up review",
    lo: "ບັດຂຶ້ນເຮືອ, ໃບບິນ, ຮູບສິ່ງຂອງ ຫຼື ບັດປະຈຳຕົວ — ບໍ່ບັງຄັບ ແຕ່ຈະຊ່ວຍໃຫ້ກວດສອບໄວຂຶ້ນ",
    zh: "登机牌、收据、物品照片或身份证明 — 选填，但能加快审核速度",
  },
  claimantName: { en: "Your Name", lo: "ຊື່ ແລະ ນາມສະກຸນ", zh: "您的姓名" },
  claimantPhone: { en: "Phone", lo: "ເບີໂທລະສັບ", zh: "联系电话" },
  claimantEmail: {
    en: "Email (optional)",
    lo: "ອີເມວ (ຖ້າມີ)",
    zh: "电子邮件（选填）",
  },
  submitClaim: {
    en: "Submit Claim",
    lo: "ສົ່ງຄຳຮ້ອງຂໍຮັບເຄື່ອງ",
    zh: "提交申领",
  },
  claimSuccess: {
    en: "Claim submitted successfully. Our staff will review it and contact you.",
    lo: "ສົ່ງຄຳຮ້ອງສຳເລັດແລ້ວ. ພະນັກງານຈະກວດສອບ ແລະ ຕິດຕໍ່ຫາທ່ານໂດຍໄວ.",
    zh: "申领已成功提交。工作人员将进行审核并与您联系。",
  },

  // ── Can't find + How it works + CTA ─────────────────────────────────────
  cantFindItem: {
    en: "Can't find your item?",
    lo: "ຍັງຊອກບໍ່ພົບສິ່ງຂອງຂອງທ່ານບໍ?",
    zh: "找不到您的物品？",
  },
  cantFindDesc: {
    en: "Contact our staff directly and we'll search our records for you.",
    lo: "ຕິດຕໍ່ພະນັກງານຂອງພວກເຮົາໂດຍກົງ ເພື່ອໃຫ້ຊ່ວຍຄົ້ນຫາໃນຖານຂໍ້ມູນ.",
    zh: "请直接联系我们的工作人员，我们将为您在记录中查找。",
  },
  contactStaff: {
    en: "Contact Airport Staff",
    lo: "ຕິດຕໍ່ພະນັກງານສະໜາມບິນ",
    zh: "联系机场工作人员",
  },
  howItWorks: {
    en: "How claiming works",
    lo: "ຂັ້ນຕອນການຂໍຮັບເຄື່ອງຄືນ",
    zh: "认领流程说明",
  },
  howStep1Title: { en: "Search", lo: "ຄົ້ນຫາ", zh: "1. 搜索" },
  howStep1Desc: {
    en: "Search our database by item name, category, or location.",
    lo: "ຄົ້ນຫາໃນຖານຂໍ້ມູນດ້ວຍຊື່ສິ່ງຂອງ, ໝວດໝູ່ ຫຼື ສະຖານທີ່.",
    zh: "按物品名称、类别或地点在数据库中搜索。",
  },
  howStep2Title: { en: "Claim", lo: "ແຈ້ງຄວາມເປັນເຈົ້າຂອງ", zh: "2. 申领" },
  howStep2Desc: {
    en: "Click 'This is mine' and provide your ownership proof, flight details, and contact info.",
    lo: "ກົດ 'ແມ່ນຂອງຂ້ອຍ' ແລ້ວໃຫ້ຂໍ້ມູນຢືນຢັນ, ລາຍລະອຽດທ່ຽວບິນ ແລະ ຂໍ້ມູນຕິດຕໍ່.",
    zh: "点击“这是我的”，提供所有权证明、航班信息和联系方式。",
  },
  howStep3Title: {
    en: "We contact you",
    lo: "ລໍຖ້າການຕິດຕໍ່ກັບ",
    zh: "3. 等候联系",
  },
  howStep3Desc: {
    en: "Staff review your claim within 1–2 days and contact you to arrange the return.",
    lo: "ພະນັກງານຈະກວດສອບພາຍໃນ 1-2 ວັນ ແລ້ວຕິດຕໍ່ຫາທ່ານເພື່ອຈັດແຈງການສົ່ງຄືນ.",
    zh: "工作人员将在 1-2 天内审核您的申请，并联系您安排归还事宜。",
  },
  stillNeedHelp: {
    en: "Still need help?",
    lo: "ຍັງຕ້ອງການຄວາມຊ່ວຍເຫຼືອເພີ່ມເຕີມບໍ?",
    zh: "仍需帮助？",
  },
  ctaSubtitle: {
    en: "Our airport staff are available to assist you in person.",
    lo: "ພະນັກງານສະໜາມບິນຂອງພວກເຮົາ ພ້ອມໃຫ້ການຊ່ວຍເຫຼືອທ່ານຢູ່ທີ່ຈຸດບໍລິການ.",
    zh: "我们的机场工作人员随时为您提供现场帮助。",
  },
  callUs: { en: "Call Us", lo: "ໂທຫາພວກເຮົາ", zh: "拨打电话" },
  emailUs: { en: "Email Us", lo: "ສົ່ງອີເມວຫາພວກເຮົາ", zh: "发送邮件" },

  // ── Shared UI ─────────────────────────────────────────────────────────────
  submitting: {
    en: "Submitting...",
    lo: "ກຳລັງສົ່ງຂໍ້ມູນ...",
    zh: "正在提交...",
  },
  errorGeneric: {
    en: "Something went wrong. Please try again.",
    lo: "ເກີດຂໍ້ຜິດພາດບາງຢ່າງ. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.",
    zh: "发生错误，请稍后重试。",
  },
} as const;

export type LostFoundKey = keyof typeof lostFound;

export const tLostFound = (k: LostFoundKey, lang: Lang) =>
  lostFound[k][lang] ?? lostFound[k].en;
