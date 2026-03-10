import { useEffect, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { LuImage, LuX } from "react-icons/lu";
import { Input } from "@/components/ui";
import { asset, cn } from "@/lib";
import { alertService } from "@/services/alert.service";
import {
  useAddAirlineMutation,
  useUpdateAirlineMutation,
} from "@/features/airline/api";
import type { IAirline, IAirlineForm } from "@/features/airline/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

const LANG_TABS = [
  { key: "en" as const, label: "EN" },
  { key: "lo" as const, label: "ລາວ" },
  { key: "zh" as const, label: "中文" },
];

const emptyForm = (): IAirlineForm => ({
  code: "",
  name: "",
  names: { en: "", lo: "", zh: "" },
  logoFile: null,
  removeLogo: false,
  hotline: "",
  phone: "",
  website: "",
  isActive: true,
});

function buildFormData(form: IAirlineForm): FormData {
  const fd = new FormData();
  fd.append("code", form.code.toUpperCase().trim());
  fd.append("name", form.name.trim());

  const hasNames = form.names.en || form.names.lo || form.names.zh;
  if (hasNames) fd.append("names", JSON.stringify(form.names));

  if (form.hotline.trim()) fd.append("hotline", form.hotline.trim());
  if (form.phone.trim()) fd.append("phone", form.phone.trim());
  if (form.website.trim()) fd.append("website", form.website.trim());
  fd.append("isActive", String(form.isActive));

  if (form.logoFile) fd.append("logo", form.logoFile);
  if (form.removeLogo) fd.append("removeLogo", "true");

  return fd;
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editAirline?: IAirline | null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AirlineModal({ isOpen, onClose, editAirline }: Props) {
  const [form, setForm] = useState<IAirlineForm>(emptyForm);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [nameLang, setNameLang] = useState<"en" | "lo" | "zh">("en");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const langFont = nameLang === "en" ? "font-en" : nameLang === "lo" ? "font-lo" : "font-zh";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = !!editAirline;

  const [addAirline, { isLoading: isAdding }] = useAddAirlineMutation();
  const [updateAirline, { isLoading: isUpdating }] = useUpdateAirlineMutation();
  const isLoading = isAdding || isUpdating;

  // Re-populate on open/edit change
  useEffect(() => {
    if (isOpen && editAirline) {
      setForm({
        code: editAirline.code ?? "",
        name: editAirline.name ?? "",
        names: {
          en: editAirline.names?.en ?? "",
          lo: editAirline.names?.lo ?? "",
          zh: editAirline.names?.zh ?? "",
        },
        logoFile: null,
        removeLogo: false,
        hotline: editAirline.hotline ?? "",
        phone: editAirline.phone ?? "",
        website: editAirline.website ?? "",
        isActive: editAirline.isActive ?? true,
      });
      setLogoPreview(
        editAirline.logoFile?.path ? asset(editAirline.logoFile.path) : null,
      );
    } else if (isOpen && !editAirline) {
      setForm(emptyForm());
      setLogoPreview(null);
    }
    setErrors({});
  }, [isOpen, editAirline]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, logoFile: file, removeLogo: false }));
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleRemoveLogo = () => {
    setForm((prev) => ({ ...prev, logoFile: null, removeLogo: true }));
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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

    const fd = buildFormData(form);
    try {
      if (isEdit && editAirline) {
        await updateAirline({ id: editAirline.id, body: fd }).unwrap();
        await alertService.success("Updated", "Airline updated successfully.");
      } else {
        await addAirline(fd).unwrap();
        await alertService.success("Created", "Airline created successfully.");
      }
      onClose();
    } catch {
      await alertService.error(
        isEdit
          ? "Failed to update airline. Please try again."
          : "Failed to create airline. Please try again.",
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
        <DialogPanel className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {isEdit ? "Edit Airline" : "Add Airline"}
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

              {/* Logo */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Logo <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <div className="flex items-center gap-4">
                  {/* Preview */}
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shrink-0">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <LuImage className="h-6 w-6 text-gray-300" />
                    )}
                  </div>
                  {/* Controls */}
                  <div className="flex flex-col gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/svg+xml"
                      onChange={handleLogoChange}
                      className="hidden"
                      id="airline-logo-input"
                    />
                    <label
                      htmlFor="airline-logo-input"
                      className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      <LuImage className="h-4 w-4" />
                      {logoPreview ? "Change" : "Upload"}
                    </label>
                    {(logoPreview || (isEdit && editAirline?.logoFile)) && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="self-start text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove logo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Code + Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Code <span className="text-red-500">*</span>
                    <span className="ml-1 font-normal text-gray-400">(2–8 chars)</span>
                  </label>
                  <Input
                    placeholder="e.g. QV"
                    value={form.code}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        code: e.target.value.toUpperCase().slice(0, 8),
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
                    placeholder="e.g. Lao Airlines"
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
                  <div className={`p-3 ${langFont}`}>
                    <Input
                      placeholder={`Airline name in ${LANG_TABS.find((t) => t.key === nameLang)?.label}...`}
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

              {/* Contact */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Hotline <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <Input
                    placeholder="e.g. 021 212 051"
                    value={form.hotline}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, hotline: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Phone <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <Input
                    placeholder="e.g. +856 21 512 028"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Website <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <Input
                  placeholder="e.g. laoairlines.com"
                  value={form.website}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, website: e.target.value }))
                  }
                />
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
                  "Update Airline"
                ) : (
                  "Add Airline"
                )}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
