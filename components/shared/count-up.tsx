"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Counts to `value` the first time it scrolls into view. Numerals are
 * formatted with the active locale, so Arabic renders Eastern Arabic digits.
 */
export function CountUp({
  value,
  locale,
  suffix = "",
  className,
}: {
  value: number;
  locale: string;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const [display, setDisplay] = React.useState(reduced ? value : 0);

  React.useEffect(() => {
    if (inView && !reduced) motionValue.set(value);
  }, [inView, reduced, motionValue, value]);

  React.useEffect(() => {
    if (reduced) return;
    return spring.on("change", (latest) => setDisplay(Math.round(latest)));
  }, [spring, reduced]);

  const formatter = React.useMemo(
    () => new Intl.NumberFormat(locale === "ar" ? "ar-SY" : "en-US"),
    [locale],
  );

  return (
    <motion.span ref={ref} className={className}>
      {formatter.format(display)}
      {suffix}
    </motion.span>
  );
}
