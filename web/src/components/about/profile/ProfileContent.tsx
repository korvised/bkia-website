import type { Lang } from "@/types/language";
import { SloganSection } from "./SloganSection";
import { HistorySection } from "./HistorySection";
import { VisionSection } from "./VisionSection";
import { MissionSection } from "./MissionSection";

export function ProfileContent({ lang }: { lang: Lang }) {
  return (
    <div>
      <SloganSection lang={lang} />
      <HistorySection lang={lang} />
      <VisionSection lang={lang} />
      <MissionSection lang={lang} />
    </div>
  );
}
