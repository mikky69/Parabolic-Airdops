import "server-only";
import { headers } from "next/headers";
import crypto from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import type { EventType } from "@/types/database.types";

/**
 * A salted hash of IP + User-Agent. We never store the raw IP — this hash
 * is one-way and rotates whenever ANALYTICS_SALT changes, so it can't be
 * reversed back to an identity even if the table were ever exposed.
 */
export function getViewerHash() {
  const h = headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  const ua = h.get("user-agent") || "unknown";
  const salt = process.env.ANALYTICS_SALT || "dev-salt-change-me";

  return crypto.createHash("sha256").update(`${ip}:${ua}:${salt}`).digest("hex");
}

/**
 * Logs a view or click. Relies on the DB's unique constraint
 * (airdrop_id, event_type, viewer_hash, viewed_date) to silently dedupe
 * repeat events from the same visitor on the same day — we just swallow
 * the resulting unique_violation rather than treating it as an error.
 */
export async function logEvent(airdropId: string, eventType: EventType) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

  const supabase = createClient();
  const viewerHash = getViewerHash();

  const { error } = await supabase.from("airdrop_events").insert({
    airdrop_id: airdropId,
    event_type: eventType,
    viewer_hash: viewerHash,
  });

  // 23505 = Postgres unique_violation — expected for repeat same-day visits.
  if (error && error.code !== "23505") {
    console.error("Failed to log analytics event:", error.message);
  }
}
