"use client";

import { ImageGallery } from "./ImageGallery";
import type { AirdropImage } from "@/types/database.types";

interface ClickableGalleryProps {
  images: AirdropImage[];
  airdropId: string;
  redirectUrl: string;
  title: string;
}

export function ClickableGallery({
  images,
  airdropId,
  redirectUrl,
  title,
}: ClickableGalleryProps) {
  function handleClick() {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ airdropId, type: "click" }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <a
      href={redirectUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={handleClick}
      className="group block"
      title={`Go to ${title}`}
    >
      <div className="relative overflow-hidden rounded-2xl ring-2 ring-transparent transition-all duration-300 group-hover:ring-brand-magenta/50 group-hover:shadow-glow">
        <ImageGallery images={images} />
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center rounded-2xl bg-gradient-to-t from-black/60 via-black/0 to-transparent pb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-gradient-to-r from-brand-magenta to-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
            Join Now ↗
          </span>
        </div>
      </div>
    </a>
  );
}
