import type { ImportantPriority } from "@/types";

export interface IMultilingualText {
  en?: string;
  lo?: string;
  zh?: string;
}

export interface INotice {
  id: string;
  title: IMultilingualText;
  description: IMultilingualText;
  content: IMultilingualText;
  priority: ImportantPriority;
  publishDate: string;
  effectiveDate?: string | null;
  expiryDate?: string | null;
  tags: IMultilingualText[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface INoticeListResponse {
  data: INotice[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface INoticeFilter {
  search?: string;
  priority?: ImportantPriority | "";
  isActive?: string;
  page?: number;
  limit?: number;
}

export interface INoticeForm {
  title: IMultilingualText;
  description: IMultilingualText;
  content: IMultilingualText;
  priority: ImportantPriority | "";
  publishDate: string;
  effectiveDate: string;
  expiryDate: string;
  tags: IMultilingualText[];
  isActive: boolean;
}

export interface ICreateNoticePayload {
  title: IMultilingualText;
  description: IMultilingualText;
  content: IMultilingualText;
  priority: ImportantPriority;
  publishDate: string;
  effectiveDate?: string | null;
  expiryDate?: string | null;
  tags?: IMultilingualText[];
  isActive?: boolean;
}
