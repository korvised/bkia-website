import type { IFile, IPagination, MultilingualText } from "@/types";

export interface IAirline {
  id: string;
  code: string;
  logoFile?: IFile | null;
  name: string;
  names: MultilingualText;
  hotline?: string | null;
  phone?: string | null;
  website?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IAirlineResponse = IPagination<IAirline>;

export interface IAirlineFilter {
  search?: string;
  isActive?: string;
  orderBy?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export interface IAirlineForm {
  code: string;
  name: string;
  names: { en: string; lo: string; zh: string };
  logoFile: File | null;
  removeLogo: boolean;
  hotline: string;
  phone: string;
  website: string;
  isActive: boolean;
}
