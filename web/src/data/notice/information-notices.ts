import {
  Briefcase,
  Building2,
  Lightbulb,
  Megaphone,
  Plane,
  Scale,
} from "lucide-react";

export interface InformationNotice {
  id: string;
  title: string;
  description: string;
  content: string;
  category:
    | "airport-info"
    | "services"
    | "facilities"
    | "travel-tips"
    | "regulations";
  publishDate: string;
  lastUpdated?: string;
  tags?: string[];
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  relatedLinks?: {
    title: string;
    url: string;
  }[];
}

export const informationNotices: InformationNotice[] = [
  {
    id: "info-001",
    category: "airport-info",
    publishDate: "2025-09-01",
    lastUpdated: "2025-09-15",
    title: "Airport Terminal Map and Navigation Guide",
    description:
      "Comprehensive guide to navigating Bokeo International Airport terminals, including gate locations, facilities, and services.",
    content: `Welcome to Bokeo International Airport. This guide will help you navigate our facilities efficiently.

**Terminal Layout:**

Bokeo International Airport features a modern single-terminal design with two levels:

**Level 1 - Arrivals:**
- Baggage claim areas (Belts 1-4)
- Customs and immigration
- Ground transportation desk
- Car rental counters
- Welcome center and information desk
- ATMs and currency exchange

**Level 2 - Departures:**
- Check-in counters (Rows A-F)
- Security screening checkpoints
- Departure gates (Gates 1-12)
- Restaurants and cafes
- Duty-free shopping
- Business lounges
- Prayer rooms

**Gate Information:**

Gates 1-6: Domestic flights
Gates 7-12: International flights

Walking time from security to furthest gate: approximately 10 minutes

**Amenities:**

Free WiFi available throughout the terminal. Connect to "BokeoAirport_Free" network.

Charging stations located near all gate areas and in lounges.

Family rooms with baby changing facilities available on both levels.

**Accessibility:**

Wheelchair assistance available - request at check-in or information desk
Elevators and ramps provide access to all areas
Accessible restrooms on both levels
Visual and audio announcements for flight information

**Getting Around:**

Clear signage in English, Lao, and Chinese throughout the terminal
Information desks located at main entrance and near security
Digital flight information displays every 50 meters
Mobile app available for iOS and Android with interactive maps`,
    tags: ["Terminal Map", "Navigation", "Facilities", "Accessibility"],
    attachments: [
      {
        name: "Terminal Map (PDF)",
        url: "/documents/terminal-map.pdf",
        type: "application/pdf",
      },
      {
        name: "Accessibility Guide (PDF)",
        url: "/documents/accessibility-guide.pdf",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "info-002",
    category: "services",
    publishDate: "2025-08-28",
    title: "Baggage Policies and Guidelines",
    description:
      "Everything you need to know about baggage allowances, restrictions, and handling procedures at Bokeo International Airport.",
    content: `Understanding baggage policies helps ensure smooth travel. Please review these guidelines before your flight.

**Carry-On Baggage:**

Domestic Flights:
- 1 carry-on bag (max 7kg)
- 1 personal item (purse, laptop bag)
- Maximum dimensions: 56cm x 36cm x 23cm

International Flights:
- 1 carry-on bag (max 10kg)
- 1 personal item
- Maximum dimensions: 56cm x 36cm x 23cm

**Checked Baggage:**

Allowances vary by airline and ticket class. Typical allowances:

Economy Class:
- Domestic: 20kg
- International: 23kg (1 piece)

Business Class:
- Domestic: 30kg
- International: 32kg (2 pieces)

**Excess Baggage:**

Fees apply for baggage exceeding allowances. Rates vary by airline:
- Typical domestic excess: 50,000 LAK per kg
- Typical international excess: $15-25 USD per kg

Pre-purchase excess baggage online for discounted rates.

**Prohibited Items in Checked Baggage:**

- Lithium batteries (loose)
- Flammable liquids and gases
- Explosives and fireworks
- Compressed gases
- Toxic substances
- Magnetic materials

**Baggage Tracking:**

Most airlines offer baggage tracking via mobile apps. Keep your baggage claim tickets safe.

**Special Baggage:**

Sports Equipment:
- Golf clubs, skis, surfboards
- Must be properly packed
- Additional fees may apply
- Advance notification recommended

Musical Instruments:
- Small instruments as carry-on if within size limits
- Large instruments may require extra seat purchase
- Check with airline for specific policies

Medical Equipment:
- Wheelchairs and mobility devices transported free
- Oxygen concentrators allowed (advance notice required)
- CPAP machines as additional carry-on

**Delayed or Lost Baggage:**

Report immediately at baggage service desk before leaving airport.

Airlines typically deliver delayed baggage to your address within 24-48 hours.

Keep receipts for essential purchases if baggage is delayed.

**Baggage Storage:**

Left luggage facility available in arrivals area:
- Short-term: 30,000 LAK per day
- Long-term rates available
- Maximum storage: 30 days
- Operating hours: 6:00 AM - 10:00 PM`,
    tags: ["Baggage", "Policies", "Guidelines", "Travel Tips"],
    relatedLinks: [
      {
        title: "Prohibited Items List",
        url: "/documents/prohibited-items.pdf",
      },
    ],
  },
  {
    id: "info-003",
    category: "facilities",
    publishDate: "2025-09-10",
    title: "Airport Lounges and Premium Services",
    description:
      "Information about airport lounges, business centers, VIP services, and premium facilities available at Bokeo International Airport.",
    content: `Enhance your airport experience with our premium facilities and services.

**Business Lounges:**

Bokeo International Lounge (Domestic & International)
- Location: Level 2, after security, near Gate 8
- Access: Business class tickets, Priority Pass, day passes
- Hours: 5:30 AM - 11:00 PM daily
- Capacity: 120 guests

Amenities:
- Complimentary food and beverages
- Premium coffee and tea selection
- Full bar service
- High-speed WiFi
- Business center with computers and printers
- Private phone booths
- Shower facilities
- Comfortable seating with charging points
- Newspapers and magazines

Day Pass Rates:
- Adults: 450,000 LAK ($45 USD)
- Children (2-12): 225,000 LAK ($22 USD)
- Book online for 10% discount

**VIP Services:**

Fast Track Service:
- Expedited check-in and security
- Personal escort through airport
- Priority boarding
- Price: 600,000 LAK per person

Meet & Greet Service:
- Personal assistant from curb to gate
- Baggage assistance
- Lounge access included
- Price: 900,000 LAK per person

**Business Center:**

Location: Level 2, Main Concourse
Hours: 6:00 AM - 9:00 PM

Services:
- Computer workstations (100,000 LAK/hour)
- Printing and copying (5,000 LAK/page)
- Scanning services
- Meeting rooms (hourly rental)
- Video conferencing facilities
- Private offices available

**Spa and Wellness:**

Airport Spa & Wellness Center
Location: Level 2, near Gate 5
Hours: 7:00 AM - 9:00 PM

Services:
- Express massage (30 min): 300,000 LAK
- Foot massage (45 min): 350,000 LAK
- Full body massage (60 min): 500,000 LAK
- Manicure/Pedicure services
- Shower facilities

**Premium Parking:**

VIP Parking:
- Covered parking closest to terminal
- Valet service available
- Rate: 150,000 LAK per day
- Reserved spaces guaranteed

**Sleeping Pods:**

SnoozePods available near Gates 6 and 11:
- Private sleeping capsules
- Air conditioning and lighting control
- USB charging ports
- WiFi included
- Rates: 150,000 LAK per 3 hours

**Kids Play Area:**

Location: Level 2, near Gate 4
Free supervised play area for children 2-10 years:
- Soft play equipment
- Reading corner
- Drawing activities
- Parent seating area
- Operating hours: 8:00 AM - 8:00 PM`,
    tags: ["Lounges", "Premium Services", "VIP", "Facilities", "Comfort"],
    attachments: [
      {
        name: "Lounge Access Guide (PDF)",
        url: "/documents/lounge-guide.pdf",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "info-004",
    category: "travel-tips",
    publishDate: "2025-09-05",
    title: "Smart Travel Tips for Bokeo International Airport",
    description:
      "Helpful tips and recommendations to make your journey through Bokeo International Airport as smooth as possible.",
    content: `Make the most of your airport experience with these insider tips.

**Before You Arrive:**

Download the Airport App:
- Real-time flight updates
- Interactive terminal maps
- Digital boarding passes
- Restaurant and shop directory
- Current wait times at security

Online Check-in:
- Available 24 hours before departure
- Skip check-in queues
- Select preferred seats
- Add baggage if needed

**Arrival Time Recommendations:**

Domestic Flights:
- Regular traveler: 90 minutes before departure
- First-time travelers: 2 hours before departure

International Flights:
- All passengers: 3 hours before departure
- Peak times (6-9 AM, 4-7 PM): Add 30 minutes

**Money Matters:**

Currency Exchange:
- Better rates usually in city before airport
- Airport exchange available Level 1 & 2
- Credit cards widely accepted
- ATMs on both levels

Tipping:
- Not mandatory in Laos
- 10% at restaurants if satisfied
- Porters: 10,000-20,000 LAK per bag

**Food and Drinks:**

Bringing Food:
- Outside food allowed in terminal
- No restrictions on bringing food through security
- Empty water bottles then refill at water stations

Restaurant Tips:
- Prices 20-30% higher than city
- Quick service options near gates
- Local Lao cuisine available
- Pre-order meals via app for pickup

**Security Checkpoint Tips:**

Prepare in Advance:
- Have boarding pass and ID ready
- Remove laptops and large electronics
- Place liquids in clear bag
- Wear slip-on shoes for easy removal

Express Lane:
- Available for Priority Pass holders
- Business class passengers
- Families with children under 2

**Shopping:**

Duty-Free:
- Best deals on alcohol and tobacco
- Compare prices before purchasing
- Keep receipts for tax claims

Last Minute Gifts:
- Local handicrafts available
- Traditional Lao textiles
- Coffee and tea selections
- Packaged securely for travel

**Staying Comfortable:**

Clothing:
- Dress in layers for temperature changes
- Comfortable walking shoes
- Light jacket for air-conditioned areas

Entertainment:
- Free WiFi throughout terminal
- Charging stations at every gate
- Reading materials in lounges
- Mobile apps for games and movies

**Health and Safety:**

Medical Services:
- First aid station on Level 2
- Pharmacy near main entrance
- Emergency number: 1195

Medications:
- Keep in original containers
- Carry prescription or doctor's note
- Declare at customs if required

**For Families:**

Traveling with Children:
- Priority boarding for families
- Baby changing rooms both levels
- Kids play area near Gate 4
- Stroller rental available

Nursing Mothers:
- Private nursing rooms available
- Family restrooms with extra space
- Warm water available for bottles

**Transit Passengers:**

Hotel Options:
- Airport hotel connected by walkway
- City hotels 15-20 minutes away
- Free shuttle services available

Transit Visa:
- Not required for stays under 24 hours
- Must remain in international area
- Apply in advance for longer stays

**Lost and Found:**

Location: Level 1, near Information Desk
Hours: 6:00 AM - 10:00 PM
Phone: +856-84-211-2000
Items kept for 90 days`,
    tags: ["Travel Tips", "Airport Guide", "Passenger Information", "Planning"],
  },
  {
    id: "info-005",
    category: "regulations",
    publishDate: "2025-08-20",
    lastUpdated: "2025-09-01",
    title: "Customs and Immigration Procedures",
    description:
      "Essential information about customs declarations, immigration requirements, and duty-free allowances for travelers.",
    content: `Understanding customs and immigration procedures ensures efficient processing.

**Immigration Requirements:**

Visa Requirements:
- Check visa requirements for your nationality
- Apply online or at embassy before travel
- Visa on arrival available for select countries
- Have passport valid for 6 months beyond stay

Documents Needed:
- Valid passport
- Visa (if required)
- Completed arrival/departure card
- Return or onward ticket
- Proof of accommodation
- Sufficient funds for stay

**Customs Declaration:**

Must Declare If Bringing:
- Currency over $10,000 USD equivalent
- Goods for commercial purposes
- Restricted items (see below)
- Items exceeding duty-free allowances

Customs Forms:
- Available on aircraft
- Also available at customs area
- One form per family allowed
- Keep white copy for departure

**Duty-Free Allowances:**

Alcohol:
- 1 liter of spirits OR
- 2 liters of wine
- Must be 18+ years old

Tobacco:
- 200 cigarettes OR
- 50 cigars OR
- 250g tobacco
- Must be 18+ years old

Personal Effects:
- Used personal items exempt
- New items may be subject to duty
- Professional equipment requires temporary import permit

**Prohibited Items:**

Strictly Prohibited:
- Illegal drugs and narcotics
- Weapons and ammunition (without permit)
- Counterfeit currency or goods
- Obscene materials
- Endangered species products
- Ivory and certain wildlife products

**Restricted Items:**

Require Special Permits:
- Prescription medications (bring prescription)
- Professional camera/video equipment
- Drones and radio equipment
- Plants and seeds
- Antiques and cultural artifacts

**Agricultural Restrictions:**

Cannot Bring:
- Fresh fruits and vegetables
- Meat and dairy products
- Soil and sand
- Live plants and seeds
- Fresh flowers

Exceptions:
- Packaged/processed food usually allowed
- Declare all food items
- Some items may be confiscated

**Departure Procedures:**

Tax Refund:
- Available for purchases over 200,000 LAK
- Present receipts and goods at customs
- Refund desk in departure hall
- Process before check-in

Export Restrictions:
- Antiques require permit
- Buddha images and religious artifacts restricted
- Cultural items need approval
- Keep purchase receipts

**Special Declarations:**

Large Amounts of Cash:
- Declare if over $10,000 USD equivalent
- Applies to all currencies combined
- Includes travelers checks
- Required on entry and exit

Valuable Items:
- High-value jewelry
- Expensive electronics
- Professional equipment
- May require temporary import permit

**Processing Times:**

Immigration:
- Arrive at desk with documents ready
- Typical processing: 5-10 minutes per passenger
- Peak times: 20-30 minutes
- E-gates available for eligible travelers

Customs:
- Green channel: Nothing to declare (quick)
- Red channel: Items to declare (10-15 minutes)
- Random checks may occur
- Cooperation ensures smooth processing

**Currency Regulations:**

Local Currency:
- No limit on bringing in LAK
- Declare amounts over 10 million LAK

Foreign Currency:
- No limit on bringing in
- Must declare over $10,000 USD
- Can take out amount declared on entry

**Diplomatic and Official Travelers:**

Diplomatic Passport Holders:
- Use diplomatic channel
- Customs exemptions apply
- Present credentials
- Vehicle import privileges available

**Contact Information:**

Immigration Office: +856-84-211-3000
Customs Office: +856-84-211-3001
24/7 Hotline: +856-84-211-1999`,
    tags: [
      "Customs",
      "Immigration",
      "Regulations",
      "Travel Requirements",
      "Visa",
    ],
    attachments: [
      {
        name: "Customs Declaration Form (PDF)",
        url: "/documents/customs-declaration-form.pdf",
        type: "application/pdf",
      },
      {
        name: "Visa Requirements Guide (PDF)",
        url: "/documents/visa-requirements.pdf",
        type: "application/pdf",
      },
    ],
  },
  {
    id: "info-006",
    category: "services",
    publishDate: "2025-09-12",
    title: "Ground Transportation Options",
    description:
      "Complete guide to transportation options from Bokeo International Airport including taxis, buses, car rentals, and ride-sharing services.",
    content: `Multiple convenient transportation options are available from Bokeo International Airport.

**Official Airport Taxi:**

Service Counter: Level 1, Arrivals Hall
Operating Hours: 24/7

Fare Structure:
- City Center: 120,000 LAK (fixed rate)
- Hotel District: 150,000 LAK
- Bus Station: 100,000 LAK
- Tourist Areas: 180,000 LAK

Features:
- Metered or fixed rate options
- Air-conditioned vehicles
- English-speaking drivers available
- Accepts cash and cards
- Receipt provided

**Airport Shuttle Bus:**

Route 1: Airport - City Center
- Frequency: Every 30 minutes
- First bus: 6:00 AM
- Last bus: 10:00 PM
- Fare: 30,000 LAK
- Journey time: 35 minutes
- Stops at major hotels

Route 2: Airport - Tourist District
- Frequency: Every 45 minutes
- First bus: 7:00 AM
- Last bus: 9:00 PM
- Fare: 40,000 LAK
- Journey time: 45 minutes

Tickets:
- Purchase at bus counter or from driver
- No advance booking needed
- Luggage included

**Car Rental:**

Companies Available:
- Avis Car Rental
- Budget Rent A Car
- Hertz
- Local operators

Location: Level 1, Arrivals Hall
Operating Hours: 6:00 AM - 11:00 PM

Requirements:
- Valid driver's license
- International Driving Permit recommended
- Credit card for deposit
- Minimum age: 21 years (25 for some vehicles)

Daily Rates:
- Economy car: 400,000 LAK
- SUV: 800,000 LAK
- Van (7-seater): 1,000,000 LAK
- Luxury vehicles available

Insurance:
- Basic included in rate
- Full coverage recommended
- CDW and theft protection available

**Ride-Sharing Apps:**

Available Services:
- Lao Ride
- MOVE Taxi
- Local equivalent services

Pickup Location:
- Designated area at Level 1
- Follow signs for "Ride Share"
- 5-minute walk from arrivals

Typical Fares:
- City Center: 80,000-100,000 LAK
- Tourist Areas: 120,000-150,000 LAK
- Surge pricing during peak hours

**Hotel Shuttle Services:**

Many hotels offer free or paid shuttle:
- Book in advance with hotel
- Show booking confirmation
- Meet at designated pickup point
- Schedule varies by hotel

Complimentary Shuttles:
- Usually for 4-star and above hotels
- Advance booking required
- Limited schedules
- Check with your hotel

**Public Bus:**

City Bus Service:
- Route 15: Airport to City
- Fare: 8,000 LAK
- Frequency: Every hour
- 6:00 AM - 8:00 PM
- Not recommended with heavy luggage

**Private Car Hire with Driver:**

Available through:
- Hotel concierge
- Airport service desk
- Pre-book online

Half Day (4 hours):
- Standard car: 600,000 LAK
- Luxury car: 1,200,000 LAK

Full Day (8 hours):
- Standard car: 1,000,000 LAK
- Luxury car: 1,800,000 LAK

Benefits:
- Flexible itinerary
- English-speaking drivers available
- Waiting time included
- Multiple stops possible

**Motorcycle Taxi:**

Available: Near taxi stand
Typical Fare: 40,000-60,000 LAK to city
Recommended: Only for solo travelers with light luggage
Safety: Helmets provided

**Bicycle Rental:**

Location: Outside arrivals
Rates: 50,000 LAK per day
Deposit: 200,000 LAK or passport copy
Recommended: For nearby destinations only

**Transportation Tips:**

Always use authorized services at official counters
Agree on fare before departing (taxis)
Keep small bills for exact change
Rush hour traffic: 7-9 AM, 5-7 PM
Weather consideration: Heavy rain affects travel times`,
    tags: ["Transportation", "Taxi", "Bus", "Car Rental", "Airport Access"],
  },
];

export const noticeInforCategories = [
  { id: "all", label: "All Information", icon: Megaphone },
  { id: "airport-info", label: "Airport Information", icon: Plane },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "facilities", label: "Facilities", icon: Building2 },
  { id: "travel-tips", label: "Travel Tips", icon: Lightbulb },
  { id: "regulations", label: "Regulations", icon: Scale },
];
