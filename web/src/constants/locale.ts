import { Locale as DateFnsLocale } from "date-fns";

// Custom Lao locale for date-fns
export const loLocale: DateFnsLocale = {
  code: "lo",
  formatDistance: () => "",
  formatRelative: () => "",
  localize: {
    ordinalNumber: (n: number) => String(n),
    era: () => "",
    quarter: () => "",
    month: (n: number) => {
      const months = [
        "ມັງກອນ",
        "ກຸມພາ",
        "ມີນາ",
        "ເມສາ",
        "ພຶດສະພາ",
        "ມິຖຸນາ",
        "ກໍລະກົດ",
        "ສິງຫາ",
        "ກັນຍາ",
        "ຕຸລາ",
        "ພະຈິກ",
        "ທັນວາ",
      ];
      return months[n];
    },
    day: (n: number) => {
      const days = ["ອທ", "ຈ", "ອຄ", "ພ", "ພຫ", "ສກ", "ສ"];
      return days[n];
    },
    dayPeriod: () => "",
  },
  formatLong: {
    date: () => "dd/MM/yyyy",
    time: () => "HH:mm",
    dateTime: () => "dd/MM/yyyy HH:mm",
  },
  match: {
    ordinalNumber: () => ({ value: 0, rest: "" }),
    era: () => ({ value: 0, rest: "" }),
    quarter: () => ({ value: 1, rest: "" }),
    month: () => ({ value: 0, rest: "" }),
    day: () => ({ value: 0, rest: "" }),
    dayPeriod: () => ({ value: "am", rest: "" }),
  },
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1,
  },
};
