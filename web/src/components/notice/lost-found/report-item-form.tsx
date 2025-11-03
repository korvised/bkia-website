"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";

interface ReportItemFormProps {
  lang: Lang;
}

export function ReportItemForm({ lang }: ReportItemFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reportType: "lost" as "lost" | "found",
    itemName: "",
    category: "",
    description: "",
    date: "",
    location: "",
    flightNumber: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    additionalInfo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate reference number based on type
    const prefix = formData.reportType === "lost" ? "LR" : "FR";
    const refNumber = `${prefix}${Date.now().toString().slice(-8)}`;

    // In real app, send to API
    console.log("Item report:", formData);

    setIsSubmitting(false);

    // Show different message based on type
    const message =
      formData.reportType === "lost"
        ? `Lost item report submitted successfully! Reference Number: ${refNumber}\n\nWe will contact you if your item is found.`
        : `Found item report submitted successfully! Reference Number: ${refNumber}\n\nThank you for your honesty. We will process this item and contact the owner if they come forward.`;

    alert(message);
    router.push(`/${lang}/support/lost-found`);
  };

  const isLost = formData.reportType === "lost";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back Button */}
      <Link
        href={`/${lang}/support/lost-found`}
        className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lost & Found
      </Link>

      <div className="space-y-6 rounded-lg border-2 border-gray-200 bg-white p-6">
        {/* Report Type Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Report Type
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label
              className={`relative flex cursor-pointer rounded-lg border-2 p-4 transition-all ${
                formData.reportType === "lost"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="reportType"
                value="lost"
                checked={formData.reportType === "lost"}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      formData.reportType === "lost"
                        ? "border-primary-600 bg-primary-600"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.reportType === "lost" && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    I Lost Something
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Report an item you lost at the airport
                  </p>
                </div>
              </div>
            </label>

            <label
              className={`relative flex cursor-pointer rounded-lg border-2 p-4 transition-all ${
                formData.reportType === "found"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="reportType"
                value="found"
                checked={formData.reportType === "found"}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      formData.reportType === "found"
                        ? "border-primary-600 bg-primary-600"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.reportType === "found" && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    I Found Something
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Report an item you found at the airport
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Item Information Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Item Information
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
                placeholder="e.g., Black iPhone 14 Pro"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="bags">Bags & Luggage</option>
                <option value="documents">Documents</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Date {isLost ? "Lost" : "Found"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                max={new Date().toISOString().split("T")[0]}
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Provide detailed description including color, brand, size, distinctive features, etc."
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Location Details Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Location Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Where {isLost ? "did you lose it" : "did you find it"}?{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Security Checkpoint, Gate 5, Baggage Claim"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Flight Number (if applicable)
              </label>
              <input
                type="text"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                placeholder="e.g., QV123"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Your Contact Information
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+856 20 xxxx xxxx"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                placeholder="Your current address"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Additional Information
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows={3}
            placeholder="Any additional details that might help"
            className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-600 hover:bg-primary-700 inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit Report
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
