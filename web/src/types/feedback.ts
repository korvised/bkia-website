export interface IFeedbackSubmit {
  rating?: number;
  category: string;
  comment?: string;
  terminal?: string;
  specificArea?: string;
  followUp?: boolean;
  email?: string;
  phone?: string;
}
