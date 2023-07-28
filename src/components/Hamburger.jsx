import React from "react";

export default function Hamburger({ handleNav, status }) {
  return (
    <div className={status ? "toggle active" : "toggle "} onClick={handleNav}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
