import Script from "next/script";
import { TrustStrip } from "./TrustStrip";
import {
  reportHeadline,
  priorityNote,
  type ContactInfo,
} from "@/lib/assessmentReport";
import type { AssessmentQuestionConfig } from "@/lib/assessment-questions";

// [CONFIRM] No Figma design for this screen yet — built to match the
// site's existing visual language (the report list follows the
// Testimonials/FinalCta card and section patterns).
export function ResultsStep({
  questions,
  answers,
  contact,
}: {
  questions: AssessmentQuestionConfig[];
  answers: Record<string, string>;
  contact: ContactInfo;
}) {
  return (
    <>
      <section className="px-6 pb-10 pt-6 text-center md:mx-auto md:max-w-[720px]">
        <h1 className="text-[32px] leading-[1.1] md:text-[48px]">
          {reportHeadline(contact)}
        </h1>
        <p className="mx-auto mt-3 max-w-[520px] text-lg leading-[1.4] text-black/60">
          We just sent you a text to confirm we got it and Patrick is
          working on making your video review.
        </p>
        <p className="mx-auto mt-10 max-w-[520px] text-lg leading-[1.4] text-black/60">
          Here is a recap of what you told us:
        </p>

        <dl className="mt-8 divide-y divide-black/10 overflow-hidden rounded-lg border border-black/10 bg-white text-left">
          {questions.map((q) => (
            <div
              key={q.id}
              className="flex flex-col gap-1 px-5 py-4 md:flex-row md:items-baseline md:justify-between md:gap-6"
            >
              <dt className="text-sm font-bold text-black/50">
                {q.question}
              </dt>
              <dd className="font-bold text-black md:text-right">
                {answers[q.id] ?? "—"}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <TrustStrip />

      {/* GHL booking widget. form_embed.js finds the iframe by id and
          auto-resizes it to fit the calendar. */}
      <section className="bg-blue px-6 py-16 text-center md:py-20">
        <h2 className="text-[28px] leading-[1.2] text-white md:text-[36px]">
          Let’s go over this together.
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-lg leading-[1.4] text-white/80">
          {priorityNote(answers)}
        </p>
        <div className="mt-8 md:mx-auto md:max-w-3xl">
          <iframe
            src="https://link.3pcllc.com/widget/booking/o8hNbEZflzejhERgcyPM"
            id="WyQxsI2D2EO8CvFKXNtu_1777888927662"
            title="Book a call"
            scrolling="no"
            style={{ width: "100%", border: "none", overflow: "hidden" }}
          />
        </div>
      </section>
      <Script
        src="https://link.3pcllc.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
