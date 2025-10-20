import {
  ArrowLeft,
  MapPin,
  Calendar,
  Hash,
  CheckCircle,
  Clock,
  XCircle,
  Phone,
  Mail,
  AlertCircle,
  Smartphone,
  Briefcase,
  FileText,
  Shirt,
  Watch,
  Package,
  SearchCheck,
  FileCheck,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Lang } from "@/types/language";
import { LostFoundItem } from "@/data/notice/lost-found";
import { cn } from "@/lib";

interface LostFoundItemDetailProps {
  lang: Lang;
  item: LostFoundItem;
}

export function LostFoundItemDetail({ lang, item }: LostFoundItemDetailProps) {
  const categoryConfig = {
    electronics: {
      icon: Smartphone,
      label: "Electronics",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    bags: {
      icon: Briefcase,
      label: "Bags & Luggage",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    documents: {
      icon: FileText,
      label: "Documents",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    clothing: {
      icon: Shirt,
      label: "Clothing",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    accessories: {
      icon: Watch,
      label: "Accessories",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    other: {
      icon: Package,
      label: "Other Items",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
  };

  const typeConfig = {
    found: {
      label: "Found Item",
      icon: SearchCheck,
      color: "bg-green-100 text-green-700 border-green-200",
    },
    lost: {
      label: "Lost Item",
      icon: AlertCircle,
      color: "bg-orange-100 text-orange-700 border-orange-200",
    },
  };

  const statusConfig = {
    pending: {
      label: "Available to Claim",
      icon: Clock,
      color: "bg-green-100 text-green-700 border-green-200",
      description:
        "This item is available for claim. Please contact our Lost & Found desk.",
    },
    claimed: {
      label: "Claimed",
      icon: CheckCircle,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      description: "This item has been claimed by its owner.",
    },
    returned: {
      label: "Returned",
      icon: CheckCircle,
      color: "bg-gray-100 text-gray-700 border-gray-200",
      description: "This item has been returned to its owner.",
    },
    disposed: {
      label: "Disposed",
      icon: XCircle,
      color: "bg-red-100 text-red-700 border-red-200",
      description:
        "This item is no longer available as it has been disposed after the retention period.",
    },
  };

  const config = categoryConfig[item.category];
  const CategoryIcon = config.icon;
  const typeInfo = typeConfig[item.type];
  const TypeIcon = typeInfo.icon;
  const statusInfo = statusConfig[item.status];
  const StatusIcon = statusInfo.icon;

  const showClaimButton = item.type === "found" && item.status === "pending";

  return (
    <div className="space-y-6">
      <Link
        href={`/${lang}/notices/lost-found`}
        className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lost & Found
      </Link>

      <div
        className={cn(
          "overflow-hidden rounded-lg border-2",
          config.borderColor,
          config.bgColor,
        )}
      >
        <div className="border-b border-gray-200 bg-white p-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                <CategoryIcon className="h-4 w-4" />
                {config.label}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
                  typeInfo.color,
                )}
              >
                <TypeIcon className="h-4 w-4" />
                {typeInfo.label}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
                  statusInfo.color,
                )}
              >
                <StatusIcon className="h-4 w-4" />
                {statusInfo.label}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {item.itemName}
            </h1>

            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Hash className="h-4 w-4 text-gray-400" />
                <span className="font-medium">Reference:</span>
                <span className="font-mono">{item.referenceNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="font-medium">
                  {item.type === "lost" ? "Lost:" : "Found:"}
                </span>
                <time dateTime={item.date}>
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="font-medium">Location:</span>
                <span>{item.location}</span>
              </div>
            </div>

            {showClaimButton && (
              <div className="pt-2">
                <Link
                  href={`/${lang}/notices/lost-found/claim`}
                  className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
                >
                  <FileCheck className="h-5 w-5" />
                  Claim This Item
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6">
          <div
            className={cn(
              "mb-6 rounded-lg border-l-4 p-4",
              item.status === "pending"
                ? "border-green-500 bg-green-50"
                : item.status === "disposed"
                  ? "border-red-500 bg-red-50"
                  : "border-blue-500 bg-blue-50",
            )}
          >
            <div className="flex gap-3">
              <AlertCircle
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  item.status === "pending"
                    ? "text-green-600"
                    : item.status === "disposed"
                      ? "text-red-600"
                      : "text-blue-600",
                )}
              />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {statusInfo.label}
                </h3>
                <p className="mt-1 text-sm text-gray-700">
                  {statusInfo.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              Item Description
            </h2>
            <p className="leading-relaxed text-gray-700">{item.description}</p>
          </div>

          {item.images && item.images.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                Images
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {item.images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100"
                  >
                    <Image
                      src={image}
                      alt={`${item.itemName} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

                    {/* Fallback overlay - shows when image fails */}
                    <noscript>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 text-center">
                        <ImageIcon className="mb-2 h-16 w-16 text-gray-300" />
                        <p className="text-xs font-medium text-gray-500">
                          {item.itemName}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          Image {index + 1}
                        </p>
                      </div>
                    </noscript>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Note: Images are for reference purposes to help identify the
                item.
              </p>
            </div>
          )}

          {showClaimButton && (
            <div className="border-primary-200 bg-primary-50 rounded-lg border-2 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                How to Claim This Item
              </h2>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex gap-3">
                  <div className="bg-primary-600 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Submit Online Claim Form</p>
                    <p className="text-gray-600">
                      Click the "Claim This Item" button above to fill out the
                      claim form with your details.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary-600 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Provide Proof of Ownership</p>
                    <p className="text-gray-600">
                      Bring valid ID and describe the item in detail. You may
                      need to answer security questions.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary-600 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Quote Reference Number</p>
                    <p className="text-gray-600">
                      Reference:{" "}
                      <span className="font-mono font-semibold">
                        {item.referenceNumber}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-primary-200 mt-6 border-t pt-6">
                <h3 className="mb-3 font-medium text-gray-900">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <a
                    href="tel:+85684211-2000"
                    className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>+856-84-211-2000</span>
                  </a>
                  <a
                    href="mailto:lostandfound@bokeoairport.la"
                    className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span>lostandfound@bokeoairport.la</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p className="text-xs text-gray-500">
            Items are kept for 90 days from the date{" "}
            {item.type === "lost" ? "lost" : "found"}. After this period,
            unclaimed items may be donated or disposed of according to airport
            policy. For questions about this item, please quote reference number{" "}
            <span className="font-mono font-semibold">
              {item.referenceNumber}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
