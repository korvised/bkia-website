import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuFileText,
  LuPlus,
  LuSave,
  LuTrash2,
  LuUpload,
} from "react-icons/lu";
import { Input } from "@/components/ui";
import { Select, Textarea } from "@/components/ui/form";
import { cn } from "@/lib";
import { alertService } from "@/services/alert.service";
import { AuctionCategory, AuctionStatus } from "@/types/enum.type";
import {
  useCreateAuctionMutation,
  useUpdateAuctionMutation,
  useDeleteAuctionDocumentMutation,
} from "@/features/auction/api";
import type { IAuction, IAuctionDocument, INewDocumentRow } from "@/features/auction/types";

// ─── Constants ───────────────────────────────────────────────────────────────

const LANG_TABS = [
  { key: "en" as const, label: "EN" },
  { key: "lo" as const, label: "ລາວ" },
  { key: "zh" as const, label: "中文" },
];

const CATEGORY_OPTIONS = [
  { value: AuctionCategory.EQUIPMENT, label: "Equipment" },
  { value: AuctionCategory.CONSTRUCTION, label: "Construction" },
  { value: AuctionCategory.SERVICE, label: "Service" },
  { value: AuctionCategory.IT, label: "IT" },
  { value: AuctionCategory.CONSULTING, label: "Consulting" },
  { value: AuctionCategory.MAINTENANCE, label: "Maintenance" },
  { value: AuctionCategory.OTHER, label: "Other" },
];

const STATUS_OPTIONS = [
  { value: AuctionStatus.UPCOMING, label: "Upcoming" },
  { value: AuctionStatus.OPEN, label: "Open" },
  { value: AuctionStatus.CLOSED, label: "Closed" },
];

function toDateInput(iso: string): string {
  if (!iso) return "";
  return iso.split("T")[0];
}

function newDocRow(): INewDocumentRow {
  const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
  return { id, file: null, fileName: { en: "", lo: "", zh: "" } };
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface AuctionFormProps {
  editAuction?: IAuction | null;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AuctionForm({ editAuction }: AuctionFormProps) {
  const navigate = useNavigate();
  const isEdit = !!editAuction;

  // Form state
  const [title, setTitle] = useState({ en: "", lo: "", zh: "" });
  const [description, setDescription] = useState({ en: "", lo: "", zh: "" });
  const [category, setCategory] = useState<AuctionCategory>(
    AuctionCategory.EQUIPMENT,
  );
  const [status, setStatus] = useState<AuctionStatus>(AuctionStatus.UPCOMING);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeLang, setActiveLang] = useState<"en" | "lo" | "zh">("en");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Document state
  const [existingDocs, setExistingDocs] = useState<IAuctionDocument[]>([]);
  const [newDocRows, setNewDocRows] = useState<INewDocumentRow[]>([]);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const langFont =
    activeLang === "en"
      ? "font-en"
      : activeLang === "lo"
        ? "font-lo"
        : "font-zh";

  const [createAuction, { isLoading: isCreating }] = useCreateAuctionMutation();
  const [updateAuction, { isLoading: isUpdating }] = useUpdateAuctionMutation();
  const [deleteDocument, { isLoading: isDeletingDoc }] =
    useDeleteAuctionDocumentMutation();
  const isLoading = isCreating || isUpdating;

  // Populate on mount/edit change
  useEffect(() => {
    if (editAuction) {
      setTitle({
        en: editAuction.title.en ?? "",
        lo: editAuction.title.lo ?? "",
        zh: editAuction.title.zh ?? "",
      });
      setDescription({
        en: editAuction.description.en ?? "",
        lo: editAuction.description.lo ?? "",
        zh: editAuction.description.zh ?? "",
      });
      setCategory(editAuction.category);
      setStatus(editAuction.status);
      setStartDate(toDateInput(editAuction.startDate));
      setEndDate(toDateInput(editAuction.endDate));
      setExistingDocs(editAuction.documents ?? []);
    } else {
      setTitle({ en: "", lo: "", zh: "" });
      setDescription({ en: "", lo: "", zh: "" });
      setCategory(AuctionCategory.EQUIPMENT);
      setStatus(AuctionStatus.UPCOMING);
      setStartDate("");
      setEndDate("");
      setExistingDocs([]);
    }
    setNewDocRows([]);
    setErrors({});
  }, [editAuction]);

  // ── Document handlers ─────────────────────────────────────────────────────

  const addDocRow = () =>
    setNewDocRows((prev) => [...prev, newDocRow()]);

  const removeNewDocRow = (id: string) =>
    setNewDocRows((prev) => prev.filter((r) => r.id !== id));

  const updateNewDocRow = (
    id: string,
    patch: Partial<INewDocumentRow>,
  ) =>
    setNewDocRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );

  const updateNewDocFileName = (
    id: string,
    lang: "en" | "lo" | "zh",
    value: string,
  ) =>
    setNewDocRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, fileName: { ...r.fileName, [lang]: value } }
          : r,
      ),
    );

  const handleDeleteExistingDoc = async (docId: string) => {
    if (!editAuction) return;
    const result = await alertService.confirmModal(
      "Delete Document",
      "Remove this document? The file will be permanently deleted.",
    );
    if (!result.isConfirmed) return;
    try {
      await deleteDocument({
        auctionId: editAuction.id,
        docId,
      }).unwrap();
      setExistingDocs((prev) => prev.filter((d) => d.id !== docId));
      await alertService.success("Deleted", "Document removed.");
    } catch {
      await alertService.error("Failed to delete document.");
    }
  };

  // ── Validation ────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!title.en.trim()) errs.title = "Title (EN) is required.";
    if (!description.en.trim()) errs.description = "Description (EN) is required.";
    if (!startDate) errs.startDate = "Start date is required.";
    if (!endDate) errs.endDate = "End date is required.";
    if (startDate && endDate && startDate > endDate)
      errs.endDate = "End date must be after start date.";
    for (const row of newDocRows) {
      if (row.file && !row.fileName.en.trim()) {
        errs.newDocs = "Each document must have an English display name.";
        break;
      }
      if (!row.file && row.fileName.en.trim()) {
        errs.newDocs = "Please select a file for each document row.";
        break;
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    fd.append("title", JSON.stringify(title));
    fd.append("description", JSON.stringify(description));
    fd.append("category", category);
    fd.append("status", status);
    fd.append("startDate", startDate);
    fd.append("endDate", endDate);

    // Filter rows that have both file + EN name
    const validNewDocs = newDocRows.filter((r) => r.file && r.fileName.en.trim());
    if (validNewDocs.length > 0) {
      const names = validNewDocs.map((r) => ({
        en: r.fileName.en.trim(),
        lo: r.fileName.lo.trim(),
        zh: r.fileName.zh.trim(),
      }));
      if (isEdit) {
        fd.append("newDocumentNames", JSON.stringify(names));
        validNewDocs.forEach((r) => fd.append("newDocuments", r.file!));
      } else {
        fd.append("documentNames", JSON.stringify(names));
        validNewDocs.forEach((r) => fd.append("documents", r.file!));
      }
    }

    try {
      if (isEdit && editAuction) {
        await updateAuction({ id: editAuction.id, body: fd }).unwrap();
        await alertService.success("Updated", "Auction updated successfully.");
      } else {
        await createAuction(fd).unwrap();
        await alertService.success("Created", "Auction created successfully.");
      }
      navigate("/content/auctions");
    } catch {
      await alertService.error(
        isEdit
          ? "Failed to update auction. Please try again."
          : "Failed to create auction. Please try again.",
      );
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Multilingual Content */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">
            Auction Details
          </h2>
          <p className="mt-0.5 text-xs text-gray-500">
            EN fields are required. LO and ZH are optional.
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
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Title{" "}
              {activeLang === "en" && <span className="text-red-500">*</span>}
            </label>
            <Input
              placeholder={`Auction title in ${LANG_TABS.find((t) => t.key === activeLang)?.label}...`}
              value={title[activeLang]}
              onChange={(e) =>
                setTitle((prev) => ({ ...prev, [activeLang]: e.target.value }))
              }
            />
            {activeLang === "en" && errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Description{" "}
              {activeLang === "en" && <span className="text-red-500">*</span>}
            </label>
            <Textarea
              rows={5}
              placeholder={`Describe the auction in ${LANG_TABS.find((t) => t.key === activeLang)?.label}...`}
              value={description[activeLang]}
              onChange={(e) =>
                setDescription((prev) => ({
                  ...prev,
                  [activeLang]: e.target.value,
                }))
              }
            />
            {activeLang === "en" && errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Settings</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          {/* Category */}
          <Select
            label="Category *"
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={(v) => setCategory(v as AuctionCategory)}
          />

          {/* Status */}
          <Select
            label="Status *"
            options={STATUS_OPTIONS}
            value={status}
            onChange={(v) => setStatus(v as AuctionStatus)}
          />

          {/* Start Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Start Date <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && (
              <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              End Date <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errors.endDate && (
              <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>
            )}
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Documents</h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Attach PDF files. Provide a display name in each language.
            </p>
          </div>
          <button
            type="button"
            onClick={addDocRow}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <LuPlus className="h-3.5 w-3.5" />
            Add Document
          </button>
        </div>

        <div className="divide-y divide-gray-100 p-6">
          {/* Existing documents (edit mode) */}
          {existingDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <LuFileText className="h-5 w-5 shrink-0 text-gray-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {doc.fileName.en || doc.fileName.lo || doc.fileName.zh || "Untitled"}
                </p>
                {(doc.fileName.lo || doc.fileName.zh) && (
                  <p className="truncate text-xs text-gray-400">
                    {[doc.fileName.lo, doc.fileName.zh]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDeleteExistingDoc(doc.id)}
                disabled={isDeletingDoc}
                className="shrink-0 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                title="Remove document"
              >
                <LuTrash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {/* New document rows */}
          {newDocRows.map((row) => (
            <div
              key={row.id}
              className="space-y-3 py-3 first:pt-0 last:pb-0"
            >
              {/* File picker row */}
              <div className="flex items-center gap-3">
                <LuUpload className="h-4 w-4 shrink-0 text-gray-400" />
                <div className="flex flex-1 items-center gap-2">
                  <input
                    ref={(el) => {
                      fileRefs.current[row.id] = el;
                    }}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      updateNewDocRow(row.id, { file: f });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileRefs.current[row.id]?.click()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 whitespace-nowrap"
                  >
                    <LuFileText className="h-3.5 w-3.5" />
                    {row.file ? row.file.name : "Choose PDF"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeNewDocRow(row.id)}
                  className="shrink-0 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <LuTrash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Multilingual name inputs */}
              <div className="ml-7 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div>
                  <Input
                    placeholder="Name (EN) *"
                    value={row.fileName.en}
                    onChange={(e) =>
                      updateNewDocFileName(row.id, "en", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Input
                    placeholder="Name (ລາວ)"
                    value={row.fileName.lo}
                    onChange={(e) =>
                      updateNewDocFileName(row.id, "lo", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Input
                    placeholder="Name (中文)"
                    value={row.fileName.zh}
                    onChange={(e) =>
                      updateNewDocFileName(row.id, "zh", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          {existingDocs.length === 0 && newDocRows.length === 0 && (
            <p className="py-4 text-center text-sm text-gray-400">
              No documents yet. Click "Add Document" to attach files.
            </p>
          )}

          {errors.newDocs && (
            <p className="pt-2 text-xs text-red-500">{errors.newDocs}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/content/auctions")}
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
          {isLoading
            ? "Saving..."
            : isEdit
              ? "Update Auction"
              : "Create Auction"}
        </button>
      </div>
    </form>
  );
}
