"use client";

import { useEffect } from "react";

/**
 * Adds/removes the `compact-ui` class on <html> whenever the viewport
 * crosses the threshold for short desktop/tablet screens.
 * CSS rules scoped to `.compact-ui` have higher cascade priority than
 * Tailwind's @layer utilities, so no !important needed.
 */
export function CompactScreenObserver() {
  useEffect(() => {
    function update() {
      // 768–1699px wide (tablet → MacBook 15") AND short viewport
      const compact =
        window.innerWidth >= 768 &&
        window.innerWidth < 1700 &&
        window.innerHeight <= 1050;
      document.documentElement.classList.toggle("compact-ui", compact);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return null;
}
