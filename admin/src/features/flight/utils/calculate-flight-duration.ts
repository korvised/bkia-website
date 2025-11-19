import type { IFlight } from "@/features/flight/types";

interface FlightDuration {
  minutes: number;
  formatted: string;
}

export const calculateFlightDuration = (
  flight?: IFlight | null,
): FlightDuration => {
  if (!flight) return { minutes: 0, formatted: "0m" };

  const depTime = flight.actualDepTime || flight.scheduledDepTime;
  const arrTime = flight.actualArrTime || flight.scheduledArrTime;

  if (!depTime || !arrTime) {
    const mins = flight.route.durationMin;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;

    return {
      minutes: mins,
      formatted:
        mins >= 60
          ? remainingMins > 0
            ? `${hours}h ${remainingMins}m`
            : `${hours}h`
          : `${mins}m`,
    };
  }

  const [depHours, depMinutes] = depTime.split(":").map(Number);
  const [arrHours, arrMinutes] = arrTime.split(":").map(Number);

  const depTotalMinutes = depHours * 60 + depMinutes;
  let arrTotalMinutes = arrHours * 60 + arrMinutes;

  // Handle overnight flights
  if (arrTotalMinutes < depTotalMinutes) {
    arrTotalMinutes += 24 * 60;
  }

  const mins = arrTotalMinutes - depTotalMinutes;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  return {
    minutes: mins,
    formatted:
      mins >= 60
        ? remainingMins > 0
          ? `${hours}h ${remainingMins}m`
          : `${hours}h`
        : `${mins}m`,
  };
};
