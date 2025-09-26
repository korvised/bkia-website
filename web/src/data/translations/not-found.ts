import { MultilingualText } from "@/types/language";

export interface NotFoundTranslations {
  title: MultilingualText;
  subtitle: MultilingualText;
  message: MultilingualText;
  suggestions: MultilingualText;
  goHome: MultilingualText;
  viewFlights: MultilingualText;
  helpText: MultilingualText;
}

export const notFoundTranslations: NotFoundTranslations = {
  title: {
    en: "Page Not Found",
    lo: "ບໍ່ພົບໜ້ານີ້",
    zh: "页面未找到",
  },
  subtitle: {
    en: "404",
    lo: "404",
    zh: "404",
  },
  message: {
    en: "Sorry, the page you're looking for doesn't exist or has been moved.",
    lo: "ຂໍອະໄພ, ໜ້າທີ່ທ່ານຊອກຫາບໍ່ມີຢູ່ ຫຼື ຖືກຍ້າຍໄປແລ້ວ.",
    zh: "抱歉，您要查找的页面不存在或已被移动。",
  },
  suggestions: {
    en: "Here's what you can do:",
    lo: "ທ່ານສາມາດເຮັດໄດ້:",
    zh: "您可以执行以下操作：",
  },
  goHome: {
    en: "Go to Homepage",
    lo: "ໄປໜ້າຫຼັກ",
    zh: "返回首页",
  },
  viewFlights: {
    en: "View Flights",
    lo: "ເບິ່ງຖ້ຽວບິນ",
    zh: "查看航班",
  },
  helpText: {
    en: "Need help? Contact our information desk.",
    lo: "ຕ້ອງການຄວາມຊ່ວຍເຫຼືອ? ຕິດຕໍ່ແຜນກຂໍ້ມູນຂອງພວກເຮົາ.",
    zh: "需要帮助？请联系我们的信息台。",
  },
};
