import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuImage, LuSave } from "react-icons/lu";
import { Input } from "@/components/ui";
import { asset, cn } from "@/lib";
import { alertService } from "@/services/alert.service";
import {
  useCreateBannerMutation,
  useUpdateBannerMutation,
} from "@/features/banner/api";
import type { IBanner, IBannerForm } from "@/features/banner/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

const LANG_TABS = [
  { key: "en" as const, label: "EN" },
  { key: "lo" as const, label: "ລາວ" },
  { key: "zh" as const, label: "中文" },
];

const emptyForm = (): IBannerForm => ({
  altText: { en: "", lo: "", zh: "" },
  title: { en: "", lo: "", zh: "" },
  order: 0,
  isActive: true,
  imageFile: null,
});

function buildFormData(form: IBannerForm): FormData {
  const fd = new FormData();
  fd.append("altText", JSON.stringify(form.altText));
  fd.append("title", JSON.stringify(form.title));
  fd.append("order", String(form.order));
  fd.append("isActive", String(form.isActive));
  if (form.imageFile) fd.append("image", form.imageFile);
  return fd;
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface BannerFormProps {
  editBanner?: IBanner | null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function BannerForm({ editBanner }: BannerFormProps) {
  const navigate = useNavigate();
  const isEdit = !!editBanner;

  const [form, setForm] = useState<IBannerForm>(emptyForm);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<"en" | "lo" | "zh">("en");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const langFont =
    activeLang === "en" ? "font-en" : activeLang === "lo" ? "font-lo" : "font-zh";

  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
  const isLoading = isCreating || isUpdating;

  // Re-populate on mount/edit change
  useEffect(() => {
    if (editBanner) {
      setForm({
        altText: {
          en: editBanner.altText.en ?? "",
          lo: editBanner.altText.lo ?? "",
          zh: editBanner.altText.zh ?? "",
        },
        title: {
          en: editBanner.title?.en ?? "",
          lo: editBanner.title?.lo ?? "",
          zh: editBanner.title?.zh ?? "",
        },
        order: editBanner.order ?? 0,
        isActive: editBanner.isActive ?? true,
        imageFile: null,
      });
      setImagePreview(
        editBanner.image?.path ? asset(editBanner.image.path) : null,
      );
    } else {
      setForm(emptyForm());
      setImagePreview(null);
    }
    setErrors({});
  }, [editBanner]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, imageFile: file }));
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!isEdit && !form.imageFile) errs.image = "Image is required.";
    if (!form.altText.en?.trim()) errs.altText = "Alt text (EN) is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fd = buildFormData(form);
    try {
      if (isEdit && editBanner) {
        await updateBanner({ id: editBanner.id, body: fd }).unwrap();
        await alertService.success("Updated", "Banner updated successfully.");
      } else {
        await createBanner(fd).unwrap();
        await alertService.success("Created", "Banner created successfully.");
      }
      navigate("/content/banners");
    } catch {
      await alertService.error(
        isEdit
          ? "Failed to update banner. Please try again."
          : "Failed to create banner. Please try again.",
      );
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">
            Banner Image <span className="text-red-500">*</span>
          </h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Recommended: 1920×600px or wider. JPG, PNG, WEBP. Max 10MB.
          </p>
        </div>
        <div className="p-6">
          {/* Preview */}
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100 sm:h-56">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
                <LuImage className="h-10 w-10" />
                <p className="text-sm">No image selected</p>
              </div>
            )}
          </div>
          {/* Upload controls */}
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
              id="banner-image-input"
            />
            <label
              htmlFor="banner-image-input"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <LuImage className="h-4 w-4" />
              {imagePreview ? "Change Image" : "Upload Image"}
            </label>
            {imagePreview && isEdit && (
              <p className="text-xs text-gray-400">
                Leave unchanged to keep existing image.
              </p>
            )}
          </div>
          {errors.image && (
            <p className="mt-2 text-xs text-red-500">{errors.image}</p>
          )}
        </div>
      </div>

      {/* Multilingual Content */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">
            Content
          </h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Alt text is required (EN). Title is optional.
          </p>
        </div>

        {/* Language Tabs */}
        <div className="border-b border-gray-100 bg-gray-50 px-6">
          <div className="flex gap-0">
            {LANG_TABS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveLang(key)}
                className={cn(
                  "border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                  activeLang === key
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={`space-y-4 p-6 ${langFont}`}>
          {/* Alt Text */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Alt Text{" "}
              {activeLang === "en" && <span className="text-red-500">*</span>}
              <span className="ml-1 font-normal text-gray-400">
                (for accessibility & SEO)
              </span>
            </label>
            <Input
              placeholder={`Describe the image in ${LANG_TABS.find((t) => t.key === activeLang)?.label}...`}
              value={form.altText[activeLang] ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  altText: { ...prev.altText, [activeLang]: e.target.value },
                }))
              }
            />
            {activeLang === "en" && errors.altText && (
              <p className="mt-1 text-xs text-red-500">{errors.altText}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Title{" "}
              <span className="font-normal text-gray-400">(optional overlay)</span>
            </label>
            <Input
              placeholder={`Slide headline in ${LANG_TABS.find((t) => t.key === activeLang)?.label}...`}
              value={form.title[activeLang] ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  title: { ...prev.title, [activeLang]: e.target.value },
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Settings</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          {/* Order */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Display Order{" "}
              <span className="font-normal text-gray-400">(lower = first)</span>
            </label>
            <Input
              type="number"
              min={0}
              value={String(form.order)}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  order: Math.max(0, parseInt(e.target.value) || 0),
                }))
              }
              className="w-32"
            />
          </div>

          {/* isActive */}
          <div className="flex flex-col justify-center">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>
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
              <span className="text-sm text-gray-700">
                {form.isActive ? "Active — shown on homepage" : "Inactive — hidden"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/content/banners")}
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
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <LuSave className="h-4 w-4" />
          )}
          {isLoading ? "Saving..." : isEdit ? "Update Banner" : "Create Banner"}
        </button>
      </div>
    </form>
  );
}
