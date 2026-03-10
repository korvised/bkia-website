import { useNavigate } from "react-router-dom";
import { LuBell } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { alertService } from "@/services/alert.service";
import { useCreateNoticeMutation } from "@/features/notice/api";
import { NoticeForm } from "../components";
import type { ICreateNoticePayload } from "../types";

export function NoticeCreatePage() {
  const navigate = useNavigate();
  const [createNotice, { isLoading }] = useCreateNoticeMutation();

  const handleSubmit = async (payload: ICreateNoticePayload) => {
    try {
      await createNotice(payload).unwrap();
      await alertService.success("Created", "Notice has been created successfully.");
      navigate("/content/notices");
    } catch {
      await alertService.error("Failed to create notice. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Content" },
          { label: "Notices", icon: LuBell, path: "/content/notices" },
          { label: "Create" },
        ]}
      />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary-100 rounded-lg p-2">
          <LuBell className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Notice</h1>
          <p className="text-sm text-gray-500">
            Add a new airport announcement or notice
          </p>
        </div>
      </div>

      <NoticeForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Notice"
      />
    </div>
  );
}
