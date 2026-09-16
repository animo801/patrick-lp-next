"use client";

import { useEffect } from "react";

const TRACKED = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ttclid",
  "msclkid",
];

/**
 * Forwards UTM params + ad click IDs to every link tagged
 * data-cta="assessment" (rendered via CtaLink), so attribution
 * survives the handoff to the GHL assessment funnel once its real URL
 * replaces the ASSESSMENT_URL placeholder in lib/constants.ts.
 * First-touch: captured once per session, then reused even if a later
 * pageview on this site has no query params. Renders nothing.
 */
export function UtmForwarder() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stored = JSON.parse(
      sessionStorage.getItem("attribution") || "{}",
    ) as Record<string, string>;

    const hasNew = TRACKED.some((k) => params.has(k));
    if (hasNew && Object.keys(stored).length === 0) {
      TRACKED.forEach((k) => {
        const v = params.get(k);
        if (v) stored[k] = v;
      });
      sessionStorage.setItem("attribution", JSON.stringify(stored));
    }

    if (Object.keys(stored).length === 0) return;

    document
      .querySelectorAll<HTMLAnchorElement>('a[data-cta="assessment"]')
      .forEach((a) => {
        const url = new URL(a.href);
        Object.entries(stored).forEach(([k, v]) => {
          if (!url.searchParams.has(k)) url.searchParams.set(k, v);
        });
        a.href = url.toString();
      });
  }, []);

  return null;
}
