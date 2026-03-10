import type { MultilingualText } from "@/types";

export interface IAirport {
  id: string;
  code: string;
  name: string;
  names: MultilingualText;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAirportFilter {
  search?: string;
  isActive?: string | boolean | "";
}

export interface IAirportForm {
  code: string;
  name: string;
  names: { en: string; lo: string; zh: string };
  isActive: boolean;
}
