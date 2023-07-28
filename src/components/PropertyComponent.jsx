import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorComponent from "./ErrorComponent";
import axios from "api/axios";
import AuthContext from "Context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import DragAndDrop from "./DragAndDrop";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function PropertyComponent({ title, data: param }) {
  const [fileList, setFileList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const { state, dispatch } = useContext(AuthContext);
  const { adminLogin } = state;
  const navigate = useNavigate();
  const schema = yup.object({
    isFeatured: yup.string().required(),
    building_size: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().typeError("price should be a number").required(),
    // price: yup.string().required(),
    currency: yup.string().required(),
    city: yup.string().required(),
    State: yup.string().required(),
    videos: yup
      .string()
      .nullable(true)
      .transform((_, val) => (val ? val : null)),
    street: yup.string().required(),
    bedrooms: yup
      .number()
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    bathrooms: yup
      .number()
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    total_room: yup
      .number()
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    garage_space: yup
      .number()
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
  });

  // handle the validation before the modal..
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      building_size: "",
      title: "",
      isFeatured: false,
      description: "",
      price: "",
      currency: "NGN",
      city: "",
      State: "",
      videos: "",
      street: "",
      bedrooms: "",
      bathrooms: "",
      total_room: "",
      garage_space: "",
    },
  });
  const { onChange, ...rest } = register("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (body) => {
    if (
      fileList &&
      fileList.length > 0 &&
      location?.pathname === "/dashboard/add_property"
    ) {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "/listing",
          { ...body, images: fileList },
          {
            headers: {
              Authorization: `Bearer ${adminLogin?.accessToken}`,
            },
          }
        );
        enqueueSnackbar(data?.message);
        setLoading(false);
      } catch (error) {
        const err = error?.response
          ? error.response.data.message
          : error.message;
        enqueueSnackbar(err, { variant: "error" });
        setLoading(false);
        if (error?.response?.data?.message === "expired token") {
          dispatch({ type: "ADMIN_LOGOUT" });
          localStorage.removeItem("adminInfo");
          navigate("/adminlogin", { state: { from: location } });
        }
      }
    } else {
      try {
        setLoading(true);
        const { data } = await axios.put(
          `/updateListing/${param}`,
          { ...body },
          {
            headers: {
              Authorization: `Bearer ${adminLogin?.accessToken}`,
            },
          }
        );
        enqueueSnackbar(data?.message, { variant: "success" });
        setLoading(false);
      } catch (error) {
        const err = error?.response
          ? error.response.data.message
          : error.message;
        enqueueSnackbar(err, { variant: "error" });
        setLoading(false);
        if (error?.response?.data?.message === "expired token") {
          dispatch({ type: "ADMIN_LOGOUT" });
          localStorage.removeItem("adminInfo");
          navigate("/adminlogin", { state: { from: location } });
        }
      }
    }
  };
  // get all listings...
  useEffect(() => {
    if (location?.pathname !== "/dashboard/add_property") {
      const getMessage = async () => {
        try {
          const { data } = await axios.get(`/singleListings/${param}`);
          reset({
            building_size: data?.message[0].building_size,
            title: data?.message[0].title,
            description: data?.message[0].description,
            isFeatured: data?.message[0].isFeatured,
            price: data?.message[0].price,
            currency: data?.message[0].currency,
            city: data?.message[0].city,
            State: data?.message[0].State,
            videos: data?.message[0].videos,
            street: data?.message[0].street,
            bedrooms: data?.message[0].bedrooms,
            bathrooms: data?.message[0].bathrooms,
            total_room: data?.message[0].total_room,
            garage_space: data?.message[0].garage_space,
          });
          // console.log(data);
        } catch (error) {
          // error && navigate("/adminlogin", { state: { from: location } });
          const errorM = error?.response
            ? error.response?.data.message
            : error.message;

          enqueueSnackbar(errorM, { variant: "error" });
        }
      };
      getMessage();
    }
  }, [param, location?.pathname, reset, enqueueSnackbar]);

  // const formatCurrency = (value) => {
  //   const formatter = new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD", // Replace with your desired currency code (e.g., 'NGN' for Naira)
  //   });

  //   // Remove non-numeric characters
  //   const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));

  //   return formatter.format(numericValue);
  // };

  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   const formattedValue = formatCurrency(value);
  //   setValue("price", value, { shouldValidate: true });
  //   event.target.value = formattedValue;
  // };

  // const price = watch("price");

  return (
    <div className="edit_property">
      <h3 className="heading">{title}</h3>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="general_fields">
            <h1 className="title">General</h1>
            <div className="input_wrapper">
              <div className="input_label">
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  placeholder="name of the housing"
                  {...register("title")}
                />
                <ErrorComponent errors={errors} name="title" />
              </div>
            </div>
            <div className=" trouble">
              <div className="input_label">
                <label htmlFor="">Building Size</label>
                <div className="input_select">
                  <div className="input_main">
                    <input type="text" {...register("building_size")} />
                    <ErrorComponent errors={errors} name="building_size" />
                  </div>
                </div>
              </div>
            </div>
            <div className="input_area">
              <label htmlFor="">Description</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                {...register("description")}
                placeholder="write a detailed description about the product"
              ></textarea>
              <ErrorComponent errors={errors} name="description" />
            </div>
            <div className="input_price_built">
              <div className="price">
                <label htmlFor="">Price</label>
                <div className="price__currency">
                  <select {...register("currency")}>
                    <option value="NGN" selected>
                      Naira (₦)
                    </option>
                    <option value="USD">Dollar ($)</option>
                  </select>
                  <input
                    type="number"
                    // type="text"
                    // id="price"
                    // onChange={handleChange}
                    // value={price}
                    {...register("price")}
                  />
                </div>
                <ErrorComponent errors={errors} name="price" />
              </div>
            </div>
          </div>
          <div className="location">
            <h1 className="title">Location</h1>
            <div className="input_section">
              <div className="input_label">
                <label htmlFor="">State</label>
                <input type="text" {...register("State")} />
                <ErrorComponent errors={errors} name="State" />
              </div>
              <div className="input_label_wrapper">
                <div className="input_label">
                  <label htmlFor="">City</label>
                  <input type="text" {...register("city")} />
                  <ErrorComponent errors={errors} name="city" />
                </div>
                <div className="input_label">
                  <label htmlFor="">Street</label>
                  <input type="text" {...register("street")} />
                  <ErrorComponent errors={errors} name="street" />
                </div>
              </div>
            </div>
          </div>
          <div className="location space other">
            <h1 className="title">Others</h1>
            <div className="input_label">
              <label htmlFor="">isFeatured</label>
              <select {...register("isFeatured")}>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              <ErrorComponent errors={errors} name="isFeatured" />
            </div>
          </div>
          <div className="location space">
            <h1 className="title">Space</h1>
            <div className="input_section">
              <div className="input_label_wrapper">
                <div className="input_label">
                  <label htmlFor="">Bedrooms</label>
                  <input type="number" {...register("bedrooms")} />
                  <ErrorComponent errors={errors} name="bedrooms" />
                </div>
                <div className="input_label">
                  <label htmlFor="">Bathrooms</label>
                  <input type="number" {...register("bathrooms")} />
                  <ErrorComponent errors={errors} name="bathrooms" />
                </div>
                <div className="input_label">
                  <label htmlFor="">Total rooms</label>
                  <input type="number" {...register("total_room")} />
                  <ErrorComponent errors={errors} name="total_room" />
                </div>
              </div>
              <div className="input_label_wrapper">
                <div className="input_label">
                  <label htmlFor="">Garage Space</label>
                  <input type="number" {...register("garage_space")} />
                  <ErrorComponent errors={errors} name="garage_space" />
                </div>
              </div>
            </div>
          </div>
          <div className="location space">
            <h1 className="title">Upload new images</h1>
            <DragAndDrop
              title="Drag 'n' drop some images here, or click to select images"
              handleFileList={setFileList}
              fileList={fileList}
            />
          </div>
          <div className="location space video">
            <h1 className="title">Upload Video</h1>
            {/* <DragAndDropVideo
              title="you can drag or drop video here"
              handleVideo={setVideos}
            /> */}

            <div className="input_label">
              <label htmlFor="">video</label>
              <input
                type="text"
                {...register("videos")}
                placeholder="paste your video link"
              />
              <ErrorComponent errors={errors} name="videos" />
            </div>
          </div>
          <div className="btn_wrapper">
            {location?.pathname === "/dashboard/add_property" ? (
              <>
                <button type="submit">
                  {loading ? (
                    <PulseLoader color={"#F37A24"} loading={loading} size={5} />
                  ) : (
                    <span>Upload</span>
                  )}
                </button>
              </>
            ) : (
              <>
                <button style={{ display: "none" }}>Cancel</button>
                <button type="submit">
                  {loading ? (
                    <PulseLoader color={"#F37A24"} loading={loading} size={5} />
                  ) : (
                    <span>Update</span>
                  )}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
