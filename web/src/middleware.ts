// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { isValidLanguage, defaultLanguage, type Lang } from "@/types/language";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip public files
  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // Skip API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Skip Next.js internal routes
  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Check if pathname starts with a supported language
  const pathnameIsMissingLocale = !isValidLanguage(pathname.split("/")[1]);

  // Redirect if there is no language in the pathname
  if (pathnameIsMissingLocale) {
    // Get preferred language from Accept-Language header or use default
    const preferredLanguage = getPreferredLanguage(request) || defaultLanguage;

    // Redirect to the same path with the language prefix
    return NextResponse.redirect(
      new URL(`/${preferredLanguage}${pathname}`, request.url),
    );
  }

  // If language is present, validate it
  const currentLang = pathname.split("/")[1] as Lang;
  if (!isValidLanguage(currentLang)) {
    // Invalid language, redirect to default
    const newPathname = pathname.replace(
      `/${currentLang}`,
      `/${defaultLanguage}`,
    );
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  return NextResponse.next();
}

function getPreferredLanguage(request: NextRequest): Lang | null {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return null;

  // Simple language detection - you might want to use a more sophisticated library
  const languages = acceptLanguage.split(",").map((lang) => {
    const [code] = lang.trim().split(";")[0].split("-");
    return code.toLowerCase();
  });

  // Check for exact matches first
  for (const lang of languages) {
    if (isValidLanguage(lang)) {
      return lang;
    }
  }

  // Check for partial matches
  for (const lang of languages) {
    if (lang.startsWith("en")) return "en";
    if (lang.startsWith("lo")) return "lo";
    if (lang.startsWith("zh")) return "zh";
  }

  return null;
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - public files with extensions
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
