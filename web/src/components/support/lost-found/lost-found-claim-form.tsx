"use client";

import { useState, useRef } from "react";
import { Upload, X, CheckCircle, Loader2 } from "lucide-react";
import { Lang } from "@/types/language";
import { cn } from "@/lib";
import { createSupportI18n } from "@/data/i18n/support";
import { submitClaim } from "@/services/lost-found";

interface LostFoundClaimFormProps {
  lang: Lang;
  itemId: string;
}

interface FormState {
  claimantName: string;
  claimantEmail: string;
  claimantPhone: string;
  ownershipProof: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function LostFoundClaimForm({ lang, itemId }: LostFoundClaimFormProps) {
  const t = createSupportI18n(lang).lostFound;
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    claimantName: "",
    claimantEmail: "",
    claimantPhone: "",
    ownershipProof: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const body = new FormData();
      body.append("claimantName", form.claimantName);
      body.append("claimantEmail", form.claimantEmail);
      if (form.claimantPhone) body.append("claimantPhone", form.claimantPhone);
      body.append("ownershipProof", form.ownershipProof);
      files.forEach((f) => body.append("images", f));

      await submitClaim(itemId, body);
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-500" />
        <p className="text-sm font-medium text-green-800">{t.claimSuccess}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-xs">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          {t.claimFormTitle}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        {/* Name */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            {t.claimantName} <span className="text-red-500">*</span>
          </label>
          <input
            name="claimantName"
            required
            value={form.claimantName}
            onChange={handleChange}
            className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-4 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            {t.claimantEmail} <span className="text-red-500">*</span>
          </label>
          <input
            name="claimantEmail"
            type="email"
            required
            value={form.claimantEmail}
            onChange={handleChange}
            className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-4 focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            {t.claimantPhone}
          </label>
          <input
            name="claimantPhone"
            type="tel"
            value={form.claimantPhone}
            onChange={handleChange}
            className="focus:border-primary-500 focus:ring-primary-500/10 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-4 focus:outline-none"
          />
        </div>

        {/* Ownership proof */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            {t.ownershipProof} <span className="text-red-500">*</span>
          </label>
          <textarea
            name="ownershipProof"
            required
            rows={4}
            value={form.ownershipProof}
            onChange={handleChange}
            placeholder={t.ownershipProofHint}
            className="focus:border-primary-500 focus:ring-primary-500/10 w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-4 focus:outline-none"
          />
        </div>

        {/* File upload */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            {t.proofFiles}
          </label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 py-3 text-sm text-gray-500 transition-colors hover:bg-gray-100"
          >
            <Upload className="h-4 w-4" />
            Upload files (max 5)
          </button>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFiles}
            className="hidden"
          />

          {/* File previews */}
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
          className={cn(
            "bg-primary-600 hover:bg-primary-700 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60",
          )}
        >
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "loading" ? t.submitClaim : t.submitClaim}
        </button>
      </form>
    </div>
  );
}
