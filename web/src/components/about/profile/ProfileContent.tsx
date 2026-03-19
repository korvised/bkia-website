import type { Lang } from "@/types/language";
import { HistorySection } from "./HistorySection";
import { VisionSection } from "./VisionSection";
import { MissionSection } from "./MissionSection";
import { TeamValuesSection } from "./TeamValuesSection";

export function ProfileContent({ lang }: { lang: Lang }) {
  return (
    <div>
      <HistorySection lang={lang} />
      <VisionSection lang={lang} />
      <MissionSection lang={lang} />
      <TeamValuesSection lang={lang} />
    </div>
  );
}
