import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { formatTime, getErrorMessage } from "@/lib/utils.ts";
import {
  useFetchFlightByIdQuery,
  useUpdateFlightMutation,
} from "@/features/flight/api";
import { useFetchAirlinesQuery } from "@/features/airline/api";
import { useFetchRoutesQuery } from "@/features/route/api";
import { useFetchCountersQuery } from "@/features/counter/api";
import { FlightType, RouteType, Terminal } from "@/types";
import { updateFlightSchema } from "@/features/flight/validations";
import {
  AIRPORT_CODE,
  DEFAULT_FLIGHT_FORM_VALUES,
} from "@/features/flight/constants";
import type {
  FlightDirection,
  ICreateFlightForm,
  IUpdateFlightPayload,
} from "@/features/flight/types";

export const useUpdateFlight = (id: string) => {
  const navigate = useNavigate();

  const {
    data: flight,
    isLoading: isLoadingFlight,
    isError,
  } = useFetchFlightByIdQuery(id, { skip: !id });

  const [updateFlight, { isLoading: isUpdating }] = useUpdateFlightMutation();

  const { data: airlinesData, isLoading: isLoadingAirlines } =
    useFetchAirlinesQuery();
  const { data: routes = [], isLoading: isLoadingRoutes } = useFetchRoutesQuery(
    {},
  );
  const { data: counters = [], isLoading: isLoadingCounters } =
    useFetchCountersQuery({});

  const airlines = useMemo(() => airlinesData?.data ?? [], [airlinesData]);

  const getDirection = useCallback(
    (routeId: string): FlightDirection => {
      const route = routes.find((r) => r.id === routeId);
      if (!route) return "";
      if (route.origin.code === AIRPORT_CODE) return "departure";
      if (route.destination.code === AIRPORT_CODE) return "arrival";
      return "";
    },
    [routes],
  );

  const getRouteType = useCallback(
    (routeId: string): RouteType | "" => {
      const route = routes.find((r) => r.id === routeId);
      return route?.routeType ?? "";
    },
    [routes],
  );

  // Build initialValues from flight
  const initialValues = useMemo<ICreateFlightForm>(() => {
    if (!flight) return DEFAULT_FLIGHT_FORM_VALUES;

    const direction = getDirection(flight.route.id);
    const routeType = getRouteType(flight.route.id);

    return {
      flightNo: flight.flightNo,
      type: flight.type,
      terminal: flight.terminal,
      gate: flight.gate ?? "",
      operationDates: [new Date(flight.operationDate)],
      scheduledDepTime: formatTime(flight.scheduledDepTime),
      scheduledArrTime: formatTime(flight.scheduledArrTime),
      actualDepTime: flight.actualDepTime
        ? formatTime(flight.actualDepTime)
        : "",
      actualArrTime: flight.actualArrTime
        ? formatTime(flight.actualArrTime)
        : "",
      checkInStartTime: flight.checkInStartTime
        ? formatTime(flight.checkInStartTime)
        : "",
      checkInEndTime: flight.checkInEndTime
        ? formatTime(flight.checkInEndTime)
        : "",
      status: flight.status,
      remarks: flight.remarks ?? "",
      routeId: flight.route.id,
      airlineId: flight.airline.id,
      checkInCounterIds: flight.checkInCounters?.map((c) => c.id) ?? [],
      direction,
      routeType,
    };
  }, [flight, getDirection, getRouteType]);

  const formik = useFormik<ICreateFlightForm>({
    initialValues,
    validationSchema: updateFlightSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: async (values, { setFieldError }) => {
      try {
        // Check if it's a departure flight based on route
        const selectedRoute = routes.find((r) => r.id === values.routeId);
        const isDeparture = selectedRoute?.origin.code === AIRPORT_CODE;

        const payload: IUpdateFlightPayload = {
          flightNo: values.flightNo.trim().toUpperCase(),
          type: values.type as FlightType,
          terminal: values.terminal as Terminal,
          gate: values.gate?.trim() || null,
          operationDate:
            values.operationDates[0]?.toISOString().split("T")[0] ?? "",
          scheduledDepTime: values.scheduledDepTime,
          scheduledArrTime: values.scheduledArrTime,
          actualDepTime: values.actualDepTime || null,
          actualArrTime: values.actualArrTime || null,
          // Only include check-in fields for departure flights
          checkInStartTime: isDeparture
            ? values.checkInStartTime || null
            : null,
          checkInEndTime: isDeparture ? values.checkInEndTime || null : null,
          status: values.status,
          remarks: values.remarks?.trim() || null,
          routeId: values.routeId,
          airlineId: values.airlineId,
          // Only include check-in counters for departure flights
          checkInCounterIds:
            isDeparture && values.checkInCounterIds.length > 0
              ? values.checkInCounterIds
              : undefined,
        };

        await updateFlight({ id, body: payload }).unwrap();
        navigate(`/flights/${id}`);
      } catch (error) {
        setFieldError("flightNo", getErrorMessage(error));
      }
    },
  });

  const handleCancel = useCallback(() => {
    navigate(`/flights/${id}`);
  }, [navigate, id]);

  const handleBack = useCallback(() => {
    navigate("/flights");
  }, [navigate]);

  return {
    formik,
    flight,
    isLoadingFlight,
    isUpdating,
    isError,
    airlines,
    routes,
    counters,
    isLoadingAirlines,
    isLoadingRoutes,
    isLoadingCounters,
    handleCancel,
    handleBack,
  };
};
