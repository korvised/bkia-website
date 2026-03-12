import type { IFile } from "@/types";
import { FeedbackCategory, FeedbackStatus, Terminal } from "@/types/enum.type";

export interface IFeedback {
  id: string;
  rating: number | null;
  category: FeedbackCategory;
  comment: string | null;
  terminal: Terminal | null;
  specificArea: string | null;
  followUp: boolean;
  email: string | null;
  phone: string | null;
  status: FeedbackStatus;
  files: IFile[];
  createdAt: string;
  updatedAt: string;
}

export interface IFeedbackListResponse {
  data: IFeedback[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface IFeedbackFilter {
  status?: FeedbackStatus | "";
  category?: FeedbackCategory | "";
  search?: string;
  page: number;
  limit: number;
}

export interface IUpdateFeedbackStatusPayload {
  id: string;
  body: { status: FeedbackStatus };
}
