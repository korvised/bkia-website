import { DisplayStatusCode } from "@/types/flight";

export const labelsByCode: Record<
  DisplayStatusCode,
  { en: string; lo: string; zh: string }
> = {
  CHECK_IN_OPEN: {
    en: "Check-in open",
    lo: "ເປີດແຈ້ງປີ້",
    zh: "办理值机中",
  },
  CHECK_IN_CLOSED: {
    en: "Check-in closed",
    lo: "ປິດແຈ້ງປີ້",
    zh: "值机已截止",
  },
  BOARDING: {
    en: "Boarding",
    lo: "ປ່ອຍໂດຍສານ",
    zh: "登机中",
  },
  FINAL_CALL: {
    en: "Final call",
    lo: "ເອີ້ນຄັ້ງສຸດທ້າຍ",
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
    lo: "ຊັກຊ້າ",
    zh: "延误",
  },
  DEPARTED: {
    en: "Departed",
    lo: "ອອກເດີນທາງ",
    zh: "已起飞",
  },
  ARRIVED: {
    en: "Arrived",
    lo: "ມາຮອດ",
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
    lo: "ປ່ຽນປາຍທາງ",
    zh: "备降",
  },
  SCHEDULED: {
    en: "Scheduled",
    lo: "ຕາຕະລາງ",
    zh: "计划中",
  },
};
