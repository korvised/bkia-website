import { useNavigate, useParams } from "react-router-dom";
import { LuBell } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { alertService } from "@/services/alert.service";
import {
  useFetchNoticeByIdQuery,
  useUpdateNoticeMutation,
} from "@/features/notice/api";
import { NoticeForm } from "../components";
import type { ICreateNoticePayload } from "../types";

export function NoticeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: notice, isLoading: isFetching } = useFetchNoticeByIdQuery(
    id!,
    { skip: !id },
  );
  const [updateNotice, { isLoading: isUpdating }] = useUpdateNoticeMutation();

  const handleSubmit = async (payload: ICreateNoticePayload) => {
    if (!id) return;
    try {
      await updateNotice({ id, body: payload }).unwrap();
      await alertService.success("Updated", "Notice has been updated successfully.");
      navigate("/content/notices");
    } catch {
      await alertService.error("Failed to update notice. Please try again.");
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Content" },
          { label: "Notices", icon: LuBell, path: "/content/notices" },
          { label: "Edit" },
        ]}
      />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary-100 rounded-lg p-2">
          <LuBell className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Notice</h1>
          <p className="text-sm text-gray-500">
            Update the notice details
          </p>
        </div>
      </div>

      <NoticeForm
        defaultValues={notice}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        submitLabel="Update Notice"
      />
    </div>
  );
}
