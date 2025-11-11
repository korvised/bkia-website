export const hero = {
  announcements: {
    en: "Announcements",
    zh: "公告",
    lo: "ແຈ້ງການ",
  },
} as const;

export type HeroKey = keyof typeof hero;
