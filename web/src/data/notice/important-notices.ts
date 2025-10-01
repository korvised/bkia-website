import { MultilingualText } from "@/types/language";

export interface ImportantNotice {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  content: MultilingualText;
  priority: "urgent" | "high" | "normal";
  publishDate: string;
  effectiveDate?: string;
  expiryDate?: string;
  tags?: MultilingualText[];
  attachments?: {
    name: MultilingualText;
    url: string;
    type: string;
  }[];
}

export const importantNotices: ImportantNotice[] = [
  {
    id: "notice-001",
    priority: "urgent",
    publishDate: "2025-09-25",
    effectiveDate: "2025-09-28",
    title: {
      en: "Temporary Closure of South Terminal",
      lo: "ປິດອາຄານຂົນສົ່ງຜູ້ໂດຍສານທາງໃຕ້ຊົ່ວຄາວ",
      zh: "南航站楼临时关闭",
    },
    description: {
      en: "Due to maintenance work, the South Terminal will be temporarily closed from September 28-30, 2025. All flights will operate from the Main Terminal.",
      lo: "ເນື່ອງຈາກວຽກງານບຳລຸງຮັກສາ, ອາຄານຂົນສົ່ງຜູ້ໂດຍສານທາງໃຕ້ຈະປິດຊົ່ວຄາວຕັ້ງແຕ່ວັນທີ 28-30 ກັນຍາ 2025. ເທີ່ງບິນທັງໝົດຈະດຳເນີນການຈາກອາຄານຫຼັກ.",
      zh: "由于维护工作，南航站楼将于2025年9月28日至30日临时关闭。所有航班将在主航站楼运营。",
    },
    content: {
      en: "Dear passengers, please note that the South Terminal will be temporarily closed for essential maintenance work from September 28 to September 30, 2025. All departures and arrivals scheduled during this period will be relocated to the Main Terminal. We apologize for any inconvenience and appreciate your understanding.",
      lo: "ຜູ້ໂດຍສານທີ່ນັບຖື, ກະລຸນາຮັບຊາບວ່າອາຄານຂົນສົ່ງຜູ້ໂດຍສານທາງໃຕ້ຈະປິດຊົ່ວຄາວເພື່ອວຽກງານບຳລຸງຮັກສາທີ່ຈຳເປັນຕັ້ງແຕ່ວັນທີ 28 ເຖິງ 30 ກັນຍາ 2025. ການອອກແລະການມາຮອດທັງໝົດທີ່ກຳນົດໄວ້ໃນໄລຍະນີ້ຈະຖືກຍ້າຍໄປອາຄານຫຼັກ. ພວກເຮົາຂໍໂທດສຳລັບຄວາມບໍ່ສະດວກແລະຂໍຂອບໃຈສຳລັບຄວາມເຂົ້າໃຈຂອງທ່ານ.",
      zh: "尊敬的乘客，请注意南航站楼将于2025年9月28日至30日进行必要维护而临时关闭。在此期间安排的所有出发和到达航班将转移至主航站楼。对于造成的不便，我们深表歉意，感谢您的理解。",
    },
    tags: [
      { en: "Maintenance", lo: "ບຳລຸງຮັກສາ", zh: "维护" },
      { en: "Terminal", lo: "ອາຄານຜູ້ໂດຍສານ", zh: "航站楼" },
    ],
  },
  {
    id: "notice-002",
    priority: "high",
    publishDate: "2025-09-20",
    title: {
      en: "New Security Screening Procedures",
      lo: "ຂັ້ນຕອນການກວດກາຄວາມປອດໄພໃໝ່",
      zh: "新的安全检查程序",
    },
    description: {
      en: "Enhanced security measures will be implemented starting October 1, 2025. Please arrive at least 2 hours before domestic flights and 3 hours before international flights.",
      lo: "ມາດຕະການຄວາມປອດໄພທີ່ເພີ່ມຂຶ້ນຈະຖືກນຳໃຊ້ຕັ້ງແຕ່ວັນທີ 1 ຕຸລາ 2025. ກະລຸນາມາເຖິງຢ່າງໜ້ອຍ 2 ຊົ່ວໂມງກ່ອນເທີ່ງບິນພາຍໃນປະເທດແລະ 3 ຊົ່ວໂມງກ່ອນເທີ່ງບິນສາກົນ.",
      zh: "从2025年10月1日起，将实施增强的安全措施。请在国内航班起飞前至少2小时、国际航班起飞前至少3小时到达。",
    },
    content: {
      en: "To ensure the safety of all passengers, we are implementing enhanced security screening procedures from October 1, 2025. All passengers are advised to arrive earlier than usual. Electronic devices larger than a mobile phone must be removed from carry-on baggage during screening. Liquids must be in containers of 100ml or less and placed in a clear plastic bag.",
      lo: "ເພື່ອຮັບປະກັນຄວາມປອດໄພຂອງຜູ້ໂດຍສານທັງໝົດ, ພວກເຮົາກຳລັງນຳໃຊ້ຂັ້ນຕອນການກວດກາຄວາມປອດໄພທີ່ເພີ່ມຂຶ້ນຈາກວັນທີ 1 ຕຸລາ 2025. ຜູ້ໂດຍສານທັງໝົດແນະນຳໃຫ້ມາເຖິງໄວກວ່າປົກກະຕິ. ອຸປະກອນເອເລັກໂຕຣນິກທີ່ໃຫຍ່ກວ່າໂທລະສັບມືຖືຕ້ອງຖືກເອົາອອກຈາກກະເປົາຖືໃນເວລາກວດກາ. ຂອງແຫຼວຕ້ອງຢູ່ໃນພາຊະນະ 100ml ຫຼືນ້ອຍກວ່າແລະວາງໄວ້ໃນຖົງພລາສຕິກໂປ່ງໃສ.",
      zh: "为确保所有乘客的安全，我们将从2025年10月1日起实施增强的安全检查程序。建议所有乘客比平时更早到达。大于手机的电子设备必须在检查时从随身行李中取出。液体必须装在100毫升或更小的容器中，并放在透明塑料袋中。",
    },
    tags: [
      { en: "Security", lo: "ຄວາມປອດໄພ", zh: "安全" },
      { en: "Procedures", lo: "ຂັ້ນຕອນ", zh: "程序" },
    ],
  },
  {
    id: "notice-003",
    priority: "high",
    publishDate: "2025-09-15",
    effectiveDate: "2025-10-01",
    title: {
      en: "Parking Fee Adjustment",
      lo: "ການປັບຄ່າບໍລິການຈອດລົດ",
      zh: "停车费调整",
    },
    description: {
      en: "New parking rates will take effect from October 1, 2025. Short-term and long-term parking fees will be adjusted to better serve our passengers.",
      lo: "ອັດຕາຄ່າຈອດລົດໃໝ່ຈະມີຜົນບັງຄັບໃຊ້ຕັ້ງແຕ່ວັນທີ 1 ຕຸລາ 2025. ຄ່າຈອດລົດໄລຍະສັ້ນແລະໄລຍະຍາວຈະຖືກປັບປ່ຽນເພື່ອໃຫ້ບໍລິການຜູ້ໂດຍສານຂອງພວກເຮົາໄດ້ດີຂຶ້ນ.",
      zh: "新的停车费率将从2025年10月1日起生效。短期和长期停车费将进行调整，以更好地为乘客服务。",
    },
    content: {
      en: "Effective October 1, 2025, parking rates at Bokeo International Airport will be updated. Short-term parking (0-2 hours): 20,000 LAK. Short-term parking (2-24 hours): 50,000 LAK per day. Long-term parking (24+ hours): 40,000 LAK per day. Monthly passes remain available at discounted rates. Thank you for your understanding.",
      lo: "ມີຜົນບັງຄັບໃຊ້ວັນທີ 1 ຕຸລາ 2025, ອັດຕາຄ່າຈອດລົດທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວຈະຖືກອັບເດດ. ຈອດລົດໄລຍະສັ້ນ (0-2 ຊົ່ວໂມງ): 20,000 ກີບ. ຈອດລົດໄລຍະສັ້ນ (2-24 ຊົ່ວໂມງ): 50,000 ກີບຕໍ່ມື້. ຈອດລົດໄລຍະຍາວ (24+ ຊົ່ວໂມງ): 40,000 ກີບຕໍ່ມື້. ບັດປະຈຳເດືອນຍັງມີໃຫ້ບໍລິການໃນອັດຕາສ່ວນຫຼຸດ. ຂໍຂອບໃຈສຳລັບຄວາມເຂົ້າໃຈຂອງທ່ານ.",
      zh: "自2025年10月1日起，博胶国际机场的停车费率将更新。短期停车（0-2小时）：20,000基普。短期停车（2-24小时）：每天50,000基普。长期停车（24小时以上）：每天40,000基普。月票仍可享受折扣价。感谢您的理解。",
    },
    tags: [
      { en: "Parking", lo: "ຈອດລົດ", zh: "停车" },
      { en: "Fees", lo: "ຄ່າທຳນຽມ", zh: "费用" },
    ],
  },
  {
    id: "notice-004",
    priority: "normal",
    publishDate: "2025-09-10",
    title: {
      en: "Free WiFi Service Upgrade",
      lo: "ການຍົກລະດັບບໍລິການ WiFi ຟຣີ",
      zh: "免费WiFi服务升级",
    },
    description: {
      en: "We are pleased to announce that our free WiFi service has been upgraded with faster speeds and better coverage throughout the terminal.",
      lo: "ພວກເຮົາດີໃຈທີ່ຈະປະກາດວ່າບໍລິການ WiFi ຟຣີຂອງພວກເຮົາໄດ້ຮັບການຍົກລະດັບດ້ວຍຄວາມໄວທີ່ໄວຂຶ້ນແລະຄວາມຄຸ້ມຄອງທີ່ດີກວ່າໃນທົ່ວອາຄານຜູ້ໂດຍສານ.",
      zh: "我们很高兴地宣布，我们的免费WiFi服务已升级，速度更快，航站楼内覆盖更好。",
    },
    content: {
      en: "We are excited to inform you that our airport WiFi infrastructure has been significantly upgraded. You can now enjoy faster internet speeds and seamless connectivity throughout all terminal areas. To connect, simply select 'BokeoAirport_Free' from your device's WiFi settings. No password required for the first 2 hours. Premium high-speed WiFi packages are also available for purchase.",
      lo: "ພວກເຮົາຕື່ນເຕັ້ນທີ່ຈະແຈ້ງໃຫ້ທ່ານຊາບວ່າໂຄງສ້າງພື້ນຖານ WiFi ຂອງສະໜາມບິນຂອງພວກເຮົາໄດ້ຮັບການຍົກລະດັບຢ່າງຫຼວງຫຼາຍ. ຕອນນີ້ທ່ານສາມາດເພີດເພີນກັບຄວາມໄວອິນເຕີເນັດທີ່ໄວຂຶ້ນແລະການເຊື່ອມຕໍ່ທີ່ບໍ່ມີການຂັດຂວາງໃນທົ່ວພື້ນທີ່ອາຄານຜູ້ໂດຍສານທັງໝົດ. ເພື່ອເຊື່ອມຕໍ່, ພຽງແຕ່ເລືອກ 'BokeoAirport_Free' ຈາກການຕັ້ງຄ່າ WiFi ຂອງອຸປະກອນຂອງທ່ານ. ບໍ່ຈຳເປັນຕ້ອງມີລະຫັດຜ່ານສຳລັບ 2 ຊົ່ວໂມງທຳອິດ. ແພັກເກັດ WiFi ຄວາມໄວສູງພຣີມຽມຍັງມີໃຫ້ຊື້ໄດ້.",
      zh: "我们很高兴地通知您，我们机场的WiFi基础设施已得到显著升级。您现在可以在所有航站楼区域享受更快的互联网速度和无缝连接。要连接，只需从设备的WiFi设置中选择。前2小时无需密码。还可购买高级高速WiFi套餐。",
    },
    tags: [
      { en: "WiFi", lo: "WiFi", zh: "WiFi" },
      { en: "Technology", lo: "ເທັກໂນໂລຊີ", zh: "技术" },
    ],
  },
];
