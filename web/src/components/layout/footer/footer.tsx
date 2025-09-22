import Link from "next/link";
import Image from "next/image";
import { Clock, Facebook, Instagram, Phone, Twitter } from "lucide-react";
import QuickLinks from "./quick-links";
import ContactInfo from "./contact-info";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-bokeo-teal-800 to-bokeo-teal-900 text-white">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Airport Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo/bkia-logo-white.png"
                  alt="Bokeo International Airport"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-lg">BKIA</div>
                <div className="text-sm opacity-90">Gateway to Laos</div>
              </div>
            </div>

            <h3 className="font-bold text-xl mb-4">Bokeo International Airport</h3>
            <p className="text-sm opacity-90 font-lao mb-2">ສະໜາມບິນສາກົນບໍ່ແກ້ວ</p>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              Your gateway to discovering the beauty and culture of Laos.
              Experience seamless travel with world-class facilities and services.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <Link href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <QuickLinks />
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/dining-shopping"
                      className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors">
                  Dining & Shopping
                </Link>
              </li>
              <li>
                <Link href="/services/joyful-service"
                      className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors">
                  Joyful Services
                </Link>
              </li>
              <li>
                <Link href="/transportation"
                      className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors">
                  Transportation
                </Link>
              </li>
              <li>
                <Link href="/cargo"
                      className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors">
                  Air Cargo
                </Link>
              </li>
              <li>
                <Link href="/services/lost-found"
                      className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors">
                  Lost & Found
                </Link>
              </li>
              <li>
                <Link href="/services/cultural-interaction"
                      className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors">
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
      <div className="bg-red-600/20 border-t border-red-400/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center text-sm mb-2 md:mb-0">
              <Phone className="w-4 h-4 mr-2 text-red-300" />
              <span className="font-medium">Emergency: </span>
              <Link href="tel:+856-84-123-456" className="ml-1 hover:underline">
                +856 84 123 456
              </Link>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-yellow-300" />
              <span>24/7 Airport Operations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-bokeo-teal-900/50 border-t border-bokeo-teal-700/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm">
            <div className="mb-2 md:mb-0">
              <span className="opacity-80">
                © {currentYear} Bokeo International Airport. All rights reserved.
              </span>
            </div>
            <div className="flex items-center space-x-6 opacity-80">
              <Link href="/legal/privacy" className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
              <Link href="/about/accessibility" className="hover:opacity-100 transition-opacity">
                Accessibility
              </Link>
              <Link href="/contact/feedback" className="hover:opacity-100 transition-opacity">
                Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
