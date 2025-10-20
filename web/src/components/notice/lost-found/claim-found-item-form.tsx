"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";

interface ClaimFoundItemFormProps {
  lang: Lang;
}

export function ClaimFoundItemForm({ lang }: ClaimFoundItemFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    referenceNumber: "",
    itemDescription: "",
    distinguishingFeatures: "",
    fullName: "",
    email: "",
    phone: "",
    idType: "",
    idNumber: "",
    proofOfOwnership: "",
    claimMethod: "",
    preferredDate: "",
    preferredTime: "",
    additionalInfo: "",
    agreeToTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate claim number
    const claimNumber = `CL${Date.now().toString().slice(-8)}`;

    // In real app, send to API
    console.log("Claim request:", formData);

    setIsSubmitting(false);

    // Redirect to success page or show success message
    alert(
      `Claim submitted successfully! Claim Number: ${claimNumber}\n\nWe will contact you within 24-48 hours to verify your claim.`,
    );
    router.push(`/${lang}/notices/lost-found`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back Button */}
      <Link
        href={`/${lang}/notices/lost-found`}
        className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lost & Found
      </Link>

      <div className="space-y-6 rounded-lg border-2 border-gray-200 bg-white p-6">
        {/* Item Reference Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Item Reference
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Reference Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="referenceNumber"
                value={formData.referenceNumber}
                onChange={handleChange}
                required
                placeholder="e.g., LF2025-001"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm focus:ring-2 focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                Find this on the item listing page
              </p>
            </div>
          </div>
        </div>

        {/* Item Verification Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Item Verification
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Describe the item <span className="text-red-500">*</span>
              </label>
              <textarea
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Provide detailed description of the item you're claiming"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Distinguishing Features <span className="text-red-500">*</span>
              </label>
              <textarea
                name="distinguishingFeatures"
                value={formData.distinguishingFeatures}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe any unique features, marks, scratches, serial numbers, or contents that prove ownership"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                This information will be verified against our records
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Proof of Ownership
              </label>
              <textarea
                name="proofOfOwnership"
                value={formData.proofOfOwnership}
                onChange={handleChange}
                rows={2}
                placeholder="e.g., Receipt, photos, serial number, purchase details"
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
          </div>
        </div>

        {/* ID Verification Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            ID Verification
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                ID Type <span className="text-red-500">*</span>
              </label>
              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                required
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              >
                <option value="">Select ID type</option>
                <option value="passport">Passport</option>
                <option value="national-id">National ID</option>
                <option value="drivers-license">Driver's License</option>
                <option value="other">Other Government ID</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                ID Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
                placeholder="Your ID number"
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            You will need to present this ID when collecting the item
          </p>
        </div>

        {/* Collection Details Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Collection Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Preferred Collection Method{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="claimMethod"
                value={formData.claimMethod}
                onChange={handleChange}
                required
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              >
                <option value="">Select method</option>
                <option value="in-person">
                  Collect in person at Lost & Found desk
                </option>
                <option value="courier">
                  Arrange courier delivery (fees apply)
                </option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Preferred Date
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Preferred Time
              </label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
              >
                <option value="">Select time</option>
                <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
                <option value="afternoon">
                  Afternoon (12:00 PM - 6:00 PM)
                </option>
                <option value="evening">Evening (6:00 PM - 10:00 PM)</option>
              </select>
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
            placeholder="Any additional details that might help verify your claim"
            className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        {/* Terms & Conditions */}
        <div className="rounded-lg bg-gray-50 p-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              className="text-primary-600 focus:ring-primary-500 mt-1 h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">
              I confirm that the information provided is accurate and I am the
              rightful owner of this item. I understand that false claims may
              result in legal action. <span className="text-red-500">*</span>
            </span>
          </label>
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
                Submitting Claim...
              </>
            ) : (
              <>
                <FileCheck className="h-5 w-5" />
                Submit Claim
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
