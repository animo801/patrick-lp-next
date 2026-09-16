import Link from "next/link";

// Shown when an answer (currently: revenue under $1M) means we can't
// help this business — ends the assessment early instead of leading
// them through the rest of the quiz toward a call they can't book.
export function DisqualifiedStep() {
  return (
    <section className="px-6 py-16 text-center md:mx-auto md:max-w-[560px] md:py-24">
      <h1 className="text-[32px] leading-[1.1] md:text-[48px]">
        We’re not the right fit right now.
      </h1>
      <p className="mx-auto mt-4 max-w-[480px] text-lg leading-[1.4] text-black/60">
        We work with contracting businesses doing $1M or more in annual
        revenue. Below that, we won’t be able to get you the kind of
        results we promise — so we don’t want to waste your time or ours.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-14 items-center justify-center rounded-lg bg-blue px-10 font-sans text-xl font-extrabold text-white no-underline"
      >
        Back to home
      </Link>
    </section>
  );
}
