import axios from "api/axios";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Commission from "components/Commission";

export default function MajorConsult() {
  const [listData, setListData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    // let isMounted = true;
    const controller = new AbortController();
    const getListings = async () => {
      try {
        const { data } = await axios.get("/getListings", {
          signal: controller.signal,
        });

        setListData(data?.message);
      } catch (error) {
        if (error.name === "AbortError" || error.name === "CanceledError") {
          console.log("successfully abort");
        } else {
          const err = error?.response
            ? error.response.data.message
            : error.message;
          enqueueSnackbar(err, { variant: "error" });
        }

        // console.log(err);
      }
    };
    getListings();
    return () => {
      // isMounted = false;
      console.log("cleaned function triggered");
      controller.abort();
    };
  }, [enqueueSnackbar]);
  return (
    <div className="consult_major">
      <Commission />
      <div className="property_component">
        <ul className={listData.length === 1 ? "one" : ""}>
          {listData &&
            listData.length > 0 &&
            listData?.map((item, index) => {
              return (
                <li key={index}>
                  <div className="title">{item?.title}</div>
                  <div className="image">
                    <img src={JSON.parse(item.images)[0]?.url} alt="" />
                    {/* <div className="attachment">
                        <div className="name">{item?.title}</div>
                        <div className="price">
                          <span>&#8358;</span>
                          {item?.price}
                        </div>
                      </div> */}
                  </div>
                  <div className="description">
                    <p className="str">
                      {item?.str_no} {item?.street}
                    </p>
                    <p className="desc">{item?.description}</p>
                    <div className="top_desc">
                      <ul>
                        <li>{item?.bedrooms} Bedrooms</li>
                        <li>{item?.bathrooms} Bathroom</li>
                        <li>{item?.garage_space} parking Space</li>
                      </ul>
                    </div>
                    <div className="bottom_desc">Price: &#8358;{item?.price}</div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
