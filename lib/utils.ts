import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const supabaseObjectsBaseUrl = "https://rgbmummrazuosxbcxkds.supabase.co/storage/v1/object/public/ibrm/";


export const PAGE_SIZE = 4;
//export const isIframe = window.self !== window.top;
