"use client";

import { useEffect, useState } from "react";

const STATUS_MESSAGES = [
  "Reviewing your answers…",
  "Calculating your gross margin…",
  "Comparing you to other contractors we work with…",
  "Finding where the money's going…",
  "Building your results…",
];

const STEP_MS = 700;

/**
 * Cosmetic "analyzing" screen between the contact form and the results
 * reveal. scoreAssessment() is actually instant — this just gives the
 * reveal some weight, the way a real analysis would feel. Auto-calls
 * onDone once it's cycled through the status messages.
 */
export function LoadingStep({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const isLast = index >= STATUS_MESSAGES.length - 1;
    const timer = window.setTimeout(
      () => (isLast ? onDone() : setIndex((i) => i + 1)),
      STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [index, onDone]);

  const progress = Math.round(((index + 1) / STATUS_MESSAGES.length) * 100);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-black/10 border-t-blue"
        role="status"
        aria-label="Analyzing your answers"
      />
      <p className="mt-6 text-lg font-bold text-black" aria-live="polite">
        {STATUS_MESSAGES[index]}
      </p>
      <div className="mt-4 h-2 w-full max-w-xs overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full bg-blue transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
