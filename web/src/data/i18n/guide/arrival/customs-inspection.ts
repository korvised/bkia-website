import type { Lang } from "@/types/language";

export const customsInspection = {
  title: {
    en: "Customs Declaration (International Arrival)",
    lo: "ການແຈ້ງພາສີ (ຂາເຂົ້າ-ສາກົນ)",
    zh: "海关申报（入境）",
  },
  intro: {
    en: "International passengers arriving at Bokeo International Airport must declare goods subject to customs duties and comply with Lao PDR import regulations. Complete your customs declaration card before reaching the inspection counter.",
    lo: "ຜູ້ໂດຍສານສາກົນທີ່ເດີນທາງມາຮອດສະໜາມບິນສາກົນບໍ່ແກ້ວ ຕ້ອງໄດ້ແຈ້ງສິນຄ້າທີ່ຕ້ອງເສຍພາສີ ແລະ ປະຕິບັດຕາມລະບຽບການນຳເຂົ້າຂອງ ສປປ ລາວ. ກະລຸນາຕື່ມໃບແຈ້ງພາສີໃຫ້ຄົບຖ້ວນ ກ່ອນຈະໄປຮອດເຄົາເຕີກວດກາ.",
    zh: "抵达博胶国际机场的国际旅客必须申报需缴纳关税的物品，并遵守老挝人民民主共和国进口规定。请在到达检查柜台前填写海关申报卡。",
  },

  declarationTitle: {
    en: "Declaration Requirements",
    lo: "ຂໍ້ກຳນົດໃນການແຈ້ງພາສີ",
    zh: "申报要求",
  },
  mustDeclare: {
    en: "You MUST Declare:",
    lo: "ລາຍການທີ່ທ່ານຕ້ອງແຈ້ງ:",
    zh: "您必须申报：",
  },
  declareCurrency: {
    en: "Currency: Foreign currency over USD 10,000 or equivalent",
    lo: "ເງິນຕາ: ເງິນຕາຕ່າງປະເທດ ທີ່ມີມູນຄ່າເກີນ 10,000 ໂດລາ ຫຼື ທຽບເທົ່າ",
    zh: "货币：超过10,000美元或等值外币",
  },
  declareLaoKip: {
    en: "Lao Kip: Amounts over 10,000,000 LAK",
    lo: "ເງິນກີບລາວ: ຈຳນວນເກີນ 10,000,000 ກີບ",
    zh: "老挝基普：超过10,000,000基普",
  },
  declareGold: {
    en: "Gold & Precious Metals: All jewelry and gold bars/bullion",
    lo: "ຄຳ ແລະ ໂລຫະທີ່ມີຄ່າ: ເຄື່ອງປະດັບທັງໝົດ ແລະ ຄຳແທ່ງ",
    zh: "黄金和贵金属：所有珠宝和金条/金块",
  },
  declareCommercial: {
    en: "Commercial Goods: Items for resale or business use",
    lo: "ສິນຄ້າເພື່ອການຄ້າ: ສິ່ງຂອງທີ່ຈະນຳມາຂາຍຕໍ່ ຫຼື ໃຊ້ໃນທາງທຸລະກິດ",
    zh: "商业货物：用于转售或商业用途的物品",
  },
  declareRestricted: {
    en: "Restricted Items: Medications, plants, animal products",
    lo: "ເຄື່ອງຂອງຕ້ອງຫ້າມ ຫຼື ຈຳກັດ: ຢາປິ່ນປົວພະຍາດ, ພືດ, ຜະລິດຕະພັນຈາກສັດ",
    zh: "限制物品：药品、植物、动物产品",
  },

  dutyFreeTitle: {
    en: "Duty-Free Allowances",
    lo: "ລາຍການທີ່ໄດ້ຮັບການຍົກເວັ້ນພາສີ",
    zh: "免税额度",
  },
  tobaccoTitle: {
    en: "Tobacco Products",
    lo: "ຜະລິດຕະພັນຢາສູບ",
    zh: "烟草制品",
  },
  tobacco1: {
    en: "200 cigarettes, OR",
    lo: "ຢາສູບ 200 ກອກ, ຫຼື",
    zh: "200支香烟，或",
  },
  tobacco2: {
    en: "50 cigars, OR",
    lo: "ຊີກາ 50 ກອກ, ຫຼື",
    zh: "50支雪茄，或",
  },
  tobacco3: {
    en: "250g of tobacco",
    lo: "ຢາເສັ້ນ ຫຼື ຢາສູບ 250 ກຣາມ",
    zh: "250克烟草",
  },

  alcoholTitle: {
    en: "Alcohol",
    lo: "ເຄື່ອງດື່ມທີ່ມີທາດເຫຼົ້າ",
    zh: "酒类",
  },
  alcohol1: {
    en: "1 liter of spirits, OR",
    lo: "ເຫຼົ້າແຮງ 1 ລິດ, ຫຼື",
    zh: "1升烈酒，或",
  },
  alcohol2: {
    en: "2 liters of wine/beer",
    lo: "ເຫຼົ້າແວງ ຫຼື ເບຍ 2 ລິດ",
    zh: "2升葡萄酒/啤酒",
  },

  personalTitle: {
    en: "Personal Items",
    lo: "ເຄື່ອງໃຊ້ສ່ວນຕົວ",
    zh: "个人物品",
  },
  personal1: {
    en: "Perfume: 250ml",
    lo: "ນ້ຳຫອມ: 250 ມິນລິລິດ",
    zh: "香水：250毫升",
  },
  personal2: {
    en: "Gifts: up to USD 500",
    lo: "ຂອງຂວັນ: ມູນຄ່າບໍ່ເກີນ 500 ໂດລາ",
    zh: "礼品：最多500美元",
  },

  prohibitedTitle: {
    en: "Strictly Prohibited Items",
    lo: "ສິ່ງຂອງທີ່ຫ້າມນຳເຂົ້າເດັດຂາດ",
    zh: "严禁物品",
  },
  prohibitedDesc: {
    en: "The following items are absolutely forbidden from entering Lao PDR:",
    lo: "ລາຍການຕໍ່ໄປນີ້ແມ່ນຫ້າມນຳເຂົ້າ ສປປ ລາວ ຢ່າງເດັດຂາດ:",
    zh: "以下物品严禁带入老挝人民民主共和国：",
  },
  prohibitedNarcotics: {
    en: "Narcotics: All illegal drugs - Severe penalties including death penalty for trafficking",
    lo: "ຢາເສບຕິດ: ຢາເສບຕິດໃຫ້ໂທດທຸກຊະນິດ - ມີໂທດໜັກເຖິງຂັ້ນປະຫານຊີວິດ ສຳລັບການຄ້າມະນຸດ ຫຼື ຂົນສົ່ງຢາເສບຕິດ",
    zh: "毒品：所有违禁毒品 - 贩毒将受到包括死刑在内的严厉惩罚",
  },
  prohibitedWeapons: {
    en: "Weapons: Firearms, ammunition, explosives without special permits",
    lo: "ອາວຸດ: ອາວຸດເສິກ, ລູກປືນ, ວັດຖຸລະເບີດ ທີ່ບໍ່ມີໃບອະນຸຍາດພິເສດ",
    zh: "武器：枪支、弹药、爆炸物（无特别许可）",
  },
  prohibitedPornographic: {
    en: "Pornographic Materials: Books, videos, magazines of obscene nature",
    lo: "ສື່ລາມົກ: ໜັງສື, ວິດີໂອ, ວາລະສານ ທີ່ມີລັກສະນະຄັດຕໍ່ວັດທະນະທຳ",
    zh: "色情材料：淫秽书籍、视频、杂志",
  },
  prohibitedCounterfeit: {
    en: "Counterfeit Goods: Fake branded products, pirated media",
    lo: "ສິນຄ້າລະເມີດລິຂະສິດ: ສິນຄ້າປອມແປງຍີ່ຫໍ້, ແຜ່ນຊີດີ/ດີວີດີ ເຖື່ອນ",
    zh: "假冒商品：假冒品牌产品、盗版媒体",
  },
  prohibitedEndangered: {
    en: "Endangered Species: Products from protected animals (ivory, certain plants)",
    lo: "ສັດປ່າໃກ້ສູນພັນ: ຜະລິດຕະພັນຈາກສັດປ່າຫວງຫ້າມ (ງາຊ້າງ, ພືດບາງຊະນິດ)",
    zh: "濒危物种：受保护动物产品（象牙、某些植物）",
  },

  specialRulesTitle: {
    en: "Special Import Rules",
    lo: "ລະບຽບການນຳເຂົ້າພິເສດ",
    zh: "特殊进口规定",
  },
  medicationsTitle: {
    en: "Medications:",
    lo: "ຢາປິ່ນປົວພະຍາດ:",
    zh: "药品：",
  },
  medicationsDesc: {
    en: "Prescription drugs allowed for personal use (up to 3 months supply). Must have prescription and medical certificate in English or Lao. Controlled substances require prior authorization.",
    lo: "ຢາທີ່ແພດສັ່ງແມ່ນອະນຸຍາດໃຫ້ນຳເຂົ້າເພື່ອໃຊ້ສ່ວນຕົວ (ບໍ່ເກີນ 3 ເດືອນ). ຕ້ອງມີໃບສັ່ງແພດ ແລະ ໃບຢັ້ງຢືນທາງການແພດເປັນພາສາລາວ ຫຼື ອັງກິດ. ສານຄວບຄຸມຕ້ອງໄດ້ຮັບອະນຸຍາດລ່ວງໜ້າ.",
    zh: "允许个人使用的处方药（最多3个月用量）。必须有英文或老挝文的处方和医疗证明。管制物质需事先授权。",
  },
  foodItemsTitle: {
    en: "Food Items:",
    lo: "ຜະລິດຕະພັນອາຫານ:",
    zh: "食品：",
  },
  foodItemsDesc: {
    en: "Packaged, commercially sealed food products generally allowed. Fresh fruits, vegetables, meat, and dairy products are restricted. Declare all food items.",
    lo: "ອາຫານທີ່ບັນຈຸພັນ ແລະ ປິດສະຫຼາກທາງການຄ້າແມ່ນສາມາດນຳເຂົ້າໄດ້. ສ່ວນໝາກໄມ້ສົດ, ຜັກ, ຊີ້ນ ແລະ ຜະລິດຕະພັນນົມ ແມ່ນຖືກຈຳກັດ. ກະລຸນາແຈ້ງລາຍການອາຫານທັງໝົດ.",
    zh: "包装完好、有商业密封的食品通常允许。新鲜水果、蔬菜、肉类和乳制品受限。请申报所有食品。",
  },
  plantsTitle: {
    en: "Plants & Seeds:",
    lo: "ພືດ ແລະ ເມັດພັນ:",
    zh: "植物和种子：",
  },
  plantsDesc: {
    en: "Require phytosanitary certificate. Most live plants prohibited without agricultural department approval.",
    lo: "ຕ້ອງມີໃບຢັ້ງຢືນສຸຂະອະນາໄມພືດ. ພືດທີ່ມີຊີວິດສ່ວນໃຫຍ່ແມ່ນຫ້າມນຳເຂົ້າ ຫາກບໍ່ໄດ້ຮັບອະນຸຍາດຈາກຂະແໜງກະສິກຳ.",
    zh: "需要植物检疫证书。大多数活体植物没有农业部批准不得携带。",
  },
  electronicsTitle: {
    en: "Electronics:",
    lo: "ເຄື່ອງເອເລັກໂຕຣນິກ:",
    zh: "电子产品：",
  },
  electronicsDesc: {
    en: "Personal laptops, phones, cameras allowed. Professional equipment may require temporary import permit. Drones require special authorization.",
    lo: "ຄອມພິວເຕີ, ໂທລະສັບ, ກ້ອງຖ່າຍຮູບສ່ວນຕົວແມ່ນອະນຸຍາດ. ອຸປະກອນມືອາຊີບອາດຕ້ອງມີໃບອະນຸຍາດນຳເຂົ້າຊົ່ວຄາວ. ສຳລັບໂດຣນ (Drone) ແມ່ນຕ້ອງໄດ້ຮັບອະນຸຍາດພິເສດ.",
    zh: "允许携带个人笔记本电脑、手机、相机。专业设备可能需要临时进口许可。无人机需要特别授权。",
  },

  proTip: {
    en: "Pro Tip: Fill out your customs declaration card during the flight. Have your passport and arrival card ready. Declaring items honestly prevents delays and potential fines. When in doubt, declare it!",
    lo: "ຄຳແນະນຳ: ຄວນຕື່ມໃບແຈ້ງພາສີໃຫ້ສຳເລັດໃນລະຫວ່າງການບິນ. ກຽມໜັງສືຜ່ານແດນ ແລະ ໃບແຈ້ງເຂົ້າ-ອອກໃຫ້ພ້ອມ. ການແຈ້ງລາຍການຢ່າງຊື່ສັດຈະຊ່ວຍຫຼຸດຜ່ອນຄວາມລ່າຊ້າ ແລະ ຄ່າປັບໃໝ. ຫາກທ່ານບໍ່ໝັ້ນໃຈ, ແນະນຳໃຫ້ແຈ້ງໄວ້ກ່ອນ!",
    zh: "小贴士：请在飞行途中填写海关申报卡。准备好护照和入境卡。如实申报可避免延误和罚款。如有疑问，请申报！",
  },
} as const;

export type CustomsInspectionKey = keyof typeof customsInspection;

export const tCustomsInspection = (k: CustomsInspectionKey, lang: Lang) =>
  customsInspection[k][lang] ?? customsInspection[k].en;
