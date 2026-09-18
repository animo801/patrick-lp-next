import { sendCapiEvent } from '@/app/assessment/actions';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Fires a custom conversion event two ways, tied together by a shared
// eventId so Meta deduplicates them into one event instead of
// double-counting: the browser pixel (works unless blocked) and the
// server-side Conversions API via a server action (still lands even
// if an ad blocker drops the browser call).
export function trackCustomEvent(
  eventName: string,
  contact: { email?: string; phone?: string } = {},
) {
  const eventId = crypto.randomUUID();

  if (window.fbq) {
    window.fbq('trackCustom', eventName, {}, { eventID: eventId });
  } else {
    // Usually an ad blocker or the pixel script failing to load.
    console.warn('[meta-pixel] fbq not available — browser event skipped');
  }

  sendCapiEvent({ eventName, eventId, ...contact }).catch((err) =>
    console.error('[meta-capi] server action failed', err),
  );
}
