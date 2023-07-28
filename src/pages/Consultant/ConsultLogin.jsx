import React, { useContext, useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useForm } from "react-hook-form";
import axios from "api/axios";
import AuthContext from "Context/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import Warning from "../component/Warning";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate, useLocation } from "react-router-dom";
import { Warning } from "@mui/icons-material";
import ErrorMessageWrapper from "components/ErrorMess";

export default function ConsultLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(AuthContext);
  const { consultantLogin: login } = state;
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
    setLoading(true);
    try {
      const { data: response } = await axios.post("/consultant", data);
      dispatch({ type: "CONSULTANT_SUCCESS", payload: response });
      localStorage.setItem("consultantInfo", JSON.stringify(response));
      setErrorMessage("");
      setLoading(false);
    } catch (error) {
      const err = error.response ? error.response.data.message : error.message;
      setErrorMessage(err);
      setLoading(false);
      console.log(err, "err");
      console.log(error);
      console.log(error.response.data.message);
    }
  };
  // redirecting the user the admin dashboard...
  const redirect = location?.state
    ? location?.state?.from.pathname
    : "/dashboardConsult";
  useEffect(() => {
    login?.accessToken && navigate(redirect);
  }, [login?.accessToken, navigate, redirect]);

  return (
    <div className="adminLogin">
      <div className="form_wrapper">
        {!loading && errorMessage && (
          <ErrorMessageWrapper title={errorMessage} />
        )}
        <div className="form_container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="title">Sign In</div>
            <div className="input_field">
              <label htmlFor="">consultant Id</label>
              <div className="input">
                <input
                  type="text"
                  placeholder="Enter consultant Id"
                  {...register("consultantId", {
                    required: "Consultant Id is required",
                  })}
                />
              </div>
              {errors?.consultantId && (
                <span
                  className="error-red"
                  style={{
                    color: "red",
                    display: "block",
                    marginTop: "5px",
                  }}
                >
                  {errors.consultantId.message}
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
