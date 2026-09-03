import { useEffect, useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import GlassCard from "./ui/GlassCard.jsx";
import { getNextIndex, getPrevIndex } from "../utils/gallery.js";
import "./TestimonialCarousel.css";

const AUTO_ADVANCE_MS = 7000;

/**
 * Subtle, not flashy: one card visible at a time, a slow crossfade, and
 * auto-advance that both pauses on hover/focus and stops permanently
 * the moment a visitor manually navigates — matching the same
 * "auto-play until the visitor takes control" pattern already used by
 * FabricationProcessInteractive.jsx, for consistency across the site.
 * Reuses getNextIndex/getPrevIndex from utils/gallery.js rather than
 * re-implementing the same wraparound math a second time.
 */
export default function TestimonialCarousel({ testimonials }) {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoPlay || paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => getNextIndex(i, testimonials.length));
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, paused, testimonials.length]);

  const goTo = (newIndex) => {
    setAutoPlay(false);
    setIndex(newIndex);
  };

  const current = testimonials[index];

  return (
    <div
      className="testimonial-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="testimonial-carousel__stage">
        <button
          type="button"
          className="testimonial-carousel__nav testimonial-carousel__nav--prev"
          onClick={() => goTo(getPrevIndex(index, testimonials.length))}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>

        <GlassCard className="testimonial-carousel__card" key={current.id}>
          <Quote size={26} strokeWidth={1.5} className="testimonial-carousel__quote-icon" aria-hidden="true" />
          <p className="testimonial-carousel__quote">{current.quote}</p>
          <div className="testimonial-carousel__attribution">
            <span className="testimonial-carousel__role">{current.role}</span>
            <span className="testimonial-carousel__company">{current.companyType}</span>
          </div>
        </GlassCard>

        <button
          type="button"
          className="testimonial-carousel__nav testimonial-carousel__nav--next"
          onClick={() => goTo(getNextIndex(index, testimonials.length))}
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="testimonial-carousel__dots" role="tablist" aria-label="Choose a testimonial">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={i === index}
            aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
            className={`testimonial-carousel__dot ${i === index ? "testimonial-carousel__dot--active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
