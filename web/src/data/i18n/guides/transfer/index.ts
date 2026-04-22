import { createTranslator } from "@/lib";
import { Lang } from "@/types/language";
import {
  transferMain,
  type TransferMainKey,
  tTransferMain,
} from "./transfer-main";

export function createTransferGuideI18n(lang: Lang) {
  const transferMainT = createTranslator<typeof transferMain, TransferMainKey>(
    transferMain,
    lang,
  );

  return {
    transferMain: transferMainT,
  };
}

export { transferMain, tTransferMain };
export type { TransferMainKey };
