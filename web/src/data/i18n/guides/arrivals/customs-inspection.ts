import type { Lang } from "@/types/language";

export const customsInspection = {
  title: {
    en: "Customs Inspection",
    lo: "ການກວດກາພາສີ (ຂາເຂົ້າ)",
    zh: "海关检查（入境）",
  },
  intro: {
    en: "All passengers arriving at Bokeo International Airport must pass through Customs. Lao PDR operates a dual-channel system — choose Green or Red based on what you are carrying.",
    lo: "ຜູ້ໂດຍສານທຸກຄົນທີ່ເດີນທາງມາຮອດສະໝາມບິນສາກົນບໍ່ແກ້ວ ຕ້ອງຜ່ານດ່ານພາສີ. ສປປ ລາວ ໃຊ້ລະບົບ 2 ຊ່ອງທາງ — ເລືອກ ສີຂຽວ ຫຼື ສີແດງ ຕາມສິ່ງຂອງທີ່ທ່ານຖືຢູ່.",
    zh: "所有抵达博胶国际机场的旅客须通过海关。老挝采用双通道制度 — 根据您携带的物品选择绿色或红色通道。",
  },

  // ── Channels ─────────────────────────────────────────────────────────────

  channelTitle: {
    en: "Choose Your Channel",
    lo: "ເລືອກຊ່ອງທາງ",
    zh: "选择通道",
  },
  greenChannelTitle: {
    en: "Green Channel",
    lo: "ຊ່ອງທາງສີຂຽວ",
    zh: "绿色通道",
  },
  greenChannelBadge: {
    en: "Nothing to Declare",
    lo: "ບໍ່ມີລາຍການແຈ້ງ",
    zh: "无需申报",
  },
  greenChannelDesc: {
    en: "For passengers whose goods do not exceed duty-free limits and have no restricted or prohibited items.",
    lo: "ສຳລັບຜູ້ໂດຍສານທີ່ສິນຄ້າບໍ່ເກີນຂອບເຂດປອດພາສີ ແລະ ບໍ່ມີສິ່ງຂອງທີ່ຕ້ອງຫ້າມ.",
    zh: "适用于携带物品未超出免税限额且无限制或禁止物品的旅客。",
  },
  redChannelTitle: { en: "Red Channel", lo: "ຊ່ອງທາງສີແດງ", zh: "红色通道" },
  redChannelBadge: {
    en: "Goods to Declare",
    lo: "ມີລາຍການແຈ້ງ",
    zh: "需要申报",
  },
  redChannelDesc: {
    en: "For passengers carrying goods over duty-free limits, commercial samples, or restricted/prohibited items.",
    lo: "ສຳລັບຜູ້ໂດຍສານທີ່ຖືສິນຄ້າເກີນຂີດຈຳກັດ, ຕົວຢ່າງທາງການຄ້າ, ຫຼື ສິ່ງຂອງທີ່ຈຳກັດ.",
    zh: "适用于携带物品超出免税限额、商业样品或限制/禁止物品的旅客。",
  },

  // ── Duty-Free Allowances ──────────────────────────────────────────────────

  dutyFreeTitle: {
    en: "Duty-Free Allowances",
    lo: "ລາຍການທີ່ໄດ້ຮັບການຍົກເວັ້ນພາສີ",
    zh: "免税额度",
  },
  dutyFreeNote: {
    en: "For travelers aged 18 and older — personal use only",
    lo: "ສຳລັບຜູ້ໂດຍສານອາຍຸ 18 ປີຂຶ້ນໄປ — ໃຊ້ສ່ວນຕົວເທົ່ານັ້ນ",
    zh: "适用于18岁及以上旅客 — 仅限个人使用",
  },

  tobaccoTitle: { en: "Tobacco", lo: "ຢາສູບ", zh: "烟草" },
  tobacco1: { en: "200 cigarettes", lo: "ຢາສູບ 200 ກອກ", zh: "200支香烟" },
  tobacco2: { en: "50 cigars", lo: "ຊີກາ 50 ກອກ", zh: "50支雪茄" },
  tobacco3: { en: "250g tobacco", lo: "ຢາສູບ 250 ກຣາມ", zh: "250克烟草" },

  alcoholTitle: { en: "Alcohol", lo: "ເຄື່ອງດື່ມທີ່ມີທາດເຫຼົ້າ", zh: "酒类" },
  alcohol1: {
    en: "2 liters of wine or spirits",
    lo: "ເຫຼົ້າແວງ ຫຼື ເຫຼົ້າຂາວ 2 ລິດ",
    zh: "葡萄酒或烈酒 2 升",
  },
  alcohol2: { en: "5 liters of beer", lo: "ເບຍ 5 ລິດ", zh: "啤酒 5 升" },

  perfumeTitle: { en: "Perfume", lo: "ນ້ຳຫອມ", zh: "香水" },
  perfumeDesc: {
    en: "1 item for personal use",
    lo: "1 ຊິ້ນ ສຳລັບໃຊ້ສ່ວນຕົວ",
    zh: "1件个人使用",
  },

  personalTitle: {
    en: "Personal Effects",
    lo: "ເຄື່ອງໃຊ້ສ່ວນຕົວ",
    zh: "个人物品",
  },
  personalDesc: {
    en: "Used personal items in reasonable quantities — not for commercial use",
    lo: "ຂອງໃຊ້ສ່ວນຕົວທີ່ໃຊ້ແລ້ວ ໃນປະລິມານທີ່ສົມເຫດສົມຜົນ — ບໍ່ແມ່ນເພື່ອການຄ້າ",
    zh: "合理数量的已使用个人物品 — 非商业用途",
  },

  // ── Currency Declaration ──────────────────────────────────────────────────

  currencyTitle: {
    en: "Currency Declaration",
    lo: "ການແຈ້ງສະກຸນເງິນ",
    zh: "货币申报",
  },
  currencyForeignLabel: {
    en: "Foreign Currency",
    lo: "ເງິນຕາຕ່າງປະເທດ",
    zh: "外币",
  },
  currencyForeignDesc: {
    en: "Amounts equivalent to or exceeding $10,000 USD must be declared",
    lo: "ຈຳນວນທຽບເທົ່າ ຫຼື ເກີນ 10,000 ໂດລາ ຕ້ອງແຈ້ງ",
    zh: "等值或超过1万美元须申报",
  },
  currencyKipLabel: { en: "Lao Kip", lo: "ເງິນກີບລາວ", zh: "老挝基普" },
  currencyKipDesc: {
    en: "Import and export is strictly regulated — consult Customs if carrying large amounts",
    lo: "ການນຳເຂົ້າ-ສົ່ງອອກ ຖືກຄວບຄຸມຢ່າງເຂັ້ມງວດ — ປຶກສາເຈົ້າໜ້າທີ່ພາສີ ຫາກຖືຫຼາຍ",
    zh: "进出口受严格监管 — 携带大额基普请咨询海关人员",
  },
  currencyMetalsLabel: { en: "Precious Metals", lo: "ໂລຫະມີຄ່າ", zh: "贵金属" },
  currencyMetalsDesc: {
    en: "Gold bars and precious metals/stones must be declared if value exceeds 100 million Kip",
    lo: "ຄຳແທ່ງ ແລະ ໂລຫະ/ອັນຍະມະນີ ຕ້ອງແຈ້ງ ຫາກມູນຄ່າເກີນ 100 ລ້ານກີບ",
    zh: "金条及贵金属/宝石价值超过1亿基普须申报",
  },

  // ── Prohibited Items ──────────────────────────────────────────────────────

  prohibitedTitle: {
    en: "Prohibited Items",
    lo: "ສິ່ງຂອງທີ່ຫ້າມນຳເຂົ້າ",
    zh: "禁止进口物品",
  },
  prohibitedDesc: {
    en: "Strictly forbidden from entering Lao PDR",
    lo: "ຫ້າມນຳເຂົ້າ ສປປ ລາວ ຢ່າງເດັດຂາດ",
    zh: "严禁携带入境老挝",
  },
  prohibitedNarcoticsLabel: {
    en: "Narcotics & Psychotropics",
    lo: "ຢາເສບຕິດ ແລະ ສານອອກລິດ",
    zh: "毒品及精神药物",
  },
  prohibitedNarcoticsDesc: {
    en: "All illegal drugs and psychotropic substances — severe penalties including death penalty for trafficking",
    lo: "ຢາເສບຕິດ ແລະ ສານອອກລິດທຸກຊະນິດ — ໂທດໜັກເຖິງຂັ້ນປະຫານຊີວິດ ສຳລັບການຄ້າຂາຍ",
    zh: "所有违禁毒品及精神药物 — 贩毒将受包括死刑在内的严厉惩处",
  },
  prohibitedWeaponsLabel: {
    en: "Weapons & Explosives",
    lo: "ອາວຸດ ແລະ ວັດຖຸລະເບີດ",
    zh: "武器及爆炸物",
  },
  prohibitedWeaponsDesc: {
    en: "Firearms, ammunition, and explosives without special permits",
    lo: "ອາວຸດ, ລູກປືນ ແລະ ວັດຖຸລະເບີດ ທີ່ບໍ່ມີໃບອະນຸຍາດ",
    zh: "枪支、弹药和爆炸物（无特别许可）",
  },
  prohibitedPornographicLabel: {
    en: "Pornographic Materials",
    lo: "ສື່ລາມົກ",
    zh: "色情材料",
  },
  prohibitedPornographicDesc: {
    en: "Books, videos, or any materials of obscene nature",
    lo: "ໜັງສື, ວີດີໂອ ຫຼື ສື່ທີ່ມີລັກສະນະລາມົກ",
    zh: "淫秽书籍、视频或相关材料",
  },

  // ── Restricted Items ──────────────────────────────────────────────────────

  restrictedTitle: {
    en: "Restricted Items",
    lo: "ສິ່ງຂອງທີ່ຕ້ອງມີໃບອະນຸຍາດ",
    zh: "限制物品",
  },
  restrictedDesc: {
    en: "May be imported only with official permits",
    lo: "ສາມາດນຳເຂົ້າໄດ້ ເມື່ອມີໃບອະນຸຍາດທາງການເທົ່ານັ້ນ",
    zh: "仅凭官方许可方可进口",
  },
  restrictedWildlifeLabel: {
    en: "Wildlife Products",
    lo: "ຜະລິດຕະພັນສັດປ່າ",
    zh: "野生动物产品",
  },
  restrictedWildlifeDesc: {
    en: "Endangered species and products derived from them — CITES regulations apply",
    lo: "ສັດໃກ້ສູນພັນ ແລະ ຜະລິດຕະພັນຈາກພວກມັນ — ຕາມລະບຽບ CITES",
    zh: "濒危物种及其制品 — 适用《濒危野生动植物种国际贸易公约》",
  },
  restrictedPlantsLabel: {
    en: "Plant & Animal Products",
    lo: "ຜະລິດຕະພັນພືດ ແລະ ສັດ",
    zh: "植物及动物产品",
  },
  restrictedPlantsDesc: {
    en: "Fresh meat, fruits, and vegetables may require sanitary or phytosanitary certificate",
    lo: "ຊີ້ນສົດ, ໝາກໄມ້ ແລະ ຜັກ ອາດຕ້ອງມີໃບຢັ້ງຢືນສຸຂະນາໄມ ຫຼື ກັກກັນພືດ",
    zh: "新鲜肉类、水果和蔬菜可能需要卫生或植物检疫证书",
  },
  restrictedTelecomLabel: {
    en: "Telecommunications",
    lo: "ອຸປະກອນສື່ສານ",
    zh: "通信设备",
  },
  restrictedTelecomDesc: {
    en: "Certain radio transmitters and communication equipment require special authorization",
    lo: "ເຄື່ອງສົ່ງວິທະຍຸ ແລະ ອຸປະກອນສື່ສານບາງຊະນິດ ຕ້ອງໄດ້ຮັບອະນຸຍາດພິເສດ",
    zh: "某些无线电发射设备和通信设备需要特别授权",
  },
  restrictedAntiquesLabel: {
    en: "Antiques & Artifacts",
    lo: "ຂອງໂບຣານ ແລະ ວັດຖຸວັດທະນະທຳ",
    zh: "古董及文物",
  },
  restrictedAntiquesDesc: {
    en: "Cultural artifacts and Buddha images require export permit from Ministry of Information, Culture, and Tourism",
    lo: "ວັດຖຸວັດທະນະທຳ ແລະ ພະພຸດທະຮູບ ຕ້ອງມີໃບອະນຸຍາດຈາກ ກະຊວງຖະແຫຼງຂ່າວ, ວັດທະນະທຳ ແລະ ທ່ອງທ່ຽວ",
    zh: "文物和佛像需持有文化和旅游部颁发的出口许可",
  },

  // ── Penalties ─────────────────────────────────────────────────────────────

  penaltiesTitle: {
    en: "Penalties",
    lo: "ໂທດ ແລະ ການລົງໂທດ",
    zh: "处罚规定",
  },
  penaltiesDesc: {
    en: "Failure to declare goods or attempting to smuggle prohibited items violates Lao Customs Law. Penalties include heavy fines, seizure of goods, and potential legal prosecution.",
    lo: "ການບໍ່ແຈ້ງ ຫຼື ພະຍາຍາມລັກລອບນຳເຂົ້າສິ່ງຂອງທີ່ຫ້າມ ຖືວ່າຜິດກົດໝາຍພາສີລາວ. ໂທດລວມທັງຄ່າປັບໃໝໜັກ, ການອາຍັດສິ່ງຂອງ ແລະ ອາດຖືກດຳເນີນຄະດີ.",
    zh: "未申报物品或试图走私违禁品违反老挝海关法。处罚包括重罚款、货物没收及可能的法律追诉。",
  },

  // ── Official Disclaimer ───────────────────────────────────────────────────

  disclaimerTitle: {
    en: "Official Notice",
    lo: "ແຈ້ງການທາງການ",
    zh: "官方声明",
  },
  disclaimerDesc: {
    en: "Customs regulations and duty-free limits are subject to change. For the most authoritative and up-to-date information, visit the official government website.",
    lo: "ລະບຽບພາສີ ແລະ ຂີດຈຳກັດປອດພາສີ ອາດປ່ຽນແປງໄດ້. ກວດສອບຂໍ້ມູນທີ່ຖືກຕ້ອງຫຼ້າສຸດ ທີ່ເວັບໄຊທາງການ.",
    zh: "海关法规和免税限额可能随时变更。如需最权威的最新信息，请访问官方政府网站。",
  },
  disclaimerLinkText: {
    en: "customs.gov.la",
    lo: "customs.gov.la",
    zh: "customs.gov.la",
  },
} as const;

export type CustomsInspectionKey = keyof typeof customsInspection;

export const tCustomsInspection = (k: CustomsInspectionKey, lang: Lang) =>
  customsInspection[k][lang] ?? customsInspection[k].en;
