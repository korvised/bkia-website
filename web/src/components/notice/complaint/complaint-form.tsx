"use client";

import { useState } from "react";
import { Send, Upload, X } from "lucide-react";
import { Lang } from "@/types/language";
import { useLanguage } from "@/context";
import { complaintCategories } from "@/data/notice/complaints";
import { complaintTranslations } from "@/data/translations/complaint";
import { cn } from "@/lib";

interface ComplaintFormProps {
  lang: Lang;
}

export function ComplaintForm({ lang }: ComplaintFormProps) {
  const { t } = useLanguage();
  const translations = complaintTranslations;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    from: "",
    description: "",
    date: "",
    time: "",
    location: "",
    flightNumber: "",
    name: "",
    email: "",
    phone: "",
    preferredContact: "email",
  });

  const [attachments, setAttachments] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate reference number
    const refNum = `COMP${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
    setReferenceNumber(refNum);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-lg border-2 border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Send className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-gray-900">
          {t(translations.form.successTitle)}
        </h3>
        <p className="mb-4 text-gray-600">
          {t(translations.form.successMessage)}
        </p>
        <div className="mb-6 rounded-lg bg-white p-4">
          <p className="mb-2 text-sm text-gray-600">
            {t(translations.form.referenceNumber)}
          </p>
          <p className="text-primary-600 text-2xl font-bold">
            {referenceNumber}
          </p>
        </div>
        <p className="text-sm text-gray-600">
          {t(translations.form.saveReference)}
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              category: "",
              subject: "",
              from: "",
              description: "",
              date: "",
              time: "",
              location: "",
              flightNumber: "",
              name: "",
              email: "",
              phone: "",
              preferredContact: "email",
            });
            setAttachments([]);
          }}
          className="bg-primary-600 hover:bg-primary-700 mt-6 rounded-lg px-6 py-2 text-white transition-colors"
        >
          {t(translations.form.submitAnother)}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Complaint Details Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          {t(translations.form.complaintDetails)}
        </h3>

        <div className="space-y-4">
          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t(translations.form.category)}
              <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="focus:border-primary-500 focus:ring-primary-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            >
              <option value="">{t(translations.form.selectCategory)}</option>
              {complaintCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {t(category.label)}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t(translations.form.subject)}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              maxLength={200}
              placeholder={t(translations.form.subjectPlaceholder)}
              className="focus:border-primary-500 focus:ring-primary-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            />
          </div>

          {/* From Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t(translations.form.from)}
            </label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              placeholder={t(translations.form.fromPlaceholder)}
              className="focus:border-primary-500 focus:ring-primary-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t(translations.form.description)}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={6}
              maxLength={2000}
              placeholder={t(translations.form.descriptionPlaceholder)}
              className="focus:border-primary-500 focus:ring-primary-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.description.length}/2000
            </p>
          </div>

          {/* Date and Time */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t(translations.form.dateOfIncident)}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                max={new Date().toISOString().split("T")[0]}
                className="focus:border-primary-500 focus:ring-primary-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t(translations.form.timeOfIncident)}
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="focus:border-primary-500 focus:ring-primary-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t(translations.form.location)}
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder={t(translations.form.locationPlaceholder)}
              className="focus:border-primary-500 focus:ring-primary-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            />
          </div>

          {/* Flight Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t(translations.form.flightNumber)}
            </label>
            <input
              type="text"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleInputChange}
              placeholder={t(translations.form.flightNumberPlaceholder)}
              className="focus:border-primary-500 focus:ring-primary-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            />
          </div>

          {/* File Attachments */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t(translations.form.attachments)}
            </label>
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-4">
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex cursor-pointer flex-col items-center justify-center text-center"
              >
                <Upload className="mb-2 h-10 w-10 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {t(translations.form.clickToUpload)}
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  {t(translations.form.supportedFormats)}
                </span>
              </label>
            </div>

            {/* Display uploaded files */}
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          {t(translations.form.contactInfo)}
        </h3>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t(translations.form.fullName)}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="focus:border-primary-500 focus:ring-primary-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
            />
          </div>

          {/* Email and Phone */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t(translations.form.email)}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="focus:border-primary-500 focus:ring-primary-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t(translations.form.phone)}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="focus:border-primary-500 focus:ring-primary-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t(translations.form.preferredContact)}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === "email"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">
                  {lang === "en" && "Email"}
                  {lang === "lo" && "ອີເມລ"}
                  {lang === "zh" && "电子邮件"}
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={formData.preferredContact === "phone"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">
                  {lang === "en" && "Phone"}
                  {lang === "lo" && "ໂທລະສັບ"}
                  {lang === "zh" && "电话"}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="rounded-lg bg-blue-50 p-4">
        <p className="text-sm text-gray-700">
          {t(translations.form.privacyNotice)}
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors",
            isSubmitting
              ? "cursor-not-allowed bg-gray-400"
              : "bg-primary-600 hover:bg-primary-700",
          )}
        >
          {isSubmitting ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>{t(translations.form.submitting)}</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>{t(translations.form.submitButton)}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
