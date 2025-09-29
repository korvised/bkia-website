import { redirect } from "next/navigation";

interface GuidePageProps {
  params: Promise<{ lang: string }>;
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { lang } = await params;

  // Redirect to departure as the default tab
  redirect(`/${lang}/guide/departure`);
}
