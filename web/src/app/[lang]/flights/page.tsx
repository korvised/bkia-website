import { cookies } from "next/headers";
import { defaultLanguage } from "@/lib";
import { redirect } from "next/navigation";

export default async function FlightsPage() {
  const c = await cookies();
  const lang = c.get("lang")?.value ?? defaultLanguage;
  redirect(`/${lang}/flights/departures`);
}
