import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [mouse, setMouse] = useState(false);
  const navigate = useNavigate();
  function handleMouse() {
    setMouse((prev) => !prev);
  }
  function handleMouseLeave() {
    setMouse((prev) => !prev);
  }
  function handleContact() {
    navigate("/contact");
  }
  return (
    <div className="contact">
      <h1 className={mouse ? "active" : ""}>HAVE A PROJECT IN MIND?</h1>
      <h2 className={mouse ? "active" : ""}>GET IN TOUCH WITH US TODAY</h2>
      <button
        onMouseOver={handleMouse}
        onMouseLeave={handleMouseLeave}
        className={mouse ? "active" : ""}
        onClick={handleContact}
      >
        Talk to us
      </button>
    </div>
  );
}
