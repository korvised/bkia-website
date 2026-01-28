import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Lang } from "@/types/language";
import { FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";
import { createLayoutI18n } from "@/data/i18n/layout";

interface FooterProps {
  lang: Lang;
}

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1DHuz5dNoP/",
    icon: <FaFacebook className="h-5 w-5" />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@bkia_official",
    icon: <FaTiktok className="h-5 w-5" />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@BokeoInternationalAirport",
    icon: <FaYoutube className="h-5 w-5" />,
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/bokeo-international-airport-415798359",
    icon: <FaLinkedin className="h-5 w-5" />,
  },
];

export default async function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { footer: t } = createLayoutI18n(lang);

  return (
    <footer className="bg-primary-600 text-white">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Contact - Takes more space */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <Link href={`/${lang}`} className="mb-6 inline-block">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14">
                  <Image
                    src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/logo/logo_white.png"
                    alt="Bokeo International Airport"
                    fill
                    sizes="56px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold">BOKEO INTERNATIONAL</h2>
                  <p className="text-sm opacity-90">AIRPORT</p>
                </div>
              </div>
            </Link>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 opacity-80" />
                <p className="text-sm leading-relaxed opacity-90">
                  {t.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 opacity-80" />
                <a
                  href="tel:+85684260179"
                  className="text-sm font-medium transition-opacity hover:opacity-80"
                >
                  +856 84 260 179
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 opacity-80" />
                <a
                  href="mailto:info@bokeointernationalairport.com"
                  className="text-sm transition-opacity hover:opacity-80"
                >
                  {t.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 opacity-80" />
                <p className="text-sm opacity-90">{t.operatingHours}</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold opacity-90">
                {t.followUs}
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel={
                      social.href !== "#" ? "noopener noreferrer" : undefined
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all hover:scale-105 hover:bg-white/20"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Flight Information */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wide uppercase">
              {t.flightInfo}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${lang}/flights/arrivals`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.arrivals}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/flights/departures`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.departures}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/flights/airlines`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.airlines}
                </Link>
              </li>
            </ul>
          </div>

          {/* Passenger Guide */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold tracking-wide uppercase">
              {t.passengerGuide}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${lang}/guides/arrivals`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.arrivalGuide}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/guides/departures`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.departureGuide}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/guides/security`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.security}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/guides/facilities`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.facilities}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold tracking-wide uppercase">
              {t.services}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${lang}/services/dining-shopping`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.dining}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/services/lounges`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.lounges}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/transports`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.transportation}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/transports/parking`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.parking}
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold tracking-wide uppercase">
              {t.aboutUs}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${lang}/about/overview`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.overview}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about/vision-mission`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.visionMission}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about/careers`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.careers}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/news`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {t.newsroom}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-700 border-t border-white/10">
        <div className="container py-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <p className="text-center text-sm opacity-80">
              © {currentYear} Bokeo International Airport.{" "}
              {t.allRightsReserved}.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                href={`/${lang}/legal/privacy`}
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                {t.privacyPolicy}
              </Link>
              <Link
                href={`/${lang}/legal/terms`}
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                {t.termsOfUse}
              </Link>
              <Link
                href={`/${lang}/legal/accessibility`}
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                {t.accessibility}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
