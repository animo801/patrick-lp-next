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

export default function Home() {
  return (
    <>
      <UtmForwarder />
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
