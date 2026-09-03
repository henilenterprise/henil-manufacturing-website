import { useState } from "react";
import { ChevronDown } from "lucide-react";
import GlassCard from "./ui/GlassCard.jsx";
import "./FaqAccordion.css";

/**
 * Single-open accordion (opening one closes any other) — kept simple
 * and predictable rather than allowing every item open at once, which
 * on a 15-item FAQ would turn into a long uninterrupted wall of text.
 */
export default function FaqAccordion({ items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="faq-accordion">
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <GlassCard key={item.id} className="faq-accordion__item" padding="none">
            <button
              type="button"
              className="faq-accordion__question"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span>{item.question}</span>
              <ChevronDown size={18} className={`faq-accordion__chevron ${isOpen ? "faq-accordion__chevron--open" : ""}`} />
            </button>
            <div
              id={`faq-answer-${item.id}`}
              className={`faq-accordion__answer-wrap ${isOpen ? "faq-accordion__answer-wrap--open" : ""}`}
            >
              <p className="faq-accordion__answer">{item.answer}</p>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
