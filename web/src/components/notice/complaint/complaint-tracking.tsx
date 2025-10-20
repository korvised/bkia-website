"use client";

import { useState } from "react";
import { Search, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Lang } from "@/types/language";
import { cn } from "@/lib";
import { useLanguage } from "@/context";
import { complaintStatuses } from "@/data/notice/complaints";
import { complaintTranslations } from "@/data/translations/complaint";

interface ComplaintTrackingProps {
  lang: Lang;
}

export function ComplaintTracking({ lang }: ComplaintTrackingProps) {
  const { t } = useLanguage();
  const translations = complaintTranslations;
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [complaint, setComplaint] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setComplaint(null);
    setIsSearching(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data - in production, this would fetch from API
    if (referenceNumber.toUpperCase().startsWith("COMP")) {
      setComplaint({
        referenceNumber,
        category: "service-quality",
        subject: "Long wait time at check-in counter",
        status: "under-review",
        priority: "high",
        submittedDate: "2025-09-28",
        lastUpdated: "2025-09-29",
        estimatedResolution: "2025-10-05",
        timeline: [
          {
            status: "submitted",
            date: "2025-09-28 10:30 AM",
            description: "Complaint submitted and received",
          },
          {
            status: "under-review",
            date: "2025-09-28 02:15 PM",
            description: "Assigned to customer service team for review",
          },
          {
            status: "under-review",
            date: "2025-09-29 09:00 AM",
            description: "Investigation in progress",
          },
        ],
      });
    } else {
      setError(t(translations.tracking.notFound));
    }

    setIsSearching(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "under-review":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "closed":
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const statusObj = complaintStatuses.find((s) => s.id === status);
    return statusObj ? t(statusObj.label) : status;
  };

  const getStatusColor = (status: string) => {
    const statusObj = complaintStatuses.find((s) => s.id === status);
    return statusObj ? statusObj.color : "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          {t(translations.tracking.title)}
        </h3>

        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t(translations.tracking.referenceNumber)}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder={t(
                  translations.tracking.referenceNumberPlaceholder,
                )}
                className="focus:border-primary-500 focus:ring-primary-200 flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={isSearching}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-6 py-2 font-medium text-white transition-colors",
                  isSearching
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-primary-600 hover:bg-primary-700",
                )}
              >
                {isSearching ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <Search className="h-5 w-5" />
                )}
                {t(translations.tracking.search)}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
        </form>
      </div>

      {/* Complaint Details */}
      {complaint && (
        <div className="space-y-6">
          {/* Status Overview */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {complaint.subject}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {t(translations.tracking.referenceNumber)}{" "}
                  <span className="font-medium">
                    {complaint.referenceNumber}
                  </span>
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium",
                  getStatusColor(complaint.status),
                )}
              >
                {getStatusLabel(complaint.status)}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-600">
                  {t(translations.tracking.submitted)}
                </p>
                <p className="font-medium text-gray-900">
                  {new Date(complaint.submittedDate).toLocaleDateString(
                    lang === "zh" ? "zh-CN" : lang === "lo" ? "lo-LA" : "en-US",
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {t(translations.tracking.lastUpdated)}
                </p>
                <p className="font-medium text-gray-900">
                  {new Date(complaint.lastUpdated).toLocaleDateString(
                    lang === "zh" ? "zh-CN" : lang === "lo" ? "lo-LA" : "en-US",
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {t(translations.tracking.estimatedResolution)}
                </p>
                <p className="font-medium text-gray-900">
                  {new Date(complaint.estimatedResolution).toLocaleDateString(
                    lang === "zh" ? "zh-CN" : lang === "lo" ? "lo-LA" : "en-US",
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {t(translations.tracking.progressTimeline)}
            </h3>

            <div className="space-y-4">
              {complaint.timeline.map((item: any, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary-100 rounded-full p-2">
                      {getStatusIcon(item.status)}
                    </div>
                    {index < complaint.timeline.length - 1 && (
                      <div className="my-2 h-full w-0.5 bg-gray-200"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="font-medium text-gray-900">
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              {t(translations.tracking.needMoreInfo)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
