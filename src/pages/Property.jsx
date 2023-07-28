import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MainLayout from "Layout/MainLayout";
import axios from "api/axios";
import { useSnackbar } from "notistack";

import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function Property() {
  const [listData, setListData] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const params = useParams();
  useEffect(() => {
    const getListings = async () => {
      try {
        const { data } = await axios.get(`/singleListings/${params?.id}`);
        setListData(data?.message[0]);
        console.log(data?.message[0]);
      } catch (error) {
        enqueueSnackbar("error", error?.response?.data?.message);
      }
    };
    getListings();
  }, [enqueueSnackbar, params?.id]);
  return (
    <MainLayout color="#222">
      <div className="property">
        <div className="image">
          {listData.images && (
            <img src={JSON.parse(listData.images)[0]?.url} alt="" />
          )}

          <div className="desc">
            <div className="left">
              <div className="name">{listData?.title}</div>
              <div className="location">
                <LocationOnIcon className="icon" />
                <span>
                  {listData?.str_no},{listData?.street} , {listData?.city},{" "}
                  {listData?.zip_code}
                </span>
              </div>
            </div>
            <div className="right">
              <div className="price">{listData?.price}</div>
              <div className="size">{listData?.building_size}</div>
            </div>
          </div>
        </div>
        <div className="description">
          <h1>Description</h1>
          <p>{listData?.description}</p>
        </div>
        {listData.videos && (
          <div className="video">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${
                listData.videos.split("=")[1]
              }`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        )}
        <div className="tour">
          <h1>Schedule A Tour</h1>
          <form action="">
            <div className="top">
              <div className="input_field_wrapper">
                <label htmlFor="">Tour Type</label>
                <input type="text" placeholder="select" />
              </div>
              <div className="input_field_wrapper">
                <label htmlFor="">Tour Type</label>
                <input type="text" placeholder="select" />
              </div>
              <div className="input_field_wrapper">
                <label htmlFor="">Tour Type</label>
                <input type="text" placeholder="select" />
              </div>
            </div>
            <h1>Your information</h1>
            <div className="bottom">
              <div className="input_field_wrapper">
                <label htmlFor="">Tour Type</label>
                <input type="text" placeholder="select" />
              </div>
              <div className="input_field_wrapper">
                <label htmlFor="">Tour Type</label>
                <input type="text" placeholder="select" />
              </div>
              <div className="input_field_wrapper">
                <label htmlFor="">Tour Type</label>
                <input type="text" placeholder="select" />
              </div>
            </div>
            <div className="input_text_message">
              <label htmlFor="">Write your message</label>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="terms_privacy">
              <input type="checkbox" name="" id="" />
              <span>By submitting this form I agree to Terms of Use</span>
            </div>
            <button type="submit">
              <span>Request Information</span>
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </MainLayout>
  );
}
