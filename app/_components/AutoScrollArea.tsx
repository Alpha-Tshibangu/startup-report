"use client";

import React, { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function AutoScrollArea({
  children,
  id,
  className,
  speedPxPerSec = 18,
  loop = true,
  pauseAtEndMs = 900,
  infinite = true,
  pauseOnHover = true,
  pauseOnFocusWithin = true,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  speedPxPerSec?: number;
  loop?: boolean;
  pauseAtEndMs?: number;
  infinite?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocusWithin?: boolean;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const pauseUntilRef = useRef<number>(0);

  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion) return;
    if (speedPxPerSec <= 0) return;

    const placeInMiddle = () => {
      if (!infinite) return;
      const node = ref.current;
      if (!node) return;
      // With 3 copies, middle copy starts at 1/3 of scrollHeight
      const third = node.scrollHeight / 3;
      if (Number.isFinite(third) && third > 0) node.scrollTop = third;
    };

    // let layout settle before measuring
    placeInMiddle();
    const t = window.setTimeout(placeInMiddle, 0);

    const tick = (ts: number) => {
      const node = ref.current;
      if (!node) return;

      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min(64, ts - lastTsRef.current);
      lastTsRef.current = ts;

      const paused =
        isPaused ||
        (pauseOnHover && node.matches(":hover")) ||
        (pauseOnFocusWithin && node.matches(":focus-within"));

      if (!paused) {
        if (ts >= pauseUntilRef.current) {
          const dy = (speedPxPerSec * dt) / 1000;
          const maxScroll = node.scrollHeight - node.clientHeight;

          if (maxScroll > 0) {
            const next = node.scrollTop + dy;
            node.scrollTop = next;

            if (infinite) {
              const third = node.scrollHeight / 3;
              if (third > 0) {
                // keep scrollTop inside the middle band
                if (node.scrollTop < third * 0.5) node.scrollTop += third;
                if (node.scrollTop > third * 1.5) node.scrollTop -= third;
              }
            } else if (node.scrollTop >= maxScroll - 0.5) {
              if (loop) {
                pauseUntilRef.current = ts + pauseAtEndMs;
                node.scrollTop = 0;
              } else {
                node.scrollTop = maxScroll;
                setIsPaused(true);
              }
            }
          }
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      window.clearTimeout(t);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      pauseUntilRef.current = 0;
    };
  }, [
    infinite,
    isPaused,
    loop,
    pauseAtEndMs,
    pauseOnFocusWithin,
    pauseOnHover,
    reduceMotion,
    speedPxPerSec,
  ]);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      aria-label={ariaLabel}
      onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
    >
      {infinite ? (
        <>
          {children}
          {children}
          {children}
        </>
      ) : (
        children
      )}
    </div>
  );
}

