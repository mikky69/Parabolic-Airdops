import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Airdrop } from "@/types/database.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type AirdropBadge = "new" | "ending_soon" | "hot";

const NEW_WINDOW_DAYS = 5;
const ENDING_SOON_WINDOW_DAYS = 3;

/**
 * Badges are derived, never stored — "New" and "Ending Soon" come straight
 * from dates, "Hot" is passed in separately once we know its rank among the
 * last 7 days of analytics events.
 */
export function getDerivedBadges(
  airdrop: Pick<Airdrop, "created_at" | "expiry_date" | "status">,
  isHot = false
): AirdropBadge[] {
  const badges: AirdropBadge[] = [];
  const now = Date.now();

  const createdAt = new Date(airdrop.created_at).getTime();
  if (now - createdAt < NEW_WINDOW_DAYS * 24 * 60 * 60 * 1000) {
    badges.push("new");
  }

  if (airdrop.expiry_date && airdrop.status !== "expired") {
    const msLeft = new Date(airdrop.expiry_date).getTime() - now;
    if (msLeft > 0 && msLeft < ENDING_SOON_WINDOW_DAYS * 24 * 60 * 60 * 1000) {
      badges.push("ending_soon");
    }
  }

  if (isHot) badges.push("hot");

  return badges;
}

export function formatDate(value: string | null) {
  if (!value) return "TBA";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function timeUntil(value: string | null) {
  if (!value) return null;
  const ms = new Date(value).getTime() - Date.now();
  if (ms <= 0) return null;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  if (days >= 1) return `${days}d left`;
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${Math.max(hours, 1)}h left`;
}

/**
 * Converts "[text](url)" into plain "text" — for contexts like the
 * line-clamped card preview where we can't render a real, separately
 * clickable <a> (the whole card is already a Link to the detail page,
 * so a nested anchor there would be invalid/inaccessible markup).
 */
export function stripMarkdownLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}
