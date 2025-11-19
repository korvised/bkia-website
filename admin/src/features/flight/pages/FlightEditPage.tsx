import { useParams } from "react-router-dom";
import { LuArrowLeft, LuPlane, LuSave } from "react-icons/lu";
import { cn } from "@/lib";
import { useUpdateFlight } from "../hooks";
import { FlightForm } from "../components";
import { useMemo } from "react";
import { Breadcrumb } from "@/components/ui";

export function FlightEditPage() {
  const { id } = useParams<{ id: string }>();
  const {
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
  } = useUpdateFlight(id!);

  const breadcrumbs = useMemo(
    () => (
      <Breadcrumb
        items={[
          { label: "Flights", path: "/flights", icon: LuPlane },
          { label: flight?.flightNo || "...", path: `/flights/${id}` },
          { label: "Edit" },
        ]}
      />
    ),
    [flight?.flightNo, id],
  );

  if (isLoadingFlight || isLoadingRoutes) {
    return (
      <div className="space-y-6">
        {breadcrumbs}

        <div className="flex h-96 items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
            <span className="text-gray-500">Loading flight...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !flight) {
    return (
      <div className="space-y-6">
        {breadcrumbs}

        <div className="border-danger-200 bg-danger-50 rounded-lg border p-6 text-center">
          <p className="text-danger-700">
            Flight not found or an error occurred.
          </p>
          <button
            onClick={handleBack}
            className="text-primary mt-4 text-sm hover:underline"
          >
            Back to flights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {breadcrumbs}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
          >
            <LuArrowLeft className="h-5 w-5" />
          </button>
          <div className="bg-primary-100 rounded-lg p-2">
            <LuPlane className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Edit Flight {flight.flightNo}
            </h1>
            <p className="text-sm text-gray-500">
              {flight.route.origin.code} → {flight.route.destination.code}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => formik.handleSubmit()}
            disabled={isUpdating}
            className={cn(
              "bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white",
              "hover:bg-primary-600 transition-colors",
              "focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {isUpdating ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <LuSave className="h-4 w-4" />
            )}
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Form */}
      <FlightForm
        formik={formik}
        airlines={airlines}
        routes={routes}
        counters={counters}
        isLoadingAirlines={isLoadingAirlines}
        isLoadingRoutes={isLoadingRoutes}
        isLoadingCounters={isLoadingCounters}
        isEdit={true}
      />
    </div>
  );
}
