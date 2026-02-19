import "./globals.css";
import { cookies } from "next/headers";
import type { Lang } from "@/types/language";
import { defaultLanguage } from "@/lib";

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
