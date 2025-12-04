import type { Lang } from "@/types/language";

export const checkin = {
  // Page title
  title: {
    en: "Check-in",
    lo: "ແຈ້ງປີ້",
    zh: "办理登机",
  },

  // Introduction
  intro: {
    en: "Make sure you have all your travel documents ready, including a valid passport, air ticket or booking confirmation and any necessary visas.",
    lo: "ກະລຸນາກະກຽມເອກະສານການເດີນທາງໃຫ້ພ້ອມ, ລວມທັງໜັງສືຜ່ານແດນ, ປີ້ຍົນ ຫຼື ການຢືນຢັນການຈອງ ແລະ ວີຊ່າທີ່ຈຳເປັນ.",
    zh: "请确保您已准备好所有旅行证件，包括有效护照、机票或预订确认函以及所需签证。",
  },

  // Counter Check-in Section
  counterCheckinTitle: {
    en: "Counter Check-in",
    lo: "ແຈ້ງປີ້ທີ່ເຄົາເຕີ",
    zh: "柜台值机",
  },
  counterCheckinDesc: {
    en: "Our dedicated airport check-in staff are located at the counters in the departure hall. Present your passport and booking confirmation to receive your boarding pass and check in your luggage.",
    lo: "ພະນັກງານແຈ້ງປີ້ສະໜາມບິນຂອງພວກເຮົາແມ່ນປະຈຳການຢູ່ເຄົາເຕີໃນໂຖງຜູ້ໂດຍສານຂາອອກ. ສະແດງໜັງສືຜ່ານແດນ ແລະ ການຢືນຢັນການຈອງ ເພື່ອຮັບບັດຂຶ້ນເຮືອບິນ ແລະ ໂຫຼດກະເປົາ.",
    zh: "我们专门的机场值机工作人员位于出发大厅的柜台。请出示您的护照和预订确认函，以领取登机牌并托运行李。",
  },
  viewAirlineCounters: {
    en: "Click here to view your flight and its assigned check-in counter number",
    lo: "ກົດທີ່ນີ້ເພື່ອກວດເບິ່ງຖ້ຽວບິນຂອງທ່ານ ແລະ ເບີເຄົາເຕີແຈ້ງປີ້ທີ່ຖືກກຳນົດ",
    zh: "点击此处查看您的航班及其指定的柜台编号",
  },

  // Arrival Times Section
  arrivalTimesTitle: {
    en: "Recommended Arrival Times",
    lo: "ເວລາມາຮອດທີ່ແນະນຳ",
    zh: "建议到达时间",
  },
  arrivalTimesDesc: {
    en: "Passengers are advised to arrive early to allow sufficient time for check-in, passport control and security procedures. Please contact your airline if you have any enquiries.",
    lo: "ແນະນຳໃຫ້ຜູ້ໂດຍສານມາຮອດລ່ວງໜ້າ ເພື່ອໃຫ້ມີເວລາພຽງພໍສຳລັບການແຈ້ງປີ້, ກວດໜັງສືຜ່ານແດນ ແລະ ຂັ້ນຕອນຄວາມປອດໄພ. ກະລຸນາຕິດຕໍ່ສາຍການບິນຂອງທ່ານຫາກມີຄຳຖາມ.",
    zh: "建议旅客提前到达，预留充足时间办理值机、护照检查和安检手续。如有疑问，请联系您的航空公司。",
  },
  viewAirlineContacts: {
    en: "Click here for airline contact details",
    lo: "ກົດທີ່ນີ້ເພື່ອເບິ່ງລາຍລະອຽດການຕິດຕໍ່ສາຍການບິນ",
    zh: "点击此处查看航空公司联系方式",
  },
  domesticFlights: {
    en: "Domestic Flights",
    lo: "ຖ້ຽວບິນພາຍໃນ",
    zh: "国内航班",
  },
  internationalFlights: {
    en: "International Flights",
    lo: "ຖ້ຽວບິນຕ່າງປະເທດ",
    zh: "国际航班",
  },
  domesticArrival: {
    en: "Arrive at least 2 hours before departure",
    lo: "ມາຮອດຢ່າງໜ້ອຍ 2 ຊົ່ວໂມງກ່ອນອອກເດີນທາງ",
    zh: "请至少在起飞前2小时到达",
  },
  internationalArrival: {
    en: "Arrive at least 2.5 hours before departure",
    lo: "ມາຮອດຢ່າງໜ້ອຍ 2.5 ຊົ່ວໂມງກ່ອນອອກເດີນທາງ",
    zh: "请至少在起飞前2.5小时到达",
  },

  // Counter Hours Section
  counterHoursTitle: {
    en: "Check-in Counter Hours",
    lo: "ເວລາເປີດ-ປິດເຄົາເຕີແຈ້ງປີ້",
    zh: "值机柜台开放时间",
  },
  opens: {
    en: "Opens",
    lo: "ເປີດ",
    zh: "开放",
  },
  closes: {
    en: "Closes",
    lo: "ປິດ",
    zh: "截止",
  },
  domesticOpens: {
    en: "2 hours before departure",
    lo: "2 ຊົ່ວໂມງກ່ອນອອກເດີນທາງ",
    zh: "起飞前2小时",
  },
  domesticCloses: {
    en: "30 minutes before departure",
    lo: "30 ນາທີກ່ອນອອກເດີນທາງ",
    zh: "起飞前30分钟",
  },
  internationalOpens: {
    en: "2.5 hours before departure",
    lo: "2.5 ຊົ່ວໂມງກ່ອນອອກເດີນທາງ",
    zh: "起飞前2.5小时",
  },
  internationalCloses: {
    en: "40 minutes before departure",
    lo: "40 ນາທີກ່ອນອອກເດີນທາງ",
    zh: "起飞前40分钟",
  },
} as const;

export type CheckinKey = keyof typeof checkin;

export const tCheckin = (k: CheckinKey, lang: Lang) =>
  checkin[k][lang] ?? checkin[k].en;
