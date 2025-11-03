import { redirect } from "next/navigation";

interface NoticePageProps {
  params: Promise<{ lang: string }>;
}

export default async function NoticeAndAnnouncementPage({
                                                          params
                                                        }: NoticePageProps) {
  const { lang } = await params;

  // Redirect to important notices as the default tab
  redirect(`/${lang}/support/notices/important`);
}
