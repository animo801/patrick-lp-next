import Image from "next/image";
import avatarDaniel from "@/app/assets/images/avatar-daniel.jpg";

// [CONFIRM] Figma pasted the SAME placeholder quote/name into all 3
// testimonial slots ("Daniel, President of Valley Deck & Patio").
// Swap in 2 more real reviews before launch.
const TESTIMONIALS = [
  {
    name: "Daniel",
    title: "President of Valley Deck & Patio",
    quote:
      "Patrick helped me see I was using the wrong number in my bidding process. He gave me the tools and a more realistic target...",
  },
  {
    name: "Daniel",
    title: "President of Valley Deck & Patio",
    quote:
      "Patrick helped me see I was using the wrong number in my bidding process. He gave me the tools and a more realistic target...",
  },
  {
    name: "Daniel",
    title: "President of Valley Deck & Patio",
    quote:
      "Patrick helped me see I was using the wrong number in my bidding process. He gave me the tools and a more realistic target...",
  },
];

export function Testimonials() {
  return (
    <section className="bg-blue px-6 py-16 md:py-24">
      <div className="md:mx-auto md:max-w-[1100px]">
        <h2 className="text-[28px] leading-[1.15] text-white md:text-center md:text-[36px]">
          What people say after working with Patrick
        </h2>
        <div className="mt-8 space-y-6 md:mt-12 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="rounded-lg border-2 border-navy bg-white p-6 md:flex md:flex-col"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={avatarDaniel}
                  alt={t.name}
                  className="h-16 w-16 flex-none rounded-full object-cover"
                />
                <div>
                  <p className="font-sans text-xl font-bold text-black">
                    {t.name}
                  </p>
                  <p className="font-sans text-base leading-tight text-black/50">
                    {t.title}
                  </p>
                </div>
              </div>
              <p className="mt-5 font-sans text-lg leading-normal text-black md:flex-1">
                {t.quote}
              </p>
              <p className="mt-4 font-sans text-lg font-bold text-black">
                Read more
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
