import axios from "api/axios";
import AuthContext from "Context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Message() {
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(AuthContext);
  const { adminLogin } = state;
  const [message, setMessage] = useState({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    date_field: String,
    description: String,
    status: String,
    subject: String,
  });
  useEffect(() => {
    const getMessage = async () => {
      try {
        const { data } = await axios.get(`/singleFeedback/${param?.id}`, {
          headers: {
            Authorization: `Bearer ${adminLogin?.accessToken}`,
          },
        });
        setMessage(data?.message[0]);
        // console.log(data);
      } catch (error) {
        if (error?.response?.data?.message === "expired token") {
          dispatch({ type: "ADMIN_LOGOUT" });
          localStorage.removeItem("adminInfo");
          navigate("/adminlogin", { state: { from: location } });
        }
      }
    };
    getMessage();
  }, [param?.id, adminLogin?.accessToken, location, navigate, dispatch]);
  return (
    <div className="message">
      <div className="content">
        <h1 className="subject">{message?.subject}</h1>
        <div className="fullname_phone">
          <div className="name">
            <p>Full Name: </p>
            <span>
              {message?.first_name} {message?.last_name}
            </span>
          </div>
          <div className="phone">
            <p>Phone Number: </p>
            <span>{message?.phone}</span>
          </div>
          <div className="email">
            <p>Email Address: </p>
            <span>{message?.email}</span>
          </div>
          <div className="date">
            <p>Date: </p>
            <span>{message?.date_field}</span>
          </div>
        </div>
        <div className="description">{message?.description}</div>
      </div>
    </div>
  );
}
