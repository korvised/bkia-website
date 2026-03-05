import { LostFoundVisibility } from "@/types";
import { cn } from "@/lib";

interface Props {
  visibility: LostFoundVisibility;
}

const VISIBILITY_STYLES: Record<LostFoundVisibility, string> = {
  [LostFoundVisibility.VISIBLE]: "bg-emerald-100 text-emerald-700",
  [LostFoundVisibility.PENDING_REVIEW]: "bg-amber-100 text-amber-700",
  [LostFoundVisibility.HIDDEN]: "bg-gray-100 text-gray-600",
};

const VISIBILITY_LABELS: Record<LostFoundVisibility, string> = {
  [LostFoundVisibility.VISIBLE]: "Visible",
  [LostFoundVisibility.PENDING_REVIEW]: "Pending Review",
  [LostFoundVisibility.HIDDEN]: "Hidden",
};

export function LostFoundVisibilityBadge({ visibility }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        VISIBILITY_STYLES[visibility],
      )}
    >
      {VISIBILITY_LABELS[visibility]}
    </span>
  );
}
