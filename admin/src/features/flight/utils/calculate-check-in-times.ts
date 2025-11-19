import { RouteType } from "@/types";

interface CheckInTimes {
  checkInStartTime: string;
  checkInEndTime: string;
}

/**
 * Calculate check-in times based on scheduled departure and route type
 *
 * Check-in counter opening times:
 * - Domestic flights: 2 hours before departure
 * - International flights: 2.5 hours before departure
 *
 * Check-in counter closing times:
 * - Domestic flights: 30 minutes before departure
 * - International flights: 40 minutes before departure
 *
 * @param scheduledDepTime - Format: "HH:mm"
 * @param routeType - DOM (domestic) or INT (international)
 * @returns { checkInStartTime, checkInEndTime } in "HH:mm" format
 */
export function calculateCheckInTimes(
  scheduledDepTime: string,
  routeType: RouteType | "",
): CheckInTimes {
  if (!scheduledDepTime || !routeType) {
    return { checkInStartTime: "", checkInEndTime: "" };
  }

  const [hours, minutes] = scheduledDepTime.split(":").map(Number);
  const depTimeInMinutes = hours * 60 + minutes;

  // Check-in opening: 2h before (DOM) or 2.5h before (INT)
  const openingOffsetMinutes = routeType === RouteType.DOM ? 120 : 150;
  // Check-in closing: 30min before (DOM) or 40min before (INT)
  const closingOffsetMinutes = routeType === RouteType.DOM ? 30 : 40;

  let startMinutes = depTimeInMinutes - openingOffsetMinutes;
  let endMinutes = depTimeInMinutes - closingOffsetMinutes;

  // Handle day wraparound (if time goes negative, wrap to previous day)
  if (startMinutes < 0) startMinutes += 24 * 60;
  if (endMinutes < 0) endMinutes += 24 * 60;

  const formatTime = (totalMinutes: number): string => {
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  return {
    checkInStartTime: formatTime(startMinutes),
    checkInEndTime: formatTime(endMinutes),
  };
}
