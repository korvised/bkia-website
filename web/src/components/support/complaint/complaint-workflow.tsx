"use client";

import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/context";
import { complaintWorkflow } from "@/data/notice/complaints";
import { complaintTranslations } from "@/data/translations/complaint";

export function ComplaintWorkflow() {
  const { t } = useLanguage();
  const translations = complaintTranslations;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">
        {t(translations.workflow.title)}
      </h3>

      <div className="relative space-y-8">
        {complaintWorkflow.steps.map((step, index) => (
          <div key={step.id} className="relative flex gap-4">
            {/* Step Number Circle */}
            <div className="flex flex-col items-center">
              <div className="bg-primary-600 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white">
                <span className="text-lg font-bold">{step.id}</span>
              </div>
              {index < complaintWorkflow.steps.length - 1 && (
                <div className="my-2 h-full w-0.5 flex-grow bg-gray-300"></div>
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 pb-8">
              <h4 className="mb-2 text-lg font-semibold text-gray-900">
                {t(step.title)}
              </h4>
              <p className="text-sm text-gray-600">{t(step.description)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="bg-primary-50 mt-6 rounded-lg p-4">
        <div className="flex gap-3">
          <CheckCircle className="text-primary-600 h-5 w-5 flex-shrink-0" />
          <div>
            <p className="text-primary-900 text-sm font-medium">
              {t(translations.workflow.commitment)}
            </p>
            <p className="text-primary-700 mt-1 text-sm">
              {t(translations.workflow.commitmentText)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
