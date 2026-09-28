// Contest timing. This mirrors the WhatsApp bot's scheduler so the countdown
// on the site matches when sessions really start.

export type Overview = {
  exists: boolean;
  active?: boolean;
  start_date?: string; // YYYY-MM-DD, contest-local
  end_date?: string;
  days?: number;
  session_hours?: number[]; // 24h, contest-local
  utc_offset_hours?: number;
  session_questions?: number;
  server_now_ms: number;
};

export type LeaderRow = { rank: number; name: string; xp: number };

export type CampaignData = {
  overview: Overview;
  daily: { day: string | null; rows: LeaderRow[] };
  event: { rows: LeaderRow[] };
};

export type Session = {
  dayNumber: number;
  sessionNumber: number;
  at: number; // UTC ms when the session starts
  endsAt: number; // approximate UTC ms when it finishes
};

// Each question runs about 30s plus a short gap between questions.
const SECONDS_PER_QUESTION = 35;

function addDays(day: string, n: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function buildSessions(o: Overview): Session[] {
  if (!o.exists || !o.start_date || !o.session_hours?.length || !o.days) return [];
  const offsetMs = (o.utc_offset_hours ?? 1) * 3600000;
  const lengthMs = (o.session_questions ?? 10) * SECONDS_PER_QUESTION * 1000;
  const sessions: Session[] = [];
  for (let d = 0; d < o.days; d++) {
    const day = addDays(o.start_date, d);
    o.session_hours.forEach((hour, i) => {
      const at =
        Date.parse(`${day}T${String(hour).padStart(2, "0")}:00:00Z`) - offsetMs;
      sessions.push({ dayNumber: d + 1, sessionNumber: i + 1, at, endsAt: at + lengthMs });
    });
  }
  return sessions.sort((a, b) => a.at - b.at);
}

export type Phase =
  | { kind: "none" }
  | { kind: "upcoming"; next: Session }
  | { kind: "live"; session: Session; next?: Session }
  | { kind: "between"; next: Session }
  | { kind: "ended" };

export function getPhase(o: Overview, nowMs: number): Phase {
  if (!o.exists) return { kind: "none" };
  const sessions = buildSessions(o);
  if (!sessions.length) return { kind: "none" };
  if (!o.active) return { kind: "ended" };

  const live = sessions.find((s) => nowMs >= s.at && nowMs < s.endsAt);
  const next = sessions.find((s) => s.at > nowMs);
  if (live) return { kind: "live", session: live, next };
  if (!next) return { kind: "ended" };
  if (nowMs < sessions[0].at) return { kind: "upcoming", next };
  return { kind: "between", next };
}

export function tzLabel(offsetHours = 1): string {
  if (offsetHours === 1) return "WAT";
  return `UTC${offsetHours >= 0 ? "+" : ""}${offsetHours}`;
}

export function fmtHour(hour: number): string {
  const h12 = ((hour + 11) % 12) + 1;
  return `${h12}:00 ${hour < 12 ? "AM" : "PM"}`;
}

export function fmtSessionTimes(hours: number[] = []): string {
  return hours.map(fmtHour).join(" & ");
}

export function splitDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
