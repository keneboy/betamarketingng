import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "Context/AuthProvider";
import { useContext } from "react";
export default function SideNav() {
  const { setNactive } = useContext(AuthContext);
  function handleNav() {
    setNactive((prev) => !prev);
  }
  return (
    <div className="sidenav">
      <nav className="">
        <ul>
          <li onClick={handleNav}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleNav}>
            <Link to="/about">About</Link>
          </li>
          <li onClick={handleNav}>
            <Link to="/properties">Properties</Link>
          </li>
          <li onClick={handleNav}>
            <Link to="/contact">Contact</Link>
          </li>
          <li onClick={handleNav}>
            <Link to="/services">Services</Link>
          </li>
          <li onClick={handleNav}>
            <Link to="/portal">Realtors</Link>
          </li>
        </ul>
        <div className="close" onClick={handleNav}>
          <CloseIcon className="close_icon" />
        </div>
      </nav>
    </div>
  );
}
