import type { Lang } from "@/types/language";

export const board = {
  departureTitle: {
    en: "Passenger Departure Timetable",
    lo: "ຕາຕະລາງເວລາຖ້ຽວບິນຂາອອກ",
    zh: "旅客出发时刻表",
  },
  arrivalTitle: {
    en: "Passenger Arrival Timetable",
    lo: "ຕາຕະລາງເວລາຖ້ຽວບິນຂາເຂົ້າ",
    zh: "旅客到达时刻表",
  },
  scheduleTitle: {
    en: "Flight Schedule",
    lo: "ຕາຕະລາງຖ້ຽວບິນ",
    zh: "航班时刻表",
  },
  confirmDetails: {
    en: "Please confirm your flight details with the airline. Information shown here is for reference and may not reflect real-time changes.",
    lo: "ກະລຸນາຢືນຢັນຂໍ້ມູນຖ້ຽວບິນກັບສາຍການບິນ. ຂໍ້ມູນນີ້ເປັນການອ້າງອີງ ແລະ ອາດບໍ່ອັບເດດຕາມເວລາຈິງ.",
    zh: "请向航空公司确认航班信息。此处数据仅供参考，可能无法反映实时变化。",
  },
  scheduleMayChange: {
    en: "Flight times and gates may change without notice due to weather or airport operations. Please check updates before travel.",
    lo: "ເວລາ ແລະ ປະຕູຂຶ້ນເຄື່ອງອາດຈະປ່ຽນໂດຍບໍ່ແຈ້ງລ່ວງໜ້າ ເນື່ອງຈາກສະພາບອາກາດ ຫຼື ການດໍາເນີນງານຂອງສະໜາມບິນ. ກະລຸນາກວດສອບຂໍ້ມູນກ່ອນເດີນທາງ.",
    zh: "航班时间和登机口可能因天气或机场运行而调整。出行前请查看最新信息。",
  },
  lastUpdatedInfo: {
    en: "Flight information is updated frequently to ensure accuracy. However, actual schedules and times may change without prior notice.",
    lo: "ຂໍ້ມູນຖ້ຽວບິນຖືກປັບປຸງເປັນປະຈໍາເພື່ອຄວາມຖືກຕ້ອງ ແຕ່ເວລາຈິງອາດຈະມີການປ່ຽນແປງໂດຍບໍ່ແຈ້ງລ່ວງໜ້າ.",
    zh: "航班信息会定期更新以确保准确，但实际时间和安排可能会在未通知的情况下更改。",
  },
} as const;

export type BoardKey = keyof typeof board;

export const tBoard = (k: BoardKey, lang: Lang) =>
  board[k][lang] ?? board[k].en;
