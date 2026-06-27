"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

export function CommentForm({ airdropId }: { airdropId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setError(null);

    startTransition(async () => {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ airdropId, authorName, content }),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        return;
      }

      setContent("");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Name (optional)"
        maxLength={60}
        className="w-full rounded-lg border border-obsidian-border bg-obsidian-surface px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-brand-magenta/50"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share an update, ask a question, or leave feedback..."
        maxLength={1000}
        rows={3}
        className="w-full resize-none rounded-lg border border-obsidian-border bg-obsidian-surface px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-brand-magenta/50"
      />

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending || !content.trim()}
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-magenta to-brand-orange px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
      >
        <Send className="h-3.5 w-3.5" />
        {isPending ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
