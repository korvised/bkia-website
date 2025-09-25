import { Flight, Airline, FlightType } from "@/types/flight";
import { mockFlights, mockAirlines } from "@/data/mock-flights";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export interface FlightSearchParams {
  type?: FlightType;
  query?: string;
  airline?: string;
}

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to filter mock data
function filterMockFlights(
  flights: Flight[],
  params: FlightSearchParams,
): Flight[] {
  let filtered = [...flights];

  // Filter by type
  if (params.type === "departure") {
    filtered = filtered.filter(
      (flight) => flight.origin === "Bokeo International Airport",
    );
  } else if (params.type === "arrival") {
    filtered = filtered.filter(
      (flight) => flight.destination === "Bokeo International Airport",
    );
  }

  // Filter by search query
  if (params.query) {
    const query = params.query.toLowerCase();
    filtered = filtered.filter(
      (flight) =>
        flight.flightNumber.toLowerCase().includes(query) ||
        flight.airline.toLowerCase().includes(query) ||
        flight.origin.toLowerCase().includes(query) ||
        flight.destination.toLowerCase().includes(query) ||
        (flight.stopover1 && flight.stopover1.toLowerCase().includes(query)) ||
        (flight.stopover2 && flight.stopover2.toLowerCase().includes(query)),
    );
  }

  // Filter by airline
  if (params.airline) {
    filtered = filtered.filter(
      (flight) => flight.airlineCode === params.airline,
    );
  }

  return filtered;
}

export const flightApi = {
  // Get departing flights
  getDepartures: async (): Promise<Flight[]> => {
    await delay(50); // Simulate loading time
    return mockFlights.filter(
      (flight) => flight.origin === "Bokeo International Airport",
    );
    /*    try {
      const response = await fetch(`${API_BASE_URL}/flights/departures`, {
        next: { revalidate: 30 },
      });

      if (!response.ok) {
        throw new Error("API not available");
      }

      return response.json();
    } catch (error) {
      console.log("Using mock data for departures");
      await delay(800); // Simulate loading time
      return mockFlights.filter(
        (flight) => flight.origin === "Bokeo International Airport",
      );
    }*/
  },

  // Get arriving flights
  getArrivals: async (): Promise<Flight[]> => {
    await delay(50);
    return mockFlights.filter(
      (flight) => flight.destination === "Bokeo International Airport",
    );
    /*    try {
      const response = await fetch(`${API_BASE_URL}/flights/arrivals`, {
        next: { revalidate: 30 },
      });

      if (!response.ok) {
        throw new Error("API not available");
      }

      return response.json();
    } catch (error) {
      console.log("Using mock data for arrivals");
      await delay(800);
      return mockFlights.filter(
        (flight) => flight.destination === "Bokeo International Airport",
      );
    }*/
  },

  // Get all flights (schedule view)
  getSchedule: async (): Promise<Flight[]> => {
    await delay(1000);
    return mockFlights;
    /*    try {
      const response = await fetch(`${API_BASE_URL}/flights/schedule`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error("API not available");
      }

      return response.json();
    } catch (error) {
      console.log("Using mock data for schedule");
      await delay(1000);
      return mockFlights;
    }*/
  },

  // Search flights
  searchFlights: async (params: FlightSearchParams): Promise<Flight[]> => {
    await delay(50);
    return filterMockFlights(mockFlights, params);
    /*    try {
      const searchParams = new URLSearchParams();
      if (params.query) searchParams.append("q", params.query);
      if (params.type) searchParams.append("type", params.type);
      if (params.airline) searchParams.append("airline", params.airline);

      const response = await fetch(
        `${API_BASE_URL}/flights/search?${searchParams}`,
        {
          next: { revalidate: 30 },
        },
      );

      if (!response.ok) {
        throw new Error("API not available");
      }

      return response.json();
    } catch (error) {
      console.log("Using mock data for search");
      await delay(600);
      return filterMockFlights(mockFlights, params);
    }*/
  },

  // Get airlines
  getAirlines: async (): Promise<Airline[]> => {
    await delay(50);
    return mockAirlines;
    /*    try {
      const response = await fetch(`${API_BASE_URL}/airlines`, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error("API not available");
      }

      return response.json();
    } catch (error) {
      console.log("Using mock data for airlines");
      await delay(400);
      return mockAirlines;
    }*/
  },

  // Get flight by number
  getFlightByNumber: async (flightNumber: string): Promise<Flight | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/flights/${flightNumber}`, {
        next: { revalidate: 30 },
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("API not available");
      }

      return response.json();
    } catch (error) {
      console.log("Using mock data for flight by number");
      await delay(300);
      return mockFlights.find((f) => f.flightNumber === flightNumber) || null;
    }
  },
};
