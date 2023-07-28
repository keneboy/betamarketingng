import React, { useContext, useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useForm } from "react-hook-form";
import axios from "api/axios";
import AuthContext from "Context/AuthProvider";
import { isValidToken } from "components/jwt";
// import { useNavigate } from "react-router-dom";
// import Warning from "../component/Warning";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(AuthContext);
  const { adminLogin: login } = state;
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // handle the validation before the modal..
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});
  const { onChange, ...rest } = register("");
  const onSubmit = async (data) => {
    console.log({ ...data });
    setLoading(true);
    try {
      const { data: response } = await axios.post("/admin", data);
      dispatch({ type: "ADMIN_SUCCESS", payload: response });
      localStorage.setItem("adminInfo", JSON.stringify(response));
      setErrorMessage("");
      setLoading(false);
    } catch (error) {
      setErrorMessage(error?.response.data.message);
      setLoading(false);
    }
  };
  // redirecting the user the admin dashboard...
  const redirect = location?.state
    ? location?.state?.from.pathname
    : "/dashboard";
  useEffect(() => {
    isValidToken(login?.accessToken) && navigate(redirect);
  }, [login?.accessToken, navigate, redirect]);

  return (
    <div className="adminLogin">
      <div className="form_wrapper">
        {/* {!loading && errorMessage && <Warning text={errorMessage} />} */}
        <div className="form_container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="title">Sign In</div>
            <div className="input_field">
              <label htmlFor="">Email</label>
              <div className="input">
                <input
                  type="email"
                  placeholder="Enter Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                      message: "Enter valid email",
                    },
                  })}
                />
              </div>
              {errors?.email && (
                <span
                  className="error-red"
                  style={{
                    color: "red",
                    display: "block",
                    marginTop: "5px",
                  }}
                >
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="input_field password">
              <label htmlFor="">
                <span>password</span>
              </label>
              <div className="input">
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {visible ? (
                  <VisibilityOffIcon
                    onClick={() => setVisible(!visible)}
                    className="eye"
                  />
                ) : (
                  <RemoveRedEyeIcon
                    onClick={() => setVisible(!visible)}
                    className="eye"
                  />
                )}
              </div>
              {errors?.password && (
                <span
                  className="error-red"
                  style={{
                    color: "red",
                    display: "block",
                    marginTop: "5px",
                  }}
                >
                  {errors.password.message}
                </span>
              )}
            </div>
            <button type="submit">
              {loading ? (
                <PulseLoader color={"#F37A24"} loading={loading} size={10} />
              ) : (
                <span>
                  Sign In <KeyboardDoubleArrowRightIcon />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
