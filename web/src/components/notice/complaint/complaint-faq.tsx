"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Lang } from "@/types/language";
import { useLanguage } from "@/context";
import { complaintFAQs } from "@/data/notice/complaints";
import { cn } from "@/utils/cn";
import { complaintTranslations } from "@/data/translations/complaint";

interface ComplaintFAQProps {
  lang: Lang;
}

export function ComplaintFAQ({ lang }: ComplaintFAQProps) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-primary-100 rounded-full p-2">
          <HelpCircle className="text-primary-600 h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {t(complaintTranslations.sections.faq)}
        </h3>
      </div>

      <div className="space-y-3">
        {complaintFAQs.map((faq, index) => (
          <div
            key={faq.id}
            className="hover:border-primary-300 rounded-lg border border-gray-200 transition-colors"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <span className="font-medium text-gray-900">
                {t(faq.question)}
              </span>
              {openIndex === index ? (
                <ChevronUp className="text-primary-600 h-5 w-5 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400" />
              )}
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                openIndex === index ? "max-h-96" : "max-h-0",
              )}
            >
              <div className="border-t border-gray-200 p-4 pt-3">
                <p className="text-sm leading-relaxed text-gray-600">
                  {t(faq.answer)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
