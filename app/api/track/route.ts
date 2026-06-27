import { NextResponse } from "next/server";
import { logEvent } from "@/lib/analytics";

export async function POST(request: Request) {
  let body: { airdropId?: string; type?: "view" | "click" };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.airdropId || (body.type !== "view" && body.type !== "click")) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  await logEvent(body.airdropId, body.type);
  return NextResponse.json({ ok: true });
}
