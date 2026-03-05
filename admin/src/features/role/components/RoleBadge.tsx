import { LuShield } from "react-icons/lu";
import { UserRole } from "@/types";

const ROLE_STYLES: Record<string, string> = {
  [UserRole.SUPER_ADMIN]: "bg-purple-100 text-purple-700",
  [UserRole.ADMIN]: "bg-primary-100 text-primary-700",
  [UserRole.STAFF]: "bg-secondary-100 text-secondary-700",
};

interface RoleBadgeProps {
  role: string;
  showIcon?: boolean;
}

export function RoleBadge({ role, showIcon = true }: RoleBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_STYLES[role] ?? "bg-gray-100 text-gray-600"}`}
    >
      {showIcon && <LuShield className="h-3 w-3 shrink-0" />}
      {role}
    </span>
  );
}
