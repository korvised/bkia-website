import { ReactNode } from "react";
import { Lang } from "@/types/language";
import { CustomServicesNav } from "@/components/guides/custom-services";

interface Props {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function CustomServicesLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomServicesNav lang={lang as Lang} />
      {children}
    </div>
  );
}
