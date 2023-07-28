import { useEffect, useRef } from "react";
import img1 from "asset/proto_1.jpg";
import img2 from "asset/proto_2.jpg";
import img3 from "asset/proto_3.jpg";

export default function Offering() {
  const wrapperRef = useRef();
  useEffect(() => {
    const children = Array.from(wrapperRef.current.children);
    children.forEach((child) => {
      child.addEventListener("click", () => {
        // remove from the entire children array
        children.forEach((item) => {
          item.classList.remove("active");
        });
        child.classList.add("active");
      });
    });
  }, []);
  return (
    <div className="offering">
      <div className="heading_offers">
        <h1>
          Our Real Estate <span> Offerings</span>
        </h1>
        <ul>
          <li> Property acquisition</li>
          <li>Land banking</li>
          <li> Property investment </li>
          <li> Property sales</li>
          <li> Property marketing</li>
        </ul>
      </div>
      <div className="gallery">
        <ul ref={wrapperRef}>
          <li className="active">
            <img src={img1} alt="" />
            <div className="description">
              <span className="number">01</span>
              <span className="arrow"></span>
              <p>Single family</p>
            </div>
          </li>
          <li>
            <img src={img2} alt="" />
            <div className="description">
              <span className="number">02</span>
              <span className="arrow"></span>
              <p>Single family</p>
            </div>
          </li>
          <li>
            <img src={img3} alt="" />
            <div className="description">
              <span className="number">03</span>
              <span className="arrow"></span>
              <p>Single family</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
