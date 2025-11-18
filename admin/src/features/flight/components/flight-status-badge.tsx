import { FlightStatus } from "@/types";
import { cn } from "@/lib";

interface FlightStatusBadgeProps {
  status: FlightStatus;
}

const statusConfig: Record<FlightStatus, { label: string; className: string }> =
  {
    [FlightStatus.SCHEDULED]: {
      label: "Scheduled",
      className: "bg-blue-100 text-blue-700",
    },
    [FlightStatus.DELAYED]: {
      label: "Delayed",
      className: "bg-yellow-100 text-yellow-700",
    },
    [FlightStatus.BOARDING]: {
      label: "Boarding",
      className: "bg-purple-100 text-purple-700",
    },
    [FlightStatus.DEPARTED]: {
      label: "Departed",
      className: "bg-green-100 text-green-700",
    },
    [FlightStatus.ARRIVED]: {
      label: "Arrived",
      className: "bg-primary-100 text-primary-700",
    },
    [FlightStatus.CANCELED]: {
      label: "Canceled",
      className: "bg-danger-100 text-danger-700",
    },
    [FlightStatus.DIVERTED]: {
      label: "Diverted",
      className: "bg-orange-100 text-orange-700",
    },
  };

export function FlightStatusBadge({ status }: FlightStatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    className: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-medium uppercase",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}
