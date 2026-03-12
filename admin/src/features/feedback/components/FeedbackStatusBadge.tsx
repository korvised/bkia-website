import { FeedbackStatus } from "@/types/enum.type";
import { cn } from "@/lib";

interface Props {
  status: FeedbackStatus;
}

const STATUS_STYLES: Record<FeedbackStatus, string> = {
  [FeedbackStatus.NEW]: "bg-blue-100 text-blue-700",
  [FeedbackStatus.IN_PROGRESS]: "bg-yellow-100 text-yellow-700",
  [FeedbackStatus.RESOLVED]: "bg-green-100 text-green-700",
};

const STATUS_LABELS: Record<FeedbackStatus, string> = {
  [FeedbackStatus.NEW]: "New",
  [FeedbackStatus.IN_PROGRESS]: "In Progress",
  [FeedbackStatus.RESOLVED]: "Resolved",
};

export function FeedbackStatusBadge({ status }: Props) {
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
