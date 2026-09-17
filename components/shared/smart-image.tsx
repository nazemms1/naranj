"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * A framed photograph.
 *
 * Every image on this site is a real photograph of Naranj or of Gemini
 * Group's own pastry work — there are no generated or stock stand-ins. While
 * a file is still decoding the frame holds a plain charcoal tone and fades the
 * photograph in; it never draws a decorative substitute in its place.
 */
export function SmartImage({
  src,
  alt,
  className,
  wrapperClassName,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  quality = 88,
  ...props
}: Omit<ImageProps, "src" | "alt" | "fill"> & {
  src: string;
  alt: string;
  wrapperClassName?: string;
}) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-ink-850", wrapperClassName)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        {...props}
      />
    </div>
  );
}
