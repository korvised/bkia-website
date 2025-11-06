import type { Lang } from "@/types/language";

export const table = {
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
  origin: {
    en: "Origin",
    lo: "ຈາກ",
    zh: "出发地",
  },
  destination: {
    en: "Destination",
    lo: "ໄປ",
    zh: "目的地",
  },
  route: {
    en: "Route",
    lo: "ເສັ້ນທາງ",
    zh: "航线",
  },
  airlineFlightNo: {
    en: "Airline/Flight No.",
    lo: "ສາຍການບິນ/ເລກຖ້ຽວບິນ",
    zh: "航空公司/航班号",
  },
  checkInCounter: {
    en: "Check-in Counter",
    lo: "ເຄົາເຕີເຊັກອິນ",
    zh: "值机柜台",
  },
  operationDate: {
    en: "Operating Date",
    lo: "ວັນທີດໍາເນີນການ",
    zh: "运营日期",
  },
  status: {
    en: "Status",
    lo: "ສະຖານະ",
    zh: "状态",
  },
  noFlights: {
    en: "No flights found",
    lo: "ບໍ່ພົບຖ້ຽວບິນ",
    zh: "未找到航班",
  },
} as const;

export type TableKey = keyof typeof table;
export const tTable = (k: TableKey, lang: Lang) =>
  table[k][lang] ?? table[k].en;
