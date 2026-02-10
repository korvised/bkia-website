import { MultilingualText } from "./language";
import { IFile } from "@/types/file";

export enum NewsCategory {
  AIRPORT_UPDATE = "AIRPORT_UPDATE",
  FLIGHT_SERVICE = "FLIGHT_SERVICE",
  EVENT = "EVENT",
  ANNOUNCEMENT = "ANNOUNCEMENT",
  SUSTAINABILITY = "SUSTAINABILITY",
  TECHNOLOGY = "TECHNOLOGY",
  COMMUNITY = "COMMUNITY",
}

export interface INews {
  id: string;
  slug: string;
  coverImage: IFile;
  title: MultilingualText;
  excerpt: MultilingualText;
  content: MultilingualText;
  category: NewsCategory;
  author?: string | null;
  publishDate: string;
  isFeatured: boolean;
  isPublished: boolean;
  viewCount: number;
  tags: MultilingualText[];
  metaDescription?: MultilingualText | null;
  createdAt: string;
  updatedAt: string;
}

export interface INewsResponse {
  data: INews[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface QueryNews {
  search?: string;
  category?: NewsCategory | "all";
  sortBy?: "publishDate" | "viewCount" | "createdAt";
  order?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

export interface NewsPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
    limit?: string;
  }>;
}
