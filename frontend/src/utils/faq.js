// Pure function building schema.org FAQPage JSON-LD directly from the
// same FAQ_ITEMS array the visible accordion renders — not a
// hand-maintained duplicate. Google's structured data guidelines
// require the markup to match visible content exactly; generating both
// from one source makes that a structural guarantee, not something to
// remember to keep in sync.
export function buildFaqStructuredData(faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
