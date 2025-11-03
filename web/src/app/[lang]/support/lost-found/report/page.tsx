import { Lang } from "@/types/language";
import { ReportItemForm } from "@/components/notice";

interface ReportLostPageProps {
  params: Promise<{ lang: string }>;
}

export default async function ReportLostPage({ params }: ReportLostPageProps) {
  const { lang } = await params;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Report Lost Item</h1>
        <p className="mt-2 text-gray-600">
          Please provide as much detail as possible to help us locate your item.
        </p>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-900">
              Important Information
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>• Reports are kept on file for 90 days</li>
              <li>• We will contact you if your item is found</li>
              <li>• Check our Found Items page regularly</li>
              <li>• For immediate assistance, call +856-84-211-2000</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form */}
      <ReportItemForm lang={lang as Lang} />
    </div>
  );
}
