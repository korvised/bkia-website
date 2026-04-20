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

const INPUT_BASE =
  "form-input focus:border-[#00AAAC] focus:ring-[#00AAAC]/10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all placeholder:text-gray-400 focus:ring-4 focus:outline-none";

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
      setError(t.errorGeneric);
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
      <div className="rounded-r-lg border-l-4 border-emerald-500 bg-emerald-50 px-5 py-6">
        <div className="mb-4 flex items-center gap-3">
          <CheckCircle className="h-6 w-6 shrink-0 text-emerald-500" />
          <p className="text-sm font-semibold text-emerald-800">
            {t.reportSuccess}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 ring-1 ring-emerald-200">
          <span className="font-mono text-base font-bold tracking-widest text-gray-900">
            {referenceCode}
          </span>
          <button
            onClick={handleCopy}
            className="rounded-md p-2 text-gray-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
            aria-label={t.copyCode}
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="mt-2 text-xs text-emerald-700">
          {copied ? t.codeCopied : t.copyCode}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Report type — pill toggle */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t.reportType} <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {[
            {
              value: LostFoundType.LOST,
              label: t.tabLost,
              activeBg: "bg-red-600 text-white border-red-600",
            },
            {
              value: LostFoundType.FOUND,
              label: t.tabFound,
              activeBg: "bg-emerald-600 text-white border-emerald-600",
            },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, type: opt.value }))}
              className={cn(
                "flex-1 rounded-full border-2 py-2.5 text-sm font-semibold transition-all",
                form.type === opt.value
                  ? opt.activeBg
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          {t.itemCategory} <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          required
          value={form.category}
          onChange={handleChange}
          className="form-select w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all focus:border-[#00AAAC] focus:ring-4 focus:ring-[#00AAAC]/10 focus:outline-none"
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
        <label
          htmlFor="itemName"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          {t.itemName} <span className="text-red-500">*</span>
        </label>
        <input
          id="itemName"
          name="itemName"
          required
          value={form.itemName}
          onChange={handleChange}
          placeholder="e.g. Black leather wallet, iPhone 14 Pro"
          className={INPUT_BASE}
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          {t.itemDescription}
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          placeholder="Brand, color, distinguishing marks, contents…"
          className="form-textarea w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all placeholder:text-gray-400 focus:border-[#00AAAC] focus:ring-4 focus:ring-[#00AAAC]/10 focus:outline-none"
        />
      </div>

      {/* Location + Date */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="location"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            {t.itemLocation}
          </label>
          <input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Gate 3, Arrivals Hall"
            className={INPUT_BASE}
          />
        </div>
        <div>
          <label
            htmlFor="incidentDate"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            {t.itemIncidentDate} <span className="text-red-500">*</span>
          </label>
          <input
            id="incidentDate"
            name="incidentDate"
            type="datetime-local"
            required
            value={form.incidentDate}
            onChange={handleChange}
            className={INPUT_BASE}
          />
        </div>
      </div>

      {/* Flight number */}
      <div>
        <label
          htmlFor="flightNumber"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          {t.itemFlightNumber}
        </label>
        <input
          id="flightNumber"
          name="flightNumber"
          value={form.flightNumber}
          onChange={handleChange}
          placeholder="e.g. QV201"
          className={INPUT_BASE}
        />
      </div>

      {/* Contact information */}
      <div className="space-y-4 border-t border-gray-100 pt-5">
        <p className="text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
          {t.contactInfo}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="reporterName"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              {t.reporterName} <span className="text-red-500">*</span>
            </label>
            <input
              id="reporterName"
              name="reporterName"
              required
              value={form.reporterName}
              onChange={handleChange}
              className={INPUT_BASE}
            />
          </div>
          <div>
            <label
              htmlFor="reporterPhone"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              {t.reporterPhone} <span className="text-red-500">*</span>
            </label>
            <input
              id="reporterPhone"
              name="reporterPhone"
              type="tel"
              required
              value={form.reporterPhone}
              onChange={handleChange}
              className={INPUT_BASE}
            />
          </div>
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
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 py-3 text-sm text-gray-500 transition-colors hover:border-[#00AAAC] hover:bg-[#f0fbfc] hover:text-[#00AAAC]"
        >
          <Upload className="h-4 w-4" />
          {t.itemImages}
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
                  className="rounded-md p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove file"
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
        <div className="rounded-r-lg border-l-4 border-red-500 bg-red-50 px-4 py-3">
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#00AAAC] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008e90] disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "loading" ? t.submitting : t.submitReport}
      </button>
    </form>
  );
}
