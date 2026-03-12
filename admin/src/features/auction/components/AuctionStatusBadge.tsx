import { AuctionStatus } from "@/types/enum.type";

const STATUS_CONFIG: Record<
  AuctionStatus,
  { label: string; className: string }
> = {
  [AuctionStatus.UPCOMING]: {
    label: "Upcoming",
    className: "bg-yellow-100 text-yellow-700",
  },
  [AuctionStatus.OPEN]: {
    label: "Open",
    className: "bg-green-100 text-green-700",
  },
  [AuctionStatus.CLOSED]: {
    label: "Closed",
    className: "bg-gray-100 text-gray-500",
  },
};

interface Props {
  status: AuctionStatus;
}

export function AuctionStatusBadge({ status }: Props) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
