const BENEFITS = [
  "A clear picture of exactly where your money is leaking — labor, materials, or overhead.",
  "A simple, personalized plan to fix it — no jargon, no guesswork.",
  "Straight talk from someone who spent 30 years reading contractors' books for a living.",
  "It takes a few minutes, and it's completely free — no obligation.",
];

// [CONFIRM] Figma only had the heading for this section — the 4
// bullets above are draft copy to fill it, not final content.
export function WhatYouGet() {
  return (
    <section className="bg-blue px-6 py-16 md:py-24">
      <div className="md:mx-auto md:max-w-[860px]">
        <h2 className="text-[28px] leading-[1.3] text-white md:text-center md:text-[36px]">
          Here is what you get from an assessment:
        </h2>
        <ul className="mt-8 space-y-6 md:mt-12 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-8 md:space-y-0">
          {BENEFITS.map((text) => (
            <li key={text} className="flex gap-4">
              <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white font-sans text-sm font-extrabold text-blue">
                ✓
              </span>
              <p className="font-sans text-lg leading-snug text-white">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
