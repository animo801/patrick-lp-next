import { ASSESSMENT_QUESTIONS } from "./assessment-questions";

// Every event the funnel tracks. The /api/funnel-event route only
// accepts names from this list, so a typo (or a stranger poking the
// endpoint) can't create junk keys in Redis.
//
// Quiz answers are logged as `answer:<questionId>:<optionIndex>`, so
// each question's options show up as their own boxes on /funnel. The
// option index comes from lib/assessment-questions.ts — reordering a
// question's options there reshuffles its historical counts, so reset
// the funnel (or just live with it) if you do.

export const FUNNEL_EVENTS = {
  landed: "landed",
  ctaClick: "cta_click",
  quizStart: "quiz_start",
  disqualified: "disqualified",
  contactSubmit: "contact_submit",
  scoreAppLanded: "score_app_landed",
  scoreAppCtaClick: "score_app_cta_click",
} as const;

// Page loads of a landing page. Besides the usual unique-session set,
// these also bump a page-view counter and add the visitor to the
// unique-visitors set that the headline numbers on /funnel read.
export const LANDED_EVENTS: string[] = [
  FUNNEL_EVENTS.landed,
  FUNNEL_EVENTS.scoreAppLanded,
];

// Counter of every page load (reloads included) for a landed event.
export function viewsName(landedEvent: string) {
  return `views:${landedEvent}`;
}

// Set of visitor ids (kept in localStorage, so they survive across
// sessions and days) that landed on either page.
export const VISITORS_NAME = "visitors";

export function answerEvent(questionId: string, optionIndex: number) {
  return `answer:${questionId}:${optionIndex}`;
}

export const ALLOWED_FUNNEL_EVENTS = new Set<string>([
  ...Object.values(FUNNEL_EVENTS),
  ...ASSESSMENT_QUESTIONS.flatMap((q) =>
    q.type === "select" ? q.options.map((_, i) => answerEvent(q.id, i)) : [],
  ),
]);

// One Redis set per event, holding the session ids that fired it — so
// the set's size is the number of unique sessions at that step. Each
// event is written twice: to an all-time set, and to that day's set
// (`funnel:2026-09-30:landed`), which the date filters on /funnel
// union together so a session active on several days counts once.
export function funnelKey(eventName: string, day?: string) {
  return day ? `funnel:${day}:${eventName}` : `funnel:${eventName}`;
}

// [CONFIRM] Which timezone a "day" starts in, for the date filters.
export const FUNNEL_TIMEZONE = "America/Denver";

// YYYY-MM-DD for `date` in FUNNEL_TIMEZONE.
export function funnelDay(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: FUNNEL_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

// Shifts a YYYY-MM-DD string by whole days (calendar math only, so
// timezones and DST can't skew it).
export function addDays(day: string, days: number) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
