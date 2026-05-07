import { useRef, useState } from "react";
import { getIn } from "formik";
import type { FormikProps } from "formik";
import {
  LuInfo,
  LuLanguages,
  LuMapPin,
  LuPackageSearch,
  LuUser,
  LuUpload,
  LuX,
} from "react-icons/lu";
import {
  DatePicker,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import { LostFoundCategory } from "@/types";
import type { ICreateLostFoundForm } from "@/features/lost-found/types";

const CATEGORY_OPTIONS = [
  { value: LostFoundCategory.ELECTRONICS, label: "Electronics" },
  { value: LostFoundCategory.BAGGAGE, label: "Baggage" },
  { value: LostFoundCategory.CLOTHING, label: "Clothing" },
  { value: LostFoundCategory.DOCUMENTS, label: "Documents" },
  { value: LostFoundCategory.JEWELRY, label: "Jewelry" },
  { value: LostFoundCategory.KEYS, label: "Keys" },
  { value: LostFoundCategory.CASH, label: "Cash" },
  { value: LostFoundCategory.TOYS, label: "Toys" },
  { value: LostFoundCategory.OTHER, label: "Other" },
];

const LANG_TABS = [
  { key: "en" as const, label: "English", short: "EN" },
  { key: "lo" as const, label: "Lao", short: "ລາວ" },
  { key: "zh" as const, label: "Chinese", short: "中文" },
];

interface Props {
  formik: FormikProps<ICreateLostFoundForm>;
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export function LostFoundForm({ formik }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeLang, setActiveLang] = useState<"en" | "lo" | "zh">("en");

  const { values, errors, touched, handleBlur, setFieldValue, setFieldTouched } = formik;

  /** Access a nested field error via dot path (e.g. "displayNames.en") */
  const getNestedError = (path: string) => {
    const error = getIn(errors, path);
    const isTouched = getIn(touched, path);
    return isTouched && error ? String(error) : undefined;
  };

  const getError = (field: keyof ICreateLostFoundForm) =>
    touched[field] && errors[field] ? String(errors[field]) : undefined;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    const combined = [...values.images, ...newFiles].slice(0, 10);
    setFieldValue("images", combined);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setFieldValue("images", values.images.filter((_, i) => i !== index));
  };

  const handleMultilingualChange = (
    field: "displayNames" | "displayDescriptions" | "displayLocations",
    value: string,
  ) => {
    setFieldValue(`${field}.${activeLang}`, value);
  };

  const handleMultilingualBlur = (
    field: "displayNames" | "displayDescriptions" | "displayLocations",
  ) => {
    setFieldTouched(`${field}.${activeLang}`, true);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* Section 1: Item Information */}
      <div className="border-b border-gray-200 p-6">
        <SectionHeader
          icon={<LuPackageSearch className="h-4 w-4" />}
          title="Item Information"
          description="Category and details of the item"
        />

        {/* Category + Flight Number */}
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Category *"
            placeholder="Select category"
            value={values.category}
            onChange={(value) => setFieldValue("category", value as LostFoundCategory)}
            options={CATEGORY_OPTIONS}
            error={getError("category")}
          />
          <Input
            label="Flight Number"
            name="flightNumber"
            placeholder="e.g., QV902"
            value={values.flightNumber}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={getError("flightNumber")}
          />
        </div>

        {/* Language tabs + multilingual fields */}
        <div className="rounded-lg border border-gray-200 bg-gray-50">
          {/* Tab bar */}
          <div className="flex items-center gap-1 border-b border-gray-200 px-4 pt-3 pb-0">
            <LuLanguages className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
            {LANG_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveLang(tab.key)}
                className={[
                  "rounded-t-md px-4 py-2 text-xs font-semibold transition-colors",
                  activeLang === tab.key
                    ? "bg-white text-primary border border-b-0 border-gray-200 -mb-px"
                    : "text-gray-500 hover:text-gray-700",
                ].join(" ")}
              >
                {tab.short}
              </button>
            ))}
            <span className="ml-auto pb-2 text-xs text-gray-400">
              {activeLang === "en"
                ? "Required"
                : "Optional — defaults to English if left blank"}
            </span>
          </div>

          {/* Fields for active language */}
          <div className="space-y-4 p-4">
            <Input
              label={`Item Name${activeLang === "en" ? " *" : ""}`}
              placeholder={
                activeLang === "en"
                  ? "e.g., Black iPhone 15"
                  : activeLang === "lo"
                    ? "ຊື່ສິ່ງຂອງ"
                    : "物品名称"
              }
              value={values.displayNames[activeLang]}
              onChange={(e) => handleMultilingualChange("displayNames", e.target.value)}
              onBlur={() => handleMultilingualBlur("displayNames")}
              error={activeLang === "en" ? getNestedError("displayNames.en") : undefined}
            />

            <Textarea
              label="Description"
              placeholder={
                activeLang === "en"
                  ? "Color, brand, model, distinguishing features…"
                  : activeLang === "lo"
                    ? "ລາຍລະອຽດສິ່ງຂອງ…"
                    : "物品描述…"
              }
              value={values.displayDescriptions[activeLang]}
              onChange={(e) =>
                handleMultilingualChange("displayDescriptions", e.target.value)
              }
              onBlur={() => handleMultilingualBlur("displayDescriptions")}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Incident Details */}
      <div className="border-b border-gray-200 p-6">
        <SectionHeader
          icon={<LuInfo className="h-4 w-4" />}
          title="Incident Details"
          description="Where and when the item was lost or found"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DatePicker
            label="Incident Date *"
            value={values.incidentDate ? new Date(values.incidentDate) : null}
            onChange={(date) =>
              setFieldValue("incidentDate", date ? date.toISOString().split("T")[0] : "")
            }
            placeholder="Select date"
            maxDate={new Date()}
            error={getError("incidentDate")}
          />

          {/* Location uses the same active language tab */}
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <LuMapPin className="h-3.5 w-3.5 text-gray-400" />
              <label className="text-sm font-medium text-gray-700">
                Location
                <span className="ml-1 text-xs font-normal text-gray-400">
                  ({LANG_TABS.find((t) => t.key === activeLang)?.short})
                </span>
              </label>
            </div>
            <Input
              placeholder={
                activeLang === "en"
                  ? "e.g., Gate A3, Terminal 1, Baggage Claim"
                  : activeLang === "lo"
                    ? "ສະຖານທີ່"
                    : "地点"
              }
              value={values.displayLocations[activeLang]}
              onChange={(e) => handleMultilingualChange("displayLocations", e.target.value)}
              onBlur={() => handleMultilingualBlur("displayLocations")}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Reporter Info */}
      <div className="border-b border-gray-200 p-6">
        <SectionHeader
          icon={<LuUser className="h-4 w-4" />}
          title="Reporter Information"
          description="Contact details of the person reporting"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Input
            label="Full Name *"
            name="reporterName"
            placeholder="John Doe"
            value={values.reporterName}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={getError("reporterName")}
          />
          <Input
            label="Email"
            name="reporterEmail"
            type="email"
            placeholder="john@example.com"
            value={values.reporterEmail}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={getError("reporterEmail")}
          />
          <Input
            label="Phone *"
            name="reporterPhone"
            placeholder="+856 20..."
            value={values.reporterPhone}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={getError("reporterPhone")}
          />
        </div>
      </div>

      {/* Section 4: Images */}
      <div className="p-6">
        <SectionHeader
          icon={<LuUpload className="h-4 w-4" />}
          title="Photos"
          description="Upload up to 10 photos of the item"
        />

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={values.images.length >= 10}
            className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LuUpload className="h-4 w-4" />
            {values.images.length >= 10 ? "Maximum 10 images reached" : "Upload Images"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          {values.images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {values.images.map((file, index) => (
                <div
                  key={index}
                  className="relative flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
                >
                  <span className="max-w-[160px] truncate text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="ml-1 rounded p-0.5 text-gray-400 hover:text-red-500"
                  >
                    <LuX className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
