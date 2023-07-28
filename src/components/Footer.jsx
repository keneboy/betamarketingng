import NavigationIcon from "@mui/icons-material/Navigation";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer">
      <ul>
        <li>
          <div className="logo">
            <div className="logo_name">
              <img src="/image/logo.png" alt="" />
              <p>
                {" "}
                <span>Beta </span> marketing
              </p>
            </div>

            <p>
              Beta marketing nigeria limited is a network marketing firm that
              has set out to raise global leaders and millionaires that will
              change the world and also reduce the unemployment rate facing the
              world
            </p>
          </div>
        </li>
        <li>
          <h1>FIND US</h1>
          <div className="location">
            <NavigationIcon />
            <span>
              4 Elder Akoredere close off Street U Abraham Adesanya Estate Ajah
              Lagos State
            </span>
          </div>
          <div className="telephone">
            <LocalPhoneIcon />
            <span>08165994853</span>
          </div>
          <div className="email">
            <EmailIcon />
            <span>info@betamarketingng.com</span>
          </div>
        </li>
        <li>
          <h1>Resources</h1>
          <ol>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>Gallery</li>
            <li>
              <Link to="/properties">Properties</Link>
            </li>
            <li>
              <Link to="/properties">Contact</Link>
            </li>
            <li>
              <Link to="/properties">Services</Link>
            </li>
          </ol>
        </li>
        <li>
          <div className="social">
            <FacebookIcon className="icon" />
            <TwitterIcon className="icon two" />
            <a
              href="https://instagram.com/betamarketingng?r=nametag"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="icon" />
            </a>
          </div>
          <p>Copyright Beta Marketing 2022</p>
          <p>All Rights Reserved</p>
          <p>All Regular Disclaimers Apply</p>
          <span>Privacy Policy</span>
        </li>
      </ul>
    </div>
  );
}
