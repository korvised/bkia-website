import type { Lang } from "@/types/language";

export const airportSecurity = {
  // Page title and intro
  title: {
    en: "Airport Security",
    lo: "ຄວາມປອດໄພສະໜາມບິນ",
    zh: "机场安保",
  },
  intro: {
    en: "Bokeo International Airport has established security measures for civil aviation services to ensure flight safety in accordance with International Civil Aviation Organization (ICAO) standards.",
    lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວໄດ້ກຳນົດມາດຕະການປ້ອງກັນຄວາມປອດໄພໃຫ້ແກ່ການບໍລິການດ້ານການບິນພົນລະເຮືອນ ເພື່ອຮັບປະກັນຄວາມປອດໄພຂອງວຽກງານການບິນ ໃຫ້ສອດຄ່ອງກັບມາດຕະຖານຂອງອົງການການບິນພົນລະເຮືອນສາກົນ (ICAO)",
    zh: "波乔国际机场已根据国际民用航空组织（ICAO）标准制定了民航服务安全措施，以确保飞行安全。",
  },

  // Objectives
  objectiveTitle: {
    en: "Objective",
    lo: "ຈຸດປະສົງ",
    zh: "目标",
  },
  objectiveDesc: {
    en: "Prevent unauthorized access to operational areas, ensure order and peace at the airport",
    lo: "ສະກັດກັ້ນການລັກລອບເຂົ້າເຂດປະຕິບັດການບິນ, ຮັບປະກັນຄວາມເປັນລະບຽບຮຽບຮ້ອຍ ແລະ ຄວາມສະຫງົບຢູ່ສະໜາມບິນ",
    zh: "防止未经授权进入运营区域，确保机场秩序与安宁",
  },
  aircraftSafetyTitle: {
    en: "Aircraft Safety",
    lo: "ຄວາມປອດໄພຂອງເຮືອບິນ",
    zh: "飞机安全",
  },
  aircraftSafetyDesc: {
    en: "Ensure unauthorized persons or groups cannot bring prohibited items onto aircraft",
    lo: "ຮັບປະກັນບໍ່ໃຫ້ບຸກຄົນ ຫຼື ກຸ່ມຄົນທີ່ບໍ່ໄດ້ຮັບອະນຸຍາດ ນຳສິ່ງຂອງຕ້ອງຫ້າມຂຶ້ນເທິງເຮືອບິນ",
    zh: "确保未经授权人员或团体不能将违禁物品带上飞机",
  },

  // Preparation Section
  preparationTitle: {
    en: "Preparation Before Security Checkpoint",
    lo: "ການກະກຽມກ່ອນຜ່ານຈຸດກວດຄົ້ນ",
    zh: "安检前准备",
  },

  // Liquids
  liquidsTitle: {
    en: "Liquids, Aerosols, Gels (LAGs)",
    lo: "ຂອງແຫຼວ, ສະເປຣ, ເຈວ (LAGs)",
    zh: "液体、气雾剂、凝胶（LAGs）",
  },
  liquids100ml: {
    en: "Containers must not exceed 100ml for carry-on",
    lo: "ບັນຈຸໃນພາຊະນະຂະໜາດບໍ່ເກີນ 100 ມລ ເທົ່ານັ້ນ ຖ້ານຳຂຶ້ນຍົນ (carry-on)",
    zh: "随身携带容器不得超过100毫升",
  },
  liquidsZiplock: {
    en: "All containers must be stored in a clear zip-lock plastic bag of specified size",
    lo: "ພາຊະນະທັງໝົດຕ້ອງເກັບໄວ້ລວມກັນໃນ ຖົງພລາສຕິກໃສແບບ zip-lock ຂະໜາດທີ່ກຳນົດ",
    zh: "所有容器必须装入规定尺寸的透明密封袋中",
  },
  liquids1liter: {
    en: "Total liquid capacity must not exceed 1 liter",
    lo: "ຄວາມຈຸລວມຂອງຂອງແຫຼວທັງໝົດຕ້ອງບໍ່ເກີນ 1 ລິດ",
    zh: "液体总容量不得超过1升",
  },
  liquidsChecked: {
    en: "Liquids over 100ml must be checked in",
    lo: "ຂອງແຫຼວທີ່ເກີນ 100 ມລ ຕ້ອງໂຫຼດກ້ອງທ້ອງເຮືອບິນ (ເຊັກອິນ)",
    zh: "超过100毫升的液体必须托运",
  },

  // Sharp Objects
  sharpObjectsTitle: {
    en: "Sharp Objects",
    lo: "ວັດຖຸມີຄົມ",
    zh: "尖锐物品",
  },
  sharpObjectsDesc: {
    en: "All sharp objects are not allowed in carry-on and must be checked in",
    lo: "ວັດຖຸມີຄົມທຸກຊະນິດ ບໍ່ອະນຸຍາດໃຫ້ນຳຂຶ້ນເຮືອບິນ ແລະ ຕ້ອງໂຫຼດກ້ອງທ້ອງເຮືອບິນ",
    zh: "所有尖锐物品不得随身携带，必须托运",
  },

  // Firearms
  firearmsTitle: {
    en: "Firearms and Ammunition",
    lo: "ປືນ ແລະ ລູກປືນ",
    zh: "枪支和弹药",
  },
  firearmsDesc: {
    en: "Must declare to airline staff at check-in counter for document verification",
    lo: "ຕ້ອງແຈ້ງໃຫ້ພະນັກງານສາຍການບິນຊາບ ຢູ່ເຄົາເຕີເຊັກອິນ ເພື່ອກວດກາເອກະສານ",
    zh: "必须在值机柜台向航空公司工作人员申报以核验文件",
  },

  // Dangerous Substances
  dangerousTitle: {
    en: "Dangerous Substances/Materials",
    lo: "ສານ/ວັດຖຸອັນຕະລາຍ",
    zh: "危险物质/材料",
  },
  dangerousDesc: {
    en: "Dangerous substances or materials are strictly prohibited on all flights (both carry-on and checked)",
    lo: "ບໍ່ອະນຸຍາດ ໃຫ້ນຳສານ ຫຼື ວັດຖຸອັນຕະລາຍຂຶ້ນເຮືອບິນທຸກປະເພດ (ທັງກະເປົາຖື ແລະ ກະເປົາໂຫຼດ)",
    zh: "严禁在任何航班上携带危险物质或材料（随身和托运均不可）",
  },

  // Electronics
  electronicsTitle: {
    en: "Phones and Electronics",
    lo: "ໂທລະສັບ ແລະ ເຄື່ອງເອເລັກໂຕຣນິກ",
    zh: "手机和电子设备",
  },
  electronicsDesc: {
    en: "Strictly prohibited to carry more than 3 phones or more than 2 computers/electronics as carry-on",
    lo: "ຫ້າມນຳໂທລະສັບເກີນ 3 ໜ່ວຍ ຫຼື ຄອມພິວເຕີ/ເຄື່ອງເອເລັກໂຕຣນິກເກີນ 2 ໜ່ວຍ ຖືຂຶ້ນເຮືອບິນເດັດຂາດ",
    zh: "严禁随身携带超过3部手机或超过2台电脑/电子设备",
  },

  // Tobacco
  tobaccoTitle: {
    en: "Tobacco and Lighters",
    lo: "ຢາສູບ ແລະ ກັບໄຟ",
    zh: "烟草和打火机",
  },
  tobaccoCheckpoint: {
    en: "Strictly prohibited through security checkpoint",
    lo: "ຫ້າມນຳຜ່ານຈຸດກວດຄົ້ນຕົວຢ່າງເດັດຂາດ",
    zh: "严禁通过安检点携带",
  },
  tobaccoChecked: {
    en: "If bringing on flight, must be in checked baggage only and not exceed 200 cigarettes or 10 packs",
    lo: "ຖ້າຈະນຳຕິດຕົວໄປນຳເຮືອບິນ, ໃຫ້ໃສ່ກະເປົາໂຫຼດກ້ອງທ້ອງເຮືອບິນເທົ່ານັ້ນ ແລະ ຕ້ອງບໍ່ເກີນ 200 ກອກ ຫຼື 10 ກັບ",
    zh: "如需携带，只能放入托运行李，且不得超过200支香烟或10包",
  },

  // Screening Steps Section
  screeningStepsTitle: {
    en: "Security Checkpoint Procedures",
    lo: "ຂັ້ນຕອນຢູ່ຈຸດກວດຄົ້ນຄວາມປອດໄພ",
    zh: "安检程序",
  },

  // Step 1
  step1Title: {
    en: "Before Entering Checkpoint",
    lo: "ກ່ອນເຂົ້າຈຸດກວດຄົ້ນ",
    zh: "进入检查站前",
  },
  step1Desc: {
    en: "Please have your boarding pass ready for staff inspection",
    lo: "ກະລຸນາກຽມປີ້ເຮືອບິນ (Boarding Pass) ຂອງທ່ານໃຫ້ເຈົ້າໜ້າທີ່ກວດກາ",
    zh: "请准备好登机牌供工作人员检查",
  },

  // Step 2
  step2Title: {
    en: "At X-ray Machine",
    lo: "ຢູ່ຊ່ອງທາງເຄື່ອງ X-ray",
    zh: "X光机处",
  },
  step2Item1: {
    en: "Place all baggage/belongings in trays for X-ray screening",
    lo: "ນຳກະເປົາສຳພາລະ/ເຄື່ອງຂອງທຸກຢ່າງໃສ່ໃນຖາດ ເພື່ອຜ່ານເຂົ້າເຄື່ອງ X-ray",
    zh: "将所有行李/物品放入托盘进行X光检查",
  },
  step2Item2: {
    en: "Separate laptops, jackets, and zip-lock bags containing liquids into trays",
    lo: "ແຍກ ຄອມພິວເຕີແລັບທັອບ, ເສື້ອກັນໜາວ, ແລະ ຖົງ zip-lock ທີ່ບັນຈຸຂອງແຫຼວ ອອກຈາກເຄື່ອງຂອງອື່ນໆ ໃສ່ໃນຖາດ",
    zh: "将笔记本电脑、外套和装有液体的密封袋分开放入托盘",
  },
  step2Item3: {
    en: "Passengers may be asked to remove belts and shoes for X-ray",
    lo: "ຜູ້ໂດຍສານອາດຖືກຮ້ອງຂໍໃຫ້ຖອດສາຍແອວ ແລະ ເກີບ ອອກຜ່ານເຄື່ອງ X-ray",
    zh: "旅客可能被要求脱下皮带和鞋子进行X光检查",
  },

  // Step 3
  step3Title: {
    en: "Through Metal Detector",
    lo: "ຜ່ານເຄື່ອງກວດຈັບໂລຫະ (Metal Detector)",
    zh: "通过金属探测门",
  },
  step3Item1: {
    en: "Passengers who cannot walk through metal detector (e.g., pacemaker, pregnant) please inform staff for special lane and manual inspection",
    lo: "ຜູ້ໂດຍສານທີ່ບໍ່ຕ້ອງການຍ່າງຜ່ານເຄື່ອງກວດໂລຫະ (ເຊັ່ນ: ໃສ່ເຄື່ອງກະຕຸ້ນຫົວໃຈ ຫຼື ຖືພາ), ກະລຸນາແຈ້ງເຈົ້າໜ້າທີ່ເພື່ອຜ່ານຊ່ອງທາງພິເສດ ແລະ ຖືກກວດກາດ້ວຍມືແທນ",
    zh: "无法通过金属探测门的旅客（如佩戴心脏起搏器、孕妇）请告知工作人员走特殊通道并接受手检",
  },
  step3Item2: {
    en: "If metal detector alarms, you may be asked to remove metal objects and pass through again, or consent to detailed body search",
    lo: "ຖ້າເຄື່ອງກວດຈັບໂລຫະດັງ, ທ່ານອາດຖືກຂໍໃຫ້ຖອດວັດຖຸໂລຫະອອກ ແລະ ຜ່ານຄືນ, ຫຼື ອາດຖືກຂໍອະນຸຍາດກວດຄົ້ນຕົວຢ່າງລະອຽດ",
    zh: "如金属探测器报警，您可能被要求取下金属物品重新通过，或同意进行详细人身检查",
  },

  // Step 4
  step4Title: {
    en: "Additional Screening",
    lo: "ການກວດຄົ້ນເພີ່ມເຕີມ",
    zh: "额外检查",
  },
  step4Item1: {
    en: "During body/bag inspection, passengers must follow instructions and cooperate with staff",
    lo: "ໃນລະຫວ່າງການກວດຄົ້ນຮ່າງກາຍ/ກະເປົາ, ຜູ້ໂດຍສານຕ້ອງປະຕິບັດຕາມຄຳແນະນຳ ແລະ ໃຫ້ຄວາມຮ່ວມມືກັບເຈົ້າໜ້າທີ່",
    zh: "在人身/行李检查期间，旅客必须遵守指示并配合工作人员",
  },
  step4Item2: {
    en: "Private screening rooms are available upon request",
    lo: "ຖ້າຕ້ອງການກວດຄົ້ນເປັນສ່ວນຕົວ, ສະໜາມບິນໄດ້ກຽມຫ້ອງໄວ້ໃຫ້. ກະລຸນາແຈ້ງເຈົ້າໜ້າທີ່",
    zh: "如需私密检查，可要求使用专用检查室",
  },

  // Step 5
  step5Title: {
    en: "Refusal of Screening",
    lo: "ການປະຕິເສດການກວດຄົ້ນ",
    zh: "拒绝检查",
  },
  step5Desc: {
    en: "For passengers who refuse screening, the airport reserves the right to deny passage through security checkpoint for safety protection",
    lo: "ສຳລັບຜູ້ໂດຍສານທີ່ປະຕິເສດການກວດຄົ້ນ, ສະໜາມບິນຂໍສະຫງວນສິດທີ່ຈະບໍ່ອະນຸຍາດໃຫ້ຜູ້ໂດຍສານຄົນດັ່ງກ່າວນັ້ນຜ່ານຈຸດກວດຄົ້ນເພື່ອປ້ອງກັນຄວາມປອດໄພ",
    zh: "对于拒绝接受检查的旅客，机场保留拒绝其通过安检的权利，以保障安全",
  },

  // Prohibited Items Table
  prohibitedTableTitle: {
    en: "Prohibited Items Table",
    lo: "ຕາຕະລາງສິ່ງເກືອດຫ້າມ",
    zh: "违禁物品表",
  },
  itemType: {
    en: "Item Type",
    lo: "ປະເພດສິ່ງຂອງ",
    zh: "物品类型",
  },
  carryOn: {
    en: "Carry-on",
    lo: "ຖືຂຶ້ນເຮືອບິນ (Carry-on)",
    zh: "随身携带",
  },
  checked: {
    en: "Checked Baggage",
    lo: "ກະເປົາໂຫຼດ (Checked)",
    zh: "托运行李",
  },
  seeNote: {
    en: "See note",
    lo: "ເບິ່ງໝາຍເຫດ",
    zh: "见备注",
  },

  // Prohibited items
  itemFirearms: {
    en: "Firearms/Replica weapons",
    lo: "ອາວຸດປືນ/ອາວຸດປອມ",
    zh: "枪支/仿制武器",
  },
  itemStunDevices: {
    en: "Incapacitating devices (e.g., pepper spray, stun gun)",
    lo: "ອຸປະກອນທີ່ເຮັດໃຫ້ໝົດສະມັດຖະພາບ (ເຊັ່ນ: ສະເປພິກໄທ, ໄມ້ຊ໊ອດ)",
    zh: "致残设备（如胡椒喷雾、电击枪）",
  },
  itemSharpTools: {
    en: "Sharp objects/Cutting tools (e.g., knives over 6cm, axes)",
    lo: "ຂອງມີຄົມ/ເຄື່ອງມືການຕັດ (ເຊັ່ນ: ມີດໃບຍາວເກີນ 6 ຊມ, ຂວານ)",
    zh: "尖锐物品/切割工具（如超过6厘米的刀具、斧头）",
  },
  itemExplosives: {
    en: "Explosives, ammunition, flammable liquids",
    lo: "ວັດຖຸ-ທາດລະເບີດ, ລູກປືນ, ທາດແຫຼວໄວໄຟ",
    zh: "爆炸物、弹药、易燃液体",
  },
  itemLiquidsOver100: {
    en: "Liquids, cosmetics, gels (over 100ml)",
    lo: "ທາດແຫຼວ, ເຄື່ອງສຳອາງ, ເຈວ (ເກີນ 100 ມລ)",
    zh: "液体、化妆品、凝胶（超过100毫升）",
  },
  itemTools: {
    en: "Work tools (e.g., crowbars, screwdrivers over 6cm)",
    lo: "ເຄື່ອງມືການຊ່າງ (ເຊັ່ນ: ເຫຼັກສະແຫຼງ, ໄຂຄວງໃບຍາວເກີນ 6 ຊມ)",
    zh: "工具（如撬棍、超过6厘米的螺丝刀）",
  },

  // Important note
  importantNote: {
    en: "Important Note:",
    lo: "ໝາຍເຫດສຳຄັນ:",
    zh: "重要提示：",
  },
  importantNoteDesc: {
    en: "Firearms and incapacitating equipment may be permitted on flights with authorization documents from Ministry of Defense and Ministry of Public Security, and must be declared to the airline.",
    lo: "ອາວຸດປືນ ແລະ ອຸປະກອນສະຫຼົບ ອາດຈະໄດ້ຮັບອະນຸຍາດໃຫ້ນຳໄປນຳເຮືອບິນ ໂດຍອີງຕາມເອກະສານອະນຸຍາດຈາກກະຊວງປ້ອງກັນປະເທດ ແລະ ກະຊວງປ້ອງກັນຄວາມສະຫງົບ, ແລະ ຕ້ອງແຈ້ງຕໍ່ສາຍການບິນ",
    zh: "枪支和致残设备在获得国防部和公安部的授权文件后可能被允许携带上飞机，且必须向航空公司申报。",
  },

  // Airport Prohibitions Section
  airportProhibitionsTitle: {
    en: "Important Airport Prohibitions",
    lo: "ຂໍ້ຫ້າມສຳຄັນຢູ່ສະໜາມບິນ",
    zh: "机场重要禁令",
  },

  // Prohibition items
  prohibitRestrictedArea: {
    en: "Prohibited from entering restricted/operational areas",
    lo: "ຫ້າມເຂົ້າມາໃນເຂດຫວງຫ້າມ/ປະຕິບັດການບິນ",
    zh: "禁止进入限制/运营区域",
  },
  prohibitRestrictedAreaDesc: {
    en: "Do not cut or damage fences, climb fences or enter restricted areas, control areas, or aircraft without authorization",
    lo: "ຫ້າມລັກລອບຕັດ ຫຼື ທໍາລາຍຮົ້ວ, ຫ້າມປີນຮົ້ວ ຫຼື ເຂົ້າເຂດຫວງຫ້າມ, ເຂດຄວບຄຸມ, ເຮືອບິນ ໂດຍບໍ່ໄດ້ຮັບອະນຸຍາດເດັດຂາດ",
    zh: "禁止擅自剪切或破坏围栏、翻越围栏或未经授权进入限制区域、管制区域或飞机",
  },

  prohibitDrugsWeapons: {
    en: "Prohibited involvement with drugs/weapons",
    lo: "ຫ້າມກ່ຽວຂ້ອງກັບສິ່ງເສບຕິດ/ອາວຸດ",
    zh: "禁止涉及毒品/武器",
  },
  prohibitDrugsWeaponsDesc: {
    en: "Strictly prohibited to bring or conceal prohibited items, weapons, drugs, and dangerous materials into the airport or operational areas",
    lo: "ຫ້າມນໍາເອົາ ຫຼື ຊຸກເຊື່ອງບັນດາສິ່ງຂອງເກືອດຫ້າມ, ອາວຸດ, ສານເສບຕິດ ແລະ ວັດຖຸທີ່ເປັນອັນຕະລາຍເຂົ້າໄປໃນສະໜາມບິນ ຫຼື ຜ່ານເຂົ້າໄປໃນເຂດປະຕິບັດການບິນຢ່າງເດັດຂາດ",
    zh: "严禁携带或藏匿违禁物品、武器、毒品和危险物品进入机场或运营区域",
  },

  prohibitDisturbance: {
    en: "Prohibited from causing disturbance",
    lo: "ຫ້າມສ້າງຄວາມບໍ່ສະຫງົບ",
    zh: "禁止制造骚乱",
  },
  prohibitDisturbanceDesc: {
    en: "No fighting, arguing, shouting, intoxication, drug use, or causing disturbances within airport premises. No driving while intoxicated",
    lo: "ຫ້າມກໍ່ອາລະວາດ, ຜິດຖຽງກັນ, ຕີກັນ, ໂວຍວາຍ, ມົ້ວສຸມສິ່ງມືນເມົາ-ສິ່ງເສບຕິດ ແລະ ກໍ່ຄວາມບໍ່ສະຫງົບຕ່າງໆ ຢູ່ໃນບໍລິເວນສະໜາມບິນຢ່າງເດັດຂາດ. ຫ້າມຂັບຂີ່ພາຫະນະໃນຂະນະທີ່ມີອາການມືນເມົາ ຫຼື ຂາດສະຕິ",
    zh: "禁止在机场范围内打架、争吵、喊叫、酗酒、吸毒或制造骚乱。禁止酒后驾车",
  },

  prohibitParking: {
    en: "Prohibited parking/traffic violations",
    lo: "ຫ້າມຈອດລົດ/ສັນຈອນ",
    zh: "禁止违规停车/交通违规",
  },
  prohibitParkingDesc: {
    en: "No unauthorized parking on airport roads. Vehicles picking up passengers at terminal must not park over 5 minutes. No driving against traffic, violating signs, or speeding",
    lo: "ຫ້າມຈອດພາຫະນະຊະຊາຍຕາມເສັ້ນທາງຂອງສະໜາມບິນ. ຫ້າມຜູ້ຂັບຂີ່ພາຫະນະທີ່ມາຮັບ-ສົ່ງ ຜູ້ໂດຍສານຢູ່ໜ້າອາຄານຜູ້ໂດຍສານ ຈອດພາຫະນະເກີນ 5 ນາທີ. ຫ້າມຂັບຂີ່ພາຫະນະສວນທິດທາງຈະລາຈອນ, ລະເມີດປ້າຍຫ້າມ ຫຼື ຂັບຂີ່ເກີນຄວາມໄວກຳນົດ",
    zh: "禁止在机场道路上违规停车。在航站楼接送旅客的车辆停留不得超过5分钟。禁止逆行、违反标志或超速",
  },

  prohibitOther: {
    en: "Other prohibited activities",
    lo: "ຫ້າມກິດຈະກຳອື່ນໆ",
    zh: "其他禁止活动",
  },
  prohibitOtherDesc: {
    en: "No smoking (including e-cigarettes), spitting, or littering in non-smoking areas. No pets in airport interior. No unauthorized advertising, selling, or distributing flyers",
    lo: "ຫ້າມສູບຢາ, ຢາສູບໄຟຟ້າ, ຖົ່ມນໍ້າລາຍ-ຂີ້ກະເທິ, ແລະ ຖິ້ມຂີ້ກອກຢາຊະຊາຍ ຢູ່ບໍລິເວນທີ່ຫ້າມສູບຢາ. ຫ້າມລ້ຽງສັດ ຫຼື ປ່ອຍສັດຊະຊາຍຢູ່ບໍລິເວນດ້ານໃນຂອງສະໜາມບິນຢ່າງເດັດຂາດ. ຫ້າມບຸກຄົນ ຫຼື ນິຕິບຸກຄົນ ເຂົ້າມາໂຄສະນາ, ຂາຍເຄື່ອງ, ຕັ້ງບຸດ, ແຈກໃບປິວ ໂດຍບໍ່ໄດ້ຮັບອະນຸຍາດ",
    zh: "禁止在非吸烟区吸烟（包括电子烟）、吐痰或乱扔垃圾。禁止在机场内部区域携带宠物。禁止未经授权的广告、销售或分发传单",
  },

  // Violation Warning
  violationTitle: {
    en: "Measures Against Violators",
    lo: "ມາດຕະການຕໍ່ຜູ້ລະເມີດ ແລະ ການກະທຳຜິດ",
    zh: "违规处罚措施",
  },
  violationDesc: {
    en: "Any person who violates airport measures and regulations or commits any offense will be subject to Bokeo International Airport regulations, fines, or civil and criminal prosecution under Lao PDR law.",
    lo: "ບຸກຄົນໃດທີ່ລະເມີດມາດຕະການ ແລະ ລະບຽບການຂອງສະໜາມບິນ ຫຼື ກະທຳຜິດຕໍ່ກົດໝາຍທຸກຮູບແບບ ຈະຖືກປະຕິບັດຕາມລະບຽບຂອງສະໜາມບິນສາກົນບໍ່ແກ້ວວາງອອກ ຫຼື ຖືກປັບໃໝ, ດຳເນີຄະດີຕາມກົດໝາຍແພ່ງ, ກົດໝາຍອາຍາຂອງ ສປປ ລາວ",
    zh: "任何违反机场措施和规定或犯有任何违法行为的人将受到波乔国际机场规定的处罚、罚款，或根据老挝人民民主共和国法律追究民事和刑事责任。",
  },

  // Additional Information Section
  additionalInfoTitle: {
    en: "Additional Information",
    lo: "ຂໍ້ມູນເພີ່ມເຕີມ",
    zh: "附加信息",
  },
  faqsLink: {
    en: "FAQs for Taking LAGs Through Security",
    lo: "ຄຳຖາມທີ່ພົບເລື້ອຍກ່ຽວກັບການນຳຂອງແຫຼວຜ່ານຈຸດກວດຄວາມປອດໄພ",
    zh: "携带液体通过安检的常见问题",
  },
} as const;

export type AirportSecurityKey = keyof typeof airportSecurity;

export const tAirportSecurity = (k: AirportSecurityKey, lang: Lang) =>
  airportSecurity[k][lang] ?? airportSecurity[k].en;
