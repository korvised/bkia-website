import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react";

export default function ContactInfo() {
  return (
    <div>
      <h4 className="mb-4 text-lg font-bold">Contact Information</h4>

      <div className="space-y-4 text-sm">
        {/* Address */}
        <div className="flex items-start space-x-3">
          <MapPin className="text-primary-300 mt-1 h-4 w-4 flex-shrink-0" />
          <div>
            <div className="mb-1 font-medium">Airport Address</div>
            <div className="leading-relaxed opacity-80">
              Tonphueng District, Bokeo Province
              <br />
              Lao PDR
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3">
          <Phone className="text-primary-300 h-4 w-4 flex-shrink-0" />
          <div>
            <div className="font-medium">Phone</div>
            <Link
              href="tel:084 260 179"
              className="opacity-80 transition-colors hover:underline hover:opacity-100"
            >
              084 260 179
            </Link>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3">
          <Mail className="text-primary-300 h-4 w-4 flex-shrink-0" />
          <div>
            <div className="font-medium">Email</div>
            <Link
              href="mailto:info@bokeointernationalairport.com"
              className="max-w-fit truncate opacity-80 transition-colors hover:underline hover:opacity-100"
            >
              info@bokeointernationalairport.com
            </Link>
          </div>
        </div>

        {/* Website */}
        <div className="flex items-center space-x-3">
          <Globe className="text-primary-300 h-4 w-4 flex-shrink-0" />
          <div>
            <div className="font-medium">Website</div>
            <a
              href="https://bokeointernationalairport.com/"
              target="_blank"
              className="opacity-80 transition-colors hover:underline hover:opacity-100"
            >
              bokeointernationalairport.com
            </a>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="flex items-start space-x-3">
          <Clock className="text-primary-300 mt-1 h-4 w-4 flex-shrink-0" />
          <div>
            <div className="mb-1 font-medium">Operating Hours</div>
            <div className="space-y-1 opacity-80">
              <div>Airport: 16/7</div>
              <div>Information Desk: 08:00 - 22:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
