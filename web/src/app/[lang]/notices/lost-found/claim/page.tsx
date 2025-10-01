import { Lang } from "@/types/language";
import { ClaimFoundItemForm } from "@/components/notice";

interface ClaimFoundPageProps {
  params: Promise<{ lang: string }>;
}

export default async function ClaimFoundPage({ params }: ClaimFoundPageProps) {
  const { lang } = await params;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Claim Found Item</h1>
        <p className="mt-2 text-gray-600">
          Please provide accurate information to verify your ownership.
        </p>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-yellow-900">
              Before You Submit
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-yellow-700">
              <li>
                • Have your reference number ready (from found items list)
              </li>
              <li>• Prepare valid photo ID for verification</li>
              <li>• Be ready to answer security questions about the item</li>
              <li>• Claims are processed within 24-48 hours</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form */}
      <ClaimFoundItemForm lang={lang as Lang} />
    </div>
  );
}
