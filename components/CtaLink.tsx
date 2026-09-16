import { forwardRef } from "react";
import { ASSESSMENT_URL } from "@/lib/constants";

/**
 * Every "Start the assessment" button on the page renders through here,
 * so the assessment URL and the data-cta hook (used by UtmForwarder to
 * append attribution params, and by StickyCta to watch the hero button)
 * only need to be wired up in one place.
 */
export const CtaLink = forwardRef<
  HTMLAnchorElement,
  {
    id?: string;
    className?: string;
    children: React.ReactNode;
    href?: string;
  }
>(function CtaLink({ id, className, children, href = ASSESSMENT_URL }, ref) {
  return (
    <a
      ref={ref}
      id={id}
      href={href}
      data-cta="assessment"
      className={className}
    >
      {children}
    </a>
  );
});
