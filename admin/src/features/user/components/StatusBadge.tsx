import { UserStatus } from "@/types";

const STATUS_STYLES: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "bg-primary-50 text-primary-700",
  [UserStatus.PENDING]: "bg-yellow-50 text-yellow-700",
  [UserStatus.INACTIVE]: "bg-gray-100 text-gray-500",
  [UserStatus.LOCKED]: "bg-danger-50 text-danger-700",
  [UserStatus.CLOSED]: "bg-slate-100 text-slate-500",
};

const STATUS_DOTS: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: "bg-primary",
  [UserStatus.PENDING]: "bg-yellow-400",
  [UserStatus.INACTIVE]: "bg-gray-400",
  [UserStatus.LOCKED]: "bg-danger",
  [UserStatus.CLOSED]: "bg-slate-400",
};

interface StatusBadgeProps {
  status: UserStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${STATUS_DOTS[status] ?? "bg-gray-400"}`}
      />
      {status}
    </span>
  );
}
