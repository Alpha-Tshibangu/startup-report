"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function ReportRequestModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setIsSubmitted(false);
        }}
        className="mt-8 inline-flex w-fit items-center rounded-full border border-white/25 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.8)] transition hover:bg-zinc-100"
      >
        Get the Full Report
      </button>

      {isMounted && isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-5 py-8 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="report-request-title"
            >
              <button
                type="button"
                aria-label="Close report request form"
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 cursor-default"
              />
              <div className="relative w-full max-w-lg rounded-3xl bg-[#111719] p-6 text-white shadow-2xl sm:p-8">
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                  className="absolute right-5 top-5 z-10 text-2xl leading-none text-zinc-300 hover:text-white"
                >
                  ×
                </button>

                <div className="pr-10">
                  <div className="text-xs uppercase tracking-[0.22em] text-zinc-400">
                    Startup Playbooks Report
                  </div>
                  <h2
                    id="report-request-title"
                    className="mt-3 font-display text-4xl italic leading-none tracking-[-0.04em]"
                  >
                    Access one of our recent reports
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">
                    Leave your details and we’ll send through access when the full report is ready.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/8 p-5 text-sm leading-6 text-zinc-100">
                    Thanks, we’ve received your details. This is a preview form for now, so
                    we’ll wire it to the final report workflow later.
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
                    <button
                      type="submit"
                      className="mt-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100"
                    >
                      Access now
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

