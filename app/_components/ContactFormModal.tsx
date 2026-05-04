"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ContactFormModalProps = {
  triggerClassName?: string;
  triggerLabel?: string;
  hideTrigger?: boolean;
  isOpen?: boolean;
  onOpen?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
};

export function ContactFormModal({
  triggerClassName,
  triggerLabel = "Partner with Us",
  hideTrigger = false,
  isOpen: controlledIsOpen,
  onOpen,
  onOpenChange,
}: ContactFormModalProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;
  const setIsOpen = onOpenChange ?? setUncontrolledIsOpen;

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
      {hideTrigger ? null : (
        <button
          type="button"
          onClick={() => {
            onOpen?.();
            setIsOpen(true);
            setIsSubmitted(false);
          }}
          className={[
            "bg-transparent p-0 text-inherit",
            triggerClassName ?? "hover:text-white",
          ].join(" ")}
        >
          {triggerLabel}
        </button>
      )}

      {isMounted && isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-5 py-8 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-form-title"
            >
              <button
                type="button"
                aria-label="Close contact form"
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
                    Curiosity Centre
                  </div>
                  <h2
                    id="contact-form-title"
                    className="mt-3 font-display text-4xl italic leading-none tracking-[-0.04em]"
                  >
                    Get in touch
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-zinc-300">
                    Send us a note and we’ll come back to you shortly.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/8 p-5 text-sm leading-6 text-zinc-100">
                    Thanks, we’ve received your message. This preview form can be wired
                    into your final contact workflow later.
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
                      Your Email Address
                      <input
                        required
                        type="email"
                        name="email"
                        className="rounded-xl bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:bg-white/10"
                        placeholder="you@company.com"
                      />
                    </label>
                    <label className="grid gap-2 text-sm text-zinc-300">
                      Message
                      <textarea
                        required
                        name="message"
                        rows={4}
                        className="resize-none rounded-xl bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:bg-white/10"
                        placeholder="How can we help?"
                      />
                    </label>
                    <button
                      type="submit"
                      className="mt-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100"
                    >
                      Send message
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

