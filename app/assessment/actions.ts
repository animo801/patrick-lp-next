'use server';

import { createHash } from 'crypto';
import { cookies, headers } from 'next/headers';
import { META_PIXEL_DATASET_ID } from '@/lib/constants';

// Meta requires PII in user_data (email, phone) to be lowercased,
// trimmed, and SHA-256 hashed before it's sent — never send raw PII.
function hashPii(value: string) {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

// Sends one custom event to Meta's Conversions API from the server.
// The browser fires the matching fbq('trackCustom', ...) call with the
// same eventId, so Meta deduplicates the two. Never throws — a tracking
// failure must not break the contact-form submission.
export async function sendCapiEvent({
  eventName,
  eventId,
  email,
  phone,
}: {
  eventName: string;
  eventId: string;
  email?: string;
  phone?: string;
}): Promise<void> {
  const pixelId =
    process.env.NEXT_PUBLIC_META_PIXEL_ID ?? META_PIXEL_DATASET_ID;
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;

  if (!pixelId || !accessToken) {
    console.error(
      'Facebook CAPI (Assessment Submit): skipped — missing env vars (META_CONVERSIONS_API_TOKEN)',
    );
    return;
  }

  const cookieStore = await cookies();
  const headersList = await headers();
  const fbp = cookieStore.get('_fbp')?.value ?? '';
  const fbc = cookieStore.get('_fbc')?.value ?? '';
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    '';
  const userAgent = headersList.get('user-agent') ?? '';
  const eventSourceUrl = headersList.get('referer') ?? '';

  // [TEMP] Test event code so events show in Events Manager's "Test
  // events" tab. REMOVE the fallback once testing is done, or real leads
  // will be tagged as test events and won't count.
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE ?? 'TEST71117';

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        ...(eventSourceUrl && { event_source_url: eventSourceUrl }),
        user_data: {
          ...(fbc && { fbc }),
          ...(fbp && { fbp }),
          ...(ip && { client_ip_address: ip }),
          ...(userAgent && { client_user_agent: userAgent }),
          ...(email && { em: [hashPii(email)] }),
          ...(phone && { ph: [hashPii(phone.replace(/[^\d]/g, ''))] }),
        },
      },
    ],
    ...(testEventCode && { test_event_code: testEventCode }),
  };

  const url = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await res.text();
    if (res.ok) {
      console.log(`Facebook CAPI (Assessment Submit): ${res.status} ${body}`);
    } else {
      console.error(`Facebook CAPI (Assessment Submit): ${res.status} ${body}`);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`Facebook CAPI (Assessment Submit) failed: ${msg}`);
  }
}
