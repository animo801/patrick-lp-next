// Industry benchmarks for the /review dashboard Patrick uses to look
// over a lead's answers.
//
// [CONFIRM] Every `share` and `rating` below is a made-up placeholder,
// not real industry data — Patrick should swap in his own numbers.
//
// Safe to edit any time: `share` (the % of contractors who pick that
// answer — each question's shares should add up to 100), `rating`,
// `label`, and `note`. Old review links keep working.
//
// NOT safe to edit: the order or wording of `options`. Review links
// store each answer as its position in this list, so reordering would
// make old links show the wrong answers. If the quiz's answer options
// change (lib/assessment-questions.ts), leave V1 alone, add a V2 below
// matching the new options, and point LATEST_REVIEW_VERSION at it.

// How an answer reads to Patrick. `null` = informational only (e.g.
// business type), not good or bad.
export type Rating = "strong" | "typical" | "watch" | null;

export type BenchmarkOption = {
  // Must match the quiz option text exactly.
  option: string;
  share: number;
  rating: Rating;
};

export type BenchmarkQuestion = {
  // The quiz question id (see lib/assessment-questions.ts).
  id: string;
  // Short dashboard heading.
  label: string;
  // One line of context under the heading.
  note?: string;
  options: BenchmarkOption[];
};

const V1: BenchmarkQuestion[] = [
  {
    id: "businessType",
    label: "Business type",
    options: [
      { option: "Specialty trade (electrical, plumbing, HVAC, etc.)", share: 55, rating: null },
      { option: "General contractor / builder", share: 20, rating: null },
      { option: "Remodeler", share: 18, rating: null },
      { option: "Something else", share: 7, rating: null },
    ],
  },
  {
    id: "revenue",
    label: "Annual revenue",
    options: [
      { option: "Under $1M", share: 45, rating: null },
      { option: "$1M – $5M", share: 35, rating: null },
      { option: "$5M – $15M", share: 14, rating: null },
      { option: "$15M or more", share: 6, rating: null },
    ],
  },
  {
    id: "cogs",
    label: "Gross profit margin",
    note: "Healthy contractors usually land at 30% or better.",
    options: [
      { option: "I am not sure", share: 15, rating: "watch" },
      { option: "Under 20%", share: 18, rating: "watch" },
      { option: "20% to 30%", share: 34, rating: "typical" },
      { option: "30% to 40%", share: 23, rating: "strong" },
      { option: "Above 40%", share: 10, rating: "strong" },
    ],
  },
  {
    id: "grossMargin",
    label: "Job costing accuracy",
    note: "Month-end job costs they can trust without cleanup.",
    options: [
      { option: "Very accurate. Costs are coded correctly and reconciled quickly", share: 15, rating: "strong" },
      { option: "Mostly accurate, with a few clean-up items each month", share: 38, rating: "typical" },
      { option: "Often inaccurate. We do a lot of reclasses later", share: 30, rating: "watch" },
      { option: "We do not job cost consistently", share: 17, rating: "watch" },
    ],
  },
  {
    id: "arAging",
    label: "Accounts receivable",
    note: "How quickly customers pay once work is billed.",
    options: [
      { option: "Mostly current. Very little over 30 days", share: 20, rating: "strong" },
      { option: "Some over 30 days, but we stay on it", share: 42, rating: "typical" },
      { option: "A/R regularly drifts past 60 days", share: 26, rating: "watch" },
      { option: "A/R is a constant fire drill (90+ days is common)", share: 12, rating: "watch" },
    ],
  },
  {
    id: "cashRunway",
    label: "Cash runway",
    note: "Weeks of payroll and overhead covered by cash on hand.",
    options: [
      { option: "8+ weeks", share: 18, rating: "strong" },
      { option: "4-7 weeks", share: 32, rating: "typical" },
      { option: "1-3 weeks", share: 35, rating: "watch" },
      { option: "Less than 1 week", share: 15, rating: "watch" },
    ],
  },
  {
    id: "headcount",
    label: "Office staff",
    note: "People in the office, not the field.",
    options: [
      { option: "Just me", share: 30, rating: null },
      { option: "2 – 3 people", share: 40, rating: null },
      { option: "4 – 7 people", share: 20, rating: null },
      { option: "8 or more people", share: 10, rating: null },
    ],
  },
  {
    id: "otherExpenses",
    label: "Net profit",
    note: "What's left after every expense.",
    options: [
      { option: "Under 5%", share: 30, rating: "watch" },
      { option: "5% to 10%", share: 32, rating: "typical" },
      { option: "10% to 15%", share: 16, rating: "strong" },
      { option: "Above 15%", share: 7, rating: "strong" },
      { option: "I am not sure", share: 15, rating: "watch" },
    ],
  },
  {
    id: "ownerPay",
    label: "Owner pay",
    options: [
      { option: "Less than $75k/year", share: 25, rating: "watch" },
      { option: "$75k – $150k/year", share: 40, rating: "typical" },
      { option: "$150k – $250k/year", share: 23, rating: "strong" },
      { option: "More than $250k/year", share: 12, rating: "strong" },
    ],
  },
];

export const REVIEW_VERSIONS: Record<string, BenchmarkQuestion[]> = {
  "1": V1,
};

export const LATEST_REVIEW_VERSION = "1";
