import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  LuArrowLeft,
  LuCalendar,
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
  LuClock,
  LuFileText,
  LuInfo,
  LuLayoutDashboard,
  LuMail,
  LuMapPin,
  LuPackage,
  LuPackageCheck,
  LuPackageSearch,
  LuPencil,
  LuPhone,
  LuPlane,
  LuPlus,
  LuRefreshCw,
  LuRotateCcw,
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
  useUpdateStatusMutation,
  useUploadImagesMutation,
  useRemoveImageMutation,
  useReviewClaimMutation,
  useDeleteLostFoundMutation,
} from "@/features/lost-found/api";
import { usePermissions } from "@/hooks";
import { PermissionSlug } from "@/types/enum.type";
import { useGetLostFoundById } from "../hooks";
import { LostFoundStatusBadge } from "../components";
import type { ILostFoundClaim, IMultilingualText } from "../types";

// ─── Types / Config ──────────────────────────────────────────────────────────

type ActiveTab = "overview" | "edit" | "claims";

const STATUS_CONFIG: Record<
  LostFoundStatus,
  { accent: string; light: string; border: string; text: string; Icon: IconType; label: string; description: string }
> = {
  [LostFoundStatus.OPEN]: {
    accent: "#3b82f6", light: "bg-blue-50", border: "border-blue-200", text: "text-blue-700",
    Icon: LuPackage, label: "Open", description: "Awaiting a claim",
  },
  [LostFoundStatus.MATCHED]: {
    accent: "#f59e0b", light: "bg-amber-50", border: "border-amber-200", text: "text-amber-700",
    Icon: LuClock, label: "Matched", description: "Claim under review",
  },
  [LostFoundStatus.RETURNED]: {
    accent: "#10b981", light: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700",
    Icon: LuCircleCheck, label: "Returned", description: "Returned to owner",
  },
  [LostFoundStatus.DONATED]: {
    accent: "#8b5cf6", light: "bg-violet-50", border: "border-violet-200", text: "text-violet-700",
    Icon: LuPackageCheck, label: "Donated", description: "Item was donated",
  },
  [LostFoundStatus.DISPOSED]: {
    accent: "#6b7280", light: "bg-gray-50", border: "border-gray-200", text: "text-gray-600",
    Icon: LuTrash2, label: "Disposed", description: "Item was disposed",
  },
};

const CLAIM_STATUS_CONFIG: Record<
  ClaimStatus,
  { borderColor: string; bg: string; label: string; pill: string }
> = {
  [ClaimStatus.PENDING]: { borderColor: "border-l-amber-400", bg: "bg-amber-50/40", label: "Pending", pill: "bg-amber-100 text-amber-700" },
  [ClaimStatus.APPROVED]: { borderColor: "border-l-blue-400", bg: "bg-blue-50/30", label: "Approved", pill: "bg-blue-100 text-blue-700" },
  [ClaimStatus.REJECTED]: { borderColor: "border-l-red-400", bg: "bg-red-50/30", label: "Rejected", pill: "bg-red-100 text-red-700" },
  [ClaimStatus.COMPLETED]: { borderColor: "border-l-emerald-400", bg: "bg-emerald-50/30", label: "Completed", pill: "bg-emerald-100 text-emerald-700" },
};

const LANG_TABS: { key: keyof IMultilingualText; label: string; short: string }[] = [
  { key: "en", label: "English", short: "EN" },
  { key: "lo", label: "Lao", short: "ລາວ" },
  { key: "zh", label: "Chinese", short: "中文" },
];

const CLAIMS_PER_PAGE = 5;

// ─── Micro-components ────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
      {children}
    </p>
  );
}

function ProofFiles({ files, onImageClick }: { files: IFile[]; onImageClick: (images: IFile[], index: number) => void }) {
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
              key={f.id} type="button"
              onClick={() => onImageClick(imgFiles, imgFiles.findIndex((i) => i.id === f.id))}
              className="group relative h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-all hover:ring-2 hover:ring-primary hover:ring-offset-1"
            >
              <img src={asset(f.path)} alt={f.originalName} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <LuZoomIn className="h-4 w-4 text-white" />
              </div>
            </button>
          ) : (
            <a key={f.id} href={asset(f.path)} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
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

const NOTE_ACTION_CONFIG: Record<
  ClaimStatus.PENDING | ClaimStatus.APPROVED | ClaimStatus.REJECTED | ClaimStatus.COMPLETED,
  { label: string; confirmLabel: string; border: string; bg: string; titleColor: string; confirmBtn: string; placeholder: string }
> = {
  [ClaimStatus.PENDING]: {
    label:        "Undo",
    confirmLabel: "Confirm Undo",
    border:       "border-gray-200",
    bg:           "bg-gray-50/60",
    titleColor:   "text-gray-600",
    confirmBtn:   "bg-gray-700 hover:bg-gray-800 text-white",
    placeholder:  "Reason for reverting this claim (optional)…",
  },
  [ClaimStatus.APPROVED]: {
    label:        "Approve",
    confirmLabel: "Confirm Approval",
    border:       "border-primary/20",
    bg:           "bg-primary/[0.04]",
    titleColor:   "text-primary",
    confirmBtn:   "bg-primary hover:bg-primary-600 text-white",
    placeholder:  "Add a note for the claimant or internal record (optional)…",
  },
  [ClaimStatus.REJECTED]: {
    label:        "Reject",
    confirmLabel: "Confirm Rejection",
    border:       "border-red-200",
    bg:           "bg-red-50/50",
    titleColor:   "text-red-600",
    confirmBtn:   "bg-red-600 hover:bg-red-700 text-white",
    placeholder:  "Explain why this claim is rejected (optional, visible to staff)…",
  },
  [ClaimStatus.COMPLETED]: {
    label:        "Mark Returned",
    confirmLabel: "Confirm Return",
    border:       "border-emerald-200",
    bg:           "bg-emerald-50/50",
    titleColor:   "text-emerald-700",
    confirmBtn:   "bg-emerald-600 hover:bg-emerald-700 text-white",
    placeholder:  "Add a handover note or return details (optional)…",
  },
};

function ClaimCard({ claim, index, isReviewing, onReview, onImageClick }: {
  claim: ILostFoundClaim; index: number; isReviewing: boolean;
  onReview: (claimId: string, status: ClaimStatus, note?: string) => void;
  onImageClick: (images: IFile[], idx: number) => void;
}) {
  const cfg = CLAIM_STATUS_CONFIG[claim.status];

  // ── Review action panel ──────────────────────────────────────────────────
  const [pendingAction, setPendingAction] = useState<ClaimStatus.PENDING | ClaimStatus.APPROVED | ClaimStatus.REJECTED | ClaimStatus.COMPLETED | null>(null);
  const [actionNote, setActionNote] = useState("");
  const actionNoteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (pendingAction) {
      const tid = setTimeout(() => actionNoteRef.current?.focus(), 60);
      return () => clearTimeout(tid);
    }
  }, [pendingAction]);

  const openAction = (action: typeof pendingAction) => {
    setEditingNote(false);           // close note editor if open
    setPendingAction(action);
    setActionNote("");
  };
  const cancelAction = () => { setPendingAction(null); setActionNote(""); };
  const confirmAction = () => {
    if (!pendingAction) return;
    onReview(claim.id, pendingAction, actionNote.trim() || undefined);
    setPendingAction(null);
    setActionNote("");
  };
  const actionCfg = pendingAction ? NOTE_ACTION_CONFIG[pendingAction] : null;

  // ── Staff-note inline editor ─────────────────────────────────────────────
  const [editingNote, setEditingNote] = useState(false);
  const [editNote, setEditNote]       = useState("");
  const editNoteRef = useRef<HTMLTextAreaElement>(null);

  const openNoteEditor = () => {
    setPendingAction(null);          // close action panel if open
    setEditNote(claim.staffNote ?? "");
    setEditingNote(true);
  };
  const cancelNoteEdit = () => setEditingNote(false);
  const saveNote = () => {
    onReview(claim.id, claim.status, editNote.trim() || undefined);
    setEditingNote(false);
  };

  useEffect(() => {
    if (editingNote) {
      const tid = setTimeout(() => editNoteRef.current?.focus(), 60);
      return () => clearTimeout(tid);
    }
  }, [editingNote]);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={cn("rounded-xl border border-l-4 transition-colors", cfg.borderColor, cfg.bg, "border-gray-200")}>
      <div className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-300">#{index + 1}</span>
            <LuUser className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-900">{claim.claimantName}</span>
            <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", cfg.pill)}>{cfg.label}</span>
          </div>
          <span className="text-xs text-gray-400">{formatDateTime(claim.createdAt)}</span>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          {claim.claimantEmail && (
            <span className="flex items-center gap-1.5"><LuMail className="h-3 w-3 text-gray-400" />{claim.claimantEmail}</span>
          )}
          {claim.claimantPhone && (
            <span className="flex items-center gap-1.5"><LuPhone className="h-3 w-3 text-gray-400" />{claim.claimantPhone}</span>
          )}
          {claim.flightNumber && (
            <span className="flex items-center gap-1.5">
              <LuPlane className="h-3 w-3 text-gray-400" />{claim.flightNumber}
              {claim.seatNumber && <span className="text-gray-400">· Seat {claim.seatNumber}</span>}
            </span>
          )}
        </div>

        <div className="my-3 border-t border-gray-100" />

        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Ownership Proof</p>
        <p className="text-sm leading-relaxed text-gray-700">{claim.ownershipProof}</p>

        <ProofFiles files={claim.proofFiles ?? []} onImageClick={onImageClick} />

        {/* ── Staff Note (view / edit) ── */}
        <div className="mt-3">
          {editingNote ? (
            /* ─ Edit mode ─ */
            <div className="rounded-lg border border-blue-200 bg-blue-50/60 px-3 py-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-blue-500">
                <LuPencil className="mr-1 inline-block h-3 w-3" />Edit Staff Note
              </p>
              <textarea
                ref={editNoteRef}
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                rows={3}
                maxLength={1000}
                placeholder="Write a staff note…"
                className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <div className="mt-1 mb-2.5 flex justify-end">
                <span className="text-[10px] tabular-nums text-gray-300">{editNote.length}/1000</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={saveNote} disabled={isReviewing}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-600 disabled:opacity-50">
                  {isReviewing
                    ? <LuRefreshCw className="h-3 w-3 animate-spin" />
                    : <LuSave className="h-3 w-3" />}
                  Save Note
                </button>
                <button type="button" onClick={cancelNoteEdit} disabled={isReviewing}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                  Cancel
                </button>
                {claim.staffNote && (
                  <button type="button"
                    onClick={() => { setEditNote(""); }}
                    className="ml-auto text-xs text-gray-400 hover:text-red-500"
                    title="Clear note">
                    <LuTrash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : claim.staffNote ? (
            /* ─ View mode — note exists ─ */
            <div className="group rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">Staff Note</p>
                <button type="button" onClick={openNoteEditor} disabled={isReviewing}
                  title="Edit note"
                  className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium text-blue-400 opacity-0 transition-all hover:bg-blue-100 hover:text-blue-600 group-hover:opacity-100 disabled:opacity-0">
                  <LuPencil className="h-2.5 w-2.5" />Edit
                </button>
              </div>
              <p className="text-sm text-blue-800">{claim.staffNote}</p>
            </div>
          ) : (
            /* ─ View mode — no note yet (only for reviewed claims) ─ */
            claim.status !== ClaimStatus.PENDING && (
              <button type="button" onClick={openNoteEditor} disabled={isReviewing}
                className="flex items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-primary disabled:opacity-50">
                <LuPlus className="h-3.5 w-3.5" />Add staff note
              </button>
            )
          )}
        </div>

        {claim.reviewedAt && (
          <p className="mt-2 text-xs text-gray-400">Reviewed {formatDateTime(claim.reviewedAt)}</p>
        )}

        {/* ── Action buttons ── */}
        {claim.status === ClaimStatus.PENDING && !pendingAction && (
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => openAction(ClaimStatus.APPROVED)} disabled={isReviewing}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-600 disabled:opacity-50">
              <LuCheck className="h-3.5 w-3.5" />Approve
            </button>
            <button type="button" onClick={() => openAction(ClaimStatus.REJECTED)} disabled={isReviewing}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50">
              <LuX className="h-3.5 w-3.5" />Reject
            </button>
          </div>
        )}
        {claim.status === ClaimStatus.APPROVED && !pendingAction && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => openAction(ClaimStatus.COMPLETED)} disabled={isReviewing}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50">
              <LuCircleCheck className="h-3.5 w-3.5" />Mark Returned
            </button>
            <button type="button" onClick={() => openAction(ClaimStatus.PENDING)} disabled={isReviewing}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
              <LuRotateCcw className="h-3.5 w-3.5" />Undo Approval
            </button>
          </div>
        )}
        {claim.status === ClaimStatus.REJECTED && !pendingAction && (
          <div className="mt-4">
            <button type="button" onClick={() => openAction(ClaimStatus.PENDING)} disabled={isReviewing}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
              <LuRotateCcw className="h-3.5 w-3.5" />Undo Rejection
            </button>
          </div>
        )}
      </div>

      {/* ── Inline note panel (grid-row expand) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: pendingAction ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="overflow-hidden">
          {actionCfg && (
            <div className={cn("border-t px-4 py-4", actionCfg.border, actionCfg.bg)}>
              {/* Panel header */}
              <p className={cn("mb-2.5 text-xs font-semibold", actionCfg.titleColor)}>
                {pendingAction === ClaimStatus.PENDING   && <LuRotateCcw className="mr-1 inline-block h-3.5 w-3.5" />}
                {pendingAction === ClaimStatus.APPROVED  && <LuCheck className="mr-1 inline-block h-3.5 w-3.5" />}
                {pendingAction === ClaimStatus.REJECTED  && <LuX className="mr-1 inline-block h-3.5 w-3.5" />}
                {pendingAction === ClaimStatus.COMPLETED && <LuCircleCheck className="mr-1 inline-block h-3.5 w-3.5" />}
                {actionCfg.label} — Add a note{" "}
                <span className="font-normal opacity-60">(optional)</span>
              </p>

              {/* Textarea */}
              <textarea
                ref={actionNoteRef}
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                rows={3}
                maxLength={1000}
                placeholder={actionCfg.placeholder}
                className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <div className="mt-1 flex justify-end">
                <span className="text-[10px] text-gray-300 tabular-nums">{actionNote.length}/1000</span>
              </div>

              {/* Confirm / Cancel */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={confirmAction}
                  disabled={isReviewing}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50",
                    actionCfg.confirmBtn,
                  )}
                >
                  {isReviewing
                    ? <LuRefreshCw className="h-3.5 w-3.5 animate-spin" />
                    : <LuCheck className="h-3.5 w-3.5" />}
                  {actionCfg.confirmLabel}
                </button>
                <button
                  type="button"
                  onClick={cancelAction}
                  disabled={isReviewing}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export function LostFoundDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { can } = usePermissions();

  // Must be declared before useGetLostFoundById so the skip flag is ready on first render
  const [deleted, setDeleted] = useState(false);

  const {
    item, claims,
    isLoading, isFetching,
    isLoadingClaims, isClaimsFetching,
    isError, isClaimsError,
    handleBack, handleRefetch,
  } = useGetLostFoundById(id!, deleted);

  const [updateDisplay, { isLoading: isSavingDisplay }] = useUpdateDisplayMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateStatusMutation();
  const [uploadImages, { isLoading: isUploading }] = useUploadImagesMutation();
  const [removeImage, { isLoading: isRemoving }] = useRemoveImageMutation();
  const [reviewClaim, { isLoading: isReviewing }] = useReviewClaimMutation();
  const [deleteLostFound, { isLoading: isDeleting }] = useDeleteLostFoundMutation();
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [lightbox, setLightbox] = useState<{ images: IFile[]; index: number } | null>(null);
  const [selectedLang, setSelectedLang] = useState<keyof IMultilingualText>("en");
  const [displayNames, setDisplayNames] = useState<IMultilingualText>({});
  const [displayDescriptions, setDisplayDescriptions] = useState<IMultilingualText>({});
  const [displayLocations, setDisplayLocations] = useState<IMultilingualText>({});
  const [claimFilter, setClaimFilter] = useState<ClaimStatus | "all">("all");
  const [claimPage, setClaimPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!item) return;
    setDisplayNames(item.displayNames ?? {});
    setDisplayDescriptions(item.displayDescriptions ?? {});
    setDisplayLocations(item.displayLocations ?? {});
  }, [item]);

  useEffect(() => { setClaimPage(1); }, [claimFilter]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSaveDisplay = async () => {
    if (!id) return;
    try {
      await updateDisplay({ id, body: { displayNames, displayDescriptions, displayLocations } }).unwrap();
      await alertService.success("Saved", "Display fields updated.");
    } catch { await alertService.error("Failed to save."); }
  };

  const handleUpdateStatus = async (newStatus: LostFoundStatus) => {
    if (!id || newStatus === item?.status) return;
    const cfg = STATUS_CONFIG[newStatus];
    const result = await alertService.confirmModal(`Change to ${cfg.label}`, `${cfg.description}. Continue?`);
    if (!result.isConfirmed) return;
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
    } catch { await alertService.error("Failed to update status."); }
  };

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!id || !e.target.files?.length) return;
    const formData = new FormData();
    Array.from(e.target.files).forEach((f) => formData.append("images", f));
    e.target.value = "";
    try { await uploadImages({ id, formData }).unwrap(); }
    catch { await alertService.error("Failed to upload images."); }
  };

  const handleRemoveImage = async (fileId: string) => {
    if (!id) return;
    const r = await alertService.confirmModal("Remove Image", "This will permanently delete this image.");
    if (!r.isConfirmed) return;
    try { await removeImage({ id, fileId }).unwrap(); }
    catch { await alertService.error("Failed to remove image."); }
  };

  const handleReviewClaim = async (claimId: string, status: ClaimStatus, note?: string) => {
    if (!id) return;
    try {
      await reviewClaim({ claimId, body: { status, staffNote: note }, itemId: id }).unwrap();
    } catch { await alertService.error("Failed to update claim."); }
  };

  const handleDelete = async () => {
    if (!id) return;
    const r = await alertService.confirmModal(
      "Delete Report",
      `Delete "${item?.displayNames?.en ?? "this item"}"? Cannot be undone.`,
    );
    if (!r.isConfirmed) return;
    try {
      setDeleted(true);          // skip queries BEFORE delete triggers invalidation
      await deleteLostFound(id).unwrap();
      navigate("/support/lost-found");
    } catch {
      setDeleted(false);         // restore if delete failed
      await alertService.error("Failed to delete.");
    }
  };

  // ── Breadcrumb shared base ─────────────────────────────────────────────────

  const baseBreadcrumb = [
    { label: "Support" },
    { label: "Lost & Found", path: "/support/lost-found", icon: LuPackageSearch },
  ];

  // ── Loading / Error ────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Breadcrumb items={[...baseBreadcrumb, { label: "…" }]} />
        <div className="flex h-64 items-center justify-center rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm text-gray-400">Loading…</span>
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
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <LuInfo className="h-6 w-6 text-red-500" />
          </div>
          <p className="mb-1 font-semibold text-red-900">Record not found</p>
          <p className="mb-4 text-sm text-red-500">This item may have been deleted.</p>
          <button onClick={handleBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:underline">
            <LuArrowLeft className="h-4 w-4" />Back to Lost &amp; Found
          </button>
        </div>
      </div>
    );
  }

  // ── Derived values ─────────────────────────────────────────────────────────

  const statusCfg = STATUS_CONFIG[item.status];
  const itemName = item.displayNames?.en ?? item.displayNames?.lo ?? "—";
  const pendingCount = claims.filter((c) => c.status === ClaimStatus.PENDING).length;

  const filteredClaims = claimFilter === "all" ? claims : claims.filter((c) => c.status === claimFilter);
  const totalClaimPages = Math.max(1, Math.ceil(filteredClaims.length / CLAIMS_PER_PAGE));
  const pagedClaims = filteredClaims.slice((claimPage - 1) * CLAIMS_PER_PAGE, claimPage * CLAIMS_PER_PAGE);
  const claimCounts: Record<ClaimStatus | "all", number> = {
    all: claims.length,
    [ClaimStatus.PENDING]: claims.filter((c) => c.status === ClaimStatus.PENDING).length,
    [ClaimStatus.APPROVED]: claims.filter((c) => c.status === ClaimStatus.APPROVED).length,
    [ClaimStatus.REJECTED]: claims.filter((c) => c.status === ClaimStatus.REJECTED).length,
    [ClaimStatus.COMPLETED]: claims.filter((c) => c.status === ClaimStatus.COMPLETED).length,
  };

  const tabs: { key: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: "overview", label: "Overview", icon: <LuLayoutDashboard className="h-3.5 w-3.5" /> },
    { key: "edit", label: "Edit", icon: <LuPencil className="h-3.5 w-3.5" /> },
    { key: "claims", label: "Claims", icon: <LuShield className="h-3.5 w-3.5" />, badge: pendingCount },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {lightbox && (
        <ImageLightbox images={lightbox.images} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}

      <Breadcrumb items={[...baseBreadcrumb, { label: itemName }]} />

      {/* ═══════════════════ SINGLE CARD ═══════════════════════════════════════ */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* Status accent bar */}
        <div className="h-1 w-full transition-colors duration-300" style={{ backgroundColor: statusCfg.accent }} />

        {/* ── Card Header ──────────────────────────────────────────────────── */}
        <div className="px-6 pt-5 pb-0">
          <div className="flex items-start justify-between gap-4">

            {/* Left: back + identity */}
            <div className="flex min-w-0 items-start gap-3">
              <button type="button" onClick={handleBack}
                className="mt-0.5 shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
                <LuArrowLeft className="h-4 w-4" />
              </button>

              <div className="min-w-0">
                {/* Badges row */}
                <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                  <LostFoundStatusBadge status={item.status} />
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium capitalize text-gray-500">
                    <LuTag className="h-3 w-3 shrink-0" />
                    {item.category.toLowerCase()}
                  </span>
                </div>

                {/* Title */}
                <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  {itemName}
                </h1>

                {/* Meta chips */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <LuCalendar className="h-3 w-3 shrink-0" />{formatDate(item.incidentDate)}
                  </span>
                  {item.flightNumber && (
                    <span className="flex items-center gap-1">
                      <LuPlane className="h-3 w-3 shrink-0" />{item.flightNumber}
                    </span>
                  )}
                  {item.displayLocations?.en && (
                    <span className="flex items-center gap-1">
                      <LuMapPin className="h-3 w-3 shrink-0" />{item.displayLocations.en}
                    </span>
                  )}
                  {claims.length > 0 && (
                    <span className="flex items-center gap-1">
                      <LuShield className="h-3 w-3 shrink-0" />
                      {claims.length} claim{claims.length !== 1 ? "s" : ""}
                      {pendingCount > 0 && (
                        <span className="ml-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-700">
                          {pendingCount} pending
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: refetch + delete */}
            <div className="flex shrink-0 items-center gap-2 self-start">
              <button
                type="button"
                onClick={handleRefetch}
                disabled={isFetching || isClaimsFetching}
                title="Refresh data"
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                <LuRefreshCw className={cn("h-3.5 w-3.5", (isFetching || isClaimsFetching) && "animate-spin")} />
                Refresh
              </button>
              {can(PermissionSlug.LOST_FOUND_DELETE) && (
                <button type="button" onClick={handleDelete} disabled={isDeleting}
                  className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50">
                  {isDeleting ? <LuRefreshCw className="h-3.5 w-3.5 animate-spin" /> : <LuTrash2 className="h-3.5 w-3.5" />}
                  Delete
                </button>
              )}
            </div>
          </div>

          {/* ── Tab bar ────────────────────────────────────────────────────── */}
          <div className="mt-5 flex gap-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors rounded-t-lg",
                  activeTab === tab.key
                    ? "text-primary bg-gray-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/60",
                )}
              >
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                    {tab.badge}
                  </span>
                )}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab body (light gray bg to unify content area) ─────────────── */}
        <div className="border-t border-gray-100 bg-gray-50/40">

          {/* ════════ OVERVIEW ════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 divide-y divide-gray-100 lg:grid-cols-3 lg:divide-x lg:divide-y-0">

              {/* Left 2/3: Images + Status changer + Description */}
              <div className="p-6 lg:col-span-2">

                {/* ── Images ────────────────────────────────────────────── */}
                {item.images.length > 0 && (
                  <div className="mb-6">
                    <div className="mb-3 flex items-center justify-between">
                      <FieldLabel>Photos ({item.images.length})</FieldLabel>
                      <button type="button" onClick={() => setActiveTab("edit")}
                        className="text-xs font-medium text-primary hover:underline">
                        Manage →
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 xl:grid-cols-6">
                      {item.images.map((img, index) => (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => setLightbox({ images: item.images, index })}
                          className="group relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50 transition-all hover:ring-2 hover:ring-primary hover:ring-offset-1"
                          title={img.originalName}
                        >
                          <img
                            src={asset(img.path)}
                            alt={img.originalName}
                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
                            <LuZoomIn className="h-4 w-4 text-white drop-shadow" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Status changer ────────────────────────────────────── */}
                <FieldLabel>
                  {isUpdatingStatus ? (
                    <span className="flex items-center gap-1.5">
                      <LuRefreshCw className="h-3 w-3 animate-spin" />Updating…
                    </span>
                  ) : "Change Status"}
                </FieldLabel>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {(Object.values(LostFoundStatus) as LostFoundStatus[]).map((s) => {
                    const cfg = STATUS_CONFIG[s];
                    const Icon = cfg.Icon;
                    const isActive = item.status === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={isUpdatingStatus || isActive}
                        onClick={() => handleUpdateStatus(s)}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all",
                          isActive
                            ? `${cfg.border} ${cfg.light} shadow-sm`
                            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                            isActive ? "" : "bg-gray-100 group-hover:bg-gray-200",
                          )}
                          style={isActive ? { backgroundColor: `${cfg.accent}1a` } : undefined}
                        >
                          <Icon className="h-4 w-4" style={isActive ? { color: cfg.accent } : { color: "#9ca3af" }} />
                        </div>
                        <div className="min-w-0">
                          <p className={cn("text-sm font-semibold", isActive ? cfg.text : "text-gray-700")}>
                            {cfg.label}
                            {isActive && <span className="ml-1 text-xs font-normal opacity-60">· current</span>}
                          </p>
                          <p className="text-xs text-gray-400">{cfg.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Description preview */}
                {item.displayDescriptions?.en && (
                  <div className="mt-5 rounded-xl bg-white border border-gray-100 p-4">
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                      Description (EN)
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600">{item.displayDescriptions.en}</p>
                    <button type="button" onClick={() => setActiveTab("edit")}
                      className="mt-2 text-xs font-medium text-primary hover:underline">
                      Edit →
                    </button>
                  </div>
                )}
              </div>

              {/* Right 1/3: Record info + quick stats */}
              <div className="p-6 space-y-5">

                {/* Record info */}
                <div>
                  <FieldLabel>Record Info</FieldLabel>

                  {/* Created By user card */}
                  {item.createdBy ? (
                    <div className="mb-4 overflow-hidden rounded-xl border border-gray-100 bg-white">
                      {/* Avatar row */}
                      <div className="flex items-center gap-3 px-3 py-3">
                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-sm font-bold text-primary ring-2 ring-white">
                          {item.createdBy.name.charAt(0).toUpperCase()}
                          {/* Online-style badge */}
                          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {item.createdBy.name}
                          </p>
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                            <LuShield className="h-2.5 w-2.5" />
                            Staff
                          </span>
                        </div>
                      </div>

                      {/* Contact rows */}
                      <div className="divide-y divide-gray-50 border-t border-gray-50">
                        <a
                          href={`mailto:${item.createdBy.email}`}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-500 transition-colors hover:bg-gray-50 hover:text-primary"
                        >
                          <LuMail className="h-3.5 w-3.5 shrink-0 text-gray-300" />
                          <span className="min-w-0 truncate">{item.createdBy.email}</span>
                        </a>
                        {item.createdBy.phoneNumber && (
                          <a
                            href={`tel:${item.createdBy.phoneNumber}`}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-500 transition-colors hover:bg-gray-50 hover:text-primary"
                          >
                            <LuPhone className="h-3.5 w-3.5 shrink-0 text-gray-300" />
                            <span className="min-w-0 truncate">{item.createdBy.phoneNumber}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 flex items-center gap-2 rounded-xl border border-dashed border-gray-200 px-3 py-2.5 text-xs text-gray-400">
                      <LuUser className="h-4 w-4 shrink-0 text-gray-300" />
                      <span>No creator info</span>
                    </div>
                  )}

                  {/* Timestamps + reference */}
                  <div className="space-y-2 text-xs">
                    {item.referenceCode && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-400">Ref #</span>
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-gray-600 select-all">
                          {item.referenceCode}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between gap-2">
                      <span className="text-gray-400">Created</span>
                      <span className="text-right font-medium text-gray-600">{formatDateTime(item.createdAt)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-gray-400">Updated</span>
                      <span className="text-right font-medium text-gray-600">{formatDateTime(item.updatedAt)}</span>
                    </div>
                    {item.resolvedAt && (
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400">Resolved</span>
                        <span className="text-right font-medium text-emerald-600">{formatDateTime(item.resolvedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Language dots */}
                <div className="border-t border-gray-100 pt-5">
                  <FieldLabel>Content Languages</FieldLabel>
                  <div className="space-y-2">
                    {LANG_TABS.map(({ key, label }) => {
                      const dots = [item.displayNames?.[key], item.displayDescriptions?.[key], item.displayLocations?.[key]];
                      return (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{label}</span>
                          <div className="flex items-center gap-1">
                            {dots.map((v, i) => (
                              <span key={i} className={cn("h-2 w-2 rounded-full", v ? "bg-emerald-400" : "bg-gray-200")} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button type="button" onClick={() => setActiveTab("edit")}
                    className="mt-2.5 text-xs font-medium text-primary hover:underline">
                    Edit translations →
                  </button>
                </div>

                {/* Claims quick summary */}
                {claims.length > 0 && (
                  <div className="border-t border-gray-100 pt-5">
                    <FieldLabel>Claims</FieldLabel>
                    <div className="space-y-1.5">
                      {([
                        [ClaimStatus.PENDING, "Pending", "text-amber-600"],
                        [ClaimStatus.APPROVED, "Approved", "text-primary"],
                        [ClaimStatus.COMPLETED, "Completed", "text-emerald-600"],
                        [ClaimStatus.REJECTED, "Rejected", "text-red-500"],
                      ] as [ClaimStatus, string, string][]).map(([s, label, cls]) => {
                        const count = claimCounts[s];
                        if (!count) return null;
                        return (
                          <div key={s} className="flex items-center justify-between">
                            <button type="button"
                              onClick={() => { setClaimFilter(s); setActiveTab("claims"); }}
                              className="text-xs text-gray-500 hover:text-primary hover:underline">
                              {label}
                            </button>
                            <span className={cn("text-sm font-bold tabular-nums", cls)}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                    <button type="button" onClick={() => setActiveTab("claims")}
                      className="mt-2.5 text-xs font-medium text-primary hover:underline">
                      View all →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ════════ EDIT ════════════════════════════════════════════════════ */}
          {activeTab === "edit" && (
            <div className="divide-y divide-gray-100">

              {/* Images section */}
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <FieldLabel>Photos ({item.images.length})</FieldLabel>
                  <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50">
                    {isUploading ? <LuRefreshCw className="h-3.5 w-3.5 animate-spin" /> : <LuPlus className="h-3.5 w-3.5" />}
                    Upload
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUploadImages} />
                </div>

                {item.images.length === 0 ? (
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="group flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-10 text-gray-400 transition-colors hover:border-primary hover:text-primary">
                    <div className="rounded-xl border-2 border-dashed border-current p-3">
                      <LuPlus className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Upload item images</span>
                    <span className="text-xs text-gray-300 group-hover:text-primary/60">JPG, PNG, WEBP</span>
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {item.images.map((img, idx) => (
                      <div key={img.id} className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                        {/* Preview image */}
                        <button
                          type="button"
                          className="block w-full"
                          onClick={() => setLightbox({ images: item.images, index: idx })}
                        >
                          <img
                            src={asset(img.path)}
                            alt={img.originalName}
                            className="aspect-[4/3] w-full object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                        </button>

                        {/* Hover overlay with actions */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        <div className="absolute left-2 top-2 flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => setLightbox({ images: item.images, index: idx })}
                            className="pointer-events-auto flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[11px] font-medium text-gray-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                          >
                            <LuZoomIn className="h-3 w-3" />
                            Preview
                          </button>
                        </div>
                        <div className="absolute right-2 top-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(img.id)}
                            disabled={isRemoving}
                            className="pointer-events-auto rounded-lg bg-white/90 p-1.5 text-red-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                            title="Remove image"
                          >
                            <LuTrash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Filename bar */}
                        <div className="flex items-center gap-1.5 border-t border-gray-100 bg-white px-2.5 py-2">
                          <LuFileText className="h-3 w-3 shrink-0 text-gray-300" />
                          <span className="truncate text-[11px] text-gray-500">{img.originalName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Display fields section */}
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <FieldLabel>Website Display Content</FieldLabel>
                    <p className="mt-0.5 text-xs text-gray-400">Public-facing text in all languages</p>
                  </div>
                  <button type="button" onClick={handleSaveDisplay} disabled={isSavingDisplay}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white",
                      "transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50",
                    )}>
                    {isSavingDisplay ? <LuRefreshCw className="h-4 w-4 animate-spin" /> : <LuSave className="h-4 w-4" />}
                    Save
                  </button>
                </div>

                {/* Lang tabs */}
                <div className="mb-5 flex border-b border-gray-100">
                  {LANG_TABS.map(({ key, short }) => (
                    <button key={key} type="button" onClick={() => setSelectedLang(key)}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-colors",
                        selectedLang === key ? "text-primary" : "text-gray-400 hover:text-gray-600",
                      )}>
                      {short}
                      {selectedLang === key && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                      Item Name{selectedLang === "en" && <span className="ml-1 text-red-400">*</span>}
                    </label>
                    <input type="text"
                      value={displayNames[selectedLang] ?? ""}
                      onChange={(e) => setDisplayNames((p) => ({ ...p, [selectedLang]: e.target.value }))}
                      placeholder={`Name in ${LANG_TABS.find((l) => l.key === selectedLang)?.label}…`}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Description</label>
                    <textarea rows={4}
                      value={displayDescriptions[selectedLang] ?? ""}
                      onChange={(e) => setDisplayDescriptions((p) => ({ ...p, [selectedLang]: e.target.value }))}
                      placeholder="Describe the item…"
                      className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Location Found / Lost</label>
                    <input type="text"
                      value={displayLocations[selectedLang] ?? ""}
                      onChange={(e) => setDisplayLocations((p) => ({ ...p, [selectedLang]: e.target.value }))}
                      placeholder="e.g. Terminal B, Gate 12…"
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15"
                    />
                  </div>
                </div>

                {/* Lang completeness pills */}
                <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
                  {LANG_TABS.map(({ key, short }) => {
                    const filled = !!(displayNames[key] || displayDescriptions[key] || displayLocations[key]);
                    return (
                      <span key={key} onClick={() => setSelectedLang(key)}
                        className={cn(
                          "cursor-pointer rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                          filled ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400 hover:bg-gray-200",
                        )}>
                        {short} {filled ? "✓" : "—"}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ════════ CLAIMS ══════════════════════════════════════════════════ */}
          {activeTab === "claims" && (
            <div className="p-6">

              {/* Filter bar */}
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <FieldLabel>Claims · {filteredClaims.length} of {claims.length}</FieldLabel>
                  {pendingCount > 0 && (
                    <p className="text-xs text-amber-600">{pendingCount} awaiting review</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(["all", ClaimStatus.PENDING, ClaimStatus.APPROVED, ClaimStatus.REJECTED, ClaimStatus.COMPLETED] as const).map((f) => {
                    const count = claimCounts[f];
                    const label = f === "all" ? "All" : CLAIM_STATUS_CONFIG[f].label;
                    const isActive = claimFilter === f;
                    return (
                      <button key={f} type="button"
                        onClick={() => setClaimFilter(f)}
                        disabled={count === 0 && f !== "all"}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all",
                          isActive
                            ? "bg-primary text-white shadow-sm"
                            : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
                          count === 0 && f !== "all" && "cursor-not-allowed opacity-40",
                        )}>
                        {label}
                        <span className={cn(
                          "rounded-full px-1.5 py-px text-[10px] font-bold tabular-nums",
                          isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500",
                        )}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Loading */}
              {isLoadingClaims && (
                <div className="flex justify-center py-12">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              )}

              {/* Error */}
              {isClaimsError && (
                <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-red-200 bg-red-50 py-10 text-center">
                  <LuInfo className="h-8 w-8 text-red-300" />
                  <p className="text-sm font-medium text-red-500">Failed to load claims</p>
                </div>
              )}

              {/* Empty */}
              {!isLoadingClaims && !isClaimsError && filteredClaims.length === 0 && (
                <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
                  <LuShield className="h-8 w-8 text-gray-300" />
                  <p className="text-sm font-medium text-gray-400">
                    {claims.length === 0 ? "No claims yet" : "No claims match this filter"}
                  </p>
                  <p className="text-xs text-gray-300">
                    {claims.length === 0
                      ? "Claims appear here when customers submit them on the website"
                      : "Try selecting a different status"}
                  </p>
                </div>
              )}

              {/* Claim cards */}
              {!isLoadingClaims && !isClaimsError && pagedClaims.length > 0 && (
                <div className="space-y-3">
                  {pagedClaims.map((claim, i) => (
                    <ClaimCard
                      key={claim.id}
                      claim={claim}
                      index={(claimPage - 1) * CLAIMS_PER_PAGE + i}
                      isReviewing={isReviewing}
                      onReview={(claimId, status, note) => handleReviewClaim(claimId, status, note)}
                      onImageClick={(imgs, idx) => setLightbox({ images: imgs, index: idx })}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!isLoadingClaims && !isClaimsError && totalClaimPages > 1 && (
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-400">
                    Page {claimPage} of {totalClaimPages}
                  </span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setClaimPage((p) => Math.max(1, p - 1))}
                      disabled={claimPage === 1}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40">
                      <LuChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    {Array.from({ length: totalClaimPages }, (_, i) => i + 1).map((p) => (
                      <button key={p} type="button" onClick={() => setClaimPage(p)}
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-medium transition-colors",
                          p === claimPage ? "bg-primary text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50",
                        )}>
                        {p}
                      </button>
                    ))}
                    <button type="button" onClick={() => setClaimPage((p) => Math.min(totalClaimPages, p + 1))}
                      disabled={claimPage === totalClaimPages}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40">
                      <LuChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>{/* end tab body */}
      </div>{/* end single card */}
    </div>
  );
}
