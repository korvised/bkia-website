import Link from "next/link";
import Image from "next/image";
import { Clock, Phone } from "lucide-react";
import QuickLinks from "./quick-links";
import ContactInfo from "./contact-info";
import { Lang } from "@/types/language";

interface FooterProps {
  lang: Lang;
}

export default async function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="from-primary-500 to-primary-600 relative bg-gradient-to-r text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Airport Information */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center space-x-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/images/logo/logo_white.png"
                  alt="Bokeo International Airport"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-lg font-bold">BKIA</div>
                <div className="text-sm opacity-90">Gateway to Laos</div>
              </div>
            </div>

            <h3 className="mb-4 text-xl font-bold">
              Bokeo International Airport
            </h3>
            <p className="font-lao mb-2 text-sm opacity-90">
              ສະໜາມບິນສາກົນບໍ່ແກ້ວ
            </p>
            <p className="mb-4 text-sm leading-relaxed opacity-80">
              Your gateway to discovering the beauty and culture of Laos.
              Experience seamless travel with world-class facilities and
              services.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1DHuz5dNoP/"
                target="_blank"
                className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>{" "}
              </a>
              <Link
                href="https://www.tiktok.com/@bkia_official"
                target="_blank"
                className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14z" />
                </svg>
              </Link>
              <a
                href="https://www.youtube.com/@BokeoInternationalAirport"
                target="_blank"
                className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 576 512"
                >
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <QuickLinks lang={lang} />
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 text-lg font-bold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${lang}/dining-shopping`}
                  className="hover:text-primary-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Dining & Shopping
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/guides`}
                  className="hover:text-primary-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Flight Guide
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/transportations`}
                  className="hover:text-primary-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Transportation
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/cargo`}
                  className="hover:text-primary-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Air Cargo
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/notices/lost-found`}
                  className="hover:text-primary-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Lost & Found
                </Link>
              </li>
              <li>
                <Link
                  href="/bokeo-visit"
                  className="hover:text-primary-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Bokeo Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>
      </div>

      {/* Emergency Information Bar */}
      <div className="border-t border-red-400/30 bg-red-600/20">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-2 flex items-center text-sm md:mb-0">
              <Phone className="mr-2 h-4 w-4 text-red-300" />
              <span className="font-medium">Emergency: </span>
              <Link href="tel:+856-84-123-456" className="ml-1 hover:underline">
                084 260 179
              </Link>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-yellow-300" />
              <span>16/7 Airport Operations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-900/50 border-primary-700/30 border-t">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col items-center justify-between text-sm md:flex-row">
            <div className="mb-2 md:mb-0">
              <span className="opacity-80">
                © {currentYear} Bokeo International Airport. All rights
                reserved.
              </span>
            </div>
            <div className="flex items-center space-x-6 opacity-80">
              <Link
                href="/legal/privacy"
                className="transition-opacity hover:opacity-100"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal/terms"
                className="transition-opacity hover:opacity-100"
              >
                Terms of Service
              </Link>
              <Link
                href="/about/accessibility"
                className="transition-opacity hover:opacity-100"
              >
                Accessibility
              </Link>
              <Link
                href="/contact/feedback"
                className="transition-opacity hover:opacity-100"
              >
                Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
