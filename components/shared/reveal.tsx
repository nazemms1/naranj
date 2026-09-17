"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "start" | "end" | "none";

const OFFSET = 34;

function offsetFor(direction: Direction, rtl: boolean) {
  switch (direction) {
    case "up":
      return { y: OFFSET };
    case "down":
      return { y: -OFFSET };
    case "start":
      return { x: rtl ? OFFSET : -OFFSET };
    case "end":
      return { x: rtl ? -OFFSET : OFFSET };
    default:
      return {};
  }
}

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** Renders children as staggered items rather than a single block. */
  stagger?: number;
}

/**
 * Scroll-triggered entrance. Respects `prefers-reduced-motion` by rendering
 * the content immediately with no transform.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.9,
  stagger,
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();
  const [rtl, setRtl] = React.useState(false);

  React.useEffect(() => {
    setRtl(document.documentElement.dir === "rtl");
  }, []);

  if (reduced) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  const container: Variants = {
    hidden: { opacity: 0, ...offsetFor(direction, rtl) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
        ...(stagger ? { staggerChildren: stagger, delayChildren: delay } : {}),
      },
    },
  };

  return (
    <motion.div
      data-reveal
      className={cn(className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -80px 0px" }}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}

/** A child of a `Reveal` that has `stagger` set. */
export const revealChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export function RevealItem({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      data-reveal
      variants={revealChild}
      className={cn(className)}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Splits a line of display text into words and lifts them in sequence.
 * Arabic words are kept whole so letter joining is never broken.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 1,
              delay: delay + i * 0.075,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
