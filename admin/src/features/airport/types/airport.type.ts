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
