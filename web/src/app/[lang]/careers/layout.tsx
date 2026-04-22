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
      {/* Hero + Culture pinned together to exactly one viewport height */}
      <div className="flex h-[100dvh] flex-col">
        {/* Activity gallery — grows to fill remaining space */}
        <div className="min-h-0 flex-1">
          <CareersHero
            activities={activities}
            lang={typedLang}
            title={t.heroTitle}
            subtitle={t.heroSubtitle}
          />
        </div>

        {/* Company culture — natural content height, anchored to bottom */}
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
