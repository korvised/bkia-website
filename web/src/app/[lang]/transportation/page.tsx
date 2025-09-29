import { redirect } from "next/navigation";

interface TransportationPageProps {
  params: Promise<{ lang: string }>;
}

export default async function TransportationPage({
  params,
}: TransportationPageProps) {
  const { lang } = await params;

  // Redirect to van as the default tab
  redirect(`/${lang}/transportation/van`);
}
