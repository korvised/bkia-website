import { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import { Modal } from "@/components/ui/modal";
import { alertService } from "@/services/alert.service";
import {
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
} from "@/features/permission/api";
import type { IPermission, ICreatePermissionPayload } from "@/features/permission/types";

interface PermissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editPermission: IPermission | null;
}

export function PermissionFormModal({
  isOpen,
  onClose,
  editPermission,
}: PermissionFormModalProps) {
  const isEdit = !!editPermission;

  const [name, setName] = useState(editPermission?.name ?? "");
  const [slug, setSlug] = useState(editPermission?.slug ?? "");
  const [description, setDescription] = useState(
    editPermission?.description ?? "",
  );

  useEffect(() => {
    setName(editPermission?.name ?? "");
    setSlug(editPermission?.slug ?? "");
    setDescription(editPermission?.description ?? "");
  }, [isOpen, editPermission]);

  // Auto-generate slug from name (create mode only)
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit) {
      setSlug(val.toLowerCase().trim().replace(/\s+/g, ":"));
    }
  };

  const [createPermission, { isLoading: creating }] =
    useCreatePermissionMutation();
  const [updatePermission, { isLoading: updating }] =
    useUpdatePermissionMutation();
  const isLoading = creating || updating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updatePermission({
          id: editPermission.id,
          body: { name, description: description || undefined },
        }).unwrap();
        await alertService.success("Updated!", "Permission updated.");
      } else {
        const payload: ICreatePermissionPayload = {
          name,
          slug,
          description: description || undefined,
        };
        await createPermission(payload).unwrap();
        await alertService.success("Created!", "Permission created.");
      }
      onClose();
    } catch {
      await alertService.error("Something went wrong.", "Error");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Permission" : "Create Permission"}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Name <span className="text-danger">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            placeholder="e.g. Create Flight"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Slug <span className="text-danger">*</span>
          </label>
          {isEdit ? (
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
              <code className="text-xs text-gray-500">{editPermission.slug}</code>
              <span className="ml-2 text-xs text-gray-400">(cannot be changed)</span>
            </div>
          ) : (
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              required
              placeholder="e.g. flight:create"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="What does this permission allow?"
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:opacity-60"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <LuCheck className="h-4 w-4" />
            )}
            {isEdit ? "Save Changes" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
