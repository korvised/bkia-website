import { LostFoundCategory, LostFoundStatus } from "./enum";
import { IFile } from "@/types/file";

export interface ILostFoundItem {
  id: string;
  status: LostFoundStatus;
  category: LostFoundCategory;
  itemName: string;
  description: string;
  location: string;
  incidentDate: string;
  flightNumber: string | null;
  coverImage: IFile | null;
  images?: IFile[];
  referenceCode?: string;
  createdAt: string;
}

export interface QueryLostFound {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}
