import { useRef, useState } from "react";
import { LuLoader, LuPlus, LuTrash2, LuX } from "react-icons/lu";
import { asset, cn } from "@/lib";
import { alertService } from "@/services/alert.service";
import {
  useFetchCareerActivitiesQuery,
  useUploadCareerActivityMutation,
  useDeleteCareerActivityMutation,
} from "@/features/careers/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityGalleryModal({ isOpen, onClose }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: activities, isLoading } = useFetchCareerActivitiesQuery(
    undefined,
    { skip: !isOpen },
  );
  const [uploadActivity] = useUploadCareerActivityMutation();
  const [deleteActivity] = useDeleteCareerActivityMutation();

  if (!isOpen) return null;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("image", file);
        await uploadActivity(fd).unwrap();
      }
    } catch {
      await alertService.error("Failed to upload one or more photos.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    const result = await alertService.confirmModal(
      "Delete photo?",
      "This photo will be removed from the careers gallery.",
    );
    if (!result.isConfirmed) return;
    try {
      await deleteActivity(id).unwrap();
    } catch {
      await alertService.error("Failed to delete photo.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Activity Gallery
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Photos displayed on the careers page
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LuLoader className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <>
              {/* Photo grid */}
              {activities && activities.length > 0 ? (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                    >
                      <img
                        src={asset(activity.image.path)}
                        alt={activity.caption?.en ?? "Activity photo"}
                        className="h-full w-full object-cover"
                      />
                      {/* Delete overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                        <button
                          type="button"
                          onClick={() => handleDelete(activity.id)}
                          className="scale-75 rounded-full bg-red-500 p-2 text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100"
                        >
                          <LuTrash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      {/* Inactive badge */}
                      {!activity.isActive && (
                        <span className="absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                          Hidden
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm text-gray-400">
                    No photos yet. Upload some to showcase company life.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer: upload */}
        <div className="border-t border-gray-100 px-6 py-4">
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
              "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors",
              "hover:border-primary hover:bg-primary/5 hover:text-primary",
              isUploading && "pointer-events-none opacity-60",
            )}
          >
            {isUploading ? (
              <LuLoader className="h-4 w-4 animate-spin" />
            ) : (
              <LuPlus className="h-4 w-4" />
            )}
            {isUploading ? "Uploading…" : "Upload photos"}
          </label>
          <p className="mt-1.5 text-[11px] text-gray-400">
            Multiple files supported. JPG, PNG, WebP.
          </p>
        </div>
      </div>
    </div>
  );
}
