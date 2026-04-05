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

/**
 * Robustly copies text to clipboard with fallback for non-secure contexts
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Modern clipboard error:', err);
      // Fall through to fallback
    }
  }

  // Fallback for non-secure contexts or failures
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback clipboard error:', err);
    return false;
  }
}
