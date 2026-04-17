import { useNavigate } from "react-router-dom";
import { LuNewspaper } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { alertService } from "@/services/alert.service";
import { useCreateNewsMutation } from "@/features/news/api";
import { NewsForm } from "../components";
import type { INewsSubmitPayload } from "../types";

function buildFormData(payload: INewsSubmitPayload): FormData {
  const fd = new FormData();
  fd.append("slug", payload.slug);
  fd.append("title", JSON.stringify(payload.title));
  fd.append("excerpt", JSON.stringify(payload.excerpt));
  fd.append("content", JSON.stringify(payload.content));
  fd.append("category", payload.category);
  if (payload.author) fd.append("author", payload.author);
  fd.append("publishDate", payload.publishDate);
  fd.append("isFeatured", String(payload.isFeatured));
  fd.append("isPublished", String(payload.isPublished));
  if (payload.tags && payload.tags.length > 0)
    fd.append("tags", JSON.stringify(payload.tags));
  if (payload.metaDescription)
    fd.append("metaDescription", JSON.stringify(payload.metaDescription));
  if (payload.coverImageFile)
    fd.append("coverImage", payload.coverImageFile);
  // Gallery images (no keepImageIds on create)
  for (const file of payload.galleryFiles) {
    fd.append("images", file);
  }
  return fd;
}

export function NewsCreatePage() {
  const navigate = useNavigate();
  const [createNews, { isLoading }] = useCreateNewsMutation();

  const handleSubmit = async (payload: INewsSubmitPayload) => {
    try {
      await createNews(buildFormData(payload)).unwrap();
      await alertService.success("Created", "News article has been created successfully.");
      navigate("/content/news");
    } catch {
      await alertService.error("Failed to create news article. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Content" },
          { label: "News", icon: LuNewspaper, path: "/content/news" },
          { label: "Create" },
        ]}
      />

      <div className="flex items-center gap-3">
        <div className="bg-primary-100 rounded-lg p-2">
          <LuNewspaper className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Article</h1>
          <p className="text-sm text-gray-500">Write a new news article</p>
        </div>
      </div>

      <NewsForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Article"
      />
    </div>
  );
}
