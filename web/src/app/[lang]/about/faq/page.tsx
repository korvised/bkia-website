import { Lang } from "@/types/language";
import {
  ComplaintForm,
  ComplaintTracking,
  ComplaintFAQ,
  ComplaintWorkflow,
} from "@/components/support";
import { complaintTranslations } from "@/data/translations/complaint";

interface ComplaintPageProps {
  params: Promise<{ lang: string }>;
}

export default async function ComplaintPage({ params }: ComplaintPageProps) {
  const { lang } = await params;
  const t = complaintTranslations;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="from-primary-400 to-primary-500 rounded-lg bg-gradient-to-r p-8 text-white">
        <h1 className="mb-3 text-3xl font-bold">{t.pageTitle[lang as Lang]}</h1>
        <p className="max-w-3xl text-lg opacity-95">
          {t.pageDescription[lang as Lang]}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-primary-600 mb-2 text-3xl font-bold">24h</div>
          <p className="text-sm text-gray-600">
            {t.stats.responseTime[lang as Lang]}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-primary-600 mb-2 text-3xl font-bold">7-10</div>
          <p className="text-sm text-gray-600">
            {t.stats.resolutionDays[lang as Lang]}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-primary-600 mb-2 text-3xl font-bold">95%</div>
          <p className="text-sm text-gray-600">
            {t.stats.satisfaction[lang as Lang]}
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Forms (2/3 width) */}
        <div className="space-y-8 lg:col-span-2">
          {/* Submit Complaint Section */}
          <section id="submit-complaint">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {t.sections.submitComplaint[lang as Lang]}
            </h2>
            <ComplaintForm lang={lang as Lang} />
          </section>

          {/* Track Complaint Section */}
          <section id="track-complaint">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {t.sections.trackComplaint[lang as Lang]}
            </h2>
            <ComplaintTracking lang={lang as Lang} />
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {t.sections.faq[lang as Lang]}
            </h2>
            <ComplaintFAQ />
          </section>
        </div>

        {/* Right Column - Workflow and Contact (1/3 width) */}
        <div className="space-y-8">
          {/* Processing Workflow */}
          <ComplaintWorkflow />

          {/* Contact Information Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {t.sections.needAssistance[lang as Lang]}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">
                  {t.contact.phone[lang as Lang]}
                </p>
                <a
                  href="tel:+8568421120 00"
                  className="text-primary-600 hover:text-primary-700"
                >
                  +856-84-211-2000
                </a>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">
                  {t.contact.emailLabel[lang as Lang]}
                </p>
                <a
                  href="mailto:complaints@bokeoairport.la"
                  className="text-primary-600 hover:text-primary-700"
                >
                  complaints@bokeoairport.la
                </a>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">
                  {t.contact.hours[lang as Lang]}
                </p>
                <p className="text-sm text-gray-600">
                  {t.contact.alwaysAvailable[lang as Lang]}
                </p>
              </div>
            </div>
          </div>

          {/* Alternative Contact Methods */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {t.sections.otherWays[lang as Lang]}
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="bg-primary-600 mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"></span>
                <span>{t.contact.visitDesk[lang as Lang]}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary-600 mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"></span>
                <span>{t.contact.writeToUs[lang as Lang]}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary-600 mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"></span>
                <span>{t.contact.useApp[lang as Lang]}</span>
              </li>
            </ul>
          </div>

          {/* Important Notice */}
          <div className="rounded-lg bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">
                {t.contact.important[lang as Lang]}
              </span>{" "}
              {t.contact.urgentMatters[lang as Lang]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
