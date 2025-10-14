import {
  ChefHat,
  Clock,
  DollarSign,
  Gift,
  MapPin,
  ShoppingBag,
  ShoppingCart,
  Star,
  Utensils,
} from "lucide-react";
import Image from "next/image";
// import { Lang } from "@/types/language";

/*interface DiningShoppingPageProps {
  params: Promise<{ lang: Lang }>;
}*/

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  priceRange: string;
  rating: number;
  description: string;
  specialties: string[];
  hours: string;
  image?: string;
}

interface Shop {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  products: string[];
  hours: string;
  image?: string;
}

export default async function DiningShoppingPage() {
  const restaurants: Restaurant[] = [
    {
      id: "golden-triangle-restaurant",
      name: "Golden Triangle Restaurant",
      cuisine: "Lao & International",
      location: "Departure Terminal",
      priceRange: "$$",
      rating: 4.5,
      description:
        "Authentic Lao cuisine and international favorites in a modern setting. Features local specialties and comfort food for travelers.",
      specialties: [
        "Laap",
        "Tam Mak Hoong",
        "Khao Piak Sen",
        "Grilled Fish",
        "International Breakfast",
      ],
      hours: "06:00 - 22:00",
      image: "/images/dining/golden-triangle-restaurant.jpg",
    },
    {
      id: "mekong-coffee-lounge",
      name: "Mekong Coffee Lounge",
      cuisine: "Café & Bakery",
      location: "Pre-Security Area",
      priceRange: "$",
      rating: 4.3,
      description:
        "Cozy café serving premium Lao coffee, fresh pastries, and light snacks. Perfect spot to relax before your flight.",
      specialties: [
        "Lao Coffee",
        "Croissants",
        "Sandwiches",
        "Fresh Juices",
        "Smoothies",
      ],
      hours: "05:00 - 21:00",
      image: "/images/dining/mekong-coffee-lounge.jpg",
    },
    {
      id: "sky-view-restaurant",
      name: "Sky View Restaurant",
      cuisine: "Asian Fusion",
      location: "Departure Terminal",
      priceRange: "$$",
      rating: 4.4,
      description:
        "Contemporary Asian fusion restaurant with panoramic airport views. Offers diverse menu combining Thai, Chinese, and Lao flavors.",
      specialties: [
        "Pad Thai",
        "Stir-Fry Noodles",
        "Spring Rolls",
        "Fried Rice",
        "Curry Dishes",
      ],
      hours: "07:00 - 21:00",
      image: "/images/dining/sky-view-restaurant.jpg",
    },
    {
      id: "bokeo-noodle-house",
      name: "Bokeo Noodle House",
      cuisine: "Lao Noodles",
      location: "Food Court",
      priceRange: "$",
      rating: 4.2,
      description:
        "Quick service noodle shop specializing in traditional Lao noodle soups and stir-fried noodles. Affordable and delicious.",
      specialties: [
        "Pho",
        "Khao Poon",
        "Pad See Ew",
        "Boat Noodles",
        "Wonton Noodles",
      ],
      hours: "06:00 - 20:00",
      image: "/images/dining/bokeo-noodle-house.jpg",
    },
    {
      id: "international-bistro",
      name: "International Bistro",
      cuisine: "Western & International",
      location: "Departure Terminal",
      priceRange: "$$",
      rating: 4.3,
      description:
        "Western-style bistro offering burgers, pizzas, pasta, and steaks. Comfortable dining for international travelers.",
      specialties: ["Burgers", "Pizza", "Pasta", "Steaks", "Salads"],
      hours: "08:00 - 22:00",
      image: "/images/dining/international-bistro.jpg",
    },
    {
      id: "quick-bite-express",
      name: "Quick Bite Express",
      cuisine: "Fast Food",
      location: "Food Court",
      priceRange: "$",
      rating: 4.0,
      description:
        "Fast food outlet with quick service for travelers on the go. Offers sandwiches, wraps, and grab-and-go options.",
      specialties: [
        "Sandwiches",
        "Wraps",
        "Salad Boxes",
        "Snacks",
        "Cold Drinks",
      ],
      hours: "05:30 - 22:00",
      image: "/images/dining/quick-bite-express.jpg",
    },
    {
      id: "royal-thai-cuisine",
      name: "Royal Thai Cuisine",
      cuisine: "Thai",
      location: "Departure Terminal",
      priceRange: "$$",
      rating: 4.4,
      description:
        "Authentic Thai restaurant bringing Bangkok flavors to Bokeo. Features classic Thai dishes with fresh ingredients.",
      specialties: [
        "Tom Yum",
        "Green Curry",
        "Massaman Curry",
        "Som Tam",
        "Mango Sticky Rice",
      ],
      hours: "10:00 - 21:00",
      image: "/images/dining/royal-thai-cuisine.jpg",
    },
    {
      id: "dim-sum-delight",
      name: "Dim Sum Delight",
      cuisine: "Chinese",
      location: "Food Court",
      priceRange: "$",
      rating: 4.1,
      description:
        "Chinese dim sum and noodle house serving steamed dumplings, buns, and traditional Chinese favorites.",
      specialties: [
        "Dumplings",
        "Steamed Buns",
        "Dim Sum",
        "Congee",
        "Chinese Noodles",
      ],
      hours: "07:00 - 20:00",
      image: "/images/dining/dim-sum-delight.png",
    },
    {
      id: "airport-lounge-dining",
      name: "VIP Lounge Dining",
      cuisine: "Premium Multi-Cuisine",
      location: "VIP Lounge",
      priceRange: "$$$",
      rating: 4.6,
      description:
        "Exclusive dining in the VIP lounge featuring premium dishes, buffet options, and complimentary beverages.",
      specialties: [
        "Buffet Selection",
        "Premium Wines",
        "Gourmet Dishes",
        "Fresh Sushi",
        "Premium Desserts",
      ],
      hours: "05:00 - 22:00 (VIP Access Only)",
      image: "/images/dining/vip-lounge-dining.webp",
    },
  ];

  const shops: Shop[] = [
    {
      id: "duty-free-boutique",
      name: "Bokeo Duty Free",
      category: "Duty Free",
      location: "Departure Terminal (After Security)",
      description:
        "Premium duty-free shopping offering international brands of perfumes, cosmetics, alcohol, tobacco, and luxury goods at tax-free prices.",
      products: [
        "Perfumes & Cosmetics",
        "Alcohol & Spirits",
        "Tobacco Products",
        "Luxury Watches",
        "Designer Accessories",
      ],
      hours: "06:00 - Last Flight",
      image: "/images/shops/bokeo-duty-free.jpg",
    },
    {
      id: "lao-souvenirs",
      name: "Lao Heritage Souvenirs",
      category: "Souvenirs & Gifts",
      location: "Departure Terminal",
      description:
        "Authentic Lao handicrafts, textiles, and souvenirs. Perfect place to buy last-minute gifts and mementos of your Laos visit.",
      products: [
        "Handwoven Textiles",
        "Traditional Crafts",
        "Local Coffee",
        "Lao Silk Products",
        "Wood Carvings",
      ],
      hours: "06:00 - 21:00",
      image: "/images/shops/lao-heritage-souvenirs.webp",
    },
    {
      id: "travel-essentials",
      name: "Travel Essentials Store",
      category: "Convenience Store",
      location: "Pre-Security Area",
      description:
        "Convenience store stocking travel essentials, snacks, beverages, reading materials, and personal care items.",
      products: [
        "Snacks & Beverages",
        "Travel Accessories",
        "Magazines & Books",
        "Personal Care",
        "Phone Chargers",
      ],
      hours: "05:00 - 22:00",
      image: "/images/shops/travel-essentials.jpg",
    },
    {
      id: "fashion-boutique",
      name: "Style & Fashion Boutique",
      category: "Fashion & Accessories",
      location: "Departure Terminal",
      description:
        "Contemporary fashion boutique featuring clothing, accessories, and jewelry from local and international brands.",
      products: [
        "Clothing",
        "Handbags",
        "Jewelry",
        "Sunglasses",
        "Fashion Accessories",
      ],
      hours: "07:00 - 21:00",
      image: "/images/shops/style-fashion-boutique.jpg",
    },
    {
      id: "electronics-tech",
      name: "Tech Zone",
      category: "Electronics",
      location: "Departure Terminal",
      description:
        "Electronics and gadgets store offering smartphones, headphones, cameras, and travel tech accessories.",
      products: [
        "Headphones",
        "Portable Chargers",
        "Cameras",
        "Travel Adapters",
        "Smart Watches",
      ],
      hours: "07:00 - 21:00",
      image: "/images/shops/tech-zone.jpg",
    },
    {
      id: "bookstore",
      name: "Airport Bookshop",
      category: "Books & Magazines",
      location: "Departure Terminal",
      description:
        "Wide selection of books, magazines, newspapers, and stationery. Perfect for your flight reading.",
      products: [
        "Books",
        "Magazines",
        "Newspapers",
        "Travel Guides",
        "Stationery",
      ],
      hours: "06:00 - 21:00",
      image: "/images/shops/airport-bookshop.jpg",
    },
    {
      id: "pharmacy",
      name: "Airport Pharmacy",
      category: "Health & Wellness",
      location: "Pre-Security Area",
      description:
        "Pharmacy offering over-the-counter medications, health products, vitamins, and personal care items.",
      products: [
        "OTC Medications",
        "Vitamins & Supplements",
        "First Aid",
        "Personal Care",
        "Health Products",
      ],
      hours: "06:00 - 22:00",
      image: "/images/shops/airport-pharmacy.jpg",
    },
    {
      id: "kids-toys",
      name: "Kids Corner",
      category: "Toys & Games",
      location: "Departure Terminal",
      description:
        "Toy store featuring children's toys, games, and entertainment items to keep little travelers happy.",
      products: [
        "Toys",
        "Games",
        "Coloring Books",
        "Stuffed Animals",
        "Travel Activities",
      ],
      hours: "07:00 - 20:00",
      image: "/images/shops/kids-corner.jpg",
    },
    {
      id: "luggage-bags",
      name: "Luggage & Bags",
      category: "Travel Goods",
      location: "Pre-Security Area",
      description:
        "Travel goods store offering luggage, bags, backpacks, and travel accessories for all your journey needs.",
      products: [
        "Suitcases",
        "Backpacks",
        "Travel Bags",
        "Locks & Tags",
        "Packing Organizers",
      ],
      hours: "06:00 - 21:00",
      image: "/images/shops/luggage-bags.webp",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl">
          Dining & Shopping
        </h1>
        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
          Explore our diverse selection of restaurants and shops at Bokeo
          International Airport. From authentic Lao cuisine to international
          favorites, and duty-free shopping to local souvenirs.
        </p>
      </div>

      {/* Dining Section */}
      <section className="space-y-6 sm:space-y-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-bokeo-teal-100 flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12">
            <Utensils className="text-bokeo-teal-600 h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Restaurants & Dining
            </h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Savor delicious cuisines from around the world
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              {/* Restaurant Image */}
              <div className="from-bokeo-teal-100 to-bokeo-teal-200 relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br sm:h-48">
                {restaurant.image ? (
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <ChefHat className="text-bokeo-teal-400 h-16 w-16 sm:h-20 sm:w-20" />
                )}
              </div>

              {/* Restaurant Content */}
              <div className="p-4 sm:p-5">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex-grow">
                    <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg">
                      {restaurant.name}
                    </h3>
                    <p className="text-bokeo-teal-600 mb-1 text-xs font-medium sm:text-sm">
                      {restaurant.cuisine}
                    </p>
                  </div>
                  <span className="rounded bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800">
                    {restaurant.priceRange}
                  </span>
                </div>

                <div className="mb-3 flex items-center gap-3 text-xs text-gray-600 sm:gap-4 sm:text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs">{restaurant.location}</span>
                  </div>
                </div>

                <p className="mb-3 line-clamp-2 text-xs text-gray-700 sm:text-sm">
                  {restaurant.description}
                </p>

                <div className="mb-3">
                  <p className="mb-1 text-xs font-semibold text-gray-900">
                    Specialties:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.specialties
                      .slice(0, 3)
                      .map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-bokeo-teal-50 text-bokeo-teal-700 rounded-full px-2 py-0.5 text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 border-t border-gray-100 pt-3 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>{restaurant.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shopping Section */}
      <section className="space-y-6 sm:space-y-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 sm:h-12 sm:w-12">
            <ShoppingBag className="h-5 w-5 text-orange-600 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Shopping
            </h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Browse our collection of shops and boutiques
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              {/* Shop Image */}
              <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 sm:h-48">
                {shop.image ? (
                  <Image
                    src={shop.image}
                    alt={shop.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <ShoppingCart className="h-16 w-16 text-orange-400 sm:h-20 sm:w-20" />
                )}
              </div>

              {/* Shop Content */}
              <div className="p-4 sm:p-5">
                <div className="mb-2">
                  <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg">
                    {shop.name}
                  </h3>
                  <p className="mb-1 text-xs font-medium text-orange-600 sm:text-sm">
                    {shop.category}
                  </p>
                </div>

                <div className="mb-3 flex items-center gap-1 text-xs text-gray-600 sm:text-sm">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs">{shop.location}</span>
                </div>

                <p className="mb-3 line-clamp-2 text-xs text-gray-700 sm:text-sm">
                  {shop.description}
                </p>

                <div className="mb-3">
                  <p className="mb-1 text-xs font-semibold text-gray-900">
                    Products:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {shop.products.slice(0, 3).map((product, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 border-t border-gray-100 pt-3 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>{shop.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Information */}
      <div className="from-bokeo-teal-50 to-bokeo-teal-100 border-bokeo-teal-200 rounded-xl border bg-gradient-to-br p-4 sm:p-6 md:p-8">
        <h3 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
          Shopping & Dining Information
        </h3>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <DollarSign className="text-bokeo-teal-600 h-4 w-4 sm:h-5 sm:w-5" />
              <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                Payment Methods
              </h4>
            </div>
            <ul className="space-y-1 text-xs text-gray-700 sm:text-sm">
              <li>• Cash (LAK, USD, THB)</li>
              <li>• Credit/Debit Cards</li>
              <li>• Mobile Payment Apps</li>
              <li>• Duty-Free: Tax Refund Available</li>
            </ul>
          </div>

          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <Clock className="text-bokeo-teal-600 h-4 w-4 sm:h-5 sm:w-5" />
              <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                Operating Hours
              </h4>
            </div>
            <ul className="space-y-1 text-xs text-gray-700 sm:text-sm">
              <li>• Most shops: 06:00 - 21:00</li>
              <li>• Duty-Free: Until last flight</li>
              <li>• 24-hour convenience stores</li>
              <li>• Dining: 05:00 - 22:00</li>
            </ul>
          </div>

          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <Gift className="text-bokeo-teal-600 h-4 w-4 sm:h-5 sm:w-5" />
              <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                Special Offers
              </h4>
            </div>
            <ul className="space-y-1 text-xs text-gray-700 sm:text-sm">
              <li>• Duty-free exclusive prices</li>
              <li>• Loyalty program discounts</li>
              <li>• Seasonal promotions</li>
              <li>• Gift wrapping available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
