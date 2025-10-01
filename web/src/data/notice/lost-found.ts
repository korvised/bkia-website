export interface LostFoundItem {
  id: string;
  type: "lost" | "found";
  category:
    | "electronics"
    | "bags"
    | "documents"
    | "clothing"
    | "accessories"
    | "other";
  itemName: string;
  description: string;
  location: string;
  date: string;
  reportedBy?: string;
  contactInfo?: string;
  referenceNumber: string;
  status: "pending" | "claimed" | "returned" | "disposed";
  images?: string[];
}

export const lostFoundItems: LostFoundItem[] = [
  {
    id: "lf-001",
    type: "found",
    category: "electronics",
    itemName: "Black iPhone 17 Pro Max",
    description:
      "Black iPhone 17 Pro with cracked screen protector. Found with blue protective case.",
    location: "Gate 8, Departure Area",
    date: "2025-09-28",
    referenceNumber: "FR20250928001",
    status: "pending",
    images: ["/images/lost-found/iphone-17.webp"],
  },
  {
    id: "lf-002",
    type: "found",
    category: "bags",
    itemName: "Blue Backpack",
    description:
      "Medium-sized blue backpack with laptop compartment. Contains notebook and water bottle.",
    location: "Security Checkpoint A",
    date: "2025-09-27",
    referenceNumber: "FR20250927002",
    status: "pending",
    images: ["/images/lost-found/backpack-blue.webp"],
  },
  {
    id: "lf-003",
    type: "found",
    category: "documents",
    itemName: "Passport",
    description:
      "US Passport. For security reasons, we cannot disclose the name. Please contact us with your flight details.",
    location: "Immigration Counter",
    date: "2025-09-27",
    referenceNumber: "FR20250927003",
    status: "claimed",
  },
  {
    id: "lf-004",
    type: "found",
    category: "accessories",
    itemName: "Silver Wristwatch",
    description:
      "Men's silver wristwatch with black leather strap. Swiss brand.",
    location: "Restroom near Gate 5",
    date: "2025-09-26",
    referenceNumber: "FR20250926004",
    status: "pending",
    images: ["/images/lost-found/watch-silver.webp"],
  },
  {
    id: "lf-005",
    type: "found",
    category: "electronics",
    itemName: "White AirPods Pro",
    description:
      "Apple AirPods Pro in white charging case. Found in charging station area.",
    location: "Charging Station, Gate 10",
    date: "2025-09-26",
    referenceNumber: "FR20250926005",
    status: "pending",
  },
  {
    id: "lf-006",
    type: "found",
    category: "bags",
    itemName: "Red Suitcase",
    description: "Large red hardshell suitcase with wheels. Brand: Samsonite.",
    location: "Baggage Claim Area 3",
    date: "2025-09-25",
    referenceNumber: "FR20250925006",
    status: "returned",
  },
  {
    id: "lf-007",
    type: "found",
    category: "clothing",
    itemName: "Child's Pink Jacket",
    description:
      "Pink winter jacket, size 6-7 years old. Disney characters print.",
    location: "Kids Play Area",
    date: "2025-09-25",
    referenceNumber: "FR20250925007",
    status: "pending",
    images: ["/images/lost-found/jacket-pink.avif"],
  },
  {
    id: "lf-008",
    type: "found",
    category: "accessories",
    itemName: "Prescription Glasses",
    description: "Black frame prescription glasses in brown case.",
    location: "Business Lounge",
    date: "2025-09-24",
    referenceNumber: "FR20250924008",
    status: "pending",
  },
  {
    id: "lf-009",
    type: "found",
    category: "electronics",
    itemName: "Black Laptop",
    description:
      "Dell laptop, 15-inch, black color. Found in black laptop bag with charger.",
    location: "Security Screening Area",
    date: "2025-09-24",
    referenceNumber: "FR20250924009",
    status: "claimed",
  },
  {
    id: "lf-010",
    type: "found",
    category: "documents",
    itemName: "Travel Documents",
    description: "Folder containing boarding passes and hotel reservations.",
    location: "Check-in Counter B",
    date: "2025-09-23",
    referenceNumber: "FR20250923010",
    status: "returned",
  },
  {
    id: "lf-011",
    type: "found",
    category: "accessories",
    itemName: "Gold Necklace",
    description:
      "Gold chain necklace with small pendant. Found in ladies restroom.",
    location: "Restroom, Level 2",
    date: "2025-09-23",
    referenceNumber: "FR20250923011",
    status: "pending",
  },
  {
    id: "lf-012",
    type: "found",
    category: "other",
    itemName: "Stuffed Teddy Bear",
    description: "Brown teddy bear toy, approximately 12 inches tall.",
    location: "Gate 3 Waiting Area",
    date: "2025-09-22",
    referenceNumber: "FR20250922012",
    status: "pending",
    images: ["/images/lost-found/teddy-bear.webp"],
  },
  {
    id: "lf-013",
    type: "lost",
    category: "electronics",
    itemName: "Silver MacBook Pro",
    description:
      "MacBook Pro 16-inch, silver color. Has stickers on the lid. Lost during transit.",
    location: "Gate 7 area",
    date: "2025-09-28",
    referenceNumber: "LR20250928013",
    status: "pending",
    reportedBy: "John Smith",
  },
  {
    id: "lf-014",
    type: "lost",
    category: "bags",
    itemName: "Black Carry-on Luggage",
    description:
      "Black wheeled carry-on with TSA lock. Contains clothing and toiletries.",
    location: "Baggage Claim Area",
    date: "2025-09-27",
    referenceNumber: "LR20250927014",
    status: "pending",
    reportedBy: "Maria Garcia",
  },
  {
    id: "lf-015",
    type: "lost",
    category: "accessories",
    itemName: "Wedding Ring",
    description:
      "Gold wedding band with inscription inside. Lost near security checkpoint.",
    location: "Security Checkpoint B",
    date: "2025-09-27",
    referenceNumber: "LR20250927015",
    status: "pending",
    reportedBy: "David Chen",
  },
  {
    id: "lf-016",
    type: "lost",
    category: "documents",
    itemName: "Wallet with ID",
    description:
      "Brown leather wallet containing ID card, credit cards, and cash.",
    location: "Restaurant area, Level 2",
    date: "2025-09-26",
    referenceNumber: "LR20250926016",
    status: "returned",
    reportedBy: "Sarah Johnson",
  },
  {
    id: "lf-017",
    type: "lost",
    category: "electronics",
    itemName: "Samsung Galaxy S23",
    description:
      "Purple Samsung Galaxy S23 with clear case. Password protected.",
    location: "Restroom near Gate 11",
    date: "2025-09-25",
    referenceNumber: "LR20250925017",
    status: "pending",
    reportedBy: "Ahmed Hassan",
  },
  {
    id: "lf-018",
    type: "lost",
    category: "other",
    itemName: "Medication Bag",
    description:
      "Small blue zipper bag containing prescription medications. Urgent.",
    location: "Departure lounge",
    date: "2025-09-25",
    referenceNumber: "LR20250925018",
    status: "returned",
    reportedBy: "Emma Wilson",
  },
];

export const lostFoundCategories = [
  { id: "all", label: "All Items" },
  { id: "electronics", label: "Electronics" },
  { id: "bags", label: "Bags & Luggage" },
  { id: "documents", label: "Documents" },
  { id: "clothing", label: "Clothing" },
  { id: "accessories", label: "Accessories" },
  { id: "other", label: "Other Items" },
];

export const lostFoundStatuses = [
  { id: "all", label: "All Status" },
  { id: "pending", label: "Available to Claim" },
  { id: "claimed", label: "Claimed" },
  { id: "returned", label: "Returned" },
];

export const lostFoundTypes = [
  { id: "all", label: "All Types" },
  { id: "found", label: "Found Items" },
  { id: "lost", label: "Lost Items" },
];
