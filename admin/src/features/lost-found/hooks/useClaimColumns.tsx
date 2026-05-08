import { useMemo } from "react";
import { LuLink, LuUnlink, LuUser } from "react-icons/lu";
import type { Column } from "@/components/ui/table/table";
import { formatDate } from "@/lib";
import { cn } from "@/lib";
import type { ILostFoundClaim } from "@/features/lost-found/types";
import { ClaimStatusBadge } from "@/features/lost-found/components/ClaimStatusBadge";

export function useClaimColumns() {
  return useMemo(
    (): Column<ILostFoundClaim>[] => [
      {
        key: "referenceCode",
        header: "Ref Code",
        render: (claim) => (
          <span className="font-mono text-xs font-medium text-gray-700">
            {claim.referenceCode}
          </span>
        ),
      },
      {
        key: "claimantName",
        header: "Claimant",
        render: (claim) => (
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <LuUser className="h-3.5 w-3.5 shrink-0 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">
                {claim.claimantName}
              </span>
            </div>
            {claim.claimantEmail && (
              <span className="ml-5 text-xs text-gray-500">{claim.claimantEmail}</span>
            )}
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        render: (claim) => <ClaimStatusBadge status={claim.status} />,
      },
      {
        key: "category",
        header: "Category",
        render: (claim) => {
          const category = claim.category ?? claim.lostFound?.category;
          return category ? (
            <span className="text-sm capitalize text-gray-700">
              {category.toLowerCase()}
            </span>
          ) : (
            <span className="text-xs text-gray-400">&mdash;</span>
          );
        },
      },
      {
        key: "lostFound",
        header: "Linked Item",
        render: (claim) =>
          claim.lostFound ? (
            <div className="flex items-center gap-1.5">
              <LuLink className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="max-w-[160px] truncate text-sm text-gray-700">
                {claim.lostFound.displayNames?.en ||
                  claim.lostFound.displayNames?.lo ||
                  claim.lostFound.referenceCode}
              </span>
            </div>
          ) : (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                "bg-gray-100 text-gray-500",
              )}
            >
              <LuUnlink className="h-3 w-3" />
              Unlinked
            </span>
          ),
      },
      {
        key: "createdAt",
        header: "Date",
        render: (claim) => (
          <span className="text-sm text-gray-700">
            {formatDate(claim.createdAt)}
          </span>
        ),
      },
    ],
    [],
  );
}
