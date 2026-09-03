import MainNav from "../components/MainNav.jsx";
import Footer from "../components/Footer.jsx";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton.jsx";
import "./MainLayout.css";

export default function MainLayout({ children }) {
  return (
    <>
      <MainNav />
      <main className="site-main">{children}</main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
