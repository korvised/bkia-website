import { notFound } from "next/navigation";
import { AppProvider } from "@/context/app-context";
import { cn, isValidLanguage } from "@/lib";
import { Footer, GoToTop, Header } from "@/components/layout";
// import WelcomePopup from "@/components/common/welcome-popup";
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
    <AppProvider lang={lang as Lang}>
      <div
        className={cn("flex min-h-screen flex-col", {
          "font-en": lang === "en",
          "font-lo": lang === "lo",
          "font-zh": lang === "zh",
        })}
      >
        <Header />
        <main className="flex-1 bg-gray-50">{children}</main>
        <GoToTop />
        <Footer lang={lang} />

        {/* Welcome Popup - Shows on first visit */}
        {/*<WelcomePopup />*/}
      </div>
    </AppProvider>
  );
}
