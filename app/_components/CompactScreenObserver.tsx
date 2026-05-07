"use client";

import { useEffect } from "react";

/**
 * Toggles `compact-ui` on <html> based on viewport dimensions.
 * Uses visualViewport API so Chrome DevTools device simulation is detected,
 * in addition to the standard window resize event.
 */
export function CompactScreenObserver() {
  useEffect(() => {
    function update() {
      const vv = window.visualViewport;
      const w = vv ? vv.width : window.innerWidth;
      const h = vv ? vv.height : window.innerHeight;
      const compact = w >= 768 && w < 1700 && h <= 1050;
      document.documentElement.classList.toggle("compact-ui", compact);
    }

    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
