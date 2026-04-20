import { useNavigate } from "react-router-dom";
import { LuBriefcase } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { alertService } from "@/services/alert.service";
import { useCreateJobPostMutation } from "@/features/careers/api";
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

export function CareerCreatePage() {
  const navigate = useNavigate();
  const [createJobPost, { isLoading }] = useCreateJobPostMutation();

  const handleSubmit = async (payload: IJobPostSubmitPayload) => {
    try {
      await createJobPost(buildFormData(payload)).unwrap();
      await alertService.success("Created", "Job post published successfully.");
      navigate("/content/careers");
    } catch {
      await alertService.error("Failed to create job post. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Content" },
          { label: "Careers", icon: LuBriefcase, path: "/content/careers" },
          { label: "Create" },
        ]}
      />

      <div className="flex items-center gap-3">
        <div className="bg-primary-100 rounded-lg p-2">
          <LuBriefcase className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Job Post</h1>
          <p className="text-sm text-gray-500">Create a new job posting</p>
        </div>
      </div>

      <CareerForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Job Post"
      />
    </div>
  );
}
