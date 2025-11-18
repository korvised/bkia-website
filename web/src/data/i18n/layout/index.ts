import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import {
  searchDialog,
  type SearchDialogKey,
  tSearchDialog,
} from "./search-dialog";
import { footer, type FooterKey, tFooter } from "./footer";
import { notfound, type NotfoundKey, tNotfound } from "./not-found";

export function createLayoutI18n(lang: Lang) {
  const footerT = createTranslator<typeof footer, FooterKey>(footer, lang);
  const notfoundT = createTranslator<typeof notfound, NotfoundKey>(
    notfound,
    lang,
  );
  const searchDialogT = createTranslator<typeof searchDialog, SearchDialogKey>(
    searchDialog,
    lang,
  );

  return {
    footer: footerT,
    notfound: notfoundT,
    searchDialog: searchDialogT,
  };
}

export { tFooter, tNotfound, tSearchDialog };
export type { FooterKey, NotfoundKey, SearchDialogKey };
