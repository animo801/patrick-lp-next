"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// Formats a timestamp in the viewer's own time zone. The server has no
// idea where the viewer is, so it renders nothing and the browser
// fills the time in after hydration.
export function LocalTime({ iso }: { iso: string }) {
  const text = useSyncExternalStore(
    noopSubscribe,
    () =>
      new Date(iso).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    () => "",
  );
  return <time dateTime={iso}>{text}</time>;
}
