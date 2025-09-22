import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { defaultLanguage } from "@/lib";

export default async function RootPage() {
  const c = await cookies();
  const lang = c.get("lang")?.value ?? defaultLanguage;
  redirect(`/${lang}`);
}
