/**
 * Calculate arrival time based on departure time and flight duration
 *
 * @param scheduledDepTime - Format: "HH:mm"
 * @param durationMin - Flight duration in minutes
 * @returns Arrival time in "HH:mm" format
 */
export function calculateArrivalTime(
  scheduledDepTime: string,
  durationMin: number,
): string {
  if (!scheduledDepTime || !durationMin || durationMin <= 0) {
    return "";
  }

  const [hours, minutes] = scheduledDepTime.split(":").map(Number);
  const depTimeInMinutes = hours * 60 + minutes;

  let arrTimeInMinutes = depTimeInMinutes + durationMin;

  // Handle day wraparound (if time exceeds 24 hours)
  arrTimeInMinutes = arrTimeInMinutes % (24 * 60);

  const h = Math.floor(arrTimeInMinutes / 60);
  const m = arrTimeInMinutes % 60;

  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}
