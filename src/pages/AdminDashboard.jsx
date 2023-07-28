import React, { useState, useContext } from "react";
import AppleIcon from "@mui/icons-material/Apple";
import Logo from "../asset/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ChatIcon from "@mui/icons-material/Chat";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import AuthContext from "Context/AuthProvider";
import { useNavigate, Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const { setSearch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const navigation = [
    {
      icon: AppleIcon,
      title: "Beta Marketing",
      id: 1,
      homeIcon: MenuIcon,
      img: Logo,
    },
    {
      icon: HomeIcon,
      title: "Dashboard",
      id: 2,
      path: "",
    },
    {
      icon: PersonOutlineIcon,
      title: "Properties",
      id: 3,
      path: "properties",
    },
    {
      icon: ChatIcon,
      title: "Messages",
      id: 4,
      path: "messages",
    },
    {
      icon: QuestionMarkIcon,
      title: "Consultants",
      id: 5,
      path: "consultants",
    },
    {
      icon: SettingsIcon,
      title: "Widthdrawal List",
      id: 6,
      path: "widthdrawal_list",
    },
    {
      icon: LockIcon,
      title: "Password",
      id: 7,
      path: "password",
    },
    {
      icon: LogoutIcon,
      title: "Sign Out",
      id: 8,
    },
  ];
  const [mouse, setMouse] = useState(2);
  const [current, setCurrent] = useState(false);
  function handleMouse(id) {
    setMouse(id);
  }
  // handle current state
  function handleCurrent() {
    setCurrent(!current);
  }
  // handle logout by the admin...
  function handleLogout() {
    dispatch({ type: "ADMIN_LOGOUT" });
    localStorage.removeItem("adminInfo");
    navigate("/adminlogin");
  }

  return (
    <div className="container">
      <div
        className={current ? "navigation current" : "navigation"}
        style={current ? { "--str": "7rem" } : {}}
      >
        <ul>
          {navigation.map((item, index) => {
            return item.title === "Sign Out" ? (
              <li
                key={item.id}
                className={item.id === mouse ? "hovered" : ""}
                onMouseOver={() => handleMouse(item.id)}
                onClick={item.title === "Sign Out" && handleLogout}
              >
                <Link to="">
                  {item.icon && (
                    <span className="icon">
                      <item.icon />
                    </span>
                  )}
                  <span className="title">{item.title}</span>
                </Link>
              </li>
            ) : item.homeIcon ? (
              <li
                key={item.id}
                className={item.id === mouse ? "hovered" : ""}
                onMouseOver={() => handleMouse(item.id)}
              >
                {item.icon && (
                  <span className="icon">
                    <img src={item?.img} alt="" />
                  </span>
                )}
                <span className="title">{item.title}</span>
                {item.homeIcon && (
                  <span className="home_icon" onClick={handleCurrent}>
                    <item.homeIcon />
                  </span>
                )}
              </li>
            ) : (
              <li
                key={item.id}
                className={item.id === mouse ? "hovered" : ""}
                onMouseOver={() => handleMouse(item.id)}
              >
                <Link to={`${item?.path}`}>
                  {item.icon && (
                    <span className="icon">
                      <item.icon />
                    </span>
                  )}
                  <span className="title">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={current ? "main current" : "main"}
        style={current ? { "--str": "7rem" } : {}}
      >
        <div className="topbar">
          <span className="toggle" onClick={handleCurrent}>
            <MenuIcon />
          </span>
          <div className="search">
            <label>
              <span className="search_icon">
                <SearchIcon />
              </span>
              <input
                type="search"
                placeholder="Search Here"
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          <div className="user" style={{ visibility: "hidden" }}>
            <img src="/image/Artboard-1team.jpg" alt="hero" />
          </div>
        </div>
        {/* <div className="cardBox">
          <div className="card">
            <div className="card_number">
              <div className="number">1,504</div>
              <div className="cardName">Daily views</div>
            </div>
            <div className="iconBx">
              <VisibilityIcon />
            </div>
          </div>
          <div className="card">
            <div className="card_number">
              <div className="number">1,504</div>
              <div className="cardName">Daily views</div>
            </div>
            <div className="iconBx">
              <VisibilityIcon />
            </div>
          </div>
          <div className="card">
            <div className="card_number">
              <div className="number">1,504</div>
              <div className="cardName">Daily views</div>
            </div>
            <div className="iconBx">
              <VisibilityIcon />
            </div>
          </div>
          <div className="card">
            <div className="card_number">
              <div className="number">1,504</div>
              <div className="cardName">Daily views</div>
            </div>
            <div className="iconBx">
              <VisibilityIcon />
            </div>
          </div>
        </div> */}
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
