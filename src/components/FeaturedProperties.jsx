import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "api/axios";
import { useSnackbar } from "notistack";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";
import formattedPrice from "utils/formattedPrice";
export default function FeaturedProperties() {
  const { enqueueSnackbar } = useSnackbar();
  const [listData, setListData] = useState([]);
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
    <div className="featuredProperties">
      <>
        <h1>Featured Luxury Property</h1>
        <p>Create property listings with all the features you’d expect</p>
      </>

      <div className="gallery">
        <ul className="">
          <Swiper
            // slidesPerView={3}
            // spaceBetween={30}
            breakpoints={{
              1280: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              760: {
                slidesPerView: 2.5,
                spaceBetween: 25,
              },
              560: {
                slidesPerView: 2,
                spaceBetween: 20,
              },

              480: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {listData &&
              listData.length > 0 &&
              listData
                ?.filter((item) => item.isFeatured === "true")
                .map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <li>
                        <Link to={`/property/${item.id}`} className="link">
                          <div className="image">
                            <img src={JSON.parse(item.images)[0]?.url} alt="" />
                            <div className="attachment">
                              <div className="name">{item?.title}</div>
                              <div className="price">
                                {formattedPrice(item?.price, item?.currency)}
                              </div>
                            </div>
                          </div>
                          <div className="description">
                            <div
                              className={
                                item?.bedrooms ||
                                item?.bathrooms ||
                                item?.garage_space
                                  ? "top_border top_desc"
                                  : "top_desc"
                              }
                            >
                              <ul>
                                <li>
                                  <span>{item?.bedrooms}</span>{" "}
                                  {item?.bedrooms && <span>Bedrooms</span>}
                                </li>
                                <li>
                                  <span>{item?.bathrooms}</span>{" "}
                                  {item?.bathrooms && <span>Bathroom</span>}
                                </li>
                                <li>
                                  <span>{item?.garage_space}</span>{" "}
                                  {item?.garage_space && (
                                    <span>parking Space</span>
                                  )}
                                </li>
                              </ul>
                            </div>
                            <div className="bottom_desc">
                              <span>
                                {item?.str_no} {item?.street}
                              </span>
                              <span>
                                {item?.city} {item?.zip_code}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </ul>
      </div>
    </div>
  );
}
