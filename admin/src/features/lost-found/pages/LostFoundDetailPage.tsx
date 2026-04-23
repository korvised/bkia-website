import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  LuArrowLeft,
  LuCalendar,
  LuCheck,
  LuCircleCheck,
  LuClock,
  LuFileText,
  LuInfo,
  LuMail,
  LuMapPin,
  LuPackage,
  LuPackageCheck,
  LuPackageSearch,
  LuPhone,
  LuPlane,
  LuPlus,
  LuRefreshCw,
  LuSave,
  LuShield,
  LuTag,
  LuTrash2,
  LuUser,
  LuX,
  LuZoomIn,
} from "react-icons/lu";
import { ImageLightbox } from "@/components/file";
import { Breadcrumb } from "@/components/ui";
import { asset, cn, formatDate, formatDateTime } from "@/lib";
import { alertService } from "@/services/alert.service";
import { ClaimStatus, LostFoundStatus } from "@/types";
import type { IFile } from "@/types";
import {
  useUpdateDisplayMutation,
  useUploadImagesMutation,
  useRemoveImageMutation,
  useReviewClaimMutation,
  useDeleteLostFoundMutation,
} from "@/features/lost-found/api";
import { usePermissions } from "@/hooks";
import { PermissionSlug } from "@/types/enum.type";
import { useGetLostFoundById } from "../hooks";
import { LostFoundStatusBadge, LostFoundTypeBadge } from "../components";
import type { IMultilingualText } from "../types";

// ─── Config ────────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  LostFoundStatus,
  {
    accent: string;
    light: string;
    border: string;
    text: string;
    Icon: IconType;
    description: string;
  }
> = {
  [LostFoundStatus.OPEN]: {
    accent: "#3b82f6",
    light: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    Icon: LuPackage,
    description: "Awaiting a claim or match",
  },
  [LostFoundStatus.MATCHED]: {
    accent: "#f59e0b",
    light: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    Icon: LuClock,
    description: "A claim is under review",
  },
  [LostFoundStatus.RETURNED]: {
    accent: "#10b981",
    light: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    Icon: LuCircleCheck,
    description: "Successfully returned to owner",
  },
  [LostFoundStatus.DONATED]: {
    accent: "#8b5cf6",
    light: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    Icon: LuPackageCheck,
    description: "Item was donated",
  },
  [LostFoundStatus.DISPOSED]: {
    accent: "#6b7280",
    light: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-600",
    Icon: LuTrash2,
    description: "Item was disposed",
  },
};

const CLAIM_STATUS_CONFIG: Record<
  ClaimStatus,
  {
    borderColor: string;
    bg: string;
    label: string;
    pill: string;
  }
> = {
  [ClaimStatus.PENDING]: {
    borderColor: "border-l-amber-400",
    bg: "bg-amber-50/40",
    label: "Pending Review",
    pill: "bg-amber-100 text-amber-700",
  },
  [ClaimStatus.APPROVED]: {
    borderColor: "border-l-blue-400",
    bg: "bg-blue-50/30",
    label: "Approved",
    pill: "bg-blue-100 text-blue-700",
  },
  [ClaimStatus.REJECTED]: {
    borderColor: "border-l-red-400",
    bg: "bg-red-50/30",
    label: "Rejected",
    pill: "bg-red-100 text-red-700",
  },
  [ClaimStatus.COMPLETED]: {
    borderColor: "border-l-emerald-400",
    bg: "bg-emerald-50/30",
    label: "Completed",
    pill: "bg-emerald-100 text-emerald-700",
  },
};

const LANG_TABS: { key: keyof IMultilingualText; label: string; short: string }[] = [
  { key: "en", label: "English", short: "EN" },
  { key: "lo", label: "Lao", short: "ລາວ" },
  { key: "zh", label: "Chinese", short: "中文" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
      {children}
    </p>
  );
}

function ProofFiles({
  files,
  onImageClick,
}: {
  files: IFile[];
  onImageClick: (images: IFile[], index: number) => void;
}) {
  if (!files?.length) return null;
  const isImg = (f: IFile) => f.mimeType?.startsWith("image/");
  const imgFiles = files.filter(isImg);

  return (
    <div className="mt-3">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
        Proof files ({files.length})
      </p>
      <div className="flex flex-wrap gap-2">
        {files.map((f) =>
          isImg(f) ? (
            <button
              key={f.id}
              type="button"
              onClick={() => onImageClick(imgFiles, imgFiles.findIndex((i) => i.id === f.id))}
              className="group relative h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-all hover:ring-2 hover:ring-primary hover:ring-offset-1"
              title={f.originalName}
            >
              <img src={asset(f.path)} alt={f.originalName} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <LuZoomIn className="h-4 w-4 text-white" />
              </div>
            </button>
          ) : (
            <a
              key={f.id}
              href={asset(f.path)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-100"
              title={f.originalName}
            >
              <LuFileText className="h-3.5 w-3.5 shrink-0 text-gray-400" />
              <span className="max-w-[120px] truncate">{f.originalName}</span>
            </a>
          ),
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function LostFoundDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { can } = usePermissions();
  const { item, claims, isLoading, isLoadingClaims, isError, handleBack } =
    useGetLostFoundById(id!);

  const [updateDisplay, { isLoading: isSavingDisplay }] = useUpdateDisplayMutation();
  const [uploadImages, { isLoading: isUploading }] = useUploadImagesMutation();
  const [removeImage, { isLoading: isRemoving }] = useRemoveImageMutation();
  const [reviewClaim, { isLoading: isReviewing }] = useReviewClaimMutation();
  const [deleteLostFound, { isLoading: isDeleting }] = useDeleteLostFoundMutation();

  const [lightbox, setLightbox] = useState<{ images: IFile[]; index: number } | null>(null);
  const [selectedLang, setSelectedLang] = useState<keyof IMultilingualText>("en");
  const [displayNames, setDisplayNames] = useState<IMultilingualText>({});
  const [displayDescriptions, setDisplayDescriptions] = useState<IMultilingualText>({});
  const [displayLocations, setDisplayLocations] = useState<IMultilingualText>({});
  const [displayLoaded, setDisplayLoaded] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate display fields once item loads (render-time initialisation)
  if (item && !displayLoaded) {
    setDisplayNames(item.displayNames ?? {});
    setDisplayDescriptions(item.displayDescriptions ?? {});
    setDisplayLocations(item.displayLocations ?? {});
    setDisplayLoaded(true);
  }

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleSaveDisplay = async () => {
    if (!id) return;
    try {
      await updateDisplay({ id, body: { displayNames, displayDescriptions, displayLocations } }).unwrap();
      await alertService.success("Saved", "Display fields updated.");
    } catch {
      await alertService.error("Failed to save display fields.");
    }
  };

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!id || !e.target.files?.length) return;
    const formData = new FormData();
    Array.from(e.target.files).forEach((f) => formData.append("images", f));
    e.target.value = "";
    try {
      await uploadImages({ id, formData }).unwrap();
    } catch {
      await alertService.error("Failed to upload images.");
    }
  };

  const handleRemoveImage = async (fileId: string) => {
    if (!id) return;
    const result = await alertService.confirmModal("Remove Image", "This will permanently delete this image.");
    if (!result.isConfirmed) return;
    try {
      await removeImage({ id, fileId }).unwrap();
    } catch {
      await alertService.error("Failed to remove image.");
    }
  };

  const handleReviewClaim = async (claimId: string, status: ClaimStatus) => {
    if (!id) return;
    const labels: Record<ClaimStatus, string> = {
      [ClaimStatus.APPROVED]: "Approve",
      [ClaimStatus.REJECTED]: "Reject",
      [ClaimStatus.COMPLETED]: "Mark Completed",
      [ClaimStatus.PENDING]: "Reset to Pending",
    };
    const result = await alertService.confirmModal(
      labels[status],
      `Are you sure you want to ${labels[status].toLowerCase()} this claim?`,
    );
    if (!result.isConfirmed) return;
    try {
      await reviewClaim({ claimId, body: { status }, itemId: id }).unwrap();
      await alertService.success("Done", "Claim status updated.");
    } catch {
      await alertService.error("Failed to update claim.");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const result = await alertService.confirmModal(
      "Delete Report",
      `Delete "${item?.displayNames?.en ?? item?.displayNames?.lo ?? "this item"}"? This cannot be undone.`,
    );
    if (!result.isConfirmed) return;
    try {
      await deleteLostFound(id).unwrap();
      await alertService.success("Deleted", "Record deleted successfully.");
      navigate("/support/lost-found");
    } catch {
      await alertService.error("Failed to delete. Please try again.");
    }
  };

  // ── Loading / Error ───────────────────────────────────────────────────────────

  const baseBreadcrumb = [
    { label: "Support" },
    { label: "Lost & Found", path: "/support/lost-found", icon: LuPackageSearch },
  ];

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Breadcrumb items={[...baseBreadcrumb, { label: "…" }]} />
        <div className="flex h-64 items-center justify-center rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm text-gray-400">Loading record…</span>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="space-y-5">
        <Breadcrumb items={[...baseBreadcrumb, { label: "Not Found" }]} />
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <LuInfo className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="mb-1 text-base font-semibold text-red-900">Record not found</h3>
          <p className="mb-4 text-sm text-red-500">
            This item may have been deleted or the ID is invalid.
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline"
          >
            <LuArrowLeft className="h-4 w-4" />
            Back to Lost &amp; Found
          </button>
        </div>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[item.status];
  const StatusIcon = statusCfg.Icon;
  const itemName = item.displayNames?.en ?? item.displayNames?.lo ?? "—";
  const pendingCount = claims.filter((c) => c.status === ClaimStatus.PENDING).length;

  return (
    <div className="space-y-5">
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      <Breadcrumb
        items={[
          ...baseBreadcrumb,
          { label: item.displayNames?.en ?? item.displayNames?.lo ?? "Detail" },
        ]}
      />

      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* Status accent stripe at top */}
        <div className="h-1 w-full" style={{ backgroundColor: statusCfg.accent }} />

        <div className="px-6 pt-5 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Left: back + title + meta */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="mt-0.5 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <LuArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <LostFoundTypeBadge type={item.type} />
                  <LostFoundStatusBadge status={item.status} />
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium capitalize text-gray-600">
                    <LuTag className="h-3 w-3 shrink-0" />
                    {item.category.toLowerCase()}
                  </span>
                </div>

                <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  {itemName}
                </h1>

                {/* Inline meta chips */}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <LuCalendar className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                    {formatDate(item.incidentDate)}
                  </span>
                  {item.flightNumber && (
                    <span className="flex items-center gap-1.5">
                      <LuPlane className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                      {item.flightNumber}
                    </span>
                  )}
                  {item.displayLocations?.en && (
                    <span className="flex items-center gap-1.5">
                      <LuMapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                      {item.displayLocations.en}
                    </span>
                  )}
                  {claims.length > 0 && (
                    <span className="flex items-center gap-1.5">
                      <LuShield className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                      {claims.length} claim{claims.length !== 1 ? "s" : ""}
                      {pendingCount > 0 && (
                        <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                          {pendingCount} pending
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: delete */}
            {can(PermissionSlug.LOST_FOUND_DELETE) && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex shrink-0 items-center gap-2 self-start rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? (
                  <LuRefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <LuTrash2 className="h-4 w-4" />
                )}
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Grid ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* ── LEFT COLUMN ──────────────────────────────────────────────────── */}
        <div className="space-y-5 xl:col-span-2">

          {/* Images */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <SectionLabel>Images ({item.images.length})</SectionLabel>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                {isUploading ? (
                  <LuRefreshCw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <LuPlus className="h-3.5 w-3.5" />
                )}
                Upload
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleUploadImages}
              />
            </div>

            {item.images.length === 0 ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-10 text-gray-400 transition-colors hover:border-primary hover:text-primary"
              >
                <div className="rounded-xl border-2 border-dashed border-current p-3 transition-colors">
                  <LuPlus className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Upload item images</span>
                <span className="text-xs text-gray-300 group-hover:text-primary/60">
                  JPG, PNG, WEBP — click to browse
                </span>
              </button>
            ) : (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                {item.images.map((img) => (
                  <div key={img.id} className="group relative overflow-hidden rounded-xl">
                    <button
                      type="button"
                      className="block w-full focus:outline-none"
                      onClick={() =>
                        setLightbox({
                          images: item.images,
                          index: item.images.findIndex((i) => i.id === img.id),
                        })
                      }
                    >
                      <img
                        src={asset(img.path)}
                        alt={img.originalName}
                        className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </button>
                    {/* Delete overlay */}
                    <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        disabled={isRemoving}
                        className="m-2 rounded-lg bg-white/95 p-1.5 text-red-600 shadow-sm transition-colors hover:bg-white"
                        title="Remove image"
                      >
                        <LuTrash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Display Fields (multilingual) */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <SectionLabel>Website Display</SectionLabel>
              <button
                type="button"
                onClick={handleSaveDisplay}
                disabled={isSavingDisplay}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white",
                  "transition-colors hover:bg-primary-600",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                {isSavingDisplay ? (
                  <LuRefreshCw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <LuSave className="h-3.5 w-3.5" />
                )}
                Save
              </button>
            </div>

            {/* Language tabs — underline style */}
            <div className="mb-5 flex border-b border-gray-100">
              {LANG_TABS.map(({ key, short }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedLang(key)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    selectedLang === key
                      ? "text-primary"
                      : "text-gray-400 hover:text-gray-600",
                  )}
                >
                  {short}
                  {selectedLang === key && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Single set of inputs for selected language */}
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Item Name
                </label>
                <input
                  type="text"
                  value={displayNames[selectedLang] ?? ""}
                  onChange={(e) =>
                    setDisplayNames((p) => ({ ...p, [selectedLang]: e.target.value }))
                  }
                  placeholder={`Name in ${LANG_TABS.find((l) => l.key === selectedLang)?.label}…`}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={displayDescriptions[selectedLang] ?? ""}
                  onChange={(e) =>
                    setDisplayDescriptions((p) => ({ ...p, [selectedLang]: e.target.value }))
                  }
                  placeholder="Describe the item for public display…"
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Location Found / Lost
                </label>
                <input
                  type="text"
                  value={displayLocations[selectedLang] ?? ""}
                  onChange={(e) =>
                    setDisplayLocations((p) => ({ ...p, [selectedLang]: e.target.value }))
                  }
                  placeholder="e.g. Terminal B, Gate 12…"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                />
              </div>
            </div>

            {/* Completeness indicator */}
            <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
              {LANG_TABS.map(({ key, short }) => {
                const filled = !!(displayNames[key] || displayDescriptions[key] || displayLocations[key]);
                return (
                  <span
                    key={key}
                    onClick={() => setSelectedLang(key)}
                    className={cn(
                      "cursor-pointer rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                      filled
                        ? "bg-primary-50 text-primary-700"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200",
                    )}
                  >
                    {short} {filled ? "✓" : "—"}
                  </span>
                );
              })}
              <span className="ml-auto text-xs text-gray-400">Click a language to edit</span>
            </div>
          </div>

          {/* Claims */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <SectionLabel>
                Claims ({claims.length})
                {pendingCount > 0 && ` · ${pendingCount} pending`}
              </SectionLabel>
            </div>

            {isLoadingClaims && (
              <div className="flex justify-center py-10">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}

            {!isLoadingClaims && claims.length === 0 && (
              <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-10 text-center">
                <LuShield className="h-8 w-8 text-gray-300" />
                <p className="text-sm font-medium text-gray-400">No claims yet</p>
                <p className="text-xs text-gray-300">
                  Claims appear here when customers submit them on the website
                </p>
              </div>
            )}

            <div className="space-y-4">
              {claims.map((claim, i) => {
                const cfg = CLAIM_STATUS_CONFIG[claim.status];
                return (
                  <div
                    key={claim.id}
                    className={cn(
                      "rounded-xl border border-gray-200 border-l-4 p-4 transition-colors",
                      cfg.borderColor,
                      cfg.bg,
                    )}
                  >
                    {/* Claim header */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-300">#{i + 1}</span>
                        <LuUser className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {claim.claimantName}
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            cfg.pill,
                          )}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatDateTime(claim.createdAt)}
                      </span>
                    </div>

                    {/* Contact + flight info */}
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <LuMail className="h-3 w-3 text-gray-400" />
                        {claim.claimantEmail}
                      </span>
                      {claim.claimantPhone && (
                        <span className="flex items-center gap-1.5">
                          <LuPhone className="h-3 w-3 text-gray-400" />
                          {claim.claimantPhone}
                        </span>
                      )}
                      {claim.flightNumber && (
                        <span className="flex items-center gap-1.5">
                          <LuPlane className="h-3 w-3 text-gray-400" />
                          {claim.flightNumber}
                          {claim.seatNumber && (
                            <span className="text-gray-400">· Seat {claim.seatNumber}</span>
                          )}
                        </span>
                      )}
                    </div>

                    <div className="my-3 border-t border-gray-100" />

                    {/* Ownership proof */}
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        Ownership Proof
                      </p>
                      <p className="text-sm leading-relaxed text-gray-700">
                        {claim.ownershipProof}
                      </p>
                    </div>

                    <ProofFiles
                      files={claim.proofFiles ?? []}
                      onImageClick={(imgs, idx) => setLightbox({ images: imgs, index: idx })}
                    />

                    {claim.staffNote && (
                      <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5">
                        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-blue-400">
                          Staff Note
                        </p>
                        <p className="text-sm text-blue-800">{claim.staffNote}</p>
                      </div>
                    )}

                    {claim.reviewedAt && (
                      <p className="mt-2 text-xs text-gray-400">
                        Reviewed {formatDateTime(claim.reviewedAt)}
                      </p>
                    )}

                    {/* Action buttons */}
                    {claim.status === ClaimStatus.PENDING && (
                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleReviewClaim(claim.id, ClaimStatus.APPROVED)}
                          disabled={isReviewing}
                          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                        >
                          <LuCheck className="h-3.5 w-3.5" />
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReviewClaim(claim.id, ClaimStatus.REJECTED)}
                          disabled={isReviewing}
                          className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                        >
                          <LuX className="h-3.5 w-3.5" />
                          Reject
                        </button>
                      </div>
                    )}
                    {claim.status === ClaimStatus.APPROVED && (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => handleReviewClaim(claim.id, ClaimStatus.COMPLETED)}
                          disabled={isReviewing}
                          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                        >
                          <LuCircleCheck className="h-3.5 w-3.5" />
                          Mark Returned
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* Status widget */}
          <div
            className={cn(
              "rounded-2xl border p-5",
              statusCfg.border,
              statusCfg.light,
            )}
          >
            <SectionLabel>Status</SectionLabel>
            <div className="mt-3 flex items-start gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                  statusCfg.border,
                  "bg-white/60",
                )}
              >
                <StatusIcon className={cn("h-5 w-5", statusCfg.text)} />
              </div>
              <div>
                <LostFoundStatusBadge status={item.status} />
                <p className="mt-1 text-xs text-gray-500">{statusCfg.description}</p>
              </div>
            </div>
          </div>

          {/* Record info */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <SectionLabel>Record Info</SectionLabel>

            {/* Created by */}
            {item.createdBy && (
              <div className="mt-4 flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary">
                  {item.createdBy.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {item.createdBy.name}
                  </p>
                  <a
                    href={`mailto:${item.createdBy.email}`}
                    className="truncate text-xs text-gray-400 transition-colors hover:text-primary"
                  >
                    {item.createdBy.email}
                  </a>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="mt-4 space-y-2.5 border-t border-gray-100 pt-4">
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs text-gray-400">Created</span>
                <span className="text-right text-xs font-medium text-gray-700">
                  {formatDateTime(item.createdAt)}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs text-gray-400">Updated</span>
                <span className="text-right text-xs font-medium text-gray-700">
                  {formatDateTime(item.updatedAt)}
                </span>
              </div>
              {item.resolvedAt && (
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs text-gray-400">Resolved</span>
                  <span className="text-right text-xs font-medium text-emerald-700">
                    {formatDateTime(item.resolvedAt)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Claims summary — only when claims exist */}
          {claims.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <SectionLabel>Claims Summary</SectionLabel>
              <div className="mt-3 space-y-2.5">
                {(
                  [
                    [ClaimStatus.PENDING, "Pending", "text-amber-600"],
                    [ClaimStatus.APPROVED, "Approved", "text-blue-600"],
                    [ClaimStatus.COMPLETED, "Completed", "text-emerald-600"],
                    [ClaimStatus.REJECTED, "Rejected", "text-red-500"],
                  ] as [ClaimStatus, string, string][]
                ).map(([status, label, cls]) => {
                  const count = claims.filter((c) => c.status === status).length;
                  if (!count) return null;
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{label}</span>
                      <span className={cn("text-sm font-bold tabular-nums", cls)}>
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Description preview (en) */}
          {item.displayDescriptions?.en && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <SectionLabel>Description (EN)</SectionLabel>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {item.displayDescriptions.en}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
