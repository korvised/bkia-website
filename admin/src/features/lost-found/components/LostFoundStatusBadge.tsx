import { LostFoundStatus } from "@/types";
import { cn } from "@/lib";

interface Props {
  status: LostFoundStatus;
}

const STATUS_STYLES: Record<LostFoundStatus, string> = {
  [LostFoundStatus.OPEN]: "bg-blue-100 text-blue-700",
  [LostFoundStatus.MATCHED]: "bg-yellow-100 text-yellow-700",
  [LostFoundStatus.RETURNED]: "bg-green-100 text-green-700",
  [LostFoundStatus.DONATED]: "bg-purple-100 text-purple-700",
  [LostFoundStatus.DISPOSED]: "bg-gray-100 text-gray-600",
};

const STATUS_LABELS: Record<LostFoundStatus, string> = {
  [LostFoundStatus.OPEN]: "Open",
  [LostFoundStatus.MATCHED]: "Matched",
  [LostFoundStatus.RETURNED]: "Returned",
  [LostFoundStatus.DONATED]: "Donated",
  [LostFoundStatus.DISPOSED]: "Disposed",
};

export function LostFoundStatusBadge({ status }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        STATUS_STYLES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
