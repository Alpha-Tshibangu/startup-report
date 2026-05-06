"use client";

import { useState } from "react";
import type { ReportEdition } from "../lib/report-pdfs";
import { ReportPdfDownloadModal } from "./ReportPdfDownloadModal";

export type InsightCardModel = {
  href: string;
  title: string;
  overlayHeroBackground: true;
  heroForegroundTitle: string;
  heroTilePaddingClass?: string;
  heroTitleTypographyClass?: string;
  heroTitleWidthClass?: string;
  reportEdition?: ReportEdition;
};

const linkCardClass = [
  "group/link group relative block w-full outline-none transition-colors",
  "hover:text-white",
].join(" ");

export function InsightCardTile({ card }: { card: InsightCardModel }) {
  const [pdfOpen, setPdfOpen] = useState(false);

  const figure = (
    <>
      <div className="rounded-xl transition-[box-shadow] duration-300 lg:group-hover/link:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.9)]">
        <div className="relative overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300">
          <div className="relative aspect-[2/1] w-full overflow-hidden lg:transition-transform lg:duration-300 lg:group-hover:scale-105">
            <div
              aria-hidden
              className="absolute inset-0 scale-110 bg-[url('/left-panel-bg.jpg')] bg-cover bg-position-[center_62%]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.72))]"
            />
            <div
              className={[
                "absolute inset-0 z-10 flex items-center justify-center",
                card.heroTilePaddingClass ?? "p-6 sm:p-8",
              ].join(" ")}
            >
              <p
                className={[
                  "text-balance text-center font-display font-normal italic leading-[1.08] tracking-[-0.03em] text-zinc-50",
                  card.heroTitleWidthClass ?? "w-full max-w-full",
                  card.heroTitleTypographyClass ??
                    "text-[clamp(1.15rem,3.8vw,1.85rem)] sm:text-[clamp(1.25rem,3.2vw,2rem)]",
                ].join(" ")}
              >
                {card.heroForegroundTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 w-full text-sm font-semibold leading-snug text-zinc-100">{card.title}</p>
    </>
  );

  if (card.reportEdition) {
    return (
      <>
        <button
          type="button"
          onClick={() => setPdfOpen(true)}
          className={[linkCardClass, "cursor-pointer text-left"].join(" ")}
        >
          {figure}
        </button>
        <ReportPdfDownloadModal
          edition={card.reportEdition}
          hideTrigger
          isOpen={pdfOpen}
          onOpenChange={setPdfOpen}
        />
      </>
    );
  }

  return (
    <a href={card.href} className={linkCardClass}>
      {figure}
    </a>
  );
}
