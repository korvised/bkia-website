import { FlightStatus, FlightType } from "@/types/enum";
import type { DisplayStatusCode } from "@/types/flight";
import {
  MdSchedule,
  MdFlightTakeoff,
  MdFlightLand,
  MdAccessTime,
  MdCancel,
  MdAltRoute,
  MdLogin,
  MdDoorFront,
  MdCampaign,
  MdAirplanemodeActive,
  MdFlight,
  MdLocalShipping,
  MdPerson,
  MdWorkspacePremium,
  MdGroups,
} from "react-icons/md";

type AnyStatus = FlightStatus | DisplayStatusCode;

// ===== Status badge (bg/text/border + icon) =====
export const getStatusStyle = (status: AnyStatus) => {
  switch (status) {
    // === SCHEDULED & ON_TIME (treat the same visual) ===
    case FlightStatus.SCHEDULED:
    case "SCHEDULED":
    case "ON_TIME":
      return {
        icon: MdSchedule,
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
      };

    // === BOARDING (incl. derived) ===
    case FlightStatus.BOARDING:
    case "BOARDING":
      return {
        icon: MdFlightTakeoff,
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      };

    // === FINAL CALL (derived) ===
    case "FINAL_CALL":
      return {
        icon: MdCampaign,
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
      };

    // === GATE CLOSED (derived) ===
    case "GATE_CLOSED":
      return {
        icon: MdDoorFront,
        bg: "bg-amber-100",
        text: "text-amber-800",
        border: "border-amber-200",
      };

    // === DEPARTED ===
    case FlightStatus.DEPARTED:
    case "DEPARTED":
      return {
        icon: MdFlightTakeoff,
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      };

    // === ARRIVED ===
    case FlightStatus.ARRIVED:
    case "ARRIVED":
      return {
        icon: MdFlightLand,
        bg: "bg-teal-100",
        text: "text-teal-800",
        border: "border-teal-200",
      };

    // === EN ROUTE (derived) ===
    case "EN_ROUTE":
      return {
        icon: MdAirplanemodeActive,
        bg: "bg-indigo-100",
        text: "text-indigo-800",
        border: "border-indigo-200",
      };

    // === DELAYED ===
    case FlightStatus.DELAYED:
    case "DELAYED":
      return {
        icon: MdAccessTime,
        bg: "bg-orange-100",
        text: "text-orange-800",
        border: "border-orange-200",
      };

    // === CANCELED ===
    case FlightStatus.CANCELED:
    case "CANCELED":
      return {
        icon: MdCancel,
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
      };

    // === DIVERTED ===
    case FlightStatus.DIVERTED:
    case "DIVERTED":
      return {
        icon: MdAltRoute,
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-200",
      };

    // === CHECK-IN (derived) ===
    case "CHECK_IN_OPEN":
      return {
        icon: MdLogin,
        bg: "bg-sky-100",
        text: "text-sky-800",
        border: "border-sky-200",
      };
    case "CHECK_IN_CLOSED":
      return {
        icon: MdDoorFront,
        bg: "bg-sky-200",
        text: "text-sky-900",
        border: "border-sky-300",
      };

    default:
      return {
        icon: MdSchedule,
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      };
  }
};

// ===== Left border color stripe (works with derived too) =====
export const getBorderColor = (status: AnyStatus) => {
  const s = String(status).toUpperCase();

  switch (s) {
    case FlightStatus.SCHEDULED:
    case "SCHEDULED":
    case "ON_TIME":
      return "border-l-primary-500";
    case FlightStatus.BOARDING:
    case "BOARDING":
      return "border-l-green-500";
    case "FINAL_CALL":
      return "border-l-yellow-500";
    case "GATE_CLOSED":
      return "border-l-amber-500";
    case FlightStatus.DEPARTED:
    case "DEPARTED":
      return "border-l-gray-500";
    case FlightStatus.ARRIVED:
    case "ARRIVED":
      return "border-l-teal-500";
    case "EN_ROUTE":
      return "border-l-indigo-500";
    case FlightStatus.DELAYED:
    case "DELAYED":
      return "border-l-orange-500";
    case FlightStatus.CANCELED:
    case "CANCELED":
      return "border-l-red-500";
    case FlightStatus.DIVERTED:
    case "DIVERTED":
      return "border-l-purple-500";
    case "CHECK_IN_OPEN":
      return "border-l-sky-500";
    case "CHECK_IN_CLOSED":
      return "border-l-sky-700";
    default:
      return "border-l-secondary-500";
  }
};

// ===== Flight type badge (icon + bg/text) =====
export const getTypeStyle = (type: FlightType) => {
  switch (type) {
    case FlightType.COMMERCIAL:
      return {
        icon: MdFlight,
        bg: "bg-secondary-50",
        text: "text-secondary-700",
        label: "Commercial",
      };
    case FlightType.CHARTER:
      return {
        icon: MdGroups,
        bg: "bg-purple-50",
        text: "text-purple-700",
        label: "Charter",
      };
    case FlightType.CARGO:
      return {
        icon: MdLocalShipping,
        bg: "bg-amber-50",
        text: "text-amber-700",
        label: "CGO",
      };
    case FlightType.PRIVATE:
      return {
        icon: MdPerson,
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        label: "Private",
      };
    case FlightType.VIP:
      return {
        icon: MdWorkspacePremium,
        bg: "bg-rose-50",
        text: "text-rose-700",
        label: "VIP",
      };
    default:
      return {
        icon: MdFlight,
        bg: "bg-secondary-50",
        text: "text-secondary-700",
        label: "N/A",
      };
  }
};
