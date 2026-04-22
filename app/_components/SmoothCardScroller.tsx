"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type CardStackItem = {
  id: string;
  node: React.ReactNode;
};

export function SmoothCardScroller({
  items,
  className,
  "aria-label": ariaLabel = "Card stack",
  autoScroll = true,
  scrollSpeed = 30, // pixels per second
}: {
  items: CardStackItem[];
  className?: string;
  "aria-label"?: string;
  autoScroll?: boolean;
  scrollSpeed?: number;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);

  // Triple the items for seamless infinite scroll
  const tripleItems = [...items, ...items, ...items];

  useEffect(() => {
    const scroller = scrollerRef.current;
    const content = contentRef.current;
    if (!scroller || !content || !autoScroll) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let scrollPosition = 0;
    const itemHeight = content.scrollHeight / 3; // Height of one set of items

    // Start in the middle third
    scrollPosition = itemHeight;
    scroller.scrollTop = scrollPosition;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Check if paused (hovering or focused)
      const isPaused = scroller.matches(":hover") || scroller.matches(":focus-within");

      if (!isPaused && deltaTime < 100) { // Ignore large jumps (tab switches)
        // Smooth continuous scroll
        const scrollAmount = (scrollSpeed * deltaTime) / 1000;
        scrollPosition += scrollAmount;

        // Apply the scroll
        scroller.scrollTop = scrollPosition;

        // Seamless loop logic
        if (scrollPosition >= itemHeight * 2) {
          // We've scrolled past 2/3, reset to 1/3
          scrollPosition -= itemHeight;
          scroller.scrollTop = scrollPosition;
        } else if (scrollPosition < itemHeight * 0.5) {
          // Somehow scrolled too far up, reset forward
          scrollPosition += itemHeight;
          scroller.scrollTop = scrollPosition;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Handle manual scrolling to maintain loop
    const handleManualScroll = () => {
      scrollPosition = scroller.scrollTop;

      // Apply same loop logic for manual scrolling
      if (scrollPosition >= itemHeight * 2.5) {
        scrollPosition -= itemHeight;
        scroller.scrollTop = scrollPosition;
      } else if (scrollPosition < itemHeight * 0.5) {
        scrollPosition += itemHeight;
        scroller.scrollTop = scrollPosition;
      }
    };

    scroller.addEventListener("scroll", handleManualScroll, { passive: true });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scroller.removeEventListener("scroll", handleManualScroll);
      lastTimeRef.current = 0;
    };
  }, [autoScroll, scrollSpeed, items.length]);

  return (
    <div
      ref={scrollerRef}
      className={[
        "relative h-svh overflow-y-auto overflow-x-hidden",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]",
        "[overscroll-behavior:contain]",
        "py-[10svh] px-6 lg:px-10",
        className ?? "",
      ].join(" ")}
      aria-label={ariaLabel}
    >
      <div ref={contentRef} className="flex flex-col gap-7">
        {tripleItems.map((item, idx) => {
          const uniqueKey = `${item.id}_${Math.floor(idx / items.length)}`;
          return (
            <motion.div
              key={uniqueKey}
              className="snap-center"
              initial={{ opacity: 0.8, scale: 0.95 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }}
              viewport={{
                amount: 0.5,
                margin: "-10%"
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