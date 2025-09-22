"use server";

import { cookies } from "next/headers";
import type { Lang } from "@/types/language";

export async function setLangCookie(lang: Lang) {
  const c = await cookies();
  c.set("lang", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
