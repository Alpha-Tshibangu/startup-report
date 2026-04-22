"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CardStackScroller } from "./CardStackScroller";

type CardStackItem = {
  id: string;
  node: React.ReactNode;
};

function useIsMobile(breakpointPx = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpointPx]);

  return isMobile;
}

export function ResponsiveCards({
  items,
  className,
  footerCta,
}: {
  items: CardStackItem[];
  className?: string;
  footerCta?: React.ReactNode;
}) {
  const isMobile = useIsMobile(1024);

  if (isMobile) {
    return (
      <div className={["lg:hidden", className ?? ""].join(" ")}>
        <CardStackScroller
          items={items}
          aria-label="Report cards"
          className="pb-[12svh]"
          autoScroll={false}
          infinite={false}
        />
        {footerCta ? <div className="px-6 pb-12">{footerCta}</div> : null}
      </div>
    );
  }

  return (
    <div className={["hidden lg:block", className ?? ""].join(" ")}>
      <CardStackScroller
        items={items}
        aria-label="Report cards"
        className="pb-[12svh]"
        dwellMs={2500}
        transitionMs={200}
      />
    </div>
  );
}

