import { FileUp, Ruler, Package, FileCode2, ClipboardList } from "lucide-react";
import GlassPanel from "../components/ui/GlassPanel.jsx";
import Button from "../components/ui/Button.jsx";
import "./CustomFabricationSection.css";

const INPUTS = [
  { icon: FileUp, label: "A drawing" },
  { icon: Ruler, label: "Dimensions" },
  { icon: Package, label: "A sample" },
  { icon: FileCode2, label: "A CAD file" },
  { icon: ClipboardList, label: "A specification" },
];

export default function CustomFabricationSection() {
  return (
    <section className="section custom-fab">
      <div className="container">
        <GlassPanel className="custom-fab__panel">
          <div className="custom-fab__copy">
            <span className="eyebrow">Custom Fabrication</span>
            <h2 className="custom-fab__title">Have a Drawing? We'll Build It.</h2>
            <p className="custom-fab__body">
              You don't need to fit our catalogue — send what you already have and we
              fabricate to it. Any of the following gets a quote moving:
            </p>

            <ul className="custom-fab__inputs">
              {INPUTS.map((input) => (
                <li key={input.label}>
                  <input.icon size={17} strokeWidth={2} />
                  <span>{input.label}</span>
                </li>
              ))}
            </ul>

            <Button href="/custom-fabrication" variant="solid" size="lg" icon={FileUp} iconPosition="left">
              Upload Drawing
            </Button>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
