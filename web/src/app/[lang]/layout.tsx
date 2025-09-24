import { notFound } from "next/navigation";
import { LanguageProvider } from "@/context/language-context";
import { Header } from "@/components/layout/header";
import { getLanguageConfig, isValidLanguage } from "@/lib";
import { RightSidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout";

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

  const languageConfig = getLanguageConfig(lang);

  return (
    <html lang={lang} dir={languageConfig.dir} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <LanguageProvider lang={lang}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <RightSidebar lang={lang} />
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
