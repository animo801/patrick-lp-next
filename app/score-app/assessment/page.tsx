import Script from "next/script";
import { Header } from "@/components/Header";

// Where every /score-app CTA lands: the ScoreApp quiz, embedded inline.
// ScoreApp's embedding.js finds the data-sa-url div below and swaps in
// an auto-resizing iframe. sa_target=_top makes ScoreApp's own
// redirects (e.g. to the results page) take over the whole tab rather
// than loading inside the iframe.
export default function ScoreAppAssessmentPage() {
  return (
    <>
      <Header />
      <main className="px-6 pb-10 md:mx-auto md:max-w-3xl">
        <div
          data-sa-url="https://4392471b-4e02-403d-b87b-968121796c8b.scoreapp.com/questions?sa_target=_top"
          data-sa-view="inline"
          data-sa-auto-height="1"
          style={{ maxWidth: "100%", width: "100%" }}
        />
      </main>
      <Script src="https://static.scoreapp.com/js/integration/v1/embedding.js?v=w7KGdc" />
    </>
  );
}
