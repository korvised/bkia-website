import { ReactNode } from "react";
import { Lang } from "@/types/language";
import { TransportsLayout } from "@/components/transports";

interface TransportationLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function TransportationLayout({
  children,
  params,
}: TransportationLayoutProps) {
  const { lang } = await params;

  return (
    <TransportsLayout lang={lang as Lang}>
      {children}
    </TransportsLayout>
  );
}
