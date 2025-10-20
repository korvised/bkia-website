import {
  Camera,
  Clock,
  Compass,
  Info,
  MapPin,
  Mountain,
  Star,
} from "lucide-react";
import Image from "next/image";
// import { Lang } from "@/types/language";

/*interface BokeoVisitPageProps {
  params: Promise<{ lang: Lang }>;
}*/

interface Attraction {
  id: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  activities: string[];
  bestTime: string;
  duration: string;
  difficulty?: string;
  location: string;
  image?: string;
  tips: string[];
}

export default async function BokeoVisitPage() {
  const attractions: Attraction[] = [
    {
      id: "gibbon-experience",
      name: "The Gibbon Experience",
      category: "Eco-Tourism Adventure",
      description:
        "One of the most unique and exhilarating experiences in Southeast Asia. Stay in spectacular treehouses 40 meters high in the jungle canopy, zip-line through pristine forest, and listen to the haunting calls of critically endangered black-crested gibbons in the Bokeo Nature Reserve.",
      highlights: [
        "Sleep in treehouses 40m above the forest floor",
        "Zip-line through jungle canopy on Southeast Asia's longest lines",
        "Spot endangered black-crested gibbons",
        "Trek through pristine primary rainforest",
        "Conservation-funded eco-tourism project",
      ],
      activities: [
        "Zip-lining",
        "Jungle trekking",
        "Wildlife watching",
        "Photography",
        "Nature immersion",
      ],
      bestTime:
        "November to April (dry season) - July to September for green season experience",
      duration: "2-3 days",
      difficulty: "Moderate - Good physical condition required",
      location: "Bokeo Nature Reserve, 3 hours from Houayxay",
      image: "/images/attractions/gibbon-experience.jpg",
      tips: [
        "Book in advance - tours fill up quickly",
        "Bring: headlamp, insect repellent, comfortable hiking shoes",
        "Tours depart from Houayxay office",
        "All meals, equipment, and guides included",
        "Age restrictions: 8-65 years old for Classic Tour",
      ],
    },
    {
      id: "mekong-river-cruise",
      name: "Mekong River Cruise",
      category: "Scenic River Journey",
      description:
        "Experience the mighty Mekong River on a scenic cruise from Houayxay. Enjoy breathtaking views of riverside villages, lush landscapes, and the convergence of Laos, Thailand, and Myanmar at the famous Golden Triangle.",
      highlights: [
        "Panoramic views of three countries meeting",
        "Traditional riverside villages",
        "Sunset over the Mekong River",
        "Local markets and river life",
        "Gateway to Luang Prabang (2-day journey)",
      ],
      activities: [
        "River cruising",
        "Photography",
        "Village visits",
        "Cultural experiences",
        "Relaxation",
      ],
      bestTime: "Year-round, best November to February",
      duration: "Half-day to 2-day options available",
      location: "Mekong River, departing from Houayxay",
      image: "/images/attractions/mekong-river-cruise.webp",
      tips: [
        "Slow boat to Luang Prabang is popular 2-day journey",
        "Speed boats available for faster travel",
        "Luxury cruise options with meals included",
        "Bring sun protection and camera",
        "Book accommodation in Pakbeng for overnight trips",
      ],
    },
    {
      id: "wat-jom-khao-manilat",
      name: "Wat Jom Khao Manilat",
      category: "Cultural Heritage",
      description:
        "Beautiful Shan-style teak temple built in 1880, perched on a hilltop in central Houayxay. This sacred Buddhist temple features intricate wooden architecture, colorful three-tiered roofs, and houses a stone stele dating back to 1458.",
      highlights: [
        "Stunning Shan-style wooden architecture",
        "Historic stone stele from 1458",
        "Panoramic views of Mekong River and Thailand",
        "Peaceful meditation atmosphere",
        "Important local pilgrimage site",
      ],
      activities: [
        "Temple visiting",
        "Cultural learning",
        "Photography",
        "Meditation",
        "Mekong River viewpoint",
      ],
      bestTime: "Year-round, sunrise and sunset particularly beautiful",
      duration: "1-2 hours",
      location: "Hilltop, central Houayxay town",
      image: "/images/attractions/wat-jom-khao-manilat.jpg",
      tips: [
        "Dress modestly (cover shoulders and knees)",
        "Remove shoes before entering temple buildings",
        "Climb stairs early morning to avoid heat",
        "Bring camera for stunning river views",
        "Monks available for English practice conversations",
      ],
    },
    {
      id: "golden-triangle",
      name: "Golden Triangle",
      category: "Historic Landmark",
      description:
        "Visit the legendary Golden Triangle where Laos, Myanmar, and Thailand meet at the confluence of the Mekong and Ruak rivers. This historically significant region offers stunning river views, local markets, and insights into the area's fascinating past.",
      highlights: [
        "Stand at the meeting point of three countries",
        "Don Sao Island market (duty-free shopping)",
        "Historic opium trade history",
        "Scenic Mekong River views",
        "Golden Triangle Special Economic Zone",
      ],
      activities: [
        "Border viewing",
        "Market shopping",
        "Boat trips",
        "Photography",
        "Historical tours",
      ],
      bestTime: "Year-round, cooler months November-February preferred",
      duration: "Half-day to full-day",
      location: "Tonpheung District, 55km from Bokeo International Airport",
      image: "/images/attractions/golden-triangle.webp",
      tips: [
        "Take boat from Thailand to visit Don Sao Island",
        "Passport required for border viewing",
        "Local currency (LAK, THB, USD) accepted at markets",
        "Combine with visit to Golden Triangle SEZ",
        "Be cautious of counterfeit goods at markets",
      ],
    },
    {
      id: "bokeo-nature-reserve",
      name: "Bokeo Nature Reserve",
      category: "Wildlife Conservation",
      description:
        "A 136,000-hectare protected area of mixed deciduous forest and mountainous terrain, home to the critically endangered black-crested gibbon and diverse wildlife including elephants, tigers, bears, and over 300 bird species.",
      highlights: [
        "Critically endangered black-crested gibbons",
        "Pristine primary rainforest",
        "Diverse wildlife: elephants, bears, tigers",
        "Over 300 bird species",
        "Conservation success story",
      ],
      activities: [
        "Wildlife observation",
        "Bird watching",
        "Nature photography",
        "Eco-trekking",
        "Conservation education",
      ],
      bestTime: "November to February (cool season) for gibbon calls",
      duration: "Day trips to multi-day expeditions",
      difficulty: "Easy to challenging depending on trek",
      location: "Northwest Bokeo Province, accessed via Houayxay",
      image: "/images/attractions/bokeo-nature-reserve.jpg",
      tips: [
        "Hire local guides for best wildlife spotting",
        "Gibbon calls heard best in early morning",
        "Respect protected area regulations",
        "Support conservation by visiting",
        "Combine with Gibbon Experience for immersive stay",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-12">
      {/* Page Header */}
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-2xl sm:h-16 sm:w-16">
            <Compass className="text-primary-600 h-6 w-6 sm:h-8 sm:w-8" />
          </div>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Discover Bokeo
        </h1>
        <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
          Explore the natural wonders, cultural treasures, and unforgettable
          experiences in Bokeo Province. From canopy zip-lining adventures to
          ancient temples and the legendary Golden Triangle, discover what makes
          Bokeo a hidden gem of Northern Laos.
        </p>
      </div>

      {/* Introduction */}
      <div className="from-primary-50 to-primary-100 border-primary-200 rounded-xl border bg-gradient-to-br p-4 sm:p-6 md:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <Info className="text-primary-600 mt-1 h-6 w-6 flex-shrink-0" />
          <div>
            <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
              About Bokeo Province
            </h2>
            <p className="mb-3 text-sm leading-relaxed text-gray-700 sm:text-base">
              Bokeo, meaning "gem mine," is Laos' smallest province but offers
              some of its richest experiences. Located in the Golden Triangle
              where Laos, Myanmar, and Thailand converge, Bokeo is renowned for
              eco-tourism, wildlife conservation, and cultural diversity with
              over 34 ethnic groups.
            </p>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              The province capital, Houayxay, sits on the Mekong River and
              serves as a gateway to Northern Laos adventures. With pristine
              forests, endangered wildlife, and warm local hospitality, Bokeo
              offers authentic experiences for nature lovers and cultural
              explorers alike.
            </p>
          </div>
        </div>
      </div>

      {/* Top Attractions */}
      <section className="space-y-8">
        <h2 className="px-4 text-2xl font-bold text-gray-900 sm:px-0 sm:text-3xl">
          Top Attractions & Experiences
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {attractions.map((attraction, index) => (
            <div
              key={attraction.id}
              className="overflow-hidden rounded-xl border-2 border-gray-200 bg-white transition-shadow hover:shadow-xl"
            >
              <div className="grid gap-0 sm:grid-cols-5">
                {/* Image */}
                <div className="from-primary-100 to-primary-200 relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br sm:col-span-2 sm:h-64 md:h-auto">
                  {attraction.image ? (
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                  ) : (
                    <Mountain className="text-primary-400 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />
                  )}
                  {/* Number Badge */}
                  <div className="bg-primary-600 absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full shadow-lg sm:h-12 sm:w-12">
                    <span className="text-lg font-bold text-white sm:text-xl">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:col-span-3 sm:p-6 md:p-8">
                  <div className="mb-3 sm:mb-4">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      {attraction.category}
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-gray-900 sm:mb-3 sm:text-2xl">
                    {attraction.name}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                    {attraction.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="mb-2 text-xs font-semibold text-gray-900 sm:text-sm">
                      Highlights:
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {attraction.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Star className="text-primary-600 mt-0.5 h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                          <span className="text-xs text-gray-700 sm:text-sm">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="bg-primary-50 mb-4 grid grid-cols-2 gap-3 rounded-lg p-3 sm:grid-cols-2 sm:gap-4 sm:p-4">
                    <div className="flex items-start gap-2">
                      <Clock className="text-primary-600 mt-0.5 h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                      <div>
                        <p className="text-xs font-semibold text-gray-900">
                          Duration
                        </p>
                        <p className="text-xs text-gray-700 sm:text-sm">
                          {attraction.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="text-primary-600 mt-0.5 h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                      <div>
                        <p className="text-xs font-semibold text-gray-900">
                          Location
                        </p>
                        <p className="text-xs text-gray-700 sm:text-sm">
                          {attraction.location}
                        </p>
                      </div>
                    </div>
                    {attraction.difficulty && (
                      <div className="flex items-start gap-2">
                        <Mountain className="text-primary-600 mt-0.5 h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                        <div>
                          <p className="text-xs font-semibold text-gray-900">
                            Difficulty
                          </p>
                          <p className="text-xs text-gray-700 sm:text-sm">
                            {attraction.difficulty}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <Camera className="text-primary-600 mt-0.5 h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                      <div>
                        <p className="text-xs font-semibold text-gray-900">
                          Best Time
                        </p>
                        <p className="text-xs text-gray-700 sm:text-sm">
                          {attraction.bestTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tips Collapsible */}
                  <details className="group">
                    <summary className="text-primary-600 hover:text-primary-700 flex cursor-pointer list-none items-center gap-2 text-xs font-semibold sm:text-sm">
                      <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Travel Tips & Important Information</span>
                      <span className="ml-auto transform transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="mt-3 space-y-1 pl-4 sm:pl-6">
                      {attraction.tips.map((tip, idx) => (
                        <p
                          key={idx}
                          className="text-xs leading-relaxed text-gray-700 sm:text-sm"
                        >
                          • {tip}
                        </p>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practical Information */}
      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 md:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
          Practical Information for Visitors
        </h2>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          <div className="space-y-3">
            <div className="mb-2 flex items-center gap-2">
              <Clock className="text-primary-600 h-4 w-4 sm:h-5 sm:w-5" />
              <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                Best Time to Visit
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
              <strong>Dry Season:</strong> November to April - ideal for outdoor
              activities, clearer skies, comfortable temperatures.
            </p>
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
              <strong>Green Season:</strong> May to October - lush landscapes,
              fewer tourists, occasional rain.
            </p>
          </div>

          <div className="space-y-3">
            <div className="mb-2 flex items-center gap-2">
              <MapPin className="text-primary-600 h-4 w-4 sm:h-5 sm:w-5" />
              <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                Getting Around
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
              <strong>From Airport:</strong> Bokeo International Airport in
              Tonpheung (Golden Triangle SEZ area).
            </p>
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
              <strong>To Houayxay:</strong> 55km (1 hour) by taxi or arranged
              transport. Local tuk-tuks, taxis, and rental motorcycles available
              in town.
            </p>
          </div>

          <div className="space-y-3">
            <div className="mb-2 flex items-center gap-2">
              <Info className="text-primary-600 h-4 w-4 sm:h-5 sm:w-5" />
              <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                Important Notes
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
              • Hire local guides for trekking and wildlife activities
            </p>
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
              • Respect local customs and dress modestly at temples
            </p>
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm">
              • Cash (LAK, USD, THB) widely accepted
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="from-primary-600 to-primary-700 rounded-xl bg-gradient-to-r p-6 text-center text-white sm:p-8">
        <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">
          Ready to Explore Bokeo?
        </h2>
        <p className="mx-auto mb-4 max-w-2xl text-base sm:mb-6 sm:text-lg">
          Start your adventure in one of Laos' most captivating provinces. From
          jungle canopies to ancient temples, unforgettable experiences await.
        </p>
        <div className="flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-4">
          <div className="text-primary-600 rounded-lg bg-white px-4 py-2 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base">
            Tourist Information: Houayxay
          </div>
          <div className="text-primary-600 rounded-lg bg-white px-4 py-2 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base">
            Book Activities in Advance
          </div>
        </div>
      </div>
    </div>
  );
}
