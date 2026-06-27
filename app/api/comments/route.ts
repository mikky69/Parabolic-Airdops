import { NextResponse } from "next/server";
import { postComment } from "@/lib/comments";

export async function POST(request: Request) {
  let body: { airdropId?: string; authorName?: string; content?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.airdropId || typeof body.content !== "string") {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { error } = await postComment({
    airdropId: body.airdropId,
    authorName: body.authorName ?? "Anonymous",
    content: body.content,
  });

  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json({ ok: true });
}
