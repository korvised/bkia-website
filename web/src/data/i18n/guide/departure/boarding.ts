import type { Lang } from "@/types/language";

export const boarding = {
  // Page title
  title: {
    en: "Boarding",
    lo: "ຂຶ້ນເຮືອບິນ",
    zh: "登机",
  },

  // Introduction
  intro: {
    en: "After clearing immigration, proceed to your departure gate. Listen for boarding announcements and ensure you have your boarding pass and passport ready.",
    lo: "ຫຼັງຈາກຜ່ານການກວດຄົນເຂົ້າ-ອອກເມືອງແລ້ວ, ເດີນທາງໄປປະຕູຂຶ້ນເຮືອບິນຂອງທ່ານ. ຟັງປະກາດການຂຶ້ນເຮືອບິນ ແລະ ກະກຽມບັດຂຶ້ນເຮືອບິນ ແລະ ໜັງສືຜ່ານແດນໃຫ້ພ້ອມ.",
    zh: "通过边检后，请前往您的登机口。请注意收听登机广播，并准备好登机牌和护照。",
  },

  // Boarding Time Section
  boardingTimeTitle: {
    en: "Boarding Time",
    lo: "ເວລາຂຶ້ນເຮືອບິນ",
    zh: "登机时间",
  },
  boardingTimeDesc: {
    en: "Arrive at your gate early to ensure a smooth boarding process:",
    lo: "ມາຮອດປະຕູຂຶ້ນເຮືອບິນລ່ວງໜ້າ ເພື່ອຮັບປະກັນການຂຶ້ນເຮືອບິນທີ່ລາບລື່ນ:",
    zh: "请提前到达登机口，确保顺利登机：",
  },
  boardingBegins: {
    en: "Boarding begins",
    lo: "ເລີ່ມຂຶ້ນເຮືອບິນ",
    zh: "开始登机",
  },
  boardingBeginsTime: {
    en: "40-45 minutes before departure",
    lo: "40-45 ນາທີກ່ອນອອກເດີນທາງ",
    zh: "起飞前40-45分钟",
  },
  gateCloses: {
    en: "Gate closes",
    lo: "ປະຕູປິດ",
    zh: "登机口关闭",
  },
  gateClosesTime: {
    en: "15 minutes before departure",
    lo: "15 ນາທີກ່ອນອອກເດີນທາງ",
    zh: "起飞前15分钟",
  },
  latePassengers: {
    en: "Late passengers will not be permitted to board",
    lo: "ຜູ້ໂດຍສານທີ່ມາຊ້າຈະບໍ່ໄດ້ຮັບອະນຸຍາດໃຫ້ຂຶ້ນເຮືອບິນ",
    zh: "迟到旅客将不允许登机",
  },

  // Boarding Groups Section
  boardingGroupsTitle: {
    en: "Boarding Groups",
    lo: "ກຸ່ມຜູ້ໂດຍສານ",
    zh: "登机顺序",
  },
  priorityBoarding: {
    en: "Priority Boarding",
    lo: "ຜູ້ໂດຍສານບຸລິມະສິດ",
    zh: "优先登机",
  },
  priorityBoardingDesc: {
    en: "Business class, passengers with disabilities, families with children, elderly passengers, and monks.",
    lo: "ຊັ້ນທຸລະກິດ, ຜູ້ໂດຍສານພິການ, ຄອບຄົວທີ່ມີເດັກນ້ອຍ, ຜູ້ສູງອາຍຸ ແລະ ພະສົງ",
    zh: "商务舱、残障人士、有小孩的家庭、老年旅客及僧侣",
  },
  economyRear: {
    en: "Economy Class - Rear Rows",
    lo: "ຊັ້ນປະຢັດ - ແຖວຫຼັງ",
    zh: "经济舱 - 后排",
  },
  economyRearDesc: {
    en: "Passengers seated in rear section of the aircraft",
    lo: "ຜູ້ໂດຍສານທີ່ນັ່ງຢູ່ສ່ວນຫຼັງຂອງເຮືອບິນ",
    zh: "坐在飞机后部的旅客",
  },
  economyFront: {
    en: "Economy Class - Front Rows",
    lo: "ຊັ້ນປະຢັດ - ແຖວໜ້າ",
    zh: "经济舱 - 前排",
  },
  economyFrontDesc: {
    en: "Remaining passengers",
    lo: "ຜູ້ໂດຍສານທີ່ເຫຼືອ",
    zh: "其余旅客",
  },

  // Required Documents Section
  requiredTitle: {
    en: "Required at Boarding Gate",
    lo: "ເອກະສານທີ່ຕ້ອງແຈ້ງກ່ອນຂຶ້ນປະຕູເຮືອບິນ",
    zh: "登机口所需证件",
  },
  requiredBoardingPass: {
    en: "Boarding pass (Paper)",
    lo: "ບັດຂຶ້ນເຮືອບິນ (ເຈ້ຍ)",
    zh: "登机牌（纸质）",
  },
  requiredPassport: {
    en: "Passport or ID (must match boarding pass name)",
    lo: "ໜັງສືຜ່ານແດນ ຫຼື ບັດປະຈຳຕົວ (ຕ້ອງກົງກັບຊື່ໃນບັດຂຶ້ນເຮືອບິນ)",
    zh: "护照或身份证（必须与登机牌姓名一致）",
  },
  requiredCabinBag: {
    en: "Cabin baggage within size and weight limits",
    lo: "ກະເປົາຖືຂຶ້ນເຮືອບິນຕາມຂະໜາດ ແລະ ນ້ຳໜັກທີ່ກຳນົດ",
    zh: "符合尺寸和重量限制的随身行李",
  },

  // Gate Check Info
  gateCheckTitle: {
    en: "Gate Check",
    lo: "ໂຫຼດກະເປົາທີ່ປະຕູ",
    zh: "登机口托运",
  },
  gateCheckDesc: {
    en: "If the aircraft has limited overhead space, cabin bags may need to be gate-checked at no extra charge. Your bag will be returned upon arrival.",
    lo: "ຖ້າເຮືອບິນມີພື້ນທີ່ເກັບຂອງຈຳກັດ, ກະເປົາຖືອາດຕ້ອງໂຫຼດທີ່ປະຕູໂດຍບໍ່ເສຍຄ່າເພີ່ມ. ກະເປົາຈະຖືກສົ່ງຄືນເມື່ອຮອດຈຸດໝາຍປາຍທາງ.",
    zh: "如果飞机头顶储物空间有限，随身行李可能需要在登机口托运，无需额外付费。您的行李将在抵达时归还。",
  },

  // Announcements Section
  announcementsTitle: {
    en: "Announcements",
    lo: "ປະກາດ",
    zh: "广播通知",
  },
  announcementsDesc: {
    en: "Boarding calls are made in Lao, English, and Chinese. Monitor departure screens for gate changes or delays. Stay within hearing distance of your gate.",
    lo: "ການປະກາດຂຶ້ນເຮືອບິນເປັນພາສາລາວ, ອັງກິດ ແລະ ຈີນ. ຕິດຕາມໜ້າຈໍສະແດງຂໍ້ມູນການອອກເດີນທາງສຳລັບການປ່ຽນປະຕູ ຫຼື ຄວາມລ່າຊ້າ. ຢູ່ໃນລະຍະທີ່ໄດ້ຍິນປະກາດຂອງປະຕູຂອງທ່ານ.",
    zh: "登机广播使用老挝语、英语和中文。请留意航班信息屏上的登机口变更或延误通知。请留在能听到登机口广播的范围内。",
  },

  // In-Flight Rules Section
  inFlightTitle: {
    en: "In-Flight Regulations",
    lo: "ກົດລະບຽບໃນເຮືອບິນ",
    zh: "机上规定",
  },
  seatbelt: {
    en: "Keep seatbelt fastened at all times while seated and when the sign is illuminated.",
    lo: "ຮັດສາຍແອວຕະຫຼອດເວລາທີ່ນັ່ງ ແລະ ເມື່ອປ້າຍສັນຍານໄຟເປີດ.",
    zh: "就座时和安全带指示灯亮起时请系好安全带。",
  },
  electronics: {
    en: "Electronic devices must be switched to airplane mode during the flight.",
    lo: "ສຳລັບອຸປະກອນເອເລັກໂຕຣນິກ ໃຫ້ປ່ຽນນຳໃຊ້ໃນໂໝດເຮືອບິນ.",
    zh: "飞行期间请将电子设备调至飞行模式。",
  },
  seatPosition: {
    en: "Adjust seats to an upright position and stow tray tables during takeoff and landing.",
    lo: "ປັບຕັ່ງນັ່ງໃຫ້ຊື່ ແລະ ພັບເກັບໂຕະໃຫ້ຮຽບຮ້ອຍ ໃນລະຫວ່າງເຮືອບິນຂຶ້ນ-ລົງ.",
    zh: "起飞和降落时请将座椅调直并收起小桌板。",
  },
  overheadBins: {
    en: "Ensure your baggage is properly stowed in the overhead bins.",
    lo: "ກວດກາໃຫ້ແນ່ໃຈວ່າ ກະເປົາຂອງທ່ານຖືກເກັບມ້ຽນຢ່າງຖືກຕ້ອງ ໃນຊ່ອງເກັບຂອງດ້ານເທິງ.",
    zh: "请确保您的行李已正确存放在头顶行李舱内。",
  },

  // Prohibited on Board
  prohibitedTitle: {
    en: "Prohibited On Board",
    lo: "ຂໍ້ຫ້າມໃນລະຫວ່າງການບິນ",
    zh: "机上禁令",
  },
  prohibitedNoSmoking: {
    en: "Smoking (including e-cigarettes and vaping) is prohibited except in designated areas.",
    lo: "ຫ້າມສູບຢາ (ລວມທັງຢາສູບໄຟຟ້າ); ສາມາດສູບໄດ້ສະເພາະຈຸດທີ່ໄດ້ຮັບອະນຸຍາດ ຂຶ້ນກັບປະເພດເຮືອບິນ ແລະ ສາຍການບິນ.",
    zh: "严禁吸烟（包括电子烟）；仅限在指定区域内吸烟（视机型和航空公司而定）。",
  },
  prohibitedNoDisturbance: {
    en: "Do not make loud noises or behave in a way that disturbs other passengers.",
    lo: "ຫ້າມສົ່ງສຽງດັງ ຫຼື ມີພຶດຕິກຳທີ່ລົບກວນຜູ້ໂດຍສານທ່ານອື່ນ",
    zh: "严禁大声喧哗或做出任何干扰其他乘客的行为。",
  },
  prohibitedNoChaos: {
    en: "Causing chaos or disorderly conduct on the aircraft.",
    lo: "ຫ້າມກໍ່ຄວາມວຸ້ນວາຍພາຍໃນເຮືອບິນ.",
    zh: "严禁在机内寻衅滋事或扰乱秩序。",
  },
  prohibitedEmergency: {
    en: "Unauthorized use of emergency equipment.",
    lo: "ຫ້າມໃຊ້ອຸປະກອນສຸກເສີນໂດຍບໍ່ໄດ້ຮັບອະນຸຍາດ.",
    zh: "严禁未经授权使用应急设备。",
  },
  prohibitedWarning: {
    en: "Violations may result in legal action, fines, and flight bans.",
    lo: "ການລະເມີດອາດຖືກດຳເນີນຄະດີຕາມກົດໝາຍ, ປັບໃໝ ແລະ ຫ້າມເດີນທາງດ້ວຍເຮືອບິນ.",
    zh: "违反者可能面临法律诉讼、罚款或禁飞处罚。",
  },

  // Tips
  tipsTitle: {
    en: "Boarding Tips",
    lo: "ຄຳແນະນຳການຂຶ້ນເຮືອບິນ",
    zh: "登机提示",
  },
  tipEarly: {
    en: "Arrive at gate at least 30 minutes before departure",
    lo: "ມາຮອດປະຕູຢ່າງໜ້ອຍ 30 ນາທີກ່ອນອອກເດີນທາງ",
    zh: "请至少在起飞前30分钟到达登机口",
  },
  tipCharge: {
    en: "Charge your devices before boarding",
    lo: "ສາກອຸປະກອນຂອງທ່ານກ່ອນຂຶ້ນເຮືອບິນ",
    zh: "登机前请为设备充电",
  },
  tipEssentials: {
    en: "Keep essentials accessible in your personal item",
    lo: "ເກັບສິ່ງຂອງຈຳເປັນໄວ້ໃນກະເປົາສ່ວນຕົວທີ່ເອົາໄດ້ງ່າຍ",
    zh: "将必需品放在随身小包中便于取用",
  },
  tipListen: {
    en: "Listen carefully to crew safety instructions",
    lo: "ຟັງຄຳແນະນຳຄວາມປອດໄພຈາກລູກເຮືອຢ່າງຕັ້ງໃຈ",
    zh: "请认真听取机组人员的安全须知",
  },
} as const;

export type BoardingKey = keyof typeof boarding;

export const tBoarding = (k: BoardingKey, lang: Lang) =>
  boarding[k][lang] ?? boarding[k].en;
