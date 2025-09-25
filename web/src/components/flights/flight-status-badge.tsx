import { Flight, FlightStatus } from "@/types/flight";

interface FlightStatusBadgeProps {
  status: FlightStatus;
}

export function FlightStatusBadge({ status }: FlightStatusBadgeProps) {
  const getStatusStyles = (status: Flight["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-gray-100 text-gray-800";
      case "boarding":
        return "bg-blue-100 text-blue-800";
      case "delayed":
        return "bg-yellow-100 text-yellow-800";
      case "departed":
        return "bg-green-100 text-green-800";
      case "arrived":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(status)}`}
    >
      {status}
    </span>
  );
}
