import { FlightType } from "@/types/enum";
import { cn } from "@/lib";
import { getTypeStyle } from "@/services/flight";

interface FlightTypeBadgeProps {
  type: FlightType;
}

export const FlightTypeBadge: React.FC<FlightTypeBadgeProps> = ({ type }) => {
  const style = getTypeStyle(type);
  const Icon = style.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase",
        style.bg,
        style.text,
      )}
    >
      <Icon className="h-3 w-3" />
      {style.label}
    </span>
  );
};
