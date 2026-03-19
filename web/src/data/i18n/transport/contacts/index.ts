import type { Lang } from "@/types/language";
import { contacts, tContacts } from "./contacts";

export { contacts, tContacts };
export type { ContactsKey } from "./contacts";

export function createContactsI18n(lang: Lang) {
  const t = (k: Parameters<typeof tContacts>[0]) => tContacts(k, lang);
  return { t, contacts };
}
