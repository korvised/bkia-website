import type { Metadata } from "next";
import { Inter, Noto_Sans_Lao_Looped } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

// Load fonts from Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const notoSansLaoLooped = Noto_Sans_Lao_Looped({
  subsets: ["lao"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-lao",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: `${SITE_CONFIG.name} - Gateway to Laos`
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Bokeo International Airport",
    "ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    "Laos airport",
    "flights to Laos",
    "Bokeo flights",
    "airport services",
    "travel Laos",
    "Houayxay airport",
    "Bokeo province",
    "international airport Laos"
  ],
  authors: [{ name: "Bokeo International Airport" }],
  creator: "Bokeo International Airport",
  publisher: "Bokeo International Airport",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} - Gateway to Laos`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/homepage/banner.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Aerial view`
      },
      {
        url: `${SITE_CONFIG.url}/images/logo/bkia-logo.png`,
        width: 800,
        height: 600,
        alt: `${SITE_CONFIG.name} Logo`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@bokeoairport",
    creator: "@bokeoairport",
    title: `${SITE_CONFIG.name} - Gateway to Laos`,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/images/homepage/banner.jpg`]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/logo/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/images/logo/apple-touch-icon.png", sizes: "180x180" }
    ],
    shortcut: "/images/logo/favicon.ico"
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "en-US": `${SITE_CONFIG.url}/en`,
      "lo-LA": `${SITE_CONFIG.url}/lo`
    }
  },
  verification: {
    google: "your-google-verification-code" // Add your Google Search Console verification
  },
  category: "travel",
  classification: "Airport, Transportation, Travel",
  referrer: "origin-when-cross-origin",
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#14b8a6" },
    { media: "(prefers-color-scheme: dark)", color: "#0d9488" }
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_CONFIG.name
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true
  }
};

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansLaoLooped.variable}`}>
    <head>
      {/* Preconnect to Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Additional meta tags */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Structured Data for Airport */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Airport",
            "name": SITE_CONFIG.name,
            "alternateName": SITE_CONFIG.nameLao,
            "url": SITE_CONFIG.url,
            "logo": `${SITE_CONFIG.url}/images/logo/bkia-logo.png`,
            "image": `${SITE_CONFIG.url}/images/homepage/banner.jpg`,
            "description": SITE_CONFIG.description,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "LA",
              "addressRegion": "Bokeo Province",
              "addressLocality": "Houayxay",
              "streetAddress": "Bokeo International Airport"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "20.2574", // Replace with actual coordinates
              "longitude": "100.4126" // Replace with actual coordinates
            },
            "telephone": "+856-84-123-456",
            "email": "info@bokeoairport.la",
            "sameAs": [
              SITE_CONFIG.links.facebook,
              SITE_CONFIG.links.twitter,
              SITE_CONFIG.links.instagram
            ],
            "openingHours": "Mo-Su 00:00-23:59",
            "priceRange": "$$"
          })
        }}
      />
      <title></title>
    </head>
    <body className="font-sans antialiased bg-white text-gray-900 selection:bg-bokeo-teal-200">
    {/* Skip to main content for accessibility */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-bokeo-teal-600 text-white px-4 py-2 rounded-lg z-50"
    >
      Skip to main content
    </a>

    {/* Main application content */}
    <div id="main-content">
      {children}
    </div>

    {/* Analytics Scripts (add your tracking codes) */}
    {process.env.NODE_ENV === "production" && (
      <>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                    `
              }}
            />
          </>
        )}
      </>
    )}
    </body>
    </html>
  );
}
