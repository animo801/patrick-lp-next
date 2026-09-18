import type { InputHTMLAttributes } from "react";
import type { ContactInfo } from "@/lib/assessmentReport";
import { trackCustomEvent } from "@/lib/meta-pixel-client";

/**
 * Final step of the assessment: collect contact info before showing
 * results. No Figma design for this screen yet — field styling follows
 * the same pattern as the flow's text questions (see AssessmentFlow).
 */
export function ContactStep({
  onSubmit,
}: {
  onSubmit: (contact: ContactInfo) => void;
}) {
  return (
    <section className="px-6 pb-10 pt-6 md:mx-auto md:max-w-xl">
      <h1 className="text-[22px] leading-[1.15] md:text-[32px]">
        Great, just tell me where to send your video review.
      </h1>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          // [CONFIRM] Nothing is submitted anywhere yet beyond local
          // state — wire this up to the real lead-capture destination
          // (GHL, an API route, etc.) once it exists.
          const data = new FormData(e.currentTarget);
          const email = String(data.get("email") ?? "");
          const phone = String(data.get("phone") ?? "");
          trackCustomEvent("Submit from Vercel App", { email, phone });
          onSubmit({
            name: String(data.get("name") ?? ""),
            email,
            phone,
          });
        }}
      >
        <ContactField label="Full name" type="text" name="name" required />
        <ContactField label="Email" type="email" name="email" required />
        <ContactField label="Phone" type="tel" name="phone" required />

        <button
          type="submit"
          className="mt-4 flex h-14 w-full items-center justify-center rounded-lg bg-blue px-6 font-sans text-xl font-extrabold text-white md:w-auto md:px-10"
        >
          Get my results
        </button>
      </form>
    </section>
  );
}

function ContactField({
  label,
  ...inputProps
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-bold text-black/70">
        {label}
      </span>
      <input
        {...inputProps}
        className="h-12 w-full rounded border border-black/10 bg-black/5 px-3 text-base text-black outline-none focus:ring-2 focus:ring-blue"
      />
    </label>
  );
}
