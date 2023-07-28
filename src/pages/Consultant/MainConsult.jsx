import React, { useState, useContext, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MessageIcon from "@mui/icons-material/Message";
import LockIcon from "@mui/icons-material/Lock";
import TooltipsComponent from "components/Tooltips";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";

// import VisibilityIcon from "@mui/icons-material/Visibility";
import AuthContext from "Context/AuthProvider";
import { useNavigate, Link, Outlet } from "react-router-dom";
import ControlledAccordions from "components/Accordion";
import axios from "api/axios";
export default function MainConsult() {
  const navigate = useNavigate();
  const { state, dispatch, updatePic } = useContext(AuthContext);
  const { consultantLogin: login } = state;

  const [mouse, setMouse] = useState(2);
  const [current, setCurrent] = useState(false);
  function handleMouse(id) {
    setMouse(id);
  }

  // handle logout by the admin...
  function handleLogout() {
    dispatch({ type: "CONSULTANT_LOGOUT" });
    localStorage.removeItem("consultantInfo");
    navigate("/consultant");
  }
  // handle the api call ans storing within the state
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("/getConsult", {
          headers: {
            authorization: `Bearer ${login?.accessToken}`,
          },
        });
        setUser(data?.message[0]);
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      }
    };
    getUser();
  }, [updatePic]);

  // handle sidebar
  const [side, setSide] = useState(false);
  function handleSidebar() {
    setSide((prev) => !prev);
  }
  return (
    <div className="container_consult">
      <div
        className={side ? "navigation current" : "navigation"}
        style={current ? { "--str": "7rem" } : {}}
      >
        <div className="navigation_wrapper">
          <div className="top">
            <img src="/image/logo.png" alt="logo" />
          </div>
          <div className="centre">
            <div className="user">
              <img
                src={user?.picture ? user?.picture : "/image/avatar.jpg"}
                alt="user"
              />
            </div>
            <div className="name">{user?.fullname}</div>
            <div className="role">Consultant</div>
            <div className="arrows">
              <KeyboardArrowUpIcon />
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="bottom">
            <h1>General</h1>
            {/* <ControlledAccordions
              dataControl={[{ name: "sam" }, { name: "ruth" }]}
            /> */}
            <ul>
              <Link to="">
                <li>
                  <DashboardIcon className="dash_icon" />
                  <span>Dashboard</span>
                </li>
              </Link>
              <Link to="downline">
                <li>
                  <GroupIcon className="dash_icon" />
                  <span>Downlines</span>
                </li>
              </Link>
              <Link to="widthdrawal">
                <li>
                  <GroupIcon className="dash_icon" />
                  <span>Widthdrawal</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="logout_message">
          {/* <div className="message">
            <MessageIcon />
          </div> */}
          <TooltipsComponent title="CHANGE PASSWORD">
            <Link to="update_password">
              <div className="message">
                <LockIcon />
              </div>
            </Link>
          </TooltipsComponent>

          <TooltipsComponent title="LOGOUT">
            <div className="power" onClick={handleLogout}>
              <PowerSettingsNewIcon />
            </div>
          </TooltipsComponent>
        </div>
      </div>
      <div
        className={current ? "main current" : "main"}
        style={current ? { "--str": "7rem" } : {}}
      >
        <div className="main_container">
          <div className="topbar">
            <div className="home">
              <MenuIcon onClick={handleSidebar} />
            </div>
            <div className="user">
              <img
                src={user?.picture ? user?.picture : "/image/avatar.jpg"}
                alt="hero"
              />
            </div>
            <Link to="setting">
              <div className="setting">
                <SettingsIcon />
              </div>
            </Link>
          </div>
          <div className="next_topbar">
            <div className="image_container_data">
              <div className="image">
                <img
                  src={user?.picture ? user?.picture : "/image/avatar.jpg"}
                  alt="hero"
                />
              </div>
              <div className="text_date">
                <div className="text">Welcome, {user?.fullname}!</div>
                <div className="date">We are delighted to have you back</div>
              </div>
            </div>
          </div>
          <div className="outlet_consult">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
