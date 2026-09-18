import { createHash } from "crypto";
import { META_PIXEL_DATASET_ID } from "@/lib/constants";

const GRAPH_API_VERSION = "v21.0";

// Meta requires PII in user_data (email, phone) to be lowercased,
// trimmed, and SHA-256 hashed before it's sent — never send raw PII.
function hashPii(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export type CapiEventInput = {
  eventName: string;
  eventId: string;
  eventSourceUrl: string;
  email?: string;
  phone?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
};

// Sends one event to Meta's Conversions API for the configured
// dataset. Returns whether it succeeded — never throws, since a
// tracking failure should never break the caller's real flow (e.g.
// the assessment's contact-form submission).
export async function sendCapiEvent(input: CapiEventInput): Promise<{
  ok: boolean;
  error?: string;
}> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    return { ok: false, error: "META_CAPI_ACCESS_TOKEN is not set" };
  }
  // Server events only show up in Events Manager's "Test events" tab
  // when they carry the test code shown there. Set this env var while
  // testing and remove it for real traffic.
  // [TEMP] Hardcoded fallback so the deployed site sends test events
  // without an env var — REMOVE the fallback once testing is done, or
  // real leads will be tagged as test events and won't count.
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE ?? "TEST71117";

  const userData: Record<string, unknown> = {
    client_ip_address: input.clientIp,
    client_user_agent: input.userAgent,
    fbp: input.fbp,
    fbc: input.fbc,
  };
  if (input.email) userData.em = [hashPii(input.email)];
  if (input.phone) userData.ph = [hashPii(input.phone.replace(/[^\d]/g, ""))];

  const body = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl,
        action_source: "website",
        user_data: userData,
      },
    ],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  };

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_DATASET_ID}/events?access_token=${accessToken}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) {
      return { ok: false, error: `Meta CAPI ${res.status}: ${text}` };
    }
    // Meta replies with { events_received, fbtrace_id } — log it so a
    // successful send is visible (and traceable) in the server logs.
    console.log(
      "[meta-capi] sent",
      input.eventName,
      text,
      testEventCode ? `(test code ${testEventCode})` : "",
    );
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
