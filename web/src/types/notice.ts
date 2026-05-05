import { MultilingualText } from "./language";
import { ImportantPriority } from "@/types/enum";
import { IPaginationMeta } from "@/types/pagination";

export interface INotice {
  id: string;
  title: MultilingualText;
  description?: MultilingualText | null;
  content: MultilingualText;
  priority: ImportantPriority;
  publishDate: string;
  effectiveDate?: string | null;
  expiryDate?: string | null;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface INoticeResponse {
  data: INotice[];
  meta: IPaginationMeta;
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
