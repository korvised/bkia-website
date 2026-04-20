import type { IFile } from "@/types";
import type {
  ClaimStatus,
  LostFoundCategory,
  LostFoundStatus,
  LostFoundType,
  LostFoundVisibility,
} from "@/types";

export interface IMultilingualText {
  en?: string;
  lo?: string;
  zh?: string;
}

export interface ILostFoundItem {
  id: string;
  type: LostFoundType;
  category: LostFoundCategory;
  status: LostFoundStatus;
  visibility: LostFoundVisibility;
  itemName: string;
  description?: string;
  location?: string;
  incidentDate: string;
  flightNumber?: string;
  referenceCode: string;
  reporterName: string;
  reporterEmail?: string;
  reporterPhone: string;
  displayNames?: IMultilingualText;
  displayDescriptions?: IMultilingualText;
  displayLocations?: IMultilingualText;
  images: IFile[];
  coverImage?: IFile;
  hideReason?: string;
  reviewedAt?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILostFoundClaim {
  id: string;
  status: ClaimStatus;
  claimantName: string;
  claimantEmail: string;
  claimantPhone?: string;
  ownershipProof: string;
  proofFiles: IFile[];
  staffNote?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILostFoundListResponse {
  data: ILostFoundItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ILostFoundFilter {
  type?: LostFoundType | "";
  category?: LostFoundCategory | "";
  status?: LostFoundStatus | "";
  visibility?: LostFoundVisibility | "";
  search?: string;
  page?: number;
  limit?: number;
}

export interface ICreateLostFoundPayload {
  type: LostFoundType;
  category: LostFoundCategory;
  itemName: string;
  description?: string;
  location?: string;
  incidentDate: string;
  flightNumber?: string;
  reporterName: string;
  reporterEmail?: string;
  reporterPhone: string;
  images?: File[];
}

export interface ICreateLostFoundForm {
  type: LostFoundType | "";
  category: LostFoundCategory | "";
  itemName: string;
  description: string;
  location: string;
  incidentDate: string;
  flightNumber: string;
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string;
  images: File[];
}

export interface IUpdateDisplayPayload {
  displayNames?: IMultilingualText;
  displayDescriptions?: IMultilingualText;
  displayLocations?: IMultilingualText;
}

export interface IUpdateVisibilityPayload {
  visibility: LostFoundVisibility;
  hideReason?: string;
}

export interface IReviewClaimPayload {
  status: ClaimStatus;
  staffNote?: string;
}
