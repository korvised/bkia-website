import type { IFile } from "@/types/file";
import type { MultilingualText } from "@/types/language";

export interface IJobPost {
  id: string;
  title: MultilingualText;
  content?: MultilingualText; // omitted in list responses, present in detail
  position: MultilingualText;
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
  caption?: Partial<MultilingualText> | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}
