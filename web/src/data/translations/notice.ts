import { MultilingualText } from "@/types/language";

export interface NoticeTranslations {
  title: MultilingualText;
  tabs: {
    important: MultilingualText;
    information: MultilingualText;
    lostFound: MultilingualText;
    complaint: MultilingualText;
  };
}

export const noticeTranslations: NoticeTranslations = {
  title: {
    en: "Notices & Announcements",
    lo: "ແຈ້ງການ ແລະ ປະກາດ",
    zh: "通知与公告",
  },
  tabs: {
    important: {
      en: "Important Notices",
      lo: "ແຈ້ງການສຳຄັນ",
      zh: "重要通知",
    },
    information: {
      en: "Information",
      lo: "ຂໍ້ມູນຂ່າວສານ",
      zh: "信息公开",
    },
    lostFound: {
      en: "Lost & Found",
      lo: "ສິ່ງຂອງສູນຫາຍ",
      zh: "失物招领",
    },
    complaint: {
      en: "Complaints & Processing",
      lo: "ການຮ້ອງທຸກ ແລະ ການດຳເນີນການ",
      zh: "投诉处理",
    },
  },
};
