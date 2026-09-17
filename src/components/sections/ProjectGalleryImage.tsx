"use client";

import Image from "next/image";
import { useRef } from "react";
import { Expand, X } from "lucide-react";
import type { ProjectImage } from "@/lib/cms/types";

/**
 * A case-study screenshot with a "view larger" trigger.
 *
 * Built on `<dialog>` rather than a hand-rolled overlay: `showModal()` gives
 * us Escape-to-close, a native focus trap, and focus restored to the
 * trigger on close for free, in every evergreen browser.
 */
export function ProjectGalleryImage({
  image,
  viewLargerLabel,
  closeLabel,
  priority = false,
}: {
  image: ProjectImage;
  viewLargerLabel: string;
  closeLabel: string;
  priority?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure className="flex flex-col gap-3">
      <div className="group relative overflow-hidden rounded-xl border border-border bg-white">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-auto w-full object-contain"
        />
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          aria-label={viewLargerLabel}
          className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 py-1.5 text-xs text-text-main shadow-sm backdrop-blur transition-colors hover:border-accent hover:text-accent"
        >
          <Expand size={13} /> {viewLargerLabel}
        </button>
      </div>
      {image.caption && (
        <figcaption className="text-xs text-text-muted">{image.caption}</figcaption>
      )}

      <dialog
        ref={dialogRef}
        aria-label={image.alt}
        className="max-h-[90vh] max-w-[92vw] rounded-xl border border-border bg-background p-0 backdrop:bg-black/70 open:flex open:flex-col"
      >
        <div className="flex items-center justify-end border-b border-border p-2">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={closeLabel}
            className="grid h-8 w-8 place-items-center rounded-md text-text-muted transition-colors hover:text-accent"
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-auto p-3">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="h-auto max-h-[80vh] w-auto max-w-full object-contain"
          />
        </div>
      </dialog>
    </figure>
  );
}
