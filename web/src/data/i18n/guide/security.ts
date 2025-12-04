import type { Lang } from "@/types/language";

export const security = {
  // Page title
  title: {
    en: "Security Screening",
    lo: "ກວດຄວາມປອດໄພ",
    zh: "安全检查",
  },

  // Introduction
  intro: {
    en: "All passengers and cabin baggage must pass through security screening before entering the departure area. This is mandatory for your safety and in compliance with international aviation security standards.",
    lo: "ຜູ້ໂດຍສານ ແລະ ກະເປົາຖືຂຶ້ນເຮືອທັງໝົດຕ້ອງຜ່ານການກວດຄວາມປອດໄພກ່ອນເຂົ້າເຂດຜູ້ໂດຍສານຂາອອກ. ນີ້ແມ່ນຂໍ້ບັງຄັບເພື່ອຄວາມປອດໄພຂອງທ່ານ ແລະ ປະຕິບັດຕາມມາດຕະຖານຄວາມປອດໄພການບິນສາກົນ.",
    zh: "所有旅客和随身行李在进入出发区前必须通过安全检查。这是强制性规定，旨在保障您的安全并符合国际航空安全标准。",
  },

  // Prepare for Screening Section
  prepareTitle: {
    en: "Prepare for Screening",
    lo: "ກະກຽມສຳລັບການກວດ",
    zh: "准备接受检查",
  },
  prepareDesc: {
    en: "To speed up the screening process, please prepare the following before reaching the checkpoint:",
    lo: "ເພື່ອເລັ່ງຂະບວນການກວດ, ກະລຸນາກະກຽມສິ່ງຕໍ່ໄປນີ້ກ່ອນຮອດຈຸດກວດ:",
    zh: "为加快检查流程，请在到达检查点前准备好以下物品：",
  },
  prepareMetalItems: {
    en: "Remove all metal items (keys, coins, belt)",
    lo: "ເອົາຂອງໂລຫະທັງໝົດອອກ (ກະແຈ, ຫຼຽນ, ສາຍແອວ)",
    zh: "取下所有金属物品（钥匙、硬币、皮带）",
  },
  prepareLaptops: {
    en: "Take out laptops and tablets from bags",
    lo: "ເອົາຄອມພິວເຕີ ແລະ ແທັບເລັດອອກຈາກກະເປົາ",
    zh: "从包中取出笔记本电脑和平板电脑",
  },
  prepareJackets: {
    en: "Remove jackets and outerwear",
    lo: "ຖອດເສື້ອກັນໜາວ ແລະ ເສື້ອຄຸມ",
    zh: "脱下夹克和外套",
  },
  prepareTrays: {
    en: "Place items in trays provided",
    lo: "ວາງຂອງໃສ່ຖາດທີ່ສະໜອງໃຫ້",
    zh: "将物品放入提供的托盘中",
  },
  prepareBoardingPass: {
    en: "Have boarding pass and ID ready",
    lo: "ກະກຽມບັດຂຶ້ນເຮືອບິນ ແລະ ບັດປະຈຳຕົວໃຫ້ພ້ອມ",
    zh: "准备好登机牌和身份证件",
  },

  // Screening Methods Section
  screeningMethodsTitle: {
    en: "Screening Methods",
    lo: "ວິທີການກວດ",
    zh: "检查方式",
  },
  screeningMetalDetector: {
    en: "Walk through metal detector",
    lo: "ຍ່າງຜ່ານເຄື່ອງກວດໂລຫະ",
    zh: "通过金属探测门",
  },
  screeningXray: {
    en: "X-ray screening for all baggage",
    lo: "ກວດ X-ray ກະເປົາທັງໝົດ",
    zh: "所有行李X光检查",
  },
  screeningHandheld: {
    en: "Hand-held metal detector (if needed)",
    lo: "ເຄື່ອງກວດໂລຫະແບບມືຖື (ຖ້າຈຳເປັນ)",
    zh: "手持金属探测器（如需要）",
  },
  screeningPhysical: {
    en: "Physical bag inspection (random)",
    lo: "ກວດກະເປົາດ້ວຍມື (ສຸ່ມ)",
    zh: "行李人工检查（随机）",
  },
  screeningBodyScan: {
    en: "Body scan (secondary screening)",
    lo: "ສະແກນຮ່າງກາຍ (ກວດເພີ່ມເຕີມ)",
    zh: "人体扫描（二次检查）",
  },

  // Liquid Restrictions Section
  liquidTitle: {
    en: "Liquid Restrictions (100ml Rule)",
    lo: "ຂໍ້ຈຳກັດຂອງແຫຼວ (ກົດ 100ml)",
    zh: "液体限制（100毫升规定）",
  },
  liquidDesc: {
    en: "Liquids, Aerosols, and Gels (LAGs) must follow these rules:",
    lo: "ຂອງແຫຼວ, ສະເປຣ, ແລະ ເຈວ ຕ້ອງປະຕິບັດຕາມກົດເຫຼົ່ານີ້:",
    zh: "液体、气雾剂和凝胶必须遵守以下规定：",
  },
  liquidMax100ml: {
    en: "Maximum 100ml per container",
    lo: "ສູງສຸດ 100ml ຕໍ່ບັນຈຸພັນ",
    zh: "每个容器最多100毫升",
  },
  liquidClearBag: {
    en: "All containers must fit in ONE clear, resealable plastic bag (1 liter capacity)",
    lo: "ບັນຈຸພັນທັງໝົດຕ້ອງໃສ່ຖົງພາສຕິກໃສ ປິດໄດ້ 1 ໃບ (ຄວາມຈຸ 1 ລິດ)",
    zh: "所有容器必须装入一个透明可重封塑料袋（容量1升）",
  },
  liquidOneBag: {
    en: "One bag per passenger",
    lo: "ຖົງ 1 ໃບຕໍ່ຜູ້ໂດຍສານ",
    zh: "每位旅客一个袋子",
  },
  liquidRemoveBag: {
    en: "Bag must be removed from carry-on during screening",
    lo: "ຕ້ອງເອົາຖົງອອກຈາກກະເປົາຖືເວລາກວດ",
    zh: "检查时必须将袋子从随身行李中取出",
  },
  liquidIncludes: {
    en: "Includes:",
    lo: "ລວມມີ:",
    zh: "包括：",
  },
  liquidExamples: {
    en: "Water, beverages, perfume, shampoo, toothpaste, lotion, sunscreen, lip gloss, mascara, gel deodorant, and similar items",
    lo: "ນ້ຳ, ເຄື່ອງດື່ມ, ນ້ຳຫອມ, ແຊມພູ, ຢາສີຟັນ, ໂລຊັ່ນ, ກັນແດດ, ລິບກລອສ, ມາສຄາຣ່າ, ເຈວລະງັບກິ່ນ, ແລະ ສິ່ງຂອງທີ່ຄ້າຍຄືກັນ",
    zh: "水、饮料、香水、洗发水、牙膏、乳液、防晒霜、唇彩、睫毛膏、凝胶除臭剂及类似物品",
  },
  liquidExceptions: {
    en: "Exceptions:",
    lo: "ຂໍ້ຍົກເວັ້ນ:",
    zh: "例外情况：",
  },
  liquidBabyFormula: {
    en: "Baby formula, milk (for traveling infants)",
    lo: "ນົມຜົງເດັກ, ນົມ (ສຳລັບເດັກນ້ອຍເດີນທາງ)",
    zh: "婴儿配方奶粉、牛奶（随行婴儿用）",
  },
  liquidMedication: {
    en: "Prescription medications (with prescription/medical certificate)",
    lo: "ຢາຕາມໃບສັ່ງແພດ (ພ້ອມໃບສັ່ງຢາ/ໃບຢັ້ງຢືນແພດ)",
    zh: "处方药（需提供处方/医疗证明）",
  },
  liquidDutyFree: {
    en: "Duty-free liquids purchased at airport (sealed bag with receipt)",
    lo: "ຂອງແຫຼວປອດພາສີທີ່ຊື້ຢູ່ສະໜາມບິນ (ຖົງປິດຜະນຶກພ້ອມໃບບິນ)",
    zh: "在机场购买的免税液体（密封袋附收据）",
  },

  // Important Reminders Section
  remindersTitle: {
    en: "Important Security Reminders",
    lo: "ຂໍ້ເຕືອນຄວາມປອດໄພທີ່ສຳຄັນ",
    zh: "重要安全提示",
  },
  reminderArriveEarly: {
    en: "Arrive early - security screening can take 15-30 minutes during peak times",
    lo: "ມາຮອດລ່ວງໜ້າ - ການກວດຄວາມປອດໄພອາດໃຊ້ເວລາ 15-30 ນາທີໃນຊ່ວງເວລາຫຍຸ້ງ",
    zh: "请提前到达——高峰时段安检可能需要15-30分钟",
  },
  reminderCooperate: {
    en: "Cooperate fully with security officers - refusal may result in denied boarding",
    lo: "ໃຫ້ຄວາມຮ່ວມມືກັບເຈົ້າໜ້າທີ່ຄວາມປອດໄພ - ການປະຕິເສດອາດເຮັດໃຫ້ຖືກປະຕິເສດການຂຶ້ນເຮືອບິນ",
    zh: "请全力配合安检人员——拒绝配合可能导致无法登机",
  },
  reminderConfiscated: {
    en: "Prohibited items will be confiscated and cannot be retrieved",
    lo: "ສິ່ງຂອງຕ້ອງຫ້າມຈະຖືກຍຶດ ແລະ ບໍ່ສາມາດເອົາຄືນໄດ້",
    zh: "违禁物品将被没收且无法取回",
  },
  reminderRandomScreening: {
    en: "Random additional screening may be required - this is standard procedure",
    lo: "ອາດມີການກວດເພີ່ມເຕີມແບບສຸ່ມ - ນີ້ແມ່ນຂັ້ນຕອນມາດຕະຖານ",
    zh: "可能需要随机额外检查——这是标准程序",
  },
  reminderNoJokes: {
    en: "Do not joke about security threats - this is a criminal offense",
    lo: "ຫ້າມເວົ້າຕະຫຼົກກ່ຽວກັບໄພຂົ່ມຂູ່ຄວາມປອດໄພ - ນີ້ແມ່ນຄວາມຜິດທາງອາຍາ",
    zh: "请勿开安全威胁相关的玩笑——这是刑事犯罪",
  },
  reminderNoStrangers: {
    en: "Do not carry items for strangers or leave baggage unattended",
    lo: "ຫ້າມຖືຂອງໃຫ້ຄົນແປກໜ້າ ຫຼື ປະກະເປົາໄວ້ໂດຍບໍ່ມີຄົນເບິ່ງ",
    zh: "请勿为陌生人携带物品或让行李无人看管",
  },

  // After Security Section
  afterSecurityTitle: {
    en: "After Security Clearance",
    lo: "ຫຼັງຈາກຜ່ານການກວດຄວາມປອດໄພ",
    zh: "通过安检后",
  },
  afterSecurityDesc: {
    en: "Once you clear security, you'll enter the departure lounge where you can:",
    lo: "ເມື່ອທ່ານຜ່ານການກວດຄວາມປອດໄພແລ້ວ, ທ່ານຈະເຂົ້າສູ່ຫ້ອງຮັບຮອງຜູ້ໂດຍສານຂາອອກ ບ່ອນທີ່ທ່ານສາມາດ:",
    zh: "通过安检后，您将进入出发休息室，在那里您可以：",
  },
  afterDutyFree: {
    en: "Visit duty-free shops and restaurants",
    lo: "ຊື້ເຄື່ອງປອດພາສີ ແລະ ຮ້ານອາຫານ",
    zh: "前往免税店和餐厅",
  },
  afterLounges: {
    en: "Use airport lounges (if eligible)",
    lo: "ໃຊ້ຫ້ອງຮັບຮອງສະໜາມບິນ (ຖ້າມີສິດ)",
    zh: "使用机场贵宾室（如符合条件）",
  },
  afterWaiting: {
    en: "Rest in waiting areas",
    lo: "ພັກຜ່ອນໃນເຂດລໍຖ້າ",
    zh: "在候机区休息",
  },
  afterMonitor: {
    en: "Monitor departure boards for gate information",
    lo: "ຕິດຕາມປ້າຍສະແດງຂໍ້ມູນປະຕູຂຶ້ນເຮືອບິນ",
    zh: "查看航班信息屏了解登机口信息",
  },
  afterNote: {
    en: "Note: You cannot return to the public area after clearing security without going through the entire process again.",
    lo: "ໝາຍເຫດ: ທ່ານບໍ່ສາມາດກັບຄືນໄປເຂດສາທາລະນະຫຼັງຈາກຜ່ານການກວດຄວາມປອດໄພໄດ້ ໂດຍບໍ່ຕ້ອງຜ່ານຂະບວນການທັງໝົດອີກຄັ້ງ.",
    zh: "注意：通过安检后，如需返回公共区域，必须重新接受全部安检程序。",
  },
} as const;

export type SecurityKey = keyof typeof security;

export const tSecurity = (k: SecurityKey, lang: Lang) =>
  security[k][lang] ?? security[k].en;
