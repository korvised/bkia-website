import Image from "next/image";
import { Metadata } from "next";
import {
  BadgeCheck,
  Building,
  Building2,
  Hotel,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { Lang } from "@/types/language";

interface HotelServicesPageProps {
  params: Promise<{ lang: string }>;
}

interface HotelListing {
  id: string;
  name: string;
  category: "premium" | "midrange" | "budget";
  location: string;
  distance: string;
  rating: number;
  description: string;
  amenities: string[];
  contact?: string;
  address?: string;
  image?: string;
  featured?: boolean;
}

export async function generateMetadata({
  params,
}: HotelServicesPageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Hotel Services",
      description:
        "Airport hotel and accommodation services at Bokeo International Airport. Find transit hotels, rest areas, day rooms, and nearby hotel information with booking options.",
    },
    lo: {
      title: "ບໍລິການໂຮງແຮມ",
      description:
        "ບໍລິການໂຮງແຮມ ແລະ ທີ່ພັກໃນສະໜາມບິນສາກົນບໍ່ແກ້ວ. ຊອກຫາໂຮງແຮມຖ່າຍທອດ, ພື້ນທີ່ພັກຜ່ອນ, ຫ້ອງພັກກາງເວັນ ແລະ ຂໍ້ມູນໂຮງແຮມໃກ້ຄຽງພ້ອມທາງເລືອກການຈອງ.",
    },
    zh: {
      title: "酒店服务",
      description:
        "博胶国际机场的机场酒店和住宿服务。查找中转酒店、休息区、日间客房和附近酒店信息及预订选项。",
    },
  };

  return {
    title: metadata[lang as Lang].title,
    description: metadata[lang as Lang].description,
  };
}

export default async function HotelServicesPage() {
  const hotels: HotelListing[] = [
    // Premium Hotels
    {
      id: "the-m-bokeo",
      name: "The M Bokeo Hotel",
      category: "premium",
      location: "Houayxay",
      distance: "55 km from airport (45-60 minutes)",
      rating: 4.5,
      description:
        "Luxurious hotel located in Houayxay, Bokeo, offering elegant accommodations with stunning river views. Features spacious rooms, modern amenities, and exceptional service. Free shuttle service to town center available.",
      amenities: [
        "Free WiFi",
        "Swimming Pool",
        "Restaurant",
        "Bar",
        "Spa Services",
        "Fitness Center",
        "Airport Shuttle",
        "River View",
        "Business Center",
        "24-hour Front Desk",
      ],
      address: "Houayxay, Bokeo Province",
      image: "/images/hotels/the-m-bokeo.webp",
      featured: true,
    },
    {
      id: "kapok-hotel",
      name: "Kapok Star Hotel",
      category: "premium",
      location: "Golden Triangle SEZ, Tonpheung",
      distance: "10 minutes from airport",
      rating: 4.0,
      description:
        "Premium hotel located next to Blue Shield Casino in the Golden Triangle Special Economic Zone, very close to Bokeo International Airport. Offers luxurious modern rooms with elegant furnishings, excellent service, and convenient access to entertainment, international dining, and shopping facilities within the zone.",
      amenities: [
        "Free WiFi",
        "Air Conditioning",
        "Restaurant",
        "Bar",
        "Casino Access",
        "Room Service",
        "Laundry Service",
        "Business Center",
        "Conference Rooms",
        "Parking",
      ],
      address: "Golden Triangle SEZ, Ton Pheung District",
      image: "/images/hotels/kapok-star.webp",
      featured: true,
    },

    // Mid-Range Hotels
    {
      id: "monethong-hotel",
      name: "Monethong Hotel",
      category: "midrange",
      location: "Ban Houayxay",
      distance: "55 km from airport (45-60 minutes)",
      rating: 4.1,
      description:
        "Comfortable mid-range hotel in Ban Houayxay offering well-appointed rooms with modern amenities. Features friendly service, convenient location, and excellent value. Popular choice for both business and leisure travelers.",
      amenities: [
        "Free WiFi",
        "Air Conditioning",
        "Restaurant",
        "Room Service",
        "Laundry Service",
        "Private Bathroom",
        "Cable TV",
        "Parking",
      ],
      address: "Ban Houayxay, Bokeo Province",
    },

    // Budget-Friendly Options
    {
      id: "sabaydee-guesthouse",
      name: "Sabaydee Guesthouse",
      category: "budget",
      location: "Ban Houayxay",
      distance: "55 km from airport (45-60 minutes)",
      rating: 4.1,
      description:
        "Clean and comfortable budget accommodation with garden and terrace. Some rooms feature balconies with stunning Mekong River and Thailand views. Perfect for travelers seeking value and comfort.",
      amenities: [
        "Free WiFi",
        "Air Conditioning",
        "Garden",
        "Terrace",
        "River View (select rooms)",
        "Flat-screen TV",
      ],
      address: "Ban Houayxay, Bokeo Province",
    },
    {
      id: "little-hostel",
      name: "Little Hostel",
      category: "budget",
      location: "Ban Houayxay",
      distance: "55 km from airport (45-60 minutes)",
      rating: 4.3,
      description:
        "Cozy hostel with excellent location perfect for The Gibbon Experience. Features garden, shared lounge, and restaurant. Known for friendly owners, great breakfast, and helpful services including SIM cards and money exchange.",
      amenities: [
        "Free WiFi",
        "Restaurant",
        "Garden",
        "Shared Lounge",
        "Tour Services",
        "Breakfast Included",
      ],
      address: "Ban Houayxay, Bokeo Province",
    },
    {
      id: "oudomphone-guesthouse",
      name: "Oudomphone Guesthouse 2",
      category: "budget",
      location: "Ban Houayxay",
      distance: "55 km from airport (45-60 minutes)",
      rating: 4.2,
      description:
        "Budget-friendly guesthouse with clean, comfortable rooms. Ideal location for accessing The Gibbon Experience and slow boat services. Offers excellent breakfast and very friendly service.",
      amenities: [
        "Free WiFi",
        "Air Conditioning",
        "Breakfast",
        "Tour Booking",
        "Clean Rooms",
      ],
      address: "Ban Houayxay, Bokeo Province",
    },
    {
      id: "thadan-guesthouse",
      name: "THADAN Guest House",
      category: "budget",
      location: "Ban Houayxay",
      distance: "55 km from airport (45-60 minutes)",
      rating: 4.0,
      description:
        "3-star guesthouse with air-conditioned rooms featuring free WiFi. Select units offer balconies with beautiful river views. Perfect for budget travelers seeking comfort and convenience.",
      amenities: [
        "Free WiFi",
        "Air Conditioning",
        "River View (select rooms)",
        "Terrace",
        "Private Bathroom",
      ],
      address: "Ban Houayxay, Bokeo Province",
    },
    {
      id: "over-the-moon",
      name: "Over the Moon Hostel",
      category: "budget",
      location: "Ban Houayxay",
      distance: "55 km from airport (45-60 minutes)",
      rating: 4.1,
      description:
        "Friendly hostel with comfortable beds and shared lounge area. Great location for the slow boat to Luang Prabang. Staff helps arrange all travel needs and provides excellent local information.",
      amenities: [
        "Free WiFi",
        "Shared Lounge",
        "Comfortable Beds",
        "Travel Services",
        "Food Arrangements",
      ],
      address: "Ban Houayxay, Bokeo Province",
    },
    {
      id: "manilath-guesthouse",
      name: "Manilath Guesthouse",
      category: "budget",
      location: "Ban Houayxay",
      distance: "55 km from airport (45-60 minutes)",
      rating: 4.0,
      description:
        "Centrally located guesthouse offering clean rooms with city views. Features family rooms and excellent service. Perfect for early arrivals with flexible check-in arrangements.",
      amenities: [
        "Free WiFi",
        "City View",
        "Terrace",
        "Family Rooms",
        "Hot Shower",
        "Central Location",
      ],
      address: "Ban Houayxay, Bokeo Province",
    },
    {
      id: "riverside-houayxay",
      name: "Houayxai Riverside Hotel",
      category: "budget",
      location: "Ban Houayxay",
      distance: "55 km from airport (45-60 minutes)",
      rating: 3.8,
      description:
        "Budget hotel situated along the Mekong River with views of Laos-Thai commerce. Short walk from ferry crossing to Thailand. Convenient location with nearby restaurants.",
      amenities: [
        "Free WiFi",
        "River View",
        "Private Bathroom",
        "Near Ferry Terminal",
      ],
      address: "Ban Houayxay, Bokeo Province",
    },
  ];

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "premium":
        return {
          label: "Premium",
          color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        };
      case "midrange":
        return {
          label: "Mid-Range",
          color: "bg-blue-100 text-blue-800 border-blue-300",
        };
      case "budget":
        return {
          label: "Budget-Friendly",
          color: "bg-green-100 text-green-800 border-green-300",
        };
      default:
        return {
          label: "Standard",
          color: "bg-gray-100 text-gray-800 border-gray-300",
        };
    }
  };

  const featuredHotels = hotels.filter((h) => h.featured);
  const premiumHotels = hotels.filter(
    (h) => h.category === "premium" && !h.featured,
  );
  const midrangeHotels = hotels.filter(
    (h) => h.category === "midrange" && !h.featured,
  );
  const budgetHotels = hotels.filter((h) => h.category === "budget");

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="flex-shrink-0">
          <div className="bg-bokeo-teal-100 flex h-16 w-16 items-center justify-center rounded-xl sm:h-20 sm:w-20">
            <Building className="text-bokeo-teal-600 h-8 w-8 sm:h-10 sm:w-10" />
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:mb-3 sm:text-3xl">
            Hotel Services
          </h1>
          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
            Discover comfortable accommodations near Bokeo International
            Airport. From luxury hotels in the Golden Triangle Special Economic
            Zone to budget-friendly guesthouses in Houayxay town.
          </p>
        </div>
      </div>

      {/* Important Information */}
      <div className="border-bokeo-teal-500 rounded-r-lg border-l-4 bg-blue-50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Hotel className="text-bokeo-teal-600 mt-0.5 h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6" />
          <div>
            <p className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
              Airport Hotel Services
            </p>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              Bokeo International Airport is located in Tonpheung District, in
              the Golden Triangle Special Economic Zone. Hotels in the Golden
              Triangle SEZ are just 5 minutes away, while Houayxay town is
              approximately 55 km (45-60 minutes) from the airport. Many hotels
              offer airport shuttle services.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Hotels */}
      {featuredHotels.length > 0 && (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
            <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 sm:h-6 sm:w-6" />
            Featured Hotels
          </h2>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {featuredHotels.map((hotel) => {
              const badge = getCategoryBadge(hotel.category);

              return (
                <div
                  key={hotel.id}
                  className="border-bokeo-teal-200 overflow-hidden rounded-xl border-2 bg-white transition-shadow hover:shadow-xl"
                >
                  {/* Hotel Image */}
                  <div className="from-bokeo-teal-100 to-bokeo-teal-200 relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br sm:h-48">
                    {hotel.image ? (
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <Hotel className="text-bokeo-teal-400 h-16 w-16 sm:h-20 sm:w-20" />
                    )}
                  </div>

                  {/* Hotel Content */}
                  <div className="p-4 sm:p-6">
                    <div className="mb-2 flex items-start justify-between gap-2 sm:mb-3">
                      <div className="flex-grow">
                        <h3 className="mb-1 text-lg font-bold text-gray-900 sm:text-xl">
                          {hotel.name}
                        </h3>
                        <div className="mb-1.5 flex items-center gap-1.5 text-xs text-gray-600 sm:mb-2 sm:gap-2 sm:text-sm">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{hotel.location}</span>
                        </div>
                      </div>
                      <span
                        className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold sm:px-3 sm:py-1 ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${
                              i < Math.floor(hotel.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-gray-700 sm:text-sm">
                        {hotel.rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-500 sm:text-sm">
                        •
                      </span>
                      <span className="text-bokeo-teal-600 text-xs font-medium sm:text-sm">
                        {hotel.distance}
                      </span>
                    </div>

                    <p className="mb-3 text-xs leading-relaxed text-gray-700 sm:mb-4 sm:text-sm">
                      {hotel.description}
                    </p>

                    <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
                      {hotel.amenities.slice(0, 6).map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-bokeo-teal-50 text-bokeo-teal-700 rounded-full px-2 py-0.5 text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {hotel.address && (
                      <p className="text-xs text-gray-600 sm:text-sm">
                        <strong>Address:</strong> {hotel.address}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Premium Hotels */}
      {premiumHotels.length > 0 && (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Premium Accommodations
          </h2>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {premiumHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
              >
                {/* Hotel Image */}
                <div className="flex h-32 items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 sm:h-40">
                  <Hotel className="h-12 w-12 text-yellow-400 sm:h-16 sm:w-16" />
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="mb-1.5 text-base font-bold text-gray-900 sm:mb-2 sm:text-lg">
                    {hotel.name}
                  </h3>
                  <div className="mb-1.5 flex items-center gap-1 text-xs text-gray-600 sm:mb-2 sm:text-sm">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{hotel.location}</span>
                  </div>
                  <p className="mb-2 line-clamp-3 text-xs text-gray-700 sm:mb-3 sm:text-sm">
                    {hotel.description}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {hotel.amenities.slice(0, 4).map((amenity, index) => (
                      <span
                        key={index}
                        className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700 sm:px-2"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mid-Range Hotels */}
      {midrangeHotels.length > 0 && (
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Mid-Range Hotels
          </h2>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {midrangeHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
              >
                <div className="flex h-32 items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 sm:h-40">
                  <Building2 className="h-12 w-12 text-blue-400 sm:h-16 sm:w-16" />
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="mb-1.5 text-base font-bold text-gray-900 sm:mb-2 sm:text-lg">
                    {hotel.name}
                  </h3>
                  <div className="mb-1.5 flex items-center gap-1 text-xs text-gray-600 sm:mb-2 sm:text-sm">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{hotel.location}</span>
                  </div>
                  <p className="mb-2 line-clamp-3 text-xs text-gray-700 sm:mb-3 sm:text-sm">
                    {hotel.description}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {hotel.amenities.slice(0, 4).map((amenity, index) => (
                      <span
                        key={index}
                        className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-700 sm:px-2"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Budget Hotels */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Budget-Friendly Options
        </h2>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {budgetHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md sm:p-5"
            >
              <div className="mb-2 flex items-start gap-2 sm:mb-3 sm:gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 sm:h-12 sm:w-12">
                  <Hotel className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-grow">
                  <h3 className="mb-0.5 text-sm font-bold text-gray-900 sm:mb-1 sm:text-base">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>{hotel.location}</span>
                  </div>
                </div>
              </div>

              <p className="mb-2 line-clamp-2 text-xs text-gray-700 sm:mb-3 sm:text-sm">
                {hotel.description}
              </p>

              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {hotel.amenities.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="rounded bg-green-50 px-1.5 py-0.5 text-xs text-green-700 sm:px-2"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Information */}
      <div className="from-bokeo-teal-50 to-bokeo-teal-100 border-bokeo-teal-200 rounded-xl border bg-gradient-to-br p-4 sm:p-6">
        <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
          Booking Information
        </h3>
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-4 sm:p-5">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base">
              <Phone className="text-bokeo-teal-600 h-4 w-4 sm:h-5 sm:w-5" />
              How to Book
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700 sm:space-y-2 sm:text-sm">
              <li>
                • Book directly through hotel websites or booking platforms
              </li>
              <li>• Contact hotels via phone or email for reservations</li>
              <li>• Many hotels offer airport pick-up services</li>
              <li>• Walk-in reservations available at most properties</li>
            </ul>
          </div>

          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-4 sm:p-5">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base">
              <BadgeCheck className="text-bokeo-teal-600 h-4 w-4 sm:h-5 sm:w-5" />
              Tips for Travelers
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700 sm:space-y-2 sm:text-sm">
              <li>• Book in advance during peak tourist season</li>
              <li>• Confirm airport shuttle availability when booking</li>
              <li>• Check if breakfast is included in room rate</li>
              <li>
                • Many budget hotels popular with Gibbon Experience visitors
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Area Information */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
          <MapPin className="text-bokeo-teal-600 h-5 w-5 sm:h-6 sm:w-6" />
          Hotel Locations
        </h3>
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base">
              Houayxay Town
            </h4>
            <p className="mb-1.5 text-xs text-gray-700 sm:mb-2 sm:text-sm">
              <strong>Distance from Airport:</strong> 55 km (45-60 minutes by
              car)
            </p>
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
              The provincial capital offers a wide range of accommodations from
              budget guesthouses to mid-range hotels. Located along the Mekong
              River with views of Thailand. Close to temples, markets, and the
              famous slow boat to Luang Prabang. Connected to the airport via
              Route 3.
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base">
              Golden Triangle SEZ, Tonpheung
            </h4>
            <p className="mb-1.5 text-xs text-gray-700 sm:mb-2 sm:text-sm">
              <strong>Distance from Airport:</strong> 5 minutes by car (nearest
              hotels)
            </p>
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
              The airport is located within Tonpheung District in the Special
              Economic Zone. This area features premium hotels with casino
              access, international restaurants, shopping, and entertainment
              facilities. Modern infrastructure with Mekong River views at the
              convergence of Laos, Myanmar, and Thailand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
