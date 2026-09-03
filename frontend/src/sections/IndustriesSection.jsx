import { INDUSTRIES_DETAIL } from "../data/industries.data.js";
import "./IndustriesSection.css";

export default function IndustriesSection() {
  return (
    <section className="section industries">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Who We Serve</span>
          <h2 className="section__title">Industries</h2>
        </div>
        <div className="industries__chips">
          {INDUSTRIES_DETAIL.map((ind) => (
            <a href="/industries" className="industry-chip" key={ind.id}>
              {ind.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
