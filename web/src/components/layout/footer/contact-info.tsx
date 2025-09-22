import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react";

export default function ContactInfo() {
  return (
    <div>
      <h4 className="font-bold text-lg mb-4">Contact Information</h4>

      <div className="space-y-4 text-sm">
        {/* Address */}
        <div className="flex items-start space-x-3">
          <MapPin className="w-4 h-4 mt-1 text-bokeo-teal-300 flex-shrink-0" />
          <div>
            <div className="font-medium mb-1">Airport Address</div>
            <div className="opacity-80 leading-relaxed">
              Bokeo International Airport<br />
              Houayxay District, Bokeo Province<br />
              Lao PDR
            </div>
            <div className="text-xs opacity-70 font-lao mt-1">
              ສະໜາມບິນສາກົນບໍ່ແກ້ວ, ເມືອງຫ້ວຍຊາຍ, ແຂວງບໍ່ແກ້ວ
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3">
          <Phone className="w-4 h-4 text-bokeo-teal-300 flex-shrink-0" />
          <div>
            <div className="font-medium">Phone</div>
            <Link
              href="tel:+856-84-123-456"
              className="opacity-80 hover:opacity-100 hover:underline transition-colors"
            >
              +856 84 123 456
            </Link>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3">
          <Mail className="w-4 h-4 text-bokeo-teal-300 flex-shrink-0" />
          <div>
            <div className="font-medium">Email</div>
            <Link
              href="mailto:info@bokeoairport.la"
              className="opacity-80 hover:opacity-100 hover:underline transition-colors"
            >
              info@bokeoairport.la
            </Link>
          </div>
        </div>

        {/* Website */}
        <div className="flex items-center space-x-3">
          <Globe className="w-4 h-4 text-bokeo-teal-300 flex-shrink-0" />
          <div>
            <div className="font-medium">Website</div>
            <Link
              href="https://bokeoairport.la"
              className="opacity-80 hover:opacity-100 hover:underline transition-colors"
            >
              bokeoairport.la
            </Link>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="flex items-start space-x-3">
          <Clock className="w-4 h-4 mt-1 text-bokeo-teal-300 flex-shrink-0" />
          <div>
            <div className="font-medium mb-1">Operating Hours</div>
            <div className="opacity-80 space-y-1">
              <div>Airport: 24/7</div>
              <div>Information Desk: 06:00 - 22:00</div>
              <div>Check-in: 2 hours before departure</div>
            </div>
          </div>
        </div>

        {/* Airport Code */}
        <div className="bg-bokeo-teal-700/30 rounded-lg p-3 mt-4">
          <div className="font-medium mb-1">Airport Code</div>
          <div className="text-lg font-bold text-bokeo-teal-200">BKX</div>
          <div className="text-xs opacity-70">IATA Code</div>
        </div>
      </div>
    </div>
  );
}
