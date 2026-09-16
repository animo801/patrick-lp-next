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
      <AssessmentFlow questions={ASSESSMENT_QUESTIONS} />
    </>
  );
}
