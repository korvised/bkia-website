export interface WelcomePopupImage {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  link?: string;
  linkText?: string;
  displayDuration?: number; // in milliseconds
  priority: number; // for sorting multiple images
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  isActive: boolean;
}

export interface WelcomePopupConfig {
  enabled: boolean;
  showOnce: boolean; // show only once per session/day
  images: WelcomePopupImage[];
  closeDelay?: number; // minimum time before user can close (in ms)
}
