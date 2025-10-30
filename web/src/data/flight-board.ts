export interface Flight {
  id: string;
  time: string;
  originalTime?: string;
  destination: string;
  destinationCode: string;
  airline: string;
  airlineLogo?: string;
  flightNumber: string;
  terminal: string;
  checkInCounter: string;
  gate: string;
  status: "Departure" | "Boarding" | "Delayed" | "Cancelled" | "Departed";
  statusColor: "blue" | "green" | "yellow" | "red" | "gray";
}

export interface FlightFilters {
  terminal?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  destination?: string;
  airline?: string;
  flightNumber?: string;
}

export interface SelectOption {
  value: string;
  label: { en: string; lo: string; zh: string };
  icon?: string;
}

export const terminals: SelectOption[] = [
  {
    value: "all",
    label: { en: "All Terminal", lo: "ທຸກອາຄານຜູ້ໂດຍສານ", zh: "所有航站楼" },
  },
  {
    value: "T1",
    label: { en: "Terminal 1", lo: "ອາຄານຜູ້ໂດຍສານ 1", zh: "1号航站楼" },
  },
  {
    value: "T2",
    label: { en: "Terminal 2", lo: "ອາຄານຜູ້ໂດຍສານ 2", zh: "2号航站楼" },
  },
];

export const destinations: SelectOption[] = [
  {
    value: "",
    label: { en: "Select Destination", lo: "ເລືອກປາຍທາງ", zh: "选择目的地" },
  },
  {
    value: "ADD",
    label: { en: "Addis Ababa", lo: "ອາດິສ ອາບາບາ", zh: "亚的斯亚贝巴" },
    icon: "🇪🇹",
  },
  {
    value: "CPH",
    label: { en: "Copenhagen", lo: "ໂຄເປນເຮເກັນ", zh: "哥本哈根" },
    icon: "🇩🇰",
  },
  {
    value: "AUH",
    label: { en: "Abu Dhabi", lo: "ອາບູດາບີ", zh: "阿布扎比" },
    icon: "🇦🇪",
  },
  {
    value: "BKK",
    label: { en: "Bangkok", lo: "ກຸງເທບ", zh: "曼谷" },
    icon: "🇹🇭",
  },
  {
    value: "HKG",
    label: { en: "Hong Kong", lo: "ຮ່ອງກົງ", zh: "香港" },
    icon: "🇭🇰",
  },
  {
    value: "SIN",
    label: { en: "Singapore", lo: "ສິງກະໂປ", zh: "新加坡" },
    icon: "🇸🇬",
  },
];

export const airlines: SelectOption[] = [
  {
    value: "",
    label: { en: "Select Airline", lo: "ເລືອກສາຍການບິນ", zh: "选择航空公司" },
  },
  {
    value: "ET",
    label: {
      en: "Ethiopian Airlines",
      lo: "ສາຍການບິນເອທິໂອເປຍ",
      zh: "埃塞俄比亚航空",
    },
    icon: "🇪🇹",
  },
  {
    value: "SK",
    label: {
      en: "Scandinavian Airlines",
      lo: "ສາຍການບິນສະແກນດີນາວຽນ",
      zh: "北欧航空",
    },
    icon: "✈️",
  },
  {
    value: "EY",
    label: { en: "Etihad Airways", lo: "ສາຍການບິນເອທິຮາດ", zh: "阿提哈德航空" },
    icon: "🇦🇪",
  },
  {
    value: "WY",
    label: { en: "Oman Air", lo: "ສາຍການບິນໂອມານ", zh: "阿曼航空" },
    icon: "🇴🇲",
  },
  {
    value: "MS",
    label: { en: "Egyptair", lo: "ສາຍການບິນອີຢິບ", zh: "埃及航空" },
    icon: "🇪🇬",
  },
  {
    value: "OZ",
    label: { en: "Asiana Airlines", lo: "ສາຍການບິນອາຊີອານາ", zh: "韩亚航空" },
    icon: "🇰🇷",
  },
];

export const translations = {
  title: {
    en: "Passenger Departure Timetable",
    lo: "ຕາຕະລາງເວລາຖ້ຽວບິນອອກ",
    zh: "旅客出发时刻表",
  },
  arrivalTitle: {
    en: "Passenger Arrival Timetable",
    lo: "ຕາຕະລາງເວລາຖ້ຽວບິນຂາເຂົ້າ",
    zh: "旅客到达时刻表",
  },
  clickForDetails: {
    en: "Please click flight no. for details.",
    lo: "ກະລຸນາຄລິກເລກຖ້ຽວບິນເພື່ອເບິ່ງລາຍລະອຽດ",
    zh: "请点击航班号查看详情",
  },
  confirmDetails: {
    en: "Please confirm flight details with your airline, as the following information may be altered depending on airport operations.",
    lo: "ກະລຸນາຢືນຢັນລາຍລະອຽດຖ້ຽວບິນກັບສາຍການບິນຂອງທ່ານ ເນື່ອງຈາກຂໍ້ມູນອາດມີການປ່ຽນແປງຕາມການດຳເນີນງານສະໜາມບິນ",
    zh: "请与您的航空公司确认航班详情，因为以下信息可能会根据机场运营而改变",
  },
  statusInfo: {
    en: "Flight status information",
    lo: "ຂໍ້ມູນສະຖານະຖ້ຽວບິນ",
    zh: "航班状态信息",
  },
  departureNote: {
    en: "[Departure] means that the airplane has left the gate for departure.",
    lo: "[ອອກເດີນທາງ] ໝາຍຄວາມວ່າເຮືອບິນໄດ້ອອກຈາກປະຕູຂຶ້ນເຮືອແລ້ວ",
    zh: "[出发] 表示飞机已离开登机口准备起飞",
  },
  enterFlightNo: {
    en: "Enter flight No.",
    lo: "ປ້ອນເລກຖ້ຽວບິນ",
    zh: "输入航班号",
  },
  search: {
    en: "Search",
    lo: "ຄົ້ນຫາ",
    zh: "搜索",
  },
  refresh: {
    en: "Refresh",
    lo: "ໂຫຼດຂໍ້ມູນໃໝ່",
    zh: "刷新",
  },
  lastUpdated: {
    en: "Last Updated",
    lo: "ອັບເດດລ່າສຸດ",
    zh: "最后更新",
  },
  departureTime: {
    en: "Departure Time",
    lo: "ເວລາອອກ",
    zh: "出发时间",
  },
  arrivalTime: {
    en: "Arrival Time",
    lo: "ເວລາຮອດ",
    zh: "到达时间",
  },
  to: {
    en: "To",
    lo: "ໄປ",
    zh: "目的地",
  },
  from: {
    en: "From",
    lo: "ຈາກ",
    zh: "出发地",
  },
  airlineFlightNo: {
    en: "Airline/Flight No.",
    lo: "ສາຍການບິນ/ເລກຖ້ຽວບິນ",
    zh: "航空公司/航班号",
  },
  terminal: {
    en: "Terminal",
    lo: "ອາຄານຜູ້ໂດຍສານ",
    zh: "航站楼",
  },
  checkInCounter: {
    en: "Check-in Counter",
    lo: "ເຄົາເຕີເຊັກອິນ",
    zh: "值机柜台",
  },
  gate: {
    en: "Gate",
    lo: "ປະຕູຂຶ້ນເຮືອ",
    zh: "登机口",
  },
  departureConditions: {
    en: "Departure Conditions",
    lo: "ສະຖານະການອອກ",
    zh: "出发状态",
  },
  arrivalConditions: {
    en: "Arrival Conditions",
    lo: "ສະຖານະການຮອດ",
    zh: "到达状态",
  },
  noFlights: {
    en: "No flights found",
    lo: "ບໍ່ພົບຖ້ຽວບິນ",
    zh: "未找到航班",
  },
};
