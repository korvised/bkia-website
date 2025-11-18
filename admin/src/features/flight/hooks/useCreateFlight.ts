import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { formatDate, getErrorMessage } from "@/lib/utils.ts";
import { FlightType, Terminal } from "@/types";
import { useBulkCreateFlightsMutation } from "@/features/flight/api";
import { useFetchAirlinesQuery } from "@/features/airline/api";
import { useFetchRoutesQuery } from "@/features/route/api";
import { useFetchCountersQuery } from "@/features/counter/api";
import { DEFAULT_FLIGHT_FORM_VALUES } from "@/features/flight/constants";
import type { IBulkCreateFlightPayload } from "@/features/flight/types";
import { createFlightSchema } from "@/features/flight/validations";

export const useCreateFlight = () => {
  const navigate = useNavigate();

  const [bulkCreate, { isLoading: isCreating }] =
    useBulkCreateFlightsMutation();

  const { data: airlinesData, isLoading: isLoadingAirlines } =
    useFetchAirlinesQuery();
  const { data: routes = [], isLoading: isLoadingRoutes } = useFetchRoutesQuery(
    {},
  );
  const { data: counters = [], isLoading: isLoadingCounters } =
    useFetchCountersQuery({});

  const airlines = useMemo(() => airlinesData?.data ?? [], [airlinesData]);

  const formik = useFormik({
    initialValues: DEFAULT_FLIGHT_FORM_VALUES,
    validationSchema: createFlightSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const payload: IBulkCreateFlightPayload = {
          flightNo: values.flightNo.trim().toUpperCase(),
          type: values.type as FlightType,
          terminal: values.terminal as Terminal,
          gate: values.gate?.trim() || null,
          operationDates: values.operationDates
            .map((date) => formatDate(date, "yyyy-MM-dd"))
            .filter((date) => date !== ""),
          scheduledDepTime: values.scheduledDepTime,
          scheduledArrTime: values.scheduledArrTime,
          actualDepTime: values.actualDepTime || null,
          actualArrTime: values.actualArrTime || null,
          checkInStartTime: values.checkInStartTime || null,
          checkInEndTime: values.checkInEndTime || null,
          status: values.status,
          remarks: values.remarks?.trim() || null,
          routeId: values.routeId,
          airlineId: values.airlineId,
          checkInCounterIds:
            values.direction === "departure" &&
            values.checkInCounterIds.length > 0
              ? values.checkInCounterIds
              : undefined,
        };

        await bulkCreate(payload).unwrap();
        navigate("/flights");
      } catch (error) {
        setFieldError("flightNo", getErrorMessage(error));
      }
    },
  });

  const handleCancel = useCallback(() => {
    navigate("/flights");
  }, [navigate]);

  return {
    formik,
    isCreating,
    airlines,
    routes,
    counters,
    isLoadingAirlines,
    isLoadingRoutes,
    isLoadingCounters,
    handleCancel,
  };
};
