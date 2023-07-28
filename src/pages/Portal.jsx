import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ErrorComponent from "components/ErrorComponent";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "api/axios";
import PulseLoader from "react-spinners/PulseLoader";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Portal() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  const value = params["*"];
  const schema = yup
    .object({
      fullname: yup.string().required("please enter your fullname"),
      phone: yup.number().required("please enter your phone number"),
      email: yup.string().required("please enter your email").email(),
      dob: yup.string().optional(),
      address: yup.string().required("please enter your address"),
      gender: yup.string().required("select your gender"),
      city: yup.string().required("please enter your city"),
      state: yup.string().required("please enter your state"),
      country: yup.string().required("please enter your country"),
      referral: yup.string().optional(),
      account_name: yup.string().required("please enter your account_name"),
      account_no: yup
        .number()
        .required("please enter your account No")
        .typeError("Account No is expected and should be a number"),
      bank: yup.string().required("please enter your bank"),
    })
    .required();
  // handle the validation before the modal..
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { onChange, ...rest } = register("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (body) => {
    try {
      setErrorMessage("");
      setLoading(true);
      const { data } = await axios.post("/getConsultants", body);
      setLoading(false);
      scrollUp();
      console.log(data);
      navigate("/portal/registration/email_sent", {
        state: { from: data["email"] },
      });
    } catch (error) {
      setErrorMessage(() =>
        error?.response ? error.response?.data.message : error.message
      );
      setLoading(false);
      scrollUp();
    }
  };
  // scroll to top
  function scrollUp() {
    window.scrollTo({
      top: 0,
      behaviour: "smooth",
    });
  }
  // handle toggle
  const [active, setActive] = useState(false);
  function handleToggle() {
    setActive((prev) => !prev);
  }
  // get the realtor.. name...
  const [abortError, setAbortError] = useState("");
  const [consultData, setConsultData] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    if (value) {
      async function getDetails() {
        try {
          const { data } = await axios.get(`/consultDetails/${value}`, {
            signal: controller.signal,
          });
          isMounted && setConsultData(data?.message);
          console.log(data?.message);
        } catch (error) {
          console.log(error);
          if (error.name === "AbortError" || error.name === "CanceledError") {
            console.log("successfully Aborted");
          } else {
            const err = error?.response
              ? error.response?.data.message
              : error.message;
            setAbortError(err);
            console.log(err);
          }
        }
      }
      getDetails();
      return () => {
        isMounted = false;
        controller.abort();
      };
    }
  }, []);

  return (
    <div className="portal">
      <div className={active ? "portal_left active" : "portal_left"}>
        <MenuIcon onClick={handleToggle} className="toggle_button" />
        <div className="logo">
          <img src="/image/logo.png" alt="" />
        </div>
        <div className="welcome">
          <h2>Beta Marketing</h2>
          <span> Welcome,</span>
        </div>
        <div className="home_login">
          <h2>Menu</h2>
          <ul>
            <li>
              <Link to="/consultant">
                <LoginIcon />
                <span>Login</span>
              </Link>
            </li>
            <Link to="/">
              <li>
                <HomeIcon />
                <span>Visit the website</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="portal_right">
        <div className="top">
          <div className="right">
            <MenuIcon onClick={handleToggle} />
          </div>
          <div className="left">
            <div className="user_arrow">
              <div className="user">
                <img src="/image/Artboard-1team.jpg" alt="referree" />
              </div>
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="title">Register New Consultant</div>
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* {Object.keys(consultData)?.length > 0 && (
                
              )} */}
              {/* {consultData && consultData.length > 0 && (
                
              )} */}
              {consultData && consultData.length > 0 ? (
                <p>You are being refered by {consultData[0]?.fullname}</p>
              ) : abortError ? (
                <p>{abortError}</p>
              ) : (
                <p>
                  Unrecognised referer details. Please contact your referer or
                  call 2348022231913 or visit www.betamarketingng.com
                </p>
              )}

              <div className="form_wrapper">
                {errorMessage && <p className="errorMessage">{errorMessage}</p>}

                <div className="input_label">
                  <label htmlFor="">Name *</label>
                  <div className="input_error">
                    <input
                      type="text"
                      placeholder="First Name and Last Name"
                      {...register("fullname")}
                    />
                    <ErrorComponent errors={errors} name="fullname" />
                  </div>
                </div>
                <div className="input_label">
                  <label htmlFor="">Mobile Number *</label>
                  <div className="input_error">
                    <input type="number" {...register("phone")} />
                    <ErrorComponent errors={errors} name="phone" />
                  </div>
                </div>
                <div className="input_label">
                  <label htmlFor="">Email *</label>
                  <div className="input_error">
                    <input type="email" {...register("email")} />
                    <ErrorComponent errors={errors} name="email" />
                  </div>
                </div>
                <div className="input_label">
                  <label htmlFor="">Date Of Birth (Optional)</label>
                  <div className="input_error">
                    <input type="date" {...register("dob")} />
                    <ErrorComponent errors={errors} name="dob" />
                  </div>
                </div>
                <div className="radio_gender">
                  <label htmlFor="">Select Gender *</label>
                  <div className="radio_field">
                    <div className="main_field">
                      <div className="field">
                        <input
                          type="radio"
                          name="sex"
                          value="male"
                          checked
                          {...register("gender")}
                        />
                        <span>Male</span>
                      </div>
                      <div className="field">
                        <input
                          type="radio"
                          name="sex"
                          value="female"
                          {...register("gender")}
                        />
                        <span>Female</span>
                      </div>
                    </div>
                    <ErrorComponent errors={errors} name="gender" />
                  </div>
                </div>
                <div className="input_label">
                  <label htmlFor="">Address *</label>
                  <div className="input_error">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      {...register("address")}
                    ></textarea>
                    <ErrorComponent errors={errors} name="address" />
                  </div>
                </div>
                <div className="input_label">
                  <label htmlFor="">City *</label>
                  <div className="input_error">
                    <input type="text" {...register("city")} />
                    <ErrorComponent errors={errors} name="city" />
                  </div>
                </div>

                <div className="input_label">
                  <label htmlFor="">State *</label>
                  <div className="input_error">
                    <input type="text" {...register("state")} />
                    <ErrorComponent errors={errors} name="state" />
                  </div>
                </div>
                <div className="input_label">
                  <label htmlFor="">Country *</label>
                  <div className="input_error">
                    <input type="text" {...register("country")} />
                    <ErrorComponent errors={errors} name="country" />
                  </div>
                </div>
                <div className="input_label">
                  <label htmlFor="">Referer ID *</label>
                  <div className="input_error">
                    <input
                      type="text"
                      {...register("referral")}
                      defaultValue={value ? value : ""}
                    />
                    <ErrorComponent errors={errors} name="referral" />
                  </div>
                </div>
                <div className="input_label">
                  <label htmlFor="">Account Number</label>
                  <div className="input_error">
                    <input type="text" {...register("account_no")} />
                    <ErrorComponent errors={errors} name="account_no" />
                  </div>
                </div>
                <div className="input_label">
                  <label htmlFor="">Account Name</label>
                  <div className="input_error">
                    <input type="text" {...register("account_name")} />
                    <ErrorComponent errors={errors} name="account_name" />
                  </div>
                </div>
                <div className="input_label">
                  <label htmlFor="">Bank</label>
                  <div className="input_error">
                    <input type="text" {...register("bank")} />
                    <ErrorComponent errors={errors} name="bank" />
                  </div>
                </div>
              </div>
              <div className="line"></div>
              <div className="button_wrapper">
                <div className="empty"></div>
                <div className="btn_container">
                  <div className="cancel">Cancel</div>
                  <button className="cancel" type="submit">
                    {loading ? (
                      <PulseLoader color={"#fff"} loading={loading} size={5} />
                    ) : (
                      <span> Submit</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
