import { notFound } from "next/navigation";
import { LanguageProvider } from "@/context";
import { isValidLanguage } from "@/lib";
import { Footer, GoToTop, Header } from "@/components/layout";
import type { Lang } from "@/types/language";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "lo" }, { lang: "zh" }];
}

interface LanguageLayoutProps {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}

export default async function LanguageLayout({
  params,
  children,
}: LanguageLayoutProps) {
  const { lang } = await params;

  // Validate language parameter
  if (!isValidLanguage(lang)) {
    notFound();
  }

  return (
    <LanguageProvider lang={lang as Lang}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-gray-50">{children}</main>
        <GoToTop />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
