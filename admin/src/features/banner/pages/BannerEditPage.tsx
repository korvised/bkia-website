import { useParams, useNavigate } from "react-router-dom";
import { LuImage } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { useFetchBannerByIdQuery } from "@/features/banner/api";
import { BannerForm } from "@/features/banner/components";

export function BannerEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: banner, isLoading } = useFetchBannerByIdQuery(id!, {
    skip: !id,
  });

  if (!id) {
    navigate("/content/banners");
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        Banner not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb
          items={[
            { label: "Banners", icon: LuImage, path: "/content/banners" },
            { label: "Edit Banner" },
          ]}
        />
        <p className="mt-1 text-sm text-gray-500">
          Update banner slide image and settings.
        </p>
      </div>

      <BannerForm editBanner={banner} />
    </div>
  );
}
