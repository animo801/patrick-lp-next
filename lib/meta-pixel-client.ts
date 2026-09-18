declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Fires a custom conversion event two ways, tied together by a shared
// eventId so Meta deduplicates them into one event instead of
// double-counting: the browser pixel (works unless blocked) and the
// server-side Conversions API via /api/capi-event (still lands even
// if an ad blocker drops the browser call).
export function trackCustomEvent(
  eventName: string,
  contact: { email?: string; phone?: string } = {},
) {
  const eventId = crypto.randomUUID();

  if (window.fbq) {
    window.fbq("trackCustom", eventName, {}, { eventID: eventId });
  } else {
    // Usually an ad blocker or the pixel script failing to load.
    console.warn("[meta-pixel] fbq not available — browser event skipped");
  }

  fetch("/api/capi-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      eventId,
      eventSourceUrl: window.location.href,
      email: contact.email,
      phone: contact.phone,
    }),
    keepalive: true,
  })
    .then((res) => {
      if (!res.ok) {
        console.error("[meta-capi] /api/capi-event failed", res.status);
      }
    })
    .catch((err) => console.error("[meta-capi] /api/capi-event error", err));
}
