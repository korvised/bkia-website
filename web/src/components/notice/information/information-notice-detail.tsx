import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  FileDown,
  Info,
  Lightbulb,
  Printer,
  Scale,
  Share2,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";
import { InformationNotice } from "@/data/notice/information-notices";
import { cn } from "@/lib";

interface InformationNoticeDetailProps {
  lang: Lang;
  notice: InformationNotice;
}

export function InformationNoticeDetail({
  lang,
  notice,
}: InformationNoticeDetailProps) {
  const categoryConfig = {
    "airport-info": {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-700",
      icon: Info,
      label: "Airport Information",
    },
    services: {
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      badgeBg: "bg-green-100",
      badgeText: "text-green-700",
      icon: Briefcase,
      label: "Services",
    },
    facilities: {
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      badgeBg: "bg-purple-100",
      badgeText: "text-purple-700",
      icon: Building2,
      label: "Facilities",
    },
    "travel-tips": {
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      badgeBg: "bg-yellow-100",
      badgeText: "text-yellow-700",
      icon: Lightbulb,
      label: "Travel Tips",
    },
    regulations: {
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      badgeBg: "bg-red-100",
      badgeText: "text-red-700",
      icon: Scale,
      label: "Regulations",
    },
  };

  const config = categoryConfig[notice.category];
  const CategoryIcon = config.icon;

  // Format content with markdown-style formatting
  const formatContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      // Check if it's a header (starts with **)
      if (paragraph.startsWith("**") && paragraph.endsWith(":**")) {
        const headerText = paragraph.replace(/\*\*/g, "");
        return (
          <h3 key={index} className="mt-6 mb-3 text-lg font-bold text-gray-900">
            {headerText}
          </h3>
        );
      }

      // Check if it's a list item (starts with -)
      if (paragraph.includes("\n-")) {
        const lines = paragraph.split("\n");
        const items = lines.filter((line) => line.startsWith("-"));
        return (
          <ul key={index} className="mb-4 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-primary-600 mt-1.5">•</span>
                <span>{item.substring(2)}</span>
              </li>
            ))}
          </ul>
        );
      }

      // Regular paragraph
      return (
        <p key={index} className="mb-4 leading-relaxed text-gray-700">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href={`/${lang}/notices/information`}
        className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Information
      </Link>

      {/* Notice Detail Card */}
      <div
        className={cn(
          "overflow-hidden rounded-lg border-2",
          config.borderColor,
          config.bgColor,
        )}
      >
        {/* Header Section */}
        <div className="border-b border-gray-200 bg-white p-6">
          <div className="space-y-4">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
                  config.badgeBg,
                  config.badgeText,
                )}
              >
                <CategoryIcon className="h-4 w-4" />
                {config.label}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{notice.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Published:{" "}
                  {new Date(notice.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {notice.lastUpdated && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    Last Updated:{" "}
                    {new Date(notice.lastUpdated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <Printer className="h-4 w-4" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white p-6">
          {/* Description */}
          <div className="border-primary-600 mb-6 rounded-lg border-l-4 bg-gray-50 p-4">
            <p className="text-base font-medium text-gray-900">
              {notice.description}
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-sm max-w-none">
            {formatContent(notice.content)}
          </div>

          {/* Tags */}
          {notice.tags && notice.tags.length > 0 && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {notice.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Links */}
          {notice.relatedLinks && notice.relatedLinks.length > 0 && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="mb-4 flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Related Links:
                </span>
              </div>
              <div className="space-y-2">
                {notice.relatedLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                  >
                    <div className="bg-primary-100 flex-shrink-0 rounded-lg p-2">
                      <ExternalLink className="text-primary-600 h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="group-hover:text-primary-600 text-sm font-medium text-gray-900">
                        {link.title}
                      </p>
                    </div>
                    <ExternalLink className="group-hover:text-primary-600 h-5 w-5 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Attachments */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="mb-4 flex items-center gap-2">
                <FileDown className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Downloads:
                </span>
              </div>
              <div className="space-y-2">
                {notice.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.url}
                    download
                    className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                  >
                    <div className="bg-primary-100 flex-shrink-0 rounded-lg p-2">
                      <FileDown className="text-primary-600 h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="group-hover:text-primary-600 text-sm font-medium text-gray-900">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {attachment.type === "application/pdf"
                          ? "PDF Document"
                          : "Document"}
                      </p>
                    </div>
                    <FileDown className="group-hover:text-primary-600 h-5 w-5 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p className="text-xs text-gray-500">
            For more information or assistance, please contact our information
            desk at{" "}
            <a
              href="tel:+85684211xxxx"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              +856-84-211-xxxx
            </a>{" "}
            or email{" "}
            <a
              href="mailto:info@bokeoairport.la"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              info@bokeoairport.la
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
