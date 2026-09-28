import { getCampaignClient } from "@/lib/campaign/client";
import { fetchOverview } from "@/lib/campaign/api";
import { getPhase } from "@/lib/campaign/schedule";
import { CampaignBannerView } from "./CampaignBannerView";

/**
 * Small teaser for the landing page. Renders nothing unless a contest is
 * running or about to start, so it never shows dead space.
 */
export async function CampaignBanner() {
  const overview = await fetchOverview(getCampaignClient());
  if (!overview) return null;
  const phase = getPhase(overview, overview.server_now_ms);
  if (phase.kind === "none" || phase.kind === "ended") return null;
  return <CampaignBannerView initial={overview} />;
}
