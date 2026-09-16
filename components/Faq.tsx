// [CONFIRM] Figma only had the section heading — the 5 Q&As below are
// draft copy to fill the section, not final content.
const FAQS = [
  {
    q: "Is the assessment really free?",
    a: "Yes. There's no cost and no obligation to buy anything afterward — you answer a few questions about your business and get a breakdown of where money is likely leaking.",
  },
  {
    q: "How long does it take?",
    a: "Most contractors finish the assessment in under 5 minutes.",
  },
  {
    q: "What happens after I submit it?",
    a: "You'll get a personalized breakdown of where your business is likely losing money, plus next steps if you want help fixing it.",
  },
  {
    q: "Is this only for large contracting companies?",
    a: "No — this works for contractors of any size, whether you're running a two-person crew or a growing company with a full office staff.",
  },
  {
    q: "Is my information kept private?",
    a: "Yes. Your answers are used only to prepare your assessment and are never sold or shared.",
  },
];

export function Faq() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="md:mx-auto md:max-w-[720px]">
        <h2 className="text-[32px] leading-[1.2]">Frequently Asked Questions</h2>
        <div className="mt-6 divide-y divide-black/10 border-t border-black/10">
          {FAQS.map((item, i) => (
            <details key={item.q} className="faq-item group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-lg font-bold text-black">
                {item.q}
                <span
                  className="faq-chevron flex-none text-blue transition-transform duration-200"
                  aria-hidden="true"
                >
                  ▾
                </span>
              </summary>
              <p className="mt-3 font-sans text-base leading-relaxed text-black/70">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
