import * as Yup from "yup";
import { FlightStatus, FlightType, Terminal, RouteType } from "@/types";

const TIME_HH_MM = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export const createFlightSchema = Yup.object().shape({
  flightNo: Yup.string()
    .required("Flight number is required")
    .min(1, "Flight number is required")
    .max(20, "Flight number must be at most 20 characters"),

  type: Yup.string()
    .required("Flight type is required")
    .oneOf(Object.values(FlightType), "Invalid flight type"),

  terminal: Yup.string()
    .required("Terminal is required")
    .oneOf(Object.values(Terminal), "Invalid terminal"),

  gate: Yup.string().nullable().max(5, "Gate must be at most 5 characters"),

  operationDates: Yup.array()
    .of(Yup.date())
    .min(1, "At least one operation date is required")
    .required("Operation dates are required"),

  scheduledDepTime: Yup.string()
    .required("Scheduled departure time is required")
    .matches(TIME_HH_MM, "Must be in HH:mm format"),

  scheduledArrTime: Yup.string()
    .required("Scheduled arrival time is required")
    .matches(TIME_HH_MM, "Must be in HH:mm format"),

  actualDepTime: Yup.string()
    .nullable()
    .test("valid-time", "Must be in HH:mm format", (value) => {
      if (!value || value === "") return true;
      return TIME_HH_MM.test(value);
    }),

  actualArrTime: Yup.string()
    .nullable()
    .test("valid-time", "Must be in HH:mm format", (value) => {
      if (!value || value === "") return true;
      return TIME_HH_MM.test(value);
    }),

  checkInStartTime: Yup.string()
    .nullable()
    .test("valid-time", "Must be in HH:mm format", (value) => {
      if (!value || value === "") return true;
      return TIME_HH_MM.test(value);
    }),

  checkInEndTime: Yup.string()
    .nullable()
    .test("valid-time", "Must be in HH:mm format", (value) => {
      if (!value || value === "") return true;
      return TIME_HH_MM.test(value);
    }),

  status: Yup.string()
    .required("Status is required")
    .oneOf(Object.values(FlightStatus), "Invalid status"),

  remarks: Yup.string()
    .nullable()
    .max(255, "Remarks must be at most 255 characters"),

  routeId: Yup.string().required("Route is required").uuid("Invalid route"),

  airlineId: Yup.string()
    .required("Airline is required")
    .uuid("Invalid airline"),

  checkInCounterIds: Yup.array().of(Yup.string().uuid("Invalid counter ID")),

  // Form-only fields (not sent to API)
  direction: Yup.string().oneOf(
    ["departure", "arrival", ""],
    "Invalid direction",
  ),

  routeType: Yup.string()
    .nullable()
    .oneOf([...Object.values(RouteType), ""], "Invalid route type"),
});

export type CreateFlightFormValues = Yup.InferType<typeof createFlightSchema>;
