import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "api/axios";
import AuthContext from "Context/AuthProvider";
import { useContext, useEffect, useState } from "react";
export default function Messages() {
  const { state, dispatch } = useContext(AuthContext);
  const { adminLogin } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState([
    {
      id: Number,
      first_name: String,
      last_name: String,
      email: String,
      phone: String,
      date_field: String,
      description: String,
      status: String,
      subject: String,
    },
  ]);
  const [deleteCount, setDeleteCount] = useState(0);
  useEffect(() => {
    const getMessage = async () => {
      try {
        const { data } = await axios.get("/getFeedback", {
          headers: {
            Authorization: `Bearer ${adminLogin?.accessToken}`,
          },
        });
        setMessage(data?.message);
      } catch (error) {

        if (error?.response?.data?.message === "expired token") {
          dispatch({ type: "ADMIN_LOGOUT" });
          localStorage.removeItem("adminInfo");
          navigate("/adminlogin", { state: { from: location } });
        }
        
      }
    };
    getMessage();
  }, [deleteCount]);
  async function handleDelete(item) {
    try {
      await axios.delete(`/delete/${item.id}`, {
        headers: {
          Authorization: `Bearer ${adminLogin?.accessToken}`,
        },
      });
      setDeleteCount((prev) => prev + 1);
      //
    } catch (error) {
      navigate("/adminlogin", { state: { from: location } });
    }
  }
  return (
    <div className="messages">
      <ul>
        {message &&
          message.length > 0 &&
          message.map((item) => {
            return (
              <li className={item.status === "unseen" ? "unseen" : ""}>
                <Link
                  to={`/dashboard/message/${item.id}`}
                  className="message_link"
                >
                  <div className="subject">{item.subject}</div>
                  <div className="main_message">{item.description}</div>
                  <div className="time">{item.date_field}</div>
                </Link>
                <div className="delete_wrapper">
                  <DeleteIcon
                    className="icon"
                    onClick={() => handleDelete(item)}
                  />
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
