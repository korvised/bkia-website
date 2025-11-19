import { LuArrowLeft, LuPlane, LuRotateCcw, LuSave } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { cn } from "@/lib";
import { useCreateFlight } from "../hooks";
import { FlightForm } from "../components";

export function FlightCreatePage() {
  const {
    formik,
    isCreating,
    airlines,
    routes,
    counters,
    isLoadingAirlines,
    isLoadingRoutes,
    isLoadingCounters,
    handleCancel,
  } = useCreateFlight();

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Flights", path: "/flights", icon: LuPlane },
          { label: "Create Flight" },
        ]}
      />

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
            <h1 className="text-2xl font-bold text-gray-900">Create Flight</h1>
            <p className="text-sm text-gray-500">Add new flight schedule</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => formik.resetForm()}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
          >
            <LuRotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            type="button"
            onClick={() => formik.handleSubmit()}
            disabled={isCreating}
            className={cn(
              "bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white",
              "hover:bg-primary-600 transition-colors",
              "focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {isCreating ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <LuSave className="h-4 w-4" />
            )}
            {isCreating ? "Creating..." : "Create Flight"}
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
      />
    </div>
  );
}
