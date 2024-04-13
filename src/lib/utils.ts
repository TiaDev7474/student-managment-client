import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateFormatter(date: Date) {
  const dateTime = new Date(date);

  const day = dateTime.getUTCDate().toString().padStart(2, '0');
  const month = (dateTime.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = dateTime.getUTCFullYear();

  return `${day}-${month}-${year}`;
}
