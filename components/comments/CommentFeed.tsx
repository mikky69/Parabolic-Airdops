import { MessageCircle } from "lucide-react";
import { getComments } from "@/lib/comments";

function timeAgo(dateString: string) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export async function CommentFeed({ airdropId }: { airdropId: string }) {
  const comments = await getComments(airdropId);

  return (
    <div>
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-zinc-400" />
        <h2 className="font-display text-lg font-semibold text-white">
          Community ({comments.length})
        </h2>
      </div>

      {comments.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-500">
          No comments yet — be the first to share an update or ask a question.
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-xl border border-obsidian-border bg-obsidian-surface/50 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-200">
                  {comment.author_name}
                </span>
                <span className="font-mono text-xs text-zinc-600">
                  {timeAgo(comment.created_at)}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-zinc-400">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
