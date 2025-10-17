import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Lang } from "@/types/language";

interface QuickLinkProps {
  lang: Lang;
}

export default function QuickLinks({ lang }: QuickLinkProps) {
  return (
    <div>
      <h4 className="mb-4 text-lg font-bold">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li>
          <Link
            href={`/${lang}/flights`}
            className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
          >
            Flight Information
          </Link>
        </li>
        <li>
          <Link
            href={`/${lang}/flights?tab=departures`}
            className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
          >
            Departures
          </Link>
        </li>
        <li>
          <Link
            href={`/${lang}/flights?tab=arrivals`}
            className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
          >
            Arrivals
          </Link>
        </li>
        <li>
          <Link
            href={`/${lang}/transportations/parking`}
            className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
          >
            Parking Information
          </Link>
        </li>
        <li>
          <Link
            href={`/${lang}/survey`}
            className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
          >
            About Airport
          </Link>
        </li>
        <li>
          <Link
            href={`/${lang}/news`}
            className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
          >
            News & Updates
          </Link>
        </li>
        <li>
          <Link
            href={`/${lang}/contact`}
            className="hover:text-bokeo-teal-200 opacity-80 transition-colors hover:opacity-100"
          >
            Contact Us
          </Link>
        </li>

        {/* External Links */}
        <li className="border-bokeo-teal-700/30 border-t pt-2">
          <a
            href="https://www.iata.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bokeo-teal-200 flex items-center opacity-80 transition-colors hover:opacity-100"
          >
            IATA
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </li>
        <li>
          <a
            href="https://www.icao.int"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bokeo-teal-200 flex items-center opacity-80 transition-colors hover:opacity-100"
          >
            ICAO
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </li>
      </ul>
    </div>
  );
}
