import type { IFile } from "@/types";
import type { NewsCategory } from "@/types";

export interface IMultilingualText {
  en?: string;
  lo?: string;
  zh?: string;
}

export interface INews {
  id: string;
  slug: string;
  coverImage: IFile;
  images?: IFile[];
  title: IMultilingualText;
  excerpt: IMultilingualText;
  content: IMultilingualText;
  category: NewsCategory;
  author?: string | null;
  publishDate: string;
  isFeatured: boolean;
  isPublished: boolean;
  viewCount: number;
  tags: IMultilingualText[];
  metaDescription?: IMultilingualText | null;
  createdAt: string;
  updatedAt: string;
}

export interface INewsListResponse {
  data: INews[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface INewsFilter {
  search?: string;
  category?: NewsCategory | "";
  isPublished?: string;
  isFeatured?: string;
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export interface INewsForm {
  slug: string;
  title: IMultilingualText;
  excerpt: IMultilingualText;
  content: IMultilingualText;
  category: NewsCategory | "";
  author: string;
  publishDate: string;
  isFeatured: boolean;
  isPublished: boolean;
  tags: IMultilingualText[];
  metaDescription: IMultilingualText;
  coverImageFile: File | null;
  galleryFiles: File[];
  existingImages: IFile[];
}

export interface INewsSubmitPayload {
  slug: string;
  title: IMultilingualText;
  excerpt: IMultilingualText;
  content: IMultilingualText;
  category: NewsCategory;
  author?: string | null;
  publishDate: string;
  isFeatured: boolean;
  isPublished: boolean;
  tags: IMultilingualText[];
  metaDescription?: IMultilingualText | null;
  coverImageFile: File | null;
  galleryFiles: File[];
  existingImages: IFile[];
}
