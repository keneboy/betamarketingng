import ContactLayout from "Layout/ContactLayout";
import { useForm } from "react-hook-form";
import axios from "api/axios";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import ErrorMessageWrapper from "components/ErrorMess";
import SuccessMessage from "components/SuccessMessage";

export default function Contact() {
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { onChange, ...rest } = register("");
  // handle the login api calls on submit
  const onSubmit = async (body) => {
    setErrorMessage("");
    setSuccess("");
    setLoading(true);
    try {
      const { data } = await axios.post("/contact", body);
      setLoading(false);
      setSuccess(data?.message);
    } catch (error) {
      const err = error.response ? error.response?.data.message : error.message;
      setErrorMessage(err);
      setLoading(false);
    }
  };
  return (
    <ContactLayout heading="Contact Us">
      <div className="contact_main">
        <div className="bottom">
          <div className="error">
            {!loading && errorMessage && (
              <ErrorMessageWrapper title={errorMessage} />
            )}
            {!loading && success && <SuccessMessage text={success} />}
            <div className="empty"></div>
          </div>
          <div className="main">
            <div className="left">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input_field_container">
                  <div className="form_wrapper">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="First Name"
                      {...register("first_name", {
                        required: "first Name is Required",
                        pattern: {
                          value: /[a-zA-Z]{3,}/,
                          message: "Please enter valid name",
                        },
                      })}
                    />
                    {errors?.first_name && (
                      <span className="error-red">
                        {errors.first_name.message}
                      </span>
                    )}
                  </div>
                  <div className="form_wrapper">
                    <label htmlFor="">Last name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Last name"
                      {...register("last_name", {
                        required: "last name is Required",
                      })}
                    />
                    {errors?.last_name && (
                      <span className="error-red">
                        {errors.last_name.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="input_field_container">
                  <div className="form_wrapper">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      name=""
                      id=""
                      placeholder="Email"
                      {...register("email", {
                        required: "Email is Required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: "Please enter valid email",
                        },
                      })}
                    />
                    {errors?.email && (
                      <span className="error-red">{errors.email.message}</span>
                    )}
                  </div>
                  <div className="form_wrapper">
                    <label htmlFor="">Phone</label>
                    <input
                      type="number"
                      name=""
                      id=""
                      placeholder="Phone"
                      {...register("phone", {
                        required: "Phone is Required",
                      })}
                    />
                    {errors?.phone && (
                      <span className="error-red">{errors.phone.message}</span>
                    )}
                  </div>
                </div>
                <div className="form_wrapper">
                  <label htmlFor="">Subject</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Subject"
                    {...register("subject", {
                      required: "subject is Required",
                    })}
                  />
                  {errors?.subject && (
                    <span className="error-red">{errors.subject.message}</span>
                  )}
                </div>
                <div className="text_area">
                  <label htmlFor="">Message</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    {...register("description", {
                      required: "this field should not be empty",
                      // pattern: {
                      //   value:
                      //     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      //   message: "Please enter valid phone",
                      // },
                    })}
                  ></textarea>
                  {errors?.description && (
                    <span className="error-red">
                      {errors.description.message}
                    </span>
                  )}
                </div>
                <button type="submit">
                  {loading ? (
                    <PulseLoader color={"#F37A24"} loading={loading} size={5} />
                  ) : (
                    <span> Submit</span>
                  )}
                </button>
              </form>
            </div>
            <div className="right">
              <div className="head">
                <h1>Headquarters</h1>
                <p>584 Biscayne Boulevard Miami FL, 33176</p>
              </div>
              <div className="sb_head">
                <h2>Amy Miller</h2>
                <p>Public Relations Manager</p>
                <span>774 NE 84th St Miami, FL 33879</span>
                <span>amy.miller@houzez.com</span>
              </div>
              <div className="sb_head">
                <h2>Roland Samuel</h2>
                <p>Public Relations Manager</p>
                <span>774 NE 84th St Miami, FL 33879</span>
                <span>amy.miller@houzez.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContactLayout>
  );
}
