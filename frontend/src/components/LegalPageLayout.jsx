import MainLayout from "../layouts/MainLayout.jsx";
import "./LegalPageLayout.css";

/**
 * Shared shell for Privacy Policy, Terms, and Cookie Policy — same
 * container width and prose typography across all three so they don't
 * each reinvent heading/paragraph/list styling. `lastUpdated` is passed
 * in per-page rather than defaulting to "today" here, since a page
 * that hasn't actually changed shouldn't silently claim a fresh date.
 */
export default function LegalPageLayout({ title, lastUpdated, children }) {
  return (
    <MainLayout>
      <div className="container legal-page">
        <span className="eyebrow">Legal</span>
        <h1 className="legal-page__title">{title}</h1>
        {lastUpdated && <p className="legal-page__updated">Last updated: {lastUpdated}</p>}
        <div className="legal-page__body">{children}</div>
      </div>
    </MainLayout>
  );
}
