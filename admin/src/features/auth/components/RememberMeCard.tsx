import { LuX, LuUser, LuBriefcase, LuHash } from "react-icons/lu";
import { cn } from "@/lib";
import type { RememberedUserData } from "@/features/auth/types";

interface RememberMeCardProps {
  userData: RememberedUserData;
  onRemove: () => void;
  isSelected?: boolean;
}

export const RememberMeCard = ({
  userData,
  onRemove,
  isSelected = false,
}: RememberMeCardProps) => {
  const { employee, user } = userData;

  return (
    <div
      className={cn(
        "group from-primary-50 to-secondary-50 relative rounded-2xl bg-gradient-to-br p-6 transition-all duration-200",
        isSelected && "shadow-md",
      )}
    >
      {/* Remove button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-3 right-3 rounded-full bg-white p-1.5 text-gray-400 shadow-sm transition-all hover:bg-gray-100 hover:text-gray-600"
        aria-label="Remove saved user"
      >
        <LuX className="h-4 w-4" />
      </button>

      {/* Card content */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {employee?.profileUrl ? (
            <img
              src={employee.profileUrl}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="h-20 w-16 rounded-xl border-2 border-white object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-white bg-white shadow-sm">
              <LuUser className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* User info */}
        <div className="min-w-0 flex-1 pt-1">
          <h3 className="truncate text-lg font-bold text-gray-900">
            {employee
              ? `${employee.firstName} ${employee.lastName}`
              : user.name}
          </h3>

          {/* Employee ID */}
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-600">
            <LuHash className="h-3.5 w-3.5" />
            <span>{user.empId || "N/A"}</span>
          </div>

          {/* Position */}
          {employee?.position && (
            <div className="bg-primary/10 mt-1.5 inline-block rounded-full px-3 py-1">
              <div className="flex items-center gap-1.5">
                <LuBriefcase className="text-primary h-3.5 w-3.5" />
                <span className="text-primary text-xs font-medium">
                  {employee.position}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
