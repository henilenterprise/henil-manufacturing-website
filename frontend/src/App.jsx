import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { ToastProvider } from "./components/ui/index.js";
import Analytics from "./components/Analytics.jsx";
import LogoLoader from "./components/LogoLoader.jsx";
import { useJsonLd } from "./hooks/useJsonLd.js";
import { buildOrganizationStructuredData } from "./utils/structuredData.js";

// Route-based code splitting: every page except Home becomes its own
// chunk, fetched only when a visitor actually navigates there — a
// visitor who only ever looks at the homepage never downloads the code
// for /quote, /blog/:slug, /design-system, or any other route. Home
// stays a regular (non-lazy) import deliberately: it's this site's most
// common entry point, and lazy-loading it would mean even the very
// first page a visitor sees has to wait through a Suspense fallback
// (a network round-trip for its chunk, then a render) before anything
// appears — the opposite of what code-splitting is supposed to buy on
// the page that matters most for first impressions/LCP.
const About = lazy(() => import("./pages/About.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const Capabilities = lazy(() => import("./pages/Capabilities.jsx"));
const AcrylicFabricationAhmedabad = lazy(() => import("./pages/AcrylicFabricationAhmedabad.jsx"));
const PolycarbonateFabricationAhmedabad = lazy(() => import("./pages/PolycarbonateFabricationAhmedabad.jsx"));
const Industries = lazy(() => import("./pages/Industries.jsx"));
const CustomFabrication = lazy(() => import("./pages/CustomFabrication.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Faq = lazy(() => import("./pages/Faq.jsx"));
const Quote = lazy(() => import("./pages/Quote.jsx"));
const Brochure = lazy(() => import("./pages/Brochure.jsx"));
// Internal tooling, never linked from anywhere a real visitor would
// find it (see frontend/public/robots.txt, which explicitly excludes
// it) — the clearest possible case for not shipping it in anyone's
// initial bundle.
const DesignSystem = lazy(() => import("./pages/DesignSystem.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

// /get-a-quote was the route's original name before it moved to /quote —
// redirected (not deleted) so any existing bookmarks or links keep
// working, with query params (like a product prefill) carried through.
function LegacyQuoteRedirect() {
  const location = useLocation();
  return <Navigate to={`/quote${location.search}`} replace />;
}

export default function App() {
  // Mounted once for the whole app lifetime (not per page, unlike the
  // per-route title/description/canonical hooks) — Organization
  // describes the business entity itself, which doesn't change as
  // someone navigates around the site. LocalBusiness (address-specific)
  // is mounted separately, only on Home and Contact — see Home.jsx and
  // Contact.jsx — since that's "where appropriate" for a physical
  // location to matter, not every page. See utils/structuredData.js.
  useJsonLd(buildOrganizationStructuredData());

  return (
    <BrowserRouter>
      <ToastProvider>
        <Analytics />
        {/* Fallback only shows for a lazy route's very first chunk
            fetch on a given page load — subsequent navigations to a
            route already fetched once resolve instantly, no flash.
            Reuses LogoLoader rather than introducing a second loading
            treatment, so a mid-navigation wait looks the same as the
            app's other loading states rather than like a different,
            unpolished one. */}
        <Suspense fallback={<LogoLoader label="Loading page" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/acrylic-fabrication-ahmedabad"element={<AcrylicFabricationAhmedabad />}/>
            <Route path="/acrylic-fabrication-ahmedabad"element={<AcrylicFabricationAhmedabad />}/>
            <Route path="/industries" element={<Industries />} />
            <Route path="/custom-fabrication" element={<CustomFabrication />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/get-a-quote" element={<LegacyQuoteRedirect />} />
            <Route path="/design-system" element={<DesignSystem />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ToastProvider>
    </BrowserRouter>
  );
}
