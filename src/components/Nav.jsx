import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "components/Hamburger";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "Context/AuthProvider";
import { useContext } from "react";

export default function Nav({ color, position }) {
  const { setNactive } = useContext(AuthContext);
  function handleNav() {
    setNactive((prev) => !prev);
  }
  const [toggle, setToggle] = useState(false);

  return (
    <div className="main_header_wrap">
      <div className="logo">
        <Link to="/">
          <img src="/image/logo.png" alt="" />
        </Link>

        <p>
          {" "}
          <span> Beta</span> Marketing
        </p>
      </div>
      <nav className={toggle ? "active" : ""}>
        <ul className={color ? "uniq" : ""} style={{ "--str": color }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/properties">Properties</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/portal">Realtors</Link>
          </li>

          {/* <li>Site Inspection</li>
          <li>FeedBacks</li> */}
        </ul>
      </nav>
      <Hamburger handleNav={handleNav} />
    </div>
  );
}
