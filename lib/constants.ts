// Every "Start the assessment" CTA on the page points here — currently
// the in-app quiz flow starting at app/assessment/page.tsx. If that
// flow ever moves out to an external GHL funnel/survey instead, swap
// this one value and every CTA (hero, sticky, final) updates at once.
export const ASSESSMENT_URL = "/assessment";

// /score-app is an exact clone of the homepage, except its CTAs skip
// the in-app quiz and go to a page with the embedded ScoreApp quiz
// instead (app/score-app/assessment/page.tsx).
export const SCORE_APP_ASSESSMENT_URL = "/score-app/assessment";

// [CONFIRM] Placeholder — the results page's "book a call" CTA points
// here. Swap for Patrick's real booking link (Calendly, GHL, etc.)
// once it exists.
export const BOOKING_URL = "#book-a-call";

// Meta (Facebook) Pixel dataset — see app/layout.tsx for the pixel
// base code that uses this.
export const META_PIXEL_DATASET_ID = "874409346397147";
