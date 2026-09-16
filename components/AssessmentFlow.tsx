"use client";

import { useState } from "react";
import type { AssessmentQuestionConfig } from "@/lib/assessment-questions";
import type { ContactInfo } from "@/lib/assessmentReport";
import { ContactStep } from "./ContactStep";
import { LoadingStep } from "./LoadingStep";
import { ResultsStep } from "./ResultsStep";

// How long a selected option stays visibly highlighted before the quiz
// auto-advances — long enough to register as a deliberate choice, short
// enough not to feel laggy.
const SELECT_ADVANCE_DELAY_MS = 350;

type Phase = "flow" | "loading" | "results";

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
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [textValue, setTextValue] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [phase, setPhase] = useState<Phase>("flow");

  const question = questions[step];

  function goNext() {
    setSelected(null);
    setTextValue("");
    setStep((s) => s + 1);
  }

  function handleSelect(option: string) {
    setSelected(option);
    setAnswers((prev) => ({ ...prev, [question.id]: option }));
    // [CONFIRM] Answers only live in this component's state — wire
    // them up to real storage/submission once there's somewhere for
    // them to go (see ContactStep and lib/assessmentReport.ts).
    window.setTimeout(goNext, SELECT_ADVANCE_DELAY_MS);
  }

  function handleTextSubmit(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    goNext();
  }

  if (phase === "loading") {
    return <LoadingStep onDone={() => setPhase("results")} />;
  }

  if (phase === "results" && contact) {
    return (
      <ResultsStep questions={questions} answers={answers} contact={contact} />
    );
  }

  if (!question) {
    return (
      <ContactStep
        onSubmit={(info) => {
          setContact(info);
          setPhase("loading");
        }}
      />
    );
  }

  return (
    <section className="px-6 pb-10 pt-6 md:mx-auto md:max-w-xl">
      <p className="text-lg font-extrabold text-black/50">
        Question #{step + 1}
      </p>
      <h1 className="mt-2 text-[32px] leading-[1.1] md:text-[48px]">
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
              className={`flex h-18 w-full cursor-pointer items-center justify-center rounded px-4 text-center text-xl font-bold leading-6 text-black transition-colors ${
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
                onChange={() => handleSelect(option)}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (textValue.trim()) handleTextSubmit(textValue.trim());
          }}
        >
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder={question.placeholder}
            required
            className="h-18 w-full rounded border border-black/10 bg-black/5 px-4 text-lg text-black outline-none focus:ring-2 focus:ring-blue"
          />
          <button
            type="submit"
            className="mt-4 flex h-14 w-full items-center justify-center rounded-lg bg-blue px-6 font-sans text-xl font-extrabold text-white md:w-auto md:px-10"
          >
            Next step
          </button>
        </form>
      )}
    </section>
  );
}
