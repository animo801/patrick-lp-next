"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { AssessmentQuestionConfig } from "@/lib/assessment-questions";
import type { ContactInfo } from "@/lib/assessmentReport";
import { submitLeadToGhl } from "@/app/assessment/actions";
import { ContactStep } from "./ContactStep";
import { DisqualifiedStep } from "./DisqualifiedStep";
import { LoadingStep } from "./LoadingStep";
import { ResultsStep } from "./ResultsStep";

// How long a selected option stays visibly highlighted before the quiz
// auto-advances — long enough to register as a deliberate choice, short
// enough not to feel laggy.
const SELECT_ADVANCE_DELAY_MS = 350;

// Answers that end the assessment early instead of continuing to the
// next question — currently just revenue under $1M.
function isDisqualifying(questionId: string, option: string) {
  return questionId === "revenue" && option === "Under $1M";
}

// The current position in the assessment lives in the URL's `step`
// search param (a question index, or one of these tokens) instead of
// plain component state, so the browser's back/forward buttons move
// through the quiz the way they'd move through any other pages.
type StepToken = "contact" | "submitted" | "disqualified";

function pushStep(searchParams: URLSearchParams, token: string) {
  const params = new URLSearchParams(searchParams.toString());
  params.set("step", token);
  window.history.pushState(null, "", `?${params.toString()}`);
}

function replaceStep(searchParams: URLSearchParams, token: string) {
  const params = new URLSearchParams(searchParams.toString());
  params.set("step", token);
  window.history.replaceState(null, "", `?${params.toString()}`);
}

// UTM params + ad click IDs captured on landing by UtmForwarder.
function readAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem("attribution") || "{}");
  } catch {
    return {};
  }
}

// `step` is 1-based (the question/step someone's currently on), `total`
// includes the contact form as the final step.
function ProgressBar({ step, total }: { step: number; total: number }) {
  const percent = Math.round((step / total) * 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Step ${step} of ${total}`}
      className="h-1.5 w-full bg-black/10"
    >
      <div
        className="h-full bg-blue transition-all duration-300 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

/**
 * Steps through `questions` one at a time, then contact info, a
 * loading beat, and the personalized results. Single-select questions
 * auto-advance the moment an option is picked (no button — a click is
 * already the "next" action). Text questions keep a submit button
 * since there's nothing to advance on until something's been typed.
 */
export function AssessmentFlow({
  questions,
}: {
  questions: AssessmentQuestionConfig[];
}) {
  const searchParams = useSearchParams();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [resultsReady, setResultsReady] = useState(false);

  const stepParam = searchParams.get("step");
  const questionCount = questions.length;
  const numericStep =
    stepParam !== null && /^\d+$/.test(stepParam) ? Number(stepParam) : null;
  const isFlowStep =
    numericStep !== null && numericStep >= 0 && numericStep < questionCount;
  const currentIndex = isFlowStep ? numericStep : 0;
  const view: "flow" | StepToken =
    stepParam === "contact" ||
    stepParam === "submitted" ||
    stepParam === "disqualified"
      ? stepParam
      : "flow";
  const question = questions[currentIndex];
  // Derived straight from `answers` (rather than separate component
  // state) so navigating back to a question via the browser's back
  // button shows the previous pick already highlighted.
  const selected =
    question.type === "select" ? (answers[question.id] ?? null) : null;

  // Establish a real "step=0" history entry on first load so there's
  // somewhere for the back button to land on the very first question.
  useEffect(() => {
    if (searchParams.get("step") === null) {
      replaceStep(searchParams, "0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToNextQuestion(fromIndex: number) {
    const next = fromIndex + 1;
    pushStep(searchParams, next >= questionCount ? "contact" : String(next));
  }

  function handleSelect(option: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: option }));
    if (isDisqualifying(question.id, option)) {
      window.setTimeout(
        () => pushStep(searchParams, "disqualified"),
        SELECT_ADVANCE_DELAY_MS,
      );
      return;
    }
    window.setTimeout(
      () => goToNextQuestion(currentIndex),
      SELECT_ADVANCE_DELAY_MS,
    );
  }

  function handleTextSubmit(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    goToNextQuestion(currentIndex);
  }

  if (view === "disqualified") {
    return <DisqualifiedStep />;
  }

  if (view === "submitted" && contact) {
    if (!resultsReady) {
      return <LoadingStep onDone={() => setResultsReady(true)} />;
    }
    return (
      <ResultsStep questions={questions} answers={answers} contact={contact} />
    );
  }

  // Total steps = every question plus the contact form at the end.
  const totalSteps = questionCount + 1;

  if (view === "contact" || (view === "submitted" && !contact)) {
    return (
      <>
        <ProgressBar step={totalSteps} total={totalSteps} />
        <ContactStep
          onSubmit={(info) => {
            submitLeadToGhl({
              contact: info,
              answers,
              questions: questions.map(({ id, question }) => ({
                id,
                question,
              })),
              attribution: readAttribution(),
              pageUrl: window.location.href,
            }).catch((err) =>
              console.error("[ghl] lead submission failed", err),
            );
            setContact(info);
            setResultsReady(false);
            pushStep(searchParams, "submitted");
          }}
        />
      </>
    );
  }

  return (
    <>
      <ProgressBar step={currentIndex + 1} total={totalSteps} />
      <section className="px-6 pb-10 pt-6 md:mx-auto md:max-w-xl">
        <p className="text-lg font-extrabold text-black/50">
          Question #{currentIndex + 1}
        </p>
        <h1 className="mt-2 text-[22px] leading-[1.15] md:text-[32px]">
          {question.question}
        </h1>
        {question.helperText ? (
          <p className="mt-3 text-base leading-6 text-black/60">
            {question.helperText}
          </p>
        ) : null}

        {question.type === "select" ? (
          <div
            className="mt-8 space-y-4"
            role="radiogroup"
            aria-label={question.question}
          >
            {question.options.map((option) => (
              <label
                key={option}
                className={`flex h-18 w-full cursor-pointer items-center justify-center rounded px-4 text-center text-lg font-bold leading-6 text-black transition-colors ${
                  selected === option
                    ? "bg-blue/10 ring-2 ring-blue"
                    : "bg-black/5"
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={selected === option}
                  // onClick (not onChange) so re-picking an option that's
                  // already selected — e.g. after navigating back — still
                  // advances, since a native radio's change event doesn't
                  // fire when the value doesn't change.
                  onChange={() => {}}
                  onClick={() => handleSelect(option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        ) : (
          <form
            key={question.id}
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const value = String(
                new FormData(e.currentTarget).get(question.id) ?? "",
              ).trim();
              if (value) handleTextSubmit(value);
            }}
          >
            <input
              type="text"
              name={question.id}
              defaultValue={answers[question.id] ?? ""}
              placeholder={question.placeholder}
              required
              className="h-18 w-full rounded border border-black/10 bg-black/5 px-4 text-lg text-black outline-none focus:ring-2 focus:ring-blue"
            />
            <button
              type="submit"
              className="mt-4 flex h-14 w-full items-center justify-center rounded-lg bg-blue px-6 font-sans text-lg font-extrabold text-white md:w-auto md:px-10"
            >
              Next step
            </button>
          </form>
        )}
      </section>
    </>
  );
}
