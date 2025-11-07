import { Plane } from "lucide-react";
import { FlightStatus, FlightType } from "@/types/enum";

export const getStatusStyle = (status: FlightStatus) => {
  switch (status) {
    case FlightStatus.SCHEDULED:
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
      };
    case FlightStatus.BOARDING:
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      };
    case FlightStatus.DEPARTED:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      };
    case FlightStatus.ARRIVED:
      return {
        bg: "bg-teal-100",
        text: "text-teal-800",
        border: "border-teal-200",
      };
    case FlightStatus.DELAYED:
      return {
        bg: "bg-orange-100",
        text: "text-orange-800",
        border: "border-orange-200",
      };
    case FlightStatus.CANCELED:
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
      };
    case FlightStatus.DIVERTED:
      return {
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-200",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      };
  }
};

// Border color by status
export const getBorderColor = (status: string) => {
  const statusUpper = status.toUpperCase();

  switch (statusUpper) {
    case FlightStatus.SCHEDULED:
      return "border-l-primary-500";
    case FlightStatus.BOARDING:
      return "border-l-green-500";
    case FlightStatus.DEPARTED:
      return "border-l-gray-500";
    case FlightStatus.ARRIVED:
      return "border-l-teal-500";
    case FlightStatus.DELAYED:
      return "border-l-orange-500";
    case FlightStatus.CANCELED:
      return "border-l-red-500";
    case FlightStatus.DIVERTED:
      return "border-l-purple-500";
    default:
      return "border-l-secondary-500";
  }
};

// Flight type badge
export const getTypeStyle = (type: FlightType) => {
  switch (type) {
    case FlightType.COMMERCIAL:
      return {
        icon: Plane,
        bg: "bg-secondary-50",
        text: "text-secondary-700",
        label: "Comercial",
      };
    case FlightType.CHARTER:
      return {
        icon: Plane,
        bg: "bg-purple-50",
        text: "text-purple-700",
        label: "Charter",
      };
    case FlightType.CARGO:
      return {
        icon: Plane,
        bg: "bg-amber-50",
        text: "text-amber-700",
        label: "CGO",
      };
    case FlightType.PRIVATE:
      return {
        icon: Plane,
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        label: "Private",
      };
    case FlightType.VIP:
      return {
        icon: Plane,
        bg: "bg-rose-50",
        text: "text-rose-700",
        label: "VIP",
      };
    default:
      return {
        icon: Plane,
        bg: "bg-secondary-50",
        text: "text-secondary-700",
        label: "N/A",
      };
  }
};
