import type { IFile } from "@/types";

export interface IMultilingualText {
  en?: string;
  lo?: string;
  zh?: string;
}

// ── API response types ────────────────────────────────────────────────────────

export interface IJobPost {
  id: string;
  title: IMultilingualText;
  content: IMultilingualText;
  position: IMultilingualText;
  vacancyCount: number;
  coverImage?: IFile | null;
  isPublished: boolean;
  isFeatured: boolean;
  publishDate: string;
  deadline?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ICareerActivity {
  id: string;
  image: IFile;
  caption?: IMultilingualText | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

// ── Form state ────────────────────────────────────────────────────────────────

export interface IJobPostForm {
  title: IMultilingualText;
  content: IMultilingualText;
  position: IMultilingualText;
  vacancyCount: number;
  coverImageFile: File | null;
  isPublished: boolean;
  isFeatured: boolean;
  publishDate: string;
  deadline: string;
}

export interface IJobPostSubmitPayload {
  title: IMultilingualText;
  content: IMultilingualText;
  position: IMultilingualText;
  vacancyCount: number;
  coverImageFile: File | null;
  isPublished: boolean;
  isFeatured: boolean;
  publishDate: string;
  deadline: string;
}
