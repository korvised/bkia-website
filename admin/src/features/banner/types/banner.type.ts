import type { IFile } from "@/types";

export interface IMultilingualText {
  en?: string;
  lo?: string;
  zh?: string;
}

export interface IBanner {
  id: string;
  image: IFile;
  altText: IMultilingualText;
  title?: IMultilingualText | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBannerListResponse {
  data: IBanner[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface IBannerFilter {
  isActive?: string;
  page?: number;
  limit?: number;
}

export interface IBannerForm {
  altText: IMultilingualText;
  title: IMultilingualText;
  order: number;
  isActive: boolean;
  imageFile: File | null;
}
