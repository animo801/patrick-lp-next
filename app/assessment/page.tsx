import { Suspense } from "react";
import { Header } from "@/components/Header";
import { AssessmentFlow } from "@/components/AssessmentFlow";
import { ASSESSMENT_QUESTIONS } from "@/lib/assessment-questions";

// [CONFIRM] Only question #1 is designed so far (Figma node 8:63). This
// stays a single static page until multi-question routing/results are
// designed — AssessmentFlow just steps through ASSESSMENT_QUESTIONS.
export default function AssessmentPage() {
  return (
    <>
      <Header />
      {/* AssessmentFlow reads the `step` search param (via
          useSearchParams) to sync its position with browser
          back/forward — that requires a Suspense boundary for
          production builds. */}
      <Suspense>
        <AssessmentFlow questions={ASSESSMENT_QUESTIONS} />
      </Suspense>
    </>
  );
}
