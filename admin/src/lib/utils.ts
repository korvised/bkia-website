import { type ClassValue, clsx } from "clsx";
import axios from "axios";

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
