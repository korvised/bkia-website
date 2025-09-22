import { redirect } from "next/navigation";
import { defaultLanguage } from "@/types/language";

export default function RootPage() {
  // Redirect to default language
  redirect(`/${defaultLanguage}`);
}
