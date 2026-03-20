import type { Lang } from "@/types/language";

export const feedback = {
  // ── Metadata ─────────────────────────────────────────────────────────────
  pageTitle: {
    en: "Feedback",
    lo: "ຄຳຄິດເຫັນ",
    zh: "意见反馈",
  },
  pageDescription: {
    en: "Share your experience at Bokeo International Airport and help us improve our services",
    lo: "ແບ່ງປັນປະສົບການຂອງທ່ານຢູ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ ແລະ ຊ່ວຍພວກເຮົາປັບປຸງການບໍລິການ",
    zh: "分享您在博胶国际机场的体验，帮助我们改进服务",
  },

  // ── Hero ─────────────────────────────────────────────────────────────────
  heroTitle: {
    en: "Share Your Feedback",
    lo: "ແບ່ງປັນຄຳຄິດເຫັນຂອງທ່ານ",
    zh: "分享您的意见",
  },
  heroSubtitle: {
    en: "Your opinion helps us improve the airport experience for everyone.",
    lo: "ຄຳຄິດເຫັນຂອງທ່ານຊ່ວຍໃຫ້ພວກເຮົາປັບປຸງການບໍລິການຂອງສະໜາມບິນໃຫ້ດີຂຶ້ນ.",
    zh: "您的意见帮助我们为所有人改善机场体验。",
  },

  // ── Form Field Labels ────────────────────────────────────────────────────
  rating: { en: "Overall Rating", lo: "ຄະແນນລວມ", zh: "总体评分" },
  ratingOptional: {
    en: "Overall Rating (optional)",
    lo: "ຄະແນນລວມ (ເລືອກໄດ້)",
    zh: "总体评分（选填）",
  },
  category: { en: "Category", lo: "ໝວດໝູ່", zh: "类别" },
  comment: { en: "Comment", lo: "ຄຳຄິດເຫັນ", zh: "评价" },
  commentPlaceholder: {
    en: "Tell us about your experience...",
    lo: "ບອກພວກເຮົາກ່ຽວກັບປະສົບການຂອງທ່ານ...",
    zh: "请描述您的体验...",
  },
  terminal: {
    en: "Terminal (optional)",
    lo: "ອາຄານຜູ້ໂດຍສານ (ເລືອກໄດ້)",
    zh: "航站楼（选填）",
  },
  specificArea: {
    en: "Specific Area (optional)",
    lo: "ລະບຸສະຖານທີ (ຖ້າມີ)",
    zh: "具体区域（选填）",
  },
  specificAreaPlaceholder: {
    en: "e.g. Restroom near Gate B12",
    lo: "ຕົວຢ່າງ: ຫ້ອງນ້ຳໃກ້ປະຕູ B12",
    zh: "例如：B12号门附近的洗手间",
  },
  followUp: {
    en: "I'd like to be contacted about my feedback",
    lo: "ຂ້ອຍຕ້ອງການໃຫ້ຕິດຕໍ່ກັບກ່ຽວກັບຄຳຄິດເຫັນຂອງຂ້ອຍ",
    zh: "我希望就我的反馈与我联系",
  },
  email: { en: "Email", lo: "ອີເມວ", zh: "电子邮件" },
  emailPlaceholder: {
    en: "your@email.com",
    lo: "your@email.com",
    zh: "your@email.com",
  },
  phone: {
    en: "Phone (optional)",
    lo: "ເບີໂທລະສັບ (ເລືອກໄດ້)",
    zh: "电话（选填）",
  },
  phonePlaceholder: {
    en: "+856 20 xxx xxxx",
    lo: "+856 20 xxx xxxx",
    zh: "+856 20 xxx xxxx",
  },
  attachFiles: {
    en: "Attach Files (optional)",
    lo: "ແນບໄຟລ໌ (ເລືອກໄດ້)",
    zh: "上传附件（选填）",
  },
  attachFilesHint: {
    en: "Up to 5 files. Photos, documents, or videos.",
    lo: "ສູງສຸດ 5 ໄຟລ໌. ຮູບພາບ, ເອກະສານ ຫຼື ວິດີໂອ.",
    zh: "最多5个文件。图片、文档或视频。",
  },

  // ── Terminal Options ─────────────────────────────────────────────────────
  terminalInt: {
    en: "International — Terminal A",
    lo: "ສາກົນ — ອາຄານ A",
    zh: "国际 — 航站楼A",
  },
  terminalDom: {
    en: "Domestic — Terminal B",
    lo: "ພາຍໃນ — ອາຄານ B",
    zh: "国内 — 航站楼B",
  },

  // ── Category Options ─────────────────────────────────────────────────────
  categoryClean: { en: "Cleanliness", lo: "ຄວາມສະອາດ", zh: "清洁卫生" },
  categorySecurity: { en: "Security", lo: "ຄວາມປອດໄພ", zh: "安保服务" },
  categoryWifi: { en: "Wi-Fi", lo: "ສັນຍານ Wi-Fi", zh: "Wi-Fi网络" },
  categoryFood: {
    en: "Food & Beverage",
    lo: "ອາຫານ ແລະ ເຄື່ອງດື່ມ",
    zh: "餐饮服务",
  },
  categoryStaff: {
    en: "Staff Service",
    lo: "ການບໍລິການຂອງພະນັກງານ",
    zh: "员工服务",
  },
  categoryFacilities: {
    en: "Facilities",
    lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
    zh: "设施设备",
  },
  categoryOther: { en: "Other", lo: "ອື່ນໆ", zh: "其他" },
  selectCategory: {
    en: "Select a category...",
    lo: "ເລືອກໝວດໝູ່...",
    zh: "请选择类别...",
  },

  // ── Buttons ──────────────────────────────────────────────────────────────
  submit: { en: "Submit Feedback", lo: "ສົ່ງຄຳຄິດເຫັນ", zh: "提交反馈" },
  submitting: { en: "Submitting...", lo: "ກຳລັງສົ່ງ...", zh: "提交中..." },
  submitAnother: { en: "Submit Another", lo: "ສົ່ງຄືນໃໝ່", zh: "再次提交" },

  // ── States ───────────────────────────────────────────────────────────────
  thankYouTitle: { en: "Thank You!", lo: "ຂອບໃຈ!", zh: "感谢您的反馈！" },
  thankYouMessage: {
    en: "Your feedback has been submitted successfully. We appreciate your time and will use your input to improve our services.",
    lo: "ຄຳຄິດເຫັນຂອງທ່ານໄດ້ຖືກສົ່ງສຳເລັດແລ້ວ. ພວກເຮົາຂໍຂອບໃຈສຳລັບເວລາຂອງທ່ານ ແລະ ຈະນຳເອົາຂໍ້ມູນໄປປັບປຸງການບໍລິການໃຫ້ດີຂຶ້ນ.",
    zh: "您的反馈已成功提交。感谢您抽出宝贵时间，我们将根据您的建议持续改进服务。",
  },

  // ── UI strings ───────────────────────────────────────────────────────────
  addFile: { en: "Attach a file", lo: "ແນບໄຟລ໌", zh: "添加文件" },
  errorGeneric: {
    en: "Failed to submit. Please try again.",
    lo: "ເກີດຂໍ້ຜິດພາດ. ກະລຸນາລອງໃໝ່.",
    zh: "提交失败，请重试。",
  },

  // ── Validation ───────────────────────────────────────────────────────────
  required: {
    en: "This field is required",
    lo: "ກະລຸນາປ້ອນຂໍ້ມູນ",
    zh: "此字段为必填项",
  },
  emailRequired: {
    en: "Email is required when follow-up is requested",
    lo: "ກະລຸນາປ້ອນອີເມວເມື່ອຕ້ອງການໃຫ້ຕິດຕໍ່ກັບ",
    zh: "请求跟进时需要提供邮箱",
  },

  // ── Rating Descriptions ──────────────────────────────────────────────────
  star1: { en: "Poor", lo: "ປັບປຸງ", zh: "极差" },
  star2: { en: "Fair", lo: "ພໍໃຊ້", zh: "一般" },
  star3: { en: "Good", lo: "ດີ", zh: "满意" },
  star4: { en: "Very Good", lo: "ດີຫຼາຍ", zh: "非常满意" },
  star5: { en: "Excellent", lo: "ດີເລີດ", zh: "卓越" },
} as const;

export type FeedbackKey = keyof typeof feedback;

export const tFeedback = (k: FeedbackKey, lang: Lang) =>
  feedback[k][lang] ?? feedback[k].en;
