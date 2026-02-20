import { LostFoundCategory, LostFoundStatus, LostFoundType } from "./enum";

export interface ILostFoundFile {
  id: string;
  path: string;
}

export interface ILostFoundItem {
  id: string;
  type: LostFoundType;
  status: LostFoundStatus;
  category: LostFoundCategory;
  itemName: string;
  description: string;
  location: string;
  incidentDate: string;
  flightNumber: string | null;
  coverImage: ILostFoundFile | null;
  images?: ILostFoundFile[];
  referenceCode?: string;
  createdAt: string;
}

export interface LostFoundPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export interface QueryLostFound {
  type?: string;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}
