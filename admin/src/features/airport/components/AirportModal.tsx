import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { LuX } from "react-icons/lu";
import { Input } from "@/components/ui";
import { cn } from "@/lib";
import { alertService } from "@/services/alert.service";
import {
  useAddAirportMutation,
  useUpdateAirportMutation,
} from "@/features/airport/api";
import type { IAirport, IAirportForm } from "@/features/airport/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

const LANG_TABS = [
  { key: "en" as const, label: "EN" },
  { key: "lo" as const, label: "ລາວ" },
  { key: "zh" as const, label: "中文" },
];

const emptyForm = (): IAirportForm => ({
  code: "",
  name: "",
  names: { en: "", lo: "", zh: "" },
  isActive: true,
});

// ─── Props ───────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editAirport?: IAirport | null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AirportModal({ isOpen, onClose, editAirport }: Props) {
  const [form, setForm] = useState<IAirportForm>(emptyForm);
  const [nameLang, setNameLang] = useState<"en" | "lo" | "zh">("en");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = !!editAirport;

  const [addAirport, { isLoading: isAdding }] = useAddAirportMutation();
  const [updateAirport, { isLoading: isUpdating }] = useUpdateAirportMutation();
  const isLoading = isAdding || isUpdating;

  // Re-populate on open/edit change
  useEffect(() => {
    if (isOpen && editAirport) {
      setForm({
        code: editAirport.code ?? "",
        name: editAirport.name ?? "",
        names: {
          en: editAirport.names?.en ?? "",
          lo: editAirport.names?.lo ?? "",
          zh: editAirport.names?.zh ?? "",
        },
        isActive: editAirport.isActive ?? true,
      });
    } else if (isOpen && !editAirport) {
      setForm(emptyForm());
    }
    setErrors({});
  }, [isOpen, editAirport]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.code.trim()) errs.code = "Code is required.";
    else if (form.code.trim().length < 2) errs.code = "Code must be at least 2 characters.";
    if (!form.name.trim()) errs.name = "Name is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: IAirportForm = {
      code: form.code.toUpperCase().trim(),
      name: form.name.trim(),
      names: form.names,
      isActive: form.isActive,
    };

    try {
      if (isEdit && editAirport) {
        await updateAirport({ id: editAirport.id, body: payload }).unwrap();
        await alertService.success("Updated", "Airport updated successfully.");
      } else {
        await addAirport(payload).unwrap();
        await alertService.success("Created", "Airport created successfully.");
      }
      onClose();
    } catch {
      await alertService.error(
        isEdit
          ? "Failed to update airport. Please try again."
          : "Failed to create airport. Please try again.",
      );
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {isEdit ? "Edit Airport" : "Add Airport"}
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

              {/* Code + Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Code <span className="text-red-500">*</span>
                    <span className="ml-1 font-normal text-gray-400">(2–10 chars)</span>
                  </label>
                  <Input
                    placeholder="e.g. VTE"
                    value={form.code}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        code: e.target.value.toUpperCase().slice(0, 10),
                      }))
                    }
                    className="font-mono uppercase"
                  />
                  {errors.code && (
                    <p className="mt-1 text-xs text-red-500">{errors.code}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                    <span className="ml-1 font-normal text-gray-400">(fallback)</span>
                  </label>
                  <Input
                    placeholder="e.g. Wattay International"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
              </div>

              {/* Multilingual Names */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Localized Name{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  {/* Lang Tabs */}
                  <div className="flex border-b border-gray-100 bg-gray-50">
                    {LANG_TABS.map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setNameLang(tab.key)}
                        className={cn(
                          "flex-1 py-2 text-xs font-medium transition-colors",
                          nameLang === tab.key
                            ? "bg-white text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700",
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div className="p-3">
                    <Input
                      placeholder={`Airport name in ${LANG_TABS.find((t) => t.key === nameLang)?.label}...`}
                      value={form.names[nameLang]}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          names: { ...prev.names, [nameLang]: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* isActive */}
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
                  "Update Airport"
                ) : (
                  "Add Airport"
                )}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
