import { differenceInMinutes, isAfter, isBefore } from "date-fns";
import type { DisplayStatusCode, IFlight } from "@/types/flight";
import type { Lang } from "@/types/language";
import { labelsByCode } from "@/data/flight";

const HOME_AIRPORT = "BOR";
const TZ_OFFSET = "+07:00";

// Tunables (minutes)
const BOARDING_WINDOW_MIN = 40; // show "Boarding" starting this many minutes before STD
const FINAL_CALL_WINDOW_MIN = 15; // "Final call" within this many minutes before STD
const GATE_CLOSED_MIN = 10; // "Gate closed" within this many minutes before STD
const DELAY_TOLERANCE_MIN = 15; // grace after STD/STA before "Delayed"
const AUTO_FINALIZE_THRESHOLD_MIN = 1; // auto-finalize as DEPARTED/ARRIVED after this many minutes past scheduled time

// ---------------- helpers ----------------

/** Accepts "HH:mm:ss" or "HH:mm" and returns "HH:mm:ss" */
function normalizeToHHmmss(time: string) {
  if (!time) return "00:00:00";
  if (time.length === 5) return `${time}:00`;
  return time; // assume already HH:mm:ss
}

function toLocal(dateISO: string, time: string, tz = TZ_OFFSET) {
  return new Date(`${dateISO}T${normalizeToHHmmss(time)}${tz}`);
}

function startOfOpDay(dateISO: string, tz = TZ_OFFSET) {
  return new Date(`${dateISO}T00:00:00${tz}`);
}

function endOfOpDay(dateISO: string, tz = TZ_OFFSET) {
  return new Date(`${dateISO}T23:59:59${tz}`);
}

function isDepartureFromHome(f: IFlight) {
  // Your data uses origin/destination; departures from BOR mean origin.code === BOR
  const depCode = f.route?.origin?.code ?? f.route?.origin?.code;
  return depCode === HOME_AIRPORT;
}

function withLabels(code: DisplayStatusCode) {
  return { code, labels: labelsByCode[code] };
}

const isPastOrNow = (d: Date, now: Date) => !isAfter(d, now);

// ---------------- core --------------------

export function getFlightDisplayStatus(
  flight: IFlight,
  realNow: Date = new Date(),
): { code: DisplayStatusCode; labels: { en: string; lo: string; zh: string } } {
  // 1) Always respect hard admin/system statuses first
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

  const opStart = startOfOpDay(flight.operationDate);
  const opEnd = endOfOpDay(flight.operationDate);
  const isDep = isDepartureFromHome(flight);

  // Build key times (accept "HH:mm:ss" or "HH:mm")
  const std = toLocal(flight.operationDate, flight.scheduledDepTime);
  const sta = toLocal(flight.operationDate, flight.scheduledArrTime);

  // Handle null actualDepTime and actualArrTime explicitly
  const atdRaw =
    flight.actualDepTime && flight.actualDepTime.trim() !== ""
      ? toLocal(flight.operationDate, flight.actualDepTime)
      : null;
  const ataRaw =
    flight.actualArrTime && flight.actualArrTime.trim() !== ""
      ? toLocal(flight.operationDate, flight.actualArrTime)
      : null;

  // Only treat actuals as final if they exist AND are in the past (or now)
  const atd = atdRaw && isPastOrNow(atdRaw, realNow) ? atdRaw : null;
  const ata = ataRaw && isPastOrNow(ataRaw, realNow) ? ataRaw : null;

  // Handle null check-in times explicitly
  const ckinOpen =
    flight.checkInStartTime && flight.checkInStartTime.trim() !== ""
      ? toLocal(flight.operationDate, flight.checkInStartTime)
      : null;
  const ckinClose =
    flight.checkInEndTime && flight.checkInEndTime.trim() !== ""
      ? toLocal(flight.operationDate, flight.checkInEndTime)
      : null;

  // 2) Future op day → default to SCHEDULED (unless admin overrides hit above)
  if (isBefore(realNow, opStart)) {
    return withLabels("SCHEDULED");
  }

  // 3) Past op day → if backend still SCHEDULED and no past actuals, auto-finalize
  if (isAfter(realNow, opEnd)) {
    if (flight.status === "SCHEDULED" && !atd && !ata) {
      return withLabels(isDep ? "DEPARTED" : "ARRIVED");
    }
    // If actuals exist (and in the past), prefer them:
    if (isDep && atd) return withLabels("DEPARTED");
    if (!isDep && ata) return withLabels("ARRIVED");
    // Otherwise, keep deriving below (shouldn't usually happen for past days)
  }

  // 4) Today (within op day): prefer actuals when present (and past)
  if (isDep && atd) return withLabels("DEPARTED");
  if (!isDep && ata) return withLabels("ARRIVED");

  // 4.5) Auto-finalize if significantly past scheduled time (no actuals recorded)
  // This prevents flights from showing as "DELAYED" indefinitely
  if (isDep) {
    const minsPastSTD = differenceInMinutes(realNow, std);
    if (minsPastSTD > AUTO_FINALIZE_THRESHOLD_MIN && !atd) {
      return withLabels("DEPARTED");
    }
  } else {
    const minsPastSTA = differenceInMinutes(realNow, sta);
    if (minsPastSTA > AUTO_FINALIZE_THRESHOLD_MIN && !ata) {
      return withLabels("ARRIVED");
    }
  }

  // 5) Delay detection (after scheduled + tolerance with no actual)
  // Only show DELAYED if within the delay window (between tolerance and auto-finalize threshold)
  if (isDep) {
    const minsPastSTD = differenceInMinutes(realNow, std);
    if (
      minsPastSTD > DELAY_TOLERANCE_MIN &&
      minsPastSTD <= AUTO_FINALIZE_THRESHOLD_MIN &&
      !atd
    ) {
      return withLabels("DELAYED");
    }
  } else {
    const minsPastSTA = differenceInMinutes(realNow, sta);
    if (
      minsPastSTA > DELAY_TOLERANCE_MIN &&
      minsPastSTA <= AUTO_FINALIZE_THRESHOLD_MIN &&
      !ata
    ) {
      return withLabels("DELAYED");
    }
  }

  // 6) Departure-side UX (only when BOR is origin)
  if (isDep) {
    // Boarding phases relative to STD (check this first for more granular status)
    const minsToSTD = differenceInMinutes(std, realNow); // >0 means in future

    // If we're far from departure (>40 min), check check-in status
    if (minsToSTD > BOARDING_WINDOW_MIN) {
      // Check-in window if provided
      if (ckinOpen && ckinClose) {
        if (isAfter(realNow, ckinOpen) && isBefore(realNow, ckinClose)) {
          return withLabels("CHECK_IN_OPEN");
        }
        if (isAfter(realNow, ckinClose)) {
          return withLabels("CHECK_IN_CLOSED");
        }
      }
      return withLabels("ON_TIME");
    }

    // Within boarding window (0-40 min before departure)
    if (minsToSTD > FINAL_CALL_WINDOW_MIN) return withLabels("BOARDING");
    if (minsToSTD > GATE_CLOSED_MIN) return withLabels("FINAL_CALL");
    if (minsToSTD > 0) return withLabels("GATE_CLOSED");

    // Reached or passed STD without actuals/delay/override
    // This shouldn't normally happen as steps 4.5 and 5 should catch it
    return withLabels("SCHEDULED");
  }

  // 7) Arrival-side UX (BOR is destination)
  if (atd && !ata && isBefore(realNow, sta)) return withLabels("EN_ROUTE");
  if (!atd && isBefore(realNow, sta)) return withLabels("SCHEDULED");

  // 8) Fallback
  return withLabels("SCHEDULED");
}

/** Convenience: get localized label directly */
export function getFlightStatusLabel(flight: IFlight, lang: Lang, now?: Date) {
  const { labels } = getFlightDisplayStatus(flight, now);
  return labels[lang] ?? labels.en;
}
