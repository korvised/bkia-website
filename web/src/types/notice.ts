import { MultilingualText } from "./language";
import { ImportantPriority } from "@/types/enum";

export interface INotice {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  content: MultilingualText;
  priority: ImportantPriority;
  publishDate: string;
  effectiveDate?: string | null;
  expiryDate?: string | null;
  tags: MultilingualText[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface INoticeResponse {
  data: INotice[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface QueryNotice {
  search?: string;
  priority?: ImportantPriority | "all";
  publishDate?: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  isActive?: boolean;
  sortBy?: "publishDate" | "effectiveDate" | "priority" | "createdAt";
  order?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

export interface NoticePageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    q?: string;
    priority?: string;
    page?: string;
    limit?: string;
  }>;
}
