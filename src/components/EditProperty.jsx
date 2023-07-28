import React, { useEffect, useState } from "react";
import PropertyComponent from "components/PropertyComponent";
import { useParams } from "react-router-dom";
import axios from "api/axios";
import { useSnackbar } from "notistack";

export default function EditProperty() {
  const params = useParams();
  const [message, setMessage] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // get all listings...
  useEffect(() => {
    const getMessage = async () => {
      try {
        const { data } = await axios.get(`/singleListings/${params?.id}`);
        setMessage(data?.message[0]);
        // console.log(data);
      } catch (error) {
        // error && navigate("/adminlogin", { state: { from: location } });
        enqueueSnackbar((error) =>
          error?.response ? error.response?.data.message : error.message
        );
      }
    };
    getMessage();
  }, []);
  return (
    <div>
      <PropertyComponent title="Edit Listing" data={params?.id} />
    </div>
  );
}
