import Commission from "components/Commission";
import PulseLoader from "react-spinners/PulseLoader";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "api/axios";
import AuthContext from "Context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorComponent from "components/ErrorComponent";
import ErrorMessageWrapper from "components/ErrorMess";
import SuccessMessage from "components/SuccessMessage";
export default function ConsultPayment() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch, state } = useContext(AuthContext);
  const { consultantLogin: login } = state;
  const schema = yup
    .object({
      amount: yup.number().required("amount should be a number"),
      account_name: yup.string().required("please enter your account_name"),
      account_no: yup.number().required("please enter your account No"),
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
      account_no: "",
      account_name: "",
      bank: "",
    },
  });
  const { onChange, ...rest } = register("");
  const [loading, setLoading] = useState(false);

  //   handle reset
  const [updateComission, setUpdateComission] = useState(0);
  useEffect(() => {
    const abortCont = new AbortController();
    const getUser = async () => {
      try {
        const { data } = await axios.get("/getConsult", {
          signal: abortCont.signal,
          headers: {
            authorization: `Bearer ${login?.accessToken}`,
          },
        });
        reset({
          account_name: data?.message[0].account_name,
          account_no: data?.message[0].account_no,
          bank: data?.message[0].bank,
        });
      } catch (error) {
        if (error?.response?.data?.message === "expired token") {
          dispatch({ type: "CONSULTANT_LOGOUT" });
          localStorage.removeItem("consultantInfo");
          navigate("/consultant", { state: { from: location } });
        } else if (
          error.name === "CanceledError" ||
          error.name === "AbortError"
        ) {
          console.log("clean up");
        }
        console.log("error", error?.response?.data?.message);
      }
    };
    getUser();
    return () => {
      abortCont.abort();
    };
    // call the setValue method from rhf
  }, [login?.accessToken]);
  const onSubmit = async (body) => {
    try {
      setLoading(true);
      setSuccess("");
      setErrorMessage("");
      const { data } = await axios.post("/insertIntoWithdrawal", body, {
        headers: {
          authorization: `Bearer ${login?.accessToken}`,
        },
      });
      setSuccess(data?.message);
      setLoading(false);
      setUpdateComission((prev) => prev + 1);
    } catch (error) {
      setLoading(false);
      const err = error?.response
        ? error.response?.data.message
        : error.message;
      setErrorMessage(err);
    }
  };
  return (
    <div className="consultantPayment">
      <Commission update={updateComission}/>
      <div className="form_wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          {!loading && errorMessage && (
            <ErrorMessageWrapper title={errorMessage} />
          )}
          {!loading && success && <SuccessMessage text={success} />}
          <div className="input_label">
            <label>Account Number</label>
            <input
              type="text"
              placeholder="Enter Account Number"
              {...register("account_no")}
              readOnly
            />
          </div>
          <div className="input_label">
            <label>Amount</label>
            <div className="input_error">
              <input
                type="text"
                placeholder="Enter amount"
                {...register("amount")}
              />
              <ErrorComponent errors={errors} name="amount" />
            </div>
          </div>
          <div className="input_label">
            <label>Account Name</label>
            <input
              type="text"
              placeholder="Enter Account Name"
              readOnly
              {...register("account_name")}
            />
          </div>
          <div className="input_label">
            <label>Bank</label>
            <input
              type="text"
              placeholder="Enter name of bank"
              readOnly
              {...register("bank")}
            />
          </div>

          <button className="payment" type="submit">
            {loading ? (
              <PulseLoader color={"#fff"} loading={loading} size={5} />
            ) : (
              <span> Proceed to Payment</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
