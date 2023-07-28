import PulseLoader from "react-spinners/PulseLoader";
import ErrorComponent from "components/ErrorComponent";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "api/axios";
import {useSnackbar} from "notistack"

import AuthContext from "Context/AuthProvider";
import PersonalInformation from "components/PersonalInformation";
import { useLocation, useNavigate } from "react-router-dom";
export default function SettingConsultant() {
  const {enqueueSnackbar} = useSnackbar()
  const { state, dispatch,updatePic } = useContext(AuthContext);
  const { consultantLogin } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const { consultantLogin: login } = state;
  const schema = yup
    .object({
      fullname: yup.string().required("please enter your fullname"),
      phone: yup.number().required("please enter a valid number"),
      email: yup.string().required("email is required").email(),
      dob: yup.string().optional(),
      gender: yup.string().required("select your gender"),
      address: yup.string().required("please enter your address"),
      city: yup.string().required("please enter your city"),
      state: yup.string().required("please enter your state"),
      country: yup.string().required("please enter your country"),
      account_name: yup.string().required("please enter your account_name "),
      account_no: yup.number("it should be a number").required("please your account no"),
      bank: yup.string().required("please enter your bank"),
    })
    .required();
  // handle the validation before the modal..
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      phone: "",
      email: "",
      dob: "",
      address: "",
      gender: "",
      city: "",
      state: "",
      country: "",
      account_name: "",
      account_no: "",
      bank: "",
    },
  });
  const { onChange, ...rest } = register("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const onSubmit = async (body) => {
    console.log(body);
    try {
      setLoading(true);
     const {data} = await axios.patch("/updateConsultant", body, {
        headers: {
          authorization: `Bearer ${consultantLogin?.accessToken}`,
        },
      });
      setLoading(false);
      enqueueSnackbar(data.message, { variant: "success" })
    } catch (error) {
      if (error?.response?.data?.message === "expired token") {
        dispatch({ type: "CONSULTANT_LOGOUT" });
        localStorage.removeItem("consultantInfo");
        navigate("/consultant", { state: { from: location } });
      }
        const err = error?.response ? error.response?.data.message : error.message
      enqueueSnackbar(err, { variant: "error" })
      setLoading(false);
    }
  };
  // handle the api call ans storing within the state

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("/getConsult", {
          headers: {
            authorization: `Bearer ${login?.accessToken}`,
          },
        });
        console.log(data?.message);
        setUser(data?.message[0]);
        reset({
          fullname: data?.message[0].fullname,
          phone: data?.message[0].phone,
          email: data?.message[0].email,
          dob: data?.message[0].dob,
          gender: data?.message[0].gender,
          address: data?.message[0].address,
          city: data?.message[0].city,
          state: data?.message[0].state,
          country: data?.message[0].country,
          account_name: data?.message[0].account_name,
          account_no: data?.message[0].account_no,
          bank: data?.message[0].bank,
        });
      } catch (error) {
        if (error?.response?.data?.message === "expired token") {
          dispatch({ type: "CONSULTANT_LOGOUT" });
          localStorage.removeItem("consultantInfo");
          navigate("/consultant", { state: { from: location } });
        }
        console.log("error", error?.response?.data?.message);
      }
    };
    getUser();
    // call the setValue method from rhf
  }, [updatePic]);
  return (
    <div className="setting">
      <PersonalInformation data={user} />
      <div className="bottom">
        <div className="title">Update User Details</div>
        <div className="form reform">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_wrapper">
              <div className="input_label">
                <label htmlFor="">Name *</label>
                <div className="input_error">
                  <input
                    type="text"
                    placeholder="First Name and Last Name"
                    {...register("fullname")}
                    // defaultValue={user?.fullname}
                  />
                  <ErrorComponent errors={errors} name="fullname" />
                </div>
              </div>
              <div className="input_label">
                <label htmlFor="">Mobile Number *</label>
                <div className="input_error">
                  <input
                    type="number"
                    {...register("phone")}
                    // defaultValue={user.phone}
                  />
                  <ErrorComponent errors={errors} name="phone" />
                </div>
              </div>
              <div className="input_label">
                <label htmlFor="">Email *</label>
                <div className="input_error">
                  <input
                    type="email"
                    {...register("email")}
                    // defaultValue={user.email}
                  />
                  <ErrorComponent errors={errors} name="email" />
                </div>
              </div>
              <div className="input_label">
                <label htmlFor="">Date Of Birth (Optional)</label>
                <div className="input_error">
                  <input
                    type="date"
                    {...register("dob")}
                    // defaultValue={user.dob}
                  />
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
                    // defaultValue={user.address}
                  ></textarea>
                  <ErrorComponent errors={errors} name="address" />
                </div>
              </div>
              <div className="input_label">
                <label htmlFor="">City *</label>
                <div className="input_error">
                  <input
                    type="text"
                    {...register("city")}
                    // defaultValue={user.city}
                  />
                  <ErrorComponent errors={errors} name="city" />
                </div>
              </div>

              <div className="input_label">
                <label htmlFor="">State *</label>
                <div className="input_error">
                  <input
                    type="text"
                    {...register("state")}
                    // defaultValue={user.state}
                  />
                  <ErrorComponent errors={errors} name="state" />
                </div>
              </div>
              <div className="input_label">
                <label htmlFor="">Country *</label>
                <div className="input_error">
                  <input
                    type="text"
                    {...register("country")}
                    // defaultValue={user.country}
                  />
                  <ErrorComponent errors={errors} name="country" />
                </div>
              </div>
              <div className="input_label">
                <label htmlFor="">Account Number</label>
                <div className="input_error">
                  <input
                    type="text"
                    {...register("account_no")}
                    // defaultValue={user.account_no}
                  />
                  <ErrorComponent errors={errors} name="account_no" />
                </div>
              </div>
              <div className="input_label">
                <label htmlFor="">Account Name</label>
                <div className="input_error">
                  <input
                    type="text"
                    {...register("account_name")}
                    // defaultValue={user.account_name}
                  />
                  <ErrorComponent errors={errors} name="account_name" />
                </div>
              </div>
              <div className="input_label">
                <label htmlFor="">Bank</label>
                <div className="input_error">
                  <input
                    type="text"
                    {...register("bank")}
                    // defaultValue={user.bank}
                  />
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
                    <span> Update</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
