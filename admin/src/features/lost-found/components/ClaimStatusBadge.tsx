import { ClaimStatus } from "@/types";
import { cn } from "@/lib";

interface Props {
  status: ClaimStatus;
}

const STATUS_STYLES: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]: "bg-amber-100 text-amber-700",
  [ClaimStatus.APPROVED]: "bg-blue-100 text-blue-700",
  [ClaimStatus.REJECTED]: "bg-red-100 text-red-700",
  [ClaimStatus.COMPLETED]: "bg-emerald-100 text-emerald-700",
};

const STATUS_LABELS: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]: "Pending",
  [ClaimStatus.APPROVED]: "Approved",
  [ClaimStatus.REJECTED]: "Rejected",
  [ClaimStatus.COMPLETED]: "Completed",
};

export function ClaimStatusBadge({ status }: Props) {
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
