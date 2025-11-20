import { differenceInMinutes, isAfter, isBefore } from "date-fns";
import type { DisplayStatusCode, IFlight } from "@/types/flight";
import type { Lang } from "@/types/language";
import { labelsByCode } from "@/data/flight";

// Home airport code for Bokeo International Airport
const HOME_AIRPORT = "BOR";

// Timezone offset for Laos (UTC+7)
const TZ_OFFSET = "+07:00";

// =============================================================================
// CONFIGURABLE TIME THRESHOLDS (in minutes)
// =============================================================================

// Show "Boarding" status starting this many minutes before scheduled departure
const BOARDING_WINDOW_MIN = 40;

// Show "Final Call" status within this many minutes before scheduled departure
const FINAL_CALL_WINDOW_MIN = 15;

// Show "Gate Closed" status within this many minutes before scheduled departure
const GATE_CLOSED_MIN = 10;

// Minimal buffer before auto-finalizing (1-5 minutes recommended)
// After this time past scheduled, flight will show as DEPARTED/ARRIVED
// Example: If set to 2, flight at 16:40 will show DEPARTED at 16:42
const AUTO_FINALIZE_THRESHOLD_MIN = 2;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Normalizes time string to "HH:mm:ss" format
 * Accepts "HH:mm:ss" or "HH:mm" and returns "HH:mm:ss"
 */
function normalizeToHHmmss(time: string): string {
  if (!time) return "00:00:00";
  if (time.length === 5) return `${time}:00`;
  return time;
}

/**
 * Converts date and time strings to a Date object with timezone
 */
function toLocal(dateISO: string, time: string, tz = TZ_OFFSET): Date {
  return new Date(`${dateISO}T${normalizeToHHmmss(time)}${tz}`);
}

/**
 * Gets the start of operation day (00:00:00)
 */
function startOfOpDay(dateISO: string, tz = TZ_OFFSET): Date {
  return new Date(`${dateISO}T00:00:00${tz}`);
}

/**
 * Gets the end of operation day (23:59:59)
 */
function endOfOpDay(dateISO: string, tz = TZ_OFFSET): Date {
  return new Date(`${dateISO}T23:59:59${tz}`);
}

/**
 * Checks if the flight is departing from home airport (BOR)
 * Returns true for departures, false for arrivals
 */
function isDepartureFromHome(flight: IFlight): boolean {
  const originCode = flight.route?.origin?.code;
  return originCode === HOME_AIRPORT;
}

/**
 * Wraps status code with multilingual labels
 */
function withLabels(code: DisplayStatusCode): {
  code: DisplayStatusCode;
  labels: { en: string; lo: string; zh: string };
} {
  return { code, labels: labelsByCode[code] };
}

/**
 * Checks if a date is in the past or equal to now
 */
function isPastOrNow(date: Date, now: Date): boolean {
  return !isAfter(date, now);
}

/**
 * Safely parses time string to Date, returns null if empty or invalid
 */
function parseTimeOrNull(
  dateISO: string,
  time: string | null | undefined,
): Date | null {
  if (!time || time.trim() === "") return null;
  return toLocal(dateISO, time);
}

// =============================================================================
// MAIN FUNCTION
// =============================================================================

/**
 * Determines the display status for a flight based on current time and flight data.
 *
 * This function provides real-time status information for airport displays.
 * Status changes immediately when scheduled time passes (with minimal 2-minute buffer).
 *
 * Priority order:
 * 1. Hard system statuses (CANCELED, DIVERTED, etc.)
 * 2. Future operation day → SCHEDULED
 * 3. Past operation day → Auto-finalize
 * 4. Actual times (if recorded and past)
 * 5. Real-time auto-finalize (2 min after scheduled time)
 * 6. Departure-side UX (check-in, boarding phases)
 * 7. Arrival-side UX (en-route, scheduled)
 *
 * @param flight - The flight object containing schedule and status data
 * @param realNow - Current time (defaults to now, can be overridden for testing)
 * @returns Object with status code and multilingual labels
 */
export function getFlightDisplayStatus(
  flight: IFlight,
  realNow: Date = new Date(),
): { code: DisplayStatusCode; labels: { en: string; lo: string; zh: string } } {
  // =========================================================================
  // STEP 1: Check hard system statuses (highest priority)
  // These are set by admin/system and always take precedence
  // =========================================================================
  switch (flight.status) {
    case "CANCELED":
      return withLabels("CANCELED");
    case "DIVERTED":
      return withLabels("DIVERTED");
    case "DEPARTED":
      return withLabels("DEPARTED");
    case "ARRIVED":
      return withLabels("ARRIVED");
    case "BOARDING":
      return withLabels("BOARDING");
    case "DELAYED":
      return withLabels("DELAYED");
  }

  // =========================================================================
  // STEP 2: Parse and prepare time data
  // =========================================================================
  const opStart = startOfOpDay(flight.operationDate);
  const opEnd = endOfOpDay(flight.operationDate);
  const isDeparture = isDepartureFromHome(flight);

  // Scheduled times
  const scheduledDep = toLocal(flight.operationDate, flight.scheduledDepTime);
  const scheduledArr = toLocal(flight.operationDate, flight.scheduledArrTime);

  // Actual times (null if not recorded or not yet occurred)
  const actualDepRaw = parseTimeOrNull(
    flight.operationDate,
    flight.actualDepTime,
  );
  const actualArrRaw = parseTimeOrNull(
    flight.operationDate,
    flight.actualArrTime,
  );

  // Only consider actuals as final if they exist AND are in the past
  const actualDep =
    actualDepRaw && isPastOrNow(actualDepRaw, realNow) ? actualDepRaw : null;
  const actualArr =
    actualArrRaw && isPastOrNow(actualArrRaw, realNow) ? actualArrRaw : null;

  // Check-in times
  const checkInOpen = parseTimeOrNull(
    flight.operationDate,
    flight.checkInStartTime,
  );
  const checkInClose = parseTimeOrNull(
    flight.operationDate,
    flight.checkInEndTime,
  );

  // =========================================================================
  // STEP 3: Handle future operation day
  // If the flight date hasn't started yet, show SCHEDULED
  // =========================================================================
  if (isBefore(realNow, opStart)) {
    return withLabels("SCHEDULED");
  }

  // =========================================================================
  // STEP 4: Handle past operation day
  // Auto-finalize flights from previous days that weren't properly closed
  // =========================================================================
  if (isAfter(realNow, opEnd)) {
    // If still SCHEDULED with no actuals, auto-finalize based on direction
    if (flight.status === "SCHEDULED" && !actualDep && !actualArr) {
      return withLabels(isDeparture ? "DEPARTED" : "ARRIVED");
    }
    // If actuals exist, use them
    if (isDeparture && actualDep) return withLabels("DEPARTED");
    if (!isDeparture && actualArr) return withLabels("ARRIVED");
  }

  // =========================================================================
  // STEP 5: Handle actual times for today
  // If actual departure/arrival time has passed, show final status
  // =========================================================================
  if (isDeparture && actualDep) return withLabels("DEPARTED");
  if (!isDeparture && actualArr) return withLabels("ARRIVED");

  // =========================================================================
  // STEP 6: Real-time auto-finalize
  // Show DEPARTED/ARRIVED immediately after scheduled time + minimal buffer
  // Example: If departure is 16:40, show DEPARTED at 16:42
  // =========================================================================
  if (isDeparture) {
    const minutesPastDep = differenceInMinutes(realNow, scheduledDep);
    if (minutesPastDep >= AUTO_FINALIZE_THRESHOLD_MIN) {
      return withLabels("DEPARTED");
    }
  } else {
    const minutesPastArr = differenceInMinutes(realNow, scheduledArr);
    if (minutesPastArr >= AUTO_FINALIZE_THRESHOLD_MIN) {
      return withLabels("ARRIVED");
    }
  }

  // =========================================================================
  // STEP 7: Departure-side UX (when BOR is origin)
  // Show progressive statuses: Check-in → Boarding → Final Call → Gate Closed
  // =========================================================================
  if (isDeparture) {
    const minutesToDep = differenceInMinutes(scheduledDep, realNow);

    // More than 40 minutes before departure
    if (minutesToDep > BOARDING_WINDOW_MIN) {
      // Check if we're in the check-in window
      if (checkInOpen && checkInClose) {
        if (isAfter(realNow, checkInOpen) && isBefore(realNow, checkInClose)) {
          return withLabels("CHECK_IN_OPEN");
        }
        if (isAfter(realNow, checkInClose)) {
          return withLabels("CHECK_IN_CLOSED");
        }
      }
      return withLabels("ON_TIME");
    }

    // 15-40 minutes before departure: Boarding
    if (minutesToDep > FINAL_CALL_WINDOW_MIN) {
      return withLabels("BOARDING");
    }

    // 10-15 minutes before departure: Final Call
    if (minutesToDep > GATE_CLOSED_MIN) {
      return withLabels("FINAL_CALL");
    }

    // 0-10 minutes before departure: Gate Closed
    if (minutesToDep > 0) {
      return withLabels("GATE_CLOSED");
    }

    // 0-2 minutes past departure: Still show Gate Closed (buffer period)
    return withLabels("GATE_CLOSED");
  }

  // =========================================================================
  // STEP 8: Arrival-side UX (when BOR is destination)
  // =========================================================================

  // Flight has departed but not yet arrived, and before scheduled arrival
  if (actualDep && !actualArr && isBefore(realNow, scheduledArr)) {
    return withLabels("EN_ROUTE");
  }

  // Flight hasn't departed yet and before scheduled arrival
  if (!actualDep && isBefore(realNow, scheduledArr)) {
    return withLabels("SCHEDULED");
  }

  // =========================================================================
  // STEP 9: Fallback
  // =========================================================================
  return withLabels("SCHEDULED");
}

// =============================================================================
// CONVENIENCE FUNCTION
// =============================================================================

/**
 * Gets the localized status label for a flight
 *
 * @param flight - The flight object
 * @param lang - Language code ('en', 'lo', or 'zh')
 * @param now - Optional current time for testing
 * @returns Localized status label string
 */
export function getFlightStatusLabel(
  flight: IFlight,
  lang: Lang,
  now?: Date,
): string {
  const { labels } = getFlightDisplayStatus(flight, now);
  return labels[lang] ?? labels.en;
}
