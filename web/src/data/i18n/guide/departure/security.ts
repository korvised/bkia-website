import type { Lang } from "@/types/language";

export const security = {
  // Page title
  title: {
    en: "Security Screening",
    lo: "ກວດກາດ້ານການປ້ອງກັນຄວາມປອດໄພ",
    zh: "安全检查",
  },

  // Introduction
  intro: {
    en: "All passengers and cabin baggage must pass through security screening before entering the departure area. This is mandatory for your safety and in compliance with international aviation security standards.",
    lo: "ຜູ້ໂດຍສານ ແລະ ກະເປົາຖືຂຶ້ນເຮືອບິນທັງໝົດຕ້ອງຜ່ານການກວດກາ ດ້ານການປ້ອງກັນຄວາມປອດໄພກ່ອນ ເຂົ້າຫ້ອງລໍຖ້າຜູ້ໂດຍສານ (ເຂດຫວງຫ້າມຂອງສະໜາມບິນ). ເປັນຂໍ້ບັງຄັບດ້ານມາດຕະການປ້ອງກັນຄວາມປອດໄພສະໜາມບິນ ເພື່ອຄວາມປອດໄພຂອງທ່ານ ແລະ ຜູ້ໂດຍສານທັງໝົດ ເຊິ່ງເປັນມາດຕະຖານດ້ານການປ້ອງກັນຄວາມປອດໄພຂອງການບິນພົນລະເຮືອນສາກົນ.",
    zh: "所有旅客和随身行李在进入出发区前必须通过安全检查。这是强制性规定，旨在保障您的安全并符合国际航空安全标准。",
  },

  // Prepare for Screening Section
  prepareTitle: {
    en: "Prepare for Screening",
    lo: "ກະກຽມກ່ອນຜ່ານຈຸດກວດຄົ້ນ",
    zh: "准备接受检查",
  },
  prepareDesc: {
    en: "To speed up the screening process, please prepare the following before reaching the checkpoint:",
    lo: "ເພື່ອຄວາມວ໋ອງໄວໃນການກວດຄົ້ນ ກະລຸນາກະກຽມສິ່ງຕໍ່ໄປນີ້ກ່ອນຮອດຈຸດກວດຄົ້ນ:",
    zh: "为加快检查流程，请在到达检查点前准备好以下物品：",
  },
  prepareDocs: {
    en: "Documents: Boarding pass, ID card or Passport.",
    lo: "ເອກະສານ: ປີ້ຂຶ້ນເຮືອບິນ, ບັດປະຈໍາຕົວ ຫຼື ໜັງສືຜ່ານແດນ.",
    zh: "证件：登机牌、身份证或护照。",
  },
  prepareStaff: {
    en: "Follow the instructions of security personnel.",
    lo: "ປະຕິບັດຕາມຄໍາແນະນໍາຂອງ ພະນັກງານປ້ອງກັນຄວາມປອດໄພ.",
    zh: "请听从安检人员的指示。",
  },
  prepareElectronics: {
    en: "Separate electronic devices (laptops, phones, tablets) and place them in the trays.",
    lo: "ແຍກສິ່ງຂອງທີ່ເປັນ ອຸປະກອນເຄື່ອງເອເລັກໂຕຣນິກ ເຊັ່ນ: ຄອມພິວເຕີ, ໂທລະສັບ, ແທັບເລັດ... ວາງໃສ່ຖາດທີ່ຈັດກຽມໃຫ້.",
    zh: "将电子设备（笔记本电脑、手机、平板电脑）分开并放入托盘。",
  },
  prepareMetalItems: {
    en: "Separate metal items such as watches, belts, and keys.",
    lo: "ແຍກສິ່ງຂອງທີ່ເປັນໂລຫະ ເຊັ່ນ: ໂມງ, ສາຍແອວ, ກະແຈ, ...",
    zh: "将手表、皮带、钥匙等金属物品分开。",
  },
  prepareClothing: {
    en: "Remove jackets, coats, hats, accessories, and wallets.",
    lo: "ຖອດເສື້ອກັນໜາວ, ເສື້ອຄຸມ, ໝວກ, ເຄື່ອງແຟຣຊັ່ນ, ກະເປົາເງີນ...",
    zh: "脱下夹克、外套、帽子、配饰和钱包。",
  },

  // Screening Methods Section
  screeningMethodsTitle: {
    en: "Screening Methods",
    lo: "ຂັ້ນຕອນການກວດຄົ້ນ",
    zh: "检查方式",
  },
  screeningXray: {
    en: "Pass bags and equipment through the X-ray scanner",
    lo: "ນໍາກະເປົາ ແລະ ອຸປະກອນ ຜ່ານເຄື່ອງກວດສ່ອງລັງສີ",
    zh: "将行李和设备通过X光扫描机",
  },
  screeningMetalDetector: {
    en: "Walk through the walk-through metal detector",
    lo: "ຍ່າງຜ່ານເຄື່ອງກວດຈັບໂລຫະແບບຍ່າງຜ່ານ",
    zh: "通过步行式金属探测器",
  },
  screeningSecondary: {
    en: "Screening with a hand-held metal detector or manual search",
    lo: "ກວດຄົ້ນດ້ວຍເຄື່ອງກວດຈັບໂລຫະແບບມືຖື ຫຼື ດ້ວຍມື",
    zh: "使用手持式金属探测器或进行人工检查",
  },

  // Liquid Restrictions Section
  liquidTitle: {
    en: "Liquids, Aerosols, Gels (LAGs)",
    lo: "ຂອງແຫຼວ, ສະເປຣ, ເຈວ (LAGs)",
    zh: "液体、气雾剂、凝胶（LAGs）",
  },
  liquids100ml: {
    en: "Containers must not exceed 100ml (Carry-on)",
    lo: "ພາຊະນະບັນຈຸທີມີປະລິມານ ບໍ່ເກີນ 100 ມລ (ຖືຂຶ້ນເຮືອບິນ)",
    zh: "容器容量不得超过 100 毫升（随身携带）",
  },
  liquidsZiplock: {
    en: "Total capacity not exceeding 1 liter, packed in a clear zip-lock bag (20.5cm x 20.5cm or 25cm x 15cm)",
    lo: "ພາຊະນະທັງໝົດລວມກັນໃນຖົງ ບໍ່ເກີນ 1 ລິດ ແລະ ມີການຫຸ່ມຫໍ່ດ້ວຍຖົງພລາສຕິກໃສແບບ ຊິບລ໋ອກ (zip-lock) ຕາມຂະໜາດທີ່ກໍານົດໄວ້ 20.5cm x 20.5cm ຫຼື 25cm x 15cm",
    zh: "总容量不超过 1 升，并装入规定尺寸的透明密封袋中（20.5cm x 20.5cm 或 25cm x 15cm）",
  },
  liquidsChecked: {
    en: "Liquids over 100ml must be checked in and securely packed (Load)",
    lo: "ຂອງແຫຼວທີ່ເກີນ 100 ມລ ຕ້ອງນໍາໂຫຼດເຂົ້າທ້ອງເຮືອບິນ ແລະ ມີການຫຸ່ມຫໍ່ຢ່າງແໜ້ນໜາ (Load)",
    zh: "超过 100 毫升的液体必须托运并严密包装",
  },
  liquidIncludes: {
    en: "Includes:",
    lo: "ລວມມີ:",
    zh: "包括：",
  },
  liquidExamples: {
    en: "Water, beverages, perfume, shampoo, toothpaste, lotion, spray, sunscreen, lip gloss, cream, gel deodorant, sauces, soups...",
    lo: "ນໍ້າ, ເຄື່ອງດື່ມ, ນໍ້າຫອມ, ແຊມພູ, ຢາສີພັນ, ໂລຊັ່ນ, ສະເປ, ກັນແດດ, ລິບທາປາກ, ຄີຣມ, ເຈວດັບກິ່ນ, ນໍ້າແຈ່ວ, ນໍ້າຊຸບ...",
    zh: "水、饮料、香水、洗发水、牙膏、乳液、喷雾、防晒霜、唇彩、乳霜、除臭凝胶、酱汁、汤类...",
  },
  liquidExceptions: {
    en: "Exceptions:",
    lo: "ຂໍ້ຍົກເວັ້ນ:",
    zh: "例外情况：",
  },
  liquidBabyFormula: {
    en: "Baby formula and milk (for traveling infants)",
    lo: "ນົມຜົງເດັກນ້ອຍ, ນົມ (ນົມສໍາລັບເດັກນ້ອຍເດີນທາງ)",
    zh: "婴儿配方奶粉、牛奶（供随行婴儿使用）",
  },
  liquidMedication: {
    en: "Prescription medications (with prescription or medical certificate)",
    lo: "ຢາຕາມໃບແພດສັ່ງ (ພ້ອມໃບສັ່ງຢາ ຫຼື ໃບຢັ້ງຢືນຈາກແພດ)",
    zh: "处方药（需附带处方或医生证明）",
  },

  // Important Security Reminders Section
  remindersTitle: {
    en: "Important Security Reminders",
    lo: "ຄໍາແນະນໍາ ແລະ ຂໍ້ເຕືອນຄວາມປອດໄພທີ່ສຳຄັນ",
    zh: "重要安全提示",
  },
  reminderCheckIn: {
    en: "Arrive at the airport 2 hours before departure for domestic flights and 2.5 hours for international flights.",
    lo: "ກະລຸນາມາຮອດສະໜາມບິນກ່ອນເວລາອອກເດີນທາງ: 2 ຊົ່ວໂມງ ສຳລັບຖ້ຽວບິນພາຍໃນ ແລະ 2.5 ຊົ່ວໂມງ ສຳລັບຖ້ຽວບິນຕ່າງປະເທດ.",
    zh: "请提前到达机场：国内航班提前 2 小时，国际航班提前 2.5 小时。",
  },
  reminderCooperate: {
    en: "Follow instructions and cooperate fully with airport staff and security officers.",
    lo: "ປະຕິບັດຕາມຄໍາແນະນໍາ ແລະ ໃຫ້ການຮ່ວມມືກັບພະນັກງານ ແລະ ເຈົ້າໜ້າທີ່ສະໜາມບິນ.",
    zh: "请听从指示并全力配合机场工作人员和安检人员。",
  },
  reminderWeapons: {
    en: "Firearms and ammunition are strictly prohibited.",
    lo: "ຫ້າມນໍາອາວຸດປືນ ແລະ ລູກປືນ ເຂົ້າໄປໃນເຂດສະໜາມບິນ ຫຼື ຂຶ້ນເຮືອບິນຢ່າງເດັດຂາດ.",
    zh: "严禁携带枪支和弹药。",
  },
  reminderSharpObjects: {
    en: "Sharp objects (knives, scissors, tools) are prohibited in carry-on baggage.",
    lo: "ຫ້າມນໍາວັດຖຸມີຄົມຂຶ້ນເຮືອບິນ ເຊັ່ນ: ມີດ, ມີດຕັດ, ເຫຼັກແຫຼມ, ອຸປະກອນເຄື່ອງມີຊ່າງ...",
    zh: "严禁随身携带利器（刀具、剪刀、工具等）。",
  },
  reminderFlammables: {
    en: "Flammable materials (sprays, lighters, matches, fireworks) are prohibited.",
    lo: "ຫ້າມນໍາວັດຖຸໄວໄຟຂຶ້ນເຮືອບິນ ເຊັ່ນ: ສະເປໄວໄຟ, ກະໄຟ, ໄມ້ຂີດໄຟ, ພຸດອກໄມ້ໄຟ...",
    zh: "严禁携带易燃物品（喷雾、打火机、火柴、烟花等）。",
  },
  reminderDrugs: {
    en: "Illegal drugs are strictly prohibited at Bokeo International Airport.",
    lo: "ຫ້າມນໍາຢາເສບຕິດທີ່ຜິດກົດໝາຍມາຜ່ານສະໜາມບິນສາກົນບໍ່ແກ້ວຢ່າງເດັດຂາດ.",
    zh: "博胶国际机场严禁携带违禁毒品。",
  },
  reminderNoJokes: {
    en: "Threatening language or jokes about bombs are illegal and carry criminal penalties.",
    lo: "ຫ້າມໃຊ້ຖ້ອຍຄໍາທີ່ເປັນການຂົ່ມຂູ່ ເຊັ່ນ: ລະເບີດ ຫຼື ຂູ່ວາງລະເບີດ ເຊິ່ງມີໂທດທາງກົດໝາຍອາຍາ.",
    zh: "严禁使用威胁性语言或开关于炸弹的玩笑，此类行为触犯刑事法律。",
  },
  reminderLaoLaw: {
    en: "Any behavior that violates the laws of the Lao PDR is strictly forbidden.",
    lo: "ຫ້າມມີພຶດຕິກໍາທີ່ເປັນການລະເມີດກົດໝາຍຂອງ ສປປ ລາວ.",
    zh: "严禁任何违反老挝人民民主共和国法律的行为。",
  },

  // After Security Section
  afterSecurityTitle: {
    en: "After Security Clearance",
    lo: "ຫຼັງຈາກຜ່ານຈຸດກວດຄົ້ນປ້ອງກັນຄວາມປອດໄພ",
    zh: "通过安检后",
  },
  afterSecurityDesc: {
    en: "Once you clear the X-ray screening, you will enter the departure lounge where you can:",
    lo: "ເມື່ອທ່ານຜ່ານການກວດສ່ອງລັງສີ (X-ray screening) ແລ້ວ, ທ່ານສາມາດ:",
    zh: "通过X光安检后，您可以：",
  },
  afterVipRoom: {
    en: "Wait in the departure lounge or contact staff to use the VIP room.",
    lo: "ເຂົ້າໄປລໍຖ້າຢູ່ຫ້ອງລໍຖ້າຜູ້ໂດຍສານຂາອອກ ຫຼື ຕ້ອງການນໍາໃຊ້ຫ້ອງ VIP ສາມາດພົວພັນພະນັກງານທີ່ກ່ຽວຂ້ອງໄດ້.",
    zh: "在出发候机室候机，或联系工作人员使用 VIP 休息室。",
  },
  afterHonoraryGuest: {
    en: "Honorary guests with bookings may contact staff to access the VIP lounge.",
    lo: "ສໍາລັບແຂກກຽດຕິຍົດທີ່ຈອງຫ້ອງລ່ວງໜ້າ ສາມາດພົວພັນເຂົ້າໃຊ້ຫ້ອງກຽດຕິຍົດ.",
    zh: "已预订的贵宾可联系使用贵宾休息室。",
  },
  afterRestMonitor: {
    en: "Rest in the waiting area and monitor the departure information boards.",
    lo: "ພັກຜ່ອນໃນພື້ນທີ່ລໍຖ້າ ແລະ ຕິດຕາມປ້າຍສະແດງຂໍ້ມູນການອອກເດີນທາງ.",
    zh: "在候机区休息并关注航班动态显示屏。",
  },
  afterDutyFree: {
    en: "Shop for duty-free goods and airport souvenirs.",
    lo: "ຊື້ສິນຄ້າປອດພາສີ ແລະ ເຄື່ອງທີ່ລະນຶກຈາກສະໜາມບິນ.",
    zh: "购买免税商品及机场纪念品。",
  },
  afterDining: {
    en: "Enjoy a meal at the airport restaurant.",
    lo: "ຮັບປະທານອາຫານຢູ່ຫ້ອງອາຫານ.",
    zh: "在餐厅用餐。",
  },
} as const;

export type SecurityKey = keyof typeof security;

export const tSecurity = (k: SecurityKey, lang: Lang) =>
  security[k][lang] ?? security[k].en;
