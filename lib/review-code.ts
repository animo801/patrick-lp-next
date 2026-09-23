import {
  LATEST_REVIEW_VERSION,
  REVIEW_VERSIONS,
  type BenchmarkQuestion,
} from "./review-benchmarks";

// Packs a lead's quiz answers into a short, database-free code for the
// /review dashboard link, e.g. "1.2130231a2.mfk3x0":
//   "1"        benchmark version (which option lists to decode against)
//   "213..."   one character per question: the answer's position in
//              that question's option list, in base 36 ("_" = none)
//   "mfk3x0"   submission time, in minutes since 1970, base 36
// No names or contact info go in the code — only answer positions.

const MISSING = "_";

export function encodeReviewCode(
  answers: Record<string, string>,
  submittedAt = new Date(),
): string {
  const questions = REVIEW_VERSIONS[LATEST_REVIEW_VERSION];
  const chars = questions
    .map((q) => {
      const index = q.options.findIndex((o) => o.option === answers[q.id]);
      return index === -1 ? MISSING : index.toString(36);
    })
    .join("");
  const minutes = Math.floor(submittedAt.getTime() / 60000).toString(36);
  return `${LATEST_REVIEW_VERSION}.${chars}.${minutes}`;
}

export type DecodedAnswer = {
  question: BenchmarkQuestion;
  // Index into question.options, or null if unanswered.
  selected: number | null;
};

export type DecodedReview = {
  answers: DecodedAnswer[];
  submittedAt: Date | null;
};

// Returns null for anything malformed rather than guessing.
export function decodeReviewCode(code: string): DecodedReview | null {
  const [version, chars, minutes] = code.split(".");
  const questions = REVIEW_VERSIONS[version];
  if (!questions || !chars || chars.length !== questions.length) return null;

  const answers: DecodedAnswer[] = [];
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const char = chars[i];
    if (char === MISSING) {
      answers.push({ question, selected: null });
      continue;
    }
    const index = parseInt(char, 36);
    if (Number.isNaN(index) || index >= question.options.length) return null;
    answers.push({ question, selected: index });
  }

  const parsedMinutes = minutes ? parseInt(minutes, 36) : NaN;
  const submittedAt = Number.isNaN(parsedMinutes)
    ? null
    : new Date(parsedMinutes * 60000);

  return { answers, submittedAt };
}
