import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import type { Lang } from "@/types/language";
import { defaultLanguage } from "@/lib";

export const metadata: Metadata = {
  title: {
    template: "%s | Bokeo International Airport",
    default: "Bokeo International Airport - Gateway to Laos",
  },
  description: "Experience seamless travel at Bokeo International Airport",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const c = await cookies();
  const lang = (c.get("lang")?.value as Lang) ?? defaultLanguage;
  const fontClass =
    lang === "en" ? "font-en" : lang === "lo" ? "font-lo" : "font-en";

  return (
    <html suppressHydrationWarning>
      <body className={fontClass} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
