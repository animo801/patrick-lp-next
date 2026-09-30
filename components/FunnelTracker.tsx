"use client";

import { useEffect } from "react";
import { logFunnelEvent } from "@/lib/funnel-client";

/**
 * Top of the funnel for a landing page: logs `landedEvent` once per
 * page load, and `ctaClickEvent` whenever any CtaLink (data-cta=
 * "assessment") is clicked. Listens at the document level so the
 * CTAs themselves can stay server components. Renders nothing.
 */
export function FunnelTracker({
  landedEvent,
  ctaClickEvent,
}: {
  landedEvent: string;
  ctaClickEvent: string;
}) {
  useEffect(() => {
    logFunnelEvent(landedEvent);

    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (target?.closest('a[data-cta="assessment"]')) {
        logFunnelEvent(ctaClickEvent);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [landedEvent, ctaClickEvent]);

  return null;
}
