import { useMemo } from "react";
import type { Column } from "@/components/ui/table/table";
import { formatDate } from "@/lib";
import type { ILostFoundItem } from "@/features/lost-found/types";
import {
  LostFoundStatusBadge,
  LostFoundTypeBadge,
  LostFoundVisibilityBadge,
} from "@/features/lost-found/components";

export function useLostFoundColumns() {
  return useMemo(
    (): Column<ILostFoundItem>[] => [
      {
        key: "type",
        header: "Type",
        render: (item) => <LostFoundTypeBadge type={item.type} />,
      },
      {
        key: "itemName",
        header: "Item Name",
        render: (item) => (
          <div>
            <p className="font-medium text-gray-900">{item.itemName}</p>
            <p className="text-xs text-gray-500 capitalize">
              {item.category.toLowerCase()}
            </p>
          </div>
        ),
      },
      {
        key: "referenceCode",
        header: "Reference",
        render: (item) => (
          <span className="font-mono text-xs text-gray-600">
            {item.referenceCode}
          </span>
        ),
      },
      {
        key: "incidentDate",
        header: "Incident Date",
        render: (item) => (
          <span className="text-sm text-gray-700">
            {formatDate(item.incidentDate)}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        render: (item) => <LostFoundStatusBadge status={item.status} />,
      },
      {
        key: "visibility",
        header: "Visibility",
        render: (item) => (
          <LostFoundVisibilityBadge visibility={item.visibility} />
        ),
      },
      {
        key: "reporterName",
        header: "Reporter",
        render: (item) => (
          <div>
            <p className="text-sm text-gray-900">{item.reporterName}</p>
            <p className="text-xs text-gray-500">{item.reporterEmail}</p>
          </div>
        ),
      },
      {
        key: "createdAt",
        header: "Created",
        render: (item) => (
          <span className="text-sm text-gray-500">
            {formatDate(item.createdAt)}
          </span>
        ),
      },
    ],
    [],
  );
}
