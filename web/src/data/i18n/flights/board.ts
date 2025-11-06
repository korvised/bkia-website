import type { Lang } from "@/types/language";

export const board = {
  departureTitle: {
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
} as const;

export type BoardKey = keyof typeof board;

export const tBoard = (k: BoardKey, lang: Lang) =>
  board[k][lang] ?? board[k].en;
