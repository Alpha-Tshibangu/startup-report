"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CardStackItem = {
  id: string;
  node: React.ReactNode;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function CardStackScroller({
  items,
  className,
  "aria-label": ariaLabel = "Card stack",
  autoScroll = true,
  autoScrollSpeedPxPerSec = 22,
  loop = true,
  pauseAtEndMs = 900,
  infinite = true,
  dwellMs = 2200,
  transitionMs = 520,
}: {
  items: CardStackItem[];
  className?: string;
  "aria-label"?: string;
  autoScroll?: boolean;
  autoScrollSpeedPxPerSec?: number;
  loop?: boolean;
  pauseAtEndMs?: number;
  infinite?: boolean;
  dwellMs?: number;
  transitionMs?: number;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const autoRafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const pauseUntilRef = useRef<number>(0);
  const stepRef = useRef<{ idx: number; phase: "dwell" | "move" } | null>(null);
  const tweenRef = useRef<{
    from: number;
    to: number;
    startTs: number;
    dur: number;
  } | null>(null);

  const repeatedItems = useMemo(() => {
    if (!infinite) return items.map((i) => ({ ...i, _key: i.id }));
    const triple: Array<CardStackItem & { _key: string }> = [];
    for (let rep = 0; rep < 3; rep++) {
      for (const it of items) triple.push({ ...it, _key: `${it.id}__rep${rep}` });
    }
    return triple;
  }, [infinite, items]);

  const [metrics, setMetrics] = useState(() =>
    repeatedItems.map(() => ({ opacity: 1, scale: 1, translateY: 0 }))
  );

  const itemIds = useMemo(() => repeatedItems.map((i) => i._key), [repeatedItems]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, repeatedItems.length);
    setMetrics(repeatedItems.map(() => ({ opacity: 1, scale: 1, translateY: 0 })));
  }, [repeatedItems.length, itemIds]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // No normalization needed - we'll just keep scrolling down

    const compute = () => {
      const rect = scroller.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const maxDist = rect.height * 0.42;

      const next = repeatedItems.map((_, idx) => {
        const el = cardRefs.current[idx];
        if (!el) return { opacity: 1, scale: 1, translateY: 0 };

        const r = el.getBoundingClientRect();
        const cardCenter = r.top + r.height / 2;
        const dist = cardCenter - centerY;
        const ad = Math.abs(dist);

        const t = clamp(ad / maxDist, 0, 1);
        // Very subtle transforms to avoid conflicts with scrolling
        const smoothT = t * t * (3 - 2 * t); // smoothstep function
        const opacity = lerp(1, 0.7, smoothT);
        const scale = lerp(1, 0.98, smoothT);
        const translateY = clamp(dist * 0.04, -10, 10);

        return { opacity, scale, translateY };
      });

      setMetrics(next);
    };

    let lastScrollTop = scroller.scrollTop;
    const schedule = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        // Only compute if scroll position actually changed
        if (Math.abs(scroller.scrollTop - lastScrollTop) > 0.5) {
          compute();
          lastScrollTop = scroller.scrollTop;
        }
      });
    };

    compute();
    scroller.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      scroller.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [repeatedItems]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (!autoScroll) return;
    if (autoScrollSpeedPxPerSec <= 0) return;

    const reduced =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false);
    if (reduced) return;

    // No need for initial positioning - start from top
    const t = window.setTimeout(() => {}, 0);

    const baseLen = items.length;
    const getCardCenterScrollTop = (idx: number) => {
      const node = scrollerRef.current;
      const el = cardRefs.current[idx];
      if (!node || !el) return node?.scrollTop ?? 0;
      const target =
        el.offsetTop + el.offsetHeight / 2 - node.clientHeight / 2;
      return target;
    };

    // Snappy easing for quick transitions
    const easeInOut = (t: number): number => {
      // Quick ease-out for snappy feel
      return 1 - Math.pow(1 - t, 3);
    };

    const tick = (ts: number) => {
      const node = scrollerRef.current;
      if (!node) return;

      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min(64, ts - lastTsRef.current);
      lastTsRef.current = ts;

      // pause when interacting with the column
      const paused = node.matches(":hover") || node.matches(":focus-within");

      if (!paused) {
        if (ts >= pauseUntilRef.current) {
          // Step-based autoplay: dwell on a card, then animate to next.
          if (!stepRef.current) {
            const startIdx = 0; // Start from the beginning
            stepRef.current = { idx: startIdx, phase: "dwell" };
            node.scrollTop = getCardCenterScrollTop(startIdx);
            pauseUntilRef.current = ts + Math.max(400, dwellMs);
          } else if (stepRef.current.phase === "dwell") {
            // Always move to the next card
            let nextIdx = stepRef.current.idx + 1;

            // If we have infinite scroll and we've shown all cards
            if (infinite && nextIdx >= repeatedItems.length) {
              // Continue scrolling but cycle the index
              nextIdx = nextIdx % baseLen + baseLen; // Stay in middle section
            }

            stepRef.current = { idx: nextIdx, phase: "move" };
            tweenRef.current = {
              from: node.scrollTop,
              to: getCardCenterScrollTop(nextIdx),
              startTs: ts,
              dur: transitionMs || 200,
            };
          }

          if (stepRef.current.phase === "move" && tweenRef.current) {
            const tw = tweenRef.current;
            const p = Math.min(1, (ts - tw.startTs) / tw.dur);
            node.scrollTop = tw.from + (tw.to - tw.from) * easeInOut(p);

            if (p >= 1) {
              tweenRef.current = null;
              // Just continue scrolling without any repositioning
              stepRef.current = { idx: stepRef.current.idx, phase: "dwell" };
              pauseUntilRef.current = ts + Math.max(400, dwellMs);
            }
          }
        }
      }

      autoRafRef.current = window.requestAnimationFrame(tick);
    };

    autoRafRef.current = window.requestAnimationFrame(tick);
    return () => {
      window.clearTimeout(t);
      if (autoRafRef.current != null) window.cancelAnimationFrame(autoRafRef.current);
      autoRafRef.current = null;
      lastTsRef.current = null;
      pauseUntilRef.current = 0;
      stepRef.current = null;
      tweenRef.current = null;
    };
  }, [
    autoScroll,
    autoScrollSpeedPxPerSec,
    dwellMs,
    infinite,
    pauseAtEndMs,
    repeatedItems.length,
    items.length,
    transitionMs,
  ]);

  return (
    <div
      ref={scrollerRef}
      className={[
        "relative h-svh overflow-y-auto overflow-x-hidden",
        "[scrollbar-width:none] [scrollbar-gutter:stable] [overscroll-behavior:y:contain]",
        "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]",
        "scroll-smooth [scroll-snap-type:y_proximity]",
        // keep the “centered card” feel without excessive whitespace
        "py-[10svh] px-6 lg:px-10",
        className ?? "",
      ].join(" ")}
      aria-label={ariaLabel}
    >
      <div className="flex flex-col gap-7">
        {repeatedItems.map((item, idx) => {
          const m = metrics[idx] ?? { opacity: 1, scale: 1, translateY: 0 };
          return (
            <motion.div
              key={item._key}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="scroll-mt-24 snap-center mx-auto w-full max-w-[520px] lg:max-w-[600px] xl:max-w-[660px]"
              animate={{
                opacity: m.opacity,
                scale: m.scale,
                y: m.translateY,
              }}
              transition={{
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              {item.node}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

