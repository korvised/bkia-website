import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuBriefcase,
  LuCalendar,
  LuGripVertical,
  LuImage,
  LuLoader,
  LuPencil,
  LuPlus,
  LuSave,
  LuStar,
  LuTrash2,
  LuUsers,
} from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { asset, cn } from "@/lib";
import { alertService } from "@/services/alert.service";
import {
  useFetchJobPostsQuery,
  useDeleteJobPostMutation,
  useUpdateJobPostMutation,
  useFetchCareerActivitiesQuery,
  useUploadCareerActivityMutation,
  useDeleteCareerActivityMutation,
  useReorderCareerActivitiesMutation,
} from "@/features/careers/api";
import type { ICareerActivity } from "@/features/careers/types";

type Tab = "jobs" | "gallery";

// ── Status / deadline badges ──────────────────────────────────────────────────

function StatusBadge({ isPublished }: { isPublished: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        isPublished
          ? "bg-green-50 text-green-700"
          : "bg-gray-100 text-gray-500",
      )}
    >
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}

function DeadlineBadge({ deadline }: { deadline?: string | null }) {
  if (!deadline) return <span className="text-xs text-gray-400">—</span>;
  const now = new Date();
  const d = new Date(deadline);
  const expired = d < now;
  const soon =
    !expired &&
    Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) <= 7;
  return (
    <span
      className={cn(
        "text-xs",
        expired
          ? "font-medium text-red-600"
          : soon
            ? "font-medium text-amber-600"
            : "text-gray-600",
      )}
    >
      {deadline.split("T")[0]}
    </span>
  );
}

// ── Activity Gallery inline panel ─────────────────────────────────────────────

function ActivityGalleryPanel() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [localOrder, setLocalOrder] = useState<ICareerActivity[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [recentlyMovedId, setRecentlyMovedId] = useState<string | null>(null);
  const dragIndex = useRef<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);

  const { data: activities, isLoading } = useFetchCareerActivitiesQuery();
  const [uploadActivity] = useUploadCareerActivityMutation();
  const [deleteActivity] = useDeleteCareerActivityMutation();
  const [reorderActivities] = useReorderCareerActivitiesMutation();

  // Sync local order whenever the API data changes (after upload/delete/save)
  useEffect(() => {
    if (activities) {
      setLocalOrder([...activities]);
      setIsDirty(false);
    }
  }, [activities]);

  // ── Upload ────────────────────────────────────────────────────────────────
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const fileArr = Array.from(files);
      for (let i = 0; i < fileArr.length; i++) {
        const fd = new FormData();
        fd.append("image", fileArr[i]);
        // Append at the end of the current list so new photos don't jump to position 0
        fd.append("sortOrder", String(localOrder.length + i));
        await uploadActivity(fd).unwrap();
      }
    } catch {
      await alertService.error("Failed to upload one or more photos.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    const result = await alertService.confirmModal(
      "Delete photo?",
      "This photo will be permanently removed from the gallery.",
    );
    if (!result.isConfirmed) return;
    try {
      await deleteActivity(id).unwrap();
    } catch {
      await alertService.error("Failed to delete photo.");
    }
  };

  // ── Drag to reorder ───────────────────────────────────────────────────────
  const handleDragStart = (index: number) => {
    dragIndex.current = index;
    setDraggingId(localOrder[index].id); // track by stable ID, not position
  };

  const handleDragEnter = (index: number) => {
    if (dragIndex.current === null || dragIndex.current === index) return;
    dragOverIndex.current = index;
    const next = [...localOrder];
    const [moved] = next.splice(dragIndex.current, 1);
    next.splice(index, 0, moved);
    dragIndex.current = index;
    setLocalOrder(next);
    // draggingId stays the same — the item's ID doesn't change as it moves
  };

  const handleDragEnd = () => {
    const movedId = draggingId;
    dragIndex.current = null;
    dragOverIndex.current = null;
    setDraggingId(null);
    setIsDirty(
      localOrder.some((item, i) => item.id !== (activities ?? [])[i]?.id),
    );
    // Mark which item just landed so the user can see where it ended up
    if (movedId) setRecentlyMovedId(movedId);
  };

  // ── Save order ────────────────────────────────────────────────────────────
  const handleSaveOrder = async () => {
    setIsSaving(true);
    try {
      await reorderActivities({ ids: localOrder.map((a) => a.id) }).unwrap();
      await alertService.success("Saved", "Gallery order updated.");
      setIsDirty(false);
      setRecentlyMovedId(null);
    } catch {
      await alertService.error("Failed to save order.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LuLoader className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Toolbar row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Drag photos to reorder. Changes are not saved until you click{" "}
          <strong>Save Order</strong>.
        </p>
        <div className="flex items-center gap-2">
          {isDirty && (
            <button
              type="button"
              onClick={handleSaveOrder}
              disabled={isSaving}
              className={cn(
                "flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-600",
                isSaving && "cursor-not-allowed opacity-60",
              )}
            >
              {isSaving ? (
                <LuLoader className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <LuSave className="h-3.5 w-3.5" />
              )}
              Save Order
            </button>
          )}
          {/* Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            id="gallery-upload"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <label
            htmlFor="gallery-upload"
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors",
              "hover:border-primary hover:bg-primary/5 hover:text-primary",
              isUploading && "pointer-events-none opacity-50",
            )}
          >
            {isUploading ? (
              <LuLoader className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <LuPlus className="h-3.5 w-3.5" />
            )}
            {isUploading ? "Uploading…" : "Upload photos"}
          </label>
        </div>
      </div>

      {/* Gallery grid */}
      {localOrder.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
          <LuImage className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm text-gray-400">
            No photos yet. Upload some to showcase company life.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {localOrder.map((activity, i) => {
            const isDragging = activity.id === draggingId;
            const wasMoved = activity.id === recentlyMovedId;
            return (
              <div
                key={activity.id}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragEnter={() => handleDragEnter(i)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={cn(
                  "group relative aspect-square cursor-grab overflow-hidden rounded-xl bg-gray-100 transition-all duration-200 active:cursor-grabbing",
                  isDragging && "opacity-40",
                  wasMoved && "ring-2 ring-primary ring-offset-2",
                )}
              >
                <img
                  src={asset(activity.image.path)}
                  alt={activity.caption?.en ?? "Activity photo"}
                  className="h-full w-full object-cover"
                  draggable={false}
                />

                {/* Order badge — teal when just moved */}
                <span
                  className={cn(
                    "absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white transition-colors duration-300",
                    wasMoved ? "bg-primary" : "bg-black/60",
                  )}
                >
                  {i + 1}
                </span>

                {/* Hidden badge */}
                {!activity.isActive && (
                  <span className="absolute right-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    Hidden
                  </span>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    {/* Drag hint */}
                    <LuGripVertical className="h-4 w-4 text-white/70" />
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(activity.id)}
                      className="rounded-lg bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600"
                      title="Delete"
                    >
                      <LuTrash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[11px] text-gray-400">
        {localOrder.length} photo{localOrder.length !== 1 ? "s" : ""} — JPG,
        PNG, WebP supported
      </p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function CareersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("jobs");

  const { data: jobs, isLoading } = useFetchJobPostsQuery();
  const [deleteJobPost] = useDeleteJobPostMutation();
  const [updateJobPost] = useUpdateJobPostMutation();

  const handleToggleFeatured = async (id: string, current: boolean) => {
    const fd = new FormData();
    fd.append("isFeatured", String(!current));
    try {
      await updateJobPost({ id, body: fd }).unwrap();
    } catch {
      await alertService.error("Failed to update featured status.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const result = await alertService.confirmModal(
      "Delete job post?",
      `"${title}" will be permanently removed.`,
    );
    if (!result.isConfirmed) return;
    try {
      await deleteJobPost(id).unwrap();
      await alertService.success("Deleted", "Job post removed.");
    } catch {
      await alertService.error("Failed to delete the job post.");
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: "jobs",
      label: "Job Postings",
      icon: <LuBriefcase className="h-4 w-4" />,
    },
    {
      key: "gallery",
      label: "Activity Gallery",
      icon: <LuImage className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Content" }, { label: "Careers", icon: LuBriefcase }]}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <LuBriefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Careers</h1>
            <p className="text-sm text-gray-500">
              Manage job postings and company gallery
            </p>
          </div>
        </div>

        {activeTab === "jobs" && (
          <button
            type="button"
            onClick={() => navigate("/content/careers/create")}
            className={cn(
              "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors",
              "hover:bg-primary-600",
            )}
          >
            <LuPlus className="h-4 w-4" />
            New Job Post
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700",
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Job Postings tab */}
      {activeTab === "jobs" && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <span className="h-7 w-7 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : !jobs || jobs.length === 0 ? (
            <div className="py-16 text-center">
              <LuBriefcase className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-sm text-gray-500">No job posts yet.</p>
              <button
                type="button"
                onClick={() => navigate("/content/careers/create")}
                className="mt-3 text-sm font-medium text-primary hover:underline"
              >
                Create the first one →
              </button>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-3 text-left">Position / Title</th>
                  <th className="hidden px-4 py-3 text-left sm:table-cell">
                    <span className="flex items-center gap-1">
                      <LuUsers className="h-3.5 w-3.5" />
                      Vacancies
                    </span>
                  </th>
                  <th className="hidden px-4 py-3 text-left md:table-cell">
                    <span className="flex items-center gap-1">
                      <LuCalendar className="h-3.5 w-3.5" />
                      Publish Date
                    </span>
                  </th>
                  <th className="hidden px-4 py-3 text-left lg:table-cell">
                    Deadline
                  </th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center" title="Featured on home page">
                    <span className="flex items-center justify-center gap-1">
                      <LuStar className="h-3.5 w-3.5" />
                      Featured
                    </span>
                  </th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className={cn(
                      "transition-colors hover:bg-gray-50/60",
                      job.isFeatured && "bg-amber-50/40",
                    )}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">
                        {job.title.en || job.title.lo || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {job.position.en || job.position.lo}
                      </p>
                    </td>
                    <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">
                      {job.vacancyCount}
                    </td>
                    <td className="hidden px-4 py-3 text-gray-600 md:table-cell">
                      {job.publishDate?.split("T")[0] ?? "—"}
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">
                      <DeadlineBadge deadline={job.deadline} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge isPublished={job.isPublished} />
                    </td>
                    {/* Featured toggle */}
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(job.id, job.isFeatured)}
                        title={job.isFeatured ? "Remove from home page" : "Pin to home page"}
                        className={cn(
                          "inline-flex items-center justify-center rounded-lg p-1.5 transition-colors",
                          job.isFeatured
                            ? "text-amber-500 hover:bg-amber-50 hover:text-amber-600"
                            : "text-gray-300 hover:bg-gray-100 hover:text-gray-500",
                        )}
                      >
                        <LuStar
                          className="h-4 w-4"
                          fill={job.isFeatured ? "currentColor" : "none"}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/content/careers/${job.id}/edit`)
                          }
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                          title="Edit"
                        >
                          <LuPencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              job.id,
                              job.title.en || job.title.lo || "Untitled",
                            )
                          }
                          className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <LuTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Activity Gallery tab */}
      {activeTab === "gallery" && <ActivityGalleryPanel />}
    </div>
  );
}
