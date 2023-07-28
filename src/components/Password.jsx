import { useForm } from "react-hook-form";
import AuthContext from "Context/AuthProvider";
import { useContext } from "react";
import axios from "api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function Password() {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(AuthContext);
  const { consultantLogin } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const schema = yup
    .object({
      password: yup
        .string()
        .required("Please enter your password.")
        .min(8, "Your password is too short."),
      retypePassword: yup
        .string()
        .required("Please retype your password.")
        .oneOf([yup.ref("password")], "Your passwords do not match."),
    })
    .required();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { onChange, ...rest } = register("");
  const onSubmit = async (body) => {
    // /updateConsultantPassword
    try {
      const { data } = await axios.patch(
        "/updateConsultantPassword",
        { password: body.password },
        {
          headers: {
            authorization: `Bearer ${consultantLogin?.accessToken}`,
          },
        }
      );
      enqueueSnackbar(data?.message, { variant: "success" });
    } catch (error) {
      if (error?.response?.data?.message === "expired token") {
        dispatch({ type: "CONSULTANT_LOGOUT" });
        localStorage.removeItem("consultantInfo");
        navigate("/consultant", { state: { from: location } });
      }
    }
  };
  return (
    <div className="update_password admin consultant-p">
      <div className="titles_wrapper">
        <div className="title">Password</div>
        <div className="subtitle">update password</div>
      </div>

      <div className="form">
        <form className="personal" onSubmit={handleSubmit(onSubmit)}>
          <div className="input_label">
            <label htmlFor="">Password</label>
            <input type="password" {...register("password")} />
            <ErrorComponent errors={errors} name="password" />
          </div>
          <div className="input_label">
            <label htmlFor="">Retype Password</label>
            <input type="password" {...register("retypePassword")} />
            <ErrorComponent errors={errors} name="retypePassword" />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
