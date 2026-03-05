import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuCalendar,
  LuCheck,
  LuEye,
  LuEyeOff,
  LuFileText,
  LuGlobe,
  LuImage,
  LuInfo,
  LuMail,
  LuPackageSearch,
  LuPhone,
  LuPlus,
  LuRefreshCw,
  LuSave,
  LuShield,
  LuStar,
  LuTrash2,
  LuUser,
  LuX,
  LuZoomIn,
} from "react-icons/lu";
import { ImageLightbox } from "@/components/file";
import { Breadcrumb } from "@/components/ui";
import { asset, cn, formatDate, formatDateTime } from "@/lib";
import { alertService } from "@/services/alert.service";
import { ClaimStatus, LostFoundVisibility } from "@/types";
import type { IFile } from "@/types";
import {
  useUpdateDisplayMutation,
  useUpdateVisibilityMutation,
  useSetCoverMutation,
  useUploadImagesMutation,
  useRemoveImageMutation,
  useReviewClaimMutation,
} from "@/features/lost-found/api";
import { useGetLostFoundById } from "../hooks";
import {
  LostFoundStatusBadge,
  LostFoundTypeBadge,
  LostFoundVisibilityBadge,
} from "../components";
import type { IMultilingualText } from "../types";

// ─── Claim Status Badge ───────────────────────────────────────────────────────

function ClaimStatusBadge({ status }: { status: ClaimStatus }) {
  const styles: Record<ClaimStatus, string> = {
    [ClaimStatus.PENDING]: "bg-yellow-100 text-yellow-700",
    [ClaimStatus.APPROVED]: "bg-blue-100 text-blue-700",
    [ClaimStatus.REJECTED]: "bg-red-100 text-red-700",
    [ClaimStatus.COMPLETED]: "bg-green-100 text-green-700",
  };
  const labels: Record<ClaimStatus, string> = {
    [ClaimStatus.PENDING]: "Pending",
    [ClaimStatus.APPROVED]: "Approved",
    [ClaimStatus.REJECTED]: "Rejected",
    [ClaimStatus.COMPLETED]: "Completed",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}

// ─── Proof Files ──────────────────────────────────────────────────────────────

function ProofFiles({
  files,
  onImageClick,
}: {
  files: IFile[];
  onImageClick: (images: IFile[], index: number) => void;
}) {
  if (!files || files.length === 0) return null;

  const isImage = (f: IFile) => f.mimeType.startsWith("image/");
  const imageFiles = files.filter(isImage);

  return (
    <div className="mt-3">
      <p className="mb-2 text-xs font-medium text-gray-500">
        Proof Files ({files.length})
      </p>
      <div className="flex flex-wrap gap-2">
        {files.map((f) =>
          isImage(f) ? (
            // Image thumbnail — click to open lightbox
            <button
              key={f.id}
              type="button"
              onClick={() =>
                onImageClick(imageFiles, imageFiles.findIndex((img) => img.id === f.id))
              }
              className="group relative h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-opacity hover:opacity-90"
              title={f.originalName}
            >
              <img
                src={asset(f.path)}
                alt={f.originalName}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <LuZoomIn className="h-5 w-5 text-white" />
              </div>
            </button>
          ) : (
            // PDF / other file — open in new tab
            <a
              key={f.id}
              href={asset(f.path)}
              target="_blank"
              rel="noopener noreferrer"
              title={f.originalName}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
            >
              <LuFileText className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="max-w-[140px] truncate">{f.originalName}</span>
            </a>
          ),
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function LostFoundDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { item, claims, isLoading, isLoadingClaims, isError, handleBack } =
    useGetLostFoundById(id!);

  // mutations
  const [updateDisplay, { isLoading: isSavingDisplay }] =
    useUpdateDisplayMutation();
  const [updateVisibility, { isLoading: isSavingVisibility }] =
    useUpdateVisibilityMutation();
  const [setCover, { isLoading: isSettingCover }] = useSetCoverMutation();
  const [uploadImages, { isLoading: isUploading }] = useUploadImagesMutation();
  const [removeImage, { isLoading: isRemoving }] = useRemoveImageMutation();
  const [reviewClaim, { isLoading: isReviewing }] = useReviewClaimMutation();

  // Lightbox state
  const [lightbox, setLightbox] = useState<{ images: IFile[]; index: number } | null>(
    null,
  );

  // Display fields state
  const [displayNames, setDisplayNames] = useState<IMultilingualText>({});
  const [displayDescriptions, setDisplayDescriptions] =
    useState<IMultilingualText>({});
  const [displayLocations, setDisplayLocations] = useState<IMultilingualText>(
    {},
  );
  const [displayLoaded, setDisplayLoaded] = useState(false);

  // Visibility state
  const [hideReason, setHideReason] = useState("");

  // Image upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate display fields once item loads
  if (item && !displayLoaded) {
    setDisplayNames(item.displayNames ?? {});
    setDisplayDescriptions(item.displayDescriptions ?? {});
    setDisplayLocations(item.displayLocations ?? {});
    setDisplayLoaded(true);
  }

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleSaveDisplay = async () => {
    if (!id) return;
    try {
      await updateDisplay({
        id,
        body: { displayNames, displayDescriptions, displayLocations },
      }).unwrap();
      await alertService.success("Saved", "Display fields updated.");
    } catch {
      await alertService.error("Failed to save display fields.");
    }
  };

  const handlePublish = async () => {
    if (!id) return;
    const result = await alertService.confirmModal(
      "Publish Item",
      "This will make the item visible on the public website.",
    );
    if (!result.isConfirmed) return;
    try {
      await updateVisibility({
        id,
        body: { visibility: LostFoundVisibility.VISIBLE },
      }).unwrap();
      await alertService.success("Published", "Item is now visible on the website.");
    } catch {
      await alertService.error("Failed to publish item.");
    }
  };

  const handleHide = async () => {
    if (!id || !hideReason.trim()) {
      await alertService.error("Please provide a reason for hiding.");
      return;
    }
    const result = await alertService.confirmModal(
      "Hide Item",
      "This will hide the item from the public website.",
    );
    if (!result.isConfirmed) return;
    try {
      await updateVisibility({
        id,
        body: { visibility: LostFoundVisibility.HIDDEN, hideReason },
      }).unwrap();
      setHideReason("");
      await alertService.success("Hidden", "Item is now hidden from the website.");
    } catch {
      await alertService.error("Failed to hide item.");
    }
  };

  const handleSetCover = async (fileId: string) => {
    if (!id) return;
    try {
      await setCover({ id, fileId }).unwrap();
    } catch {
      await alertService.error("Failed to set cover image.");
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
    const result = await alertService.confirmModal(
      "Remove Image",
      "This will permanently delete this image.",
    );
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

  // ── Render ────────────────────────────────────────────────────────────────

  const breadcrumbs = (
    <Breadcrumb
      items={[
        { label: "Support" },
        {
          label: "Lost & Found",
          path: "/support/lost-found",
          icon: LuPackageSearch,
        },
        { label: item?.referenceCode ?? "..." },
      ]}
    />
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        {breadcrumbs}
        <div className="flex h-96 items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-3 border-t-transparent" />
            <span className="text-gray-500">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="space-y-6">
        {breadcrumbs}
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <LuInfo className="mx-auto mb-4 h-10 w-10 text-red-400" />
          <h3 className="mb-2 text-lg font-semibold text-red-900">
            Item Not Found
          </h3>
          <button
            onClick={handleBack}
            className="text-primary mt-2 inline-flex items-center gap-2 text-sm font-medium hover:underline"
          >
            <LuArrowLeft className="h-4 w-4" />
            Back to Lost & Found
          </button>
        </div>
      </div>
    );
  }

  const LANG_FIELDS: { key: keyof IMultilingualText; label: string }[] = [
    { key: "en", label: "English" },
    { key: "lo", label: "Lao" },
    { key: "zh", label: "Chinese" },
  ];

  return (
    <div className="space-y-6">
      {/* Lightbox overlay */}
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      {breadcrumbs}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
          >
            <LuArrowLeft className="h-5 w-5" />
          </button>
          <div className="bg-primary-100 rounded-lg p-2">
            <LuPackageSearch className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{item.itemName}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-gray-500">
                {item.referenceCode}
              </span>
              <LostFoundTypeBadge type={item.type} />
              <LostFoundStatusBadge status={item.status} />
              <LostFoundVisibilityBadge visibility={item.visibility} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* ── LEFT COLUMN (2/3) ──────────────────────────────────────────── */}
        <div className="space-y-6 xl:col-span-2">
          {/* Item Details */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
              <LuInfo className="text-primary h-4 w-4" />
              Item Details
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Category</p>
                <p className="mt-1 text-sm font-medium capitalize text-gray-900">
                  {item.category.toLowerCase()}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Incident Date</p>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {formatDate(item.incidentDate)}
                </p>
              </div>
              {item.location && (
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {item.location}
                  </p>
                </div>
              )}
              {item.flightNumber && (
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Flight No.</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {item.flightNumber}
                  </p>
                </div>
              )}
            </div>
            {item.description && (
              <div className="mt-4">
                <p className="mb-1 text-xs text-gray-500">Description</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  {item.description}
                </p>
              </div>
            )}
          </div>

          {/* Item Images */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <LuImage className="text-primary h-4 w-4" />
                Images ({item.images.length})
              </h2>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
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
              <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center text-sm text-gray-400">
                No images uploaded
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {item.images.map((img) => {
                  const isCover = item.coverImage?.id === img.id;
                  return (
                    <div
                      key={img.id}
                      className={cn(
                        "group relative overflow-hidden rounded-lg border-2",
                        isCover
                          ? "border-primary"
                          : "border-transparent hover:border-gray-200",
                      )}
                    >
                      {/* Click to open lightbox */}
                      <button
                        type="button"
                        className="block w-full"
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
                          className="aspect-square w-full object-cover"
                        />
                      </button>

                      {isCover && (
                        <span className="bg-primary pointer-events-none absolute top-1.5 left-1.5 flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium text-white">
                          <LuStar className="h-3 w-3" />
                          Cover
                        </span>
                      )}

                      {/* Hover actions */}
                      <div className="absolute right-1.5 bottom-1.5 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        {!isCover && (
                          <button
                            type="button"
                            onClick={() => handleSetCover(img.id)}
                            disabled={isSettingCover}
                            title="Set as cover"
                            className="rounded-full bg-white/90 p-1.5 text-gray-700 shadow hover:bg-white"
                          >
                            <LuStar className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(img.id)}
                          disabled={isRemoving}
                          title="Remove image"
                          className="rounded-full bg-white/90 p-1.5 text-red-600 shadow hover:bg-white"
                        >
                          <LuTrash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Display Fields (multilingual) */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <LuGlobe className="text-primary h-4 w-4" />
                Website Display Fields
              </h2>
              <button
                type="button"
                onClick={handleSaveDisplay}
                disabled={isSavingDisplay}
                className={cn(
                  "bg-primary flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-white",
                  "hover:bg-primary-600 transition-colors",
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

            <div className="space-y-5">
              {/* Display Names */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Display Name
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {LANG_FIELDS.map(({ key, label }) => (
                    <div key={key}>
                      <label className="mb-1 block text-xs text-gray-500">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={displayNames[key] ?? ""}
                        onChange={(e) =>
                          setDisplayNames((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        placeholder={`Name in ${label}`}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Display Descriptions */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Display Description
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {LANG_FIELDS.map(({ key, label }) => (
                    <div key={key}>
                      <label className="mb-1 block text-xs text-gray-500">
                        {label}
                      </label>
                      <textarea
                        rows={3}
                        value={displayDescriptions[key] ?? ""}
                        onChange={(e) =>
                          setDisplayDescriptions((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        placeholder={`Description in ${label}`}
                        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Display Locations */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Display Location
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {LANG_FIELDS.map(({ key, label }) => (
                    <div key={key}>
                      <label className="mb-1 block text-xs text-gray-500">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={displayLocations[key] ?? ""}
                        onChange={(e) =>
                          setDisplayLocations((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        placeholder={`Location in ${label}`}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Claims */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
              <LuShield className="text-primary h-4 w-4" />
              Claims ({claims.length})
            </h2>

            {isLoadingClaims && (
              <div className="py-8 text-center text-sm text-gray-400">
                Loading claims...
              </div>
            )}

            {!isLoadingClaims && claims.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center text-sm text-gray-400">
                No claims submitted
              </div>
            )}

            <div className="space-y-4">
              {claims.map((claim) => (
                <div
                  key={claim.id}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  {/* Claim header row */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <LuUser className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {claim.claimantName}
                        </span>
                        <ClaimStatusBadge status={claim.status} />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <LuMail className="h-3.5 w-3.5" />
                        {claim.claimantEmail}
                      </div>
                      {claim.claimantPhone && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <LuPhone className="h-3.5 w-3.5" />
                          {claim.claimantPhone}
                        </div>
                      )}
                    </div>

                    {/* Review actions */}
                    {claim.status === ClaimStatus.PENDING && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleReviewClaim(claim.id, ClaimStatus.APPROVED)
                          }
                          disabled={isReviewing}
                          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          <LuCheck className="h-3.5 w-3.5" />
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleReviewClaim(claim.id, ClaimStatus.REJECTED)
                          }
                          disabled={isReviewing}
                          className="flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          <LuX className="h-3.5 w-3.5" />
                          Reject
                        </button>
                      </div>
                    )}
                    {claim.status === ClaimStatus.APPROVED && (
                      <button
                        type="button"
                        onClick={() =>
                          handleReviewClaim(claim.id, ClaimStatus.COMPLETED)
                        }
                        disabled={isReviewing}
                        className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        <LuCheck className="h-3.5 w-3.5" />
                        Mark Returned
                      </button>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="my-3 border-t border-gray-200" />

                  {/* Ownership proof text */}
                  <div>
                    <p className="mb-1 text-xs font-medium text-gray-500">
                      Ownership Proof
                    </p>
                    <p className="text-sm text-gray-700">{claim.ownershipProof}</p>
                  </div>

                  {/* Proof files: images + PDFs */}
                  <ProofFiles
                    files={claim.proofFiles ?? []}
                    onImageClick={(images, index) => setLightbox({ images, index })}
                  />

                  {/* Staff note */}
                  {claim.staffNote && (
                    <div className="mt-3 rounded-lg bg-blue-50 px-3 py-2">
                      <p className="mb-0.5 text-xs font-medium text-blue-600">
                        Staff Note
                      </p>
                      <p className="text-sm text-blue-800">{claim.staffNote}</p>
                    </div>
                  )}

                  {/* Timestamp */}
                  <p className="mt-3 text-xs text-gray-400">
                    Submitted {formatDateTime(claim.createdAt)}
                    {claim.reviewedAt && (
                      <> · Reviewed {formatDateTime(claim.reviewedAt)}</>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (1/3) ─────────────────────────────────────────── */}
        <div className="space-y-6">
          {/* Visibility Controls */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
              <LuEye className="text-primary h-4 w-4" />
              Website Visibility
            </h2>

            <div className="mb-4">
              <LostFoundVisibilityBadge visibility={item.visibility} />
              {item.visibility === LostFoundVisibility.HIDDEN && item.hideReason && (
                <p className="mt-2 text-xs text-gray-500">
                  Reason: {item.hideReason}
                </p>
              )}
            </div>

            {item.visibility !== LostFoundVisibility.VISIBLE && (
              <button
                type="button"
                onClick={handlePublish}
                disabled={isSavingVisibility}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white",
                  "hover:bg-emerald-700 transition-colors",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                {isSavingVisibility ? (
                  <LuRefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <LuEye className="h-4 w-4" />
                )}
                Publish to Website
              </button>
            )}

            {item.visibility === LostFoundVisibility.VISIBLE && (
              <div className="space-y-2">
                <textarea
                  rows={2}
                  value={hideReason}
                  onChange={(e) => setHideReason(e.target.value)}
                  placeholder="Reason for hiding (required)"
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleHide}
                  disabled={isSavingVisibility || !hideReason.trim()}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-600",
                    "hover:bg-red-50 transition-colors",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                  )}
                >
                  {isSavingVisibility ? (
                    <LuRefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <LuEyeOff className="h-4 w-4" />
                  )}
                  Hide from Website
                </button>
              </div>
            )}
          </div>

          {/* Reporter Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
              <LuUser className="text-primary h-4 w-4" />
              Reporter
            </h2>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">
                {item.reporterName}
              </p>
              <a
                href={`mailto:${item.reporterEmail}`}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
              >
                <LuMail className="h-4 w-4" />
                {item.reporterEmail}
              </a>
              {item.reporterPhone && (
                <a
                  href={`tel:${item.reporterPhone}`}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  <LuPhone className="h-4 w-4" />
                  {item.reporterPhone}
                </a>
              )}
            </div>
          </div>

          {/* Record Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
              <LuCalendar className="text-primary h-4 w-4" />
              Record Info
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Created</p>
                <p className="mt-0.5 text-sm font-medium text-gray-900">
                  {formatDateTime(item.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Updated</p>
                <p className="mt-0.5 text-sm font-medium text-gray-900">
                  {formatDateTime(item.updatedAt)}
                </p>
              </div>
              {item.resolvedAt && (
                <div>
                  <p className="text-xs text-gray-500">Resolved At</p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900">
                    {formatDateTime(item.resolvedAt)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
