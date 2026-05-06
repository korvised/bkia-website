import type { Lang } from "@/types/language";
import { createCareersI18n } from "@/data/i18n/about/careers";
import { listCareerActivities } from "@/services/careers/api.service";
import { CareersHero, CultureSection, ApplicationInfo } from "@/components/about/careers";

interface CareersLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function CareersLayout({
  children,
  params,
}: CareersLayoutProps) {
  const { lang } = await params;
  const typedLang = lang as Lang;
  const { careers: t } = createCareersI18n(typedLang);

  const activities = await listCareerActivities().catch(() => []);

  return (
    <>
      {/* Hero + Culture — fixed viewport height on md+, auto on mobile */}
      <div className="flex flex-col md:h-[100dvh]">
        {/* Activity gallery — fixed height on mobile, grows to fill on md+ */}
        <div className="h-[56vw] min-h-[240px] shrink-0 md:min-h-0 md:flex-1">
          <CareersHero
            activities={activities}
            lang={typedLang}
            title={t.heroTitle}
            subtitle={t.heroSubtitle}
          />
        </div>

        {/* Company culture — natural content height */}
        <div className="shrink-0">
          <CultureSection lang={typedLang} />
        </div>
      </div>

      {children}

      {/* Benefits → Documents → Contact — shared across list + detail */}
      <ApplicationInfo lang={typedLang} />
    </>
  );
}
