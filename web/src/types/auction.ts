import { IFile } from "./file";
import { MultilingualText } from "./language";
import { IPagination } from "./pagination";

export enum AuctionCategory {
  EQUIPMENT = "EQUIPMENT",
  CONSTRUCTION = "CONSTRUCTION",
  SERVICE = "SERVICE",
  IT = "IT",
  CONSULTING = "CONSULTING",
  MAINTENANCE = "MAINTENANCE",
  OTHER = "OTHER",
}

export enum AuctionStatus {
  UPCOMING = "UPCOMING",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export interface IAuctionDocument {
  id: string;
  file: IFile;
  fileName: MultilingualText;
  order: number;
  createdAt: string;
}

export interface IAuction {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  category: AuctionCategory;
  startDate: string;
  endDate: string;
  status: AuctionStatus;
  documents: IAuctionDocument[];
  createdAt: string;
  updatedAt: string;
}

export type IAuctionListResponse = IPagination<IAuction>;

export interface AuctionPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    status?: string;
    category?: string;
    page?: string;
  }>;
}

export interface AuctionDetailPageProps {
  params: Promise<{ lang: string; id: string }>;
}
