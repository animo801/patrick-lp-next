import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { WhatYouGet } from "@/components/WhatYouGet";
import { PatrickBio } from "@/components/PatrickBio";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { UtmForwarder } from "@/components/UtmForwarder";
import { FunnelTracker } from "@/components/FunnelTracker";
import { FUNNEL_EVENTS } from "@/lib/funnel";

export default function Home() {
  return (
    <>
      <UtmForwarder />
      <FunnelTracker
        landedEvent={FUNNEL_EVENTS.landed}
        ctaClickEvent={FUNNEL_EVENTS.ctaClick}
      />
      <StickyCta />
      <Header />
      <Hero />
      <TrustStrip />
      <WhatYouGet />
      <PatrickBio />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  );
}
