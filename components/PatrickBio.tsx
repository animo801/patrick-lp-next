import Image from "next/image";
import patrickPhoto from "@/app/assets/images/patrick-photo.jpg";

export function PatrickBio() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="md:mx-auto md:flex md:max-w-[1000px] md:items-center md:gap-16">
        <Image
          src={patrickPhoto}
          alt="Patrick Shurney"
          className="h-[289px] w-full rounded-lg object-cover md:h-[380px] md:w-[480px] md:flex-none"
        />
        <div className="mt-8 md:mt-0">
          <h2 className="text-[32px] leading-[1.2]">
            Reviewed by Patrick Shurney
          </h2>
          {/* [CONFIRM] Figma's copy cut off mid-sentence ("...commercial
              banking, Patrick"). Finished into a full paragraph below —
              confirm the facts (years, background) are accurate. */}
          <p className="mt-4 font-sans text-xl leading-[1.4] text-black">
            After 30 years in commercial banking, Patrick has reviewed the
            books of hundreds of contracting businesses — and learned to
            spot exactly where the money gets lost. Now he shares that same
            eye with contractors directly, for free.
          </p>
        </div>
      </div>
    </section>
  );
}
