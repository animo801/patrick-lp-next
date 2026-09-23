import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { LocalTime } from "@/components/LocalTime";
import type { Rating } from "@/lib/review-benchmarks";
import { decodeReviewCode, type DecodedAnswer } from "@/lib/review-code";

// Private-ish dashboard Patrick opens from the lead notification. The
// whole review lives in the `r` code in the URL (see lib/review-code.ts)
// — no database, no contact info. Kept out of search engines.
export const metadata: Metadata = {
  title: "Assessment review",
  robots: { index: false, follow: false },
};

// Dashboard chart colors. Emphasis form: the lead's answer in brand
// blue, every other answer in a recessive gray. Every bar also carries
// a visible text label, so the gray's low contrast never hides a value.
const OTHER_BAR = "#c8c8c3";

const RATING_META: Record<
  Exclude<Rating, null>,
  {
    label: string;
    summaryLabel: string;
    color: string;
    icon: "check" | "dash" | "alert";
  }
> = {
  strong: { label: "Strength", summaryLabel: "Strengths", color: "#0ca30c", icon: "check" },
  typical: { label: "Typical", summaryLabel: "Typical", color: "#8a8a85", icon: "dash" },
  watch: { label: "Watch area", summaryLabel: "Watch areas", color: "#ec835a", icon: "alert" },
};

export default async function ReviewPage({ searchParams }: PageProps<"/review">) {
  const { r } = await searchParams;
  const review = typeof r === "string" ? decodeReviewCode(r) : null;

  if (!review) {
    return (
      <>
        <Header />
        <main className="px-6 pb-16 pt-10 md:mx-auto md:max-w-xl">
          <h1 className="text-[28px] leading-[1.15]">
            This review link isn’t valid.
          </h1>
          <p className="mt-3 text-lg leading-[1.4] text-black/60">
            It may have been cut off when it was copied. Try opening it
            again from the original lead notification.
          </p>
        </main>
      </>
    );
  }

  const answered = review.answers.filter(
    (a): a is DecodedAnswer & { selected: number } => a.selected !== null,
  );
  const byRating = (rating: Rating) =>
    answered.filter((a) => a.question.options[a.selected].rating === rating);
  const headline = ["businessType", "revenue"]
    .map((id) => answered.find((a) => a.question.id === id))
    .filter((a) => a !== undefined)
    .map((a) => a.question.options[a.selected].option);

  return (
    <>
      <Header />
      <main className="px-6 pb-16 pt-4 md:mx-auto md:max-w-[1100px]">
        <p className="text-sm font-bold uppercase tracking-wide text-black/50">
          Assessment review
        </p>
        <h1 className="mt-1 text-[28px] leading-[1.15] md:text-[40px]">
          {headline.length ? headline.join(" · ") : "Contractor assessment"}
        </h1>
        {review.submittedAt ? (
          <p className="mt-2 text-base text-black/60">
            Submitted <LocalTime iso={review.submittedAt.toISOString()} />
          </p>
        ) : null}

        <section
          aria-label="Summary"
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {(["watch", "typical", "strong"] as const).map((rating) => {
            const items = byRating(rating);
            const meta = RATING_META[rating];
            return (
              <div
                key={rating}
                className="rounded-lg border border-black/10 p-5"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-black/70">
                  <RatingIcon rating={rating} />
                  {meta.summaryLabel}
                </div>
                <p className="mt-2 text-5xl font-semibold leading-none">
                  {items.length}
                </p>
                <p className="mt-3 text-sm leading-5 text-black/60">
                  {items.length
                    ? items.map((a) => a.question.label).join(", ")
                    : "None"}
                </p>
              </div>
            );
          })}
        </section>

        <h2 className="mt-12 text-2xl">How they compare</h2>
        <p className="mt-1 text-base text-black/60">
          Each chart shows how contractors typically answer. Their answer
          is highlighted in blue.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {review.answers.map((a) => (
            <QuestionCard key={a.question.id} answer={a} />
          ))}
        </div>

        <p className="mt-10 text-sm text-black/50">
          Industry figures are estimates for comparison only.
        </p>
      </main>
    </>
  );
}

function QuestionCard({ answer }: { answer: DecodedAnswer }) {
  const { question, selected } = answer;
  const picked = selected === null ? null : question.options[selected];
  const maxShare = Math.max(...question.options.map((o) => o.share));
  const chartId = `chart-${question.id}`;

  return (
    <article className="rounded-lg border border-black/10 p-5">
      <h3 className="text-lg">{question.label}</h3>
      {question.note ? (
        <p className="mt-0.5 text-sm text-black/60">{question.note}</p>
      ) : null}

      <div className="mt-4 rounded bg-blue/5 px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-wide text-black/50">
          Their answer
        </p>
        <p className="mt-1 font-bold leading-snug">
          {picked ? picked.option : "Not answered"}
        </p>
        {picked?.rating ? (
          <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-black/70">
            <RatingIcon rating={picked.rating} />
            {RATING_META[picked.rating].label}
          </p>
        ) : null}
      </div>

      <p id={chartId} className="mt-5 text-sm font-bold text-black/70">
        How contractors answer
      </p>
      <ul aria-labelledby={chartId} className="mt-3 space-y-3">
        {question.options.map((o, i) => {
          const isPicked = i === selected;
          return (
            <li key={o.option} className="group relative">
              <div
                className={`flex items-baseline justify-between gap-3 text-sm leading-5 ${
                  isPicked ? "font-bold text-black" : "text-black/70"
                }`}
              >
                <span>
                  {o.option}
                  {isPicked ? (
                    <span className="sr-only"> (their answer)</span>
                  ) : null}
                </span>
                <span className="shrink-0 tabular-nums">{o.share}%</span>
              </div>
              <div className="mt-1 h-3 w-full">
                <div
                  className="h-full rounded-r-[4px] transition-opacity group-hover:opacity-80"
                  style={{
                    width: `${Math.max((o.share / maxShare) * 100, 2)}%`,
                    backgroundColor: isPicked ? "var(--color-blue)" : OTHER_BAR,
                  }}
                />
              </div>
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-8 right-0 z-10 hidden whitespace-nowrap rounded bg-black px-2 py-1 text-xs font-semibold text-white group-hover:block"
              >
                {o.share}% of contractors
                {isPicked ? " — their answer" : ""}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

// Status is never color alone: every icon sits beside its text label.
function RatingIcon({ rating }: { rating: Exclude<Rating, null> }) {
  const { color, icon } = RATING_META[rating];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0"
    >
      <circle cx="8" cy="8" r="8" fill={color} />
      {icon === "check" ? (
        <path
          d="M4.5 8.2l2.3 2.3 4.7-4.9"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : icon === "dash" ? (
        <path d="M5 8h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <>
          <path d="M8 4.2v4.6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="8" cy="11.6" r="1.1" fill="#fff" />
        </>
      )}
    </svg>
  );
}
