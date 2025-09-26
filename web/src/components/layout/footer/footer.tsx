import Link from "next/link";
import Image from "next/image";
import { Clock, Facebook, Instagram, Phone, Twitter } from "lucide-react";
import QuickLinks from "./quick-links";
import ContactInfo from "./contact-info";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="from-primary-700 to-dark-700 relative bg-gradient-to-b text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
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
              <Link
                href="#"
                className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <QuickLinks />
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 text-lg font-bold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/dining-shopping"
                  className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Dining & Shopping
                </Link>
              </li>
              <li>
                <Link
                  href="/services/joyful-service"
                  className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Joyful Services
                </Link>
              </li>
              <li>
                <Link
                  href="/transportation"
                  className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Transportation
                </Link>
              </li>
              <li>
                <Link
                  href="/cargo"
                  className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Air Cargo
                </Link>
              </li>
              <li>
                <Link
                  href="/services/lost-found"
                  className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Lost & Found
                </Link>
              </li>
              <li>
                <Link
                  href="/services/cultural-interaction"
                  className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
                >
                  Cultural Interaction
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
                +856 84 123 456
              </Link>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-yellow-300" />
              <span>24/7 Airport Operations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-bokeo-teal-900/50 border-bokeo-teal-700/30 border-t">
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
