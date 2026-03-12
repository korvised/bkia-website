import { LuGavel } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { AuctionForm } from "@/features/auction/components";

export function AuctionCreatePage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb
          items={[
            { label: "Content" },
            { label: "Auctions", icon: LuGavel, path: "/content/auctions" },
            { label: "Create" },
          ]}
        />
        <p className="mt-1 text-sm text-gray-500">
          Create a new procurement auction listing.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-primary-100 rounded-lg p-2">
          <LuGavel className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Auction</h1>
          <p className="text-sm text-gray-500">
            Fill in the details and attach relevant documents.
          </p>
        </div>
      </div>

      <AuctionForm />
    </div>
  );
}
