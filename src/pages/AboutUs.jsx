import ContactLayout from "Layout/ContactLayout";
import React from "react";

export default function AboutUs() {
  return (
    <ContactLayout heading="About Us">
      <div className="about">
        <main>
          <h1>Our Vision</h1>
          <div className="about_content">
            <div className="left">
              <p>
                We are Nigeria’s largest commercial and residential real estate
                sales organization. Our team of dedicated professionals gives
                the best advice and services to ensure the success of your
                property.
              </p>
              <p>
                As a leading Real Estate sales agency in Nigeria , we offer
                unique services to help you find your home. We will ensure that
                you are well informed of all recent developments in the market,
                current opportunities and details of the unique properties
                available at advantageous prices. Our team will provide
                appropriate advice on the products being targeted in your local
                market
              </p>
            </div>
            <div className="right">
              <p>
                We specialize in commercial and residential property sales. We
                offer a wide variety of services including house price guide,
                market reports and statistics, property search, Property Finder,
                Properties Wanted, Property Leads and Property Dealers listings
                on property websites like the Nigeria Property Portal.
              </p>
              <p>
                Our vision is to be the most trusted name in our industry by
                providing exceptional service and outstanding value. We're
                excited about collaborating with our clients as we work together
                to make their real estate dreams come true
              </p>
            </div>
          </div>
        </main>
        <div className="our_teams">
          <h1>Meet Our Team</h1>
          {/* <p>Lorem ipsum dolor sit amet.</p> */}
          <div className="gallery">
            <ul>
              <li>
                <div className="image">
                  <img src="/image/boss.jfif" alt="" />
                  <div className="info">
                    <div className="name">John Casmir Ekenedilichukwu</div>
                    <div className="position">CEO</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="image">
                  <img src="/image/real_1.jpeg" alt="" />
                  <div className="info">
                    <div className="name">Anih Benjamin Tochukwu</div>
                    <div className="position">Manager</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="image">
                  <img src="/image/real_3.jpeg" alt="" />
                  <div className="info">
                    <div className="name">Olanshile Omoyeni Davids</div>
                    <div className="position">Head Of Operation</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="image">
                  <img src="/image/boss_2.jfif" alt="" />
                  <div className="info">
                    <div className="name">Anih Benjamin Tochukwu</div>
                    <div className="position">Chief operating officer</div>
                  </div>
                </div>
              </li>
              {/* <li>
                <div className="image">
                  <img src="/image/Artboard-4team.jpg" alt="" />
                  <div className="info">
                    <div className="name">Kathleen Grant</div>
                    <div className="position">CEO</div>
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </ContactLayout>
  );
}
