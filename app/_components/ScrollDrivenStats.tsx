"use client";

import { useEffect, useMemo, useState } from "react";

export type StatItem = { label: string; value: string };

type Props = {
  scrollContainerId: string;
  sectionIds: string[];
  sectionStats: Record<string, StatItem[]>;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function ScrollDrivenStats({ scrollContainerId, sectionIds, sectionStats }: Props) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  const activeStats = useMemo(() => sectionStats[activeId] ?? [], [activeId, sectionStats]);

  useEffect(() => {
    const scroller = document.getElementById(scrollContainerId);
    if (!scroller) return;

    const getActive = () => {
      const scrollTop = scroller.scrollTop;
      const bias = 140; // feels close to the reference “snap” point

      let bestIdx = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        // offsetTop is relative to offsetParent; since sections live inside scroller, it works well here.
        const top = el.offsetTop;
        if (top <= scrollTop + bias) bestIdx = i;
      }

      bestIdx = clamp(bestIdx, 0, Math.max(0, sectionIds.length - 1));
      const nextId = sectionIds[bestIdx];
      setActiveId((prev) => (prev === nextId ? prev : nextId));
    };

    getActive();
    scroller.addEventListener("scroll", getActive, { passive: true });
    window.addEventListener("resize", getActive);
    return () => {
      scroller.removeEventListener("scroll", getActive);
      window.removeEventListener("resize", getActive);
    };
  }, [scrollContainerId, sectionIds]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-200/70">
          Live snapshot
        </div>
        <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-zinc-200/70">
          scroll-linked
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {activeStats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-black/25 p-4">
            <div className="text-[11px] uppercase tracking-wide text-zinc-200/60">
              {s.label}
            </div>
            <div className="mt-1 text-xl font-semibold tracking-tight text-zinc-50">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

