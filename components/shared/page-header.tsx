import { SmartImage } from "./smart-image";
import { Ornament } from "./ornament";
import { Reveal } from "./reveal";

/** The banner every inner page opens with. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  image,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  image: string;
}) {
  return (
    <section className="grain relative flex min-h-[52vh] items-end overflow-hidden pt-header">
      <SmartImage
        src={image}
        alt=""
        priority
        wrapperClassName="absolute inset-0"
        className="object-cover"
        sizes="100vw"
      />
      <div className="scrim-top absolute inset-0" />
      <div className="absolute inset-0 bg-mashrabiya opacity-[0.05]" />

      <Reveal className="container-luxe relative flex flex-col items-center gap-5 pb-16 pt-24 text-center">
        <span className="text-[0.7rem] font-medium uppercase tracking-luxe text-brass-400 rtl:text-[0.85rem] rtl:normal-case">
          {eyebrow}
        </span>
        <h1 className="text-balance text-4xl leading-[1.12] text-ivory-50 sm:text-5xl lg:text-6xl rtl:leading-[1.38]">
          {title}
        </h1>
        <Ornament />
        {lede ? (
          <p className="max-w-2xl text-pretty text-[1rem] leading-[1.9] text-stone-400">
            {lede}
          </p>
        ) : null}
      </Reveal>
    </section>
  );
}
