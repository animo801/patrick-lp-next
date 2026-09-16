export type AssessmentQuestionConfig = { id: string } & (
  | {
      type: "select";
      question: string;
      helperText?: string;
      options: string[];
    }
  | {
      type: "text";
      question: string;
      helperText?: string;
      placeholder?: string;
    }
);

// [CONFIRM] The dollar amounts, percentages, and headcount bands below
// are placeholder guesses, not real figures from Patrick — swap them
// for his actual qualification thresholds. The question order is also
// an assumption (business type -> revenue -> margin -> COGS -> office
// headcount -> other expenses -> owner pay -> urgency), reorder freely.
// `id` is what the answers/report state is keyed by — keep it in
// sync if you rename a question's meaning (reordering is safe either
// way, the id travels with the question).
export const ASSESSMENT_QUESTIONS: AssessmentQuestionConfig[] = [
  {
    id: "businessType",
    type: "select",
    question: "What kind of contracting business are you in?",
    options: [
      "General contractor / builder",
      "Remodeler",
      "Specialty trade (electrical, plumbing, HVAC, etc.)",
      "Something else",
    ],
  },
  {
    id: "revenue",
    type: "select",
    question: "What's your business's annual revenue?",
    helperText: "Your best estimate for the last 12 months is fine.",
    options: ["Under $500k", "$500k – $1M", "$1M – $3M", "$3M or more"],
  },
  {
    id: "grossMargin",
    type: "select",
    question: "How often do you hit your target gross margin?",
    helperText:
      "When we say gross margin, we mean the percent of the money you keep from each job.",
    options: [
      "80% or more of jobs",
      "Between 40% and 79% of jobs",
      "Less than 40% of jobs",
      "We don’t have GM% targets",
    ],
  },
  {
    id: "cogs",
    type: "select",
    question: "What would you estimate your cost of goods sold to be?",
    helperText:
      "The direct cost of labor and materials for your jobs, as a percent of revenue.",
    options: [
      "Less than 50% of revenue",
      "50% – 65% of revenue",
      "65% – 80% of revenue",
      "More than 80% of revenue",
    ],
  },
  {
    id: "headcount",
    type: "select",
    question: "How many people work in your office?",
    helperText: "Think admin, project management, and sales — not field crews.",
    options: ["Just me", "2 – 3 people", "4 – 7 people", "8 or more people"],
  },
  {
    id: "otherExpenses",
    type: "select",
    question: "How much would you guess you spend on other expenses?",
    helperText:
      "Rent, software, insurance, marketing — everything outside of COGS and payroll.",
    options: [
      "Less than $5,000/month",
      "$5,000 – $15,000/month",
      "$15,000 – $30,000/month",
      "More than $30,000/month",
    ],
  },
  {
    id: "ownerPay",
    type: "select",
    question: "How much do you pay yourself?",
    options: [
      "Less than $75k/year",
      "$75k – $150k/year",
      "$150k – $250k/year",
      "More than $250k/year",
    ],
  },
  {
    id: "priority",
    type: "select",
    question: "How big of a priority is improving your business?",
    helperText:
      "Generally when we work with a contractor, they put about $150k more in their account.",
    // [CONFIRM] Priority-scale options are a guess to fit the new
    // question wording — swap for Patrick's actual scale if different.
    options: [
      "Not a priority right now",
      "Somewhat a priority",
      "A high priority",
      "My top priority",
    ],
  },
];
