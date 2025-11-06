# Bokeo International Airport Website - Project Structure

## Overview
Complete file structure for Bokeo International Airport website built with Next.js 15, TypeScript, and Tailwind CSS v4. The frontend consumes APIs from a separate NestJS backend service.

## Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Turbopack
- **Backend**: External NestJS API service

---

## 📁 Project Structure

```
bokeo-airport-website/
├── src/
│   ├── app/                              # Next.js 15 App Router
│   │   ├── globals.css                   # Global styles with Tailwind v4
│   │   ├── layout.tsx                    # Root layout
│   │   ├── loading.tsx                   # Global loading UI
│   │   ├── not-found.tsx                 # 404 page
│   │   ├── error.tsx                     # Global error boundary
│   │   ├── page.tsx                      # Homepage
│   │   │
│   │   ├── flights/                      # ✈️ Flight Information
│   │   │   ├── page.tsx                  # Flight schedules main page
│   │   │   ├── layout.tsx                # Flights layout
│   │   │   ├── loading.tsx               # Flights loading state
│   │   │   ├── departures/
│   │   │   │   ├── page.tsx              # Departure flights
│   │   │   │   └── loading.tsx           # Departures loading
│   │   │   ├── arrivals/
│   │   │   │   ├── page.tsx              # Arrival flights
│   │   │   │   └── loading.tsx           # Arrivals loading
│   │   │   ├── status/
│   │   │   │   └── page.tsx              # Flight status lookup
│   │   │   └── search/
│   │   │       └── page.tsx              # Flight search results
│   │   │
│   │   ├── services/                     # 🏢 Airport Services
│   │   │   ├── page.tsx                  # Services overview
│   │   │   ├── layout.tsx                # Services layout
│   │   │   ├── loading.tsx               # Services loading
│   │   │   │
│   │   │   ├── dining-shopping/          # 🍽️ Dining & Shopping
│   │   │   │   ├── page.tsx              # Overview
│   │   │   │   ├── restaurants/
│   │   │   │   │   ├── page.tsx          # Restaurant listings
│   │   │   │   │   ├── loading.tsx       # Loading state
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx      # Individual restaurant
│   │   │   │   │       ├── loading.tsx   # Detail loading
│   │   │   │   │       └── not-found.tsx # Restaurant not found
│   │   │   │   ├── shops/
│   │   │   │   │   ├── page.tsx          # Shop listings
│   │   │   │   │   ├── loading.tsx       # Shop loading
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx      # Individual shop
│   │   │   │   │       ├── loading.tsx   # Shop detail loading
│   │   │   │   │       └── not-found.tsx # Shop not found
│   │   │   │   └── duty-free/
│   │   │   │       ├── page.tsx          # Duty-free shopping
│   │   │   │       └── loading.tsx       # Duty-free loading
│   │   │   │
│   │   │   ├── joyful-service/           # 🎉 Joyful Services
│   │   │   │   ├── page.tsx              # Overview
│   │   │   │   ├── entertainment/
│   │   │   │   │   └── page.tsx          # Entertainment facilities
│   │   │   │   ├── relaxation/
│   │   │   │   │   └── page.tsx          # Relaxation areas
│   │   │   │   ├── family/
│   │   │   │   │   └── page.tsx          # Family services
│   │   │   │   └── business/
│   │   │   │       └── page.tsx          # Business lounge
│   │   │   │
│   │   │   ├── lost-found/               # 🔍 Lost & Found
│   │   │   │   ├── page.tsx              # Main page
│   │   │   │   ├── report/
│   │   │   │   │   └── page.tsx          # Report lost items
│   │   │   │   └── claim/
│   │   │   │       └── page.tsx          # Claim items
│   │   │   │
│   │   │   └── cultural-interaction/     # 🎭 Cultural Programs
│   │   │       ├── page.tsx              # Overview
│   │   │       ├── exhibitions/
│   │   │       │   ├── page.tsx          # Current exhibitions
│   │   │       │   └── [id]/
│   │   │       │       ├── page.tsx      # Exhibition details
│   │   │       │       ├── loading.tsx   # Exhibition loading
│   │   │       │       └── not-found.tsx # Exhibition not found
│   │   │       ├── performances/
│   │   │       │   └── page.tsx          # Cultural performances
│   │   │       └── workshops/
│   │   │           └── page.tsx          # Cultural workshops
│   │   │
│   │   ├── transportation/               # 🚌 Transportation
│   │   │   ├── page.tsx                  # Overview
│   │   │   ├── layout.tsx                # Transportation layout
│   │   │   ├── loading.tsx               # Transportation loading
│   │   │   │
│   │   │   ├── ground-transport/         # Ground Transportation
│   │   │   │   ├── page.tsx              # Overview
│   │   │   │   ├── bus/
│   │   │   │   │   └── page.tsx          # Bus services
│   │   │   │   ├── taxi/
│   │   │   │   │   └── page.tsx          # Taxi services
│   │   │   │   ├── car-rental/
│   │   │   │   │   └── page.tsx          # Car rental
│   │   │   │   └── ride-share/
│   │   │   │       └── page.tsx          # Ride sharing
│   │   │   │
│   │   │   ├── parking/                  # 🅿️ Parking
│   │   │   │   ├── page.tsx              # Parking information
│   │   │   │   ├── rates/
│   │   │   │   │   └── page.tsx          # Parking rates
│   │   │   │   └── reservations/
│   │   │   │       └── page.tsx          # Parking reservations
│   │   │   │
│   │   │   └── directions/
│   │   │       └── page.tsx              # Directions to airport
│   │   │
│   │   ├── cargo/                        # 📦 Air Cargo
│   │   │   ├── page.tsx                  # Overview
│   │   │   ├── layout.tsx                # Cargo layout
│   │   │   ├── loading.tsx               # Cargo loading
│   │   │   ├── tracking/
│   │   │   │   └── page.tsx              # Cargo tracking
│   │   │   ├── rates/
│   │   │   │   └── page.tsx              # Shipping rates
│   │   │   ├── services/
│   │   │   │   └── page.tsx              # Cargo services
│   │   │   └── contact/
│   │   │       └── page.tsx              # Cargo contact
│   │   │
│   │   ├── about/                        # ℹ️ About Airport
│   │   │   ├── page.tsx                  # Overview
│   │   │   ├── layout.tsx                # About layout
│   │   │   ├── history/
│   │   │   │   └── page.tsx              # Airport history
│   │   │   ├── management/
│   │   │   │   └── page.tsx              # Management team
│   │   │   └── sustainability/
│   │   │       └── page.tsx              # Sustainability initiatives
│   │   │
│   │   └── contact/                      # 📞 Contact Information
│   │       ├── page.tsx                  # Contact main
│   │       ├── emergency/
│   │       │   └── page.tsx              # Emergency contacts
│   │       └── feedback/
│   │           └── page.tsx              # Feedback form
│   │
│   ├── components/                       # 🧩 React Components
│   │   ├── ui/                          # Base UI Components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── skeleton.tsx             # Loading skeleton
│   │   │   ├── separator.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── index.ts                 # Export all UI components
│   │   │
│   │   ├── layout/                      # 🎨 Layout Components
│   │   │   ├── header/
│   │   │   │   ├── header.tsx           # Main header (Server Component)
│   │   │   │   ├── navigation.tsx       # Main navigation (Server Component)
│   │   │   │   ├── mobile-menu.tsx      # Mobile menu (Client Component)
│   │   │   │   ├── language-selector.tsx # Language switcher (Client Component)
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── footer/
│   │   │   │   ├── footer.tsx           # Main footer (Server Component)
│   │   │   │   ├── quick-links.tsx      # Quick links (Server Component)
│   │   │   │   ├── contact-info.tsx     # Contact information (Server Component)
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── sidebar/
│   │   │   │   ├── right-sidebar.tsx    # Right sidebar menu (Server Component)
│   │   │   │   ├── sidebar-item.tsx     # Sidebar item (Client Component)
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── breadcrumbs/
│   │   │       ├── breadcrumbs.tsx      # Breadcrumbs (Server Component)
│   │   │       └── index.ts
│   │   │
│   │   ├── homepage/                    # 🏠 Homepage Specific
│   │   │   ├── airport-homepage.tsx     # Main homepage container (Server Component)
│   │   │   ├── hero-section.tsx         # Hero section (Server Component)
│   │   │   ├── date-time-display.tsx    # Date/time display (Client Component)
│   │   │   ├── flight-search.tsx        # Flight search widget (Client Component)
│   │   │   ├── quick-services.tsx       # Quick service links (Server Component)
│   │   │   ├── news-section.tsx         # News and announcements (Server Component)
│   │   │   └── index.ts
│   │   │
│   │   ├── flights/                     # ✈️ Flight Components
│   │   │   ├── flight-board.tsx         # Flight information board (Server Component)
│   │   │   ├── flight-card.tsx          # Individual flight card (Server Component)
│   │   │   ├── flight-search-form.tsx   # Flight search form (Client Component)
│   │   │   ├── flight-status.tsx        # Flight status indicator (Server Component)
│   │   │   ├── flight-filter.tsx        # Flight filter options (Client Component)
│   │   │   ├── real-time-updates.tsx    # Real-time flight updates (Client Component)
│   │   │   └── index.ts
│   │   │
│   │   ├── services/                    # 🏢 Service Components
│   │   │   ├── service-card.tsx         # Service information card (Server Component)
│   │   │   ├── service-map.tsx          # Interactive service map (Client Component)
│   │   │   ├── service-directory.tsx    # Service directory (Server Component)
│   │   │   ├── restaurant-card.tsx      # Restaurant card (Server Component)
│   │   │   ├── shop-card.tsx            # Shop card (Server Component)
│   │   │   ├── hours-display.tsx        # Operating hours display (Server Component)
│   │   │   └── index.ts
│   │   │
│   │   ├── transportation/              # 🚌 Transportation Components
│   │   │   ├── transport-card.tsx       # Transport option card (Server Component)
│   │   │   ├── parking-map.tsx          # Parking map (Client Component)
│   │   │   ├── directions-map.tsx       # Directions map (Client Component)
│   │   │   ├── transport-schedule.tsx   # Transport schedule (Server Component)
│   │   │   ├── parking-availability.tsx # Real-time parking (Client Component)
│   │   │   └── index.ts
│   │   │
│   │   ├── cargo/                       # 📦 Cargo Components
│   │   │   ├── tracking-form.tsx        # Cargo tracking form (Client Component)
│   │   │   ├── tracking-result.tsx      # Tracking results (Server Component)
│   │   │   ├── cargo-services.tsx       # Cargo services list (Server Component)
│   │   │   ├── rate-calculator.tsx      # Rate calculator (Client Component)
│   │   │   └── index.ts
│   │   │
│   │   ├── cultural/                    # 🎭 Cultural Components
│   │   │   ├── exhibition-card.tsx      # Exhibition card (Server Component)
│   │   │   ├── event-calendar.tsx       # Cultural events calendar (Client Component)
│   │   │   ├── cultural-map.tsx         # Cultural locations map (Client Component)
│   │   │   ├── performance-schedule.tsx # Performance schedule (Server Component)
│   │   │   └── index.ts
│   │   │
│   │   └── common/                      # 🛠️ Common Components
│   │       ├── loading-spinner.tsx      # Loading spinner (Client Component)
│   │       ├── error-boundary.tsx       # Error boundary (Client Component)
│   │       ├── search-bar.tsx           # General search bar (Client Component)
│   │       ├── interactive-map.tsx      # Interactive map (Client Component)
│   │       ├── image-gallery.tsx        # Image gallery (Client Component)
│   │       ├── contact-form.tsx         # Contact form (Client Component)
│   │       ├── weather-widget.tsx       # Weather widget (Client Component)
│   │       └── index.ts
│   │
│   ├── lib/                             # 📚 Utility Libraries
│   │   ├── utils.ts                     # General utilities (cn function, etc.)
│   │   ├── constants.ts                 # App constants
│   │   ├── validations.ts               # Zod validation schemas
│   │   ├── api-client.ts                # API client for NestJS backend
│   │   ├── auth.ts                      # Authentication utilities
│   │   ├── date-utils.ts                # Date utilities
│   │   ├── format-utils.ts              # Formatting utilities
│   │   └── server-actions.ts            # Server actions
│   │
│   ├── hooks/                           # 🔗 Custom React Hooks (Client-side only)
│   │   ├── use-flights.ts               # Flight data hook
│   │   ├── use-services.ts              # Services data hook
│   │   ├── use-transportation.ts        # Transportation hook
│   │   ├── use-cargo-tracking.ts        # Cargo tracking hook
│   │   ├── use-local-storage.ts         # Local storage hook
│   │   ├── use-debounce.ts              # Debounce hook
│   │   ├── use-date-time.ts             # Date/time hook
│   │   ├── use-weather.ts               # Weather data hook
│   │   └── use-real-time.ts             # Real-time updates hook
│   │
│   ├── context/                         # 🌐 React Context (Client Components)
│   │   ├── app-context.tsx              # Global app context
│   │   ├── language-context.tsx         # Language context
│   │   ├── theme-context.tsx            # Theme context
│   │   └── index.ts
│   │
│   ├── types/                           # 📝 TypeScript Type Definitions
│   │   ├── flight.ts                    # Flight related types
│   │   ├── service.ts                   # Service related types
│   │   ├── transportation.ts            # Transportation types
│   │   ├── cargo.ts                     # Cargo types
│   │   ├── cultural.ts                  # Cultural events types
│   │   ├── user.ts                      # User types
│   │   ├── api.ts                       # API response types
│   │   ├── common.ts                    # Common types
│   │   └── index.ts                     # Export all types
│   │
│   ├── data/                            # 📊 Static Data & Mock Data
│   │   ├── navigation.ts                # Navigation menu data
│   │   ├── services-data.ts             # Services static data
│   │   ├── transportation-data.ts       # Transportation options
│   │   ├── restaurants-data.ts          # Restaurant data
│   │   ├── shops-data.ts                # Shop data
│   │   ├── cultural-events-data.ts      # Cultural events data
│   │   ├── emergency-contacts.ts        # Emergency contacts
│   │   └── mock-data.ts                 # Mock data for development
│   │
│   └── styles/                          # 🎨 Styling (Tailwind v4)
│       ├── globals.css                  # Global styles with Tailwind v4
│       └── components.css               # Component-specific styles
│
├── public/                              # 📁 Static Assets
│   ├── images/
│   │   ├── logo/
│   │   │   ├── bkia-logo.png
│   │   │   ├── bkia-logo-white.png
│   │   │   └── favicon.ico
│   │   ├── homepage/
│   │   │   ├── banner.jpg
│   │   │   ├── hero-background.jpg
│   │   │   └── airport-exterior.jpg
│   │   ├── services/
│   │   │   ├── dining/                  # Restaurant/cafe images
│   │   │   ├── shopping/                # Shop/duty-free images
│   │   │   └── entertainment/           # Entertainment facility images
│   │   ├── transportation/
│   │   │   ├── bus-service.jpg
│   │   │   ├── taxi-stand.jpg
│   │   │   ├── parking-area.jpg
│   │   │   └── rental-cars.jpg
│   │   ├── cultural/
│   │   │   ├── exhibitions/             # Exhibition images
│   │   │   └── performances/            # Performance images
│   │   ├── cargo/
│   │   │   ├── cargo-facility.jpg
│   │   │   └── loading-dock.jpg
│   │   └── icons/
│   │       ├── flight-icon.svg
│   │       ├── service-icon.svg
│   │       ├── transport-icon.svg
│   │       ├── cargo-icon.svg
│   │       └── cultural-icon.svg
│   ├── documents/
│   │   ├── brochures/
│   │   │   ├── airport-guide-en.pdf
│   │   │   └── airport-guide-lo.pdf
│   │   ├── maps/
│   │   │   ├── terminal-map.pdf
│   │   │   └── ground-transport-map.pdf
│   │   └── schedules/
│   │       ├── bus-schedule.pdf
│   │       └── shuttle-schedule.pdf
│   ├── fonts/
│   │   ├── lao/
│   │   │   ├── NotoSansLao-Regular.woff2
│   │   │   └── NotoSansLao-Bold.woff2
│   │   └── english/
│   │       ├── Inter-Regular.woff2
│   │       └── Inter-Bold.woff2
│   └── manifest.json                    # PWA manifest
│
├── config/                              # ⚙️ Configuration Files
│   ├── environment.ts                   # Environment configuration
│   └── api-endpoints.ts                 # API endpoint definitions
│
├── middleware.ts                        # Next.js middleware
├── next.config.ts                       # Next.js 15 configuration
├── tailwind.config.ts                   # Tailwind CSS v4 configuration
├── tsconfig.json                        # TypeScript configuration
├── package.json                         # Dependencies
├── prettier.config.js                   # Prettier configuration
├── .env.local                          # Environment variables
├── .env.example                        # Environment variables example
├── .gitignore                          # Git ignore rules
└── README.md                           # Project documentation
```
