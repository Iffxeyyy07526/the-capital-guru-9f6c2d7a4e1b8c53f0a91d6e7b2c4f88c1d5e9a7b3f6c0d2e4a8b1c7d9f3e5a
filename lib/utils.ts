import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Apply /public/watermark.png as overlay on all signal screenshots before sending to Telegram.
 * This ensures brand integrity and prevents signal leakage without credit.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
