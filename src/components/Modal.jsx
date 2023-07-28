import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "api/axios";
import { useSnackbar } from "notistack";
import AuthContext from "Context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, data }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const { adminLogin } = state;
  const schema = yup
    .object({
      amount: yup.number().required("please enter your fullname"),
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

  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);
  const onSubmit = (body) => {
    const updateDownline = async () => {
      setLoading(true);
      try {
        const { data: refinedData } = await axios.post(
          `/insertCommission/${data}`,
          { ...body },
          {
            headers: {
              Authorization: `Bearer ${adminLogin?.accessToken}`,
            },
          }
        );
        setLoading(false);
        enqueueSnackbar(refinedData?.message, { variant: "success" });
      } catch (error) {
        if (error?.response?.data?.message === "expired token") {
          dispatch({ type: "ADMIN_LOGOUT" });
          localStorage.removeItem("adminInfo");
          navigate("/adminlogin", { state: { from: location } });
        } else {
          const err = error.response
            ? error.response.data.message
            : error.message;
          enqueueSnackbar(err, { variant: "error" });
          setLoading(false);
        }
      }
    };
    updateDownline();
  };

  return (
    <div className="customed_modal">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="header_x">
            <h2>Top Up</h2>
            <CloseIcon onClick={handleClose} className="cl" />
          </div>
          <div className="bottom_x">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input_label">
                <label htmlFor="">Amount</label>
                <input
                  type="number"
                  {...register("amount")}
                  placeholder="Enter Amount"
                />
                <ErrorComponent errors={errors} name="amount" />
              </div>
              <button type="submit">
                {loading ? <CircularProgress /> : "Top Up"}
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
