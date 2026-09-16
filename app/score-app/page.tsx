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
import { SCORE_APP_ASSESSMENT_URL } from "@/lib/constants";

// [CONFIRM] Clone of the "/" homepage. Two intended differences from
// "/": every CTA points to SCORE_APP_ASSESSMENT_URL (an external GHL
// funnel) instead of the in-app quiz, and the logo — Header/Footer
// still fall back to the default logo.png here since there's no
// separate score-app logo asset yet. Pass `logo`/`logoAlt` to
// <Header> and <Footer> once one exists (see their prop types).
export default function ScoreApp() {
  return (
    <>
      <UtmForwarder />
      <StickyCta ctaHref={SCORE_APP_ASSESSMENT_URL} />
      <Header />
      <Hero ctaHref={SCORE_APP_ASSESSMENT_URL} />
      <TrustStrip />
      <WhatYouGet />
      <PatrickBio />
      <Testimonials />
      <Faq />
      <FinalCta ctaHref={SCORE_APP_ASSESSMENT_URL} />
      <Footer />
    </>
  );
}
