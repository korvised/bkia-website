import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RightSidebar } from "@/components/layout/sidebar";
import HeroSection from "./hero-section";
import DateTimeDisplay from "./date-time-display";
import FlightSearch from "./flight-search";
import NewsSection from "./news-section";

export default function AirportHomepage() {
  return (
    <div className="w-full">
      {/* Fixed Header */}
      <Header />

      {/* Main Hero Section with Background Image */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image - Full Screen */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/homepage/banner.jpg)" }}
        />

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <HeroSection />
        </div>

        {/* Date Time Display */}
        <DateTimeDisplay />

        {/* Flight Search - Overlaid on hero section */}
        <FlightSearch />
      </section>

      {/* Transportation Section */}
      <section className="relative min-h-screen w-full">
        {/* Transportation Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/transportation/parking-area.jpg)" }}
        />

        {/* Transportation Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-6 py-16">

            {/* Transportation Info Overlay */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-2xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                往来机场的交通服务
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                为您提供便捷的路车、出租车、大巴车等交通资讯
              </p>

              {/* Transportation Options Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bokeo-teal-500 text-white p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🚗</div>
                  <div className="font-medium">汽车客运站</div>
                </div>
                <div className="bg-bokeo-blue-500 text-white p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🚕</div>
                  <div className="font-medium">出租车</div>
                </div>
                <div className="bg-bokeo-teal-500 text-white p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🅿️</div>
                  <div className="font-medium">停车场</div>
                </div>
                <div className="bg-bokeo-blue-500 text-white p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🚌</div>
                  <div className="font-medium">地铁</div>
                </div>
                <div className="bg-bokeo-teal-500 text-white p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🚐</div>
                  <div className="font-medium">定制客运线</div>
                </div>
                <div className="bg-bokeo-blue-500 text-white p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">✈️</div>
                  <div className="font-medium">无人驾行</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping & Dining Section */}
      <section className="relative min-h-screen w-full">
        {/* Shopping Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-purple-50" />

        <div className="relative z-10 min-h-screen flex flex-col justify-center">
          {/* Image Gallery */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

              {/* Large Featured Image */}
              <div className="lg:col-span-2 relative rounded-2xl overflow-hidden h-96 group">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: "url(/images/services/dining/restaurant-1.jpg)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">地道の力</h3>
                  <p className="text-sm opacity-90">China's curry</p>
                </div>
              </div>

              {/* Two Smaller Images */}
              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden h-44 group">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: "url(/images/services/shopping/duty-free.jpg)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold">免税店</h4>
                    <p className="text-xs opacity-90">DUTY FREE</p>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden h-44 group">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: "url(/images/services/entertainment/lounge.jpg)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold">休息区</h4>
                    <p className="text-xs opacity-90">Lounge Area</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* Right Sidebar */}
      <RightSidebar />

      {/* Footer with Background Image */}
      <footer className="relative w-full">
        {/* Footer Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/homepage/airport-exterior.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bokeo-teal-900/90 to-bokeo-blue-900/70" />

        <div className="relative z-10">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
