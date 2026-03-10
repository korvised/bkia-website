import { ImportantPriority } from "@/types";
import { cn } from "@/lib";

const PRIORITY_CONFIG: Record<
  ImportantPriority,
  { label: string; className: string }
> = {
  [ImportantPriority.URGENT]: {
    label: "Urgent",
    className: "bg-red-100 text-red-700",
  },
  [ImportantPriority.HIGH]: {
    label: "High",
    className: "bg-orange-100 text-orange-700",
  },
  [ImportantPriority.NORMAL]: {
    label: "Normal",
    className: "bg-green-100 text-green-700",
  },
};

interface Props {
  priority: ImportantPriority;
}

export function NoticePriorityBadge({ priority }: Props) {
  const config = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG[ImportantPriority.NORMAL];
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}
