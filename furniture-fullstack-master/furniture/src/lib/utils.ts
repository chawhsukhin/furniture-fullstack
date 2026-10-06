import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  opts: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: opts.currency ?? "USD",
    notation: opts.notation ?? "compact",
  }).format(Number(price));
}

export function resolveImageUrl(path?: string) {
  if (!path) return "";

  const denormalizePath = (raw: string) => {
    if (raw.startsWith("/optimize//data/")) {
      return raw.replace("/optimize//data/", "/data/");
    }
    if (raw.startsWith("/optimize//uploads/")) {
      return raw.replace("/optimize//uploads/", "/uploads/");
    }
    return raw;
  };

  const cleanedPath = denormalizePath(path);

  if (
    cleanedPath.startsWith("http://") ||
    cleanedPath.startsWith("https://") ||
    cleanedPath.startsWith("data:") ||
    cleanedPath.startsWith("blob:")
  ) {
    return cleanedPath;
  }

  if (cleanedPath.startsWith("//")) {
    return `${window.location.protocol}${cleanedPath}`;
  }

  const normalizePath = (raw: string) => {
    if (raw.startsWith("/")) return raw;
    if (raw.startsWith("uploads/") || raw.startsWith("uploads\\")) {
      return `/${raw}`;
    }
    if (raw.startsWith("data/") || raw.startsWith("data\\")) {
      return `/${raw}`;
    }
    return `/uploads/images/${raw}`;
  };

  const apiBase = import.meta.env.VITE_API_URL as string | undefined;
  const envBase = import.meta.env.VITE_IMG_URL as string | undefined;
  const base =
    envBase ?? apiBase?.replace(/\/api\/v1\/?$/i, "").replace(/\/+$/, "");

  if (!base) return normalizePath(cleanedPath);

  return `${base}${normalizePath(cleanedPath)}`;
}
