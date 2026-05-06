"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { REPORT_PDF_ASSETS, type ReportEdition } from "../lib/report-pdfs";

const DESCRIPTION =
  "Share your details to access the report. It opens in a new tab and a copy may save to your device.";

const MODAL_COPY: Record<
  ReportEdition,
  { eyebrow: string; title: string; description: string }
> = {
  past: {
    eyebrow: "Startup Playbooks Report",
    title: "Access past editions",
    description: DESCRIPTION,
  },
  latest: {
    eyebrow: "Startup Playbooks Report",
    title: "Access Latest Edition",
    description: DESCRIPTION,
  },
};

function openAndDownloadPdf(pdfPath: string, downloadFileName: string) {
  const url = new URL(pdfPath, window.location.origin).href;
  window.open(url, "_blank", "noopener,noreferrer");

  const a = document.createElement("a");
  a.href = url;
  a.download = downloadFileName;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export type ReportPdfDownloadModalProps = {
  edition: ReportEdition;
  variant?: "hero-cta" | "plain-trigger";
  triggerLabel?: string;
  triggerClassName?: string;
  hideTrigger?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ReportPdfDownloadModal({
  edition,
  variant = "plain-trigger",
  triggerLabel,
  triggerClassName,
  hideTrigger = false,
  isOpen: controlledIsOpen,
  onOpenChange,
}: ReportPdfDownloadModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isOpen = controlledIsOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  const copy = MODAL_COPY[edition];
  const titleId = `report-pdf-${edition}-title`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setSubmitError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    const form = event.currentTarget;
    const fd = new FormData(form);

    const body = {
      edition,
      fullName: String(fd.get("fullName") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/report-pdf-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data: unknown = await res.json().catch(() => ({}));
      const message =
        typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : "Something went wrong. Please try again.";

      if (!res.ok) {
        setSubmitError(message);
        return;
      }

      const { pdfPath, downloadFileName } = REPORT_PDF_ASSETS[edition];
      openAndDownloadPdf(pdfPath, downloadFileName);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const heroButtonClass =
    "mt-8 inline-flex w-fit items-center rounded-full border border-white/25 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.8)] transition hover:bg-zinc-100";

  const defaultTrigger =
    edition === "latest" ? "Access Latest Edition" : "Access past editions";

  return (
    <>
      {hideTrigger ? null : (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
          className={
            variant === "hero-cta"
              ? heroButtonClass
              : [
                  "bg-transparent p-0 text-inherit",
                  triggerClassName ?? "hover:text-white",
                ].join(" ")
          }
        >
          {triggerLabel ?? defaultTrigger}
        </button>
      )}

      {mounted && isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-5 py-8 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <button
                type="button"
                aria-label="Close form"
                onClick={() => setOpen(false)}
                className="absolute inset-0 cursor-default"
              />
              <div className="relative w-full max-w-lg rounded-3xl bg-[#111719] p-6 text-white shadow-2xl sm:p-8">
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="absolute right-5 top-5 z-10 text-2xl leading-none text-zinc-300 hover:text-white"
                >
                  ×
                </button>

                <div className="pr-10">
                  <div className="text-xs uppercase tracking-[0.22em] text-zinc-400">
                    {copy.eyebrow}
                  </div>
                  <h2
                    id={titleId}
                    className="mt-3 font-display text-4xl italic leading-none tracking-[-0.04em]"
                  >
                    {copy.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">{copy.description}</p>
                </div>

                {submitted ? (
                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/8 p-5 text-sm leading-6 text-zinc-100">
                    You’re all set — the report should be opening in a new tab. If nothing appears,
                    check the tab bar or your downloads folder.
                  </div>
                ) : (
                  <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                    <label className="grid gap-2 text-sm text-zinc-300">
                      Your Full Name
                      <input
                        required
                        name="fullName"
                        className="rounded-xl bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:bg-white/10"
                        placeholder="Your full name"
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-zinc-300">
                      Your Company
                      <input
                        required
                        name="company"
                        className="rounded-xl bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:bg-white/10"
                        placeholder="Your company"
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-zinc-300">
                      Your Email Address
                      <input
                        required
                        type="email"
                        name="email"
                        className="rounded-xl bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:bg-white/10"
                        placeholder="you@company.com"
                      />
                    </label>
                    {submitError ? (
                      <p className="text-sm text-red-300" role="alert">
                        {submitError}
                      </p>
                    ) : null}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? "Downloading…" : "Access report"}
                    </button>
                  </form>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
