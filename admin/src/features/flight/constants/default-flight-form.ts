import { FlightStatus } from "@/types";
import type { ICreateFlightForm } from "@/features/flight/types";

export const DEFAULT_FLIGHT_FORM_VALUES: ICreateFlightForm = {
  flightNo: "",
  type: "",
  terminal: "",
  gate: "",
  operationDates: [],
  scheduledDepTime: "",
  scheduledArrTime: "",
  actualDepTime: "",
  actualArrTime: "",
  checkInStartTime: "",
  checkInEndTime: "",
  status: FlightStatus.SCHEDULED,
  remarks: "",
  routeId: "",
  airlineId: "",
  checkInCounterIds: [],
  direction: "",
  routeType: "",
};
