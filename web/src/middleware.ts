import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLanguage, supportedLanguages } from "@/lib"; // e.g. ["en","zh","lo"]
import type { Lang } from "@/types/language";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieLang = req.cookies.get("lang")?.value as Lang | undefined;

  // 1) Root: redirect to cookie or default
  if (pathname === "/") {
    const target = `/${cookieLang ?? defaultLanguage}`;
    const url = new URL(target, req.url);
    return NextResponse.redirect(url);
  }

  // 2) If path starts with a supported lang, ensure cookie matches
  const seg1 = pathname.split("/")[1] as Lang | string;
  if (supportedLanguages.includes(seg1 as Lang)) {
    const res = NextResponse.next();
    if (cookieLang !== seg1) {
      res.cookies.set("lang", seg1 as Lang, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // run on most routes, skip static assets
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
