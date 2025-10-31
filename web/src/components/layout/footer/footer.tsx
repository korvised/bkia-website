import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Lang } from "@/types/language";
import { FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";

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
    href: "#",
    icon: <FaLinkedin className="h-5 w-5" />,
  },
];

const translations = {
  flightInfo: {
    en: "Flight Information",
    lo: "ຂໍ້ມູນຖ້ຽວບິນ",
    zh: "航班信息",
  },
  arrivals: {
    en: "Arrivals",
    lo: "ຖ້ຽວບິນຂາເຂົ້າ",
    zh: "到达航班",
  },
  departures: {
    en: "Departures",
    lo: "ຖ້ຽວບິນອອກ",
    zh: "出发航班",
  },
  airlines: {
    en: "Airlines",
    lo: "ສາຍການບິນ",
    zh: "航空公司",
  },
  passengerGuide: {
    en: "Passenger Guide",
    lo: "ຄູ່ມືຜູ້ໂດຍສານ",
    zh: "旅客指南",
  },
  arrivalGuide: {
    en: "Arrival Guide",
    lo: "ຄູ່ມືຂາເຂົ້າ",
    zh: "到达指南",
  },
  departureGuide: {
    en: "Departure Guide",
    lo: "ຄູ່ມືຂາອອກ",
    zh: "出发指南",
  },
  security: {
    en: "Security Check",
    lo: "ການກວດຄວາມປອດໄພ",
    zh: "安检须知",
  },
  facilities: {
    en: "Airport Facilities",
    lo: "ສິ່ງອຳນວຍຄວາມສະດວກ",
    zh: "机场设施",
  },
  services: {
    en: "Airport Services",
    lo: "ບໍລິການສະໜາມບິນ",
    zh: "机场服务",
  },
  dining: {
    en: "Dining & Shopping",
    lo: "ຮ້ານອາຫານ ແລະ ຮ້ານຄ້າ",
    zh: "餐饮购物",
  },
  lounges: {
    en: "Lounges",
    lo: "ຫ້ອງຮັບຮອງ",
    zh: "贵宾室",
  },
  transportation: {
    en: "Transportation",
    lo: "ການຂົນສົ່ງ",
    zh: "交通",
  },
  parking: {
    en: "Parking",
    lo: "ບ່ອນຈອດລົດ",
    zh: "停车场",
  },
  aboutUs: {
    en: "About Airport",
    lo: "ກ່ຽວກັບສະໜາມບິນ",
    zh: "关于机场",
  },
  overview: {
    en: "Overview",
    lo: "ພາບລວມ",
    zh: "概况",
  },
  visionMission: {
    en: "Vision & Mission",
    lo: "ວິໄສທັດ ແລະ ພາລະກິດ",
    zh: "愿景使命",
  },
  careers: {
    en: "Careers",
    lo: "ຮ່ວມງານກັບພວກເຮົາ",
    zh: "招聘",
  },
  newsroom: {
    en: "Newsroom",
    lo: "ຂ່າວສານ",
    zh: "新闻中心",
  },
  contactUs: {
    en: "Contact Us",
    lo: "ຕິດຕໍ່ພວກເຮົາ",
    zh: "联系我们",
  },
  address: {
    en: "Tônpheung District, Bokeo Province, Lao PDR",
    lo: "ບ້ານໃຫຍ່ສີເມືອງງາມ, ເມື່ອງຕົ້ນເຜີ້ງ, ແຂວງບໍ່ແກ້ວ, ສປປ ລາວ",
    zh: "老挝博乔省会晒村",
  },
  email: {
    en: "info@bokeointernationalairport.com",
    lo: "info@bokeointernationalairport.com",
    zh: "info@bokeointernationalairport.com",
  },
  operatingHours: {
    en: "24/7 Operations",
    lo: "ເປີດບໍລິການ 24/7",
    zh: "24小时运营",
  },
  followUs: {
    en: "Follow Us",
    lo: "ຕິດຕາມພວກເຮົາ",
    zh: "关注我们",
  },
  quickLinks: {
    en: "Quick Links",
    lo: "ລິ້ງດ່ວນ",
    zh: "快速链接",
  },
  legal: {
    en: "Legal",
    lo: "ກົດໝາຍ",
    zh: "法律",
  },
  privacyPolicy: {
    en: "Privacy Policy",
    lo: "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ",
    zh: "隐私政策",
  },
  termsOfUse: {
    en: "Terms of Use",
    lo: "ເງື່ອນໄຂການໃຊ້ງານ",
    zh: "使用条款",
  },
  accessibility: {
    en: "Accessibility",
    lo: "ການເຂົ້າເຖິງ",
    zh: "无障碍",
  },
  allRightsReserved: {
    en: "All Rights Reserved",
    lo: "ສະຫງວນລິຂະສິດ",
    zh: "版权所有",
  },
};

export default async function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

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
                    src="/images/logo/logo_white.png"
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
                  {translations.address[lang]}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 opacity-80" />
                <a
                  href="tel:+85684260179"
                  className="text-sm font-medium transition-opacity hover:opacity-80"
                >
                  +85620 84 260 179
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 opacity-80" />
                <a
                  href="mailto:info@bokeointernationalairport.com"
                  className="text-sm transition-opacity hover:opacity-80"
                >
                  {translations.email[lang]}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 opacity-80" />
                <p className="text-sm opacity-90">
                  {translations.operatingHours[lang]}
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold opacity-90">
                {translations.followUs[lang]}
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
              {translations.flightInfo[lang]}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${lang}/flights/arrivals`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.arrivals[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/flights/departures`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.departures[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/flights/airlines`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.airlines[lang]}
                </Link>
              </li>
            </ul>
          </div>

          {/* Passenger Guide */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold tracking-wide uppercase">
              {translations.passengerGuide[lang]}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${lang}/guides/arrivals`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.arrivalGuide[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/guides/departures`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.departureGuide[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/guides/security`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.security[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/guides/facilities`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.facilities[lang]}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold tracking-wide uppercase">
              {translations.services[lang]}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${lang}/services/dining-shopping`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.dining[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/services/lounges`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.lounges[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/transports`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.transportation[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/transports/parking`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.parking[lang]}
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold tracking-wide uppercase">
              {translations.aboutUs[lang]}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={`/${lang}/about/overview`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.overview[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about/vision-mission`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.visionMission[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/about/careers`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.careers[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/support/newsroom`}
                  className="text-sm transition-colors hover:text-white/80"
                >
                  {translations.newsroom[lang]}
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
              {translations.allRightsReserved[lang]}.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                href={`/${lang}/legal/privacy`}
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                {translations.privacyPolicy[lang]}
              </Link>
              <Link
                href={`/${lang}/legal/terms`}
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                {translations.termsOfUse[lang]}
              </Link>
              <Link
                href={`/${lang}/legal/accessibility`}
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                {translations.accessibility[lang]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
