import type { IFile } from "@/types";
import type {
  ClaimStatus,
  LostFoundCategory,
  LostFoundStatus,
} from "@/types";

export interface IMultilingualText {
  en?: string;
  lo?: string;
  zh?: string;
}

export interface ICreatedBy {
  id: string;
  name: string;
  email: string;
}

export interface ILostFoundItem {
  id: string;
  category: LostFoundCategory;
  status: LostFoundStatus;
  displayNames: IMultilingualText;
  displayDescriptions: IMultilingualText;
  displayLocations: IMultilingualText;
  incidentDate: string;
  flightNumber?: string | null;
  images: IFile[];
  createdBy?: ICreatedBy | null;
  pendingClaimsCount?: number;
  resolvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ILostFoundClaim {
  id: string;
  status: ClaimStatus;
  claimantName: string;
  claimantEmail: string;
  claimantPhone?: string | null;
  flightNumber?: string | null;
  seatNumber?: string | null;
  ownershipProof: string;
  proofFiles: IFile[];
  staffNote?: string | null;
  reviewedAt?: string | null;
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
  category?: LostFoundCategory | "";
  status?: LostFoundStatus | "";
  search?: string;
  page?: number;
  limit?: number;
}

export interface ICreateLostFoundPayload {
  category: LostFoundCategory;
  displayNames?: IMultilingualText;
  displayDescriptions?: IMultilingualText;
  displayLocations?: IMultilingualText;
  incidentDate: string;
  flightNumber?: string;
  reporterName: string;
  reporterEmail?: string;
  reporterPhone: string;
  images?: File[];
}

export interface IMultilingualFormField {
  en: string;
  lo: string;
  zh: string;
}

export interface ICreateLostFoundForm {
  category: LostFoundCategory | "";
  displayNames: IMultilingualFormField;
  displayDescriptions: IMultilingualFormField;
  displayLocations: IMultilingualFormField;
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

export interface IReviewClaimPayload {
  status: ClaimStatus;
  staffNote?: string;
}
