import type { IFile } from "@/types";
import type { AuctionCategory, AuctionStatus } from "@/types/enum.type";

export interface IMultilingualText {
  en: string;
  lo?: string;
  zh?: string;
}

export interface IAuctionDocument {
  id: string;
  file: IFile;
  fileName: IMultilingualText;
  order: number;
  createdAt: string;
}

export interface IAuction {
  id: string;
  title: IMultilingualText;
  description: IMultilingualText;
  category: AuctionCategory;
  startDate: string;
  endDate: string;
  status: AuctionStatus;
  documents: IAuctionDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface IAuctionListResponse {
  data: IAuction[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface IAuctionFilter {
  status?: AuctionStatus | "";
  category?: AuctionCategory | "";
  search?: string;
  page?: number;
  limit?: number;
}

/** Pending new document row in the form */
export interface INewDocumentRow {
  id: string; // temporary local id
  file: File | null;
  fileName: { en: string; lo: string; zh: string };
}
