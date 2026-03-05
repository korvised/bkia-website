import { useRef } from "react";
import type { FormikProps } from "formik";
import {
  LuInfo,
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
import { LostFoundCategory, LostFoundType } from "@/types";
import type { ICreateLostFoundForm } from "@/features/lost-found/types";

const TYPE_OPTIONS = [
  { value: LostFoundType.LOST, label: "Lost — Passenger reporting lost item" },
  { value: LostFoundType.FOUND, label: "Found — Staff/Passenger found item" },
];

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
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    formik;

  const getError = (field: keyof ICreateLostFoundForm) =>
    touched[field] && errors[field] ? String(errors[field]) : undefined;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    const combined = [...values.images, ...newFiles].slice(0, 10);
    setFieldValue("images", combined);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const updated = values.images.filter((_, i) => i !== index);
    setFieldValue("images", updated);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Section 1: Report Type & Item */}
      <div className="border-b border-gray-200 p-6">
        <SectionHeader
          icon={<LuPackageSearch className="h-4 w-4" />}
          title="Item Information"
          description="Type, category, and details of the item"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Report Type *"
            placeholder="Select type"
            value={values.type}
            onChange={(value) => setFieldValue("type", value as LostFoundType)}
            options={TYPE_OPTIONS}
            error={getError("type")}
          />

          <Select
            label="Category *"
            placeholder="Select category"
            value={values.category}
            onChange={(value) =>
              setFieldValue("category", value as LostFoundCategory)
            }
            options={CATEGORY_OPTIONS}
            error={getError("category")}
          />

          <Input
            label="Item Name *"
            name="itemName"
            placeholder="e.g., Black iPhone 15"
            value={values.itemName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("itemName")}
          />

          <Input
            label="Flight Number"
            name="flightNumber"
            placeholder="e.g., QV902"
            value={values.flightNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("flightNumber")}
          />

          <div className="sm:col-span-2">
            <Textarea
              label="Description"
              name="description"
              placeholder="Describe the item in detail (color, brand, model, distinguishing features...)"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
              error={getError("description")}
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
              setFieldValue(
                "incidentDate",
                date ? date.toISOString().split("T")[0] : "",
              )
            }
            placeholder="Select date"
            maxDate={new Date()}
            error={getError("incidentDate")}
          />

          <Input
            label="Location"
            name="location"
            placeholder="e.g., Gate A3, Terminal 1, Baggage Claim"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("location")}
          />
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
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("reporterName")}
          />

          <Input
            label="Email *"
            name="reporterEmail"
            type="email"
            placeholder="john@example.com"
            value={values.reporterEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("reporterEmail")}
          />

          <Input
            label="Phone"
            name="reporterPhone"
            placeholder="+856 20..."
            value={values.reporterPhone}
            onChange={handleChange}
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
            {values.images.length >= 10
              ? "Maximum 10 images reached"
              : "Upload Images"}
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
                  <span className="max-w-[160px] truncate text-gray-700">
                    {file.name}
                  </span>
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
