"use client";

import { useState, useRef } from "react";
import { Upload, X, CheckCircle, Loader2 } from "lucide-react";
import { Lang } from "@/types/language";
import { cn } from "@/lib";
import { createLostFoundI18n } from "@/data/i18n/about/lost-found";
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

const INPUT_BASE =
  "form-input focus:border-[#00AAAC] focus:ring-[#00AAAC]/10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all placeholder:text-gray-400 focus:ring-4 focus:outline-none";

export function LostFoundClaimForm({ lang, itemId }: LostFoundClaimFormProps) {
  const t = createLostFoundI18n(lang).lostFound;
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
      setError(t.errorGeneric);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-r-lg border-l-4 border-emerald-500 bg-emerald-50 px-5 py-5">
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
          <p className="text-sm font-medium text-emerald-800">
            {t.claimSuccess}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
        {t.claimFormTitle}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="claimantName"
            className="mb-1.5 block text-xs font-medium text-gray-700"
          >
            {t.claimantName} <span className="text-red-500">*</span>
          </label>
          <input
            id="claimantName"
            name="claimantName"
            required
            value={form.claimantName}
            onChange={handleChange}
            className={INPUT_BASE}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="claimantEmail"
            className="mb-1.5 block text-xs font-medium text-gray-700"
          >
            {t.claimantEmail} <span className="text-red-500">*</span>
          </label>
          <input
            id="claimantEmail"
            name="claimantEmail"
            type="email"
            required
            value={form.claimantEmail}
            onChange={handleChange}
            className={INPUT_BASE}
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="claimantPhone"
            className="mb-1.5 block text-xs font-medium text-gray-700"
          >
            {t.claimantPhone}
          </label>
          <input
            id="claimantPhone"
            name="claimantPhone"
            type="tel"
            value={form.claimantPhone}
            onChange={handleChange}
            className={INPUT_BASE}
          />
        </div>

        {/* Ownership proof */}
        <div>
          <label
            htmlFor="ownershipProof"
            className="mb-1.5 block text-xs font-medium text-gray-700"
          >
            {t.ownershipProof} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="ownershipProof"
            name="ownershipProof"
            required
            rows={4}
            value={form.ownershipProof}
            onChange={handleChange}
            placeholder={t.ownershipProofHint}
            className="form-textarea focus:border-[#00AAAC] focus:ring-[#00AAAC]/10 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all placeholder:text-gray-400 focus:ring-4 focus:outline-none"
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
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 py-3 text-sm text-gray-500 transition-colors hover:border-[#00AAAC] hover:bg-[#f0fbfc] hover:text-[#00AAAC]"
          >
            <Upload className="h-4 w-4" />
            {t.proofFiles}
          </button>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,.pdf"
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
          className={cn(
            "flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#00AAAC] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#008e90] disabled:opacity-60",
          )}
        >
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "loading" ? t.submitting : t.submitClaim}
        </button>
      </form>
    </div>
  );
}
