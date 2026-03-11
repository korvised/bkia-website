import { LuImage } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { BannerForm } from "@/features/banner/components";

export function BannerCreatePage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb
          items={[
            { label: "Banners", icon: LuImage, path: "/content/banners" },
            { label: "Add Banner" },
          ]}
        />
        <p className="mt-1 text-sm text-gray-500">
          Add a new slide to the homepage hero carousel.
        </p>
      </div>

      <BannerForm />
    </div>
  );
}
