import type { Lang } from "@/types/language";

export const lostFound = {
  // ── Metadata ─────────────────────────────────────────────────────────────
  pageTitle: {
    en: "Lost & Found",
    lo: "ຕິດຕາມເຄື່ອງເສຍ ແລະ ເຄື່ອງຕົກຄ້າງ",
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
    lo: "ຄົ້ນຫາໃນຖານຂໍ້ມູນເຄື່ອງຕົກຄ້າງຂອງພວກເຮົາ ຫາກທ່ານພົບລາຍການທີ່ຄ້າຍຄືສິ່ງຂອງຂອງທ່ານ, ກະລຸນາສົ່ງຄຳຮ້ອງພ້ອມຫຼັກຖານຢືນຢັນຄວາມເປັນເຈົ້າຂອງ.",
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

  // ── Item status badges ────────────────────────────────────────────────────
  statusOpen: { en: "Available", lo: "ສາມາດຮ້ອງຂໍໄດ້", zh: "可认领" },
  statusMatched: {
    en: "Under Review",
    lo: "ກຳລັງກວດສອບ",
    zh: "审核中",
  },
  statusMatchedHint: {
    en: "A claim is already under review for this item. You can still submit yours.",
    lo: "ມີຄຳຮ້ອງຂໍສຳລັບສິ່ງຂອງນີ້ຢູ່ລະຫວ່າງການກວດສອບ. ທ່ານຍັງສາມາດສົ່ງຄຳຮ້ອງຂອງທ່ານໄດ້.",
    zh: "此物品已有一份申领正在审核中，您仍可提交您的申领。",
  },

  // ── Claim form ────────────────────────────────────────────────────────────
  claimItemLabel: { en: "Claiming", lo: "ແຈ້ງຮັບເຄື່ອງຄືນ", zh: "申领物品" },
  claimSectionDescribe: {
    en: "Describe your item",
    lo: "ອະທິບາຍລາຍລະອຽດສິ່ງຂອງ",
    zh: "描述您的物品",
  },
  claimSectionFlight: {
    en: "Your flight details",
    lo: "ຂໍ້ມູນຖ້ຽວບິນຂອງທ່ານ",
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
  ownershipProofMinLength: {
    en: "At least 10 characters required",
    lo: "ຕ້ອງການຢ່າງໜ້ອຍ 10 ຕົວອັກສອນ",
    zh: "至少需要10个字符",
  },
  claimFlightNumber: {
    en: "Your flight number",
    lo: "ເລກຖ້ຽວບິນຂອງທ່ານ",
    zh: "航班号",
  },
  claimFlightHint: {
    en: "e.g. QV 201 — the flight you were on when the item was lost",
    lo: "ຕົວຢ່າງ: QV 201 — ຖ້ຽວບິນທີ່ທ່ານເດີນທາງໃນຊ່ວງທີ່ເຄື່ອງເສຍ",
    zh: "例如：QV 201 — 丢失物品时乘坐的航班",
  },
  claimSeatNumber: {
    en: "Your seat number",
    lo: "ໝາຍເລກບ່ອນນັ່ງ",
    zh: "座位号",
  },
  claimSeatHint: {
    en: "e.g. 14A — helps confirm you were on the flight",
    lo: "ຕົວຢ່າງ: 14A — ຊ່ວຍຢືນຢັນວ່າທ່ານຢູ່ໃນຖ້ຽວບິນແທ້",
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
    en: "Claim submitted successfully! Our staff will review it and contact you.",
    lo: "ສົ່ງຄຳຮ້ອງສຳເລັດແລ້ວ! ພະນັກງານຈະກວດສອບ ແລະ ຕິດຕໍ່ຫາທ່ານໂດຍໄວ.",
    zh: "申领已成功提交！工作人员将进行审核并与您联系。",
  },
  claimRefCode: {
    en: "Your reference code",
    lo: "ລະຫັດອ້າງອີງຂອງທ່ານ",
    zh: "您的参考编号",
  },
  claimRefCodeHint: {
    en: "Save this code to track your claim status",
    lo: "ເກັບລະຫັດນີ້ໄວ້ເພື່ອຕິດຕາມສະຖານະຄຳຮ້ອງຂອງທ່ານ",
    zh: "请保存此编号以便追踪您的申领状态",
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
    en: "How it works",
    lo: "ຂັ້ນຕອນການດຳເນີນການ",
    zh: "流程说明",
  },
  howStep1Title: { en: "Search", lo: "ຄົ້ນຫາ", zh: "搜索" },
  howStep1Desc: {
    en: "Search our database by item name, category, or location to see if your item has been found.",
    lo: "ຄົ້ນຫາໃນຖານຂໍ້ມູນດ້ວຍຊື່ສິ່ງຂອງ, ໝວດໝູ່ ຫຼື ສະຖານທີ່ ເພື່ອກວດສອບວ່າເຄື່ອງຂອງທ່ານຖືກພົບຫຼືບໍ່.",
    zh: "按物品名称、类别或地点在数据库中搜索，查看您的物品是否已被找到。",
  },
  howStep2Title: {
    en: "Claim or Report",
    lo: "ແຈ້ງຮັບ ຫຼື ລາຍງານ",
    zh: "申领或报告",
  },
  howStep2Desc: {
    en: "Found a match? Click 'This is mine' to claim it. Can't find it? Click 'Report Lost Item' to submit a report with your item details.",
    lo: "ພົບເຄື່ອງກົງກັນ? ກົດ 'ແມ່ນຂອງຂ້ອຍ' ເພື່ອແຈ້ງຮັບ. ບໍ່ພົບ? ກົດ 'ແຈ້ງເຄື່ອງເສຍ' ເພື່ອສົ່ງລາຍງານພ້ອມລາຍລະອຽດ.",
    zh: "找到匹配物品？点击「这是我的」进行申领。找不到？点击「报告丢失物品」提交详细描述。",
  },
  howStep3Title: {
    en: "We contact you",
    lo: "ພວກເຮົາຕິດຕໍ່ຫາທ່ານ",
    zh: "等候联系",
  },
  howStep3Desc: {
    en: "Our staff will review your claim or report within 1–2 days and contact you to arrange the return.",
    lo: "ພະນັກງານຈະກວດສອບຄຳຮ້ອງ ຫຼື ລາຍງານຂອງທ່ານພາຍໃນ 1-2 ວັນ ແລ້ວຕິດຕໍ່ຫາເພື່ອຈັດແຈງການສົ່ງຄືນ.",
    zh: "工作人员将在 1-2 天内审核您的申领或报告，并联系您安排归还事宜。",
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

  // ── Report (standalone claim) ─────────────────────────────────────────────
  reportButton: {
    en: "Report Lost Item",
    lo: "ແຈ້ງເຄື່ອງເສຍ",
    zh: "报告丢失物品",
  },
  reportTitle: {
    en: "Report a Lost Item",
    lo: "ແຈ້ງສິ່ງຂອງທີ່ສູນເສຍ",
    zh: "报告丢失物品",
  },
  reportSubtitle: {
    en: "Can't find your item in search? Fill out this form and our staff will try to match it.",
    lo: "ຊອກບໍ່ເຫັນສິ່ງຂອງໃນການຄົ້ນຫາ? ກະລຸນາຕື່ມແບບຟອມນີ້ ແລະ ພະນັກງານຈະຊ່ວຍຊອກໃຫ້.",
    zh: "搜索中找不到您的物品？请填写此表格，我们的工作人员将为您匹配。",
  },
  reportSectionItem: {
    en: "What did you lose?",
    lo: "ທ່ານເສຍຫຍັງ?",
    zh: "您丢失了什么？",
  },
  reportCategory: {
    en: "Item category",
    lo: "ໝວດໝູ່ສິ່ງຂອງ",
    zh: "物品类别",
  },
  reportCategoryPlaceholder: {
    en: "Select a category",
    lo: "ເລືອກໝວດໝູ່",
    zh: "选择类别",
  },
  reportItemDesc: {
    en: "Describe the item",
    lo: "ອະທິບາຍສິ່ງຂອງ",
    zh: "描述物品",
  },
  reportItemDescHint: {
    en: "e.g. Black iPhone 15, blue Samsonite suitcase, brown leather wallet with initials...",
    lo: "ຕົວຢ່າງ: iPhone 15 ສີດຳ, ກະເປົ໋າ Samsonite ສີຟ້າ, ກະເປົ໋າເງິນໜັງສີນ້ຳຕານ...",
    zh: "例如：黑色 iPhone 15、蓝色新秀丽行李箱、棕色皮夹...",
  },
  reportItemDescMinLength: {
    en: "At least 5 characters required",
    lo: "ຕ້ອງການຢ່າງໜ້ອຍ 5 ຕົວອັກສອນ",
    zh: "至少需要5个字符",
  },
  reportLostDate: {
    en: "When was it lost?",
    lo: "ເສຍເມື່ອໃດ?",
    zh: "何时丢失的？",
  },
  reportLostLocation: {
    en: "Where was it lost?",
    lo: "ເສຍຢູ່ໃສ?",
    zh: "在哪里丢失的？",
  },
  reportLostLocationHint: {
    en: "e.g. Gate 3, Check-in Area, Baggage Claim",
    lo: "ຕົວຢ່າງ: ປະຕູ 3, ບ່ອນເຊັກອິນ, ບ່ອນຮັບກະເປົ໋າ",
    zh: "例如：3号登机口、值机区域、行李提取处",
  },
  reportSuccess: {
    en: "Report submitted successfully! Our staff will review it and contact you.",
    lo: "ສົ່ງລາຍງານສຳເລັດແລ້ວ! ພະນັກງານຈະກວດສອບ ແລະ ຕິດຕໍ່ຫາທ່ານ.",
    zh: "报告已成功提交！工作人员将进行审核并与您联系。",
  },
  reportRefCode: {
    en: "Your reference code",
    lo: "ລະຫັດອ້າງອີງຂອງທ່ານ",
    zh: "您的参考编号",
  },
  reportRefCodeHint: {
    en: "Save this code to track your report",
    lo: "ເກັບລະຫັດນີ້ໄວ້ເພື່ອຕິດຕາມລາຍງານຂອງທ່ານ",
    zh: "请保存此编号以便追踪您的报告",
  },
  reportSubmit: {
    en: "Submit Report",
    lo: "ສົ່ງລາຍງານ",
    zh: "提交报告",
  },
  reportFormChecklist: {
    en: "What we need from you",
    lo: "ຂໍ້ມູນທີ່ຕ້ອງການຈາກທ່ານ",
    zh: "我们需要您提供的信息",
  },
  reportSidebarHint: {
    en: "The more detail you provide, the faster our staff can match and return your item.",
    lo: "ຍິ່ງທ່ານໃຫ້ຂໍ້ມູນລະອຽດຫຼາຍເທົ່າໃດ ພະນັກງານກໍຈະສາມາດຈັບຄູ່ ແລະ ສົ່ງເຄື່ອງຄືນໄດ້ໄວຂຶ້ນ.",
    zh: "您提供的信息越详细，工作人员就能越快匹配并归还您的物品。",
  },
  reportStepNext: { en: "Continue", lo: "ຕໍ່ໄປ", zh: "下一步" },
  reportStepBack: { en: "Back", lo: "ກັບຄືນ", zh: "上一步" },
  reportStep1: {
    en: "Item Details",
    lo: "ລາຍລະອຽດສິ່ງຂອງ",
    zh: "物品详情",
  },
  reportStep2: {
    en: "Flight Details",
    lo: "ຂໍ້ມູນຖ້ຽວບິນ",
    zh: "航班详情",
  },
  reportStep3: {
    en: "Proof",
    lo: "ຫຼັກຖານ",
    zh: "证明",
  },
  reportStep4: {
    en: "Contact",
    lo: "ຕິດຕໍ່",
    zh: "联系方式",
  },
  reportStepOf: { en: "of", lo: "ຈາກ", zh: "/" },

  // ── Category labels ───────────────────────────────────────────────────────
  categoryElectronics: {
    en: "Electronics",
    lo: "ອຸປະກອນໄຟຟ້າ",
    zh: "电子产品",
  },
  categoryBaggage: { en: "Baggage", lo: "ກະເປົ໋າ", zh: "行李箱包" },
  categoryClothing: { en: "Clothing", lo: "ເຄື່ອງນຸ່ງ", zh: "服装" },
  categoryDocuments: { en: "Documents", lo: "ເອກະສານ", zh: "证件文件" },
  categoryJewelry: { en: "Jewelry", lo: "ເຄື່ອງປະດັບ", zh: "珠宝首饰" },
  categoryKeys: { en: "Keys", lo: "ກະແຈ", zh: "钥匙" },
  categoryCash: { en: "Cash", lo: "ເງິນສົດ", zh: "现金" },
  categoryToys: { en: "Toys", lo: "ຂອງຫຼິ້ນ", zh: "玩具" },
  categoryOther: { en: "Other", lo: "ອື່ນໆ", zh: "其他" },

  // ── Track claim ───────────────────────────────────────────────────────────
  trackTitle: {
    en: "Track Your Claim",
    lo: "ຕິດຕາມຄຳຮ້ອງຂອງທ່ານ",
    zh: "追踪您的认领申请",
  },
  trackSubtitle: {
    en: "Enter your reference code to check the status of your claim or report.",
    lo: "ປ້ອນລະຫັດອ້າງອິງເພື່ອກວດສອບສະຖານະຂອງຄຳຮ້ອງ ຫຼື ລາຍງານຂອງທ່ານ.",
    zh: "输入参考编号以查看您的认领或报告状态。",
  },
  trackPlaceholder: {
    en: "e.g. A1B2C",
    lo: "ເຊັ່ນ A1B2C",
    zh: "例如 A1B2C",
  },
  trackButton: {
    en: "Track",
    lo: "ຕິດຕາມ",
    zh: "查询",
  },
  trackSearching: {
    en: "Looking up your claim...",
    lo: "ກຳລັງຄົ້ນຫາຄຳຮ້ອງຂອງທ່ານ...",
    zh: "正在查找您的申请...",
  },
  trackNotFound: {
    en: "No claim found with this reference code.",
    lo: "ບໍ່ພົບຄຳຮ້ອງທີ່ກົງກັບລະຫັດອ້າງອິງນີ້.",
    zh: "未找到此参考编号对应的申请。",
  },
  trackNotFoundHint: {
    en: "Double-check the 5-character code and try again.",
    lo: "ກະລຸນາກວດເບິ່ງລະຫັດ 5 ຕົວອັກສອນ ແລ້ວລອງໃໝ່.",
    zh: "请仔细核对5位编号后重试。",
  },
  trackStatusLabel: {
    en: "Status",
    lo: "ສະຖານະ",
    zh: "状态",
  },
  trackClaimant: {
    en: "Claimant",
    lo: "ຜູ້ຮ້ອງ",
    zh: "申请人",
  },
  trackCategory: {
    en: "Category",
    lo: "ໝວດໝູ່",
    zh: "类别",
  },
  trackItemDesc: {
    en: "Item Description",
    lo: "ລາຍລະອຽດ",
    zh: "物品描述",
  },
  trackLocation: {
    en: "Lost Location",
    lo: "ສະຖານທີ່ເສຍ",
    zh: "丢失地点",
  },
  trackDate: {
    en: "Lost Date",
    lo: "ວັນທີ່ເສຍ",
    zh: "丢失日期",
  },
  trackSubmittedOn: {
    en: "Submitted",
    lo: "ສົ່ງຄຳຮ້ອງເມື່ອ",
    zh: "提交时间",
  },
  trackReviewedOn: {
    en: "Reviewed",
    lo: "ກວດສອບເມື່ອ",
    zh: "审核时间",
  },
  trackLinkedItem: {
    en: "Linked Item",
    lo: "ລາຍການທີ່ຜູກໄວ້",
    zh: "关联物品",
  },
  trackStaffNote: {
    en: "Staff Note",
    lo: "ບັນທຶກຈາກພະນັກງານ",
    zh: "工作人员备注",
  },
  trackStatusPending: {
    en: "Pending Review",
    lo: "ລໍຖ້າການກວດສອບ",
    zh: "待审核",
  },
  trackStatusApproved: {
    en: "Approved",
    lo: "ອະນຸມັດແລ້ວ",
    zh: "已批准",
  },
  trackStatusRejected: {
    en: "Rejected",
    lo: "ຖືກປະຕິເສດ",
    zh: "已拒绝",
  },
  trackStatusCompleted: {
    en: "Completed — Returned",
    lo: "ສຳເລັດແລ້ວ — ສົ່ງຄືນແລ້ວ",
    zh: "已完成 — 已归还",
  },
  trackPendingHint: {
    en: "Our staff will review your claim shortly. You will be contacted once a decision is made.",
    lo: "ພະນັກງານຂອງພວກເຮົາຈະກວດສອບຄຳຮ້ອງຂອງທ່ານໃນໄວໆນີ້. ທ່ານຈະຖືກຕິດຕໍ່ຫາເມື່ອມີການຕັດສິນໃຈ.",
    zh: "工作人员将尽快审核您的申请。决定作出后将与您联系。",
  },
  trackApprovedHint: {
    en: "Your claim has been approved. Our team will contact you to arrange item pickup or delivery.",
    lo: "ຄຳຮ້ອງຂອງທ່ານໄດ້ຮັບການອະນຸມັດແລ້ວ. ທີມງານຂອງພວກເຮົາຈະຕິດຕໍ່ຫາທ່ານເພື່ອຈັດການຮັບເຄື່ອງ.",
    zh: "您的申请已获批准。我们的团队将联系您安排物品取回。",
  },
  trackRejectedHint: {
    en: "Unfortunately, your claim was not approved. If you believe this is an error, please contact our staff.",
    lo: "ໜ້າເສຍດາຍ, ຄຳຮ້ອງຂອງທ່ານບໍ່ໄດ້ຮັບການອະນຸມັດ. ຫາກທ່ານຄິດວ່ານີ້ເປັນຄວາມຜິດພາດ, ກະລຸນາຕິດຕໍ່ພະນັກງານ.",
    zh: "很抱歉，您的申请未获批准。如果您认为有误，请联系工作人员。",
  },
  trackCompletedHint: {
    en: "Your item has been successfully returned. Thank you for using our Lost & Found service.",
    lo: "ເຄື່ອງຂອງທ່ານໄດ້ຖືກສົ່ງຄືນແລ້ວ. ຂອບໃຈທີ່ໃຊ້ບໍລິການເຄື່ອງເສຍ ແລະ ເຄື່ອງຕົກຄ້າງ.",
    zh: "您的物品已成功归还。感谢您使用我们的失物招领服务。",
  },
  // Timeline steps
  trackStepSubmitted: {
    en: "Claim Submitted",
    lo: "ສົ່ງຄຳຮ້ອງແລ້ວ",
    zh: "申请已提交",
  },
  trackStepReviewing: {
    en: "Under Review",
    lo: "ກຳລັງກວດສອບ",
    zh: "审核中",
  },
  trackStepApproved: {
    en: "Approved — Arrange Pickup",
    lo: "ອະນຸມັດແລ້ວ — ນັດຮັບເຄື່ອງ",
    zh: "已批准 — 安排取回",
  },
  trackStepRejected: {
    en: "Claim Rejected",
    lo: "ຄຳຮ້ອງຖືກປະຕິເສດ",
    zh: "申请被拒绝",
  },
  trackStepCompleted: {
    en: "Item Returned",
    lo: "ສົ່ງເຄື່ອງຄືນແລ້ວ",
    zh: "物品已归还",
  },
  trackBackToSearch: {
    en: "Back to Search",
    lo: "ກັບໄປຄົ້ນຫາ",
    zh: "返回搜索",
  },
  trackAnother: {
    en: "Track Another Claim",
    lo: "ຕິດຕາມຄຳຮ້ອງອື່ນ",
    zh: "查询其他申请",
  },

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
