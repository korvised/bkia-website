import axios from "axios";
import { format, isValid, parseISO } from "date-fns";
import { type ClassValue, clsx } from "clsx";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};


export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}


export const formatDate = (
  date?: string | Date | null,
  fmt = "dd/MM/yyyy",
): string => {
  if (!date) return "";

  // Ensure we have a Date object
  const parsedDate = typeof date === "string" ? parseISO(date) : date;

  // Validate and format
  if (!isValid(parsedDate)) return "";

  return format(parsedDate, fmt);
};

export const formatTime = (time: string): string => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};
