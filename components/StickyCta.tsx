"use client";

import { useEffect, useRef } from "react";
import { CtaLink } from "./CtaLink";

/**
 * Sticky CTAs (desktop: top-right pill, mobile: bottom bar). Both stay
 * hidden until the hero's own "Start the assessment" button (#hero-cta)
 * scrolls out of view, so they don't compete with it while it's still
 * on screen. Watches the hero CTA itself (not a section boundary) so
 * this stays correct regardless of phone height — on a short viewport
 * the section below the hero can already be visible on load, which
 * would fire a section-boundary trigger immediately.
 */
export function StickyCta() {
  const desktopRef = useRef<HTMLAnchorElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = document.getElementById("hero-cta");
    const ctas = [desktopRef.current, mobileRef.current].filter(
      (el): el is HTMLAnchorElement | HTMLDivElement => el !== null,
    );
    if (!trigger || !ctas.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const heroCtaVisible = entry.isIntersecting;
        ctas.forEach((el) => el.classList.toggle("is-visible", !heroCtaVisible));
      },
      { threshold: 0 },
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CtaLink
        ref={desktopRef}
        className="cta-reveal fixed top-4 right-4 z-50 hidden items-center justify-center rounded-lg bg-blue px-5 py-3 font-sans text-sm font-extrabold text-white no-underline shadow-lg md:inline-flex"
      >
        Start the Assessment
      </CtaLink>
      <div
        ref={mobileRef}
        className="cta-reveal fixed inset-x-0 bottom-0 z-50 bg-white/95 px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden"
      >
        <CtaLink className="flex w-full items-center justify-center rounded-lg bg-blue px-6 py-4 font-sans text-base font-extrabold text-white no-underline">
          Start the Assessment
        </CtaLink>
      </div>
    </>
  );
}
