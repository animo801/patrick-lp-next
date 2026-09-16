import { CtaLink } from "./CtaLink";

export function FinalCta() {
  return (
    <section className="bg-blue px-6 py-16 text-center md:py-20">
      <h2 className="text-[28px] leading-[1.2] text-white md:text-[36px]">
        Ready to find out where your money is going?
      </h2>
      <CtaLink className="mt-6 inline-flex h-14 items-center justify-center rounded-lg bg-white px-10 font-sans text-xl font-extrabold text-blue no-underline">
        Start the assessment
      </CtaLink>
    </section>
  );
}
