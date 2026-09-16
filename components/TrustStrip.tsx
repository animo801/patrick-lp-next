import Image, { type StaticImageData } from "next/image";
import avatarDaniel from "@/app/assets/images/avatar-daniel.jpg";
import avatarKyle from "@/app/assets/images/avatar-kyle.jpg";
import avatarRuss from "@/app/assets/images/avatar-russ.jpg";
import avatarRick from "@/app/assets/images/avatar-rick.jpg";

const AVATARS: { name: string; company: string; src: StaticImageData }[] = [
  { name: "Daniel", company: "Valley Deck", src: avatarDaniel },
  { name: "Kyle", company: "OnGrade", src: avatarKyle },
  { name: "Russ", company: "RB Morgan", src: avatarRuss },
  { name: "Rick", company: "Zeskind Hardware", src: avatarRick },
];

function AvatarList({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className={`flex w-max flex-none items-start gap-x-8 pr-8 md:gap-x-16 md:pr-0 ${
        ariaHidden ? "md:hidden" : ""
      }`}
      aria-hidden={ariaHidden || undefined}
    >
      {AVATARS.map((a) => (
        <div key={a.name} className="w-16 flex-none text-center">
          <Image
            src={a.src}
            alt={ariaHidden ? "" : a.name}
            className="mx-auto h-16 w-16 rounded-full object-cover"
          />
          <span className="mt-2 block font-sans text-sm font-bold text-black">
            {a.name}
          </span>
          <span className="block font-sans text-xs text-black/50">
            {a.company}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TrustStrip() {
  return (
    <section id="trust-strip" className="px-6 pb-16 text-center md:pb-20">
      <p className="mb-5 font-sans text-base font-bold text-black/60">
        Trusted by contractors all over the US
      </p>
      <div className="relative mx-auto max-w-[500px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:max-w-none md:[mask-image:none] md:[-webkit-mask-image:none]">
        <div className="marquee-track flex w-max items-start md:w-full md:justify-center">
          {/* Set 1 of 2 (duplicated below for a seamless loop on mobile
              — see globals.css for how the marquee animation uses
              this). The duplicate is hidden on md+, where everything
              fits without scrolling.

              No gap between the two groups here: the seam spacing has
              to live inside each group's own width (its trailing pr-8
              above), not on this parent flex. Otherwise the -50%
              keyframe undercounts the real halfway point and the loop
              visibly jumps once per cycle. See
              https://blog.logto.io/css-only-infinite-scroll */}
          <AvatarList />
          <AvatarList ariaHidden />
        </div>
      </div>
    </section>
  );
}
