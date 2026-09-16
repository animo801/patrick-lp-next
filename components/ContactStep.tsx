import type { InputHTMLAttributes } from "react";
import type { ContactInfo } from "@/lib/assessmentReport";

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
      <h1 className="text-[32px] leading-[1.1] md:text-[48px]">
        Great, just tell me where to send it.
      </h1>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          // [CONFIRM] Nothing is submitted anywhere yet beyond local
          // state — wire this up to the real lead-capture destination
          // (GHL, an API route, etc.) once it exists.
          const data = new FormData(e.currentTarget);
          onSubmit({
            name: String(data.get("name") ?? ""),
            business: String(data.get("business") ?? ""),
            email: String(data.get("email") ?? ""),
            phone: String(data.get("phone") ?? ""),
          });
        }}
      >
        <ContactField label="Full name" type="text" name="name" required />
        <ContactField
          label="Business name"
          type="text"
          name="business"
          required
        />
        <ContactField label="Email" type="email" name="email" required />
        {/* [CONFIRM] Phone is the one optional field, per request. */}
        <ContactField label="Phone (optional)" type="tel" name="phone" />

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
        className="h-18 w-full rounded border border-black/10 bg-black/5 px-4 text-lg text-black outline-none focus:ring-2 focus:ring-blue"
      />
    </label>
  );
}
