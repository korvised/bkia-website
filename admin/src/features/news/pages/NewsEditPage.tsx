import { useNavigate, useParams } from "react-router-dom";
import { LuNewspaper } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { alertService } from "@/services/alert.service";
import { useFetchNewsByIdQuery, useUpdateNewsMutation } from "@/features/news/api";
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
  return fd;
}

export function NewsEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: news, isLoading: isFetching } = useFetchNewsByIdQuery(id!, {
    skip: !id,
  });
  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation();

  const handleSubmit = async (payload: INewsSubmitPayload) => {
    if (!id) return;
    try {
      await updateNews({ id, body: buildFormData(payload) }).unwrap();
      await alertService.success("Updated", "News article has been updated successfully.");
      navigate("/content/news");
    } catch {
      await alertService.error("Failed to update news article. Please try again.");
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
          { label: "News", icon: LuNewspaper, path: "/content/news" },
          { label: "Edit" },
        ]}
      />

      <div className="flex items-center gap-3">
        <div className="bg-primary-100 rounded-lg p-2">
          <LuNewspaper className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Article</h1>
          <p className="text-sm text-gray-500">Update the news article</p>
        </div>
      </div>

      <NewsForm
        defaultValues={news}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        submitLabel="Update Article"
      />
    </div>
  );
}
