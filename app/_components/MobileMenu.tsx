"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ContactFormModal } from "./ContactFormModal";

const navItems = [
  { label: "Curiosity Centre", href: "https://curiositycentre.com/" },
  {
    label: "The High Flyers Podcast",
    href: "https://curiositycentre.com/the-high-flyers-podcast",
  },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setHasScrolled(window.scrollY > 12);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <div className="lg:hidden">
      <header
        className={[
          "fixed inset-x-0 top-0 z-[1200] flex h-20 items-center justify-between px-6 transition-all duration-300",
          hasScrolled || isOpen
            ? "bg-[#111719]/55 shadow-[0_16px_45px_-34px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "bg-transparent",
        ].join(" ")}
      >
        <Image
          src="/curiosity-centre-logo-blue.png"
          alt="Curiosity Centre"
          width={385}
          height={85}
          priority
          className="h-auto w-56 object-contain brightness-0 invert"
        />
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center text-white"
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={[
                "h-0.5 w-full rounded-full bg-white transition-transform",
                isOpen ? "translate-y-2 rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "h-0.5 w-full rounded-full bg-white transition-opacity",
                isOpen ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "h-0.5 w-full rounded-full bg-white transition-transform",
                isOpen ? "-translate-y-2 -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>
      </header>

      {isOpen ? (
        <div className="fixed inset-0 z-[1100] translate-y-0 bg-[#111719]/95 px-6 pb-10 pt-28 text-white opacity-100 backdrop-blur-xl transition-all duration-300">
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-white/10 pb-4 text-3xl font-medium tracking-tight text-zinc-50"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsContactOpen(true);
              }}
              className="border-b border-white/10 bg-transparent pb-4 text-left text-3xl font-medium tracking-tight text-zinc-50"
            >
              Partner with Us
            </button>
          </nav>
        </div>
      ) : null}
      <ContactFormModal
        hideTrigger
        isOpen={isContactOpen}
        onOpenChange={setIsContactOpen}
      />
    </div>
  );
}

