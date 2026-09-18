import { NextRequest, NextResponse } from "next/server";
import { sendCapiEvent } from "@/lib/meta-capi";

// Receives a client-side conversion signal (e.g. the assessment's
// contact form submit) and forwards it to Meta's Conversions API from
// the server, so it isn't dropped by ad blockers the way a pure
// browser pixel event can be. The browser also fires the matching
// fbq('trackCustom', ...) call with the same eventId — Meta
// deduplicates the two using that shared id.
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { eventName, eventId, eventSourceUrl, email, phone } = body ?? {};

  if (!eventName || !eventId || !eventSourceUrl) {
    return NextResponse.json(
      { ok: false, error: "eventName, eventId, and eventSourceUrl are required" },
      { status: 400 },
    );
  }

  const result = await sendCapiEvent({
    eventName,
    eventId,
    eventSourceUrl,
    email,
    phone,
    clientIp: request.headers.get("x-forwarded-for") ?? undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
    fbp: request.cookies.get("_fbp")?.value,
    fbc: request.cookies.get("_fbc")?.value,
  });

  if (!result.ok) {
    console.error("[capi-event]", eventName, result.error);
  }

  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
