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
      {/* Activity gallery — full width, shared across list + detail */}
      <CareersHero
        activities={activities}
        lang={typedLang}
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
      />

      {/* Company culture — full width, navy */}
      <CultureSection lang={typedLang} />

      {children}

      {/* Benefits → Documents → Contact — shared across list + detail */}
      <ApplicationInfo lang={typedLang} />
    </>
  );
}
