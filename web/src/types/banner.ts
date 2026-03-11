import { IFile } from "./file";
import { MultilingualText } from "./language";

export interface IBanner {
  id: string;
  image: IFile;
  altText: MultilingualText;
  title?: MultilingualText | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
