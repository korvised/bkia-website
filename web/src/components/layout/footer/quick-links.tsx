import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function QuickLinks() {
  return (
    <div>
      <h4 className="font-bold text-lg mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li>
          <Link
            href="/flights"
            className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors"
          >
            Flight Information
          </Link>
        </li>
        <li>
          <Link
            href="/flights/departures"
            className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors"
          >
            Departures
          </Link>
        </li>
        <li>
          <Link
            href="/flights/arrivals"
            className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors"
          >
            Arrivals
          </Link>
        </li>
        <li>
          <Link
            href="/transportation/parking"
            className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors"
          >
            Parking Information
          </Link>
        </li>
        <li>
          <Link
            href="/transportation/directions"
            className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors"
          >
            Directions
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors"
          >
            About Airport
          </Link>
        </li>
        <li>
          <Link
            href="/news"
            className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors"
          >
            News & Updates
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors"
          >
            Contact Us
          </Link>
        </li>

        {/* External Links */}
        <li className="pt-2 border-t border-bokeo-teal-700/30">
          <a
            href="https://www.iata.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors"
          >
            IATA
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </li>
        <li>
          <a
            href="https://www.icao.int"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center opacity-80 hover:opacity-100 hover:text-bokeo-teal-200 transition-colors"
          >
            ICAO
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </li>
      </ul>
    </div>
  );
}
