export const SITE_NAME = "Forma";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://forma.example.com";

export const SITE_DESCRIPTION =
  "Forma is a considered clothing label: durable outerwear, patchwork denim and everyday essentials made in small runs.";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}