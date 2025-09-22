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

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd bokeo-airport-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev --turbopack
```

### Development Scripts
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

---

## 🔧 Configuration Files

### package.json
```json
{
  "name": "bokeo-airport-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "lucide-react": "^0.400.0",
    "next": "15.5.3",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "tailwindcss-merge": "^2.0.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "prettier-plugin-tailwindcss": "^0.6.14",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### Environment Variables (.env.example)
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_API_VERSION=v1

# Application Configuration
NEXT_PUBLIC_APP_NAME="Bokeo International Airport"
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Features Flags
NEXT_PUBLIC_ENABLE_REAL_TIME_UPDATES=true
NEXT_PUBLIC_ENABLE_CARGO_TRACKING=true
NEXT_PUBLIC_ENABLE_CULTURAL_EVENTS=true

# External Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🌐 API Integration

### API Client Configuration
Since the backend is a separate NestJS project, all API calls are handled through a centralized API client:

```typescript
// src/lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiClient = {
  flights: {
    getDepartures: () => fetch(`${API_BASE_URL}/flights/departures`),
    getArrivals: () => fetch(`${API_BASE_URL}/flights/arrivals`),
    searchFlights: (query: string) => fetch(`${API_BASE_URL}/flights/search?q=${query}`),
    getFlightStatus: (flightNumber: string) => fetch(`${API_BASE_URL}/flights/${flightNumber}`)
  },
  services: {
    getRestaurants: () => fetch(`${API_BASE_URL}/services/restaurants`),
    getShops: () => fetch(`${API_BASE_URL}/services/shops`),
    getServiceById: (id: string) => fetch(`${API_BASE_URL}/services/${id}`)
  },
  transportation: {
    getSchedules: () => fetch(`${API_BASE_URL}/transportation/schedules`),
    getParkingInfo: () => fetch(`${API_BASE_URL}/transportation/parking`)
  },
  cargo: {
    trackPackage: (trackingNumber: string) => fetch(`${API_BASE_URL}/cargo/track/${trackingNumber}`),
    getRates: () => fetch(`${API_BASE_URL}/cargo/rates`)
  },
  cultural: {
    getExhibitions: () => fetch(`${API_BASE_URL}/cultural/exhibitions`),
    getEvents: () => fetch(`${API_BASE_URL}/cultural/events`)
  }
}
```

### Expected NestJS API Endpoints
Your NestJS backend should provide these endpoints:

```
GET /api/flights/departures
GET /api/flights/arrivals
GET /api/flights/search?q={query}
GET /api/flights/{flightNumber}

GET /api/services/restaurants
GET /api/services/shops
GET /api/services/{id}

GET /api/transportation/schedules
GET /api/transportation/parking

GET /api/cargo/track/{trackingNumber}
GET /api/cargo/rates

GET /api/cultural/exhibitions
GET /api/cultural/events
GET /api/cultural/exhibitions/{id}

POST /api/contact/feedback
POST /api/services/lost-found/report
```

---

## 🎨 Styling System

### Tailwind CSS v4 Custom Theme
```css
/* src/app/globals.css */
@import "tailwindcss";

@layer base {
  :root {
    --primary: 174 100% 29%;        /* Bokeo Teal */
    --secondary: 217 91% 60%;       /* Bokeo Blue */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
}

/* Custom component styles */
.flight-status-on-time { @apply bg-green-100 text-green-800; }
.flight-status-delayed { @apply bg-yellow-100 text-yellow-800; }
.flight-status-cancelled { @apply bg-red-100 text-red-800; }
```

### Component Structure Guidelines
- **Server Components**: For static content, better SEO, faster loading
- **Client Components**: For interactive features, state management
- **Layouts**: Shared UI across route groups
- **Loading States**: Proper loading UX with skeleton components
- **Error Boundaries**: Graceful error handling

---

## 📱 Features Overview

### ✈️ Flight Information System
- Real-time departure/arrival boards
- Flight search and filtering
- Flight status tracking
- Gate and terminal information

### 🏢 Airport Services
- **Dining & Shopping**: Restaurant and shop directory with details
- **Joyful Services**: Entertainment, relaxation, family areas
- **Lost & Found**: Report and claim system
- **Cultural Interaction**: Exhibitions, performances, workshops

### 🚌 Transportation Hub
- **Ground Transport**: Bus, taxi, ride-share, car rental
- **Parking**: Real-time availability, rates, reservations
- **Directions**: Interactive maps and navigation

### 📦 Cargo Services
- Package tracking system
- Shipping rates calculator
- Cargo services information

### 🌍 Multilingual Support
- English and Lao language support
- Cultural-appropriate design patterns
- Proper font handling for Lao script

---

## 🔐 Security Considerations

### Environment Variables
- All sensitive data in environment variables
- Separate configurations for development/production
- API keys properly secured

### Input Validation
- Zod schemas for all form inputs
- Server-side validation for all data
- XSS protection through proper sanitization

---

## 🚀 Deployment

### Production Build
```bash
npm run build --turbopack
npm start
```

### Deployment Platforms
- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: Good alternative with edge functions
- **AWS Amplify**: For AWS ecosystem integration
- **Docker**: For containerized deployment

---

## 📊 Performance Optimizations

- **Server Components**: Reduced JavaScript bundle size
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic route-based splitting
- **Turbopack**: Faster development builds
- **Font Optimization**: Local font loading for better performance

---

## 🧪 Testing Strategy

### Recommended Testing Stack
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

### Testing Structure
```
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   └── utils/
└── components/
    └── __tests__/
```

---

## 📚 Development Guidelines

### Code Organization
- **Feature-based structure**: Group related components
- **Clear naming conventions**: Descriptive file and component names
- **Type safety**: Comprehensive TypeScript types
- **Component composition**: Reusable, composable components

### Best Practices

#### Component Guidelines
```typescript
// ✅ Good: Server Component (default)
export default function FlightBoard({ flights }: { flights: Flight[] }) {
  return (
    <div className="space-y-4">
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  )
}

// ✅ Good: Client Component (when needed)
"use client"
export default function FlightSearch() {
  const [query, setQuery] = useState("")
  // Interactive logic here
  return <SearchForm />
}
```

#### API Integration Patterns
```typescript
// ✅ Server Component data fetching
async function getFlights(): Promise<Flight[]> {
  const response = await fetch(`${API_BASE_URL}/flights/departures`, {
    cache: 'no-store', // For real-time data
    next: { revalidate: 60 } // For cached data
  })
  return response.json()
}

// ✅ Client Component data fetching
function useFlights() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    apiClient.flights.getDepartures()
      .then(response => response.json())
      .then(setFlights)
      .finally(() => setLoading(false))
  }, [])
  
  return { flights, loading }
}
```

#### Error Handling
```typescript
// ✅ Error boundary for unexpected errors
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

// ✅ Graceful API error handling
async function fetchWithErrorHandling<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    return null
  }
}
```

---

## 🔄 State Management Strategy

### Server State vs Client State
- **Server State**: Flight data, services, schedules (from NestJS API)
- **Client State**: UI interactions, form inputs, user preferences
- **Global State**: Language preference, theme, user session

### Recommended Libraries
```bash
# For complex client state (optional)
npm install zustand

# For server state (optional)
npm install @tanstack/react-query

# For forms
npm install react-hook-form @hookform/resolvers
```

### State Management Examples
```typescript
// ✅ Simple client state with useState
function FlightSearch() {
  const [filters, setFilters] = useState({
    airline: '',
    status: '',
    destination: ''
  })
}

// ✅ Global state with Context (for simple cases)
const LanguageContext = createContext<{
  language: 'en' | 'lo'
  setLanguage: (lang: 'en' | 'lo') => void
}>()

// ✅ Zustand for complex client state (if needed)
const useAppStore = create<AppState>((set) => ({
  language: 'en',
  theme: 'light',
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
}))
```

---

## 🎨 UI/UX Guidelines

### Design System
```typescript
// ✅ Consistent spacing
const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
}

// ✅ Color palette
const colors = {
  bokeo: {
    teal: {
      50: '#f0fdfa',
      500: '#14b8a6',
      600: '#0d9488',
    },
    blue: {
      500: '#3b82f6',
      600: '#2563eb',
    }
  }
}
```

### Accessibility
- **Semantic HTML**: Use proper HTML elements
- **ARIA labels**: For screen readers
- **Keyboard navigation**: Tab indices and focus management
- **Color contrast**: WCAG AA compliance
- **Font sizes**: Readable text for all users

### Responsive Design
```css
/* Mobile-first approach */
.container {
  @apply px-4;           /* Mobile: 16px padding */
  @apply md:px-6;        /* Tablet: 24px padding */
  @apply lg:px-8;        /* Desktop: 32px padding */
  @apply xl:max-w-7xl;   /* Large: max width */
  @apply xl:mx-auto;     /* Large: center */
}
```

---

## 🔍 SEO Optimization

### Metadata Configuration
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Bokeo International Airport',
    default: 'Bokeo International Airport - Gateway to Laos',
  },
  description: 'Experience seamless travel at Bokeo International Airport',
  keywords: ['airport', 'Bokeo', 'Laos', 'flights', 'travel'],
  authors: [{ name: 'Bokeo Airport Team' }],
  openGraph: {
    title: 'Bokeo International Airport',
    description: 'Gateway to Laos',
    url: 'https://bokeoairport.la',
    siteName: 'Bokeo International Airport',
    images: [
      {
        url: '/images/logo/bkia-logo.png',
        width: 800,
        height: 600,
        alt: 'Bokeo International Airport',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bokeo International Airport',
    description: 'Gateway to Laos',
    images: ['/images/logo/bkia-logo.png'],
  },
}

// Page-specific metadata
// app/flights/page.tsx
export const metadata: Metadata = {
  title: 'Flight Information',
  description: 'Real-time flight departures and arrivals at Bokeo International Airport',
}
```

### Structured Data
```typescript
// JSON-LD for better SEO
const airportSchema = {
  "@context": "https://schema.org",
  "@type": "Airport",
  "name": "Bokeo International Airport",
  "alternateName": "ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
  "iataCode": "BKX", // Replace with actual code
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "LA",
    "addressRegion": "Bokeo Province"
  },
  "url": "https://bokeoairport.la"
}
```

---

## 📊 Analytics & Monitoring

### Performance Monitoring
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // Send to your analytics service
  console.log(metric)
}

// Measure Core Web Vitals
getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

### Error Tracking
```typescript
// Error boundary with reporting
export class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error reporting service
    console.error('Error caught by boundary:', error, errorInfo)
  }
}
```

---

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] Performance optimized
- [ ] SEO metadata added
- [ ] Error handling implemented
- [ ] Accessibility tested
- [ ] Mobile responsiveness verified
- [ ] TypeScript compilation successful
- [ ] Build process completed

### Production Environment
```bash
# Build optimization
npm run build

# Check bundle size
npx @next/bundle-analyzer

# Performance audit
npm run lighthouse
```

### Environment-specific Configurations
```typescript
// config/environment.ts
export const config = {
  development: {
    apiUrl: 'http://localhost:3001/api',
    debug: true,
  },
  production: {
    apiUrl: 'https://api.bokeoairport.la/api',
    debug: false,
  }
}
```

---

## 🔧 Maintenance & Updates

### Regular Tasks
- **Dependency Updates**: Monthly security updates
- **Content Updates**: Flight schedules, service information
- **Performance Monitoring**: Core Web Vitals tracking
- **Security Audits**: Regular vulnerability scans
- **Backup Procedures**: Data backup strategies

### Version Control
```bash
# Feature branch workflow
git checkout -b feature/cargo-tracking
git commit -m "feat: add cargo tracking functionality"
git push origin feature/cargo-tracking
```

### Documentation Updates
- Keep README updated with new features
- Document API changes
- Update deployment procedures
- Maintain component documentation

---

## 🎯 Future Enhancements

### Phase 2 Features
- [ ] **Push Notifications**: Flight updates, gate changes
- [ ] **Progressive Web App**: Offline functionality
- [ ] **Multi-currency Support**: International travelers
- [ ] **Advanced Analytics**: User behavior tracking
- [ ] **Chat Support**: Customer service integration
- [ ] **Mobile App**: React Native companion app

### Performance Improvements
- [ ] **Edge Computing**: CDN optimization
- [ ] **Image Optimization**: WebP/AVIF formats
- [ ] **Bundle Splitting**: Advanced code splitting
- [ ] **Caching Strategies**: Redis/memcached integration
- [ ] **Database Optimization**: Query performance

### Accessibility Enhancements
- [ ] **Screen Reader Support**: Enhanced ARIA
- [ ] **Voice Navigation**: Voice command support
- [ ] **High Contrast Mode**: Visual accessibility
- [ ] **Font Size Controls**: User preferences
- [ ] **Keyboard Shortcuts**: Power user features

---

## 📞 Support & Documentation

### Getting Help
- **Technical Issues**: Create GitHub issues
- **Feature Requests**: Use issue templates
- **Documentation**: Check README and inline comments
- **API Questions**: Refer to NestJS backend documentation

### Contributing
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Code review process

### Contact Information
- **Development Team**: dev@bokeoairport.la
- **Project Manager**: pm@bokeoairport.la
- **Technical Support**: support@bokeoairport.la

---

## 📝 License & Legal

### Copyright
© 2024 Bokeo International Airport. All rights reserved.

### Privacy Policy
Ensure compliance with:
- GDPR (if serving EU users)
- Local privacy laws
- Data retention policies
- Cookie consent management

### Terms of Service
- User responsibilities
- Service availability
- Limitation of liability
- Governing law

---

This comprehensive project structure provides a solid foundation for building a world-class airport website that can scale with your needs while maintaining excellent performance, accessibility, and user experience. The separation of frontend (Next.js) and backend (NestJS) allows for independent scaling and development workflows.
