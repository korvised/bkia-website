import { Metadata } from "next";
import { AirportHomepage } from "@/components/homepage";

export const metadata: Metadata = {
  title: "Bokeo International Airport - Gateway to Laos",
  description: "Experience seamless travel at Bokeo International Airport. Your gateway to discovering the beauty and culture of Laos with world-class facilities and services.",
  keywords: [
    "Bokeo International Airport",
    "ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    "Laos airport",
    "flights to Laos",
    "Bokeo flights",
    "airport services",
    "travel Laos"
  ],
  openGraph: {
    title: "Bokeo International Airport - Gateway to Laos",
    description: "Your gateway to discovering Laos with seamless travel experience",
    images: [
      {
        url: "/images/homepage/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Bokeo International Airport"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Bokeo International Airport",
    description: "Gateway to Laos - Seamless Travel Experience",
    images: ["/images/homepage/banner.jpg"]
  },
  alternates: {
    canonical: "https://bokeoairport.la",
    languages: {
      "en-US": "https://bokeoairport.la",
      "lo-LA": "https://bokeoairport.la/lo"
    }
  }
};

export default function HomePage() {
  return <AirportHomepage />;
}
