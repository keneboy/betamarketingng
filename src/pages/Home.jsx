import Header from "components/Header";
import AboutUs from "components/AboutUs";
import Contact from "components/Contact";
import Footer from "components/Footer";
import Offering from "components/Offering";
import FeaturedProperties from "components/FeaturedProperties";
import Introduction from "components/Introduction";

export default function Home() {
  return (
    <div>
      <Header />
      <AboutUs />
      <Introduction />
      <Offering />
      <FeaturedProperties />
      <Contact />
      <section className="our_partner">
        <div className="container_x">
          <h6 className="title">Our Partners</h6>
          <div className="slider">
            <ul className="slide-track">
              <li className="slide">
                <img
                  src="image/partner_1.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
              <li className="slide">
                <img
                  src="image/partner_2.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
              <li className="slide">
                <img
                  src="image/partner_3.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
              <li className="slide">
                <img
                  src="image/partner_4.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
              <li className="slide">
                <img
                  src="image/partner_1.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
              <li className="slide">
                <img
                  src="image/partner_2.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
              <li className="slide">
                <img
                  src="image/partner_3.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
              <li className="slide">
                <img
                  src="image/partner_4.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
              <li className="slide">
                <img
                  src="image/partner_1.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
              <li className="slide">
                <img
                  src="image/partner_2.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
              <li className="slide">
                <img
                  src="image/partner_3.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
              <li className="slide">
                <img
                  src="image/partner_4.jfif"
                  alt="partner"
                  width="100"
                  height="100"
                />
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
