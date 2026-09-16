"use client";

import { useState } from "react";
import Image from "next/image";
import avatarDaniel from "@/app/assets/images/avatar-daniel.jpg";
import avatarKyle from "@/app/assets/images/avatar-kyle.jpg";
import avatarTim from "@/app/assets/images/avatar-tim.jpg";

const TESTIMONIALS = [
  {
    name: "Daniel",
    title: "President of Valley Deck & Patio",
    avatar: avatarDaniel,
    quote:
      "I was stuck in my own head as a business owner and needed an expert's outside perspective. Patrick's 'teach a person to fish' philosophy clicked immediately. The result? I discovered where we were bleeding money and restructured our budget so the company actually rewards me as the owner. Would I recommend Patrick? 10 out of 10. You'll make back your investment in the first year.",
  },
  {
    name: "Kyle",
    title: "President of OnGrade Contracting",
    avatar: avatarKyle,
    quote:
      "I knew what a P&L and balance sheet were, but I had no idea how to use them. Patrick made it simple, practical, and relevant. Now I understand the numbers, I'm more confident, and I feel like a better business owner.",
  },
  {
    name: "Tim",
    title: "CEO of Fehoko Concrete",
    avatar: avatarTim,
    quote:
      "Before working with Patrick, I was doing all this work and knew the company was making money, but I couldn't understand why I wasn't seeing more of it personally. I didn't know why I wasn't able to compensate myself the way I should. In just 30 days, Patrick helped me see exactly where the opportunities are. We identified that improving my gross profit margin by just 3% could add approximately $150,000 in profit, and reducing my AR collection time by just 10 days could put another $135,000 in cash back into the business. Now I have a clear roadmap. I know the revenue I need to hit, the gross margins I need to achieve, and the seven numbers I need to watch every month. Most importantly, I finally know what to focus on to move the business forward.",
  },
];

function TestimonialCard({
  name,
  title,
  avatar,
  quote,
}: (typeof TESTIMONIALS)[number]) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border-2 border-navy bg-white p-6 md:flex md:flex-col">
      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt={name}
          className="h-16 w-16 flex-none rounded-full object-cover"
        />
        <div>
          <p className="font-sans text-xl font-bold text-black">{name}</p>
          <p className="font-sans text-base leading-tight text-black/50">
            {title}
          </p>
        </div>
      </div>
      <p
        className={`mt-5 font-sans text-lg leading-normal text-black md:flex-1 ${
          expanded ? "" : "line-clamp-5"
        }`}
      >
        {quote}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-4 self-start font-sans text-lg font-bold text-black"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-blue px-6 py-16 md:py-24">
      <div className="md:mx-auto md:max-w-[1100px]">
        <h2 className="text-[28px] leading-[1.15] text-white md:text-center md:text-[36px]">
          What people say after working with Patrick
        </h2>
        <div className="mt-8 space-y-6 md:mt-12 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
