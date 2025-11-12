import { DisplayStatusCode } from "@/types/flight";

export const labelsByCode: Record<
  DisplayStatusCode,
  { en: string; lo: string; zh: string }
> = {
  CHECK_IN_OPEN: {
    en: "Check-in open",
    lo: "ເປີດເຊັກອິນ",
    zh: "办理值机中",
  },
  CHECK_IN_CLOSED: {
    en: "Check-in closed",
    lo: "ປິດເຊັກອິນ",
    zh: "值机已截止",
  },
  BOARDING: {
    en: "Boarding",
    lo: "ກຳລັງເຂົ້າເຮືອບິນ",
    zh: "登机中",
  },
  FINAL_CALL: {
    en: "Final call",
    lo: "ເອີ້ນຂຶ້ນເຮືອບິນຮອບສຸດທ້າຍ",
    zh: "最后召集",
  },
  GATE_CLOSED: {
    en: "Gate closed",
    lo: "ປິດປະຕູຂຶ້ນເຮືອບິນ",
    zh: "登机口已关闭",
  },
  ON_TIME: {
    en: "On time",
    lo: "ຕາມເວລາ",
    zh: "准点",
  },
  DELAYED: {
    en: "Delayed",
    lo: "ລ່າຊ້າ",
    zh: "延误",
  },
  DEPARTED: {
    en: "Departed",
    lo: "ອອກແລ້ວ",
    zh: "已起飞",
  },
  ARRIVED: {
    en: "Arrived",
    lo: "ເຖິງແລ້ວ",
    zh: "已到达",
  },
  EN_ROUTE: {
    en: "En route",
    lo: "ກຳລັງເດີນທາງ",
    zh: "途中",
  },
  CANCELED: {
    en: "Canceled",
    lo: "ຍົກເລີກ",
    zh: "取消",
  },
  DIVERTED: {
    en: "Diverted",
    lo: "ປ່ຽນທິດທາງ",
    zh: "备降",
  },
  SCHEDULED: {
    en: "Scheduled",
    lo: "ຕາຕະລາງ",
    zh: "计划中",
  },
};
