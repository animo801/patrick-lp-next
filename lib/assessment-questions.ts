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
      "Specialty trade (electrical, plumbing, HVAC, etc.)",
      "General contractor / builder",
      "Remodeler",
      "Something else",
    ],
  },
  {
    id: "revenue",
    type: "select",
    question: "What's your business's annual revenue?",
    helperText: "Your best estimate for the last 12 months is fine.",
    options: ["Under $1M", "$1M – $5M", "$5M – $15M", "$15M or more"],
  },
  {
    id: "cogs",
    type: "select",
    question: "What is your average gross profit margin?",
    options: [
      "I am not sure",
      "Under 20%",
      "20% to 30%",
      "30% to 40%",
      "Above 40%",
    ],
  },
  {
    id: "grossMargin",
    type: "select",
    question:
      "How accurate is your job costing (labor, materials, subs) by the time the month closes?",
    options: [
      "Very accurate. Costs are coded correctly and reconciled quickly",
      "Mostly accurate, with a few clean-up items each month",
      "Often inaccurate. We do a lot of reclasses later",
      "We do not job cost consistently",
    ],
  },
  {
    id: "arAging",
    type: "select",
    question: "What does your accounts receivable (AR) look like most months?",
    options: [
      "Mostly current. Very little over 30 days",
      "Some over 30 days, but we stay on it",
      "A/R regularly drifts past 60 days",
      "A/R is a constant fire drill (90+ days is common)",
    ],
  },
  {
    id: "cashRunway",
    type: "select",
    question:
      "If revenue stopped tomorrow, how many weeks could you cover payroll and overhead from cash (without borrowing)?",
    options: [
      "8+ weeks",
      "4-7 weeks",
      "1-3 weeks",
      "Less than 1 week",
    ],
  },
  {
    id: "headcount",
    type: "select",
    question: "How many people work in your office, not the field?",
    options: ["Just me", "2 – 3 people", "4 – 7 people", "8 or more people"],
  },
  {
    id: "otherExpenses",
    type: "select",
    question: "After all expenses, what is your net profit?",
    options: [
      "Under 5%",
      "5% to 10%",
      "10% to 15%",
      "Above 15%",
      "I am not sure",
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
];
