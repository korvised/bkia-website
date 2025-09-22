import { notFound } from "next/navigation";
import {
  isValidLanguage,
  getLanguageConfig,
  type Lang,
} from "@/types/language";
import { LanguageProvider } from "@/context/language-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RightSidebar } from "@/components/layout/sidebar";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "lo" }, { lang: "zh" }];
}

interface LanguageLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  // Validate language parameter
  if (!isValidLanguage(params.lang)) {
    notFound();
  }

  const lang = params.lang as Lang;
  const languageConfig = getLanguageConfig(lang);

  return (
    <html lang={lang} dir={languageConfig.dir} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <LanguageProvider lang={lang}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            {/*<Footer />*/}
            <RightSidebar />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
