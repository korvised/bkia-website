import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { LuLink, LuPackageSearch, LuRefreshCw, LuSearch, LuX } from "react-icons/lu";
import { cn, formatDate } from "@/lib";
import { useFetchLostFoundItemsQuery, useLinkClaimMutation } from "@/features/lost-found/api";
import { alertService } from "@/services/alert.service";
import { LostFoundStatusBadge } from "./LostFoundStatusBadge";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  claimId: string;
}

export function LinkToItemModal({ isOpen, onClose, claimId }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setDebouncedSearch("");
    }
  }, [isOpen]);

  const { data, isLoading, isFetching } = useFetchLostFoundItemsQuery(
    { search: debouncedSearch, page: 1, limit: 10 },
    { skip: !isOpen },
  );

  const [linkClaim, { isLoading: isLinking }] = useLinkClaimMutation();

  const handleLink = async (lostFoundId: string) => {
    try {
      await linkClaim({ claimId, lostFoundId }).unwrap();
      await alertService.success("Linked", "Claim linked to item successfully.");
      onClose();
    } catch {
      await alertService.error("Failed to link claim to item.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary-100 p-2">
                <LuLink className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Link to Lost & Found Item
                </DialogTitle>
                <p className="text-sm text-gray-500">
                  Search and select an item to link this claim to
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <LuX className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="border-b border-gray-100 px-6 py-3">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by item name, reference code..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
              {(isLoading || isFetching) && (
                <LuRefreshCw className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" />
              )}
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto px-6 py-3">
            {!data?.data?.length ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <LuPackageSearch className="mb-3 h-10 w-10 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">
                  {debouncedSearch ? "No items found" : "Type to search for items"}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {debouncedSearch
                    ? "Try different keywords"
                    : "Search by item name, category, or reference code"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {data.data.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {item.displayNames?.en || item.displayNames?.lo || "Untitled"}
                        </p>
                        <LostFoundStatusBadge status={item.status} />
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                        {item.referenceCode && (
                          <span className="font-mono text-gray-400">{item.referenceCode}</span>
                        )}
                        <span className="capitalize">{item.category.toLowerCase()}</span>
                        <span>{formatDate(item.incidentDate)}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleLink(item.id)}
                      disabled={isLinking}
                      className={cn(
                        "ml-3 flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition",
                        "bg-primary text-white hover:bg-primary-600",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                      )}
                    >
                      {isLinking ? (
                        <LuRefreshCw className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <LuLink className="h-3.5 w-3.5" />
                      )}
                      Link
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-6 py-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
