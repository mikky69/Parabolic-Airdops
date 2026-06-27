"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { AirdropImage } from "@/types/database.types";

export function ImageGallery({ images }: { images: AirdropImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const active = images[activeIndex];

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-obsidian-border bg-obsidian-surface">
        <Image
          src={active.url}
          alt="Airdrop screenshot"
          fill
          className="object-cover transition-opacity duration-200"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border transition-all",
                index === activeIndex
                  ? "border-brand-magenta/60 opacity-100"
                  : "border-obsidian-border opacity-60 hover:opacity-100"
              )}
            >
              <Image src={image.url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
