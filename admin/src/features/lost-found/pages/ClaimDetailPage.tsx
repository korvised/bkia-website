import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  LuArrowLeft,
  LuCalendar,
  LuCheck,
  LuCircleCheck,
  LuClipboardList,
  LuClock,
  LuFileText,
  LuLink,
  LuMail,
  LuMapPin,
  LuPackage,
  LuPencil,
  LuPhone,
  LuPlane,
  LuPlus,
  LuRefreshCw,
  LuRotateCcw,
  LuSave,
  LuTag,
  LuTrash2,
  LuUnlink,
  LuUser,
  LuX,
  LuZoomIn,
} from "react-icons/lu";
import { ImageLightbox } from "@/components/file";
import { Breadcrumb } from "@/components/ui";
import { asset, cn, formatDate, formatDateTime } from "@/lib";
import { alertService } from "@/services/alert.service";
import type { IFile } from "@/types";
import { ClaimStatus, LostFoundCategory } from "@/types";
import {
  useFetchOneClaimQuery,
  useReviewClaimMutation,
  useUnlinkClaimMutation,
} from "@/features/lost-found/api";
import { usePermissions } from "@/hooks";
import { PermissionSlug } from "@/types/enum.type";
import {
  ClaimStatusBadge,
  LinkToItemModal,
  LostFoundStatusBadge,
} from "../components";

// ─── Config ─────────────────────────────────────────────────────────────────

const CLAIM_STATUS_CONFIG: Record<
  ClaimStatus,
  {
    accent: string;
    light: string;
    border: string;
    text: string;
    Icon: IconType;
    label: string;
  }
> = {
  [ClaimStatus.PENDING]: {
    accent: "#f59e0b",
    light: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    Icon: LuClock,
    label: "Pending Review",
  },
  [ClaimStatus.APPROVED]: {
    accent: "#3b82f6",
    light: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    Icon: LuCheck,
    label: "Approved",
  },
  [ClaimStatus.REJECTED]: {
    accent: "#ef4444",
    light: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
    Icon: LuX,
    label: "Rejected",
  },
  [ClaimStatus.COMPLETED]: {
    accent: "#10b981",
    light: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    Icon: LuCircleCheck,
    label: "Completed",
  },
};

const CATEGORY_CONFIG: Record<
  LostFoundCategory,
  { label: string; Icon: IconType }
> = {
  [LostFoundCategory.ELECTRONICS]: { label: "Electronics", Icon: LuTag },
  [LostFoundCategory.BAGGAGE]: { label: "Baggage", Icon: LuPackage },
  [LostFoundCategory.CLOTHING]: { label: "Clothing", Icon: LuTag },
  [LostFoundCategory.DOCUMENTS]: { label: "Documents", Icon: LuFileText },
  [LostFoundCategory.JEWELRY]: { label: "Jewelry", Icon: LuTag },
  [LostFoundCategory.KEYS]: { label: "Keys", Icon: LuTag },
  [LostFoundCategory.CASH]: { label: "Cash", Icon: LuTag },
  [LostFoundCategory.TOYS]: { label: "Toys", Icon: LuTag },
  [LostFoundCategory.OTHER]: { label: "Other", Icon: LuTag },
};

const NOTE_ACTION_CONFIG: Record<
  ClaimStatus,
  {
    label: string;
    confirmLabel: string;
    border: string;
    bg: string;
    titleColor: string;
    confirmBtn: string;
    placeholder: string;
  }
> = {
  [ClaimStatus.PENDING]: {
    label: "Undo",
    confirmLabel: "Confirm Undo",
    border: "border-gray-200",
    bg: "bg-gray-50/60",
    titleColor: "text-gray-600",
    confirmBtn: "bg-gray-700 hover:bg-gray-800 text-white",
    placeholder: "Reason for reverting this claim (optional)...",
  },
  [ClaimStatus.APPROVED]: {
    label: "Approve",
    confirmLabel: "Confirm Approval",
    border: "border-primary/20",
    bg: "bg-primary/[0.04]",
    titleColor: "text-primary",
    confirmBtn: "bg-primary hover:bg-primary-600 text-white",
    placeholder: "Add a note for the claimant or internal record (optional)...",
  },
  [ClaimStatus.REJECTED]: {
    label: "Reject",
    confirmLabel: "Confirm Rejection",
    border: "border-red-200",
    bg: "bg-red-50/50",
    titleColor: "text-red-600",
    confirmBtn: "bg-red-600 hover:bg-red-700 text-white",
    placeholder:
      "Explain why this claim is rejected (optional, visible to staff)...",
  },
  [ClaimStatus.COMPLETED]: {
    label: "Mark Returned",
    confirmLabel: "Confirm Return",
    border: "border-emerald-200",
    bg: "bg-emerald-50/50",
    titleColor: "text-emerald-700",
    confirmBtn: "bg-emerald-600 hover:bg-emerald-700 text-white",
    placeholder: "Add a handover note or return details (optional)...",
  },
};

// ─── Micro-components ───────────────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
      {children}
    </p>
  );
}

function InfoField({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType;
  label: string;
  value?: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-gray-800">{value}</p>
      </div>
    </div>
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
      <p className="mb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
        Attachments ({files.length})
      </p>
      <div className="flex flex-wrap gap-2">
        {files.map((f) =>
          isImg(f) ? (
            <button
              key={f.id}
              type="button"
              onClick={() =>
                onImageClick(
                  imgFiles,
                  imgFiles.findIndex((i) => i.id === f.id),
                )
              }
              className="group hover:ring-primary relative h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-all hover:ring-2 hover:ring-offset-1"
            >
              <img
                src={asset(f.path)}
                alt={f.originalName}
                className="h-full w-full object-cover"
              />
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

// ─── Main Page ──────────────────────────────────────────────────────────────

export function ClaimDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { can } = usePermissions();
  const canUpdate = can(PermissionSlug.LOST_FOUND_UPDATE);

  const {
    data: claim,
    isLoading,
    isError,
  } = useFetchOneClaimQuery(id!, { skip: !id });
  const [reviewClaim, { isLoading: isReviewing }] = useReviewClaimMutation();
  const [unlinkClaim, { isLoading: isUnlinking }] = useUnlinkClaimMutation();

  const [lightbox, setLightbox] = useState<{
    images: IFile[];
    index: number;
  } | null>(null);
  const [linkModalOpen, setLinkModalOpen] = useState(false);

  // ── Review action panel state ──
  const [pendingAction, setPendingAction] = useState<ClaimStatus | null>(null);
  const [actionNote, setActionNote] = useState("");
  const actionNoteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (pendingAction) {
      const tid = setTimeout(() => actionNoteRef.current?.focus(), 60);
      return () => clearTimeout(tid);
    }
  }, [pendingAction]);

  // ── Staff-note inline editor ──
  const [editingNote, setEditingNote] = useState(false);
  const [editNote, setEditNote] = useState("");
  const editNoteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editingNote) {
      const tid = setTimeout(() => editNoteRef.current?.focus(), 60);
      return () => clearTimeout(tid);
    }
  }, [editingNote]);

  // ── Handlers ──
  const openAction = (action: ClaimStatus) => {
    setEditingNote(false);
    setPendingAction(action);
    setActionNote("");
  };
  const cancelAction = () => {
    setPendingAction(null);
    setActionNote("");
  };

  const confirmAction = async () => {
    if (!pendingAction || !id || !claim) return;
    try {
      await reviewClaim({
        claimId: id,
        body: {
          status: pendingAction,
          staffNote: actionNote.trim() || undefined,
        },
        itemId: claim.lostFound?.id ?? "",
      }).unwrap();
      setPendingAction(null);
      setActionNote("");
    } catch {
      await alertService.error("Failed to update claim.");
    }
  };

  const openNoteEditor = () => {
    setPendingAction(null);
    setEditNote(claim?.staffNote ?? "");
    setEditingNote(true);
  };
  const cancelNoteEdit = () => setEditingNote(false);
  const saveNote = async () => {
    if (!id || !claim) return;
    try {
      await reviewClaim({
        claimId: id,
        body: { status: claim.status, staffNote: editNote.trim() || undefined },
        itemId: claim.lostFound?.id ?? "",
      }).unwrap();
      setEditingNote(false);
    } catch {
      await alertService.error("Failed to save note.");
    }
  };

  const handleUnlink = async () => {
    if (!id) return;
    const r = await alertService.confirmModal(
      "Unlink Claim",
      "This will remove the link between this claim and the lost & found item. Continue?",
    );
    if (!r.isConfirmed) return;
    try {
      await unlinkClaim({ claimId: id }).unwrap();
      await alertService.success("Unlinked", "Claim unlinked from item.");
    } catch {
      await alertService.error("Failed to unlink claim.");
    }
  };

  // ── Breadcrumb ──
  const baseBreadcrumb = [
    { label: "Support" },
    {
      label: "Lost & Found",
      path: "/support/lost-found?tab=claims",
      icon: LuClipboardList,
    },
  ];

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Breadcrumb items={[...baseBreadcrumb, { label: "Loading..." }]} />
        <div className="flex items-center justify-center py-20">
          <LuRefreshCw className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  // ── Error ──
  if (isError || !claim) {
    return (
      <div className="space-y-6">
        <Breadcrumb items={[...baseBreadcrumb, { label: "Not Found" }]} />
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <LuClipboardList className="mb-3 h-10 w-10 text-gray-300" />
          <p className="text-lg font-medium text-gray-600">Claim not found</p>
          <p className="mt-1 text-sm text-gray-400">
            The claim may have been deleted.
          </p>
          <button
            type="button"
            onClick={() => navigate("/support/lost-found?tab=claims")}
            className="bg-primary hover:bg-primary-600 mt-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white"
          >
            <LuArrowLeft className="h-4 w-4" />
            Back to Claims
          </button>
        </div>
      </div>
    );
  }

  const statusCfg = CLAIM_STATUS_CONFIG[claim.status];
  const actionCfg = pendingAction ? NOTE_ACTION_CONFIG[pendingAction] : null;
  const category = claim.category ?? claim.lostFound?.category;
  const categoryCfg = category ? CATEGORY_CONFIG[category] : null;
  const hasItemDesc =
    claim.itemDescription || claim.lostLocation || claim.lostDate;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[...baseBreadcrumb, { label: claim.referenceCode }]} />

      {/* Back + title row */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/support/lost-found?tab=claims")}
          className="rounded-lg border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-50"
        >
          <LuArrowLeft className="h-4 w-4" />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-bold text-gray-900">
              {claim.referenceCode}
            </h1>
            <ClaimStatusBadge status={claim.status} />
          </div>
          <p className="text-xs text-gray-500">
            Submitted {formatDateTime(claim.createdAt)}
            {claim.reviewedAt && claim.reviewedBy && (
              <>
                {" "}
                &middot; Reviewed by{" "}
                <span className="font-medium text-gray-600">
                  {claim.reviewedBy.name}
                </span>{" "}
                {formatDateTime(claim.reviewedAt)}
              </>
            )}
          </p>
        </div>
      </div>

      {/* ════════════════ Single card ════════════════ */}
      <div>
        <div
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          style={{ borderTopWidth: 3, borderTopColor: statusCfg.accent }}
        >
          {/* ── Section: Claimant ── */}
          <div className="px-6 pt-5 pb-5">
            <SectionHeader>Claimant</SectionHeader>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoField
                icon={LuUser}
                label="Name"
                value={claim.claimantName}
              />
              <InfoField
                icon={LuMail}
                label="Email"
                value={claim.claimantEmail}
              />
              <InfoField
                icon={LuPhone}
                label="Phone"
                value={claim.claimantPhone}
              />
              <InfoField
                icon={LuPlane}
                label="Flight"
                value={
                  claim.flightNumber
                    ? `${claim.flightNumber}${claim.seatNumber ? ` · Seat ${claim.seatNumber}` : ""}`
                    : null
                }
              />
            </div>
          </div>

          {/* ── Section: Item Description (standalone claims) ── */}
          {hasItemDesc && (
            <>
              <div className="border-t border-gray-100" />
              <div className="px-6 py-5">
                <SectionHeader>Item Description</SectionHeader>
                <div className="space-y-2.5">
                  {categoryCfg && (
                    <div className="flex items-center gap-2">
                      <categoryCfg.Icon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {categoryCfg.label}
                      </span>
                    </div>
                  )}
                  {claim.itemDescription && (
                    <p className="text-sm leading-relaxed text-gray-700">
                      {claim.itemDescription}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {claim.lostLocation && (
                      <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <LuMapPin className="h-3.5 w-3.5 text-gray-400" />
                        {claim.lostLocation}
                      </span>
                    )}
                    {claim.lostDate && (
                      <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <LuCalendar className="h-3.5 w-3.5 text-gray-400" />
                        {formatDate(claim.lostDate)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Section: Ownership Proof ── */}
          <div className="border-t border-gray-100" />
          <div className="px-6 py-5">
            <SectionHeader>Ownership Proof</SectionHeader>
            <p className="text-sm leading-relaxed text-gray-700">
              {claim.ownershipProof}
            </p>
            <ProofFiles
              files={claim.proofFiles ?? []}
              onImageClick={(images, idx) =>
                setLightbox({ images, index: idx })
              }
            />
          </div>

          {/* ── Section: Linked Item ── */}
          <div className="border-t border-gray-100" />
          <div className="px-6 py-5">
            <SectionHeader>Linked Item</SectionHeader>

            {claim.lostFound ? (
              <div className="flex items-center justify-between gap-3">
                <Link
                  to={`/support/lost-found/${claim.lostFound.id}`}
                  className="hover:border-primary/30 hover:bg-primary/[0.02] flex min-w-0 items-center gap-3 rounded-lg border border-gray-100 px-3 py-2.5 transition-colors"
                >
                  <LuLink className="text-primary h-4 w-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {claim.lostFound.displayNames?.en ||
                        claim.lostFound.displayNames?.lo ||
                        "Untitled"}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="font-mono text-[11px] text-gray-400">
                        {claim.lostFound.referenceCode}
                      </span>
                      <LostFoundStatusBadge status={claim.lostFound.status} />
                    </div>
                  </div>
                </Link>
                {canUpdate && (
                  <button
                    type="button"
                    onClick={handleUnlink}
                    disabled={isUnlinking}
                    className="shrink-0 rounded-lg border border-gray-200 p-2 text-gray-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                    title="Unlink from item"
                  >
                    {isUnlinking ? (
                      <LuRefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <LuUnlink className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-lg border border-dashed border-gray-200 bg-gray-50/50 px-4 py-3">
                <LuUnlink className="h-4 w-4 shrink-0 text-gray-300" />
                <p className="flex-1 text-sm text-gray-400">
                  Not linked to any item
                </p>
                {canUpdate && (
                  <button
                    type="button"
                    onClick={() => setLinkModalOpen(true)}
                    className="bg-primary hover:bg-primary-600 flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition"
                  >
                    <LuLink className="h-3.5 w-3.5" />
                    Link
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── Section: Staff Note ── */}
          <div className="border-t border-gray-100" />
          <div className="px-6 py-5">
            <SectionHeader>Staff Note</SectionHeader>

            {editingNote ? (
              <div className="rounded-lg border border-blue-200 bg-blue-50/60 px-3 py-3">
                <textarea
                  ref={editNoteRef}
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  rows={3}
                  maxLength={1000}
                  placeholder="Write a staff note..."
                  className="focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition outline-none focus:ring-2"
                />
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={saveNote}
                      disabled={isReviewing}
                      className="bg-primary hover:bg-primary-600 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
                    >
                      {isReviewing ? (
                        <LuRefreshCw className="h-3 w-3 animate-spin" />
                      ) : (
                        <LuSave className="h-3 w-3" />
                      )}
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelNoteEdit}
                      disabled={isReviewing}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    {claim.staffNote && (
                      <button
                        type="button"
                        onClick={() => setEditNote("")}
                        className="ml-1 text-xs text-gray-400 hover:text-red-500"
                        title="Clear note"
                      >
                        <LuTrash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-300 tabular-nums">
                    {editNote.length}/1000
                  </span>
                </div>
              </div>
            ) : claim.staffNote ? (
              <div className="group flex items-start justify-between gap-3 rounded-lg border border-blue-100 bg-blue-50/80 px-3.5 py-3">
                <p className="text-sm leading-relaxed text-blue-800">
                  {claim.staffNote}
                </p>
                {canUpdate && (
                  <button
                    type="button"
                    onClick={openNoteEditor}
                    disabled={isReviewing}
                    title="Edit note"
                    className="shrink-0 rounded-md p-1 text-blue-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-blue-100 hover:text-blue-600 disabled:opacity-0"
                  >
                    <LuPencil className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ) : canUpdate ? (
              <button
                type="button"
                onClick={openNoteEditor}
                disabled={isReviewing}
                className="hover:text-primary flex items-center gap-1.5 text-xs text-gray-400 transition-colors disabled:opacity-50"
              >
                <LuPlus className="h-3.5 w-3.5" />
                Add note
              </button>
            ) : (
              <p className="text-sm text-gray-400">No note</p>
            )}
          </div>

          {/* ── Section: Review Actions ── */}
          {canUpdate && (
            <>
              <div className="border-t border-gray-100" />
              <div className="bg-gray-50/40 px-6 py-5">
                {/* Action buttons */}
                {claim.status === ClaimStatus.PENDING && !pendingAction && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openAction(ClaimStatus.APPROVED)}
                      disabled={isReviewing}
                      className="bg-primary hover:bg-primary-600 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                    >
                      <LuCheck className="h-4 w-4" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => openAction(ClaimStatus.REJECTED)}
                      disabled={isReviewing}
                      className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      <LuX className="h-4 w-4" />
                      Reject
                    </button>
                  </div>
                )}
                {claim.status === ClaimStatus.APPROVED && !pendingAction && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => openAction(ClaimStatus.COMPLETED)}
                      disabled={isReviewing}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      <LuCircleCheck className="h-4 w-4" />
                      Mark Returned
                    </button>
                    <button
                      type="button"
                      onClick={() => openAction(ClaimStatus.PENDING)}
                      disabled={isReviewing}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <LuRotateCcw className="h-4 w-4" />
                      Undo
                    </button>
                  </div>
                )}
                {claim.status === ClaimStatus.REJECTED && !pendingAction && (
                  <div>
                    <button
                      type="button"
                      onClick={() => openAction(ClaimStatus.PENDING)}
                      disabled={isReviewing}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <LuRotateCcw className="h-4 w-4" />
                      Undo Rejection
                    </button>
                  </div>
                )}
                {claim.status === ClaimStatus.COMPLETED && !pendingAction && (
                  <div className="flex items-center gap-3 text-sm text-emerald-600">
                    <LuCircleCheck className="h-4 w-4" />
                    <span>Item has been returned to the claimant.</span>
                  </div>
                )}

                {/* Inline note panel (expand) */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: pendingAction ? "1fr" : "0fr",
                    transition:
                      "grid-template-rows 0.35s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <div className="overflow-hidden">
                    {actionCfg && (
                      <div
                        className={cn(
                          "mt-4 rounded-lg border px-4 py-4",
                          actionCfg.border,
                          actionCfg.bg,
                        )}
                      >
                        <p
                          className={cn(
                            "mb-2.5 flex items-center gap-1.5 text-xs font-semibold",
                            actionCfg.titleColor,
                          )}
                        >
                          {pendingAction === ClaimStatus.PENDING && (
                            <LuRotateCcw className="h-3.5 w-3.5" />
                          )}
                          {pendingAction === ClaimStatus.APPROVED && (
                            <LuCheck className="h-3.5 w-3.5" />
                          )}
                          {pendingAction === ClaimStatus.REJECTED && (
                            <LuX className="h-3.5 w-3.5" />
                          )}
                          {pendingAction === ClaimStatus.COMPLETED && (
                            <LuCircleCheck className="h-3.5 w-3.5" />
                          )}
                          {actionCfg.label}
                          <span className="font-normal opacity-60">
                            &mdash; add a note (optional)
                          </span>
                        </p>
                        <textarea
                          ref={actionNoteRef}
                          value={actionNote}
                          onChange={(e) => setActionNote(e.target.value)}
                          rows={3}
                          maxLength={1000}
                          placeholder={actionCfg.placeholder}
                          className="focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition outline-none focus:ring-2"
                        />
                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={confirmAction}
                              disabled={isReviewing}
                              className={cn(
                                "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50",
                                actionCfg.confirmBtn,
                              )}
                            >
                              {isReviewing ? (
                                <LuRefreshCw className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <LuCheck className="h-3.5 w-3.5" />
                              )}
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
                          <span className="text-[10px] text-gray-300 tabular-nums">
                            {actionNote.length}/1000
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Link to Item Modal */}
      {id && (
        <LinkToItemModal
          isOpen={linkModalOpen}
          onClose={() => setLinkModalOpen(false)}
          claimId={id}
        />
      )}

      {/* Image Lightbox */}
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
