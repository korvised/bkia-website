import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { LuX } from "react-icons/lu";
import { Input } from "@/components/ui";
import { cn } from "@/lib";
import { Terminal } from "@/types";
import { alertService } from "@/services/alert.service";
import {
  useAddCounterMutation,
  useUpdateCounterMutation,
} from "@/features/counter/api";
import type { ICounter, ICounterForm } from "@/features/counter/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

const TERMINAL_OPTIONS = [
  { value: Terminal.INT, label: "Terminal A — International" },
  { value: Terminal.DOM, label: "Terminal B — Domestic" },
];

const emptyForm = (): ICounterForm => ({
  terminal: Terminal.INT,
  name: "",
  isActive: true,
});

// ─── Props ───────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editCounter?: ICounter | null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function CounterModal({ isOpen, onClose, editCounter }: Props) {
  const [form, setForm] = useState<ICounterForm>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = !!editCounter;

  const [addCounter, { isLoading: isAdding }] = useAddCounterMutation();
  const [updateCounter, { isLoading: isUpdating }] = useUpdateCounterMutation();
  const isLoading = isAdding || isUpdating;

  // Re-populate on open/edit change
  useEffect(() => {
    if (isOpen && editCounter) {
      setForm({
        terminal: editCounter.terminal,
        name: editCounter.name ?? "",
        isActive: editCounter.isActive ?? true,
      });
    } else if (isOpen && !editCounter) {
      setForm(emptyForm());
    }
    setErrors({});
  }, [isOpen, editCounter]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Counter name is required.";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: ICounterForm = {
      terminal: form.terminal,
      name: form.name.trim(),
      isActive: form.isActive,
    };

    try {
      if (isEdit && editCounter) {
        await updateCounter({ id: editCounter.id, body: payload }).unwrap();
        await alertService.success("Updated", "Counter updated successfully.");
      } else {
        await addCounter(payload).unwrap();
        await alertService.success("Created", "Counter created successfully.");
      }
      onClose();
    } catch {
      await alertService.error(
        isEdit
          ? "Failed to update counter. Please try again."
          : "Failed to create counter. Please try again.",
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
        <DialogPanel className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {isEdit ? "Edit Counter" : "Add Counter"}
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
            <div className="px-6 py-5 space-y-5">

              {/* Terminal */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Terminal <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {TERMINAL_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, terminal: opt.value }))}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors",
                        form.terminal === opt.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50",
                      )}
                    >
                      <span className="text-lg font-bold">{opt.value}</span>
                      <span className="text-xs font-normal opacity-75">
                        {opt.value === Terminal.INT ? "International" : "Domestic"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Counter Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Counter Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Check-in Counter 1"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
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
                  "Update Counter"
                ) : (
                  "Add Counter"
                )}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
