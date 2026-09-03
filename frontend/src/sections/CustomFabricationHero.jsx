import { useState } from "react";
import { UploadCloud, FileText, FileCode2, Package, Ruler, ClipboardList, Settings } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import GlassModal from "../components/ui/GlassModal.jsx";
import DrawingUpload from "../components/DrawingUpload.jsx";
import { useToast } from "../components/ui/index.js";
import "./CustomFabricationHero.css";

const INPUTS = [
  { icon: FileText, label: "Engineering drawings" },
  { icon: FileCode2, label: "CAD files" },
  { icon: Package, label: "Samples" },
  { icon: Ruler, label: "Dimensions" },
  { icon: ClipboardList, label: "Specifications" },
  { icon: Settings, label: "Custom requirements" },
];

export default function CustomFabricationHero() {
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  const handleUploaded = (files) => {
    showToast(`${files.length} file(s) received — we'll follow up shortly.`, { tone: "success" });
    setTimeout(() => setModalOpen(false), 1200);
  };

  return (
    <section className="cf-hero">
      <div className="container cf-hero__inner">
        <span className="eyebrow">Custom Fabrication</span>
        <h1 className="cf-hero__title">Your Drawing. Our Fabrication.</h1>
        <p className="cf-hero__sub">
          Henil Enterprise manufactures according to what you already have — we don't require
          you to fit a fixed catalogue.
        </p>

        <div className="cf-hero__inputs">
          {INPUTS.map((input) => (
            <div className="cf-hero__input" key={input.label}>
              <input.icon size={18} strokeWidth={1.75} />
              <span>{input.label}</span>
            </div>
          ))}
        </div>

        <Button
          variant="solid"
          size="lg"
          icon={UploadCloud}
          iconPosition="left"
          onClick={() => setModalOpen(true)}
          className="cf-hero__cta"
        >
          Upload Your Drawing
        </Button>
      </div>

      <GlassModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Upload Your Drawing"
      >
        <p className="cf-hero__modal-intro">
          Upload your drawing, CAD file, sample photo, or specification below — we'll review
          it and follow up.
        </p>
        <DrawingUpload onUploaded={handleUploaded} />
      </GlassModal>
    </section>
  );
}
