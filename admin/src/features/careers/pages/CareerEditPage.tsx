import { useNavigate, useParams } from "react-router-dom";
import { LuBriefcase } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { alertService } from "@/services/alert.service";
import {
  useFetchJobPostByIdQuery,
  useUpdateJobPostMutation,
} from "@/features/careers/api";
import { CareerForm } from "../components";
import type { IJobPostSubmitPayload } from "../types";

function buildFormData(payload: IJobPostSubmitPayload): FormData {
  const fd = new FormData();
  fd.append("title", JSON.stringify(payload.title));
  fd.append("content", JSON.stringify(payload.content));
  fd.append("position", JSON.stringify(payload.position));
  fd.append("vacancyCount", String(payload.vacancyCount));
  fd.append("isPublished", String(payload.isPublished));
  fd.append("isFeatured", String(payload.isFeatured));
  fd.append("publishDate", payload.publishDate);
  if (payload.deadline) fd.append("deadline", payload.deadline);
  if (payload.coverImageFile) fd.append("coverImage", payload.coverImageFile);
  return fd;
}

export function CareerEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: job, isLoading: isFetching } = useFetchJobPostByIdQuery(id!, {
    skip: !id,
  });
  const [updateJobPost, { isLoading: isUpdating }] = useUpdateJobPostMutation();

  const handleSubmit = async (payload: IJobPostSubmitPayload) => {
    if (!id) return;
    try {
      await updateJobPost({ id, body: buildFormData(payload) }).unwrap();
      await alertService.success("Updated", "Job post updated successfully.");
      navigate("/content/careers");
    } catch {
      await alertService.error("Failed to update job post. Please try again.");
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Content" },
          { label: "Careers", icon: LuBriefcase, path: "/content/careers" },
          { label: "Edit" },
        ]}
      />

      <div className="flex items-center gap-3">
        <div className="bg-primary-100 rounded-lg p-2">
          <LuBriefcase className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Job Post</h1>
          <p className="text-sm text-gray-500">Update the job posting</p>
        </div>
      </div>

      <CareerForm
        defaultValues={job}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        submitLabel="Update Job Post"
      />
    </div>
  );
}
