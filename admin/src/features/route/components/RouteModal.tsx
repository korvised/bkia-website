import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { LuArrowRight, LuX } from "react-icons/lu";
import { cn } from "@/lib";
import { Select } from "@/components/ui";
import { RouteType } from "@/types";
import { alertService } from "@/services/alert.service";
import { useFetchAirportsQuery } from "@/features/airport/api";
import { useAddRouteMutation, useUpdateRouteMutation } from "@/features/route/api";
import type { IRoute, IRouteForm } from "@/features/route/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

const ROUTE_TYPE_OPTIONS = [
  { value: RouteType.INT, label: "International" },
  { value: RouteType.DOM, label: "Domestic" },
];

const emptyForm = (): Omit<IRouteForm, "isActive"> & { isActive: boolean } => ({
  routeType: RouteType.INT,
  durationMin: 60,
  originId: "",
  destinationId: "",
  isActive: true,
});

// ─── Props ───────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editRoute?: IRoute | null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function RouteModal({ isOpen, onClose, editRoute }: Props) {
  const [form, setForm] = useState<IRouteForm>(emptyForm());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = !!editRoute;

  const { data: airports = [] } = useFetchAirportsQuery({});
  const [addRoute, { isLoading: isAdding }] = useAddRouteMutation();
  const [updateRoute, { isLoading: isUpdating }] = useUpdateRouteMutation();
  const isLoading = isAdding || isUpdating;

  const airportOptions = airports.map((a) => ({
    value: a.id,
    label: `${a.code} — ${a.name}`,
  }));

  // Re-populate on open/edit change
  useEffect(() => {
    if (isOpen && editRoute) {
      setForm({
        routeType: editRoute.routeType,
        durationMin: editRoute.durationMin,
        originId: editRoute.origin?.id ?? "",
        destinationId: editRoute.destination?.id ?? "",
        isActive: editRoute.isActive,
      });
    } else if (isOpen && !editRoute) {
      setForm(emptyForm());
    }
    setErrors({});
  }, [isOpen, editRoute]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.originId) errs.originId = "Origin airport is required.";
    if (!form.destinationId) errs.destinationId = "Destination airport is required.";
    if (form.originId && form.destinationId && form.originId === form.destinationId)
      errs.destinationId = "Origin and destination must be different airports.";
    if (!form.durationMin || form.durationMin < 1)
      errs.durationMin = "Duration must be at least 1 minute.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEdit && editRoute) {
        await updateRoute({ id: editRoute.id, body: form }).unwrap();
        await alertService.success("Updated", "Route updated successfully.");
      } else {
        const { isActive: _omit, ...createPayload } = form;
        await addRoute(createPayload).unwrap();
        await alertService.success("Created", "Route created successfully.");
      }
      onClose();
    } catch {
      await alertService.error(
        isEdit
          ? "Failed to update route. Please try again."
          : "Failed to create route. Please try again.",
      );
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {isEdit ? "Edit Route" : "Add Route"}
            </DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <LuX className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-5">

              {/* Route Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Route Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {ROUTE_TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, routeType: opt.value }))}
                      className={cn(
                        "rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors",
                        form.routeType === opt.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Origin → Destination */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Route <span className="text-red-500">*</span>
                </label>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs text-gray-500">Origin</label>
                    <Select
                      placeholder="Select airport"
                      value={form.originId}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, originId: value }))
                      }
                      options={airportOptions}
                      error={errors.originId}
                    />
                  </div>

                  <div className="mt-7 shrink-0 text-gray-400">
                    <LuArrowRight className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <label className="mb-1 block text-xs text-gray-500">Destination</label>
                    <Select
                      placeholder="Select airport"
                      value={form.destinationId}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, destinationId: value }))
                      }
                      options={airportOptions}
                      error={errors.destinationId}
                    />
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Duration (minutes) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={form.durationMin}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        durationMin: Number(e.target.value),
                      }))
                    }
                    className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {form.durationMin > 0 && (
                    <span className="text-sm text-gray-500">
                      ≈{" "}
                      {form.durationMin >= 60
                        ? `${Math.floor(form.durationMin / 60)}h ${String(form.durationMin % 60).padStart(2, "0")}m`
                        : `${form.durationMin}m`}
                    </span>
                  )}
                </div>
                {errors.durationMin && (
                  <p className="mt-1 text-xs text-red-500">{errors.durationMin}</p>
                )}
              </div>

              {/* isActive (edit only) */}
              {isEdit && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={form.isActive}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, isActive: !prev.isActive }))
                    }
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      form.isActive ? "bg-primary" : "bg-gray-300",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
                        form.isActive ? "translate-x-6" : "translate-x-1",
                      )}
                    />
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    {form.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors",
                  isLoading
                    ? "cursor-not-allowed bg-primary/60"
                    : "bg-primary hover:bg-primary-600",
                )}
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : isEdit ? (
                  "Update Route"
                ) : (
                  "Add Route"
                )}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
