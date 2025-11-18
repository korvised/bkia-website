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


export type IAirlineResponse = IPagination<IAirline>
