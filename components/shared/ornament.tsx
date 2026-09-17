import { cn } from "@/lib/utils";

/** A brass rule broken in the middle by an eight-point Damascene star. */
export function Ornament({
  className,
  align = "center",
}: {
  className?: string;
  align?: "center" | "start";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
      aria-hidden="true"
    >
      {align === "center" && <span className="rule-brass w-16 sm:w-24" />}
      <svg viewBox="0 0 24 24" className="size-3.5 shrink-0 text-brass-500">
        <path
          d="M12 1 L14.6 6.4 L20.4 5 L19 10.8 L23 12 L19 13.2 L20.4 19 L14.6 17.6 L12 23 L9.4 17.6 L3.6 19 L5 13.2 L1 12 L5 10.8 L3.6 5 L9.4 6.4 Z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>
      <span className="rule-brass w-16 sm:w-24" />
    </div>
  );
}

/**
 * A pointed Damascene arch, used as a frame around portrait imagery. Rendered
 * as a clip path so any child image takes the arch silhouette.
 */
export function ArchClip({ id = "arch" }: { id?: string }) {
  return (
    <svg className="absolute size-0" aria-hidden="true">
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d="M0,1 L0,0.42 C0,0.18 0.22,0 0.5,0 C0.78,0 1,0.18 1,0.42 L1,1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Corner flourish for framed panels. */
export function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("size-10 text-brass-600/60", className)}
      aria-hidden="true"
      fill="none"
    >
      <path d="M1 47 L1 14 C1 6.8 6.8 1 14 1 L47 1" stroke="currentColor" strokeWidth="1" />
      <path d="M8 47 L8 17 C8 12 12 8 17 8 L47 8" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}
