import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuCalendar,
  LuCheck,
  LuChevronDown,
  LuDownload,
  LuExternalLink,
  LuImage,
  LuMail,
  LuMapPin,
  LuMessageSquare,
  LuMonitor,
  LuPhone,
  LuStar,
  LuTrash2,
} from "react-icons/lu";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Breadcrumb } from "@/components/ui";
import { ImageLightbox } from "@/components/file";
import { asset, cn, formatDate } from "@/lib";
import type { IFile } from "@/types";
import { alertService } from "@/services/alert.service";
import { FeedbackStatus, PermissionSlug } from "@/types/enum.type";
import { usePermissions } from "@/hooks";
import {
  useDeleteFeedbackMutation,
  useFetchFeedbackByIdQuery,
  useUpdateFeedbackStatusMutation,
} from "@/features/feedback/api";
import { FeedbackCategoryBadge, FeedbackStatusBadge } from "../components";

const STATUS_OPTIONS = [
  { value: FeedbackStatus.NEW, label: "New" },
  { value: FeedbackStatus.IN_PROGRESS, label: "In Progress" },
  { value: FeedbackStatus.RESOLVED, label: "Resolved" },
];

// ── Skeleton ──────────────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="h-64 animate-pulse rounded-xl bg-gray-100" />
        <div className="h-28 animate-pulse rounded-xl bg-gray-100" />
      </div>
      <div className="space-y-4">
        <div className="h-44 animate-pulse rounded-xl bg-gray-100" />
        <div className="h-36 animate-pulse rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}

// ── Info Row ──────────────────────────────────────────────────────────────────
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100">
        <Icon className="h-3.5 w-3.5 text-gray-500" />
      </div>
      <div>
        <p className="text-[11px] text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function FeedbackDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { can } = usePermissions();

  const { data: feedback, isLoading } = useFetchFeedbackByIdQuery(id!);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateFeedbackStatusMutation();
  const [deleteFeedback, { isLoading: isDeleting }] =
    useDeleteFeedbackMutation();

  const [selectedStatus, setSelectedStatus] = useState<FeedbackStatus | null>(
    null,
  );
  const [lightbox, setLightbox] = useState<{
    images: IFile[];
    index: number;
  } | null>(null);

  const canUpdate = can(PermissionSlug.FEEDBACK_UPDATE);
  const canDelete = can(PermissionSlug.FEEDBACK_DELETE);

  const handleStatusUpdate = async () => {
    if (!selectedStatus || !id) return;
    try {
      await updateStatus({ id, body: { status: selectedStatus } }).unwrap();
      await alertService.success(
        "Status Updated",
        "Feedback status has been updated.",
      );
      setSelectedStatus(null);
    } catch {
      await alertService.error("Failed to update status.");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const result = await alertService.confirmModal(
      "Delete Feedback",
      "Are you sure you want to delete this feedback? This action cannot be undone.",
    );
    if (!result.isConfirmed) return;
    try {
      await deleteFeedback(id).unwrap();
      await alertService.success("Deleted", "Feedback has been deleted.");
      navigate("/support/feedback");
    } catch {
      await alertService.error("Failed to delete feedback.");
    }
  };

  const breadcrumbItems = [
    { label: "Support" },
    { label: "Feedback", path: "/support/feedback", icon: LuMessageSquare },
    { label: "Detail" },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        <DetailSkeleton />
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <LuMessageSquare className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm text-gray-500">Feedback not found.</p>
        </div>
      </div>
    );
  }

  const selectedOption =
    STATUS_OPTIONS.find((o) => o.value === selectedStatus) ?? null;

  const isImageFile = (file: IFile) => file.mimeType.startsWith("image/");

  const imageFiles = (feedback.files ?? []).filter(isImageFile);
  const otherFiles = (feedback.files ?? []).filter((f) => !isImageFile(f));

  const openLightbox = useCallback(
    (file: IFile) => {
      const idx = imageFiles.findIndex((f) => f.id === file.id);
      setLightbox({ images: imageFiles, index: idx });
    },
    [imageFiles],
  );

  return (
    <div className="space-y-6">
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
      <Breadcrumb items={breadcrumbItems} />

      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("/support/feedback")}
          className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          <LuArrowLeft className="h-4 w-4" />
          Back to Feedback
        </button>

        {canDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
          >
            <LuTrash2 className="h-3.5 w-3.5" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>

      <div className="mt-2 grid gap-6 lg:grid-cols-3">
        {/* ── Left: main content ──────────────────────────────────────────── */}
        <div className="space-y-4 lg:col-span-2">
          {/* Overview card */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Card header bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 px-6 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <FeedbackCategoryBadge category={feedback.category} />
                <FeedbackStatusBadge status={feedback.status} />
              </div>
              <span className="text-xs text-gray-400">
                {formatDate(feedback.createdAt)}
              </span>
            </div>

            <div className="space-y-6 p-6">
              {/* Rating */}
              {feedback.rating && (
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Rating
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const filled = star <= Number(feedback.rating);
                        return (
                          <LuStar
                            key={star}
                            fill={filled ? "#facc15" : "none"}
                            className={cn(
                              "h-7 w-7",
                              filled ? "text-yellow-400" : "text-gray-200",
                            )}
                          />
                        );
                      })}
                    </div>
                    <span className="rounded-full bg-yellow-50 px-3 py-0.5 text-sm font-bold text-yellow-700 ring-1 ring-yellow-200">
                      {feedback.rating} / 5
                    </span>
                  </div>
                </div>
              )}

              {/* Comment */}
              {feedback.comment && (
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    Comment
                  </p>
                  <div className="border-primary/30 rounded-lg border-l-4 bg-gray-50 px-4 py-3">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-800">
                      {feedback.comment}
                    </p>
                  </div>
                </div>
              )}

              {/* Terminal & Specific Area */}
              {(feedback.terminal || feedback.specificArea) && (
                <div className="flex flex-wrap gap-4">
                  {feedback.terminal && (
                    <InfoRow
                      icon={LuMonitor}
                      label="Terminal"
                      value={
                        feedback.terminal === "A"
                          ? "International — Terminal A"
                          : "Domestic — Terminal B"
                      }
                    />
                  )}
                  {feedback.specificArea && (
                    <InfoRow
                      icon={LuMapPin}
                      label="Specific Area"
                      value={feedback.specificArea}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Attachments */}
          {feedback.files && feedback.files.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Attachments ({feedback.files.length})
              </p>

              {/* Image grid — click to open lightbox */}
              {imageFiles.length > 0 && (
                <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {imageFiles.map((file) => (
                    <button
                      key={file.id}
                      type="button"
                      onClick={() => openLightbox(file)}
                      className="group hover:border-primary relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-all hover:shadow-md"
                    >
                      <img
                        src={asset(file.path)}
                        alt={file.originalName}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                        <LuImage className="h-5 w-5 text-white opacity-0 drop-shadow transition-opacity group-hover:opacity-100" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Non-image files */}
              {otherFiles.length > 0 && (
                <div className="grid gap-2 sm:grid-cols-2">
                  {otherFiles.map((file) => (
                    <a
                      key={file.id}
                      href={asset(file.path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:border-primary hover:bg-primary/5 flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm transition-colors"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                        <LuDownload className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-gray-700">
                          {file.originalName}
                        </p>
                      </div>
                      <LuExternalLink className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Right: sidebar ──────────────────────────────────────────────── */}
        <div className="space-y-4 lg:pt-1">
          {/* Status update */}
          {canUpdate && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Update Status
              </p>

              <div className="mb-4 flex items-center gap-2">
                <span className="text-xs text-gray-400">Current:</span>
                <FeedbackStatusBadge status={feedback.status} />
              </div>

              <Listbox value={selectedStatus} onChange={setSelectedStatus}>
                {({ open }) => (
                  <div className="relative mb-3">
                    <ListboxButton
                      className={cn(
                        "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm",
                        "focus:ring-primary focus:border-transparent focus:ring-2 focus:outline-none",
                      )}
                    >
                      <span
                        className={
                          selectedOption ? "text-gray-800" : "text-gray-400"
                        }
                      >
                        {selectedOption
                          ? selectedOption.label
                          : "Select new status..."}
                      </span>
                      <LuChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-gray-400 transition-transform",
                          open && "rotate-180",
                        )}
                      />
                    </ListboxButton>

                    <ListboxOptions
                      modal={false}
                      className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <ListboxOption
                          key={opt.value}
                          value={opt.value}
                          className="data-[focus]:bg-primary/5 data-[selected]:text-primary flex cursor-pointer items-center justify-between px-3 py-2 text-sm data-[selected]:font-medium"
                        >
                          {({ selected: isSel }) => (
                            <>
                              <span>{opt.label}</span>
                              {isSel && (
                                <LuCheck className="text-primary h-4 w-4 shrink-0" />
                              )}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                )}
              </Listbox>

              <button
                type="button"
                onClick={handleStatusUpdate}
                disabled={!selectedStatus || isUpdating}
                className={cn(
                  "w-full rounded-lg py-2 text-sm font-medium text-white transition-colors",
                  "bg-primary hover:bg-primary-600",
                  (!selectedStatus || isUpdating) &&
                    "bg-primary/60 cursor-not-allowed",
                )}
              >
                {isUpdating ? "Updating..." : "Save Status"}
              </button>
            </div>
          )}

          {/* Contact info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Contact
            </p>
            {feedback.followUp ? (
              <div className="space-y-3">
                {feedback.email && (
                  <InfoRow icon={LuMail} label="Email" value={feedback.email} />
                )}
                {feedback.phone && (
                  <InfoRow
                    icon={LuPhone}
                    label="Phone"
                    value={feedback.phone}
                  />
                )}
                {!feedback.email && !feedback.phone && (
                  <p className="text-sm text-gray-400">
                    Follow-up requested — no contact details provided.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No follow-up requested</p>
            )}
          </div>

          {/* Metadata */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Details
            </p>
            <div className="space-y-3">
              <InfoRow
                icon={LuCalendar}
                label="Submitted"
                value={formatDate(feedback.createdAt)}
              />
              <InfoRow
                icon={LuCalendar}
                label="Last Updated"
                value={formatDate(feedback.updatedAt)}
              />
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <LuMessageSquare className="h-3.5 w-3.5 text-gray-500" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400">Category</p>
                  <p className="mt-0.5">
                    <FeedbackCategoryBadge category={feedback.category} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
