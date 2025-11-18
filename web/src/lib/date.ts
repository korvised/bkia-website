import { format, isValid, parseISO } from "date-fns";

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
