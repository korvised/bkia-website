"use client";

import { useRef, useState } from "react";
import { Check, CheckCircle, Copy, Loader2, Upload, X } from "lucide-react";
import { Lang } from "@/types/language";
import { LostFoundCategory, LostFoundType } from "@/types/enum";
import { cn } from "@/lib";
import { createSupportI18n } from "@/data/i18n/support";
import { submitLostFound } from "@/services/lost-found";

interface LostFoundReportFormProps {
  lang: Lang;
}

interface FormState {
  type: LostFoundType;
  category: LostFoundCategory;
  itemName: string;
  description: string;
  location: string;
  incidentDate: string;
  flightNumber: string;
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function LostFoundReportForm({ lang }: LostFoundReportFormProps) {
  const t = createSupportI18n(lang).lostFound;
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    type: LostFoundType.LOST,
    category: LostFoundCategory.OTHER,
    itemName: "",
    description: "",
    location: "",
    incidentDate: "",
    flightNumber: "",
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...selected].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referenceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const body = new FormData();
      body.append("type", form.type);
      body.append("category", form.category);
      body.append("itemName", form.itemName);
      if (form.description) body.append("description", form.description);
      if (form.location) body.append("location", form.location);
      body.append("incidentDate", new Date(form.incidentDate).toISOString());
      if (form.flightNumber) body.append("flightNumber", form.flightNumber);
      body.append("reporterName", form.reporterName);
      body.append("reporterEmail", form.reporterEmail);
      if (form.reporterPhone) body.append("reporterPhone", form.reporterPhone);
      files.forEach((f) => body.append("images", f));

      const res = await submitLostFound(body);
      setReferenceCode(res.referenceCode);
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const categories = [
    { id: LostFoundCategory.ELECTRONICS, label: t.categoryElectronics },
    { id: LostFoundCategory.BAGGAGE, label: t.categoryBaggage },
    { id: LostFoundCategory.DOCUMENTS, label: t.categoryDocuments },
    { id: LostFoundCategory.CLOTHING, label: t.categoryClothing },
    { id: LostFoundCategory.JEWELRY, label: t.categoryJewelry },
    { id: LostFoundCategory.KEYS, label: t.categoryKeys },
    { id: LostFoundCategory.CASH, label: t.categoryCash },
    { id: LostFoundCategory.TOYS, label: t.categoryToys },
    { id: LostFoundCategory.OTHER, label: t.categoryOther },
  ];

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
        <p className="mb-4 text-sm font-medium text-green-800">
          {t.reportSuccess}
        </p>
        <div className="mx-auto flex max-w-xs items-center justify-between gap-2 rounded-xl border border-green-300 bg-white px-4 py-3">
          <span className="text-base font-bold tracking-widest text-gray-900">
            {referenceCode}
          </span>
          <button
            onClick={handleCopy}
            className="text-gray-400 transition-colors hover:text-green-600"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="mt-3 text-xs text-green-700">
          {copied ? t.codeCopied : t.copyCode}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Report type toggle */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t.reportType} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: LostFoundType.LOST, label: t.tabLost },
            { value: LostFoundType.FOUND, label: t.tabFound },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, type: opt.value }))}
              className={cn(
                "rounded-xl border-2 py-3 text-sm font-semibold transition-all",
                form.type === opt.value
                  ? opt.value === LostFoundType.LOST
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t.itemCategory} <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          required
          value={form.category}
          onChange={handleChange}
          className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-4 focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Item name */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t.itemName} <span className="text-red-500">*</span>
        </label>
        <input
          name="itemName"
          required
          value={form.itemName}
          onChange={handleChange}
          className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-4 focus:outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t.itemDescription}
        </label>
        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          className="focus:border-primary-500 focus:ring-primary-500/10 w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-4 focus:outline-none"
        />
      </div>

      {/* Location + Date (2 cols) */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            {t.itemLocation}
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-4 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            {t.itemIncidentDate} <span className="text-red-500">*</span>
          </label>
          <input
            name="incidentDate"
            type="datetime-local"
            required
            value={form.incidentDate}
            onChange={handleChange}
            className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-4 focus:outline-none"
          />
        </div>
      </div>

      {/* Flight number */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t.itemFlightNumber}
        </label>
        <input
          name="flightNumber"
          value={form.flightNumber}
          onChange={handleChange}
          className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-4 focus:outline-none"
        />
      </div>

      <div className="border-t border-gray-100 pt-2">
        <p className="mb-4 text-sm font-semibold text-gray-700">
          Contact Information
        </p>

        {/* Reporter name + email (2 cols) */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              {t.reporterName} <span className="text-red-500">*</span>
            </label>
            <input
              name="reporterName"
              required
              value={form.reporterName}
              onChange={handleChange}
              className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-4 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              {t.reporterEmail} <span className="text-red-500">*</span>
            </label>
            <input
              name="reporterEmail"
              type="email"
              required
              value={form.reporterEmail}
              onChange={handleChange}
              className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-4 focus:outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            {t.reporterPhone}
          </label>
          <input
            name="reporterPhone"
            type="tel"
            value={form.reporterPhone}
            onChange={handleChange}
            className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-4 focus:outline-none"
          />
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t.itemImages}
        </label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 py-3 text-sm text-gray-500 transition-colors hover:bg-gray-100"
        >
          <Upload className="h-4 w-4" />
          Upload images (max 5)
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="hidden"
        />
        {files.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {files.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
              >
                <span className="max-w-[80%] truncate text-xs text-gray-600">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-primary-600 hover:bg-primary-700 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {t.submitReport}
      </button>
    </form>
  );
}
