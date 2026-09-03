import { Home as HomeIcon } from "lucide-react";
import MainLayout from "../layouts/MainLayout.jsx";
import Button from "../components/ui/Button.jsx";
import { useSeo } from "../hooks/useSeo.js";
import "./NotFound.css";

export default function NotFound() {
  useSeo({ title: "Page Not Found | Henil Enterprise", noindex: true });

  return (
    <MainLayout>
      <div className="not-found container">
        <span className="eyebrow" style={{ justifyContent: "center" }}>404</span>
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__body">
          That page doesn't exist. It may have moved, or the link may be out of date.
        </p>
        <Button href="/" variant="solid" icon={HomeIcon} iconPosition="left">
          Back to Home
        </Button>
      </div>
    </MainLayout>
  );
}
