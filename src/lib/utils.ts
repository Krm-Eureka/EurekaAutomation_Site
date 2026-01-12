import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!path) return path;
  if (path.startsWith('http')) return path;
  
  // Clean up paths to avoid double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
