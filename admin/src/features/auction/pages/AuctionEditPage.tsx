import { useParams } from "react-router-dom";
import { LuGavel } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { useFetchAuctionByIdQuery } from "@/features/auction/api";
import { AuctionForm } from "@/features/auction/components";

export function AuctionEditPage() {
  const { id } = useParams<{ id: string }>();
  const { data: auction, isLoading } = useFetchAuctionByIdQuery(id!, {
    skip: !id,
  });

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb
          items={[
            { label: "Content" },
            { label: "Auctions", icon: LuGavel, path: "/content/auctions" },
            { label: "Edit" },
          ]}
        />
        <p className="mt-1 text-sm text-gray-500">
          Update auction details and manage attached documents.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-primary-100 rounded-lg p-2">
          <LuGavel className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Auction</h1>
          <p className="text-sm text-gray-500">
            {auction?.title.en || "Loading..."}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-gray-200 bg-white">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
        </div>
      ) : (
        <AuctionForm editAuction={auction} />
      )}
    </div>
  );
}
