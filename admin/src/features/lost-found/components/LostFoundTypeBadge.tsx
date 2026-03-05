import { LostFoundType } from "@/types";
import { cn } from "@/lib";

interface Props {
  type: LostFoundType;
}

export function LostFoundTypeBadge({ type }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        type === LostFoundType.LOST
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700",
      )}
    >
      {type === LostFoundType.LOST ? "Lost" : "Found"}
    </span>
  );
}
