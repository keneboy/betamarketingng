import Nav from "components/Nav";
import Footer from "components/Footer";

export default function ContactLayout({ children, heading }) {
  return (
    <div className="contact_layout">
      <div className="top">
        <Nav />
        <h1>
          {heading}
        </h1>
      </div>
      {children}
      <Footer />
    </div>
  );
}
