import { sendCapiEvent } from '@/app/assessment/actions';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// The Facebook ad click ID. Prefer the current URL (someone who lands
// straight on /assessment from an ad), then the first-touch value
// UtmForwarder saved on the landing page. The server uses it to build
// `fbc` when the pixel's _fbc cookie is missing (ad blockers, Safari),
// which is what lets Meta tie the lead back to the ad click.
function readFbclid(): string | undefined {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('fbclid');
    if (fromUrl) return fromUrl;
    const stored = JSON.parse(sessionStorage.getItem('attribution') || '{}');
    return typeof stored.fbclid === 'string' ? stored.fbclid : undefined;
  } catch {
    return undefined;
  }
}

// Fires a custom conversion event two ways, tied together by a shared
// eventId so Meta deduplicates them into one event instead of
// double-counting: the browser pixel (works unless blocked) and the
// server-side Conversions API via a server action (still lands even
// if an ad blocker drops the browser call).
export function trackCustomEvent(
  eventName: string,
  contact: { email?: string; phone?: string; name?: string } = {},
) {
  const eventId = crypto.randomUUID();

  if (window.fbq) {
    window.fbq('trackCustom', eventName, {}, { eventID: eventId });
  } else {
    // Usually an ad blocker or the pixel script failing to load.
    console.warn('[meta-pixel] fbq not available — browser event skipped');
  }

  sendCapiEvent({ eventName, eventId, fbclid: readFbclid(), ...contact }).catch(
    (err) => console.error('[meta-capi] server action failed', err),
  );
}
