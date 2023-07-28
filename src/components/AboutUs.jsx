import React from "react";
import img1 from "asset/proto_1.jpg";
import img2 from "asset/proto_2.jpg";
import img3 from "asset/proto_3.jpg";

export default function AboutUs() {
  return (
    <div className="about_us">
      <h2>
        About <span>us</span>
      </h2>
      <h1>
        familiarize Yourself With Our Rich Real Estate Projects
        {/* <span className="one">Familiarize Yourself With Our Rich Real Estate Projects</span>
        <span className="two">Our Rich Real Estate Projects</span> */}
      </h1>
      <div className="main_desc">
        <ul>
          <li>
            <div className="title">Investment Opportunities</div>
            <p>
              According to National Bureau of Statistics (NBS), the real estate
              sector in Nigeria returned to growth of 2.81% y/y. we guarantee
              investors returns
            </p>
          </li>
          <li>
            <div className="title">Project Management</div>
            <p>
              with our experienced and competent operations team, we can manage
              your sundry properties whilst taking the stress of you
            </p>
          </li>
        </ul>
      </div>
      <div className="gallery">
        <div className="top">
          <div className="one">
            <img src={img1} alt="" />
          </div>
          <div className="two">
            <img src={img2} alt="" />
          </div>
          <div className="three">
            <img src={img3} alt="" />
          </div>
        </div>
      </div>
      <div className="gallery gallery_two">
        <div className="top">
          <div className="one">
            <img src={img3} alt="" />
          </div>
          <div className="two">
            <img src={img1} alt="" />
          </div>
          <div className="three">
            <img src={img2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
