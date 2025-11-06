import { Lang } from "@/types/language";

/**
 * Turn a dict like { key: { en, lo, zh } } into a typed proxy:
 * const t = createTranslator(dict, lang);  t.someKey
 */
export function createTranslator<
  Dict extends Record<string, Record<Lang, string>>,
  Key extends keyof Dict & string,
>(dict: Dict, lang: Lang) {
  return new Proxy({} as Record<Key, string>, {
    get(_, key: string) {
      if (key in dict) {
        const item = dict[key as Key];
        return item[lang] ?? item.en;
      }
      if (process.env.NODE_ENV === "development") {
        console.warn(`[i18n] Missing key: ${String(key)}`);
      }
      return key;
    },
  });
}
