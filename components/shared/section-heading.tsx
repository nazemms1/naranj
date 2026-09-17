import { cn } from "@/lib/utils";
import { Ornament } from "./ornament";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: "center" | "start";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-[0.7rem] font-medium uppercase tracking-luxe text-brass-400/90 rtl:text-[0.85rem] rtl:normal-case">
          {eyebrow}
        </span>
      ) : null}

      <Tag className="text-balance text-4xl leading-[1.1] text-ivory-100 sm:text-5xl lg:text-[3.4rem] rtl:leading-[1.4]">
        {title}
      </Tag>

      <Ornament align={align} className={align === "center" ? "" : "ms-0"} />

      {lede ? (
        <p className="max-w-2xl text-pretty text-[1.02rem] leading-[1.9] text-stone-400">
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
