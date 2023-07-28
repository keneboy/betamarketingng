import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorComponent from "components/ErrorComponent";
import axios from "api/axios";
import AuthContext from "Context/AuthProvider";
import { useContext } from "react";
import { useSnackbar } from "notistack";
export default function AdminPassword() {
  const { state } = useContext(AuthContext);
  const { adminLogin } = state;
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup
    .object({
      password: yup
        .string()
        .required("Please enter your password.")
        .min(6, "Your password is too short."),
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
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { onChange, ...rest } = register("");
  const onSubmit = async (obj) => {
    console.log(obj);
    try {
      const { data } = await axios.put(
        "/updateAdmin",
        { ...obj },
        {
          headers: {
            Authorization: `Bearer ${adminLogin?.accessToken}`,
          },
        }
      );
      enqueueSnackbar(data?.message, { variant: "success" });
    } catch (error) {
      const err = error?.response ? error.response.data.message : error.message;
      enqueueSnackbar(err, { variant: "error" });
    }
  };
  return (
    <div className="update_password admin">
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
